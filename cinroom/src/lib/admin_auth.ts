import { createClient } from "@/lib/supabase/server";

export const DEFAULT_SUPERADMIN_EMAILS = [
  "debabratabairagyvfx@gmail.com",
  "debabratabairagy020@gmail.com",
  "debabratabairagy757@gmail.com",
];

export function getSuperAdminEmails(): string[] {
  const envVal = process.env.SUPERADMIN_EMAILS || "";
  if (!envVal.trim()) return DEFAULT_SUPERADMIN_EMAILS;
  return envVal
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function isUserSuperAdmin(): Promise<{ isSuperAdmin: boolean; userEmail?: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return { isSuperAdmin: false };
    }

    const email = user.email.toLowerCase();
    const superAdminEmails = getSuperAdminEmails();

    const isSuperAdmin = superAdminEmails.includes(email);
    return { isSuperAdmin, userEmail: email };
  } catch (err) {
    console.error("[AdminAuth] Security check error:", err);
    return { isSuperAdmin: false };
  }
}
