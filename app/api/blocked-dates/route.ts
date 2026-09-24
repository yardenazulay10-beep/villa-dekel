import { NextResponse } from "next/server";

export const runtime = "edge";

// Set MINIHOTEL_ICAL_URL in Vercel env vars once Arkadi provides it
const ICAL_URL = process.env.MINIHOTEL_ICAL_URL ?? "";
const MANUAL_DATES = process.env.MANUAL_BLOCKED_DATES ?? "";

function parseIcal(text: string): string[] {
  const blocked: string[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let inEvent = false, dtstart = "", dtend = "";
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") { inEvent = true; dtstart = ""; dtend = ""; }
    if (!inEvent) continue;
    if (line.startsWith("DTSTART")) dtstart = line.split(":")[1]?.slice(0, 8) ?? "";
    if (line.startsWith("DTEND")) dtend = line.split(":")[1]?.slice(0, 8) ?? "";
    if (line === "END:VEVENT" && dtstart && dtend) {
      const cur = new Date(`${dtstart.slice(0,4)}-${dtstart.slice(4,6)}-${dtstart.slice(6,8)}`);
      const end = new Date(`${dtend.slice(0,4)}-${dtend.slice(4,6)}-${dtend.slice(6,8)}`);
      while (cur < end) { blocked.push(cur.toISOString().split("T")[0]); cur.setDate(cur.getDate() + 1); }
      inEvent = false;
    }
  }
  return blocked;
}

// Five minutes at the edge: a new booking shows within that, and once the iCal URL is
// set the page no longer pays for an upstream fetch on every visit.
const CACHE = { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } };
// A fallback produced by an upstream failure must not be cached, or one transient
// iCal error would freeze an all-dates-free calendar for every visitor.
const NO_CACHE = { headers: { "Cache-Control": "no-store" } };

export async function GET() {
  const todayISO = new Date().toISOString().split("T")[0];
  let upstreamFailed = false;

  if (ICAL_URL) {
    try {
      const res = await fetch(ICAL_URL, { signal: AbortSignal.timeout(10000) });
      if (res.ok) {
        const blocked = parseIcal(await res.text()).filter(d => d >= todayISO);
        return NextResponse.json({ blockedDates: blocked, source: "ical" }, CACHE);
      }
      upstreamFailed = true;
      console.error("[blocked-dates] iCal fetch failed", { status: res.status });
    } catch (err) {
      upstreamFailed = true;
      console.error("[blocked-dates] iCal fetch error", { error: String(err) });
    }
  }

  if (MANUAL_DATES) {
    const blocked = MANUAL_DATES.split(",").map(d => d.trim()).filter(d => d >= todayISO);
    return NextResponse.json({ blockedDates: blocked, source: "manual" }, upstreamFailed ? NO_CACHE : CACHE);
  }

  return NextResponse.json({ blockedDates: [], source: "none" }, upstreamFailed ? NO_CACHE : CACHE);
}
