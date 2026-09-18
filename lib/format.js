const LOCALES = { es: "es-AR", en: "en-US" };

export function formatCurrency(usd, lang = "es") {
  return new Intl.NumberFormat(LOCALES[lang] || LOCALES.es, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

export function formatCompactNumber(n, lang = "es") {
  return new Intl.NumberFormat(LOCALES[lang] || LOCALES.es, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function formatNumber(n, lang = "es") {
  return new Intl.NumberFormat(LOCALES[lang] || LOCALES.es).format(n);
}

export function formatPercent(n, lang = "es", decimals = 1) {
  return `${n.toLocaleString(LOCALES[lang] || LOCALES.es, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
}

export function formatDateShort(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
}

export function formatMonthShort(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
}

export function formatDateLong(dateStr, lang = "es") {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00Z`);
  return d.toLocaleDateString(LOCALES[lang] || LOCALES.es, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
