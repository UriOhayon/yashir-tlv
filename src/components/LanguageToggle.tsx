"use client";

import type { Lang } from "@/i18n/strings";

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export default function LanguageToggle({ lang, setLang }: Props) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "he" : "en")}
      className="rounded-full border px-3 py-1 text-xs font-normal tracking-wide transition hover:opacity-70"
      style={{ borderColor: "var(--border)", color: "var(--muted)", backgroundColor: "transparent" }}
      aria-label="Toggle language"
    >
      {lang === "en" ? "עברית" : "English"}
    </button>
  );
}
