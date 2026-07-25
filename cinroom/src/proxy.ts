import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: proxy.ts
// Strict Cookie Guard for Supabase Auth Tokens

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read cookies for Supabase authentication project tokens
  const allCookies = request.cookies.getAll();
  const hasSupabaseSession = allCookies.some((c) =>
    c.name.startsWith("sb-pwtxdpgbggzgmscspepe-auth-token") ||
    c.name.startsWith("sb-") ||
    c.name.includes("auth-token")
  );

  // Protected routes: /dashboard and sub-routes
  if (pathname.startsWith("/dashboard")) {
    if (!hasSupabaseSession) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from login/signup
  if (pathname === "/login" || pathname === "/signup") {
    if (hasSupabaseSession) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};
