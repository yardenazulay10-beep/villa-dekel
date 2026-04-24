import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מדיניות ביטול | נוף הדקל",
  robots: { index: false },
};

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#C9A84C] hover:underline mb-8 block">← חזרה לדף הבית</Link>
        <h1 className="text-3xl font-semibold text-[#0F1729] mb-2">מדיניות ביטול</h1>
        <p className="text-sm text-gray-400 mb-10">בהתאם להסכם עם הרים אילת</p>

        <div className="space-y-6 text-[#2C3347] leading-relaxed">

          {/* Summary cards */}
          <div className="grid gap-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-semibold text-green-800 mb-1">ביטול מעל 5 ימים לפני הגעה — ללא עלות</p>
              <p className="text-sm text-green-700">
                ביטול הזמנה שנעשה יותר מ-5 ימים לפני מועד האירוח לא יגרור חיוב כלשהו, ללא קשר למועד ביצוע ההזמנה.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-semibold text-amber-800 mb-1">ביטול בין 24 שעות ל-5 ימים — חיוב 50%</p>
              <p className="text-sm text-amber-700">
                ביטול הזמנה שנעשה פחות מ-5 ימים ועד 24 שעות לפני מועד האירוח יגרור חיוב של 50% מסך עלות ההזמנה הכוללת.
              </p>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="font-semibold text-red-800 mb-1">ביטול פחות מ-24 שעות / אי הגעה — חיוב 100%</p>
              <p className="text-sm text-red-700">
                ביטול שנעשה פחות מ-24 שעות לפני מועד האירוח, או אי הגעה ללא הודעה מראש, יגרורו חיוב של 100% משווי ההזמנה הכוללת.
              </p>
            </div>
          </div>

          <section className="pt-2">
            <h2 className="text-base font-semibold mb-3 text-[#0F1729]">פרטים נוספים</h2>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              <li>החיוב יתבצע דרך כרטיס האשראי שמסרתם בעת ביצוע ההזמנה</li>
              <li>ביטול יש לבצע בכתב (WhatsApp / אימייל) לצוות הרים אילת</li>
              <li>ייתכנו תנאים שונים בתקופות שיא, חגים וסופי שנה — יש לוודא בעת ההזמנה</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3 text-[#0F1729]">יצירת קשר לביטול</h2>
            <p className="text-sm text-gray-600">
              WhatsApp / טלפון:{" "}
              <a href="tel:0544830310" className="text-[#C9A84C] underline">054-483-0310</a>
              <br />
              אימייל:{" "}
              <a href="mailto:harim.eilat@gmail.com" className="text-[#C9A84C] underline">harim.eilat@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-3 text-[#0F1729]">הגנת הצרכן</h2>
            <p className="text-sm text-gray-600">
              בהתאם לחוק הגנת הצרכן, תשמ&quot;א-1981, ותקנות הגנת הצרכן (ביטול עסקה), תשע&quot;א-2010,
              ייתכן שעומדת לכם זכות ביטול תוך 14 ימים מכריתת החוזה, בתנאי שהצ&apos;ק-אין אינו בתוך 7 ימים.
              לפרטים:{" "}
              <a href="https://www.gov.il/he/departments/consumer_protection" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] underline">
                רשות להגנת הצרכן
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
