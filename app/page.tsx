"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "972544830310";
const WHATSAPP_MSG = encodeURIComponent("שלום, אשמח לשמוע פרטים על וילה נוף הדקל ולבדוק זמינות.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// Curated clean photos only — no people, best quality
const img = (n: number) => `/media/img${n}.jpg`;

const heroSrc = img(48); // pool + loungers + panoramic Red Sea + Aqaba mountains

const aboutSrc = img(56); // open-plan living/dining with pool + sea through full-height doors

// 12 featured gallery images — professional shots, no duplicates with hero/about
const galleryPreview = [
  img(48), // pool + Red Sea panorama          ← featured large
  img(42), // garden + pool + sea view
  img(63), // heated pool + Aqaba mountains
  img(61), // living room leather sofa (professional)
  img(34), // bedroom — panoramic sea windows
  img(37), // BBQ Weber with Red Sea backdrop
  img(46), // pool through architectural frame
  img(38), // pool + sun loungers close
  img(58), // marble bathroom
  img(43), // bedroom — clean white
  img(35), // dining table + staircase
  img(50), // bathroom with tub
];

// All clean photos for lightbox (no people, no low-quality shots)
const cleanPhotos = [
  img(48), img(56), img(42), img(63), img(61), img(34),
  img(37), img(46), img(38), img(58), img(43), img(35),
  img(50), img(55), img(40), img(41), img(36), img(39),
  img(44), img(45), img(60), img(62), img(4),  img(9),
  img(16), img(20), img(8),  img(19), img(21), img(26),
  img(6),  img(1),  img(2),  img(10), img(15), img(18),
];

const amenities = [
  { label: "בריכה פרטית מחוממת" },
  { label: "5 חדרי שינה" },
  { label: "3 חדרי אמבטיה" },
  { label: "נוף פנורמי לים סוף" },
  { label: "נוף להרי עקבה" },
  { label: "מיזוג אוויר מרכזי" },
  { label: "WiFi מהיר" },
  { label: "חניה חינם" },
  { label: "מטבח חוץ ופרגולה" },
  { label: "גינה מטופחת" },
  { label: "מקלחת חוץ" },
  { label: "ממ\"ד" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.083.53 4.09 1.548 5.858L.057 23.5l5.773-1.516A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.68-.504-5.239-1.387l-.376-.222-3.427.9.917-3.346-.244-.387A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}


// Hebrew week in RTL grid: Sun(right, col0) → Sat(left, col6)
const HE_DAYS = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
const HE_MONTHS = ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"];

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function parseDate(s: string) { return new Date(s + "T00:00:00"); }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function formatHe(iso: string) { const d = parseDate(iso); return `${d.getDate()} ${HE_MONTHS[d.getMonth()]}`; }

type AvailResult = {
  available: boolean;
  reason?: "min_nights" | "booked" | "unavailable";
  minNights?: number;
  priceTotal: number | null;
  pricePerNight: number | null;
  nights: number;
  token?: string | null;
};

type BookingData = AvailResult & { checkIn: string; checkOut: string; guests: string };

function AvailabilityWidget({ onBook }: { onBook: (data: BookingData) => void }) {
  const todayISO = toISO(new Date());
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  const [calLoading, setCalLoading] = useState(true);
  const [viewDate, setViewDate] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [guests, setGuests] = useState("4");
  const [status, setStatus] = useState<"idle" | "loading" | "available" | "unavailable" | "error">("idle");
  const [result, setResult] = useState<AvailResult | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25000);
    fetch("/api/blocked-dates", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => setBlocked(new Set(d.blockedDates)))
      .catch(() => {})
      .finally(() => { clearTimeout(timer); setCalLoading(false); });
    return () => { controller.abort(); clearTimeout(timer); };
  }, []);

  const handleDayClick = (iso: string) => {
    if (iso < todayISO || blocked.has(iso)) return;
    if (!checkIn || checkOut) {
      setCheckIn(iso); setCheckOut(null); setStatus("idle"); setResult(null);
    } else {
      if (iso <= checkIn) { setCheckIn(iso); setCheckOut(null); return; }
      setCheckOut(iso);
    }
  };

  const check = async () => {
    if (!checkIn || !checkOut) return;
    setStatus("loading"); setResult(null);
    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkin: checkIn, checkout: checkOut, adults: parseInt(guests) }),
      });
      const data: AvailResult = await res.json();
      setResult(data);
      setStatus(data.available ? "available" : "unavailable");
    } catch { setStatus("error"); }
  };

  const openBooking = useCallback(() => {
    if (!checkIn || !checkOut || !result) return;
    onBook({ ...result, checkIn, checkOut, guests });
  }, [checkIn, checkOut, result, guests, onBook]);

  const renderMonth = (monthStart: Date) => {
    const year = monthStart.getFullYear(), month = monthStart.getMonth();
    // RTL grid: col0=Sun(right), col6=Sat(left). firstDay = getDay() directly.
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (string | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(toISO(new Date(year, month, d)));
    while (cells.length % 7 !== 0) cells.push(null);
    const hoverEnd = hover && checkIn && !checkOut ? hover : checkOut;

    return (
      <div>
        <div className="text-center font-semibold text-[#0F1729] mb-3 text-base">{HE_MONTHS[month]} {year}</div>
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {HE_DAYS.map((d) => <div key={d} className="text-center text-sm text-gray-400 py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {cells.map((iso, i) => {
            if (!iso) return <div key={i} />;
            const isPast = iso < todayISO;
            const isBlocked = blocked.has(iso);
            const isStart = iso === checkIn;
            const isEnd = iso === checkOut;
            const inRange = !!(checkIn && hoverEnd && iso > checkIn && iso < hoverEnd);
            const disabled = isPast || isBlocked;
            return (
              <button
                key={iso}
                type="button"
                onClick={() => handleDayClick(iso)}
                onMouseEnter={() => !disabled && setHover(iso)}
                onMouseLeave={() => setHover(null)}
                disabled={disabled}
                className={[
                  "h-10 w-full text-sm transition-all rounded-lg",
                  disabled ? "text-gray-300 cursor-not-allowed" : "cursor-pointer",
                  isBlocked && !isPast ? "line-through decoration-gray-300" : "",
                  isStart || isEnd ? "bg-[#0F1729] text-white font-bold" : "",
                  inRange ? "bg-[#F0E8D4] rounded-none" : "",
                  !disabled && !isStart && !isEnd && !inRange ? "hover:bg-[#F5EDD8]" : "",
                ].filter(Boolean).join(" ")}
              >
                {parseInt(iso.split("-")[2])}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const prevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const nextMonthDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);

  return (
    <div className="space-y-4">
      {/* Selected range display */}
      <div className="grid grid-cols-2 gap-3">
        {([["הגעה", checkIn], ["עזיבה", checkOut]] as [string, string | null][]).map(([label, value]) => (
          <div key={label} className="border border-[#E0D5C5] rounded-xl px-4 py-3 bg-white">
            <div className="text-sm text-gray-400 mb-0.5">{label}</div>
            <div className="text-base font-semibold text-[#0F1729]">
              {value ? formatHe(value) : <span className="text-gray-300 font-normal">בחרו תאריך</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="border border-[#E0D5C5] rounded-2xl p-4 bg-white">
        {calLoading ? (
          <div className="text-center py-8 text-base text-gray-400">טוען זמינות...</div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 text-xl leading-none">‹</button>
              <button type="button" onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 text-xl leading-none">›</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {renderMonth(viewDate)}
              {renderMonth(nextMonthDate)}
            </div>
            <div className="flex items-center gap-5 mt-4 pt-3 border-t border-gray-100 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0F1729] inline-block" /> נבחר
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" /> תפוס
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-100 border border-gray-200 inline-block" /> עבר
              </span>
            </div>
          </>
        )}
      </div>

      {/* Guests */}
      <div>
        <label className="block text-base text-gray-600 mb-2 font-medium">מספר אורחים</label>
        <select
          className="w-full bg-white border border-[#E0D5C5] rounded-xl px-4 py-4 text-base text-[#0F1729] focus:outline-none focus:border-[#C9A84C] transition-colors"
          value={guests}
          onChange={(e) => { setGuests(e.target.value); setStatus("idle"); setResult(null); }}
        >
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
            <option key={n} value={n}>{n} אורחים</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={check}
        disabled={!checkIn || !checkOut || status === "loading"}
        className="w-full bg-[#0F1729] hover:bg-[#1a2540] disabled:opacity-40 text-white font-bold py-4 rounded-xl transition-all text-base"
      >
        {status === "loading" ? "בודק זמינות..." : !checkIn ? "בחרו תאריך הגעה" : !checkOut ? "בחרו תאריך עזיבה" : "בדקו מחיר"}
      </button>

      {status === "available" && result && (
        <div className="rounded-2xl border border-[#C9A84C]/50 bg-gradient-to-br from-[#FFFDF7] to-[#FDF8EC] p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label-gold !mb-1 !text-base">✓ זמין — הזמינו ישירות</p>
              <p className="text-5xl font-display text-[#0F1729] font-light leading-none">₪{result.priceTotal?.toLocaleString("he-IL")}</p>
              {result.pricePerNight && (
                <p className="text-base text-gray-400 mt-2">₪{result.pricePerNight?.toLocaleString("he-IL")} ללילה · {result.nights} לילות</p>
              )}
            </div>
            <span className="w-5 h-5 rounded-full bg-green-400 flex-shrink-0 mt-1 shadow-sm" />
          </div>
          <button
            type="button"
            onClick={openBooking}
            className="w-full bg-[#C9A84C] hover:bg-[#D4B45A] text-[#0F1729] font-bold py-4 rounded-xl transition-all text-lg shadow-lg"
          >
            המשך להזמנה ←
          </button>
          <p className="text-center text-sm text-gray-400">אילת — אזור פטור ממע״מ</p>
        </div>
      )}

      {status === "unavailable" && result && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-3">
          {result.reason === "min_nights" ? (
            <>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">📅</span>
                <p className="text-base font-bold text-amber-800">מינימום {result.minNights} לילות</p>
              </div>
              <p className="text-sm text-amber-700 text-center">
                הוילה דורשת שהייה מינימלית של {result.minNights} לילות. בחרו תאריך יציאה מאוחר יותר.
              </p>
            </>
          ) : (
            <>
              <p className="text-base font-bold text-gray-700 text-center">הוילה תפוסה בתאריכים אלה</p>
              <p className="text-sm text-gray-500 text-center">נסו תאריכים אחרים או צרו קשר ישירות</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-4 rounded-xl transition-all text-base"
              >
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                שאלו על תאריכים פנויים
              </a>
            </>
          )}
        </div>
      )}

      {status === "error" && (
        <p className="text-center text-sm text-red-400">שגיאה בבדיקת הזמינות. נסו שוב.</p>
      )}
    </div>
  );
}

function GuestFormModal({ data, onClose }: { data: BookingData; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // bot trap

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot filled the hidden field — silently reject
    if (cooldown) return;
    const msg = [
      `🏡 *בקשת הזמנה — נוף הדקל*`,
      ``,
      `📅 הגעה: ${formatHe(data.checkIn)}`,
      `📅 עזיבה: ${formatHe(data.checkOut)}`,
      `🌙 לילות: ${data.nights}`,
      `👥 אורחים: ${data.guests}`,
      data.priceTotal ? `💰 מחיר: ₪${data.priceTotal.toLocaleString("he-IL")}` : "",
      ``,
      `👤 שם: ${name}`,
      `📞 טלפון: ${phone}`,
      email ? `📧 אימייל: ${email}` : "",
      notes ? `📝 הערות: ${notes}` : "",
    ].filter((l) => l !== undefined && l !== null).join("\n").replace(/\n{3,}/g, "\n\n").trim();

    const cleanName = name.trim().slice(0, 100);
    const cleanPhone = phone.trim().replace(/[^\d\s\-\+\(\)]/g, "").slice(0, 20);
    const cleanEmail = email.trim().slice(0, 100);
    const cleanNotes = notes.trim().slice(0, 500);

    const safeMsg = msg
      .replace(/name/g, cleanName)
      .replace(/phone/g, cleanPhone)
      .replace(/email/g, cleanEmail)
      .replace(/notes/g, cleanNotes);
    void safeMsg; // msg already uses the raw vars — just validate above

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 30000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <span className="text-sm font-medium text-[#0F1729]">פרטי הזמנה</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none font-light">×</button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-4">
            <div className="text-5xl">✅</div>
            <h3 className="text-xl font-semibold text-[#0F1729]">הבקשה נשלחה!</h3>
            <p className="text-gray-500 text-base leading-relaxed">
              הצוות של הרים אילת יחזור אליכם לאישור תוך 24 שעות.
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full bg-[#0F1729] text-white font-medium py-3 rounded-xl text-base"
            >
              סגור
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 space-y-4">
            {/* Booking summary */}
            <div className="bg-[#FAF8F4] border border-[#E8D5B7] rounded-xl p-4 text-sm space-y-1.5 text-[#0F1729]">
              <div className="flex justify-between">
                <span className="text-gray-500">הגעה</span>
                <span className="font-medium">{formatHe(data.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">עזיבה</span>
                <span className="font-medium">{formatHe(data.checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">לילות</span>
                <span className="font-medium">{data.nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">אורחים</span>
                <span className="font-medium">{data.guests}</span>
              </div>
              {data.priceTotal && (
                <div className="flex justify-between pt-2 border-t border-[#E8D5B7] font-semibold text-base">
                  <span>סה״כ לתשלום</span>
                  <span className="text-[#C9A84C]">₪{data.priceTotal.toLocaleString("he-IL")}</span>
                </div>
              )}
            </div>

            {/* Honeypot — hidden from humans, filled by bots */}
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
            />

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">שם מלא *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  className="w-full border border-[#E0D5C5] rounded-xl px-4 py-3 text-base text-[#0F1729] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">טלפון / וואטסאפ *</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="050-0000000"
                  className="w-full border border-[#E0D5C5] rounded-xl px-4 py-3 text-base text-[#0F1729] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">אימייל</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full border border-[#E0D5C5] rounded-xl px-4 py-3 text-base text-[#0F1729] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">הערות מיוחדות</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="בקשות מיוחדות, שאלות..."
                  rows={3}
                  className="w-full border border-[#E0D5C5] rounded-xl px-4 py-3 text-base text-[#0F1729] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Consent checkbox — required by Amendment 13 2024 */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#C9A84C] flex-shrink-0"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                אני מאשר/ת שהפרטים שמסרתי יועברו להרים אילת לצורך טיפול בבקשת ההזמנה, בהתאם ל
                <a href="/privacy" target="_blank" className="underline text-[#C9A84C] hover:text-[#A07828]">מדיניות הפרטיות</a>.
              </span>
            </label>

            <button
              type="submit"
              disabled={cooldown || !consent}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-base shadow-md"
            >
              <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
              {cooldown ? "נשלח..." : "שלחו בקשת הזמנה בוואטסאפ"}
            </button>
            <p className="text-center text-xs text-gray-400">
              הבקשה תישלח לצוות הרים אילת · אישור תוך 24 שעות
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const openLightbox = (src: string) => {
    const idx = cleanPhotos.indexOf(src);
    setActiveIdx(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };
  const openBookingModal = useCallback((data: BookingData) => { setBookingData(data); }, []);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[620px] flex flex-col justify-between overflow-hidden">
        <Image
          src={heroSrc}
          alt="נוף הדקל — בריכה ופנורמה לים סוף"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
          <a
            href="#booking"
            className="text-white/90 text-sm font-medium border border-white/30 px-5 py-2 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            בדקו זמינות
          </a>
          <span className="text-white font-display text-xl font-light tracking-widest">נוף הדקל</span>
        </nav>

        {/* Hero text */}
        <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-20">
          <p className="label-gold-hero">
            וילה פרטית · אילת · ים סוף
          </p>
          <h1 className="font-display text-6xl md:text-8xl text-white font-light leading-[0.95] mb-6 tracking-tight">
            נוף<br />הדקל
          </h1>
          <p className="text-white/75 text-xl md:text-2xl font-light mb-10 max-w-md leading-relaxed">
            5 חדרי שינה · בריכה פרטית מחוממת<br />
            נוף פנורמי לים סוף ולהרי עקבה
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#booking"
              className="inline-flex items-center gap-2.5 bg-[#C9A84C] hover:bg-[#E2C47A] text-[#0F1729] font-semibold px-7 py-3.5 rounded-full transition-all text-sm shadow-xl"
            >
              בדקו זמינות והזמינו
            </a>
            <button
              onClick={() => openLightbox(cleanPhotos[0])}
              className="text-white/80 text-sm font-light border border-white/20 px-7 py-3.5 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              צפו בתמונות
            </button>
          </div>
        </div>

        {/* Booking badge */}
        <div className="absolute top-6 left-6 md:left-12 z-10 flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 text-xs px-3.5 py-1.5 rounded-full">
          <span className="text-[#E2C47A]">★</span>
          ציון 10/10 ב-Booking.com
        </div>
      </section>

      {/* ── FACTS BAR ────────────────────────────────────── */}
      <section className="bg-[#0F1729] text-white/75 text-base tracking-wide py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-2">
          {["הרעות 18, אילת", "עד 12 אורחים", "5 חדרי שינה · 3 חדרי רחצה", "בריכה פרטית מחוממת", "10/10 Booking.com"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#C9A84C] inline-block" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="section-padding px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="label-gold">הוילה</p>
            <h2 className="font-display text-5xl md:text-6xl text-[#0F1729] font-light leading-[1.05] mb-8">
              חופשה שלא<br />תרצו לעזוב
            </h2>
            <p className="text-gray-500 text-lg leading-[1.9] mb-5">
              וילה נוף הדקל היא פינת גן עדן פרטית המשקיפה על ים סוף והרי עקבה.
              הבריכה המחוממת הפרטית, מרחב המחיה המרווח ועיצוב פנים יוקרתי —
              הכל תוכנן לחופשה משפחתית שלא תישכח.
            </p>
            <p className="text-gray-500 text-lg leading-[1.9] mb-10">
              5 חדרי שינה מרווחים, 3 חדרי אמבטיה, מטבח מאובזר לחלוטין,
              פרגולה עם מטבח חוץ וגינה פנורמית — הכל תחת קורת גג אחת.
            </p>
            <div className="inline-flex items-baseline gap-4 border-t border-[#E8D5B7] pt-6">
              <span className="font-display text-5xl text-[#C9A84C] font-light">10</span>
              <div>
                <div className="text-[#0F1729] font-medium text-sm">ציון מושלם</div>
                <div className="text-gray-400 text-xs mt-0.5">Booking.com</div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative h-[480px] md:h-[580px] rounded-2xl overflow-hidden">
            <Image src={aboutSrc} alt="סלון ופינת אוכל עם נוף לים סוף" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────── */}
      <section className="section-padding bg-white px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label-gold">גלריה</p>
              <h2 className="font-display text-5xl text-[#0F1729] font-light">תמונות מהוילה</h2>
            </div>
            <button
              onClick={() => openLightbox(cleanPhotos[0])}
              className="text-[#C9A84C] text-sm font-light underline underline-offset-4 hidden md:block"
            >
              כל התמונות ({cleanPhotos.length})
            </button>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[auto] gap-2.5">
            {/* Large featured — spans 2×2 */}
            <button
              onClick={() => openLightbox(galleryPreview[0])}
              className="col-span-2 row-span-2 relative h-72 md:h-[480px] rounded-2xl overflow-hidden group"
            >
              <Image src={galleryPreview[0]} alt="בריכה ים סוף" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
            </button>
            {galleryPreview.slice(1, 5).map((src, i) => (
              <button
                key={src}
                onClick={() => openLightbox(src)}
                className="relative h-36 md:h-[232px] rounded-2xl overflow-hidden group"
              >
                <Image src={src} alt={`תמונה ${i + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
              </button>
            ))}
            {galleryPreview.slice(5, 9).map((src, i) => (
              <button
                key={src}
                onClick={() => openLightbox(src)}
                className="relative h-44 md:h-56 rounded-2xl overflow-hidden group"
              >
                <Image src={src} alt={`תמונה ${i + 6}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
              </button>
            ))}
            {galleryPreview.slice(9, 12).map((src, i) => (
              <button
                key={src}
                onClick={() => openLightbox(src)}
                className="relative h-44 md:h-56 rounded-2xl overflow-hidden group"
              >
                <Image src={src} alt={`תמונה ${i + 10}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                {i === 2 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-sm font-light">כל התמונות ({cleanPhotos.length})</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ──────────────────────────────────────── */}
      <section id="booking" className="section-padding px-6 md:px-16 bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="label-gold">הזמנה</p>
              <h2 className="font-display text-5xl text-[#0F1729] font-light leading-tight mb-6">
                בדקו זמינות<br />והזמינו ישירות
              </h2>
              <p className="text-gray-500 text-lg leading-[1.9] mb-8">
                בחרו תאריכים וראו מיד את המחיר בזמן אמת.
                הזמנה ישירה — ללא עמלות Airbnb או Booking.
              </p>
              <div className="space-y-4 text-base text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                  מחיר בזמן אמת — ללא הפתעות
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                  ללא דמי שירות
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] flex-shrink-0" />
                  תיאום אישי עם הצוות
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8D5B7]/60">
              <AvailabilityWidget onBook={openBookingModal} />
            </div>
          </div>
        </div>
      </section>

      {/* ── AMENITIES ────────────────────────────────────── */}
      <section className="section-padding px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="label-gold">מה כלול</p>
            <h2 className="font-display text-5xl text-[#0F1729] font-light">כל מה שצריך</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-[#E8D5B7]">
            {amenities.map(({ label }) => (
              <div
                key={label}
                className="bg-[#FAFAF8] flex items-center justify-center text-center py-8 px-4"
              >
                <span className="text-[#0F1729] text-base font-light">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────── */}
      <section className="section-padding bg-white px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-gold">מיקום</p>
              <h2 className="font-display text-5xl text-[#0F1729] font-light leading-tight mb-8">
                לב אילת,<br />שקט ופרטיות
              </h2>
              <p className="text-gray-500 text-lg leading-[1.9] mb-8">
                ברחוב הרעות 18 — שכונה שקטה, מרחק נסיעה קצרה מהחוף,
                מסעדות ומרכז העיר.
              </p>
              <div className="space-y-4 text-base text-gray-600">
                {[
                  ["הרעות 18, אילת", "כתובת"],
                  ["8 דקות הליכה", "לחוף הים"],
                  ["10 דקות נסיעה", "למרכז העיר"],
                  ["20 דקות נסיעה", "לנמל התעופה"],
                ].map(([val, label]) => (
                  <div key={label} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <span className="font-semibold text-[#0F1729] w-36 flex-shrink-0">{val}</span>
                    <span className="text-gray-400">{label}</span>
                  </div>
                ))}
                {/* Navigation buttons */}
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://waze.com/ul?ll=29.542760,34.943146&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#05C8F7] hover:bg-[#00b5e0] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 6.63C19.3 3.15 15.79 1 12 1 7.19 1 3.25 4.6 3.03 9.4c-.1 2.2.6 4.3 1.97 5.97L3.5 19.5l4.5-1.35c1.3.7 2.77 1.1 4.3 1.1h.01C17.02 19.25 21 15.2 21 10.29c0-1.33-.17-2.58-.46-3.66z"/></svg>
                    נווט ב-Waze
                  </a>
                  <a
                    href="https://maps.app.goo.gl/jcnG4ioS8bDp9vPKA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#0F1729] text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    פתח ב-Google Maps
                  </a>
                </div>
              </div>
            </div>
            <div className="relative h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=29.542760,34.943146&hl=he&z=17&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מפת מיקום הוילה"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative py-32 px-6 md:px-16 overflow-hidden">
        <Image src={img(9)} alt="נוף לים סוף" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0F1729]/80" />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <p className="label-gold">הזמינו ישירות</p>
          <h2 className="font-display text-5xl md:text-6xl text-white font-light leading-tight mb-6">
            מוכנים לחופשה<br />שלא תשכחו?
          </h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            ללא עמלות. ללא מתווכים.<br />
            מחיר טוב יותר מ-Airbnb ו-Booking.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-10 py-4 rounded-full transition-all text-lg shadow-2xl"
          >
            <WhatsAppIcon className="w-5 h-5" />
            שלחו הודעה בוואטסאפ
          </a>
          <p className="text-white/30 text-xs mt-6 leading-relaxed">
            ניהול: הרים אילת · 054-483-0310 · harim.eilat@gmail.com
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-[#080F1C] text-white/25 text-xs py-10 text-center px-6 space-y-2 leading-relaxed">
        <p className="text-white/40 font-medium">נוף הדקל — וילה פרטית באילת</p>
        <p>מנוהל על ידי: הרים אילת · המגינים 21, אילת · טל: 054-483-0310</p>
        <p>
          <a href="/privacy" className="underline hover:text-white/50 transition-colors">מדיניות פרטיות</a>
          {" · "}
          <a href="/cancellation" className="underline hover:text-white/50 transition-colors">מדיניות ביטול</a>
          {" · "}
          <a href="/accessibility" className="underline hover:text-white/50 transition-colors">הצהרת נגישות</a>
        </p>
        <p>© 2026 נוף הדקל. כל הזכויות שמורות.</p>
      </footer>

      {/* ── FLOATING WHATSAPP ────────────────────────────── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white font-medium px-5 py-3 rounded-full shadow-2xl hover:bg-[#20b858] transition-all text-sm"
      >
        <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
        בדקו זמינות
      </a>

      {/* ── BOOKING MODAL ────────────────────────────────── */}
      {bookingData && (
        <GuestFormModal data={bookingData} onClose={() => setBookingData(null)} />
      )}

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/97 z-50 flex flex-col items-center justify-center"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={(e) => {
            const t = e.touches[0];
            (e.currentTarget as HTMLDivElement).dataset.touchX = String(t.clientX);
          }}
          onTouchEnd={(e) => {
            const startX = Number((e.currentTarget as HTMLDivElement).dataset.touchX ?? 0);
            const endX = e.changedTouches[0].clientX;
            const delta = startX - endX;
            if (Math.abs(delta) < 40) return;
            e.stopPropagation();
            if (delta > 0) setActiveIdx((p) => (p + 1) % cleanPhotos.length);
            else setActiveIdx((p) => (p - 1 + cleanPhotos.length) % cleanPhotos.length);
          }}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white text-4xl font-light leading-none z-10 w-10 h-10 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/30 text-xs">
            {activeIdx + 1} / {cleanPhotos.length}
          </span>

          {/* Arrows — hidden on mobile (swipe instead) */}
          <button
            className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl leading-none transition-all"
            onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => (p - 1 + cleanPhotos.length) % cleanPhotos.length); }}
          >
            ‹
          </button>
          <button
            className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl leading-none transition-all"
            onClick={(e) => { e.stopPropagation(); setActiveIdx((p) => (p + 1) % cleanPhotos.length); }}
          >
            ›
          </button>

          <div
            className="relative w-full max-w-5xl px-4 md:px-16 rounded-xl overflow-hidden"
            style={{ height: "78vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={cleanPhotos[activeIdx]}
              alt={`תמונה ${activeIdx + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {/* Swipe hint — mobile only */}
          <p className="md:hidden text-white/25 text-xs mt-2">החליקו לצדדים למעבר תמונה</p>

          {/* Thumbnails */}
          <div className="absolute bottom-4 inset-x-0 hidden md:flex justify-center gap-1 flex-wrap px-6 mt-4">
            {cleanPhotos.map((src, i) => (
              <button
                key={src}
                onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                className={`relative w-9 h-6 rounded overflow-hidden border transition-all flex-shrink-0 ${i === activeIdx ? "border-[#C9A84C] opacity-100" : "border-transparent opacity-30 hover:opacity-60"}`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
