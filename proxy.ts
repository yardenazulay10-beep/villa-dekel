import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const LIMITS: Record<string, number> = {
  "/api/availability": 20,
  "/api/blocked-dates": 10,
};

const store = new Map<string, { count: number; reset: number }>();

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const limit = LIMITS[pathname];
  if (!limit) return NextResponse.next();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const key = `${ip}:${pathname}`;
  const now = Date.now();

  let entry = store.get(key);
  if (!entry || now > entry.reset) {
    entry = { count: 0, reset: now + WINDOW_MS };
    store.set(key, entry);
  }

  entry.count++;

  if (entry.count > limit) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: { "Retry-After": String(Math.ceil((entry.reset - now) / 1000)) },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/availability", "/api/blocked-dates"],
};
