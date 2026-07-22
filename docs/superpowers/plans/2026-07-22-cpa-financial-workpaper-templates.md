# CPA Financial Workpaper Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish three lightweight CPA workpaper XLSX templates with dual input modes, formula-driven reviews, verified preview covers, and dedicated FinBoard template pages.

**Architecture:** A shared artifact-tool builder will create the approved six-sheet shell, styles, validations, inspections, renders, and exports. Three workbook modules will supply domain-specific input tables, formulas, sample data, and summaries. A standard-library Python contract test will verify repository artifacts and page metadata, while artifact-tool inspections and renders provide formula and visual verification.

**Tech Stack:** JavaScript ESM, `@oai/artifact-tool` 2.8.6 or newer, Python 3 unittest and ZIP/XML inspection, Next.js 15, JSON content, XLSX, PNG

## Global Constraints

Create exactly three workbooks: Monthly Financial Statement Review, Bank Reconciliation Workpaper, and Trial Balance Review Workpaper.

Each workbook must contain exactly these six visible sheets in this order: `Start Here`, `Paste Import`, `Manual Input`, `Review`, `Summary`, and `Lists`.

Each workbook must support `Paste Import` and `Manual Input` through the `Start Here` input-mode selector.

Use `@oai/artifact-tool` for spreadsheet authoring, inspection, rendering, and XLSX export. Do not use `openpyxl`, `xlsxwriter`, `pandas.ExcelWriter`, or another spreadsheet-writing library.

Use the dependency path returned by `load_workspace_dependencies`. If the artifact runtime or `@oai/artifact-tool` is unavailable, stop and report the blocker.

Use blue text and light fills for user inputs, black text for formulas, restrained amber for warnings, restrained red for failed controls, and restrained green for completed controls.

Do not use macros, external workbook links, hidden calculations, password protection, ornamental special characters, or decorative symbols.

Use bounded formulas and ranges. Do not use full-column references, volatile `INDIRECT`, or volatile `OFFSET`.

All cross-sheet formulas must quote sheet names, for example `='Start Here'!B8`.

Sample data must produce at least one normal item, one warning, and one unresolved item in each workbook.

All workbook calculations must handle zero denominators without displaying spreadsheet errors.

The Summary sheet of each verified workbook must provide the published cover image.

Export final artifacts first to `/private/tmp/finboard-cpa-workpapers/outputs/cpa-financial-workpapers/`, then copy the verified files unchanged to `frontend/public/template-files/` and `frontend/public/templates/covers/`.

Publish three dedicated template JSON entries and preserve the existing generic template page implementation.

Run the site on port 3010 for final verification.

Push the verified implementation directly to `origin/main`.

Preserve the user's unrelated untracked pipeline run files, `AGENTS.md`, and `package-lock.json`.

---

## File Map

`frontend/scripts/cpa-workpapers/shared.mjs` owns the six-sheet shell, shared styles, title and metadata blocks, input tables, validations, conditional formatting, rendering, inspection, and export helpers.

`frontend/scripts/cpa-workpapers/monthly-financial-review.mjs` owns the monthly statement input fields, review formulas, sample data, and summary formulas.

`frontend/scripts/cpa-workpapers/bank-reconciliation.mjs` owns the bank reconciliation inputs, classifications, calculations, sample data, and summary formulas.

`frontend/scripts/cpa-workpapers/trial-balance-review.mjs` owns the trial balance inputs, sign rules, calculations, sample data, and summary formulas.

`frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs` is the executable entry point. It creates requested workbooks, writes inspection evidence, renders all sheets, and exports scratch XLSX files.

`tests/test_cpa_financial_workpaper_templates.py` verifies published XLSX structure, formulas, validations, covers, and template content contracts without authoring workbooks.

`frontend/content/templates/monthly-financial-statement-review-template.json`, `bank-reconciliation-workpaper-template.json`, and `trial-balance-review-workpaper-template.json` publish the pages.

`frontend/public/template-files/*.xlsx` and `frontend/public/templates/covers/*.png` are the user-facing artifacts.

### Task 1: Shared Builder and Monthly Financial Statement Review

**Files:**

- Create: `frontend/scripts/cpa-workpapers/shared.mjs`
- Create: `frontend/scripts/cpa-workpapers/monthly-financial-review.mjs`
- Create: `frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs`
- Create: `tests/test_cpa_financial_workpaper_templates.py`
- Create: `frontend/public/template-files/monthly-financial-statement-review-template.xlsx`
- Create: `frontend/public/templates/covers/monthly-financial-statement-review-template.png`
- Scratch: `/private/tmp/finboard-cpa-workpapers/`

**Interfaces:**

- Produces: `createShell(workbook, config) -> { start, paste, manual, review, summary, lists }`
- Produces: `styleInputTable(sheet, range, widths) -> void`
- Produces: `addListValidation(range, listRange) -> void`
- Produces: `sourceFormula(columnLetter, rowNumber) -> string`
- Produces: `verifyAndExport(workbook, slug, outputRoot) -> Promise<{ xlsxPath, renderPaths, inspectionPath }>`
- Produces: `buildMonthlyFinancialReview(workbook) -> Workbook`
- Consumes: `Workbook`, `SpreadsheetFile`, and filesystem services from the artifact-tool runtime

- [ ] **Step 1: Write the failing monthly artifact contract**

Create `tests/test_cpa_financial_workpaper_templates.py` with this initial contract:

