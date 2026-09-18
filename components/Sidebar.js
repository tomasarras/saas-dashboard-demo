"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Gauge, Users2, Waypoints } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

const NAV = [
  { href: "/", icon: Gauge, key: "nav_overview" },
  { href: "/users", icon: Users2, key: "nav_users" },
  { href: "/funnel", icon: Waypoints, key: "nav_funnel" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-white/10 bg-slate-950/60 px-4 py-5">
      <div className="flex items-center gap-2 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
          <Activity size={18} />
        </span>
        <div>
          <p className="text-sm font-bold text-white">{t("brand_name")}</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV.map(({ href, icon: Icon, key }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <Icon size={17} />
              {t(key)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
        <p className="px-1 text-[11px] leading-snug text-slate-500">
          {t("banner_text")}
        </p>
        <LanguageToggle />
      </div>
    </aside>
  );
}
