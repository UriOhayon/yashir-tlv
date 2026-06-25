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
  openNow: boolean;
  setOpenNow: (v: boolean) => void;
  t: Strings;
}

export default function FilterBar({
  cuisineFilter,
  setCuisineFilter,
  dietaryFilters,
  setDietaryFilters,
  heverFilter,
  setHeverFilter,
  openNow,
  setOpenNow,
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
      {/* Open now */}
      <button
        onClick={() => setOpenNow(!openNow)}
        className="rounded-full border px-3 py-1.5 text-xs font-normal transition"
        style={
          openNow
            ? { borderColor: "var(--brand)", backgroundColor: "rgba(21,128,61,0.08)", color: "var(--brand)" }
            : { borderColor: "#cbcbc8", backgroundColor: "#ffffff", color: "var(--muted)" }
        }
      >
        {t.openNow}
      </button>

      {/* Cuisine select */}
      <select
        value={cuisineFilter}
        onChange={(e) => setCuisineFilter(e.target.value as CuisineType | "all")}
        className="rounded-full border px-3 py-1.5 text-xs font-normal focus:outline-none"
        style={{
          borderColor: "#cbcbc8",
          backgroundColor: "#ffffff",
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
            className="rounded-full border px-3 py-1.5 text-xs font-normal transition"
            style={
              active
                ? { borderColor: "var(--brand)", backgroundColor: "rgba(21,128,61,0.08)", color: "var(--brand)" }
                : { borderColor: "#cbcbc8", backgroundColor: "#ffffff", color: "var(--muted)" }
            }
          >
            {t.dietaryLabels[tag]}
          </button>
        );
      })}

      {/* Hever chip */}
      <button
        onClick={() => setHeverFilter(!heverFilter)}
        className="rounded-full border px-3 py-1.5 text-xs font-normal transition"
        style={
          heverFilter
            ? { borderColor: "var(--brand)", backgroundColor: "rgba(21,128,61,0.08)", color: "var(--brand)" }
            : { borderColor: "#cbcbc8", backgroundColor: "#ffffff", color: "var(--muted)" }
        }
      >
        {t.heverFilter}
      </button>
    </div>
  );
}
