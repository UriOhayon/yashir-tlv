import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://yashirdelivery.com";

export const metadata: Metadata = {
  title: {
    default: "ישיר | משלוח ישיר ממסעדות תל אביב - בלי אפליקציות, בלי עמלות",
    template: "%s",
  },
  description:
    "הזמינו ישירות ממסעדות תל אביב שמשלחות בעצמן - בלי מתווכים, בלי עמלות, ולרוב גם זול יותר. סינון לפי מטבח, תזונה ושעות פתיחה.",
  keywords: [
    "משלוח תל אביב",
    "משלוח ישיר",
    "הזמנה ישירה ממסעדה",
    "מסעדות תל אביב משלוח",
    "משלוח טבעוני תל אביב",
    "משלוח סושי תל אביב",
    "משלוח המבורגר תל אביב",
    "Tel Aviv direct delivery",
    "ישיר",
    "תל אביב–יפו",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "ישיר | משלוח ישיר ממסעדות תל אביב",
    description:
      "הזמינו ישירות ממסעדות תל אביב שמשלחות בעצמן. בלי מתווכים, בלי עמלות.",
    url: BASE_URL,
    siteName: "Yashir · ישיר",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ישיר - משלוח ישיר ממסעדות תל אביב" }],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ישיר | משלוח ישיר ממסעדות תל אביב",
    description:
      "הזמינו ישירות ממסעדות תל אביב שמשלחות בעצמן. בלי מתווכים, בלי עמלות.",
    images: ["/opengraph-image"],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ישיר · Yashir",
  alternateName: "Yashir",
  url: BASE_URL,
  inLanguage: "he-IL",
  description:
    "מדריך למסעדות תל אביב שמשלחות בעצמן - הזמנה ישירה מהאתר של המסעדה.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
