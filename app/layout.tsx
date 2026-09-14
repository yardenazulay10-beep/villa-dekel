import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import Script from "next/script";
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
  title: "נוף הדקל | וילה פרטית יוקרתית באילת — 5 חדרי שינה ובריכה מחוממת",
  description:
    "וילה פרטית יוקרתית באילת עם 5 חדרי שינה, בריכה פרטית מחוממת ונוף פנורמי לים סוף והרי עקבה. עד 12 אורחים. הזמינו ישירות — ללא דמי תיווך.",
  keywords: [
    "וילה אילת",
    "וילה פרטית אילת",
    "וילה עם בריכה אילת",
    "השכרת וילה אילת",
    "נוף הדקל",
    "וילה 5 חדרים אילת",
    "וילה משפחתית אילת",
    "בריכה פרטית מחוממת אילת",
    "villa eilat",
    "private villa eilat",
  ],
  alternates: {
    canonical: "https://www.nofhadekel.com",
  },
  openGraph: {
    title: "נוף הדקל | וילה פרטית יוקרתית באילת",
    description:
      "5 חדרי שינה · בריכה פרטית מחוממת · נוף פנורמי לים סוף · עד 12 אורחים · הזמינו ישירות וחסכו",
    url: "https://www.nofhadekel.com",
    siteName: "נוף הדקל",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: "https://www.nofhadekel.com/media/img48.jpg",
        width: 1200,
        height: 630,
        alt: "נוף הדקל — בריכה פרטית ופנורמה לים סוף",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "נוף הדקל | וילה פרטית יוקרתית באילת",
    description: "5 חדרי שינה · בריכה פרטית מחוממת · נוף לים סוף · הזמינו ישירות",
    images: ["https://www.nofhadekel.com/media/img48.jpg"],
  },
  verification: {
    google: "yt2k3hSFrGzXtwUygl4UlBAl7PDWmvFY-LbPOEvxJPs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VacationRental",
      "@id": "https://www.nofhadekel.com/#property",
      "name": "נוף הדקל",
      "description": "וילה פרטית יוקרתית באילת עם 5 חדרי שינה, בריכה פרטית מחוממת ונוף פנורמי לים סוף והרי עקבה.",
      "url": "https://www.nofhadekel.com",
      "telephone": "+972544830310",
      "email": "harim.eilat@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "הרעות 18",
        "addressLocality": "אילת",
        "addressCountry": "IL",
        "postalCode": "8854205"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 29.54276,
        "longitude": 34.943146
      },
      "image": [
        "https://www.nofhadekel.com/media/img48.jpg",
        "https://www.nofhadekel.com/media/img63.jpg",
        "https://www.nofhadekel.com/media/img56.jpg"
      ],
      "numberOfRooms": 5,
      "numberOfBathroomsTotal": 3,
      "occupancy": { "@type": "QuantitativeValue", "maxValue": 12 },
      "petsAllowed": false,
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "בריכה פרטית מחוממת", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "מיזוג אוויר", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "חניה חינם", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "מטבח", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "BBQ", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "נוף לים סוף", "value": true }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "10",
        "bestRating": "10",
        "ratingCount": "50",
        "reviewCount": "50"
      },
      "containedInPlace": {
        "@type": "City",
        "name": "אילת",
        "containedInPlace": { "@type": "Country", "name": "ישראל" }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "כמה אורחים יכולים להתארח בוילה נוף הדקל?",
          "acceptedAnswer": { "@type": "Answer", "text": "הוילה מתאימה עד 12 אורחים רשמית, עם 5 חדרי שינה ו-3 חדרי אמבטיה." }
        },
        {
          "@type": "Question",
          "name": "האם יש בריכה פרטית בוילה?",
          "acceptedAnswer": { "@type": "Answer", "text": "כן, הוילה כוללת בריכה פרטית מחוממת לשימוש בלעדי של האורחים." }
        },
        {
          "@type": "Question",
          "name": "איפה נמצאת הוילה באילת?",
          "acceptedAnswer": { "@type": "Answer", "text": "הוילה ממוקמת ברחוב הרעות 18, אילת — 8 דקות הליכה מהחוף, 10 דקות נסיעה מהטיילת." }
        },
        {
          "@type": "Question",
          "name": "איך מזמינים את הוילה?",
          "acceptedAnswer": { "@type": "Answer", "text": "ניתן לבדוק זמינות ולהזמין ישירות דרך האתר, ללא דמי תיווך. ניהול הנכס על ידי הרים אילת, ניתן גם ליצור קשר בוואטסאפ: 054-483-0310." }
        },
        {
          "@type": "Question",
          "name": "האם אילת פטורה ממע\"מ?",
          "acceptedAnswer": { "@type": "Answer", "text": "כן, אילת היא אזור מס מיוחד הפטור ממע\"מ, ולכן המחיר שתשלמו הוא המחיר הסופי ללא תוספות." }
        },
        {
          "@type": "Question",
          "name": "מה מדיניות הביטול?",
          "acceptedAnswer": { "@type": "Answer", "text": "ביטול מעל 5 ימים לפני ההגעה — ללא חיוב. ביטול 24 שעות עד 5 ימים לפני — חיוב 50%. ביטול פחות מ-24 שעות — חיוב מלא." }
        }
      ]
    }
  ]
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
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* Consent defaults must run before gtag.js loads or they are ignored.
            analytics_storage denied means GA4 sets no cookies and sends cookieless
            pings instead, so pageviews and booking_initiated still arrive. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied'});`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H4ZDVC2SVB"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-H4ZDVC2SVB');`}
        </Script>
      </body>
    </html>
  );
}
