import { db } from "@/db";
import { rateLimits } from "@/db/schema";
import { eq, and } from "drizzle-orm";

interface RateLimitConfig {
  ip: string;
  action: string;
  maxAttempts: number;
  lockoutMinutes: number;
}

export async function checkRateLimit({ ip, action, maxAttempts, lockoutMinutes }: RateLimitConfig): Promise<{ success: boolean; error?: string }> {
  try {
    const attemptRecord = await db.query.rateLimits.findFirst({
      where: and(eq(rateLimits.ipAddress, ip), eq(rateLimits.action, action)),
    });

    if (attemptRecord && attemptRecord.lockedUntil && attemptRecord.lockedUntil > new Date()) {
      return { success: false, error: "Too many attempts. Try again later." };
    }

    if (!attemptRecord) {
      await db.insert(rateLimits).values({
        ipAddress: ip,
        action,
        attempts: 1,
        lastAttemptAt: new Date(),
      });
      return { success: true };
    }

    const newAttempts = attemptRecord.attempts + 1;
    const lockedUntil = newAttempts >= maxAttempts ? new Date(Date.now() + lockoutMinutes * 60 * 1000) : null;

    await db
      .update(rateLimits)
      .set({
        attempts: newAttempts,
        lockedUntil,
        lastAttemptAt: new Date(),
      })
      .where(and(eq(rateLimits.ipAddress, ip), eq(rateLimits.action, action)));

    if (newAttempts > maxAttempts) {
       return { success: false, error: "Too many attempts. Try again later." };
    }

    return { success: true };
  } catch (err) {
    console.error(`Rate limit error for ${action}:`, err);
    return { success: false, error: "Rate limit verification failed." };
  }
}

export async function resetRateLimit(ip: string, action: string) {
  await db
    .update(rateLimits)
    .set({ attempts: 0, lockedUntil: null })
    .where(and(eq(rateLimits.ipAddress, ip), eq(rateLimits.action, action)));
}
