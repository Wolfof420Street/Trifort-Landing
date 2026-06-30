import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { refreshTokens, users } from "@/db/schema";
import { signToken, verifyToken } from "@/lib/auth";
import crypto from "crypto";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectPath = url.searchParams.get("redirect") || "/admin/dashboard";

  // Check refresh token cookie
  const refreshTokenCookie = request.headers.get("cookie")?.split("; ").find(c => c.startsWith("refreshToken="));
  const refreshToken = refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Verify signature
  const payload = await verifyToken(refreshToken);
  if (!payload || payload.type !== "refresh") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Verify in database (ensure not revoked and exists)
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const [dbToken] = await db.select().from(refreshTokens).where(eq(refreshTokens.tokenHash, tokenHash));

  if (!dbToken || dbToken.revokedAt || dbToken.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Validate user still exists
  const [user] = await db.select().from(users).where(eq(users.id, payload.userId));
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Issue new access token
  const newAccessToken = await signToken({ userId: user.id, role: user.role || "admin", name: "Admin", type: "access" }, "15m");

  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  response.cookies.set({
    name: "accessToken",
    value: newAccessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60,
    path: "/",
  });

  return response;
}
