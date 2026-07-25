import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: proxy.ts replaces middleware.ts
// This runs on the edge before routes are rendered.
// Better Auth stores session in "better-auth.session_token" cookie.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session cookie
  const sessionToken = request.cookies.get("better-auth.session_token");

  // Protected routes: /dashboard and all sub-routes
  if (pathname.startsWith("/dashboard")) {
    if (!sessionToken?.value) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is logged in and tries to visit /login or /signup, redirect to /dashboard
  if (pathname === "/login" || pathname === "/signup") {
    if (sessionToken?.value) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Only run proxy on these paths (exclude api, static files, images)
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};
