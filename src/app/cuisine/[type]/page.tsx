import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import type { CuisineType } from "@/types/restaurant";
import {
  BASE_URL,
  cuisineHe,
  activeCuisines,
  restaurantsByCuisine,
  itemListJsonLd,
} from "@/lib/seo";
import SeoRestaurantCard from "@/components/SeoRestaurantCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return activeCuisines(restaurants).map((type) => ({ type }));
}

function isCuisine(x: string): x is CuisineType {
  return activeCuisines(restaurants).includes(x as CuisineType);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  if (!isCuisine(type)) return {};
  const label = cuisineHe[type];
  const title = `משלוח ${label} בתל אביב — מסעדות שמשלחות בעצמן | ישיר`;
  const description = `מסעדות ${label} בתל אביב עם משלוח עצמאי — הזמנה ישירה מהאתר של המסעדה, בלי אפליקציות ובלי מתווכים. סינון לפי שעות פתיחה, מינימום הזמנה ודמי משלוח.`;
  const url = `${BASE_URL}/cuisine/${type}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "he_IL" },
  };
}

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isCuisine(type)) notFound();
  const label = cuisineHe[type];
  const list = restaurantsByCuisine(restaurants, type);
  const others = activeCuisines(restaurants).filter((c) => c !== type);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }} dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd(list, `משלוח ${label} בתל אביב`)),
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
        <nav className="mb-4 text-xs" style={{ color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>בית</Link>
          <span> · </span>
          <span style={{ color: "var(--ink)" }}>משלוח {label}</span>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
          משלוח {label} בתל אביב
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          {list.length} מסעדות {label} בתל אביב שמשלחות בעצמן. כל הזמנה הולכת ישירות
          לאתר של המסעדה — בלי אפליקציות, בלי מתווכים, ולרוב גם זול יותר.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {list.map((r) => (
            <SeoRestaurantCard key={r.id} r={r} />
          ))}
        </div>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
            מטבחים נוספים
          </h2>
          <div className="flex flex-wrap gap-2">
            {others.map((c) => (
              <Link
                key={c}
                href={`/cuisine/${c}`}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:opacity-70"
                style={{ borderColor: "var(--border)", color: "var(--ink)" }}
              >
                {cuisineHe[c]}
              </Link>
            ))}
            <Link
              href="/open-now"
              className="rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:opacity-70"
              style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
            >
              פתוח עכשיו
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "#9c8060" }}>
        ישיר · Yashir — משלוח ישיר ממסעדות תל אביב
      </footer>
    </div>
  );
}
