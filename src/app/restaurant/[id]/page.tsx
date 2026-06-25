import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import { strings } from "@/i18n/strings";
import {
  BASE_URL,
  cuisineHe,
  dietaryHe,
  feeLabel,
  restaurantJsonLd,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }));
}

function get(id: string) {
  return restaurants.find((r) => r.id === id);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const r = get(id);
  if (!r) return {};
  const title = `${r.nameHe} - משלוח ישיר ב${r.neighborhood} | ישיר`;
  const description = `הזמינו ישירות מ${r.nameHe} (${cuisineHe[r.cuisineType]}) ב${r.neighborhood}, תל אביב. מינימום ₪${r.minOrderILS}, משלוח ${feeLabel(r.deliveryFeeILS)}, כ-${r.estimatedDeliveryMin} דק׳. הזמנה ישירה מהאתר של המסעדה - בלי אפליקציות ובלי מתווכים.`;
  const url = `${BASE_URL}/restaurant/${r.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", locale: "he_IL" },
  };
}

const daysHe = {
  sun: "ראשון",
  mon: "שני",
  tue: "שלישי",
  wed: "רביעי",
  thu: "חמישי",
  fri: "שישי",
  sat: "שבת",
} as const;

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = get(id);
  if (!r) notFound();
  const t = strings.he;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }} dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd(r)) }}
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
        <nav className="mb-5 text-xs" style={{ color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--muted)" }}>בית</Link>
          <span> · </span>
          <Link href={`/cuisine/${r.cuisineType}`} style={{ color: "var(--muted)" }}>
            {cuisineHe[r.cuisineType]}
          </Link>
          <span> · </span>
          <span style={{ color: "var(--ink)" }}>{r.nameHe}</span>
        </nav>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
          {r.nameHe}
        </h1>
        <p className="mt-2 text-base" style={{ color: "var(--muted)" }}>
          {cuisineHe[r.cuisineType]} · {r.neighborhood}, תל אביב · משלוח עצמאי
        </p>

        {r.dietaryTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {r.dietaryTags.map((tag) => (
              <span key={tag} className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: "#eef3ed", color: "#2d6a4f", borderColor: "#cfe0d3" }}>
                {dietaryHe[tag]}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Fact label="מינימום הזמנה" value={`₪${r.minOrderILS}`} />
          <Fact label="דמי משלוח" value={feeLabel(r.deliveryFeeILS)} />
          <Fact label="זמן משוער" value={`~${r.estimatedDeliveryMin} דק׳`} />
          <Fact label="רדיוס משלוח" value={`${r.deliveryRadiusKm} ק״מ`} />
        </div>

        {r.couponCode && (
          <div className="mt-5 rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#fefce8", border: "1px solid #fde68a", color: "#92400e" }}>
            <strong>קוד קופון:</strong> {r.couponCode}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {r.website && (
            <a href={r.website} target="_blank" rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-85"
              style={{ backgroundColor: "var(--brand)" }}>
              הזמן ישירות מהאתר ←
            </a>
          )}
          {r.phone && (
            <a href={`tel:${r.phone.replace(/[^+\d]/g, "")}`}
              className="rounded-full px-5 py-2.5 text-sm font-semibold transition hover:opacity-85"
              style={{ backgroundColor: "transparent", border: "1.5px solid var(--brand)", color: "var(--brand)" }}>
              חיוג {r.phone}
            </a>
          )}
        </div>

        <section className="mt-8">
          <h2 className="mb-2 text-lg font-bold" style={{ color: "var(--ink)" }}>שעות פעילות</h2>
          <table className="w-full max-w-sm text-sm" style={{ color: "var(--muted)" }}>
            <tbody>
              {(Object.keys(daysHe) as (keyof typeof daysHe)[]).map((d) => (
                <tr key={d} style={{ borderTop: "1px solid var(--border)" }}>
                  <td className="py-1.5">{daysHe[d]}</td>
                  <td className="py-1.5 text-left" style={{ color: "var(--ink)" }}>
                    {r.schedule[d] ? `${r.schedule[d]!.open}–${r.schedule[d]!.close}` : "סגור"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {r.notes && (
          <p className="mt-6 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{r.notes}</p>
        )}

        <p className="mt-6 text-xs" style={{ color: "#9c8060" }}>
          {t.warningTitle} {t.warningBody}
        </p>

        <div className="mt-8">
          <Link href={`/cuisine/${r.cuisineType}`} className="text-sm font-semibold hover:underline" style={{ color: "var(--brand)" }}>
            עוד מסעדות {cuisineHe[r.cuisineType]} עם משלוח ישיר ←
          </Link>
        </div>
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "#9c8060" }}>
        <a href="https://x.com/OhayonUri" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#9c8060" }}>ישיר · Yashir - משלוח ישיר ממסעדות תל אביב</a>
      </footer>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: "rgba(255,255,255,0.6)", border: "1px solid var(--border)" }}>
      <div className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)", opacity: 0.7 }}>{label}</div>
      <div className="mt-0.5 text-sm font-semibold" style={{ color: "var(--ink)" }}>{value}</div>
    </div>
  );
}
