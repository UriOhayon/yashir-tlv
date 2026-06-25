import Link from "next/link";
import type { Restaurant } from "@/types/restaurant";
import { cuisineHe, dietaryHe, feeLabel } from "@/lib/seo";

// Server-rendered restaurant card for SEO pages. Plain HTML, no client JS,
// every card links to its own page so crawlers can reach the whole site.
export default function SeoRestaurantCard({ r }: { r: Restaurant }) {
  return (
    <article
      className="flex flex-col rounded-2xl p-4"
      style={{ backgroundColor: "#ffffff", border: "1px solid var(--border)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold" style={{ color: "var(--ink)" }}>
            <Link href={`/restaurant/${r.id}`} style={{ color: "var(--ink)" }}>
              {r.nameHe}
            </Link>
          </h2>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {r.neighborhood}
          </span>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ backgroundColor: "rgba(21,128,61,0.08)", color: "var(--brand)" }}
        >
          {cuisineHe[r.cuisineType]}
        </span>
      </div>

      {r.dietaryTags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {r.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: "#eef3ed", color: "#2d6a4f", borderColor: "#cfe0d3" }}
            >
              {dietaryHe[tag]}
            </span>
          ))}
        </div>
      )}

      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs" style={{ color: "var(--muted)" }}>
        <div className="flex justify-between"><dt>מינימום</dt><dd style={{ color: "var(--ink)" }}>₪{r.minOrderILS}</dd></div>
        <div className="flex justify-between"><dt>משלוח</dt><dd style={{ color: "var(--ink)" }}>{feeLabel(r.deliveryFeeILS)}</dd></div>
        <div className="flex justify-between"><dt>זמן</dt><dd style={{ color: "var(--ink)" }}>~{r.estimatedDeliveryMin} דק׳</dd></div>
        <div className="flex justify-between"><dt>רדיוס</dt><dd style={{ color: "var(--ink)" }}>{r.deliveryRadiusKm} ק״מ</dd></div>
      </dl>

      <div className="mt-3 flex items-center justify-between">
        <Link href={`/restaurant/${r.id}`} className="text-xs font-semibold hover:underline" style={{ color: "var(--brand)" }}>
          פרטים והזמנה ←
        </Link>
      </div>
    </article>
  );
}
