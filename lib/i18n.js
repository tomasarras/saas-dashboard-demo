// Lightweight client-side i18n: a flat dictionary keyed by string id, each
// entry holding an `es` and `en` value (or a function for pluralized /
// interpolated strings). No routing involved — see LanguageProvider.
export const dict = {
  // Brand / meta
  brand_name: { es: "Pulsely", en: "Pulsely" },
  brand_tagline: {
    es: "Analítica de producto ficticia · demo de portfolio",
    en: "Fictional product analytics · portfolio demo",
  },

  // Sidebar nav
  nav_overview: { es: "Resumen", en: "Overview" },
  nav_users: { es: "Usuarios", en: "Users" },
  nav_funnel: { es: "Funnel y retención", en: "Funnel & retention" },

  // Banner
  banner_text: {
    es: "Proyecto de portfolio: todos los datos son ficticios y se generan en el navegador. No hay backend ni usuarios reales.",
    en: "Portfolio project: all data is fictional and generated in the browser. No backend or real users.",
  },

  // Topbar / range picker
  range_7d: { es: "7 días", en: "7 days" },
  range_30d: { es: "30 días", en: "30 days" },
  range_90d: { es: "90 días", en: "90 days" },
  range_label: { es: "Rango", en: "Range" },

  // KPIs
  kpi_active_users: { es: "Usuarios activos", en: "Active users" },
  kpi_mrr: { es: "Ingresos (MRR)", en: "Revenue (MRR)" },
  kpi_churn_rate: { es: "Tasa de abandono", en: "Churn rate" },
  kpi_conversion_rate: { es: "Tasa de conversión", en: "Conversion rate" },
  kpi_vs_previous: { es: "vs. período anterior", en: "vs. previous period" },

  // Overview charts
  chart_users_revenue_title: {
    es: "Usuarios activos e ingresos",
    en: "Active users & revenue",
  },
  chart_revenue_by_plan_title: {
    es: "Ingresos por plan",
    en: "Revenue by plan",
  },
  chart_users_by_country_title: {
    es: "Usuarios por país",
    en: "Users by country",
  },
  legend_active_users: { es: "Usuarios activos", en: "Active users" },
  legend_revenue: { es: "Ingresos", en: "Revenue" },

  // Plans
  plan_starter: { es: "Starter", en: "Starter" },
  plan_pro: { es: "Pro", en: "Pro" },
  plan_business: { es: "Business", en: "Business" },
  plan_enterprise: { es: "Enterprise", en: "Enterprise" },
  plan_customers: {
    es: (n) => `${n} clientes`,
    en: (n) => `${n} customers`,
  },

  // Countries
  country_ar: { es: "Argentina", en: "Argentina" },
  country_br: { es: "Brasil", en: "Brazil" },
  country_us: { es: "Estados Unidos", en: "United States" },
  country_es: { es: "España", en: "Spain" },
  country_mx: { es: "México", en: "Mexico" },
  country_cl: { es: "Chile", en: "Chile" },
  country_de: { es: "Alemania", en: "Germany" },
  country_gb: { es: "Reino Unido", en: "United Kingdom" },

  // Users page
  users_title: { es: "Usuarios", en: "Users" },
  users_subtitle: {
    es: "Listado de cuentas ficticias generadas para esta demo.",
    en: "Fictional accounts generated for this demo.",
  },
  users_search_placeholder: {
    es: "Buscar por nombre o email…",
    en: "Search by name or email…",
  },
  users_filter_all_status: { es: "Todos los estados", en: "All statuses" },
  users_col_name: { es: "Nombre", en: "Name" },
  users_col_plan: { es: "Plan", en: "Plan" },
  users_col_mrr: { es: "MRR", en: "MRR" },
  users_col_status: { es: "Estado", en: "Status" },
  users_col_country: { es: "País", en: "Country" },
  users_col_signup: { es: "Alta", en: "Signed up" },
  users_col_last_active: { es: "Última actividad", en: "Last active" },
  users_no_results: {
    es: "No hay usuarios que coincidan con la búsqueda.",
    en: "No users match your search.",
  },
  users_showing: {
    es: (shown, total) => `Mostrando ${shown} de ${total}`,
    en: (shown, total) => `Showing ${shown} of ${total}`,
  },
  users_prev_page: { es: "Anterior", en: "Previous" },
  users_next_page: { es: "Siguiente", en: "Next" },
  users_page_of: {
    es: (page, total) => `Página ${page} de ${total}`,
    en: (page, total) => `Page ${page} of ${total}`,
  },

  status_active: { es: "Activo", en: "Active" },
  status_trialing: { es: "En prueba", en: "Trialing" },
  status_past_due: { es: "Pago vencido", en: "Past due" },
  status_canceled: { es: "Cancelado", en: "Canceled" },

  // Funnel page
  funnel_title: { es: "Funnel y retención", en: "Funnel & retention" },
  funnel_subtitle: {
    es: "Conversión de visitante a cliente pago, y retención por cohorte mensual.",
    en: "Visitor-to-paid-customer conversion, and retention by monthly cohort.",
  },
  funnel_section_title: {
    es: "Embudo de conversión",
    en: "Conversion funnel",
  },
  funnel_visitors: { es: "Visitantes", en: "Visitors" },
  funnel_signups: { es: "Registros", en: "Sign-ups" },
  funnel_trial_started: { es: "Prueba iniciada", en: "Trial started" },
  funnel_trial_completed: { es: "Prueba completada", en: "Trial completed" },
  funnel_paid: { es: "Suscripción paga", en: "Paid subscription" },
  funnel_of_previous: {
    es: (pct) => `${pct}% del paso anterior`,
    en: (pct) => `${pct}% of previous step`,
  },

  cohorts_section_title: {
    es: "Retención por cohorte (semanas desde alta)",
    en: "Cohort retention (weeks since signup)",
  },
  cohorts_col_cohort: { es: "Cohorte", en: "Cohort" },
  cohorts_week: { es: (n) => `Sem. ${n}`, en: (n) => `Wk ${n}` },

  // Footer
  footer_disclaimer_title: {
    es: "Pulsely es un proyecto de portfolio, no un producto SaaS real.",
    en: "Pulsely is a portfolio project, not a real SaaS product.",
  },
  footer_disclaimer_body: {
    es: "Todos los usuarios, métricas e ingresos son ficticios y se generan en el navegador con datos aleatorios deterministas. No hay backend ni base de datos.",
    en: "All users, metrics and revenue are fictional and generated in the browser with deterministic random data. No backend or database.",
  },
  footer_made_by: { es: "Hecho por", en: "Made by" },
  footer_code_at: { es: "código en", en: "code on" },
};
