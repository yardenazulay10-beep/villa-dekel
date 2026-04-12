import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.HOTELPMS_BASE_URL!;
const DEKEL_ID = 18;
const MIN_NIGHTS = 2;

const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

function isValidDate(s: string): boolean {
  const d = new Date(s + "T00:00:00");
  return !isNaN(d.getTime()) && d.toISOString().startsWith(s);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { checkin, checkout, adults = 2, children = 0 } = body as Record<string, unknown>;

  if (
    typeof checkin !== "string" || !DATE_RE.test(checkin) || !isValidDate(checkin) ||
    typeof checkout !== "string" || !DATE_RE.test(checkout) || !isValidDate(checkout)
  ) {
    return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
  }

  const adultsNum = Math.min(Math.max(parseInt(String(adults)) || 2, 1), 20);
  const childrenNum = Math.min(Math.max(parseInt(String(children)) || 0, 0), 20);

  const nights = Math.round(
    (new Date(checkout + "T00:00:00").getTime() - new Date(checkin + "T00:00:00").getTime()) / 86400000
  );

  if (nights < 1 || nights > 90) {
    return NextResponse.json({ available: false, reason: "min_nights", minNights: MIN_NIGHTS, nights });
  }

  if (nights < MIN_NIGHTS) {
    return NextResponse.json({ available: false, reason: "min_nights", minNights: MIN_NIGHTS, nights });
  }

  try {
    const res = await fetch(`${BASE}/Availabilities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        checkin,
        checkout,
        promoCode: "",
        currency: "ILS",
        rooms: [{ adults: adultsNum, children: childrenNum, babies: 0, roomTypeId: null, selected: true }],
        ratePlans: null,
      }),
    });

    const data = await res.json();
    type Room = {
      roomTypeId: number;
      available: number;
      rates: Array<{ standardRate: { finalPrice: number; token: string } }>;
    };
    const rooms: Room[] = data?.data?.rooms || [];
    const dekel = rooms.find((r) => r.roomTypeId === DEKEL_ID);

    return NextResponse.json({
      available: !!dekel && dekel.available > 0,
      reason: dekel ? "booked" : "unavailable",
      priceTotal: dekel?.rates?.[0]?.standardRate?.finalPrice ?? null,
      pricePerNight: dekel?.rates?.[0]?.standardRate?.finalPrice && nights > 0
        ? Math.round(dekel.rates[0].standardRate.finalPrice / nights)
        : null,
      nights,
      // token intentionally omitted — not used client-side
    });
  } catch {
    return NextResponse.json({ error: "Availability check failed" }, { status: 502 });
  }
}
