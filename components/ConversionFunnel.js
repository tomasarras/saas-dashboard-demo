import { formatNumber, formatPercent } from "@/lib/format";

const COLORS = ["#818cf8", "#6366f1", "#22d3ee", "#34d399", "#fbbf24"];

export default function ConversionFunnel({ steps, lang, t }) {
  const max = steps[0]?.value || 1;

  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const widthPct = Math.max(8, (step.value / max) * 100);
        const ofPrevious =
          i === 0 ? 100 : (step.value / steps[i - 1].value) * 100;

        return (
          <div key={step.key}>
            <div className="mb-1 flex items-baseline justify-between text-xs">
              <span className="font-medium text-slate-300">{t(step.key)}</span>
              <span className="text-slate-500">
                {formatNumber(step.value, lang)}
                {i > 0 && (
                  <span className="ml-2 text-slate-600">
                    {t("funnel_of_previous", Math.round(ofPrevious))}
                  </span>
                )}
              </span>
            </div>
            <div className="h-8 w-full overflow-hidden rounded-md bg-white/5">
              <div
                className="flex h-full items-center rounded-md text-xs font-semibold text-slate-950 transition-all"
                style={{ width: `${widthPct}%`, background: COLORS[i % COLORS.length] }}
              >
                {widthPct > 14 && (
                  <span className="px-2">{formatPercent(ofPrevious, lang, 0)}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
