import { NextResponse } from "next/server";

export async function GET() {
  throw new Error("Sentry test error from Trifort Builders API");
  return NextResponse.json({ success: true });
}
