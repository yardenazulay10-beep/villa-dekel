# נוף הדקל — Villa Dekel Website

## Project Goal
A standalone Hebrew landing page for "נוף הדקל" (Villa Dekel) in Eilat, Israel.
Drive direct bookings for the property, bypassing Airbnb/Booking.com fees.
Managed by הרים (Harim Eilat) — contact them for bookings.

## Property Details
- **Name:** נוף הדקל / Villa Dekel
- **Location:** הרעות 18, אילת, ישראל
- **GPS:** 29.542760, 34.943146
- **Managed by:** הרים (Harim Eilat) — harimeilat.com
- **Bedrooms:** 5
- **Bathrooms:** 3
- **Pool:** Heated private pool
- **Views:** Panoramic — Red Sea + Aqaba mountains
- **Amenities:** AC, WiFi, free parking, washer, kitchen, BBQ, pergola terrace, outdoor shower, garden
- **Platform listings:** Airbnb, Booking.com (but goal is direct bookings)

## Target Audience
- Israeli families and large groups
- NOT young party groups or bachelor/bachelorette groups
- Emphasis on premium, quiet, family-friendly

## Language
Hebrew only (RTL). Israeli market.

## Design Direction
- Luxury minimal — lots of white space, clean lines
- Color palette: deep navy, sand/stone, warm gold accents
- Typography: elegant, premium feel
- Mobile-first (most traffic from WhatsApp shares)
- No clutter, no orange/loud CTAs (unlike Harim's current site)

## Key CTA
WhatsApp floating button + "בדקו זמינות" → links to Harim contact / booking page

## Tech Stack
- Next.js 16.2.3 (App Router)
- TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Deployed to Vercel, auto-deploys on push to `main`
- **No component library.** Runtime dependencies are exactly `next`, `react`, `react-dom`. There is no shadcn/ui, no Radix, no `components.json`. Every component in `app/` is hand-written. Do not `import` from a UI library that is not installed.
- `middleware.ts` exists and builds warn it is deprecated in favour of `proxy.ts`. Not urgent, but that is the migration when it breaks.

## Booking flow (read this before touching `app/page.tsx`)
> Corrected 2026-09-24 against the code. The previous version of this section described an architecture that was planned and then reversed, and it told future sessions to delete working files.

Booking is **a custom date picker on this site that hands off to MiniHotel in a new tab.** MiniHotel is not embedded.

1. `app/page.tsx` renders its own calendar. `handleDay` sets `checkIn` / `checkOut`.
2. On mount it fetches `/api/blocked-dates` to grey out unavailable days.
3. The CTA fires the GA4 event `booking_initiated`, then calls `window.open(minihotelUrl(checkIn, checkOut))` which opens MiniHotel in a new tab with the dates prefilled.

What actually exists in the code:
- `MINIHOTEL_BASE` — the one constant, at `app/page.tsx:79`. `minihotelUrl()` on line 80 appends `&checkin=&checkout=`.
- `app/api/blocked-dates/route.ts` — **live and in use.** Reads `MINIHOTEL_ICAL_URL`, falling back to `MANUAL_BLOCKED_DATES`.
- The only `<iframe>` on the page is the Google Map.
- Provider contact for a new `roomType=` URL is still Arkadi at MiniHotel.

Things the old section claimed that are **not true**: there is no MiniHotel iframe, no `iframe-resizer.min.js`, no `main.js`, no `lazyOnload` scripts, and no `MINIHOTEL_IFRAME_SRC` / `MINIHOTEL_RESIZER_JS` / `MINIHOTEL_MAIN_JS` constants. `/api/blocked-dates` was never deleted. `/api/availability` genuinely was.

**Open issue: the calendar shows every date as free.** `MINIHOTEL_ICAL_URL` is unset in Vercel, so the route falls through to `MANUAL_BLOCKED_DATES`, which is also empty. Live it returns `{"blockedDates":[],"source":"manual"}`. A guest can pick dates the villa is already booked and only find out on MiniHotel. Yuval has the iCal export URL; get it via Harim and set `MINIHOTEL_ICAL_URL` in Vercel. `AIRBNB_ICAL_URL` and `HOTELPMS_BASE_URL` are dead names, do not use them.

## Analytics
GA4 `G-H4ZDVC2SVB` (final character is letter B, not digit 8), running **cookieless** via Consent Mode v2.
- Consent defaults are an inline `<script>` in `<head>` in `app/layout.tsx`, and must execute before `gtag.js`. Defaults set after it loads are ignored.
- `analytics_storage: 'denied'` means no `_ga` cookies and cookieless pings. Verified live: zero cookies, `gcs=G100`.
- In the built HTML `googletagmanager.com/gtag/js` appears early as a `<link rel="preload">`. That is a fetch hint, not execution. Do not "fix" the ordering.
- `booking_initiated` is the site's only conversion event. Numeric params arrive under the `epn.` prefix (`epn.nights`), strings under `ep.`.
- `client_storage: 'none'` is not a real GA4 parameter.

## Capacity
- 12 guests official, can accommodate more with extra mattresses

## Booking Contact (Harim Eilat)
- WhatsApp/Phone: 054-483-0310
- Email: harim.eilat@gmail.com
- Address: Almogim 21, Eilat

## Domain
- **nofhadekel.com** — purchased on Namecheap (Apr 10, 2026), order 199420052
- Registrar: Namecheap account: yarden.azulay.10@gmail.com
- Deploy to Vercel first, then point Namecheap DNS to Vercel

## Owner
- Yarden Azulay — building on behalf of his parents who own the villa
- Parents don't manage bookings — Harim Eilat handles all operations

## Reference Sites (to beat)
- harimeilat.com (current manager — bad design, to replace visually)
- booking.com/hotel/il/dekel-view-by-harim (existing listing)
- Le Collectionist style (target aesthetic)

---

## Skills & When to Use Them (AUTO — no need to ask)

### Always-on rules
- After **any code change** → run `/codex quality` to audit before deploying
- After **any deploy** → confirm live at nofhadekel.com
- After **any structural change** → update `HANDOFF.md`

### Trigger map — use these automatically when the task matches

| Task | Skill / MCP to use |
|------|--------------------|
| Building or redesigning any UI section | `frontend-design` + `ui-ux-pro-max` |
| Reviewing visual design quality | `design-auditor` |
| Deep UI polish (`impeccable`) | Needs `PRODUCT.md` and `DESIGN.md` at the project root. Neither exists, so the skill silently refuses every file mutation. Run `impeccable teach` then `impeccable document` first. |
| Writing or improving Hebrew copy | `copywriting` → then `humanizer` |
| Improving conversion (CTAs, forms, flow) | `page-cro` |
| Testing the live or local site | `webapp-testing` (Playwright) |
| Code review / quality gate before deploy | `codex` |
| Adding new React components | `magic` (21st.dev) |
| Generating property images | `banana` (Gemini) |
| Checking Next.js / Tailwind docs | `context7` |
| SEO improvements | `seo-audit` → `schema-markup` |
| Map / location features | `google-maps` MCP |
| Searching the web for references | `tavily` |

### Skills NOT relevant to this project
Paid ads, email sequences, sales enablement, product management, revops and referral programs are not relevant here.

`analytics-tracking` **is** relevant: GA4 is cookieless via Consent Mode and `booking_initiated` is the only conversion event on the site.
