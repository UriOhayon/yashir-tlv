"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Store, List, Map, MessageCircle, BookOpen, Mail } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { strings } from "@/i18n/strings";
import type { Lang } from "@/i18n/strings";
import type { CuisineType, DietaryTag } from "@/types/restaurant";
import { isOpenNow } from "@/utils/isOpenNow";
import LanguageToggle from "@/components/LanguageToggle";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import RestaurantCard from "@/components/RestaurantCard";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  const [lang, setLang] = useState<Lang>("he");
  const [search, setSearch] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState<CuisineType | "all">("all");
  const [dietaryFilters, setDietaryFilters] = useState<DietaryTag[]>([]);
  const [openNow, setOpenNow] = useState(false);
  const [heverFilter, setHeverFilter] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");

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
          backgroundColor: "rgba(255, 255, 255, 0.85)",
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
              style={{ color: "var(--ink)" }}
            >
              {t.siteTitle}
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

        {/* Disclaimer lives in the footer */}

        {/* ── Filters ── */}
        <div className="mb-7 flex flex-col gap-3">
          <SearchBar value={search} onChange={setSearch} placeholder={t.searchPlaceholder} />

          <FilterBar
            cuisineFilter={cuisineFilter}
            setCuisineFilter={setCuisineFilter}
            dietaryFilters={dietaryFilters}
            setDietaryFilters={setDietaryFilters}
            heverFilter={heverFilter}
            setHeverFilter={setHeverFilter}
            openNow={openNow}
            setOpenNow={setOpenNow}
            t={t}
          />
        </div>

        {/* Stats row */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            {t.statsLabel(filtered.length)}
          </p>
          <div className="flex items-center gap-2">
            {/* List / Map toggle */}
            <div className="flex overflow-hidden rounded-full border" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={() => setView("list")}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold transition"
                style={view === "list"
                  ? { backgroundColor: "var(--brand)", color: "#fff" }
                  : { backgroundColor: "transparent", color: "var(--muted)" }}
              >
                <List size={12} />
                {t.viewList}
              </button>
              <button
                onClick={() => setView("map")}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold transition"
                style={view === "map"
                  ? { backgroundColor: "var(--brand)", color: "#fff" }
                  : { backgroundColor: "transparent", color: "var(--muted)" }}
              >
                <Map size={12} />
                {t.viewMap}
              </button>
            </div>
          </div>
        </div>

        {/* ── Restaurant grid / Map ── */}
        {view === "map" ? (
          <MapView restaurants={filtered} t={t} lang={lang} />
        ) : filtered.length > 0 ? (
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


        {/* Suggest / contact */}
        <div
          className="mt-10 rounded-2xl border p-7 text-center"
          style={{ borderColor: "var(--border)", backgroundColor: "#ffffff" }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {t.suggestTitle}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:urioha@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-normal transition hover:opacity-80"
              style={{ borderColor: "#cbcbc8", color: "var(--ink)" }}
            >
              <Mail size={15} style={{ color: "var(--brand)" }} />
              urioha@gmail.com
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-normal transition hover:opacity-80"
              style={{ borderColor: "#cbcbc8", color: "var(--ink)" }}
            >
              <BookOpen size={15} style={{ color: "var(--brand)" }} />
              {t.storyLink}
            </Link>
            <a
              href="https://x.com/OhayonUri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-normal transition hover:opacity-80"
              style={{ borderColor: "#cbcbc8", color: "var(--ink)" }}
            >
              <MessageCircle size={15} style={{ color: "var(--brand)" }} />
              X · @OhayonUri
            </a>
          </div>
        </div>
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "#595959" }}>
        <p className="mx-auto mb-3 max-w-xl leading-relaxed" style={{ color: "#595959" }}>
          {t.warningTitle} {t.warningBody}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link href="/about" className="hover:underline" style={{ color: "#595959" }}>
            הסיפור מאחורי הפרויקט
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/accessibility" className="hover:underline" style={{ color: "#595959" }}>
            נגישות
          </Link>
        </div>
      </footer>
    </div>
  );
}
