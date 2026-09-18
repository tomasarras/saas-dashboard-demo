import { createRng, pick, randInt, randFloat } from "./prng";

// All "data" below is generated deterministically from a seed derived from
// the selected date range, so switching ranges always reproduces the same
// numbers instead of reshuffling randomly on every render. There is no
// backend — this is a static portfolio demo.

export const RANGES = [7, 30, 90];

const PLANS = [
  { id: "starter", label: "Starter", price: 12 },
  { id: "pro", label: "Pro", price: 39 },
  { id: "business", label: "Business", price: 99 },
  { id: "enterprise", label: "Enterprise", price: 249 },
];

const COUNTRIES = ["ar", "br", "us", "es", "mx", "cl", "de", "gb"];

const FIRST_NAMES = [
  "Julieta",
  "Martín",
  "Camila",
  "Lucas",
  "Sofía",
  "Diego",
  "Valentina",
  "Mateo",
  "Renata",
  "Tomás",
  "Agustina",
  "Bruno",
  "Carla",
  "Franco",
  "Emma",
  "Iván",
  "Lucía",
  "Nicolás",
  "Paula",
  "Simón",
];

const LAST_NAMES = [
  "Fernández",
  "Gómez",
  "Rodríguez",
  "Silva",
  "Torres",
  "Vidal",
  "Romero",
  "Castro",
  "Molina",
  "Ortiz",
  "Herrera",
  "Suárez",
  "Navarro",
  "Reyes",
  "Campos",
];

const STATUSES = ["active", "trialing", "past_due", "canceled"];

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export function generateSeries(days, seedSuffix = "") {
  const rng = createRng(`pulsely-series-${days}-${seedSuffix}`);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const points = [];
  let baseUsers = days <= 7 ? 2400 : days <= 30 ? 2100 : 1500;
  let baseRevenue = days <= 7 ? 9800 : days <= 30 ? 8600 : 6200;

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);

    // Gentle upward drift plus weekly seasonality (dip on weekends) plus noise.
    const dayOfWeek = d.getUTCDay();
    const weekendDip = dayOfWeek === 0 || dayOfWeek === 6 ? 0.82 : 1;
    const drift = 1 + ((days - i) / days) * 0.28;
    const noise = 0.9 + rng() * 0.2;

    const activeUsers = Math.round(baseUsers * drift * weekendDip * noise);
    const newUsers = Math.round(randInt(rng, 8, 46) * weekendDip);
    const revenue = Math.round(baseRevenue * drift * weekendDip * noise);
    const churned = randInt(rng, 0, Math.max(1, Math.round(newUsers * 0.3)));

    points.push({
      date: toISODate(d),
      activeUsers,
      newUsers,
      churned,
      revenue,
    });
  }

  return points;
}

export function computeKpis(currentSeries, previousSeries) {
  const sum = (arr, key) => arr.reduce((acc, p) => acc + p[key], 0);
  const avg = (arr, key) => sum(arr, key) / arr.length;

  const curActiveAvg = avg(currentSeries, "activeUsers");
  const prevActiveAvg = avg(previousSeries, "activeUsers");

  const curRevenue = sum(currentSeries, "revenue");
  const prevRevenue = sum(previousSeries, "revenue");

  const curNew = sum(currentSeries, "newUsers");
  const curChurned = sum(currentSeries, "churned");
  const prevNew = sum(previousSeries, "newUsers");
  const prevChurned = sum(previousSeries, "churned");

  const churnRate = curNew > 0 ? (curChurned / (curActiveAvg || 1)) * 100 : 0;
  const prevChurnRate =
    prevNew > 0 ? (prevChurned / (prevActiveAvg || 1)) * 100 : 0;

  const conversionRate = 100 * (curNew / (curNew + curChurned + 40));
  const prevConversionRate =
    100 * (prevNew / (prevNew + prevChurned + 40));

  const pctChange = (cur, prev) =>
    prev === 0 ? 0 : ((cur - prev) / prev) * 100;

  return [
    {
      key: "active_users",
      value: Math.round(curActiveAvg),
      change: pctChange(curActiveAvg, prevActiveAvg),
    },
    {
      key: "mrr",
      value: curRevenue,
      change: pctChange(curRevenue, prevRevenue),
    },
    {
      key: "churn_rate",
      value: churnRate,
      change: pctChange(churnRate, prevChurnRate),
      invert: true,
    },
    {
      key: "conversion_rate",
      value: conversionRate,
      change: pctChange(conversionRate, prevConversionRate),
    },
  ];
}

