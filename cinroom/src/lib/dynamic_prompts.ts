import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

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
    // Load disk persistent file into RAM cache on boot
    loadDiskPromptsIntoCache();
  }
  return globalThis.__MASTER_PROMPTS_CACHE__;
}

function getDiskFilePath(): string {
  return path.join(process.cwd(), "src", "lib", "saved_prompts.json");
}

function loadDiskPromptsIntoCache() {
  try {
    const filePath = getDiskFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      if (raw.trim()) {
        const json = JSON.parse(raw);
        const cache = globalThis.__MASTER_PROMPTS_CACHE__ || new Map<string, string>();
        Object.keys(json).forEach((key) => {
          if (json[key]?.template_text) {
            cache.set(key, json[key].template_text);
          }
        });
        globalThis.__MASTER_PROMPTS_CACHE__ = cache;
      }
    }
  } catch (err) {
    console.warn("[DynamicPrompts] Error reading disk saved_prompts.json:", err);
  }
}

function saveDiskPrompt(record: MasterPromptTemplateRecord) {
  try {
    const filePath = getDiskFilePath();
    let currentData: Record<string, MasterPromptTemplateRecord> = {};
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      if (raw.trim()) {
        currentData = JSON.parse(raw);
      }
    }
    currentData[record.id] = record;
    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), "utf8");
  } catch (err) {
    console.warn("[DynamicPrompts] Error writing to disk saved_prompts.json:", err);
  }
}

function deleteDiskPrompt(id: string) {
  try {
    const filePath = getDiskFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      if (raw.trim()) {
        const currentData = JSON.parse(raw);
        delete currentData[id];
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), "utf8");
      }
    }
  } catch (err) {
    console.warn("[DynamicPrompts] Error deleting from disk saved_prompts.json:", err);
  }
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getAllSavedMasterPrompts(): Promise<Record<string, MasterPromptTemplateRecord>> {
  const result: Record<string, MasterPromptTemplateRecord> = {};

  // 1. Read Disk JSON storage
  try {
    const filePath = getDiskFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      if (raw.trim()) {
        const json = JSON.parse(raw);
        Object.assign(result, json);
      }
    }
  } catch (err) {
    console.warn("[DynamicPrompts] Error reading disk file in getAllSavedMasterPrompts:", err);
  }

  // 2. Read Supabase DB overrides
  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data, error } = await supabase.from("master_prompt_templates").select("*");
      if (!error && data) {
        data.forEach((row) => {
          result[row.id] = row;
        });
      }
    }
  } catch (err) {
    console.warn("[DynamicPrompts] DB lookup error in getAllSavedMasterPrompts:", err);
  }

  return result;
}

export async function getMasterPromptTemplate(
  studioType: "video" | "image",
  modeId: string,
  defaultText: string
): Promise<string> {
  const cacheKey = `${studioType}_${modeId}`;

  // 1. Check Disk & DB Overrides dynamically live
  const allPrompts = await getAllSavedMasterPrompts();
  if (allPrompts[cacheKey]?.template_text) {
    const val = allPrompts[cacheKey].template_text;
    getCache().set(cacheKey, val);
    return val;
  }

  // 2. Check RAM Cache
  const cache = getCache();
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
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

  const record: MasterPromptTemplateRecord = {
    id: cacheKey,
    studio_type: studioType,
    mode_id: modeId,
    name: name,
    template_text: templateText,
    updated_at: new Date().toISOString(),
  };

  // 1. Update RAM Cache
  cache.set(cacheKey, templateText);

  // 2. Save to Disk JSON file (Permanent server persistence across reloads)
  saveDiskPrompt(record);

  // 3. Persist to Supabase DB if table exists
  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase
        .from("master_prompt_templates")
        .upsert(record, { onConflict: "id" });

      if (error) {
        console.warn(`[DynamicPrompts] DB sync notice (${error.message}). Saved persistently to server disk & RAM!`);
      }
    }
  } catch (err: any) {
    console.warn(`[DynamicPrompts] Exception syncing DB for ${cacheKey}:`, err);
  }

  return {
    success: true,
    message: `Prompt template "${name}" saved persistently & applied platform-wide!`,
  };
}

export async function resetMasterPromptTemplate(
  studioType: "video" | "image",
  modeId: string
): Promise<boolean> {
  const cacheKey = `${studioType}_${modeId}`;
  const cache = getCache();
  cache.delete(cacheKey);

  deleteDiskPrompt(cacheKey);

  try {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from("master_prompt_templates").delete().eq("id", cacheKey);
    }
  } catch (err) {
    console.warn(`[DynamicPrompts] DB delete notice for ${cacheKey}:`, err);
  }

  return true;
}
