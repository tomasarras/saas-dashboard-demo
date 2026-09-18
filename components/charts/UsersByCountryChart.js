"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useLanguage } from "@/components/LanguageProvider";
import { formatCompactNumber } from "@/lib/format";

const COLORS = [
  "#818cf8",
  "#22d3ee",
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#a78bfa",
  "#38bdf8",
  "#f472b6",
];

function ChartTooltip({ active, payload, lang, t }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-slate-200">{t(`country_${p.countryId}`)}</p>
      <p className="mt-1 text-slate-400">{formatCompactNumber(p.users, lang)}</p>
    </div>
  );
}

export default function UsersByCountryChart({ data }) {
  const { lang, t } = useLanguage();
  const total = data.reduce((sum, d) => sum + d.users, 0);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="h-[220px] w-[220px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="users"
              nameKey="countryId"
              innerRadius={62}
              outerRadius={90}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell key={entry.countryId} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip lang={lang} t={t} />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid w-full grid-cols-1 gap-1.5 text-xs sm:grid-cols-2">
        {data.map((d, i) => (
          <li key={d.countryId} className="flex items-center gap-1.5 text-slate-400">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className="truncate">{t(`country_${d.countryId}`)}</span>
            <span className="ml-auto shrink-0 font-medium text-slate-300">
              {Math.round((d.users / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
