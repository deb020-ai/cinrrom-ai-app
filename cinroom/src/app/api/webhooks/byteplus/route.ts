import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { saveGeneratedVideoToR2 } from "@/lib/r2";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pwtxdpgbggzgmscspepe.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHhkcGdiZ2d6Z21zY3NwZXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk1NDE4MCwiZXhwIjoyMTAwNTMwMTgwfQ.VavXzgIXsO6e4XOdsuWPfuzM0wXx0ZkT_B30aHqNm88";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("[BYTEPLUS WEBHOOK RECEIVED]", JSON.stringify(payload).substring(0, 400));

    const taskId = payload.task_id || payload.id;
    const taskStatus = payload.status || payload.state;
    const videoUrl = payload.video_url || payload.content?.[0]?.video_url;
    const errorDetails = payload.error?.message || payload.error?.code || "AI generation failed";

    if (!taskId) {
      return NextResponse.json({ received: true, note: "No task_id in payload" });
    }

    // 1. Locate generation history record by task_id
    const { data: record } = await supabase
      .from("generation_history")
      .select("*")
      .eq("id", taskId)
      .maybeSingle();

    if (!record) {
      console.warn(`[BYTEPLUS WEBHOOK] Record not found for task ${taskId}`);
      return NextResponse.json({ received: true, warning: "Record not found" });
    }

    // If already COMPLETED or FAILED, acknowledge webhook
    if (record.status === "COMPLETED" || record.status === "FAILED") {
      return NextResponse.json({ received: true, status: record.status });
    }

    // 2. Handle SUCCESS status from BytePlus
    if (taskStatus === "succeeded" && videoUrl) {
      // Download & Save output video into Cloudflare R2 under users/{userId}/outputs/
      const permanentR2Url = await saveGeneratedVideoToR2(
        record.user_id,
        record.id,
        videoUrl
      );

      await supabase
        .from("generation_history")
        .update({
          status: "COMPLETED",
          output_url: permanentR2Url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", record.id);

      console.log(`[BYTEPLUS WEBHOOK ✅] Task ${taskId} succeeded. Saved R2: ${permanentR2Url}`);
      return NextResponse.json({ success: true, status: "COMPLETED" });
    }

    // 3. Handle FAILURE status from BytePlus
    if (taskStatus === "failed" || taskStatus === "error") {
      console.error(`[BYTEPLUS WEBHOOK ❌] Task ${taskId} failed. Reason: ${errorDetails}`);

      // Call database RPC procedure for automatic credit refund
      await supabase.rpc("refund_generation_credits", {
        p_gen_id: record.id,
        p_reason: `BytePlus Webhook Refund: ${errorDetails}`,
      });

      return NextResponse.json({ success: true, status: "FAILED", refunded: true });
    }

    return NextResponse.json({ received: true, status: taskStatus });
  } catch (err: any) {
    console.error("[BYTEPLUS WEBHOOK ERROR]", err);
    return NextResponse.json({ error: err.message || "Webhook processing error" }, { status: 500 });
  }
}
