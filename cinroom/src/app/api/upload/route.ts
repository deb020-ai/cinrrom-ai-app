import { NextResponse } from "next/server";
import { uploadUserAssetToR2 } from "@/lib/r2";
import { validateUploadFile } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userIdParam = (formData.get("user_id") as string) || "shared";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 🛡️ SECURITY: 20MB File Upload Security & MIME Validation
    const valResult = validateUploadFile({ size: file.size, type: file.type, name: file.name });
    if (!valResult.valid) {
      return NextResponse.json({ error: valResult.error || "Invalid file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicUrl = await uploadUserAssetToR2(userIdParam, "uploads", buffer, file.name, file.type);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (error: any) {
    console.error("R2 Upload Error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file to R2" }, { status: 500 });
  }
}
