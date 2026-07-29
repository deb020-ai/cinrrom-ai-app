import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { updateMasterPromptTemplate, resetMasterPromptTemplate } from "@/lib/dynamic_prompts";
import { isUserSuperAdmin } from "@/lib/admin_auth";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  try {
    // 🛡️ SUPERADMIN SECURITY CHECK
    const { isSuperAdmin } = await isUserSuperAdmin();
    if (!isSuperAdmin) {
      return NextResponse.json(
        { error: "Access Denied: SuperAdmin privileges required." },
        { status: 403 }
      );
    }

    const supabase = getSupabaseAdmin();
    let dbPrompts: Record<string, any> = {};

    if (supabase) {
      const { data, error } = await supabase.from("master_prompt_templates").select("*");
      if (!error && data) {
        data.forEach((row) => {
          dbPrompts[row.id] = row;
        });
      }
    }

    return NextResponse.json({
      success: true,
      overrides: dbPrompts,
    });
  } catch (err: any) {
    console.error("[AdminPrompts] Error fetching prompts:", err);
    return NextResponse.json({ error: err.message || "Failed to load master prompts" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    // 🛡️ SUPERADMIN SECURITY CHECK
    const { isSuperAdmin } = await isUserSuperAdmin();
    if (!isSuperAdmin) {
      return NextResponse.json(
        { error: "Access Denied: SuperAdmin privileges required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { studio_type, mode_id, name, template_text, action } = body;

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
