import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "הצהרת נגישות | נוף הדקל",
  robots: { index: false },
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#C9A84C] hover:underline mb-8 block">← חזרה לדף הבית</Link>
        <h1 className="text-3xl font-semibold text-[#0F1729] mb-2">הצהרת נגישות</h1>
        <p className="text-sm text-gray-400 mb-10">עדכון אחרון: אפריל 2026</p>

        <div className="space-y-8 text-[#2C3347] leading-relaxed">
          <section>
            <p>
              אתר נוף הדקל (nofhadekel.com) שואף להיות נגיש לכלל המשתמשים, לרבות אנשים עם מוגבלויות.
              אנו פועלים לשיפור הנגישות באופן מתמשך ומתאמצים לעמוד בהנחיות WCAG 2.1 ברמה AA
              ובעקרונות התקן הישראלי ת&quot;י 5568, אך האתר טרם עבר ביקורת נגישות רשמית.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">מה מיושם באתר</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>הגדרת שפה ו-RTL מלאה בקוד האתר</li>
              <li>תגיות alt לתמונות</li>
              <li>ניגודיות צבעים סבירה בין טקסט לרקע</li>
              <li>האתר תואם לשימוש במובייל ובדפדפנים מודרניים</li>
              <li>כל שדות הטופס מסומנים בתוויות ברורות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">מגבלות ידועות</h2>
            <p>
              חלק מהתמונות בגלריה עשויות להכיל תיאורים כלליים בלבד. אנו עובדים לשיפור הנגישות באופן מתמשך.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">פנייה בנושא נגישות</h2>
            <p>
              נתקלתם בבעיית נגישות? צרו קשר:
              <br />
              <a href="mailto:harim.eilat@gmail.com" className="text-[#C9A84C] underline">harim.eilat@gmail.com</a>
              {" · "}
              <a href="tel:0544830310" className="text-[#C9A84C] underline">054-483-0310</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
