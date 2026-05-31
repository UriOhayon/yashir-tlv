"use client";

import { useState, useMemo } from "react";
import { Store, AlertTriangle } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { strings } from "@/i18n/strings";
import type { Lang } from "@/i18n/strings";
import type { CuisineType, DietaryTag } from "@/types/restaurant";
import { isOpenNow } from "@/utils/isOpenNow";
import LanguageToggle from "@/components/LanguageToggle";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import RestaurantCard from "@/components/RestaurantCard";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [search, setSearch] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState<CuisineType | "all">("all");
  const [dietaryFilters, setDietaryFilters] = useState<DietaryTag[]>([]);
  const [openNow, setOpenNow] = useState(false);
  const [heverFilter, setHeverFilter] = useState(false);

  const t = strings[lang];

  function handleSetLang(l: Lang) {
    setLang(l);
    document.documentElement.setAttribute("dir", l === "he" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", l);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return restaurants.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q) && !r.nameHe.includes(q)) return false;
      if (cuisineFilter !== "all" && r.cuisineType !== cuisineFilter) return false;
      if (dietaryFilters.length > 0 && !dietaryFilters.every((d) => r.dietaryTags.includes(d)))
        return false;
      if (openNow && !isOpenNow(r.schedule)) return false;
      if (heverFilter && !r.acceptsHever) return false;
      return true;
    });
  }, [search, cuisineFilter, dietaryFilters, openNow, heverFilter]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }} dir={lang === "he" ? "rtl" : "ltr"}>
      {/* Sticky minimal nav */}
      <header
        className="sticky top-0 z-10 backdrop-blur-sm"
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "rgba(245, 237, 224, 0.92)",
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <span
            className="font-serif text-base font-bold tracking-tight"
            style={{ color: "var(--ink)", fontFamily: "var(--font-serif)" }}
          >
            Yashir · ישיר
          </span>
          <LanguageToggle lang={lang} setLang={handleSetLang} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        {/* ── Hero ── */}
        <div className="mb-8">
          {/* Icon + title row */}
          <div className="flex items-center gap-4 mb-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
              style={{ backgroundColor: "var(--brand)" }}
            >
              <Store size={22} />
            </span>
            <h1
              className="text-4xl font-extrabold leading-none tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)", color: "var(--ink)" }}
            >
              {t.siteTitle}
              <span style={{ color: "var(--brand)" }}> • </span>
              {t.siteTitleHe}
            </h1>
          </div>

          {/* Tagline */}
          <p className="mb-5 max-w-xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            {t.tagline}
          </p>

          {/* Location pill */}
          <button
            className="rounded-full border-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition hover:opacity-70"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
          >
            {t.location}
          </button>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: "var(--border)" }} className="mb-7" />

        {/* Warning box */}
        <div
          className="mb-8 flex gap-3 rounded-xl border px-4 py-3.5"
          style={{ borderColor: "#f6c660", backgroundColor: "#fef9ec" }}
        >
          <AlertTriangle size={18} className="shrink-0 mt-0.5" style={{ color: "#b07d10" }} />
          <p className="text-sm leading-relaxed" style={{ color: "#7a5900" }}>
            <strong>{t.warningTitle}</strong>{" "}
            {t.warningBody}
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="mb-7 flex flex-col gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder={t.searchPlaceholder} />

          {/* Open Now toggle */}
          <div>
            <button
              onClick={() => setOpenNow((v) => !v)}
              className="rounded-full border-2 px-4 py-1.5 text-xs font-bold tracking-wide transition"
              style={
                openNow
                  ? { backgroundColor: "var(--brand)", borderColor: "var(--brand)", color: "#fff" }
                  : { backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--muted)" }
              }
            >
              🟢 {t.openNow}
            </button>
          </div>

          <FilterBar
            cuisineFilter={cuisineFilter}
            setCuisineFilter={setCuisineFilter}
            dietaryFilters={dietaryFilters}
            setDietaryFilters={setDietaryFilters}
            heverFilter={heverFilter}
            setHeverFilter={setHeverFilter}
            t={t}
          />
        </div>

        {/* Stats row */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            {t.statsLabel(filtered.length)}
          </p>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: "#e6f4ea", color: "#2d6a4f" }}
          >
            ✓ Zero Wolt
          </span>
        </div>

        {/* ── Restaurant grid ── */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} lang={lang} t={t} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
              {t.noResults}
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              {t.noResultsSub}
            </p>
          </div>
        )}

        {/* Suggest footer */}
        <div
          className="mt-12 rounded-2xl border border-dashed p-6 text-center"
          style={{ borderColor: "var(--border)", backgroundColor: "rgba(255,255,255,0.4)" }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            {t.suggestTitle}
          </p>
          <a
            href="mailto:urioha@gmail.com?subject=Restaurant%20suggestion%20for%20Yashir"
            className="mt-2 inline-block text-sm font-semibold hover:underline"
            style={{ color: "var(--brand)" }}
          >
            {t.suggestLink}
          </a>
          <p className="mt-1 text-xs" style={{ color: "var(--muted)", opacity: 0.7 }}>
            urioha@gmail.com
          </p>
        </div>
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "#9c8060" }}>
        Yashir · ישיר &nbsp;·&nbsp; Data verified by Claude · No affiliation with Wolt or Ten Bis
      </footer>
    </div>
  );
}
