import type { Metadata } from "next";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import { BASE_URL, itemListJsonLd } from "@/lib/seo";
import SeoRestaurantCard from "@/components/SeoRestaurantCard";

const title = "משלוח פתוח עכשיו בתל אביב - מסעדות שמשלחות בעצמן | ישיר";
const description =
  "מסעדות בתל אביב שמשלחות בעצמן ופתוחות עכשיו. בדקו שעות פעילות והזמינו ישירות מהאתר של המסעדה - בלי אפליקציות ובלי מתווכים.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${BASE_URL}/open-now` },
  openGraph: { title, description, url: `${BASE_URL}/open-now`, type: "website", locale: "he_IL" },
};

export default function OpenNowPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }} dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd(restaurants, "מסעדות עם משלוח ישיר בתל אביב")),
        }}
      />

      <header
        className="sticky top-0 z-10 backdrop-blur-sm"
        style={{ borderBottom: "1px solid var(--border)", backgroundColor: "rgba(245, 237, 224, 0.92)" }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <Link href="/" className="font-serif text-base font-bold" style={{ color: "var(--ink)", fontFamily: "var(--font-serif)" }}>
            ישיר · Yashir
          </Link>
          <Link href="/" className="text-xs font-semibold hover:underline" style={{ color: "var(--brand)" }}>
            כל המסעדות ←
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
          פתוח עכשיו בתל אביב
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          מסעדות תל אביב שמשלחות בעצמן. בדקו את שעות הפעילות בכל כרטיס, או עברו{" "}
          <Link href="/" className="font-semibold hover:underline" style={{ color: "var(--brand)" }}>
            לסינון ״פתוח עכשיו״ בזמן אמת
          </Link>{" "}
          בעמוד הבית.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {restaurants.map((r) => (
            <SeoRestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "#9c8060" }}>
        <a href="https://x.com/OhayonUri" target="_blank" rel="noopener noreferrer" className="hover:underline" st