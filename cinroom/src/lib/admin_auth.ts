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

export async function isUserSuperAdmin(
  fallbackEmail?: string
): Promise<{ isSuperAdmin: boolean; userEmail?: string }> {
  try {
    let email: string | undefined;

    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      email = user?.email?.toLowerCase();
    } catch (err) {
      console.warn("[AdminAuth] Server cookie auth lookup failed, attempting fallback email check");
    }

    if (!email && fallbackEmail) {
      email = fallbackEmail.toLowerCase();
    }

    if (!email) {
      return { isSuperAdmin: false };
    }

    const superAdminEmails = getSuperAdminEmails();
    const isSuperAdmin = superAdminEmails.includes(email);
    return { isSuperAdmin, userEmail: email };
  } catch (err) {
    console.error("[AdminAuth] Security check exception:", err);
    if (fallbackEmail) {
      const email = fallbackEmail.toLowerCase();
      const superAdminEmails = getSuperAdminEmails();
      return { isSuperAdmin: superAdminEmails.includes(email), userEmail: email };
    }
    return { isSuperAdmin: false };
  }
}
