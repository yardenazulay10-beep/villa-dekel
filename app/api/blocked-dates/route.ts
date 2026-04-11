import { NextResponse } from "next/server";

const LISTING_ID = process.env.AIRBNB_LISTING_ID!;
const API_KEY = process.env.AIRBNB_API_KEY!;
const HASH = process.env.AIRBNB_CALENDAR_HASH!;

async function fetchAirbnbMonthsRaw(month: number, year: number, count: number) {
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
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "X-Airbnb-API-Key": API_KEY,
      "Accept": "application/json",
      "Accept-Language": "he-IL,he;q=0.9,en;q=0.8",
      "Referer": `https://www.airbnb.com/rooms/${LISTING_ID}`,
      "Origin": "https://www.airbnb.com",
    },
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  return { status: res.status, data: res.ok ? await res.json() : await res.text() };
}

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
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "X-Airbnb-API-Key": API_KEY,
      "Accept": "application/json",
      "Accept-Language": "he-IL,he;q=0.9,en;q=0.8",
      "Referer": `https://www.airbnb.com/rooms/${LISTING_ID}`,
      "Origin": "https://www.airbnb.com",
    },
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(`[blocked-dates] Airbnb returned ${res.status}`);
    return [];
  }

  const data = await res.json();
  const months: Array<{ days: Array<{ calendarDate: string; available: boolean; availableForCheckout: boolean }> }> =
    data?.data?.merlin?.pdpAvailabilityCalendar?.calendarMonths ?? [];

  console.log(`[blocked-dates] Got ${months.length} months from Airbnb`);

  const blocked: string[] = [];
  for (const m of months) {
    for (const day of m.days ?? []) {
      if (!day.available && !day.availableForCheckout) {
        blocked.push(day.calendarDate);
      }
    }
  }

  console.log(`[blocked-dates] ${blocked.length} blocked dates found`);
  return blocked;
}

export const revalidate = 1800;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("debug") === "1") {
    const today = new Date();
    const raw = await fetchAirbnbMonthsRaw(today.getMonth() + 1, today.getFullYear(), 4);
    return NextResponse.json(raw);
  }
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const todayISO = `${year}-${String(month).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  try {
    const blocked = await fetchAirbnbMonths(month, year, 4);
    const future = blocked.filter((d) => d >= todayISO);
    return NextResponse.json({ blockedDates: future, source: "airbnb", count: future.length });
  } catch (e) {
    console.error("[blocked-dates] Error:", e);
    return NextResponse.json({ blockedDates: [], source: "error" });
  }
}
