"use client";

import type { CuisineType, DietaryTag } from "@/types/restaurant";
import type { Strings } from "@/i18n/strings";

const CUISINE_OPTIONS: CuisineType[] = [
  "pizza",
  "asian",
  "burger",
  "mediterranean",
  "middle-eastern",
  "vegan",
  "italian",
  "mexican",
  "greek",
  "other",
];

const DIETARY_OPTIONS: DietaryTag[] = [
  "vegetarian-friendly",
  "vegan",
  "gluten-free",
  "halal",
  "kosher",
];

interface Props {
  cuisineFilter: CuisineType | "all";
  setCuisineFilter: (v: CuisineType | "all") => void;
  dietaryFilters: DietaryTag[];
  setDietaryFilters: (v: DietaryTag[]) => void;
  heverFilter: boolean;
  setHeverFilter: (v: boolean) => void;
  t: Strings;
}

export default function FilterBar({
  cuisineFilter,
  setCuisineFilter,
  dietaryFilters,
  setDietaryFilters,
  heverFilter,
  setHeverFilter,
  t,
}: Props) {
  function toggleDietary(tag: DietaryTag) {
    setDietaryFilters(
      dietaryFilters.includes(tag)
        ? dietaryFilters.filter((d) => d !== tag)
        : [...dietaryFilters, tag]
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Cuisine select */}
      <select
        value={cuisineFilter}
        onChange={(e) => setCuisineFilter(e.target.value as CuisineType | "all")}
        className="rounded-full border px-3 py-1.5 text-xs font-medium focus:outline-none"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "rgba(255,255,255,0.6)",
          color: "var(--muted)",
        }}
      >
        <option value="all">{t.allCuisines}</option>
        {CUISINE_OPTIONS.map((c) => (
          <option key={c} value={c}>
            {t.cuisineLabels[c]}
          </option>
        ))}
      </select>

      {/* Dietary chips */}
      {DIETARY_OPTIONS.map((tag) => {
        const active = dietaryFilters.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggleDietary(tag)}
            className="rounded-full border px-3 py-1.5 text-xs font-medium transition"
            style={
              active
                ? { borderColor: "var(--brand)", backgroundColor: "rgba(196, 66, 26, 0.08)", color: "var(--brand)" }
                : { borderColor: "var(--border)", backgroundColor: "rgba(255,255,255,0.6)", color: "var(--muted)" }
            }
          >
            {t.dietaryLabels[tag]}
          </button>
        );
      })}

      {/* Hever chip */}
      <button
        onClick={() => setHeverFilter(!heverFilter)}
        className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
        style={
          heverFilter
            ? { borderColor: "#1a56db", backgroundColor: "#e8f0fe", color: "#1a56db" }
            : { borderColor: "var(--border)", backgroundColor: "rgba(255,255,255,0.6)", color: "var(--muted)" }
        }
      >
        ✦ {t.heverFilter}
      </button>
    </div>
  );
}
