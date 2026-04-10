"use client";

import { useState } from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "972544830310";
const WHATSAPP_MSG = encodeURIComponent("שלום, אשמח לשמוע פרטים על וילה נוף הדקל ולבדוק זמינות.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const images = Array.from({ length: 63 }, (_, i) => `/media/img${i + 1}.jpg`);

const amenities = [
  { icon: "🏊", label: "בריכה מחוממת פרטית" },
  { icon: "🛏️", label: "5 חדרי שינה" },
  { icon: "🚿", label: "3 חדרי אמבטיה" },
  { icon: "🌊", label: "נוף פנורמי לים סוף" },
  { icon: "🏔️", label: "נוף להרי אקבה" },
  { icon: "❄️", label: "מיזוג אוויר מרכזי" },
  { icon: "📶", label: "WiFi מהיר" },
  { icon: "🅿️", label: "חניה חינם" },
  { icon: "🍖", label: "מנגל ופרגולה" },
  { icon: "🌿", label: "גינה ומרפסת" },
  { icon: "🚿", label: "מקלחת חוץ" },
  { icon: "👨‍👩‍👧‍👦", label: "מתאים עד 12 אורחים" },
];

// Best professional shots curated by category
const heroImage = images[47]; // img48 — pool + loungers + panoramic Red Sea (stunning)
const aboutImages = {
  main: images[41],  // img42 — garden + pool + sea view
  pool: images[62],  // img63 — heated pool + mountains
  interior: images[39], // img40 — living room interior
};
const galleryImages = [
  images[47], // img48: pool + loungers + Red Sea panorama  ← featured (large)
  images[41], // img42: garden + pool + sea view
  images[62], // img63: heated pool + Aqaba mountains
  images[39], // img40: living room with leather sofa + stairs
  images[34], // img35: dining table + staircase detail
  images[36], // img37: BBQ Weber with Red Sea backdrop
  images[42], // img43: bedroom — clean white double bed
  images[44], // img45: pool close + sun loungers
  images[49], // img50: bathroom with tub
  images[54], // img55: shower enclosure
  images[59], // img60: living room overhead from staircase
  images[32], // img33: interior design detail
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.083.53 4.09 1.548 5.858L.057 23.5l5.773-1.516A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.68-.504-5.239-1.387l-.376-.222-3.427.9.917-3.346-.244-.387A9.946 9.946 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroImage}
        >
          <source src="/media/video5.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729]/90 via-[#0F1729]/30 to-transparent" />

        {/* Nav */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-5 z-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-white/20 transition-all"
          >
            בדקו זמינות
          </a>
          <div className="text-white font-display text-xl font-medium tracking-wide">
            נוף הדקל
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-6 pb-16 md:px-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#E2C47A] text-sm px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            ציון 10/10 ב-Booking.com
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-tight mb-4">
            נוף הדקל
          </h1>
          <p className="text-white/80 text-xl md:text-2xl font-light mb-8 leading-relaxed">
            וילה פרטית יוקרתית באילת —<br />
            בריכה מחוממת, נוף לים סוף, 5 חדרי שינה
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#E2C47A] text-[#0F1729] font-semibold px-7 py-3.5 rounded-full transition-all text-base shadow-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
              בדקו זמינות בוואטסאפ
            </a>
            <button
              onClick={() => setGalleryOpen(true)}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-7 py-3.5 rounded-full transition-all text-base hover:bg-white/20"
            >
              צפו בתמונות
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/40 text-xs flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-white/20" />
          גלול
        </div>
      </section>

      {/* QUICK FACTS BAR */}
      <section className="bg-[#0F1729] text-white py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm">
          {[
            ["🏠", "האושר 27, אילת"],
            ["👥", "עד 12 אורחים"],
            ["🛏️", "5 חדרי שינה • 3 חדרי רחצה"],
            ["🏊", "בריכה מחוממת פרטית"],
            ["⭐", "10/10 Booking.com"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center gap-2 text-white/80">
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-padding px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-3">הוילה</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#0F1729] font-light leading-tight mb-6">
              חופשה שלא<br />תרצו לעזוב
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              וילה נוף הדקל היא פינת גן עדן פרטית המשקיפה על ים סוף והרי אקבה.
              הבריכה המחוממת הפרטית, מרחב המחיה המרווח ועיצוב פנים יוקרתי —
              הכל תוכנן לחופשה משפחתית שלא נשכחת.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              5 חדרי שינה מרווחים, 3 חדרי אמבטיה, מטבח מאובזר לחלוטין, פרגולה עם מנגל
              ומרפסת פנורמית — הכל תחת קורת גג אחת ברחוב האושר 27 באילת.
            </p>
            <div className="flex items-center gap-3 p-4 bg-[#FAF8F4] border border-[#E8D5B7] rounded-2xl">
              <div className="text-3xl font-display text-[#C9A84C] font-bold">10</div>
              <div>
                <div className="font-semibold text-[#0F1729]">ציון מושלם</div>
                <div className="text-sm text-gray-500">Booking.com — על פי אורחים שביקרו</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 relative h-64 rounded-2xl overflow-hidden">
              <Image src={aboutImages.main} alt="נוף הדקל" fill className="object-cover" />
            </div>
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <Image src={aboutImages.pool} alt="בריכה" fill className="object-cover" />
            </div>
            <div className="relative h-44 rounded-2xl overflow-hidden">
              <Image src={aboutImages.interior} alt="סלון" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding bg-white px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-2">גלריה</p>
              <h2 className="font-display text-4xl text-[#0F1729] font-light">תמונות מהוילה</h2>
            </div>
            <button
              onClick={() => setGalleryOpen(true)}
              className="text-[#C9A84C] text-sm font-medium underline underline-offset-4"
            >
              כל התמונות ({images.length})
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <button
                key={src}
                onClick={() => { setActiveImg(i); setGalleryOpen(true); }}
                className={`relative overflow-hidden rounded-xl group ${i === 0 ? "col-span-2 row-span-2 h-72 md:h-auto" : "h-44"}`}
              >
                <Image
                  src={src}
                  alt={`תמונה ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="section-padding px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-3">מה כלול</p>
            <h2 className="font-display text-4xl text-[#0F1729] font-light">כל מה שצריך לחופשה מושלמת</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {amenities.map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl border border-[#E8D5B7] hover:border-[#C9A84C] hover:shadow-md transition-all"
              >
                <span className="text-3xl">{icon}</span>
                <span className="text-[#0F1729] text-sm font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE SECTION */}
      <section className="section-padding bg-[#0F1729] px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-3">אווירה</p>
            <h2 className="font-display text-4xl text-white font-light">חופשה בסגנון</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[images[47], images[62], images[36], images[41], images[42], images[39]].map((src, i) => (
              <div key={src} className={`relative rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 md:col-span-1 row-span-2" : ""} h-52`}>
                <Image src={src} alt={`אווירה ${i + 1}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#0F1729]/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="section-padding px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-3">מיקום</p>
              <h2 className="font-display text-4xl text-[#0F1729] font-light leading-tight mb-6">
                לב אילת,<br />שקט ופרטיות
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                הוילה ממוקמת ברחוב האושר 27 באילת — שקטה ומוגנת, מרחק קצר מהחוף,
                מרכז העיר והמסעדות.
              </p>
              <div className="space-y-3">
                {[
                  ["📍", "האושר 27, אילת"],
                  ["🏖️", "5 דקות לחוף"],
                  ["🛍️", "10 דקות למרכז"],
                  ["✈️", "15 דקות לשדה התעופה"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-gray-700">
                    <span className="text-lg">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.2!2d34.9543!3d29.5587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15006042ab12cad7%3A0x0!2z15TXkNeQ16nXoiAyNywg15DXmdeX16Q!5e0!3m2!1she!2sil!4v1"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מפת מיקום הוילה"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding bg-[#0F1729] px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#C9A84C] text-sm font-medium tracking-widest uppercase mb-4">הזמינו עכשיו</p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light leading-tight mb-6">
            מוכנים לחופשה<br />שלא תשכחו?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            צרו איתנו קשר ישירות דרך וואטסאפ לבדיקת זמינות ומחירים.
            ללא עמלות. ללא מתווכים.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold px-9 py-4 rounded-full transition-all text-lg shadow-xl"
          >
            <WhatsAppIcon className="w-6 h-6" />
            שלחו הודעה בוואטסאפ
          </a>
          <p className="text-white/40 text-sm mt-5">
            ניהול: הרים אילת • 054-483-0310 • harim.eilat@gmail.com
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080F1C] text-white/40 text-sm py-6 text-center px-6">
        <p>© 2026 נוף הדקל — וילה פרטית באילת | האושר 27, אילת</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white font-semibold px-5 py-3 rounded-full shadow-2xl hover:bg-[#20b858] transition-all"
        aria-label="צור קשר בוואטסאפ"
      >
        <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">בדקו זמינות</span>
      </a>

      {/* LIGHTBOX GALLERY */}
      {galleryOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white text-4xl font-light leading-none"
            onClick={() => setGalleryOpen(false)}
          >
            ×
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light leading-none"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImg((p) => (p - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-light leading-none"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImg((p) => (p + 1) % images.length);
            }}
          >
            ›
          </button>

          <div
            className="relative w-full max-w-4xl mx-10 rounded-2xl overflow-hidden"
            style={{ height: "75vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeImg]}
              alt={`תמונה ${activeImg + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 flex-wrap px-6">
            {images.map((src, i) => (
              <button
                key={src}
                onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                className={`relative w-10 h-7 rounded overflow-hidden border-2 transition-all ${i === activeImg ? "border-[#C9A84C]" : "border-transparent opacity-40 hover:opacity-70"}`}
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
