import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import ExcelJS from "exceljs";
import { verifyAndExport } from "./shared.mjs";
import { buildMonthlyFinancialReview } from "./monthly-financial-review.mjs";
import { buildBankReconciliation } from "./bank-reconciliation.mjs";
import { buildTrialBalanceReview } from "./trial-balance-review.mjs";

const outputRoot = "/private/tmp/finboard-cpa-workpapers";
const requested = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : "all";
const publishRoot = process.argv.includes("--publish-root") ? process.argv[process.argv.indexOf("--publish-root") + 1] : null;
const builders = [
  ["monthly-financial-statement-review-template", buildMonthlyFinancialReview],
  ["bank-reconciliation-workpaper-template", buildBankReconciliation],
  ["trial-balance-review-workpaper-template", buildTrialBalanceReview],
];

for (const [slug, build] of builders) {
  if (requested !== "all" && requested !== slug) continue;
  const workbook = new ExcelJS.Workbook(); await build(workbook);
  const result = await verifyAndExport({ workbook, slug, outputRoot, fs });
  if (publishRoot) {
    const publishedXlsx = `${publishRoot}/public/template-files/${slug}.xlsx`;
    const scratchCover = result.renderPaths.find((path) => path.endsWith("/summary.png"));
    const publishedCover = `${publishRoot}/public/templates/covers/${slug}.png`;
    const digest = async (path) => createHash("sha256").update(await fs.readFile(path)).digest("hex");
    await fs.mkdir(`${publishRoot}/public/template-files`, { recursive: true });
    await fs.mkdir(`${publishRoot}/public/templates/covers`, { recursive: true });
    await fs.copyFile(result.xlsxPath, publishedXlsx);
    await fs.copyFile(scratchCover, publishedCover);
    const manifest = {
      slug,
      xlsx: { scratch_sha256: await digest(result.xlsxPath), published_sha256: await digest(publishedXlsx) },
      cover: { scratch_sha256: await digest(scratchCover), published_sha256: await digest(publishedCover) },
      renders: result.renderDimensions,
      formula_count: result.formulaCount,
      validation_count: result.validationCount,
    };
    if (manifest.xlsx.scratch_sha256 !== manifest.xlsx.published_sha256 || manifest.cover.scratch_sha256 !== manifest.cover.published_sha256) throw new Error(`published artifact hash mismatch: ${slug}`);
    await fs.writeFile(`${publishRoot}/public/template-files/${slug}.verification.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  console.log(JSON.stringify({ slug, ...result }));
}