```python
import struct
import unittest
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = ROOT / "frontend" / "public" / "template-files"
COVERS = ROOT / "frontend" / "public" / "templates" / "covers"
SHEETS = ["Start Here", "Paste Import", "Manual Input", "Review", "Summary", "Lists"]

WORKBOOKS = {
    "monthly-financial-statement-review-template": {
        "min_formulas": 500,
        "min_validations": 3,
    },
}


def workbook_stats(path):
    with zipfile.ZipFile(path) as archive:
        root = ET.fromstring(archive.read("xl/workbook.xml"))
        sheets = [node.attrib["name"] for node in root.iter() if node.tag.endswith("}sheet")]
        formulas = 0
        validations = 0
        for name in archive.namelist():
            if not name.startswith("xl/worksheets/sheet") or not name.endswith(".xml"):
                continue
            xml = ET.fromstring(archive.read(name))
            formulas += sum(1 for node in xml.iter() if node.tag.endswith("}f"))
            validations += sum(1 for node in xml.iter() if node.tag.endswith("}dataValidation"))
        return sheets, formulas, validations


def png_size(path):
    data = path.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise AssertionError(f"not a PNG: {path}")
    return struct.unpack(">II", data[16:24])


class CpaFinancialWorkpaperTemplatesTest(unittest.TestCase):
    def test_published_workbooks_have_required_structure(self):
        for slug, expected in WORKBOOKS.items():
            with self.subTest(slug=slug):
                path = FILES / f"{slug}.xlsx"
                self.assertTrue(path.is_file(), path)
                sheets, formulas, validations = workbook_stats(path)
                self.assertEqual(sheets, SHEETS)
                self.assertGreaterEqual(formulas, expected["min_formulas"])
                self.assertGreaterEqual(validations, expected["min_validations"])

    def test_summary_covers_are_large_landscape_pngs(self):
        for slug in WORKBOOKS:
            with self.subTest(slug=slug):
                path = COVERS / f"{slug}.png"
                self.assertTrue(path.is_file(), path)
                width, height = png_size(path)
                self.assertGreater(width, height)
                self.assertGreaterEqual(width, 1200)
                self.assertGreaterEqual(height, 400)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the contract and verify the missing-artifact failure**

Run: `python3 -m unittest tests.test_cpa_financial_workpaper_templates -v`

Expected: FAIL because the monthly XLSX and cover do not exist.

- [ ] **Step 3: Prepare the approved artifact-tool runtime**

Call `load_workspace_dependencies` and obtain the provided `node_modules` directory. Create `/private/tmp/finboard-cpa-workpapers`, then create a `node_modules` symlink inside it pointing to that exact loader-provided directory.

Copy the repository builder modules into the temporary working directory before each run:

```bash
cp frontend/scripts/cpa-workpapers/*.mjs /private/tmp/finboard-cpa-workpapers/
```

Do not install packages or search for alternate artifact-tool paths.

- [ ] **Step 4: Create the shared workbook shell**

Create `frontend/scripts/cpa-workpapers/shared.mjs` with these constants and public functions:

```js
export const COLORS = Object.freeze({
  ink: "#111827",
  blue: "#2563EB",
  blueText: "#0000FF",
  blueSoft: "#EFF6FF",
  sand: "#FAF7F0",
  white: "#FFFFFF",
  line: "#D1D5DB",
  gray: "#6B7280",
  amber: "#D97706",
  amberSoft: "#FEF3C7",
  red: "#DC2626",
  redSoft: "#FEE2E2",
  green: "#047857",
  greenSoft: "#D1FAE5",
});

export const SHEET_NAMES = [
  "Start Here",
  "Paste Import",
  "Manual Input",
  "Review",
  "Summary",
  "Lists",
];

export function createShell(workbook, config) {
  const sheets = Object.fromEntries(
    SHEET_NAMES.map((name) => [name, workbook.worksheets.add(name)]),
  );
  for (const sheet of Object.values(sheets)) sheet.showGridLines = false;

  const start = sheets["Start Here"];
  start.getRange("A1:H2").merge();
  start.getRange("A1").values = [[config.title]];
  start.getRange("A1:H2").format = {
    fill: COLORS.ink,
    font: { color: COLORS.white, bold: true, fontSize: 20 },
    verticalAlignment: "center",
  };
  start.getRange("A1:H25").format.font = { name: "Aptos", fontSize: 10, color: COLORS.ink };
  start.getRange("A1:H2").format.font = { name: "Aptos Display", fontSize: 20, bold: true, color: COLORS.white };
  start.getRange("A4:A11").values = config.startLabels.map((label) => [label]);
  start.getRange("B4:B11").values = config.startValues.map((value) => [value]);
  start.getRange("B4:B11").format = {
    fill: COLORS.blueSoft,
    font: { color: COLORS.blueText },
    borders: { preset: "outside", style: "thin", color: COLORS.line },
  };
  start.getRange("B8").dataValidation = {
    rule: { type: "list", values: ["Paste Import", "Manual Input"] },
  };
  start.getRange("A14:H14").merge();
  start.getRange("A14").values = [["Workflow"]];
  const instructionRange = start.getRangeByIndexes(14, 0, config.instructions.length, 8);
  instructionRange.values = config.instructions.map((text) => [text, null, null, null, null, null, null, null]);
  instructionRange.format.wrapText = true;
  start.getRange("A22:D25").values = [
    ["Color", "Meaning", null, null],
    ["Blue text", "Editable input", null, null],
    ["Black text", "Formula or calculated result", null, null],
    ["Amber or red", "Review item or failed control", null, null],
  ];
  start.getRange("A1:A25").format.columnWidth = 25;
  start.getRange("B1:B25").format.columnWidth = 22;
  start.getRange("C1:H25").format.columnWidth = 14;

  for (const name of ["Paste Import", "Manual Input", "Review"]) {
    sheets[name].freezePanes.freezeRows(5);
  }
  return {
    start,
    paste: sheets["Paste Import"],
    manual: sheets["Manual Input"],
    review: sheets.Review,
    summary: sheets.Summary,
    lists: sheets.Lists,
  };
}

export function sourceFormula(columnLetter, rowNumber) {
  return `=IF('Start Here'!$B$8="Paste Import",'Paste Import'!${columnLetter}${rowNumber},'Manual Input'!${columnLetter}${rowNumber})`;
}

export function styleTable(sheet, address, headerAddress, currencyColumns = []) {
  sheet.getRange(address).format.font = { name: "Aptos", fontSize: 10, color: COLORS.ink };
  sheet.getRange(headerAddress).format = {
    fill: COLORS.ink,
    font: { name: "Aptos", fontSize: 10, bold: true, color: COLORS.white },
    wrapText: true,
    borders: { preset: "inside", style: "thin", color: COLORS.line },
  };
  for (const column of currencyColumns) {
    sheet.getRange(`${column}6:${column}105`).format.numberFormat = '$#,##0;[Red]($#,##0);-';
  }
}

export function styleInputRange(range) {
  range.format = {
    fill: COLORS.blueSoft,
    font: { name: "Aptos", fontSize: 10, color: COLORS.blueText },
    borders: { preset: "inside", style: "thin", color: COLORS.line },
  };
}

export function addListValidation(range, listRange) {
  range.dataValidation = { rule: { type: "list", formula1: listRange } };
}

export async function verifyAndExport({ workbook, slug, outputRoot, SpreadsheetFile, fs }) {
  const artifactDir = `${outputRoot}/outputs/cpa-financial-workpapers`;
  const renderDir = `${artifactDir}/${slug}-renders`;
  await fs.mkdir(renderDir, { recursive: true });

  const keyRanges = await workbook.inspect({
    kind: "table,formula",
    maxChars: 10000,
    tableMaxRows: 20,
    tableMaxCols: 20,
  });
  await fs.writeFile(`${artifactDir}/${slug}-inspection.ndjson`, keyRanges.ndjson);

  const errors = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 300 },
    summary: `${slug} formula error scan`,
  });
  const errorRecords = errors.ndjson
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line))
    .filter((record) => record.kind === "match" && record.address);
  if (errorRecords.length > 0) {
    throw new Error(`formula errors found in ${slug}: ${errors.ndjson}`);
  }

  for (const sheetName of SHEET_NAMES) {
    const image = await workbook.render({ sheetName, autoCrop: "all", scale: 2, format: "png" });
    await fs.writeFile(
      `${renderDir}/${sheetName.toLowerCase().replaceAll(" ", "-")}.png`,
      new Uint8Array(await image.arrayBuffer()),
    );
  }

  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  const xlsxPath = `${artifactDir}/${slug}.xlsx`;
  await xlsx.save(xlsxPath);
  return { xlsxPath, renderDir, inspectionPath: `${artifactDir}/${slug}-inspection.ndjson` };
}
```

During implementation, use at most one targeted `workbook.help` call if an exact API in this code needs correction.

- [ ] **Step 5: Create the monthly workbook formulas and sample data**

Create `frontend/scripts/cpa-workpapers/monthly-financial-review.mjs` with `buildMonthlyFinancialReview(workbook)`. Use these exact layouts:

```js
const inputHeaders = [
  "Statement", "Account Number", "Account Name", "Account Type",
  "Current Period", "Prior Period", "Budget", "Review Category",
];

const reviewHeaders = [
  "Statement", "Account Number", "Account Name", "Account Type",
  "Current", "Prior", "Budget", "Change $", "Change %",
  "Budget Var $", "Budget Var %", "Review Category", "Flag", "Notes", "Exception Score",
];

const categories = [
  "Revenue", "Cost of Goods Sold", "Operating Expense", "Other Income",
  "Other Expense", "Cash", "Accounts Receivable", "Current Assets",
  "Accounts Payable", "Current Liabilities", "Other",
];
```

Use rows 6 through 105 for input and review. Populate both input sheets with the same fictional sample dataset so switching modes preserves the demonstration. Include Revenue, Cost of Goods Sold, Operating Expense, Cash, Accounts Receivable, Current Assets, Accounts Payable, and Current Liabilities. Include one new account with prior balance zero and one material budget variance.

Write the source formulas in Review columns A:G and L using `sourceFormula`. Use these row-6 formulas and fill down through row 105:

```excel
H6 = IF(C6="","",E6-F6)
I6 = IF(C6="","",IF(F6=0,IF(E6=0,"","New"),H6/ABS(F6)))
J6 = IF(C6="","",E6-G6)
K6 = IF(C6="","",IF(G6=0,IF(E6=0,"","New"),J6/ABS(G6)))
M6 = IF(C6="","",IF(OR(D6="",L6=""),"Incomplete",IF(OR(AND(ABS(H6)>='Start Here'!$B$10,IFERROR(ABS(I6)>='Start Here'!$B$11,TRUE)),AND(ABS(J6)>='Start Here'!$B$10,IFERROR(ABS(K6)>='Start Here'!$B$11,TRUE))),"Review","OK")))
O6 = IF(M6="Review",ABS(H6)+ABS(J6)+ROW()/1000000,0)
```

Use `Start Here` metadata cells as follows:

```text
B4 Client Name
B5 Period End
B6 Prepared By
B7 Review Date
B8 Input Mode
B9 Currency
B10 Materiality Amount, sample 5000
B11 Materiality Percentage, sample 0.10
```

Use the Lists sheet for Statement, Account Type, Review Category, and Input Mode validation values.

Build Summary formulas from bounded Review ranges. Use `SUMIFS` for categories and calculate:

```excel
Revenue = SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Revenue")
Gross Profit = Revenue-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Cost of Goods Sold")
Operating Income = Gross Profit-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Operating Expense")
Net Income = Operating Income+SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Other Income")-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Other Expense")
Working Capital = SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Cash")+SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Accounts Receivable")+SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Current Assets")-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Accounts Payable")-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Current Liabilities")
Exception Count = COUNTIF('Review'!$M$6:$M$105,"Review")+COUNTIF('Review'!$M$6:$M$105,"Incomplete")
Status = IF(Exception Count=0,"Complete","Review")
```

Place five exception rows under the KPI cards using `LARGE('Review'!$O$6:$O$105,n)` with `INDEX` and `MATCH`. Guard missing ranks with `IFERROR(...,"")`.

Apply validation to both input sheets, conditional formatting to Review flags, currency formats to monetary ranges, percentage formats to rate ranges, and a print area that contains the Summary title, metadata, KPIs, and five exceptions.

- [ ] **Step 6: Create the executable entry point**

Create `frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs`:

```js
import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";
import { verifyAndExport } from "./shared.mjs";
import { buildMonthlyFinancialReview } from "./monthly-financial-review.mjs";

const outputRoot = "/private/tmp/finboard-cpa-workpapers";
const requested = process.argv.includes("--only")
  ? process.argv[process.argv.indexOf("--only") + 1]
  : "all";

const builders = [
  ["monthly-financial-statement-review-template", buildMonthlyFinancialReview],
];

for (const [slug, build] of builders) {
  if (requested !== "all" && requested !== slug) continue;
  const workbook = Workbook.create();
  await build(workbook);
  const result = await verifyAndExport({ workbook, slug, outputRoot, SpreadsheetFile, fs });
  console.log(JSON.stringify({ slug, ...result }));
}
```

- [ ] **Step 7: Build and inspect the monthly workbook**

Copy the builder modules to the prepared temporary runtime, then run:

```bash
cd /private/tmp/finboard-cpa-workpapers
node build-cpa-workpapers.mjs --only monthly-financial-statement-review-template
```

Expected: one XLSX, six sheet renders, and one inspection file are created under `/private/tmp/finboard-cpa-workpapers/outputs/cpa-financial-workpapers/` with no formula-error exception.

Inspect these key ranges with artifact-tool and preserve compact evidence in the task report:

```text
Start Here!A1:H25
Review!A1:O18
Summary!A1:H24
```

Verify both input modes by changing `Start Here!B8` in memory to each mode and checking that Summary revenue and exception count remain equal for the sample data.

- [ ] **Step 8: Visually inspect all six monthly sheets**

Use the local image viewer on every file in the monthly render directory. Fix clipped text, broken formats, unreadable cells, or content outside the visible range by patching the builder and rerunning it.

The Summary render must be landscape, at least 1200 pixels wide, and legible at template-card size.

- [ ] **Step 9: Publish the verified monthly artifacts**

Copy the final scratch files:

```bash
cp /private/tmp/finboard-cpa-workpapers/outputs/cpa-financial-workpapers/monthly-financial-statement-review-template.xlsx frontend/public/template-files/monthly-financial-statement-review-template.xlsx
cp /private/tmp/finboard-cpa-workpapers/outputs/cpa-financial-workpapers/monthly-financial-statement-review-template-renders/summary.png frontend/public/templates/covers/monthly-financial-statement-review-template.png
```

Run SHA-256 on the scratch and public XLSX files and require identical hashes.

- [ ] **Step 10: Run the monthly contract and commit**

Run: `python3 -m unittest tests.test_cpa_financial_workpaper_templates -v`

Expected: 2 tests PASS.

```bash
git add frontend/scripts/cpa-workpapers/shared.mjs frontend/scripts/cpa-workpapers/monthly-financial-review.mjs frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs tests/test_cpa_financial_workpaper_templates.py frontend/public/template-files/monthly-financial-statement-review-template.xlsx frontend/public/templates/covers/monthly-financial-statement-review-template.png
git commit -m "feat: add monthly financial review workbook"
```

### Task 2: Bank Reconciliation Workpaper

**Files:**

- Create: `frontend/scripts/cpa-workpapers/bank-reconciliation.mjs`
- Modify: `frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs`
- Modify: `tests/test_cpa_financial_workpaper_templates.py`
- Create: `frontend/public/template-files/bank-reconciliation-workpaper-template.xlsx`
- Create: `frontend/public/templates/covers/bank-reconciliation-workpaper-template.png`

**Interfaces:**

- Consumes: all shared builder interfaces from Task 1
- Produces: `buildBankReconciliation(workbook) -> Workbook`

- [ ] **Step 1: Extend the artifact contract and verify RED**

Add this entry to `WORKBOOKS`:

```python
"bank-reconciliation-workpaper-template": {
    "min_formulas": 400,
    "min_validations": 4,
},
```

Run: `python3 -m unittest tests.test_cpa_financial_workpaper_templates -v`

Expected: FAIL because the bank XLSX and cover do not exist.

- [ ] **Step 2: Build the bank workbook**

Create `frontend/scripts/cpa-workpapers/bank-reconciliation.mjs` with `buildBankReconciliation(workbook)`. Use these exact columns for both input sheets:

```js
const inputHeaders = [
  "Date", "Reference", "Description", "Amount", "Source",
  "Reconciliation Type", "Cleared Status", "Notes",
];

const reviewHeaders = [
  "Date", "Reference", "Description", "Amount", "Source",
  "Reconciliation Type", "Cleared Status", "Notes",
  "Duplicate", "Input Check",
];
```

Use rows 6 through 105. Both input sheets must also contain:

```text
B2 Statement Balance
B3 Book Balance
B4 Statement Date
```

Use the exact lists from the specification. Add `Open` and `Cleared` as Cleared Status choices.

Use these Review formulas in row 6 and fill down:

```excel
A6:H6 = selected source row through sourceFormula
I6 = IF(B6="","",IF(COUNTIF($B$6:$B$105,B6)>1,"Duplicate",""))
J6 = IF(COUNTA(A6:H6)=0,"",IF(OR(A6="",D6="",E6="",F6=""),"Incomplete",IF(F6="Unresolved","Review","OK")))
```

Use this sample so adjusted balances tie while one unresolved item remains:

```text
Statement balance 51200
Book balance 50000
Outstanding Check 2500
Deposit in Transit 3000
Bank Adjustment -50
Book Adjustment 1650
Unresolved 75
```

Use signed values for Bank Adjustment and Book Adjustment. Outstanding checks and deposits in transit use positive input amounts.

Build Summary formulas:

```excel
Statement Balance = selected B2
Book Balance = selected B3
Outstanding Checks = SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Outstanding Check")
Deposits in Transit = SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Deposit in Transit")
Bank Adjustments = SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Bank Adjustment")
Book Adjustments = SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Book Adjustment")
Adjusted Bank = Statement Balance-Outstanding Checks+Deposits in Transit+Bank Adjustments
Adjusted Books = Book Balance+Book Adjustments
Difference = Adjusted Bank-Adjusted Books
Unresolved Count = COUNTIF('Review'!$F$6:$F$105,"Unresolved")
Unresolved Amount = SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Unresolved")
Status = IF(AND(ABS(Difference)<='Start Here'!$B$11,Unresolved Count=0),"Complete","Review")
```

Use `Start Here!B11` as the visible reconciliation tolerance with sample value `0.01`. Add a clear sign-convention note next to the input table.

Apply validation, currency and date formats, duplicate and status conditional formatting, and a printable Summary.

- [ ] **Step 3: Register and build the bank workbook**

Import `buildBankReconciliation` in the entry point and add:

```js
["bank-reconciliation-workpaper-template", buildBankReconciliation],
```

Copy the builders to the temporary runtime and run:

```bash
node build-cpa-workpapers.mjs --only bank-reconciliation-workpaper-template
```

Expected: one XLSX, six renders, and clean inspection evidence.

- [ ] **Step 4: Verify calculations and both modes**

Inspect:

```text
Paste Import!A1:H16
Review!A1:J18
Summary!A1:H24
```

Require adjusted bank and adjusted book balances to equal `51650`, difference to equal zero, unresolved count to equal one, and status to equal `Review`. Switch input mode and confirm the same results from Manual Input.

- [ ] **Step 5: Visually inspect and publish the bank artifacts**

View all six renders. Correct all severe visual issues. Copy the verified XLSX and Summary render to the specified public paths and require matching scratch/public XLSX hashes.

- [ ] **Step 6: Run tests and commit**

Run: `python3 -m unittest tests.test_cpa_financial_workpaper_templates -v`

Expected: both contract methods pass for two workbooks.

```bash
git add frontend/scripts/cpa-workpapers/bank-reconciliation.mjs frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs tests/test_cpa_financial_workpaper_templates.py frontend/public/template-files/bank-reconciliation-workpaper-template.xlsx frontend/public/templates/covers/bank-reconciliation-workpaper-template.png
git commit -m "feat: add bank reconciliation workpaper"
```

### Task 3: Trial Balance Review Workpaper

**Files:**

- Create: `frontend/scripts/cpa-workpapers/trial-balance-review.mjs`
- Modify: `frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs`
- Modify: `tests/test_cpa_financial_workpaper_templates.py`
- Create: `frontend/public/template-files/trial-balance-review-workpaper-template.xlsx`
- Create: `frontend/public/templates/covers/trial-balance-review-workpaper-template.png`

**Interfaces:**

- Consumes: all shared builder interfaces from Task 1
- Produces: `buildTrialBalanceReview(workbook) -> Workbook`

- [ ] **Step 1: Extend the artifact contract and verify RED**

Add:

```python
"trial-balance-review-workpaper-template": {
    "min_formulas": 900,
    "min_validations": 3,
},
```

Run the contract and expect missing trial-balance XLSX and cover failures.

- [ ] **Step 2: Build the trial balance workbook**

Create `frontend/scripts/cpa-workpapers/trial-balance-review.mjs` with the approved inputs:

```js
const inputHeaders = [
  "Account Number", "Account Name", "Account Type", "Current Debit",
  "Current Credit", "Prior Debit", "Prior Credit", "Review Category",
  "Proposed Adjustment", "Notes",
];

const reviewHeaders = [
  "Account Number", "Account Name", "Account Type", "Current Debit",
  "Current Credit", "Prior Debit", "Prior Credit", "Current Net",
  "Prior Net", "Change $", "Change %", "Review Category",
  "Proposed Adjustment", "Adjusted Balance", "Mapping", "Sign",
  "Materiality", "Status", "Notes",
];
```

Use rows 6 through 105. Account Type choices are `Asset`, `Liability`, `Equity`, `Revenue`, `Expense`, and `Other`. Populate both input sheets with a balanced fictional trial balance. Include one unmapped account, one unusual-sign account, one material movement, one new account, and proposed adjustments that net to zero.

Use source formulas for A:G, L:M, and S. Use these formulas in row 6 and fill down:

```excel
H6 = IF(B6="","",D6-E6)
I6 = IF(B6="","",F6-G6)
J6 = IF(B6="","",H6-I6)
K6 = IF(B6="","",IF(I6=0,IF(H6=0,"","New"),J6/ABS(I6)))
N6 = IF(B6="","",H6+M6)
O6 = IF(B6="","",IF(OR(C6="",L6=""),"Unmapped","OK"))
P6 = IF(B6="","",IF(OR(AND(OR(C6="Asset",C6="Expense"),H6<0),AND(OR(C6="Liability",C6="Equity",C6="Revenue"),H6>0)),"Unusual","OK"))
Q6 = IF(B6="","",IF(AND(ABS(J6)>='Start Here'!$B$10,IFERROR(ABS(K6)>='Start Here'!$B$11,TRUE)),"Review","OK"))
R6 = IF(B6="","",IF(OR(O6<>"OK",P6<>"OK",Q6<>"OK"),"Review","Complete"))
```

Build Summary formulas:

```excel
Current Debits = SUM('Review'!$D$6:$D$105)
Current Credits = SUM('Review'!$E$6:$E$105)
Current Difference = Current Debits-Current Credits
Proposed Adjustments = SUM('Review'!$M$6:$M$105)
Adjusted Difference = Current Difference+Proposed Adjustments
Material Movement Count = COUNTIF('Review'!$Q$6:$Q$105,"Review")
Unusual Sign Count = COUNTIF('Review'!$P$6:$P$105,"Unusual")
Unmapped Count = COUNTIF('Review'!$O$6:$O$105,"Unmapped")
Open Review Count = COUNTIF('Review'!$R$6:$R$105,"Review")
Status = IF(AND(ABS(Adjusted Difference)<0.01,Open Review Count=0),"Complete","Review")
```

Use Start Here cells B10 and B11 for materiality amount and percentage. Document that proposed adjustments use positive debit and negative credit signs.

- [ ] **Step 3: Register, build, and inspect the trial balance workbook**

Register:

```js
["trial-balance-review-workpaper-template", buildTrialBalanceReview],
```

Build only the trial balance workbook. Inspect input, Review A1:S18, and Summary A1:H24. Require current difference and proposed adjustment net to equal zero. Require at least one unmapped, unusual-sign, material movement, and open review item.

Switch input mode and confirm the sample outputs remain equal.

- [ ] **Step 4: Visually inspect and publish the trial balance artifacts**

View all six renders and correct any severe defects. Publish the verified XLSX and Summary cover to their exact public paths. Require matching SHA-256 hashes for scratch and public XLSX files.

- [ ] **Step 5: Run the complete artifact contract and commit**

Run: `python3 -m unittest tests.test_cpa_financial_workpaper_templates -v`

Expected: both contract methods pass for all three workbooks.

```bash
git add frontend/scripts/cpa-workpapers/trial-balance-review.mjs frontend/scripts/cpa-workpapers/build-cpa-workpapers.mjs tests/test_cpa_financial_workpaper_templates.py frontend/public/template-files/trial-balance-review-workpaper-template.xlsx frontend/public/templates/covers/trial-balance-review-workpaper-template.png
git commit -m "feat: add trial balance review workpaper"
```

### Task 4: Publish the Three Template Pages

**Files:**

- Create: `frontend/content/templates/monthly-financial-statement-review-template.json`
- Create: `frontend/content/templates/bank-reconciliation-workpaper-template.json`
- Create: `frontend/content/templates/trial-balance-review-workpaper-template.json`
- Modify: `tests/test_cpa_financial_workpaper_templates.py`

**Interfaces:**

- Consumes: the six published XLSX and PNG artifact paths from Tasks 1 through 3
- Produces: three template records consumed by `frontend/src/lib/templates.js`

- [ ] **Step 1: Add failing page-content assertions**

Add `json` import, a `CONTENT` directory constant, and this test:

```python
PAGE_EXPECTATIONS = {
    "monthly-financial-statement-review-template": {
        "title": "Monthly Financial Statement Review Template",
        "category": "Financial Planning",
        "keywords": ("variance", "working capital", "Paste Import", "Manual Input"),
    },
    "bank-reconciliation-workpaper-template": {
        "title": "Bank Reconciliation Workpaper Template",
        "category": "Accounting Operations",
        "keywords": ("outstanding checks", "deposits in transit", "Paste Import", "Manual Input"),
    },
    "trial-balance-review-workpaper-template": {
        "title": "Trial Balance Review Workpaper Template",
        "category": "Accounting Operations",
        "keywords": ("unusual", "proposed adjustments", "Paste Import", "Manual Input"),
    },
}

def test_template_content_points_to_published_artifacts(self):
    for slug, expected in PAGE_EXPECTATIONS.items():
        with self.subTest(slug=slug):
            path = CONTENT / f"{slug}.json"
            self.assertTrue(path.is_file(), path)
            data = json.loads(path.read_text())
            self.assertEqual(data["slug"], slug)
            self.assertEqual(data["title"], expected["title"])
            self.assertEqual(data["category"], expected["category"])
            self.assertEqual(data["link"], f"/template-files/{slug}.xlsx")
            self.assertEqual(data["image"], f"/templates/covers/{slug}.png")
            self.assertEqual(len(data["leadQuestions"]), 2)
            combined = f'{data["shortDescription"]} {data["about"]}'
            for keyword in expected["keywords"]:
                self.assertIn(keyword.lower(), combined.lower())
```

Run the contract and expect three missing JSON failures.

- [ ] **Step 2: Create the monthly page entry**

Create `frontend/content/templates/monthly-financial-statement-review-template.json`:

```json
{
  "slug": "monthly-financial-statement-review-template",
  "title": "Monthly Financial Statement Review Template",
  "category": "Financial Planning",
  "shortDescription": "Review monthly P&L and balance sheet movements with prior-period and budget variances, materiality flags, working capital checks, and accountant notes.",
  "about": "<p>Built for CPAs, accountants, and bookkeepers who review recurring client financials. Choose Paste Import for QuickBooks-friendly exported rows or Manual Input for summarized balances. The workbook calculates prior-period and budget variances, flags material movements, summarizes working capital, and keeps review notes beside each account.</p><p>The file includes sample data, visible materiality thresholds, formula-driven controls, and a printable Summary. It does not replace professional judgment or automate account classification. Review the mapped categories and unresolved items before marking the period complete.</p>",
  "excerpt": "Free monthly financial statement review workbook with dual input modes, materiality flags, variance analysis, working capital checks, and a printable accountant summary.",
  "link": "/template-files/monthly-financial-statement-review-template.xlsx",
  "image": "/templates/covers/monthly-financial-statement-review-template.png",
  "imageAlt": "Monthly financial statement review workbook summary",
  "order": 84,
  "leadQuestions": [
    {"id": "clients", "label": "How many client financials do you review monthly?", "type": "select", "options": ["1 to 10", "11 to 30", "31 to 75", "75+"]},
    {"id": "software", "label": "Which accounting system do you use?", "type": "select", "options": ["QuickBooks Online", "QuickBooks Desktop", "Xero", "Other"]}
  ],
  "structuredData": null
}
```

- [ ] **Step 3: Create the bank page entry**

Create `frontend/content/templates/bank-reconciliation-workpaper-template.json`:

```json
{
  "slug": "bank-reconciliation-workpaper-template",
  "title": "Bank Reconciliation Workpaper Template",
  "category": "Accounting Operations",
  "shortDescription": "Reconcile bank and book balances with outstanding checks, deposits in transit, signed adjustments, duplicate flags, and unresolved-item tracking.",
  "about": "<p>Use this workpaper for monthly or period-end bank reconciliation review. Choose Paste Import for register or reconciliation-detail rows, or Manual Input for a compact balance and reconciling-item schedule. The workbook calculates adjusted bank and book balances, the remaining difference, unresolved amounts, and duplicate references.</p><p>This lightweight file does not perform fuzzy transaction matching. The preparer classifies outstanding checks, deposits in transit, bank adjustments, book adjustments, and unresolved items. The Summary can be printed or retained with the close file.</p>",
  "excerpt": "Free bank reconciliation workpaper with paste and manual entry, adjusted balances, reconciliation difference, duplicate checks, and unresolved-item tracking.",
  "link": "/template-files/bank-reconciliation-workpaper-template.xlsx",
  "image": "/templates/covers/bank-reconciliation-workpaper-template.png",
  "imageAlt": "Bank reconciliation workpaper summary",
  "order": 85,
  "leadQuestions": [
    {"id": "accounts", "label": "How many bank accounts do you reconcile monthly?", "type": "select", "options": ["1 to 5", "6 to 15", "16 to 40", "40+"]},
    {"id": "software", "label": "Which accounting system do you use?", "type": "select", "options": ["QuickBooks Online", "QuickBooks Desktop", "Xero", "Other"]}
  ],
  "structuredData": null
}
```

- [ ] **Step 4: Create the trial balance page entry**

Create `frontend/content/templates/trial-balance-review-workpaper-template.json`:

```json
{
  "slug": "trial-balance-review-workpaper-template",
  "title": "Trial Balance Review Workpaper Template",
  "category": "Accounting Operations",
  "shortDescription": "Review current and prior trial balances with debit-credit controls, unusual-sign flags, material movements, mappings, and proposed adjustments.",
  "about": "<p>Designed for accountants reviewing a client trial balance before financial statements or close completion. Use Paste Import for QuickBooks-friendly trial balance rows or Manual Input for account-level entry. The workbook calculates net balances and period changes, checks debit-credit equality, flags unusual signs and unmapped accounts, and tracks proposed adjustments.</p><p>Visible thresholds and account-type rules keep the review auditable. The workbook includes sample data and a printable Summary, but the preparer remains responsible for mapping accounts, validating signs, and supporting adjustments.</p>",
  "excerpt": "Free trial balance review workpaper with dual input modes, debit-credit controls, unusual-sign flags, materiality review, and proposed adjustments.",
  "link": "/template-files/trial-balance-review-workpaper-template.xlsx",
  "image": "/templates/covers/trial-balance-review-workpaper-template.png",
  "imageAlt": "Trial balance review workpaper summary",
  "order": 86,
  "leadQuestions": [
    {"id": "clients", "label": "How many client trial balances do you review monthly?", "type": "select", "options": ["1 to 10", "11 to 30", "31 to 75", "75+"]},
    {"id": "software", "label": "Which accounting system do you use?", "type": "select", "options": ["QuickBooks Online", "QuickBooks Desktop", "Xero", "Other"]}
  ],
  "structuredData": null
}
```

- [ ] **Step 5: Run content and frontend verification**

Run:

```bash
python3 -m unittest tests.test_cpa_financial_workpaper_templates -v
cd frontend && yarn test:unit && yarn build
```

Expected: artifact and content tests pass, frontend unit tests pass, and all three new static template routes appear in a successful build.

- [ ] **Step 6: Commit the page content**

```bash
git add frontend/content/templates/monthly-financial-statement-review-template.json frontend/content/templates/bank-reconciliation-workpaper-template.json frontend/content/templates/trial-balance-review-workpaper-template.json tests/test_cpa_financial_workpaper_templates.py
git commit -m "content: publish CPA workpaper template pages"
```

### Task 5: Final Workbook Audit, Port 3010 Verification, and Publication

**Files:**

- Verify: all files created in Tasks 1 through 4
- Verify: `/private/tmp/finboard-cpa-workpapers/outputs/cpa-financial-workpapers/`

**Interfaces:**

- Consumes: three verified workbook artifacts, covers, and content entries
- Produces: published `origin/main` state with a live local port 3010 server

- [ ] **Step 1: Run the finance audit pass**

For each workbook, inspect the key Review and Summary ranges and trace at least one high-impact Summary formula back to its selected input source.

Verify:

```text
Monthly: revenue, net income, working capital, exception count
Bank: adjusted bank, adjusted books, difference, unresolved count
Trial balance: current difference, proposed adjustment net, adjusted difference, open review count
```

Require every check to match the sample-data definitions in this plan. Confirm that input cells are blue, formulas are black, and warnings and failed controls use the approved fills.

- [ ] **Step 2: Complete the all-sheet visual pass**

Open all eighteen sheet renders with the local image viewer. Confirm:

```text
No clipped titles or column headers
No unreadable currency, percentage, date, or status values
No content outside the visible working range
No blank or broken Summary sections
No default empty sheets
No decorative symbols or ornamental special characters
```

After any visual correction, rebuild the affected workbook, rerun its formula scan and key-range inspection, re-render all six sheets, copy the final XLSX and cover, and recheck hashes.

- [ ] **Step 3: Run final automated verification**

Run:

```bash
python3 -m unittest tests.test_cpa_financial_workpaper_templates -v
cd frontend && yarn test:unit && yarn build
git diff --check
```

Expected: all template contract tests pass, frontend unit tests pass, the production build succeeds, and no whitespace errors are reported.

- [ ] **Step 4: Start or restart the frontend on port 3010**

Inspect the current listener with `lsof -nP -iTCP:3010 -sTCP:LISTEN`. Stop only a confirmed stale FinBoard Next.js process. Start:

```bash
cd frontend && yarn dev --port 3010
```

Leave the verified server running.

- [ ] **Step 5: Verify pages and downloads on port 3010**

Require HTTP 200 for:

```text
/templates/monthly-financial-statement-review-template
/templates/bank-reconciliation-workpaper-template
/templates/trial-balance-review-workpaper-template
/template-files/monthly-financial-statement-review-template.xlsx
/template-files/bank-reconciliation-workpaper-template.xlsx
/template-files/trial-balance-review-workpaper-template.xlsx
/templates/covers/monthly-financial-statement-review-template.png
/templates/covers/bank-reconciliation-workpaper-template.png
/templates/covers/trial-balance-review-workpaper-template.png
```

Parse page HTML and require the exact title, short description, download path, cover path, and both lead-question labels for each page.

- [ ] **Step 6: Confirm Git scope and publish**

Run `git status --short`, inspect every commit since the execution base, and confirm the unrelated untracked files remain untouched.

Push directly:

```bash
git push origin main
```

Require `git rev-parse HEAD` and `git rev-parse origin/main` to return the same revision.

- [ ] **Step 7: Report final artifacts**

Return one standalone Markdown link per final published workbook:

```text
[Monthly Financial Statement Review Template.xlsx](/Users/ujjwal/finboard/app/frontend/public/template-files/monthly-financial-statement-review-template.xlsx)
[Bank Reconciliation Workpaper Template.xlsx](/Users/ujjwal/finboard/app/frontend/public/template-files/bank-reconciliation-workpaper-template.xlsx)
[Trial Balance Review Workpaper Template.xlsx](/Users/ujjwal/finboard/app/frontend/public/template-files/trial-balance-review-workpaper-template.xlsx)
```
