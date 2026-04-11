import { NextResponse } from "next/server";

export const runtime = "edge";

// Manual override: set MANUAL_BLOCKED_DATES as comma-separated dates (YYYY-MM-DD)
// e.g. "2026-06-25,2026-06-26,2026-06-27,2026-06-28"
// Remove once iCal URL is available from Harim
const MANUAL_DATES = process.env.MANUAL_BLOCKED_DATES ?? "";

// iCal support (set AIRBNB_ICAL_URL env var once Harim provides it)
const ICAL_URL = process.env.AIRBNB_ICAL_URL ?? "";

function parseIcal(text: string): string[] {
  const blocked: string[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let inVevent = false;
  let dtstart = "";
  let dtend = "";

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") { inVevent = true; dtstart = ""; dtend = ""; }
    if (!inVevent) continue;
    if (line.startsWith("DTSTART")) dtstart = line.split(":")[1]?.slice(0, 8) ?? "";
    if (line.startsWith("DTEND")) dtend = line.split(":")[1]?.slice(0, 8) ?? "";
    if (line === "END:VEVENT" && dtstart && dtend) {
      // block all days from dtstart up to (not including) dtend
      let cur = new Date(`${dtstart.slice(0,4)}-${dtstart.slice(4,6)}-${dtstart.slice(6,8)}`);
      const end = new Date(`${dtend.slice(0,4)}-${dtend.slice(4,6)}-${dtend.slice(6,8)}`);
      while (cur < end) {
        blocked.push(cur.toISOString().split("T")[0]);
        cur.setDate(cur.getDate() + 1);
      }
      inVevent = false;
    }
  }
  return blocked;
}

export async function GET() {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];

  // Priority 1: iCal URL from Harim (official Airbnb export)
  if (ICAL_URL) {
    try {
      const res = await fetch(ICAL_URL, { signal: AbortSignal.timeout(10000) });
      if (res.ok) {
        const text = await res.text();
        const blocked = parseIcal(text).filter((d) => d >= todayISO);
        return NextResponse.json({ blockedDates: blocked, source: "ical" });
      }
    } catch {
      // fall through to manual
    }
  }

  // Priority 2: manual dates from env var
  if (MANUAL_DATES) {
    const blocked = MANUAL_DATES
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d >= todayISO);
    return NextResponse.json({ blockedDates: blocked, source: "manual" });
  }

  return NextResponse.json({ blockedDates: [], source: "none" });
}
