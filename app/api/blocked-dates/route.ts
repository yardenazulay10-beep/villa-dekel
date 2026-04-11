import { NextResponse } from "next/server";

const LISTING_ID = process.env.AIRBNB_LISTING_ID!;
const API_KEY = process.env.AIRBNB_API_KEY!;
const HASH = process.env.AIRBNB_CALENDAR_HASH!;

async function fetchAirbnbMonths(month: number, year: number, count: number): Promise<string[]> {
  const variables = JSON.stringify({ request: { count, listingId: LISTING_ID, month, year } });
  const extensions = JSON.stringify({ persistedQuery: { version: 1, sha256Hash: HASH } });

  const url =
    `https://www.airbnb.com/api/v3/PdpAvailabilityCalendar` +
    `?operationName=PdpAvailabilityCalendar` +
    `&locale=he&currency=ILS` +
    `&variables=${encodeURIComponent(variables)}` +
    `&extensions=${encodeURIComponent(extensions)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "X-Airbnb-API-Key": API_KEY,
      "Accept": "application/json",
    },
    signal: AbortSignal.timeout(12000),
  });

  if (!res.ok) return [];

  const data = await res.json();
  const months: Array<{ days: Array<{ calendarDate: string; available: boolean; availableForCheckout: boolean }> }> =
    data?.data?.merlin?.pdpAvailabilityCalendar?.calendarMonths ?? [];

  const blocked: string[] = [];
  for (const m of months) {
    for (const day of m.days ?? []) {
      if (!day.available && !day.availableForCheckout) {
        blocked.push(day.calendarDate);
      }
    }
  }
  return blocked;
}

export const revalidate = 1800;

export async function GET() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const todayISO = `${year}-${String(month).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  try {
    const blocked = await fetchAirbnbMonths(month, year, 4);
    const future = blocked.filter((d) => d >= todayISO);
    return NextResponse.json({ blockedDates: future, source: "airbnb" });
  } catch {
    return NextResponse.json({ blockedDates: [], source: "error" });
  }
}
