"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex overflow-hidden rounded-full text-xs font-semibold ring-1 ring-white/10">
      {["es", "en"].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 transition ${
            lang === code
              ? "bg-indigo-500 text-white"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
