import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FAQ } from "@/app/faq";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["300"],
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
        width: 1024,
        height: 683,
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
        "https://www.nofhadekel.com/media/img42.jpg",
        "https://www.nofhadekel.com/media/img56.jpg"
      ],
      "numberOfRooms": 5,
      "containsPlace": {
        "@type": "Accommodation",
        "numberOfBedrooms": 5,
        "numberOfBathroomsTotal": 3,
        "occupancy": { "@type": "QuantitativeValue", "maxValue": 12 }
      },
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
      "containedInPlace": {
        "@type": "City",
        "name": "אילת",
        "containedInPlace": { "@type": "Country", "name": "ישראל" }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": FAQ.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a }
      }))
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
