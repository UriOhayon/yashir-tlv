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

export const metadata: Metadata = {
  title: "Yashir | ישיר — Tel Aviv Direct Delivery",
  description:
    "Order straight from Tel Aviv kitchens that keep their own drivers — no aggregators, no 27% commission.",
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
