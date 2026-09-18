"use client";

import { RANGES } from "@/lib/data";
import { useRange } from "@/components/RangeProvider";
import { useLanguage } from "@/components/LanguageProvider";

const LABEL_KEYS = { 7: "range_7d", 30: "range_30d", 90: "range_90d" };

export default function RangePicker() {
  const { range, setRange } = useRange();
  const { t } = useLanguage();

  return (
    <div className="flex overflow-hidden rounded-lg ring-1 ring-white/10">
      {RANGES.map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setRange(r)}
          aria-pressed={range === r}
          className={`px-3 py-1.5 text-xs font-semibold transition ${
            range === r
              ? "bg-indigo-500 text-white"
              : "bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] hover:text-slate-200"
          }`}
        >
          {t(LABEL_KEYS[r])}
        </button>
      ))}
    </div>
  );
}
