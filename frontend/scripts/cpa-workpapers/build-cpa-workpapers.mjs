import fs from "node:fs/promises";
import ExcelJS from "exceljs";
import { verifyAndExport } from "./shared.mjs";
import { buildMonthlyFinancialReview } from "./monthly-financial-review.mjs";

const outputRoot = "/private/tmp/finboard-cpa-workpapers";
const requested = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : "all";
const builders = [["monthly-financial-statement-review-template", buildMonthlyFinancialReview]];

for (const [slug, build] of builders) {
  if (requested !== "all" && requested !== slug) continue;
  const workbook = new ExcelJS.Workbook(); await build(workbook);
  const result = await verifyAndExport({ workbook, slug, outputRoot, fs });
  console.log(JSON.stringify({ slug, ...result }));
}
