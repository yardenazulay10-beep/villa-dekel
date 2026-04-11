import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "תנאי שימוש | נוף הדקל",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#C9A84C] hover:underline mb-8 block">← חזרה לדף הבית</Link>
        <h1 className="text-3xl font-semibold text-[#0F1729] mb-2">תנאי שימוש</h1>
        <p className="text-sm text-gray-400 mb-10">עדכון אחרון: אפריל 2026</p>

        <div className="space-y-8 text-[#2C3347] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-3">1. כללי</h2>
            <p>
              ברוכים הבאים לאתר נוף הדקל (nofhadekel.com). השימוש באתר מהווה הסכמה לתנאים המפורטים להלן.
              האתר מופעל עבור וילת נוף הדקל, המנוהלת על ידי הרים אילת.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">2. מטרת האתר</h2>
            <p>
              האתר נועד לספק מידע על הנכס ולאפשר יצירת קשר לצורך בקשות הזמנה.
              האתר אינו מבצע עסקאות כספיות ואינו גובה תשלום — כל עסקה מתבצעת ישירות מול הרים אילת.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">3. דיוק המידע</h2>
            <p>
              אנו משתדלים לשמור על דיוק המידע המופיע באתר, לרבות מחירים, זמינות ותיאור הנכס.
              המחירים המוצגים הם אינדיקטיביים ועשויים להשתנות. המחיר הסופי ייקבע מול הרים אילת בעת אישור ההזמנה.
              ציון Booking.com מוצג על בסיס הנתון האחרון הידוע ועשוי שלא לשקף את הציון העדכני ביותר.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">4. הגבלת אחריות</h2>
            <p>
              האתר מסופק &quot;כמות שהוא&quot; (AS IS). בעלי האתר אינם אחראים לנזקים ישירים או עקיפים הנובעים משימוש באתר,
              לרבות שגיאות מידע, הפסקות שירות, או אי-זמינות. האחריות המלאה לביצוע ההזמנה ולפרטיה חלה על הרים אילת.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">5. קניין רוחני</h2>
            <p>
              כל התכנים באתר, לרבות תמונות, טקסטים ועיצוב, הם רכושם של בעלי הנכס ו/או הרים אילת.
              אין לעשות שימוש בתכנים ללא אישור מפורש בכתב.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">6. קישורים חיצוניים</h2>
            <p>
              האתר מכיל קישורים לשירותים חיצוניים (WhatsApp, Google Maps, Waze). אין לנו שליטה על תוכן שירותים אלו
              ואיננו אחראים למדיניותם.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">7. דין חל וסמכות שיפוט</h2>
            <p>
              תנאי שימוש אלו כפופים לדין הישראלי. כל סכסוך הנובע מהשימוש באתר יידון בבתי המשפט המוסמכים בישראל.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">8. יצירת קשר</h2>
            <p>
              לכל שאלה: הרים אילת · 054-483-0310 · <a href="mailto:harim.eilat@gmail.com" className="text-[#C9A84C] underline">harim.eilat@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
