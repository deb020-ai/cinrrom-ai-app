import { z } from "zod";

/**
 * Strict Zod Validation Schema for Image Generation Requests
 */
export const imageGenerationSchema = z.object({
  userId: z.string().min(1, "User ID is required").max(128, "Invalid User ID length"),
  mode: z.enum([
    "outdoor_campaign",
    "model_showcase",
    "ai_director",
    "fantasy_world",
    "animal_campaign",
  ], { message: "Invalid campaign mode" }),
  jewelryImages: z.array(z.string()).min(1, "At least 1 jewelry reference image is required").max(10, "Maximum 10 images allowed"),
  brandGuidelineImages: z.array(z.string()).max(5, "Maximum 5 brand images allowed").optional().default([]),
  aspectRatio: z.enum(["16:9", "9:16", "1:1", "4:5", "3:4"]).default("16:9"),
  gender: z.string().max(50).optional(),
  age: z.string().max(10).optional(),
  country: z.string().max(100).optional(),
  ethnicity: z.string().max(50).optional(),
  fantasyTheme: z.string().max(500, "Fantasy theme text exceeds maximum length").optional(),
  animal: z.string().max(200, "Animal text exceeds maximum length").optional(),
  creativePrompt: z.string().max(1000, "Creative prompt text exceeds maximum length").optional(),
});

/**
 * Strict Zod Validation Schema for Video Generation Requests
 */
export const videoGenerationSchema = z.object({
  userId: z.string().min(1, "User ID is required").max(128, "Invalid User ID length"),
  mode: z.enum([
    "outdoor_campaign",
    "model_showcase",
    "ai_director",
    "fantasy_world",
    "animal_campaign",
  ], { message: "Invalid campaign mode" }),
  jewelryImages: z.array(z.string()).min(1, "At least 1 jewelry reference image is required").max(10),
  brandGuidelineImages: z.array(z.string()).max(5).optional().default([]),
  duration: z.enum(["5s", "10s", "15s"]).default("15s"),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]).default("16:9"),
  gender: z.string().max(50).optional(),
  age: z.string().max(10).optional(),
  country: z.string().max(100).optional(),
  ethnicity: z.string().max(50).optional(),
  fantasyTheme: z.string().max(500).optional(),
  animal: z.string().max(200).optional(),
  creativePrompt: z.string().max(1000).optional(),
});

/**
 * Strict File Upload Security Validation
 */
export const fileUploadValidation = {
  maxSizeBytes: 10 * 1024 * 1024, // 10 MB Max
  allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  allowedExtensions: [".png", ".jpg", ".jpeg", ".webp"],
};

/**
 * Validates file upload payload
 */
export function validateUploadFile(file: { size: number; type: string; name: string }): { valid: boolean; error?: string } {
  if (!file) return { valid: false, error: "No file provided" };
  if (file.size > fileUploadValidation.maxSizeBytes) {
    return { valid: false, error: "File size exceeds 10MB limit." };
  }
  const mimeType = file.type.toLowerCase();
  if (!fileUploadValidation.allowedMimeTypes.includes(mimeType)) {
    return { valid: false, error: "Invalid file format. Only PNG, JPG, and WEBP images are allowed." };
  }
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!fileUploadValidation.allowedExtensions.includes(ext)) {
    return { valid: false, error: "Invalid file extension." };
  }
  return { valid: true };
}
