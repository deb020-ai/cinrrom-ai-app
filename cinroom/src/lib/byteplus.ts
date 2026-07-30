/**
 * BytePlus Ark SeaDance 2 / Cedarance 2 & Seedream 5 Pro AI Generation Integration
 * Endpoint / Model: ep-20260726025349-6dp7r (SeaDance 2 / Cedarance 2 / Seedream 5 Pro)
 * Includes Failure Classification, Automatic Retries, and Error Diagnostics
 */

export interface VideoGenerationParams {
  prompt: string;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  duration?: "5s" | "10s" | "15s";
  resolution?: "1080p" | "Full HD";
  imageUrl?: string;
  brandImageUrl?: string;
}

export interface ImageGenerationParams {
  prompt: string;
  aspectRatio?: string;
  imageUrl?: string;
  brandImageUrl?: string;
}

export interface GenerationResult {
  success: boolean;
  taskId?: string;
  videoUrl?: string;
  error?: string;
  isTransient?: boolean;
  retryCount?: number;
}

/**
 * Determines whether an error is transient (temporary network/5xx/timeout)
 * or permanent (safety content filter, invalid parameters).
 */
export function isTransientFailure(errorMsg: string, status?: number): boolean {
  const lower = errorMsg.toLowerCase();
  
  if (
    lower.includes("safety") ||
    lower.includes("policy") ||
    lower.includes("nsfw") ||
    lower.includes("content_filter") ||
    lower.includes("invalid_parameter") ||
    lower.includes("unauthorized") ||
    status === 400 ||
    status === 401 ||
    status === 403
  ) {
    return false;
  }

  return true;
}

export async function generateSeaDanceVideoTask(params: VideoGenerationParams): Promise<any> {
  const apiKey = process.env.BYTEPLUS_ARK_API_KEY;
  const modelEndpoint = process.env.BYTEPLUS_ARK_MODEL_ENDPOINT || "ep-20260726025349-6dp7r";

  if (!apiKey) {
    throw new Error("BYTEPLUS_ARK_API_KEY environment variable is not configured.");
  }

  const durationNum = params.duration ? parseInt(params.duration.replace("s", ""), 10) : 10;
  const aspectRatio = params.aspectRatio || "16:9";

  const response = await fetch("https://ark.ap-southeast-1.byteplusapi.com/api/v3/contents/generations/tasks?Action=CreateContentGenerationTask&Version=2024-01-01", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelEndpoint,
      watermark: false,
      auto_watermark: false,
      duration: durationNum,
      aspect_ratio: aspectRatio,
      content: [
        {
          type: "text",
          text: params.prompt
        },
        ...(params.imageUrl ? [{ type: "image_url", image_url: { url: params.imageUrl } }] : []),
        ...(params.brandImageUrl ? [{ type: "image_url", image_url: { url: params.brandImageUrl } }] : [])
      ]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    const errorObj = new Error(`BytePlus API returned ${response.status}: ${errorText}`);
    (errorObj as any).status = response.status;
    throw errorObj;
  }

  const data = await response.json();
  return data;
}

/**
 * Executes Video Generation with Automatic Retry for Temporary Provider Failures (up to 3 retries).
 */
export async function executeVideoGenerationWithRetry(
  params: VideoGenerationParams,
  maxRetries: number = 3
): Promise<GenerationResult> {
  let attempt = 0;
  let lastError = "";

  while (attempt < maxRetries) {
    attempt++;
    try {
      const data = await generateSeaDanceVideoTask(params);
      
      if (data?.error) {
        throw new Error(data.error.message || JSON.stringify(data.error));
      }

      return {
        success: true,
        taskId: data?.id || data?.task_id,
        videoUrl: data?.video_url || data?.content?.[0]?.video_url,
        retryCount: attempt - 1,
      };
    } catch (err: any) {
      lastError = err.message || "Unknown provider error";
      const isTransient = isTransientFailure(lastError, err.status);

      console.warn(`[AI PROVIDER] Attempt ${attempt}/${maxRetries} failed: ${lastError}. Transient: ${isTransient}`);

      if (!isTransient) {
        return {
          success: false,
          error: lastError,
          isTransient: false,
          retryCount: attempt - 1,
        };
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
      }
    }
  }

  return {
    success: false,
    error: `Exhausted ${maxRetries} retry attempts. Last error: ${lastError}`,
    isTransient: true,
    retryCount: maxRetries - 1,
  };
}

/**
 * ByteDance Seedream 5 Pro Image Generation Integration (BytePlus Ark API)
 */
export async function generateSeedream5ProImage(
  params: ImageGenerationParams
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  const apiKey = process.env.BYTEPLUS_ARK_API_KEY;
  const modelEndpoint = process.env.BYTEPLUS_ARK_IMAGE_MODEL_ENDPOINT || process.env.BYTEPLUS_ARK_MODEL_ENDPOINT || "ep-20260726025349-6dp7r";

  if (!apiKey) {
    throw new Error("BYTEPLUS_ARK_API_KEY environment variable is not configured.");
  }

  const aspectRatio = params.aspectRatio || "16:9";
  let width = 1792;
  let height = 1024;
  if (aspectRatio === "9:16" || aspectRatio === "4:5" || aspectRatio === "3:4") {
    width = 1024;
    height = 1792;
  } else if (aspectRatio === "1:1") {
    width = 1024;
    height = 1024;
  }

  try {
    // 1. Primary: BytePlus Ark Image Task API (Doubao / Seedream 5 Pro)
    const response = await fetch("https://ark.ap-southeast-1.byteplusapi.com/api/v3/contents/generations/tasks?Action=CreateContentGenerationTask&Version=2024-01-01", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelEndpoint,
        aspect_ratio: aspectRatio,
        content: [
          { type: "text", text: params.prompt },
          ...(params.imageUrl ? [{ type: "image_url", image_url: { url: params.imageUrl } }] : []),
          ...(params.brandImageUrl ? [{ type: "image_url", image_url: { url: params.brandImageUrl } }] : []),
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const url = data?.data?.image_url || data?.image_url || data?.content?.[0]?.image_url || data?.url;
      if (url) {
        return { success: true, imageUrl: url };
      }
    }

    // 2. Direct BytePlus Ark Images Generations endpoint
    const directResponse = await fetch("https://ark.ap-southeast-1.byteplusapi.com/api/v3/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelEndpoint,
        prompt: params.prompt,
        width,
        height,
        response_format: "url",
        ...(params.imageUrl ? { image_url: params.imageUrl } : {}),
      }),
    });

    if (directResponse.ok) {
      const directData = await directResponse.json();
      const directUrl = directData?.data?.[0]?.url || directData?.url;
      if (directUrl) {
        return { success: true, imageUrl: directUrl };
      }
    }

    const errText = await response.text();
    return { success: false, error: `BytePlus Seedream 5 Pro API error: ${errText}` };
  } catch (err: any) {
    console.error("BytePlus Seedream 5 Pro Execution Error:", err);
    return { success: false, error: err.message || "BytePlus Seedream 5 Pro image generation failed" };
  }
}
