import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "fa06cc07172bcc7508b7327f63bfdf13";
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "cinroom";
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "https://pub-0003e208f78d4ff985150d024edbeb26.r2.dev";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

/**
 * Uploads an asset to structured Cloudflare R2 folder:
 * users/{userId}/{folder}/{timestamp}_{cleanFileName}
 */
export async function uploadUserAssetToR2(
  userId: string,
  folder: "uploads" | "outputs",
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const cleanUser = (userId || "shared").replace(/[^a-zA-Z0-9_-]/g, "");
  const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `users/${cleanUser}/${folder}/${Date.now()}_${cleanName}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType,
    })
  );

  return `${R2_PUBLIC_URL}/${key}`;
}

export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  userId?: string
): Promise<string> {
  return uploadUserAssetToR2(userId || "shared", "uploads", fileBuffer, fileName, contentType);
}

/**
 * Downloads a generated video from AI output and uploads it to Cloudflare R2 under users/{userId}/outputs/,
 * returning the permanent Cloudflare CDN URL.
 */
export async function saveGeneratedVideoToR2(
  userId: string,
  genId: string,
  sourceVideoUrl: string
): Promise<string> {
  try {
    const res = await fetch(sourceVideoUrl);
    if (!res.ok) throw new Error(`Failed to fetch source video: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await uploadUserAssetToR2(
      userId,
      "outputs",
      buffer,
      `commercial_${genId}.mp4`,
      "video/mp4"
    );
  } catch (err) {
    console.error("Error saving generated video to Cloudflare R2:", err);
    return sourceVideoUrl;
  }
}
