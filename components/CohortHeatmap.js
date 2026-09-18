import { formatMonthShort } from "@/lib/format";

function cellStyle(value) {
  if (value === null) return { background: "transparent" };
  const alpha = 0.12 + (value / 100) * 0.75;
  return { background: `rgba(129, 140, 248, ${alpha})` };
}

export default function CohortHeatmap({ cohorts, weeks, t, lang }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-separate border-spacing-1 text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left font-medium text-slate-400">
              {t("cohorts_col_cohort")}
            </th>
            {Array.from({ length: weeks }).map((_, w) => (
              <th key={w} className="px-2 py-1 text-center font-medium text-slate-400">
                {t("cohorts_week", w)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cohorts.map((cohort) => (
            <tr key={cohort.monthDate}>
              <td className="whitespace-nowrap px-2 py-1 font-medium text-slate-300">
                {formatMonthShort(cohort.monthDate, lang)}
              </td>
              {cohort.row.map((value, w) => (
                <td
                  key={w}
                  className="min-w-[46px] rounded-md px-2 py-2 text-center font-semibold text-slate-100"
                  style={cellStyle(value)}
                >
                  {value === null ? (
                    <span className="text-slate-600">—</span>
                  ) : (
                    `${value}%`
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
