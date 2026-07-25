import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: proxy.ts
// Route protection for /dashboard/*
// NOTE: Layout-level server component (src/app/dashboard/layout.tsx) performs strict Supabase token validation.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes: /dashboard and sub-routes
  // Check for any Supabase auth cookies
  const allCookies = request.cookies.getAll();
  const hasSupabaseCookie = allCookies.some((c) => c.name.startsWith("sb-"));

  if (pathname.startsWith("/dashboard")) {
    if (!hasSupabaseCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Never block /login or /signup in proxy.ts to prevent infinite redirect loops!
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
