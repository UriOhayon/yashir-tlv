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
      className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition hover:opacity-70"
      style={{ borderColor: "var(--border)", color: "var(--muted)", backgroundColor: "transparent" }}
      aria-label="Toggle language"
    >
      {lang === "en" ? (
        <>
          <span className="text-sm leading-none">🇮🇱</span>
          <span>עברית</span>
        </>
      ) : (
        <>
          <span className="text-sm leading-none">🇺🇸</span>
          <span>English</span>
        </>
      )}
    </button>
  );
}
