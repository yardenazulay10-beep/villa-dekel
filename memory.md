# Villa Dekel: Project Memory

> Dynamic context. Claude updates this file when it learns something new about the project, discovers a gotcha, or makes a decision with lasting impact. Static instructions live in CLAUDE.md.

---

## Current state (as of May 1, 2026)

- Site is live at https://www.nofhadekel.com, fully deployed on Vercel
- Booking engine: MiniHotel iframe, fully integrated, do not touch
- Custom availability/calendar code was removed, do not recreate
- GA4 set up (Measurement ID: G-H4ZDVC2SVB) and verified working
- `booking_initiated` GA4 event fires on booking button click with check_in, check_out, nights, guests
- Google Business Profile created, PENDING video verification by Harim
- UptimeRobot monitoring active on www.nofhadekel.com (5 min interval, email alerts)
- Looker Studio monthly report scheduled (1st of month → yarden.azulay.10@gmail.com)
- Security audit complete, all items green or acceptable
- HANDOFF.md is the canonical project reference, always read it at session start

## Key decisions

- **MiniHotel over custom booking:** Arkadi from MiniHotel provides iframe. No custom calendar needed.
- **WhatsApp CTA as primary:** Floating button → Harim's WhatsApp (054-483-0310). Not a contact form.
- **Hebrew only:** RTL, Israeli market. No English version planned.
- **No party groups:** Copy and imagery signals family/luxury, not nightlife.
- **Env var is MINIHOTEL_ICAL_URL**, old names (AIRBNB_ICAL_URL, HOTELPMS_BASE_URL) are dead

## Gotchas

- GA4 ID is G-H4ZDVC2SVB, letter B at end, not digit 8
- CORS in next.config.ts covers both `nofhadekel.com` AND `www.nofhadekel.com` (fixed May 1)
- Rate limiting is in-memory Edge Map, resets on cold starts, acceptable at this traffic level
- MiniHotel iframe needs two scripts via `next/script` (lazyOnload): iframe-resizer.min.js + main.js
- Constants for iframe URL live at top of `app/page.tsx`, change there only
- Domain on Namecheap (yarden.azulay.10@gmail.com), DNS pointed to Vercel

## Security audit (May 1, 2026)

- Auth / input validation / DB / password reset: N/A
- CORS: fixed (www subdomain added)
- Rate limiting: partial, acceptable
- Logging: fixed (structured console.error in blocked-dates API)
- Alerts: done (UptimeRobot)
- Rollback: done (Vercel instant rollback + GitHub)

## Pending

- [ ] GBP video verification, Harim records short video at villa, uploads via GBP dashboard
- [ ] iCal URL from Yuval, set as MINIHOTEL_ICAL_URL in Vercel env vars
- [ ] Upload 10+ photos to GBP after verification goes public
- [ ] Claim 1500 NIS Google Ads credit from GBP dashboard

## People

- **Harim Eilat**, property manager, all bookings. WhatsApp: 054-483-0310, harim.eilat@gmail.com
- **Arkadi**, MiniHotel contact for iframe URLs
- **Yuval**, has the iCal export URL from Airbnb/Booking.com
- **Yarden's parents**, villa owners, not involved in site decisions

## Yarden's preferences for this project

- Luxury minimal, no loud CTAs, no clutter
- Mobile-first (most visitors from WhatsApp shares)
- Reference aesthetic: Le Collectionist
- Action over explanation

---

*Last updated: 2026-05-01*

## 2026-09-13 findings (from the video-vetting session)
- **LIVE CONTRADICTION, unfixed:** `app/layout.tsx:182-188` loads GA4 (G-H4ZDVC2SVB) unconditionally with no consent gate, while `app/privacy/page.tsx:56-58` section 5 states "האתר אינו משתמש בעוגיות שיווקיות או מעקב" (no marketing or tracking cookies). GA4 sets _ga cookies. Either correct the policy text or gate GA4 behind consent. Highest-priority item on the project.
- **Two divergent working copies.** This one (`C:/Users/yazulay/Projects/villa-dekel`, main, villa-dekel.git, HEAD 9125565) is canonical. The copy at `OneDrive - abra-IT/Documents/Yarden/villa-dekel` is on `master`, points at `yarden-projects.git`, sits at 2fc71eb from 2026-04-12 and has no GA4. Do not edit the OneDrive copy.
- **New media from Snir** (photos + 1 video) pending integration. `public/media/` already holds 69 files (6 video) named imgNN.jpg, referenced hardcoded as `/media/imgNN.jpg`. No gallery manifest exists, so grep every `/media/` reference before renaming. Optimise to WebP/AVIF before committing; note commercial-use permission in this file once confirmed.
- **PRODUCT.md and DESIGN.md do not exist**, so the installed Impeccable skill silently refuses all file mutation even though CLAUDE.md auto-triggers it on UI work. Reinstall Impeccable from the plugin marketplace (local copy is an April build on the old `$impeccable` syntax), then run teach + document.
- **Accessibility exemption to confirm:** Israeli reg. 35ו(ז) exempts an עוסק פטור or turnover at or under 100,000 NIS from the internet accessibility requirement. Check the property's status before spending on accessibility tooling.
- Full brief: `C:/Users/yazulay/.claude/wiki/daily/2026-09-13-villa-dekel-brief.md`