export function generateRevenueByPlan(days) {
  const rng = createRng(`pulsely-plans-${days}`);
  const weights = [0.42, 0.33, 0.17, 0.08];
  const totalCustomers = days <= 7 ? 1240 : days <= 30 ? 1180 : 1020;

  return PLANS.map((plan, i) => {
    const customers = Math.round(
      totalCustomers * weights[i] * (0.9 + rng() * 0.2)
    );
    return {
      ...plan,
      customers,
      revenue: customers * plan.price,
    };
  });
}

export function generateUsersByCountry(days) {
  const rng = createRng(`pulsely-countries-${days}`);
  const weights = [0.24, 0.19, 0.17, 0.13, 0.11, 0.08, 0.05, 0.03];
  const total = days <= 7 ? 2600 : days <= 30 ? 2350 : 1900;

  return COUNTRIES.map((countryId, i) => ({
    countryId,
    users: Math.round(total * weights[i] * (0.9 + rng() * 0.2)),
  })).sort((a, b) => b.users - a.users);
}

export function generateFunnel(days) {
  const rng = createRng(`pulsely-funnel-${days}`);
  const visitors = days <= 7 ? 18400 : days <= 30 ? 71000 : 198000;

  const signupRate = randFloat(rng, 0.22, 0.3);
  const trialStartRate = randFloat(rng, 0.55, 0.68);
  const trialCompleteRate = randFloat(rng, 0.45, 0.6);
  const paidRate = randFloat(rng, 0.28, 0.4);

  const signups = Math.round(visitors * signupRate);
  const trialsStarted = Math.round(signups * trialStartRate);
  const trialsCompleted = Math.round(trialsStarted * trialCompleteRate);
  const paid = Math.round(trialsCompleted * paidRate);

  return [
    { key: "funnel_visitors", value: visitors },
    { key: "funnel_signups", value: signups },
    { key: "funnel_trial_started", value: trialsStarted },
    { key: "funnel_trial_completed", value: trialsCompleted },
    { key: "funnel_paid", value: paid },
  ];
}

export function generateCohorts() {
  const rng = createRng("pulsely-cohorts");
  const months = 6;
  const weeks = 8;
  const today = new Date();

  const cohorts = [];
  for (let m = months - 1; m >= 0; m--) {
    const cohortDate = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - m, 1)
    );
    const monthDate = toISODate(cohortDate);

    const weeksElapsed = Math.min(weeks, m * 4 + 3);
    let retention = 100;
    const row = [];
    for (let w = 0; w < weeks; w++) {
      if (w > weeksElapsed) {
        row.push(null);
        continue;
      }
      if (w === 0) {
        row.push(100);
        continue;
      }
      const drop = randFloat(rng, 4, 11);
      retention = Math.max(8, retention - drop);
      row.push(Math.round(retention));
    }
    cohorts.push({ monthDate, row });
  }

  return cohorts;
}

export function generateUsersTable(days, count = 60) {
  const rng = createRng(`pulsely-users-${days}-${count}`);
  const today = new Date();

  const rows = [];
  for (let i = 0; i < count; i++) {
    const first = pick(rng, FIRST_NAMES);
    const last = pick(rng, LAST_NAMES);
    const plan = pick(rng, PLANS);
    const status = pick(rng, STATUSES);
    const countryId = pick(rng, COUNTRIES);
    const signupDaysAgo = randInt(rng, 1, days + 180);
    const signupDate = new Date(today);
    signupDate.setUTCDate(signupDate.getUTCDate() - signupDaysAgo);
    const lastActiveDaysAgo = randInt(rng, 0, Math.min(signupDaysAgo, 21));
    const lastActive = new Date(today);
    lastActive.setUTCDate(lastActive.getUTCDate() - lastActiveDaysAgo);

    rows.push({
      id: `usr_${(1000 + i).toString(36)}`,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${pick(rng, [
        "mailbox.io",
        "inboxly.com",
        "workmail.dev",
        "notifyhub.co",
      ])}`,
      planId: plan.id,
      mrr: status === "canceled" ? 0 : plan.price,
      status,
      countryId,
      signupDate: toISODate(signupDate),
      lastActive: toISODate(lastActive),
    });
  }

  return rows.sort((a, b) => (a.lastActive < b.lastActive ? 1 : -1));
}

export { PLANS, COUNTRIES };
