"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Topbar from "@/components/Topbar";
import { Skeleton } from "@/components/Skeleton";
import { useLanguage } from "@/components/LanguageProvider";
import { useRange } from "@/components/RangeProvider";
import { randomDelay } from "@/lib/delay";
import { generateUsersTable } from "@/lib/data";
import { formatCurrency, formatDateShort } from "@/lib/format";

const PAGE_SIZE = 10;
const STATUSES = ["active", "trialing", "past_due", "canceled"];
const STATUS_STYLES = {
  active: "bg-emerald-500/10 text-emerald-400",
  trialing: "bg-sky-500/10 text-sky-400",
  past_due: "bg-amber-500/10 text-amber-400",
  canceled: "bg-slate-500/10 text-slate-400",
};

export default function UsersPage() {
  const { t, lang } = useLanguage();
  const { range } = useRange();
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const loading = !data || data.range !== range;

  useEffect(() => {
    let cancelled = false;
    randomDelay().then(() => {
      if (cancelled) return;
      setData({ range, rows: generateUsersTable(range, 60) });
      setPage(1);
    });
    return () => {
      cancelled = true;
    };
  }, [range]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (data?.rows || []).filter((r) => {
      const matchesSearch =
        !q || r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
      const matchesStatus = status === "all" || r.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <Topbar title={t("users_title")} subtitle={t("users_subtitle")} />

      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={t("users_search_placeholder")}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200 focus:border-indigo-400 focus:outline-none"
          >
            <option value="all">{t("users_filter_all_status")}</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {t(`status_${s}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-xs text-slate-400">
                <th className="px-4 py-3 font-medium">{t("users_col_name")}</th>
                <th className="px-4 py-3 font-medium">{t("users_col_plan")}</th>
                <th className="px-4 py-3 font-medium">{t("users_col_mrr")}</th>
                <th className="px-4 py-3 font-medium">{t("users_col_status")}</th>
                <th className="px-4 py-3 font-medium">{t("users_col_country")}</th>
                <th className="px-4 py-3 font-medium">{t("users_col_signup")}</th>
                <th className="px-4 py-3 font-medium">{t("users_col_last_active")}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-4 py-3" colSpan={7}>
                      <Skeleton className="h-4 w-full" />
                    </td>
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-center text-slate-500" colSpan={7}>
                    {t("users_no_results")}
                  </td>
                </tr>
              ) : (
                paginated.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-200">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{t(`plan_${r.planId}`)}</td>
                    <td className="px-4 py-3 text-slate-300">{formatCurrency(r.mrr, lang)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[r.status]}`}
                      >
                        {t(`status_${r.status}`)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{t(`country_${r.countryId}`)}</td>
                    <td className="px-4 py-3 text-slate-400">{formatDateShort(r.signupDate, lang)}</td>
                    <td className="px-4 py-3 text-slate-400">{formatDateShort(r.lastActive, lang)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
            <p>{t("users_showing", paginated.length, filtered.length)}</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-white/10 px-3 py-1.5 font-medium text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t("users_prev_page")}
              </button>
              <span>{t("users_page_of", page, totalPages)}</span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-white/10 px-3 py-1.5 font-medium text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t("users_next_page")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
