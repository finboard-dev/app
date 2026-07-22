# CPA Financial Workpaper Templates Design

Date: 2026-07-22

Status: Approved direction, pending specification review

## Objective

Create and publish three lightweight financial workbooks that CPAs, accountants, and bookkeepers can use for recurring client review work:

1. Monthly Financial Statement Review
2. Bank Reconciliation Workpaper
3. Trial Balance Review Workpaper

Each template will support QuickBooks-friendly paste-in data and manual entry. Each will be published as a downloadable XLSX file with its own FinBoard template page and preview cover.

## Audience and Positioning

The primary audience is accounting professionals who need practical review workpapers without the complexity of audit software or a full practice management system.

The templates should be easy to understand in one sitting, usable without macros, and suitable for monthly or period-end client work. They are lightweight operational workpapers, not audit opinions, tax advice, or substitutes for professional judgment.

## Shared Workbook Design

All three workbooks will follow the same six-sheet structure and visual language.

### Start Here

This sheet explains the workbook purpose, recommended workflow, input mode, color legend, and completion steps.

An `Input Mode` dropdown will offer `Paste Import` and `Manual Input`. Review formulas will use the selected source. Instructions will state that only one source should be used for a review period.

### Paste Import

This sheet accepts data copied from QuickBooks Online or a CSV export. Column names will use plain accounting language and will be arranged so a user can paste rows without restructuring the workbook.

### Manual Input

This sheet provides the same essential fields in a compact form for users who do not want to paste an export.

### Review

This sheet contains formula-driven calculations, control totals, exception flags, status fields, and review notes. Calculations must reference the selected input sheet rather than duplicating values.

### Summary

This sheet presents the key results in a printable format. It includes the client, reporting period, review status, primary findings, unresolved items, and completion date.

### Lists

This visible support sheet contains dropdown values, mapping options, status choices, and any threshold inputs. Business rules must remain visible and auditable.

## Shared Visual System

The workbooks will use a restrained FinBoard style with warm white backgrounds, black text, light gray structure, and limited FinBoard blue accents.

1. User inputs use blue text and light input fills.
2. Formulas use black text.
3. Warnings use restrained amber.
4. Errors or unreconciled controls use restrained red.
5. Completed controls use restrained green.
6. Titles and major section labels use clear hierarchy without decorative symbols.

There will be no macros, hidden calculations, external connections, password protection, or ornamental special characters.

## Workbook 1: Monthly Financial Statement Review

### Purpose

Help an accountant review a client's monthly P&L and balance sheet, identify material movements, and document follow-up items.

### Paste Import Fields

1. Statement
2. Account Number
3. Account Name
4. Account Type
5. Current Period
6. Prior Period
7. Budget
8. Review Category

The Statement field will accept `Profit and Loss` or `Balance Sheet`.

### Manual Input

The manual sheet will expose the same fields in a smaller input table. Users may enter summarized account or category balances.

### Review Calculations

1. Dollar change from prior period
2. Percentage change from prior period
3. Dollar variance from budget
4. Percentage variance from budget
5. Materiality flag based on visible amount and percentage thresholds
6. Liquidity and working capital indicators when the required balance sheet categories are present
7. Missing category and incomplete input flags
8. Review status and accountant notes

Zero prior-period and zero-budget values must not create division errors. The workbook will return a clear blank or `New` status where a percentage comparison is not meaningful.

### Summary

The printable summary will show:

1. Revenue, gross profit, operating income, and net income movements
2. Cash, receivables, payables, and working capital indicators
3. Count of material exceptions
4. Top review items by absolute variance
5. Open notes and completion status

## Workbook 2: Bank Reconciliation Workpaper

### Purpose

Help an accountant reconcile a bank statement balance to the general ledger and document outstanding or adjusting items.

### Paste Import Fields

1. Date
2. Reference
3. Description
4. Amount
5. Source
6. Reconciliation Type
7. Cleared Status
8. Notes

The Source field will accept `Bank` or `Books`. Reconciliation Type will include `Cleared`, `Outstanding Check`, `Deposit in Transit`, `Bank Adjustment`, `Book Adjustment`, and `Unresolved`.

This lightweight workbook will not attempt automated fuzzy transaction matching. Users will classify reconciling items from a pasted register or reconciliation detail report.

### Manual Input

The manual sheet will include statement balance, book balance, statement date, and a compact reconciling-item table using the same reconciliation types.

### Review Calculations

1. Adjusted bank balance
2. Adjusted book balance
3. Reconciliation difference
4. Outstanding checks total
5. Deposits in transit total
6. Bank adjustments total
7. Book adjustments total
8. Unresolved item count and amount
9. Duplicate reference flag
10. Missing date, amount, type, and source flags

The reconciliation is complete only when the difference is zero and no unresolved items remain.

### Summary

The printable summary will show the original balances, reconciling categories, adjusted balances, final difference, unresolved items, review status, and notes.

## Workbook 3: Trial Balance Review Workpaper

### Purpose

