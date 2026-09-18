"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLanguage } from "@/components/LanguageProvider";
import {
  formatCompactNumber,
  formatCurrency,
  formatDateShort,
} from "@/lib/format";

function ChartTooltip({ active, payload, label, lang, t }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 font-semibold text-slate-300">
        {formatDateShort(label, lang)}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-1.5" style={{ color: p.color }}>
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.dataKey === "activeUsers"
            ? `${t("legend_active_users")}: ${formatCompactNumber(p.value, lang)}`
            : `${t("legend_revenue")}: ${formatCurrency(p.value, lang)}`}
        </p>
      ))}
    </div>
  );
}

export default function UsersRevenueChart({ data }) {
  const { lang, t } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(d) => formatDateShort(d, lang)}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
          minTickGap={24}
        />
        <YAxis
          yAxisId="users"
          tickFormatter={(v) => formatCompactNumber(v, lang)}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={44}
        />
        <YAxis
          yAxisId="revenue"
          orientation="right"
          tickFormatter={(v) => formatCompactNumber(v, lang)}
          tick={{ fill: "#64748b", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={44}
        />
        <Tooltip content={<ChartTooltip lang={lang} t={t} />} />
        <Area
          yAxisId="users"
          type="monotone"
          dataKey="activeUsers"
          stroke="#818cf8"
          strokeWidth={2}
          fill="url(#usersFill)"
        />
        <Line
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          stroke="#34d399"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
