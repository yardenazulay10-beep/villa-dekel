# נוף הדקל — Handoff Guide

> Everything you need to know to continue, hand off, or rebuild this project from scratch.

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
**Deployment:** Auto-deploys from GitHub main branch on every push. You can also run `vercel --prod --yes` from the project folder.

**Environment Variables** (set in Vercel dashboard → Settings → Environment Variables):
| Key | Value | Purpose |
|-----|-------|---------|
| `MANUAL_BLOCKED_DATES` | comma-separated YYYY-MM-DD | Blocked dates shown in calendar |
| `AIRBNB_ICAL_URL` | iCal URL from Harim | Live blocked dates (when available) |

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

**Managed by:** הרים (Harim Eilat)
- **Phone/WhatsApp:** 054-483-0310
- **Email:** harim.eilat@gmail.com
- **Website:** https://harimeilat.com

All bookings go through Harim. This website only generates leads (WhatsApp button → Harim).

---

## 6. Property Details

- **Address:** הרעות 18, אילת, ישראל
- **GPS:** 29.542760, 34.943146
- **Bedrooms:** 5 | **Bathrooms:** 3
- **Pool:** Heated private pool
- **Capacity:** 12 guests (official)
- **Views:** Red Sea + Aqaba mountains

---

## 7. Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (Edge Runtime)
- **Font:** Heebo + Frank Ruhl Libre (Google Fonts)

**Key files:**
| File | What it does |
|------|-------------|
| `app/page.tsx` | Entire main page (hero, gallery, amenities, map, booking widget) |
| `app/layout.tsx` | HTML shell, fonts, OpenGraph metadata |
| `app/api/blocked-dates/route.ts` | Serves blocked dates from env vars |
| `app/api/availability/route.ts` | Availability check API |
| `middleware.ts` | Rate limiting |
| `app/privacy/page.tsx` | Privacy policy |
| `app/cancellation/page.tsx` | Cancellation policy |
| `app/terms/page.tsx` | Terms of service |
| `app/accessibility/page.tsx` | Accessibility statement |

---

## 8. To-Do / Open Items

- [ ] Get real cancellation policy from Harim → update `/cancellation`
- [ ] Get iCal URL from Harim → set as `AIRBNB_ICAL_URL` in Vercel env vars for live blocked dates
- [ ] Confirm photo copyright with Snir (photographer)
- [ ] Move Vercel project to a personal Vercel account (currently under yardenazulay10-beep)

---

## 9. Who Built This

**Yarden Azulay** — built on behalf of his parents (villa owners)
- GitHub: yardenazulay10-beep
- Yarden does not manage bookings — contact Harim for all booking questions

---

## 10. If Handing Off to a Developer

Give them:
1. GitHub repo: https://github.com/yardenazulay10-beep/villa-dekel
2. Vercel access: invite via https://vercel.com/yardenazulay10-beeps-projects/villa-dekel/settings/members
3. Vercel env vars (screenshot from Settings → Environment Variables)
4. This document
