"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 px-6 py-6 text-xs text-slate-500">
      <p className="font-medium text-slate-400">{t("footer_disclaimer_title")}</p>
      <p className="mt-1 max-w-3xl">{t("footer_disclaimer_body")}</p>
      <p className="mt-2 text-slate-600">
        {t("footer_made_by")}{" "}
        <a
          href="https://tomasarras.com.ar"
          className="underline hover:text-slate-400"
          target="_blank"
          rel="noreferrer"
        >
          Tomás Arras
        </a>{" "}
        · {t("footer_code_at")}{" "}
        <a
          href="https://github.com/tomasarras/saas-dashboard-demo"
          className="underline hover:text-slate-400"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
