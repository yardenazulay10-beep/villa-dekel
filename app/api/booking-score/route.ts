import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 86400; // cache 24h

// Booking.com blocks server-side scraping — score must be set manually via env var.
// Set BOOKING_SCORE=10.0 and BOOKING_SCORE_DATE=2026-04-12 in Vercel env vars.
// Update whenever you check the score manually.

export async function GET() {
  const score = process.env.BOOKING_SCORE ?? "10.0";
  const date = process.env.BOOKING_SCORE_DATE ?? "אפריל 2026";
  return NextResponse.json({ score, date });
}
