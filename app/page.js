"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import ChartCard from "@/components/ChartCard";
import KpiCard from "@/components/KpiCard";
import { Skeleton } from "@/components/Skeleton";
import UsersRevenueChart from "@/components/charts/UsersRevenueChart";
import RevenueByPlanChart from "@/components/charts/RevenueByPlanChart";
import UsersByCountryChart from "@/components/charts/UsersByCountryChart";
import { useLanguage } from "@/components/LanguageProvider";
import { useRange } from "@/components/RangeProvider";
import { randomDelay } from "@/lib/delay";
import {
  computeKpis,
  generateRevenueByPlan,
  generateSeries,
  generateUsersByCountry,
} from "@/lib/data";

export default function OverviewPage() {
  const { t, lang } = useLanguage();
  const { range } = useRange();
  const [payload, setPayload] = useState(null);
  const loading = !payload || payload.range !== range;

  useEffect(() => {
    let cancelled = false;
    randomDelay().then(() => {
      if (cancelled) return;
      const series = generateSeries(range, "current");
      const previousSeries = generateSeries(range, "previous");
      setPayload({
        range,
        series,
        kpis: computeKpis(series, previousSeries),
        revenueByPlan: generateRevenueByPlan(range),
        usersByCountry: generateUsersByCountry(range),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [range]);

  return (
    <div>
      <Topbar title={t("nav_overview")} subtitle={t("brand_tagline")} />

      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading || !payload
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[92px] w-full" />
              ))
            : payload.kpis.map((kpi) => (
                <KpiCard
                  key={kpi.key}
                  kpi={kpi}
                  lang={lang}
                  label={t(`kpi_${kpi.key}`)}
                  sublabel={t("kpi_vs_previous")}
                />
              ))}
        </div>

        <ChartCard
          title={t("chart_users_revenue_title")}
          legend={
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                {t("legend_active_users")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {t("legend_revenue")}
              </span>
            </div>
          }
        >
          {loading || !payload ? (
            <Skeleton className="h-[280px] w-full" />
          ) : (
            <UsersRevenueChart data={payload.series} />
          )}
        </ChartCard>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title={t("chart_revenue_by_plan_title")}>
            {loading || !payload ? (
              <Skeleton className="h-[240px] w-full" />
            ) : (
              <RevenueByPlanChart data={payload.revenueByPlan} />
            )}
          </ChartCard>

          <ChartCard title={t("chart_users_by_country_title")}>
            {loading || !payload ? (
              <Skeleton className="h-[240px] w-full" />
            ) : (
              <UsersByCountryChart data={payload.usersByCountry} />
            )}
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
