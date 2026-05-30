"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  ShoppingBag,
  Truck,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Phone,
} from "lucide-react";
import type { Restaurant, DietaryTag } from "@/types/restaurant";
import type { Lang, Strings } from "@/i18n/strings";

const DIETARY_STYLES: Record<DietaryTag, { bg: string; color: string; border: string }> = {
  vegan: { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" },
  "vegetarian-friendly": { bg: "#e0f2f1", color: "#00695c", border: "#80cbc4" },
  "gluten-free": { bg: "#e3f2fd", color: "#1565c0", border: "#90caf9" },
  halal: { bg: "#ede7f6", color: "#512da8", border: "#ce93d8" },
  kosher: { bg: "#fff8e1", color: "#f57f17", border: "#ffe082" },
};

interface Props {
  restaurant: Restaurant;
  lang: Lang;
  t: Strings;
}

export default function RestaurantCard({ restaurant: r, lang, t }: Props) {
  const [showHours, setShowHours] = useState(false);

  const name = lang === "he" ? r.nameHe : r.name;
  const verifiedDate = new Date(r.lastVerified).toLocaleDateString(
    lang === "he" ? "he-IL" : "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <div
      className="flex flex-col rounded-2xl transition hover:shadow-md"
      style={{
        backgroundColor: "rgba(255,255,255,0.65)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--ink)" }}>
              {name}
            </h2>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {r.neighborhood}
            </span>
          </div>
          <span
            className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: "rgba(196,66,26,0.08)", color: "var(--brand)" }}
          >
            {t.cuisineLabels[r.cuisineType]}
          </span>
        </div>

        {/* Dietary tags */}
        {r.dietaryTags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {r.dietaryTags.map((tag) => {
              const s = DIETARY_STYLES[tag];
              return (
                <span
                  key={tag}
                  className="rounded-full border px-2 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: s.bg, color: s.color, borderColor: s.border }}
                >
                  {t.dietaryLabels[tag]}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Delivery stats grid */}
      <div
        className="grid grid-cols-2 gap-px"
        style={{ backgroundColor: "var(--border)", borderTop: "1px solid var(--border)" }}
      >
        <Stat icon={<MapPin size={12} />} label={t.radius} value={`${r.deliveryRadiusKm} km`} />
        <Stat icon={<ShoppingBag size={12} />} label={t.minOrder} value={`₪${r.minOrderILS}`} />
        <Stat
          icon={<Truck size={12} />}
          label={t.deliveryFee}
          value={r.deliveryFeeILS === 0 ? "Free" : `₪${r.deliveryFeeILS}`}
        />
        <Stat icon={<Clock size={12} />} label={t.eta} value={`~${r.estimatedDeliveryMin}m`} />
      </div>

      {/* Hours toggle */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => setShowHours((s) => !s)}
          className="flex w-full items-center justify-between px-4 py-2 text-left text-xs transition"
          style={{ color: "var(--muted)" }}
        >
          <span>{showHours ? t.hideHours : t.showHours}</span>
          {showHours ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
        {showHours && (
          <p className="px-4 pb-3 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            {r.operatingHours}
          </p>
        )}
      </div>

      {/* Footer */}
      <div
        className="mt-auto flex items-center justify-between px-4 py-3"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span className="text-[10px]" style={{ color: "#9c8060" }}>
          {t.verifiedOn} {verifiedDate}
        </span>
        {r.website ? (
          <a
            href={r.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-85 active:scale-95"
            style={{ backgroundColor: "var(--brand)" }}
          >
            {t.orderNow}
            <ExternalLink size={10} />
          </a>
        ) : r.phone ? (
          <a
            href={`tel:${r.phone.replace(/[^+\d]/g, "")}`}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition hover:opacity-85 active:scale-95"
            style={{ backgroundColor: "transparent", border: "1.5px solid var(--brand)", color: "var(--brand)" }}
          >
            <Phone size={10} />
            {r.phone}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2" style={{ backgroundColor: "rgba(255,255,255,0.5)" }}>
      <span style={{ color: "var(--muted)", opacity: 0.7 }}>{icon}</span>
      <div className="min-w-0">
        <div className="text-[9px] uppercase tracking-wide" style={{ color: "var(--muted)", opacity: 0.7 }}>
          {label}
        </div>
        <div className="truncate text-xs font-medium" style={{ color: "var(--ink)" }}>
          {value}
        </div>
      </div>
    </div>
  );
}
