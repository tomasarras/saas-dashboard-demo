"use client";

import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import ChartCard from "@/components/ChartCard";
import ConversionFunnel from "@/components/ConversionFunnel";
import CohortHeatmap from "@/components/CohortHeatmap";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";
import { useRange } from "@/components/RangeProvider";
import { randomDelay } from "@/lib/delay";
import { generateCohorts, generateFunnel } from "@/lib/data";

const COHORT_WEEKS = 8;

export default function FunnelPage() {
  const { t, lang } = useLanguage();
  const { range } = useRange();
  const [data, setData] = useState(null);
  const loading = !data || data.range !== range;
  const { funnel, cohorts } = data || {};

  useEffect(() => {
    let cancelled = false;
    randomDelay().then(() => {
      if (cancelled) return;
      setData({ range, funnel: generateFunnel(range), cohorts: generateCohorts() });
    });
    return () => {
      cancelled = true;
    };
  }, [range]);

  return (
    <div>
      <Topbar title={t("funnel_title")} subtitle={t("funnel_subtitle")} />

      <div className="space-y-6 p-6">
        <ChartCard title={t("funnel_section_title")}>
          {loading || !funnel ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <ConversionFunnel steps={funnel} lang={lang} t={t} />
          )}
        </ChartCard>

        <ChartCard title={t("cohorts_section_title")}>
          {loading || !cohorts ? (
            <Skeleton className="h-[220px] w-full" />
          ) : (
            <CohortHeatmap cohorts={cohorts} weeks={COHORT_WEEKS} t={t} lang={lang} />
          )}
        </ChartCard>
      </div>
    </div>
  );
}
