import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "נוף הדקל | וילה פרימיום באילת",
  description:
    "וילה פרטית יוקרתית באילת — 5 חדרי שינה, בריכה מחוממת פרטית, נוף פנורמי לים סוף והרי ירדן. הזמינו ישירות וחסכו.",
  openGraph: {
    title: "נוף הדקל | וילה פרימיום באילת",
    description:
      "5 חדרי שינה • בריכה פרטית מחוממת • נוף פנורמי לים סוף • ציון 10/10 ב-Booking.com",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhl.variable}`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
