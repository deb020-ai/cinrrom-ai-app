/**
 * BytePlus Ark SeaDance 2 AI Video Generation Integration
 * Endpoint / Model: ep-20260726025349-6dp7r (SeaDance 2)
 * Includes Failure Classification, Automatic Retries, and Error Diagnostics
 */

export interface VideoGenerationParams {
  prompt: string;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  duration?: "5s" | "10s" | "15s";
  resolution?: "1080p" | "Full HD";
  imageUrl?: string;
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
  
  // Permanent Failure Indicators (Safety filters, invalid input format)
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
    return false; // Do NOT retry permanent failures
  }

  // Transient Failure Indicators (Timeouts, 5xx server errors, rate limits)
  return true; // Default to transient for unexpected timeouts / 5xx
}

export async function generateSeaDanceVideoTask(params: VideoGenerationParams): Promise<any> {
  const apiKey = process.env.BYTEPLUS_ARK_API_KEY;
  const modelEndpoint = process.env.BYTEPLUS_ARK_MODEL_ENDPOINT || "ep-20260726025349-6dp7r";

  if (!apiKey) {
    throw new Error("BYTEPLUS_ARK_API_KEY environment variable is not configured.");
  }

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
          text: `High-converting Full HD commercial studio asset for luxury jewelry brand: ${params.prompt}. Ultra-photorealistic raytraced jewelry rendering. Camera motion: slow cinematic orbit. Lighting: obsidian studio lighting. Aspect ratio: ${params.aspectRatio || "16:9"}.`
        },
        ...(params.imageUrl ? [{ type: "image_url", image_url: { url: params.imageUrl } }] : [])
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

      // If error is permanent (e.g. safety filter), break immediately without retrying
      if (!isTransient) {
        return {
          success: false,
          error: lastError,
          isTransient: false,
          retryCount: attempt - 1,
        };
      }

      // If transient, wait with exponential backoff before retrying
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
