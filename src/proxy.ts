import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  // Only protect /admin routes, excluding the login page and refresh api
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Verify access token
  if (accessToken) {
    const payload = await verifyToken(accessToken);
    if (payload && payload.type === "access") {
      return NextResponse.next();
    }
  }

  // If no valid access token but we have a refresh token, redirect to refresh endpoint
  if (refreshToken) {
    const refreshUrl = new URL("/api/auth/refresh", request.url);
    refreshUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(refreshUrl);
  }

  // No valid tokens, redirect to login
  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
