/**
 * OpenAI Image Generation Helper Module
 * STRICTLY USES: "chatgpt-image-latest" (ChatGPT Image 2 API) EXCLUSIVELY
 */

export interface ImageGenerationParams {
  prompt: string;
  size?: "1024x1024" | "1024x1792" | "1792x1024";
  quality?: "standard" | "hd";
}

export async function generatePerformanceCreativeImage(params: ImageGenerationParams) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not configured.");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "chatgpt-image-latest", // ChatGPT Image 2 API Model
        prompt: `Ultra-luxury commercial studio photo for high jewelry brand: ${params.prompt}. Ray-traced diamond reflections, obsidian glass tabletop, 8K resolution, photorealistic commercial ad creative.`,
        n: 1,
        size: params.size || "1024x1024",
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("OpenAI ChatGPT Image 2 Generation Error:", error);
    throw error;
  }
}
