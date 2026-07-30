import { NextResponse } from "next/server";
import { updateMasterPromptTemplate, resetMasterPromptTemplate, getAllSavedMasterPrompts } from "@/lib/dynamic_prompts";
import { isUserSuperAdmin } from "@/lib/admin_auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const headerEmail = req.headers.get("x-user-email") || url.searchParams.get("user_email") || undefined;

    // 🛡️ SUPERADMIN SECURITY CHECK
    const { isSuperAdmin } = await isUserSuperAdmin(headerEmail);
    if (!isSuperAdmin) {
      return NextResponse.json(
        { error: "Access Denied: SuperAdmin privileges required." },
        { status: 403 }
      );
    }

    const overrides = await getAllSavedMasterPrompts();

    return NextResponse.json({
      success: true,
      overrides: overrides || {},
    });
  } catch (err: any) {
    console.error("[AdminPrompts] Error fetching prompts:", err);
    return NextResponse.json({ error: err.message || "Failed to load master prompts" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { studio_type, mode_id, name, template_text, action, user_email } = body;

    const headerEmail = req.headers.get("x-user-email") || user_email || undefined;

    // 🛡️ SUPERADMIN SECURITY CHECK
    const { isSuperAdmin } = await isUserSuperAdmin(headerEmail);
    if (!isSuperAdmin) {
      return NextResponse.json(
        { error: "Access Denied: SuperAdmin privileges required." },
        { status: 403 }
      );
    }

    if (!studio_type || !mode_id) {
      return NextResponse.json({ error: "studio_type and mode_id are required" }, { status: 400 });
    }

    if (action === "reset") {
      await resetMasterPromptTemplate(studio_type, mode_id);
      return NextResponse.json({
        success: true,
        message: `Reset master prompt template ${studio_type}_${mode_id} to default.`,
      });
    }

    if (!template_text || typeof template_text !== "string") {
      return NextResponse.json({ error: "template_text string is required" }, { status: 400 });
    }

    const result = await updateMasterPromptTemplate(
      studio_type,
      mode_id,
      name || `${studio_type}_${mode_id}`,
      template_text
    );

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[AdminPrompts] Exception updating prompt:", err);
    return NextResponse.json({ error: err.message || "Failed to save prompt template" }, { status: 500 });
  }
}
