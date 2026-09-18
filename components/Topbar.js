"use client";

import { Menu } from "lucide-react";
import RangePicker from "@/components/RangePicker";
import { useSidebar } from "@/components/SidebarProvider";

export default function Topbar({ title, subtitle }) {
  const { setOpen } = useSidebar();

  return (
    <div className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-0.5 shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-white/5 hover:text-slate-200 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
      <RangePicker />
    </div>
  );
}
