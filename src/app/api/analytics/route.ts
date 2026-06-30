import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { analyticsEvents } from "@/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

const analyticsSchema = z.object({
  sessionId: z.string().min(1),
  path: z.string().min(1),
  referrer: z.string().optional().nullable(),
  eventType: z.string().min(1),
});

async function getClientIp() {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") || "127.0.0.1";
}

export async function POST(req: Request) {
  try {
    const ip = await getClientIp();
    // 50 requests per 10 minutes from a single IP to prevent spam
    const rateLimit = await checkRateLimit({ ip, action: "analytics_event", maxAttempts: 50, lockoutMinutes: 10 });
    if (!rateLimit.success) {
      return NextResponse.json({ success: false, error: rateLimit.error }, { status: 429 });
    }

    const body = await req.json();
    const data = analyticsSchema.parse(body);

    await db.insert(analyticsEvents).values({
      sessionId: data.sessionId,
      path: data.path,
      referrer: data.referrer || null,
      eventType: data.eventType,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
