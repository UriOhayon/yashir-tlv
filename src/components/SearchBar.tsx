"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2"
        size={16}
        style={{ color: "var(--muted)" }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-xl border py-2.5 pl-9 pr-4 text-sm transition focus:ring-2"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "#ffffff",
          color: "var(--ink)",
        }}
      />
    </div>
  );
}
