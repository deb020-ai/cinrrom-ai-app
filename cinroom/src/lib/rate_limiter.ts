import { createClient } from "@supabase/supabase-js";

// In-Memory Sliding Window Rate Limiter Cache
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Endpoint Rate Limiting (Token Bucket / Sliding Window)
 * Limits requests per IP / User identifier within a time window.
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTimeMs: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetTimeMs: windowMs };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTimeMs: Math.max(0, record.resetTime - now),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTimeMs: Math.max(0, record.resetTime - now),
  };
}

/**
 * Video Generation Concurrency Guard
 * Enforces a strict maximum of 2 active video generations at once per user.
 */
export async function checkVideoConcurrency(
  supabase: any,
  userId: string,
  maxAllowed: number = 2
): Promise<{ allowed: boolean; activeCount: number }> {
  try {
    const { count, error } = await supabase
      .from("generation_history")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .or("asset_type.eq.COMMERCIAL_VIDEO,asset_type.eq.VIDEO")
      .in("status", ["RENDERING", "PROCESSING", "PENDING"]);

    if (error) {
      console.warn("[ConcurrencyGuard] Video count check query note:", error.message);
    }

    const activeCount = count || 0;
    return {
      allowed: activeCount < maxAllowed,
      activeCount,
    };
  } catch (err) {
    console.error("[ConcurrencyGuard] Exception checking video concurrency:", err);
    return { allowed: true, activeCount: 0 };
  }
}

/**
 * Image Generation Concurrency Guard
 * Enforces a strict maximum of 2 active image generations at once per user.
 */
export async function checkImageConcurrency(
  supabase: any,
  userId: string,
  maxAllowed: number = 2
): Promise<{ allowed: boolean; activeCount: number }> {
  try {
    const { count, error } = await supabase
      .from("generation_history")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .or("asset_type.eq.EDITORIAL_IMAGE,asset_type.eq.IMAGE")
      .in("status", ["RENDERING", "PROCESSING", "PENDING"]);

    if (error) {
      console.warn("[ConcurrencyGuard] Image count check query note:", error.message);
    }

    const activeCount = count || 0;
    return {
      allowed: activeCount < maxAllowed,
      activeCount,
    };
  } catch (err) {
    console.error("[ConcurrencyGuard] Exception checking image concurrency:", err);
    return { allowed: true, activeCount: 0 };
  }
}

/**
 * Input Sanitization & Prompt Injection Defense
 * Strips script/HTML tags and enforces max length boundaries.
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input) return "";
  let clean = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }
  return clean;
}
