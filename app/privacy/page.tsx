import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | נוף הדקל",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#C9A84C] hover:underline mb-8 block">← חזרה לדף הבית</Link>
        <h1 className="text-3xl font-semibold text-[#0F1729] mb-2">מדיניות פרטיות</h1>
        <p className="text-sm text-gray-400 mb-10">עדכון אחרון: אפריל 2026</p>

        <div className="space-y-8 text-[#2C3347] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. כללי</h2>
            <p>
              אתר זה (nofhadekel.com) מופעל עבור וילת נוף הדקל, המנוהלת על ידי הרים אילת (להלן: &quot;אנו&quot;).
              מסמך זה מסביר אילו נתונים אנו אוספים, כיצד אנו משתמשים בהם ומהן זכויותיכם, בהתאם לחוק הגנת הפרטיות,
              תשמ&quot;א-1981 ותיקון מס&apos; 13 (תשפ&quot;ה-2024).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. מידע שאנו אוספים</h2>
            <p>בעת שליחת בקשת הזמנה דרך האתר, אנו מקבלים:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>שם מלא</li>
              <li>מספר טלפון</li>
              <li>כתובת אימייל (אם סופקה)</li>
              <li>תאריכי הגעה ועזיבה</li>
              <li>הערות שהוזנו בטופס</li>
            </ul>
            <p className="mt-3">
              הפרטים נשלחים ישירות ל-WhatsApp של הרים אילת ואינם נשמרים בשרתי האתר.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. מטרת השימוש במידע</h2>
            <p>המידע משמש אך ורק לטיפול בבקשת ההזמנה שלכם וליצירת קשר בנוגע אליה.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. העברת מידע לצדדים שלישיים</h2>
            <p>
              פרטיכם מועברים להרים אילת (harim.eilat@gmail.com) לצורך אישור ועיבוד ההזמנה בלבד.
              אנו לא מוכרים, מחכירים או מעבירים את פרטיכם לכל גורם אחר.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. עוגיות (Cookies)</h2>
            <p>
              האתר אינו משתמש בעוגיות שיווקיות או מעקב. ייתכן שדפדפן שלכם ישמור עוגיות טכניות בסיסיות
              הנדרשות לתפקוד האתר.
            </p>
            <p className="mt-3">
              האתר עושה שימוש ב-Google Analytics לצורך מדידת תנועה בלבד, והוא מוגדר כך שאינו שומר
              עוגיות ואינו מזהה משתמשים חוזרים. נאספים נתונים סטטיסטיים מצטברים בלבד, כגון מספר
              הצפיות בעמודים ולחיצות על כפתור ההזמנה.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. אבטחת מידע</h2>
            <p>
              האתר מאובטח באמצעות HTTPS. אנו נוקטים אמצעים סבירים להגנה על המידע.
              יחד עם זאת, אין בכוחנו להבטיח אבטחה מוחלטת של כל תקשורת אינטרנטית.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. זכויותיכם</h2>
            <p>בהתאם לחוק הגנת הפרטיות, יש לכם הזכות:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>לעיין במידע שנשמר עליכם</li>
              <li>לבקש תיקון מידע שגוי</li>
              <li>לבקש מחיקת מידע</li>
            </ul>
            <p className="mt-3">
              לכל פנייה בנושא: <a href="mailto:harim.eilat@gmail.com" className="text-[#C9A84C] underline">harim.eilat@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. יצירת קשר</h2>
            <p>
              הרים אילת · המגינים 21, אילת · 054-483-0310 · harim.eilat@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
