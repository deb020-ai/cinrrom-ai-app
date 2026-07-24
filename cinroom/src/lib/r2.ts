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

export async function uploadToR2(fileBuffer: Buffer, fileName: string, contentType: string) {
  const key = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

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
