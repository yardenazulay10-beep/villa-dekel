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

        <div className="space-y-8 text-[#2C3347] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3">תנאי ביטול</h2>
            <p>
              תנאי הביטול נקבעים על ידי הרים אילת ועשויים להשתנות בהתאם לתקופת השהייה, הזמן עד לצ&apos;ק-אין,
              והזמנות מיוחדות. <strong>יש לוודא את תנאי הביטול הספציפיים בעת אישור ההזמנה עם הרים אילת.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">הנחיות כלליות</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>ביטול צריך להיעשות בכתב (WhatsApp / אימייל) לצוות הרים אילת</li>
              <li>המחיר ששולם יוחזר בהתאם למדיניות שסוכמה בזמן ההזמנה</li>
              <li>ייתכנו תנאים שונים לחגים, סופי שנה ועונת שיא</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">יצירת קשר לביטול</h2>
            <p>
              WhatsApp / טלפון: <a href="tel:0544830310" className="text-[#C9A84C] underline">054-483-0310</a>
              <br />
              אימייל: <a href="mailto:harim.eilat@gmail.com" className="text-[#C9A84C] underline">harim.eilat@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">הגנת הצרכן</h2>
            <p>
              בהתאם לחוק הגנת הצרכן, תשמ&quot;א-1981, ותקנות הגנת הצרכן (ביטול עסקה), תשע&quot;א-2010,
              ייתכן שעומדת לכם זכות ביטול תוך 14 ימים מכריתת החוזה, בתנאי שהצ&apos;ק-אין אינו בתוך 7 ימים.
              לפרטים, פנו לרשות להגנת הצרכן: <a href="https://www.gov.il/he/departments/consumer_protection" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] underline">gov.il</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
