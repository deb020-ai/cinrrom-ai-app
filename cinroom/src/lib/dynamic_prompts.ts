import { createClient } from "@supabase/supabase-js";

export interface MasterPromptTemplateRecord {
  id: string;
  studio_type: "video" | "image";
  mode_id: string;
  name: string;
  template_text: string;
  updated_at: string;
}

declare global {
  var __MASTER_PROMPTS_CACHE__: Map<string, string> | undefined;
}

function getCache(): Map<string, string> {
  if (!globalThis.__MASTER_PROMPTS_CACHE__) {
    globalThis.__MASTER_PROMPTS_CACHE__ = new Map<string, string>();
  }
  return globalThis.__MASTER_PROMPTS_CACHE__;
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getMasterPromptTemplate(
  studioType: "video" | "image",
  modeId: string,
  defaultText: string
): Promise<string> {
  const cacheKey = `${studioType}_${modeId}`;
  const cache = getCache();

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase
        .from("master_prompt_templates")
        .select("template_text")
        .eq("id", cacheKey)
        .maybeSingle();

      if (!error && data?.template_text) {
        cache.set(cacheKey, data.template_text);
        return data.template_text;
      }
    }
  } catch (err) {
    console.warn(`[DynamicPrompts] DB lookup error for ${cacheKey}, using default:`, err);
  }

  cache.set(cacheKey, defaultText);
  return defaultText;
}

export async function updateMasterPromptTemplate(
  studioType: "video" | "image",
  modeId: string,
  name: string,
  templateText: string
): Promise<{ success: boolean; message: string }> {
  const cacheKey = `${studioType}_${modeId}`;
  const cache = getCache();

  cache.set(cacheKey, templateText);

  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase
        .from("master_prompt_templates")
        .upsert(
          {
            id: cacheKey,
            studio_type: studioType,
            mode_id: modeId,
            name: name,
            template_text: templateText,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (error) {
        console.error(`[DynamicPrompts] DB upsert failed for ${cacheKey}:`, error.message);
        return { success: false, message: `DB Save Error: ${error.message}` };
      }
    }
  } catch (err: any) {
    console.error(`[DynamicPrompts] Exception saving ${cacheKey}:`, err);
    return { success: false, message: `Save Exception: ${err.message || String(err)}` };
  }

  return { success: true, message: `Prompt template "${name}" updated platform-wide successfully.` };
}

export async function resetMasterPromptTemplate(
  studioType: "video" | "image",
  modeId: string
): Promise<boolean> {
  const cacheKey = `${studioType}_${modeId}`;
  const cache = getCache();
  cache.delete(cacheKey);

  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from("master_prompt_templates").delete().eq("id", cacheKey);
    }
  } catch (err) {
    console.error(`[DynamicPrompts] Error deleting DB override for ${cacheKey}:`, err);
  }

  return true;
}
