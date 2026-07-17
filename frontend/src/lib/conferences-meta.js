// Client-safe conference vocabulary and grouping helpers. No node:fs here —
// the client calendar view imports this module; the filesystem loader lives in
// lib/conferences.js (server only).

// Canonical audience filters. Events store the key; the UI shows label + accent.
export const AUDIENCES = {
  "cpas-firms": { label: "CPAs & Firms", accent: "#7C3AED" },
  "cfos-finance": { label: "CFOs & Finance teams", accent: "#059669" },
  tax: { label: "Tax", accent: "#D97706" },
  quickbooks: { label: "QuickBooks ecosystem", accent: "#2563EB" },
};

// Canonical event formats.
export const FORMATS = {
  "in-person": { label: "In-person" },
  hybrid: { label: "Hybrid" },
  virtual: { label: "Virtual" },
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export function monthKey(dateStr) {
  return dateStr.slice(0, 7); // YYYY-MM
}

export function monthLabel(key) {
  const [year, month] = key.split("-");
  return { month: MONTH_NAMES[Number(month) - 1], year };
}

export function monthAbbr(dateStr) {
  return MONTH_ABBR[Number(dateStr.slice(5, 7)) - 1];
}

// "26–28" for a same-month range, "Nov 30 – Dec 2" style otherwise.
export function dayRange(startDate, endDate) {
  const startDay = Number(startDate.slice(8, 10));
  const endDay = Number(endDate.slice(8, 10));
  if (monthKey(startDate) === monthKey(endDate)) {
    return startDay === endDay ? String(startDay) : `${startDay}–${endDay}`;
  }
  return `${startDay} – ${monthAbbr(endDate)} ${endDay}`;
}

// Groups date-sorted events into [{ key, month, year, events }] preserving order.
export function groupByMonth(events) {
  const groups = new Map();
  for (const ev of events) {
    const key = monthKey(ev.startDate);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(ev);
  }
  return Array.from(groups, ([key, evs]) => ({ key, ...monthLabel(key), events: evs }));
}
