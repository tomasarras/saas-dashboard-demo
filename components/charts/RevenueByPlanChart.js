"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLanguage } from "@/components/LanguageProvider";
import { formatCompactNumber, formatCurrency } from "@/lib/format";

const COLORS = ["#818cf8", "#22d3ee", "#34d399", "#fbbf24"];

function ChartTooltip({ active, payload, lang, t }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-slate-200">{t(`plan_${p.id}`)}</p>
      <p className="mt-1 text-slate-400">{formatCurrency(p.revenue, lang)}</p>
      <p className="text-slate-500">{t("plan_customers", p.customers)}</p>
    </div>
  );
}

export default function RevenueByPlanChart({ data }) {
  const { lang, t } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="id"
          tickFormatter={(id) => t(`plan_${id}`)}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatCompactNumber(v, lang)}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={44}
        />
        <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} content={<ChartTooltip lang={lang} t={t} />} />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={entry.id} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
