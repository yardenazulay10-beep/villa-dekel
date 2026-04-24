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
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Deployed to Vercel

## Booking Engine — MiniHotel PMS
Booking is handled entirely via **MiniHotel iframe** — no custom availability code.
- Provider: MiniHotel (minihotel.io) — contact: Arkadi
- iframe src: `https://frame1.hotelpms.io/BookingFrameClient/hotel/38B5E378B595CF5AF5E034B1E97C2E49/b193d60a-cbf5-45b3-9bba-7c12b388d417/book/rooms?currency=ILS&language=he-IL&roomType=DEKEL_VIEW`
- Scripts loaded via `next/script` (lazyOnload): `iframe-resizer.min.js` + `main.js`
- Constants: `MINIHOTEL_IFRAME_SRC`, `MINIHOTEL_RESIZER_JS`, `MINIHOTEL_MAIN_JS` at top of `app/page.tsx`
- To add another villa: get new iframe URL from Arkadi with different `roomType=` param
- **DO NOT** rebuild a custom calendar/availability widget — MiniHotel handles it all
- Old API routes (`/api/availability`, `/api/blocked-dates`) were deleted — do not recreate
- Old env vars no longer needed: `HOTELPMS_BASE_URL`, `AIRBNB_ICAL_URL`, `MANUAL_BLOCKED_DATES`

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
Analytics, paid ads, email sequences, sales enablement, product management, revops, referral programs — skip these entirely for villa-dekel.
