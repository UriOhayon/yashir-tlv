import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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

const BASE_URL = "https://yashir-tlv.vercel.app";

export const metadata: Metadata = {
  title: "Yashir | ישיר — Tel Aviv Direct Delivery",
  description:
    "Order straight from Tel Aviv kitchens that keep their own drivers — no aggregators, no commission.",
  keywords: [
    "Tel Aviv",
    "Yafo",
    "delivery",
    "restaurants",
    "direct delivery",
    "no aggregators",
    "ישיר",
    "משלוח",
    "תל אביב",
  ],
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "Yashir | Tel Aviv Direct Delivery",
    description:
      "Order directly from Tel Aviv restaurants. No middlemen, no commission.",
    url: BASE_URL,
    siteName: "Yashir",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Yashir — Tel Aviv Direct Delivery" }],
    locale: "en_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashir | Tel Aviv Direct Delivery",
    description:
      "Order directly from Tel Aviv restaurants. No middlemen, no commission.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
