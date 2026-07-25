import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: proxy.ts replaces middleware.ts
// Checks for Supabase Auth session cookies (sb-pwtxdpgbggzgmscspepe-auth-token / sb-access-token)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read all cookies to detect Supabase Auth token
  const allCookies = request.cookies.getAll();
  const hasSupabaseCookie = allCookies.some((c) =>
    c.name.startsWith("sb-") ||
    c.name.includes("auth-token") ||
    c.name.includes("better-auth")
  );

  // Protected routes: /dashboard and all sub-routes
  if (pathname.startsWith("/dashboard")) {
    if (!hasSupabaseCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from login/signup
  if (pathname === "/login" || pathname === "/signup") {
    if (hasSupabaseCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Only run proxy on these paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};
