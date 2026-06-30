import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { users, rateLimits, refreshTokens } from "@/db/schema";
import { signToken } from "@/lib/auth";
import crypto from "crypto";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // IP for rate limiting (fallback for testing)
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const actionName = "login";

    // 1. Rate Limiting Check
    const attemptRecord = await db.query.rateLimits.findFirst({
      where: and(eq(rateLimits.ipAddress, ip), eq(rateLimits.action, actionName)),
    });

    if (attemptRecord && attemptRecord.lockedUntil && attemptRecord.lockedUntil > new Date()) {
      return NextResponse.json(
        { error: "Too many failed attempts. Try again later." },
        { status: 429 }
      );
    }

    // 2. Fetch User
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    // 3. Verify Password
    const isValid = user ? await bcrypt.compare(password, user.passwordHash) : false;

    if (!isValid) {
      // Increment failed attempts
      if (!attemptRecord) {
        await db.insert(rateLimits).values({
          ipAddress: ip,
          action: actionName,
          attempts: 1,
          lastAttemptAt: new Date(),
        });
      } else {
        const newAttempts = attemptRecord.attempts + 1;
        const lockedUntil = newAttempts >= MAX_ATTEMPTS ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000) : null;
        
        await db
          .update(rateLimits)
          .set({
            attempts: newAttempts,
            lockedUntil,
            lastAttemptAt: new Date(),
          })
          .where(and(eq(rateLimits.ipAddress, ip), eq(rateLimits.action, actionName)));
      }

      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 4. Successful Login - Reset attempts
    if (attemptRecord) {
      await db.delete(rateLimits).where(and(eq(rateLimits.ipAddress, ip), eq(rateLimits.action, actionName)));
    }

    // 5. Generate Tokens
    const accessToken = await signToken({ userId: user.id, role: user.role || "admin", name: "Admin", type: "access" }, "15m");
    const refreshToken = await signToken({ userId: user.id, role: user.role || "admin", name: "Admin", type: "refresh" }, "7d");
    
    // Create token hash for revocation tracking
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await db.insert(refreshTokens).values({
      userId: user.id,
      tokenHash,
      expiresAt,
    });

    // 6. Set Cookies
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      secure: request.url.startsWith("https://"),
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: request.url.startsWith("https://"),
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
