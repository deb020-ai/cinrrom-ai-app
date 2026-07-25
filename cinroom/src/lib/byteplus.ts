/**
 * BytePlus Ark SeaDance 2 AI Video Generation Integration
 * Endpoint / Model: ep-20260726025349-6dp7r (SeaDance 2)
 */

export interface VideoGenerationParams {
  prompt: string;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  duration?: "5s" | "10s" | "15s";
  resolution?: "1080p" | "4K";
  imageUrl?: string;
}

export async function generateSeaDanceVideo(params: VideoGenerationParams) {
  const apiKey = process.env.BYTEPLUS_ARK_API_KEY;
  const modelEndpoint = process.env.BYTEPLUS_ARK_MODEL_ENDPOINT || "ep-20260726025349-6dp7r";

  if (!apiKey) {
    throw new Error("BYTEPLUS_ARK_API_KEY environment variable is not configured.");
  }

  try {
    const response = await fetch("https://ark.ap-southeast-1.byteplusapi.com/api/v3/contents/generations/tasks?Action=CreateContentGenerationTask&Version=2024-01-01", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelEndpoint,
        content: [
          {
            type: "text",
            text: `High-converting commercial studio asset for luxury jewelry brand: ${params.prompt}. Ultra-photorealistic 8K raytraced jewelry rendering. Camera motion: slow cinematic orbit. Lighting: obsidian studio lighting. Aspect ratio: ${params.aspectRatio || "16:9"}.`
          },
          ...(params.imageUrl ? [{ type: "image_url", image_url: { url: params.imageUrl } }] : [])
        ]
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("BytePlus SeaDance Video Generation Error:", error);
    throw error;
  }
}
