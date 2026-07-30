import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildImageMasterPrompt } from "@/lib/image_modes";
import { uploadUserAssetToR2 } from "@/lib/r2";
import { generateSeedream5ProImage } from "@/lib/byteplus";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pwtxdpgbggzgmscspepe.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHhkcGdiZ2d6Z21zY3NwZXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk1NDE4MCwiZXhwIjoyMTAwNTMwMTgwfQ.VavXzgIXsO6e4XOdsuWPfuzM0wXx0ZkT_B30aHqNm88";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      mode,
      jewelryImages = [],
      brandGuidelineImages = [],
      aspectRatio = "16:9",
      gender,
      age,
      country,
      ethnicity,
      fantasyTheme,
      animal,
      creativePrompt,
    } = body;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: User session required" }, { status: 401 });
    }

    const creditCost = 0.2; // 0.2 Credits per Editorial Image Render

    // 1. Check user credit balance
    const { data: wallet } = await supabase
      .from("user_wallets")
      .select("available_credits")
      .eq("user_id", userId)
      .single();

    const currentBalance = Number(wallet?.available_credits || 0);

    if (currentBalance < creditCost) {
      return NextResponse.json(
        { error: `Insufficient credits (${currentBalance} available). Required: ${creditCost} Credit.` },
        { status: 402 }
      );
    }

    // 2. Build Master Image Prompt
    const masterPrompt = buildImageMasterPrompt({
      mode,
      jewelry_images: jewelryImages,
      brand_guideline_images: brandGuidelineImages,
      aspect_ratio: aspectRatio,
      gender,
      age,
      country,
      ethnicity,
      fantasy_theme: fantasyTheme,
      animal,
      creative_prompt: creativePrompt,
    });

    let outputImageUrl = "";

    // 3. Execute ByteDance Seedream 5 Pro AI Image Generation API
    try {
      const seedreamRes = await generateSeedream5ProImage({
        prompt: masterPrompt,
        aspectRatio,
        imageUrl: jewelryImages[0],
        brandImageUrl: brandGuidelineImages[0],
      });

      if (seedreamRes.success && seedreamRes.imageUrl) {
        const tempUrl = seedreamRes.imageUrl;
        // Download image buffer and save into Cloudflare R2 permanent storage
        const imgRes = await fetch(tempUrl);
        const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
        outputImageUrl = await uploadUserAssetToR2(
          userId,
          "outputs",
          imgBuffer,
          `seedream5pro_${Date.now()}.png`,
          "image/png"
        );
      } else {
        console.warn("BytePlus Seedream 5 Pro primary image generation notice:", seedreamRes.error);
      }
    } catch (err) {
      console.error("BytePlus Seedream 5 Pro Image API error:", err);
    }

    // Fallback: If OpenAI API key is configured as secondary backup
    if (!outputImageUrl && process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: masterPrompt,
            n: 1,
            size: (aspectRatio === "9:16" || aspectRatio === "4:5" || aspectRatio === "3:4") ? "1024x1792" : aspectRatio === "1:1" ? "1024x1024" : "1792x1024",
            quality: "hd",
          }),
        });

        const openAiData = await response.json();
        if (openAiData?.data?.[0]?.url) {
          const tempUrl = openAiData.data[0].url;
          const imgRes = await fetch(tempUrl);
          const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
          outputImageUrl = await uploadUserAssetToR2(
            userId,
            "outputs",
            imgBuffer,
            `editorial_${Date.now()}.png`,
            "image/png"
          );
        }
      } catch (e) {}
    }

    // If AI generation failed, return error without deducting credits
    if (!outputImageUrl) {
      return NextResponse.json(
        { error: "BytePlus Seedream 5 Pro AI Image Generation temporary failure. No credits were deducted." },
        { status: 500 }
      );
    }

    // 4. Deduct Credits
    const newBalance = currentBalance - creditCost;
    await supabase
      .from("user_wallets")
      .update({ available_credits: newBalance, updated_at: new Date().toISOString() })
      .eq("user_id", userId);

    await supabase.from("credit_transactions").insert({
      user_id: userId,
      amount: -creditCost,
      balance_before: currentBalance,
      balance_after: newBalance,
      type: "deduction",
      description: `Render Image Mode: ${mode} (${aspectRatio}) [BytePlus Seedream 5 Pro]`,
      created_at: new Date().toISOString(),
    });

    // 5. Create Generation History Record
    const { data: genRecord } = await supabase
      .from("generation_history")
      .insert({
        user_id: userId,
        asset_type: "EDITORIAL_IMAGE",
        credits_consumed: creditCost,
        prompt: masterPrompt,
        aspect_ratio: aspectRatio,
        status: "COMPLETED",
        output_url: outputImageUrl,
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    return NextResponse.json({
      success: true,
      id: genRecord?.id || `img_${Date.now()}`,
      output_url: outputImageUrl,
      credits_consumed: creditCost,
      new_balance: newBalance,
      engine: "BytePlus Seedream 5 Pro",
    });
  } catch (err: any) {
    console.error("Image Generation API Error:", err);
    return NextResponse.json({ error: err.message || "Failed to generate image" }, { status: 500 });
  }
}
