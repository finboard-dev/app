/**
 * FinBoard facts shared by the /compare pages. Only claims published on
 * finboard.ai or FinBoard's Google Workspace Marketplace listing belong here.
 * FinBoard works with QuickBooks Online and Google Sheets: never claim Xero,
 * Excel or multi-currency support on these pages.
 *
 * Plain ES module with relative imports, so node tests can import it.
 */
import { PRICE_PER_ENTITY, SHEETS_ADDON_URL, START_PATH, TRIAL_DAYS } from "../trial.js";

export { PRICE_PER_ENTITY, SHEETS_ADDON_URL, START_PATH, TRIAL_DAYS };

export const PRIMARY_CTA = { label: "Start free trial", href: START_PATH };
export const SECONDARY_CTA = { label: "Install from Google Workspace Marketplace", href: SHEETS_ADDON_URL };

export const PRICE_LINE = `Free for ${TRIAL_DAYS} days, then from ${PRICE_PER_ENTITY} per entity per month.`;

export const HERO_POINTS = [
  "Consolidated P&L and balance sheet",
  "Intercompany eliminations",
  "Chart of accounts mapping",
  "Refreshes every hour",
];

export const SWITCH_STEPS = [
  {
    title: "Install the add-on",
    body: "Add FinBoard to Google Sheets from the Google Workspace Marketplace.",
  },
  {
    title: "Connect your QuickBooks Online entities",
    body: "Connect each QuickBooks Online company. There is no limit on the number of entities.",
  },
  {
    title: "Map your chart of accounts",
    body: "Map each entity's accounts to one group chart of accounts, so every line rolls up the same way.",
  },
  {
    title: "Get consolidated reports",
    body: "A consolidated P&L and balance sheet with entities side by side and intercompany eliminated, refreshed every hour.",
  },
];

export const PRICING_INCLUDES = [
  "Unlimited QuickBooks Online entities",
  "Consolidated P&L and balance sheet",
  "Intercompany eliminations and journal entry checks",
  "Budgets vs actuals, flux and variance analysis",
  "Forecasting and scenarios",
  "Expert help automating your templates",
  "Premium support",
];

/** Our own published speed claims; label them as ours wherever they appear. */
export const SPEED_CLAIMS = [
  "Pulls monthly financials in under 10 seconds",
  "Saves up to 4 hours per entity per month",
];

/**
 * Social proof from FinBoard's Marketplace listing, shown under the hero CTAs.
 * Set to null to hide it if the listing stops showing these numbers.
 */
export const MARKETPLACE_PROOF = "2K+ installs and a 5-star average rating on the Google Workspace Marketplace.";