Help an accountant review current and prior trial balances, identify unusual movements, track proposed adjustments, and document account-level review status.

### Paste Import Fields

1. Account Number
2. Account Name
3. Account Type
4. Current Debit
5. Current Credit
6. Prior Debit
7. Prior Credit
8. Review Category
9. Proposed Adjustment
10. Notes

### Manual Input

The manual sheet will use the same fields and support summarized or account-level balances.

### Review Calculations

1. Current net balance
2. Prior net balance
3. Dollar change
4. Percentage change
5. Adjusted balance
6. Debit and credit control totals
7. Out-of-balance difference
8. Unmapped account flag
9. Unusual sign flag based on visible account-type rules
10. Material movement flag using visible amount and percentage thresholds
11. Review status and notes

Zero prior balances must not produce formula errors. New balances will receive a clear `New` status.

### Summary

The printable summary will show current debits and credits, proposed adjustments, adjusted balance, out-of-balance control, material movement count, unusual sign count, unmapped account count, and open review notes.

## Sample Data

Every workbook will ship with a small fictional client dataset that demonstrates the calculations and produces at least one normal item, one warning, and one unresolved item.

Sample data will be clearly labeled. The Start Here sheet will explain how to clear sample rows and begin a new client review.

## Controls and Error Handling

Each workbook will include lightweight safeguards appropriate to operational workpapers:

1. Required-field checks
2. Duplicate checks where identifiers are expected
3. Reconciliation or control totals that must equal zero
4. Dropdown validation for controlled classifications
5. Incomplete, Review, and Complete statuses
6. Formula handling for zero denominators
7. Visible unresolved-item notes
8. Clear separation of inputs and calculated cells

Formulas will remain unlocked and visible. Instructions and formatting will discourage accidental edits without password protection.

## Publishing Design

Each workbook will receive a dedicated downloadable file, content entry, preview cover, template page, and lead form.

The spreadsheet artifact workflow will first export each final workbook to a conversation-specific `outputs` directory. The verified file will then be copied unchanged to its public download path. A hash comparison will confirm that the delivered artifact and published download are identical.

### Monthly Financial Statement Review

Slug: `monthly-financial-statement-review-template`

Download: `/template-files/monthly-financial-statement-review-template.xlsx`

Cover: `/templates/covers/monthly-financial-statement-review-template.png`

Category: `Financial Planning`

Lead questions:

1. How many client financials do you review monthly?
2. Which accounting system do you use?

### Bank Reconciliation Workpaper

Slug: `bank-reconciliation-workpaper-template`

Download: `/template-files/bank-reconciliation-workpaper-template.xlsx`

Cover: `/templates/covers/bank-reconciliation-workpaper-template.png`

Category: `Accounting Operations`

Lead questions:

1. How many bank accounts do you reconcile monthly?
2. Which accounting system do you use?

### Trial Balance Review Workpaper

Slug: `trial-balance-review-workpaper-template`

Download: `/template-files/trial-balance-review-workpaper-template.xlsx`

Cover: `/templates/covers/trial-balance-review-workpaper-template.png`

Category: `Accounting Operations`

Lead questions:

1. How many client trial balances do you review monthly?
2. Which accounting system do you use?

The accounting-system choices will include QuickBooks Online, QuickBooks Desktop, Xero, and Other.

The quantity choices will use practical bands appropriate to each question.

## Template Page Content

Each page will explain:

1. Who the workbook is for
2. What it calculates
3. How to choose paste import or manual input
4. What the controls mean
5. What the workbook does not automate
6. How to download and begin

The page copy will avoid unsupported claims and will describe the workbook as a practical review aid.

## Preview Covers

Each preview cover will be created from the verified workbook Summary sheet rather than an invented interface. The cover will remain legible in the template grid, contain no decorative symbols, and accurately represent the downloadable workbook.

## Verification

Workbook verification will follow the spreadsheet artifact workflow.

1. Inspect key input, review, and summary ranges with values and formulas.
2. Scan every workbook for formula errors including `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, and `#N/A`.
3. Confirm sample control totals and reconcile key results manually.
4. Render and visually inspect every sheet.
5. Correct clipped text, unreadable values, broken conditional formatting, blank charts, and awkward page layouts.
6. Export exactly one final XLSX for each workbook.
7. Confirm every template page and download returns HTTP 200 on port 3010.
8. Run the frontend unit tests and production build.

## Acceptance Criteria

The work is complete when:

1. All three XLSX files open cleanly and contain the six approved sheets.
2. Paste Import and Manual Input modes both drive the Review and Summary sheets.
3. Sample formulas calculate correctly and control totals reconcile as designed.
4. No formula errors remain in inspected ranges.
5. All eighteen workbook sheets pass visual review.
6. All three preview covers accurately show their workbook summaries.
7. All three template content entries, pages, lead forms, covers, and downloads are present.
8. The production build passes.
9. Port 3010 checks pass for all three pages and downloads.
10. The verified implementation is committed and pushed directly to `origin/main`.
