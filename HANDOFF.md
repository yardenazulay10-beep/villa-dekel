# נוף הדקל — Handoff Guide

> Everything you need to know to continue, hand off, or rebuild this project from scratch.
> Last updated: April 24, 2026

---

## 1. The Website

**Live URL:** https://www.nofhadekel.com
**What it is:** A luxury Hebrew RTL landing page for Villa Dekel in Eilat. Goal is direct bookings, bypassing Airbnb/Booking.com fees.

---

## 2. Code — GitHub

**Repo:** https://github.com/yardenazulay10-beep/villa-dekel
**Account:** yardenazulay10-beep (your personal GitHub)
**Branch:** main

To clone and run locally:
```bash
git clone https://github.com/yardenazulay10-beep/villa-dekel.git
cd villa-dekel
npm install
npm run dev
```
Site runs at http://localhost:3000

---

## 3. Hosting — Vercel

**Dashboard:** https://vercel.com/yardenazulay10-beeps-projects/villa-dekel
**Account login:** your personal account (not ABRA)
**Deployment:** Auto-deploys from GitHub main branch on every push. You can also run `vercel --prod` from the project folder.

**Environment Variables** (set in Vercel dashboard → Settings → Environment Variables):
| Key | Value | Purpose |
|-----|-------|---------|
| `MANUAL_BLOCKED_DATES` | comma-separated YYYY-MM-DD | Blocked dates shown in calendar (fallback) |
| `MINIHOTEL_ICAL_URL` | iCal URL from Harim/Airbnb | Live blocked dates — ASK YUVAL FOR THIS |

To add/edit env vars: https://vercel.com/yardenazulay10-beeps-projects/villa-dekel/settings/environment-variables

---

## 4. Domain — nofhadekel.com

**Registrar:** Namecheap
**Account:** yarden.azulay.10@gmail.com
**Order #:** 199420052 (purchased April 10, 2026)
**Manage:** https://www.namecheap.com → Domain List → nofhadekel.com

**DNS Records (set in Namecheap):**
| Type | Host | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## 5. Booking & Operations

**Booking system:** MiniHotel PMS (managed by Harim Eilat)
**Managed by:** הרים (Harim Eilat)
- **Phone/WhatsApp:** 054-483-0310
- **Email:** harim.eilat@gmail.com
- **Website:** https://harimeilat.com

**How booking works:**
- Guest picks dates in the calendar widget on the homepage
- Clicks "המשך להזמנה" → opens MiniHotel booking page with dates pre-filled
- MiniHotel URL base: `https://frame1.hotelpms.io/BookingFrameClient/hotel/38B5E378B595CF5AF5E034B1E97C2E49/b193d60a-cbf5-45b3-9bba-7c12b388d417/book/rooms?currency=ILS&language=he-IL&roomType=DEKEL_VIEW`

---

## 6. Property Details

- **Address:** הרעות 18, אילת, ישראל
- **GPS:** 29.542760, 34.943146
- **Bedrooms:** 5 | **Bathrooms:** 3
- **Pool:** Heated private pool
- **Capacity:** 12 guests (official)
- **Views:** Red Sea + Aqaba mountains
- **Booking.com score:** 10/10

---

## 7. Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (Edge Runtime)
- **Font:** Heebo + Frank Ruhl Libre (Google Fonts)

**Key files:**
| File | What it does |
|------|-------------|
| `app/page.tsx` | Entire main page (hero, gallery, amenities, map, booking widget, FAQ) |
| `app/layout.tsx` | HTML shell, fonts, SEO metadata, GA4 scripts, JSON-LD schema |
| `app/api/blocked-dates/route.ts` | Serves blocked dates from iCal or env vars |
| `app/sitemap.ts` | XML sitemap |
| `app/privacy/page.tsx` | Privacy policy |
| `app/cancellation/page.tsx` | Cancellation policy (3-tier: free/50%/100%) |
| `app/terms/page.tsx` | Terms of service |
| `app/accessibility/page.tsx` | Accessibility statement |

---

## 8. Analytics — Google Analytics 4

**Set up:** April 24, 2026
**Measurement ID:** G-H4ZDVC2SVB
**GA4 Dashboard:** https://analytics.google.com
**Account:** yarden.azulay.10@gmail.com

**Custom events tracked:**
| Event | Where | What it captures |
|-------|-------|-----------------|
| `booking_initiated` | "המשך להזמנה" button | check_in, check_out, nights, guests |

**Monthly report:** Data Studio (Looker Studio) report set up April 24, 2026
- Report URL: https://datastudio.google.com/u/0/reporting/bc7f56c2-2bfb-475d-b044-1cb5d07f345d
- Scheduled delivery: 1st of every month to yarden.azulay.10@gmail.com

---

## 9. SEO

**Google Search Console:** https://search.google.com/search-console
- Property: https://www.nofhadekel.com
- Verified: April 2026
- Sitemap submitted: https://www.nofhadekel.com/sitemap.xml

**Schema markup (in layout.tsx):**
- `VacationRental` — property details, address, geo, amenities, rating
- `FAQPage` — 6 Q&A pairs

**Meta:** Title, description, OG image, Twitter card, canonical, robots all configured.

---

## 10. Google Business Profile

**Set up:** April 24, 2026
**Status:** PENDING VIDEO VERIFICATION (not publicly visible yet)
**Profile name:** נוף הדקל
**Category:** Vacation home rental agency
**Profile URL:** https://business.google.com (search "my business")

**To complete verification:**
- Harim needs to record a short video AT the villa showing:
  1. Exterior / street sign (הרעות 18)
  2. Inside a few rooms
  3. Keys or proof of management
- Upload via the GBP dashboard → "Get verified" → Business video

**Once verified:**
- Profile goes public on Google Maps and Search
- Searching "נוף הדקל" will show the direct booking website

**Google Ads credit:** ₪1,500 credit available — claim from GBP dashboard when ready.

---

## 11. Open Items / To-Do

- [ ] **GBP video verification** — Harim records short video at the villa and uploads
- [ ] **iCal URL from Yuval** — Ask Yuval for the Airbnb/Booking.com iCal export URL, then set as `MINIHOTEL_ICAL_URL` in Vercel env vars
- [ ] **Upload photos to GBP** — After verification, add 10+ photos to Google Business Profile
- [ ] **Claim ₪1,500 Google Ads credit** — Available in GBP dashboard
- [ ] **Confirm photo copyright with Snir** (photographer)

---

## 12. Who Built This

**Yarden Azulay** — built on behalf of his parents (villa owners)
- GitHub: yardenazulay10-beep
- Email: yarden.azulay.10@gmail.com
- Yarden does not manage bookings — contact Harim for all booking questions

---

## 13. If Handing Off to a Developer

Give them:
1. GitHub repo: https://github.com/yardenazulay10-beep/villa-dekel
2. Vercel access: invite via https://vercel.com/yardenazulay10-beeps-projects/villa-dekel/settings/members
3. Vercel env vars (screenshot from Settings → Environment Variables)
4. GA4 access: https://analytics.google.com → share property
5. GBP access: https://business.google.com → add manager
6. This document

---

## 14. Session Log

| Date | What was done |
|------|--------------|
| Apr 10, 2026 | Domain purchased on Namecheap |
| Apr 12, 2026 | Website built and deployed, initial handoff doc created |
| Apr 24, 2026 | GA4 set up (G-H4ZDVC2SVB), booking click tracking added, Google Business Profile created, Data Studio monthly report scheduled, cancellation policy updated to Harim's real 3-tier policy, MiniHotel booking widget built, FAQ section added, full SEO setup (schema, sitemap, Search Console) |
