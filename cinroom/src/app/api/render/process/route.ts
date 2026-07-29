import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { executeVideoGenerationWithRetry } from "@/lib/byteplus";
import { saveGeneratedVideoToR2 } from "@/lib/r2";
import { buildMasterPrompt } from "@/lib/modes";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pwtxdpgbggzgmscspepe.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHhkcGdiZ2d6Z21zY3NwZXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk1NDE4MCwiZXhwIjoyMTAwNTMwMTgwfQ.VavXzgIXsO6e4XOdsuWPfuzM0wXx0ZkT_B30aHqNm88";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { genId } = await req.json();

    if (!genId) {
      return NextResponse.json({ error: "Missing generation ID" }, { status: 400 });
    }

    // 1. Fetch generation history record
    const { data: record, error: fetchErr } = await supabase
      .from("generation_history")
      .select("*")
      .eq("id", genId)
      .single();

    if (fetchErr || !record) {
      return NextResponse.json({ error: "Generation record not found" }, { status: 404 });
    }

    // If already COMPLETED or FAILED, return current status
    if (record.status === "COMPLETED" || record.status === "FAILED") {
      return NextResponse.json({
        success: record.status === "COMPLETED",
        status: record.status,
        output_url: record.output_url,
        refunded: record.refunded,
        error_message: record.error_message,
      });
    }

    // 2. Re-assemble master prompt in server RAM dynamically from inputs metadata (Zero prompt text stored in DB)
    const masterPromptInRam = buildMasterPrompt({
      mode: record.mode || "outdoor_campaign",
      jewelry_images: record.jewelry_image_url ? [record.jewelry_image_url] : [],
      brand_guideline_images: record.brand_guideline_image_url ? [record.brand_guideline_image_url] : [],
      duration: record.duration || "15s",
      aspect_ratio: record.aspect_ratio || "16:9",
      gender: record.gender || "Female",
      age: record.age || "25",
      country: record.country || "France",
      ethnicity: record.ethnicity || "Caucasian",
    });

    // 3. Execute AI Video Generation with up to 3 automatic retries for transient errors
    const result = await executeVideoGenerationWithRetry({
      prompt: masterPromptInRam,
      aspectRatio: record.aspect_ratio || "16:9",
      duration: record.duration || "15s",
      imageUrl: record.jewelry_image_url || record.image_url,
      brandImageUrl: record.brand_guideline_image_url,
    });

    if (result.success && (result.videoUrl || result.taskId)) {
      const sourceUrl = result.videoUrl || "/hero-ring.png";

      // 3. Save output video to Cloudflare R2 under users/{userId}/outputs/
      const permanentR2Url = await saveGeneratedVideoToR2(
        record.user_id,
        genId,
        sourceUrl
      );

      // 4. Update status to COMPLETED
      await supabase
        .from("generation_history")
        .update({
          status: "COMPLETED",
          output_url: permanentR2Url,
          retry_count: result.retryCount || 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", genId);

      return NextResponse.json({
        success: true,
        status: "COMPLETED",
        output_url: permanentR2Url,
      });
    } else {
      // 5. Generation Failed — Trigger Automatic Credit Refund via PostgreSQL RPC
      const rawError = result.error || "AI provider temporary failure";

      const { data: rpcData, error: rpcErr } = await supabase.rpc(
        "refund_generation_credits",
        {
          p_gen_id: genId,
          p_reason: `Automatic refund: ${rawError.substring(0, 100)}`,
        }
      );

      // Fallback refund update if RPC procedure is updating
      if (rpcErr || (rpcData && !rpcData.success)) {
        console.warn("[REFUND FALLBACK] Calling direct DB updates for refund:", rpcErr);

        if (!record.refunded) {
          const { data: wallet } = await supabase
            .from("user_wallets")
            .select("available_credits")
            .eq("user_id", record.user_id)
            .single();

          const currentCredits = Number(wallet?.available_credits || 0);
          const refundedCredits = currentCredits + Number(record.credits_consumed || 3);

          await supabase
            .from("user_wallets")
            .update({ available_credits: refundedCredits, updated_at: new Date().toISOString() })
            .eq("user_id", record.user_id);

          await supabase.from("credit_transactions").insert({
            user_id: record.user_id,
            amount: Number(record.credits_consumed || 3),
            balance_before: currentCredits,
            balance_after: refundedCredits,
            type: "refund",
            description: `Refund for failed video generation (${genId})`,
            reference_id: `refund_${genId}`,
            created_at: new Date().toISOString(),
          });

          await supabase
            .from("generation_history")
            .update({
              status: "FAILED",
              error_message: rawError,
              retry_count: result.retryCount || 0,
              refunded: true,
              updated_at: new Date().toISOString(),
            })
            .eq("id", genId);
        }
      }

      return NextResponse.json({
        success: false,
        status: "FAILED",
        refunded: true,
        message:
          "Video generation failed. Your credits have been refunded automatically. This can occasionally happen due to temporary AI provider issues or safety filters. Please try again.",
      });
    }
  } catch (err: any) {
    console.error("Render Process API Error:", err);
    return NextResponse.json({ error: err.message || "Render processing failed" }, { status: 500 });
  }
}
