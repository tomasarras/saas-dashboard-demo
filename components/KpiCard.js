import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/format";

function formatValue(kpi, lang) {
  if (kpi.key === "mrr") return formatCurrency(kpi.value, lang);
  if (kpi.key === "churn_rate" || kpi.key === "conversion_rate")
    return formatPercent(kpi.value, lang);
  return formatCompactNumber(kpi.value, lang);
}

export default function KpiCard({ kpi, label, sublabel, lang }) {
  const isGood = kpi.invert ? kpi.change <= 0 : kpi.change >= 0;
  const Arrow = kpi.change >= 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">
        {formatValue(kpi, lang)}
      </p>
      <div className="mt-2 flex items-center gap-1 text-xs">
        <span
          className={`flex items-center gap-0.5 font-semibold ${
            isGood ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          <Arrow size={13} />
          {formatPercent(Math.abs(kpi.change), lang)}
        </span>
        <span className="text-slate-500">{sublabel}</span>
      </div>
    </div>
  );
}
