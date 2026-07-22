import { COLORS, addListValidation, createShell, sourceFormula, styleInputTable, styleTable } from "./shared.mjs";

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

const accountTypes = ["Asset", "Liability", "Equity", "Revenue", "Expense", "Other"];
const reviewCategories = ["Cash", "Receivables", "Inventory", "Fixed Assets", "Payables", "Debt", "Equity", "Revenue", "Operating Expenses", "Other"];
const sampleData = [
  ["1000", "Operating Cash", "Asset", 100000, 0, 80000, 0, "Cash", 0, "Material cash movement"],
  ["1100", "Accounts Receivable", "Asset", 50000, 0, 50000, 0, "Receivables", 2000, "Proposed debit adjustment"],
  ["1200", "Inventory", "Asset", 30000, 0, 20000, 0, "Inventory", 0, "Growth requires review"],
  ["1300", "Prepaid Expenses", "Asset", 5000, 0, 5000, 0, "Other", 0, ""],
  ["1500", "Property and Equipment", "Asset", 80000, 0, 75000, 0, "Fixed Assets", 0, ""],
  ["1590", "Accumulated Depreciation", "Asset", 0, 25000, 0, 20000, "Fixed Assets", 0, "Credit balance flagged by sign rule"],
  ["2000", "Accounts Payable", "Liability", 0, 40000, 0, 35000, "Payables", 0, ""],
  ["2100", "Accrued Expenses", "Liability", 0, 15000, 0, 10000, "Payables", 0, ""],
  ["2500", "Term Debt", "Liability", 0, 60000, 0, 55000, "Debt", 0, ""],
  ["3000", "Members' Equity", "Equity", 0, 110000, 0, 95000, "Equity", 0, ""],
  ["4000", "Product Revenue", "Revenue", 0, 200000, 0, 180000, "Revenue", -2000, "Proposed credit adjustment"],
  ["5000", "Cost of Goods Sold", "Expense", 100000, 0, 90000, 0, "Operating Expenses", 0, ""],
  ["6100", "Payroll Expense", "Expense", 60000, 0, 55000, 0, "Operating Expenses", 0, ""],
  ["6200", "Rent Expense", "Expense", 20000, 0, 20000, 0, "Operating Expenses", 0, ""],
  ["6900", "New Compliance Expense", "Expense", 5000, 0, 0, 0, "", 0, "New account intentionally unmapped"],
];

const border = { style: "thin", color: { argb: "FFD1D5DB" } };
const fill = (hex) => ({ type: "pattern", pattern: "solid", fgColor: { argb: `FF${hex.slice(1)}` } });
const formula = (formulaText, result = "") => ({ formula: formulaText, result });
const listRange = (sheet, column, startRow, endRow) => ({ eachCell: (options, callback) => {
  for (let row = startRow; row <= endRow; row += 1) callback(sheet.getCell(row, column));
} });

function title(sheet, text, endColumn, endRow = 2) {
  sheet.mergeCells(1, 1, endRow, endColumn);
  const cell = sheet.getCell(1, 1);
  cell.value = text;
  cell.font = { name: "Aptos Display", size: 20, bold: true, color: { argb: "FFFFFFFF" } };
  cell.fill = fill(COLORS.ink);
  cell.alignment = { vertical: "middle" };
  sheet.getRow(1).height = 30;
}

function buildInput(sheet) {
  title(sheet, `${sheet.name} — Trial Balance`, 10);
  sheet.mergeCells("A4:J4");
  sheet.getCell("A4").value = "Enter balanced debit and credit columns in blue cells. Proposed adjustments use positive debit and negative credit signs.";
  sheet.getCell("A4").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = inputHeaders;
  sheet.getRow(5).height = 42;
  sampleData.forEach((values, index) => { sheet.getRow(6 + index).values = values; });
  styleTable(sheet, "A5:J105", "A5:J5", ["D", "E", "F", "G", "I"]);
  styleInputTable(sheet, "A6:J105", [16, 29, 17, 17, 17, 17, 17, 23, 20, 32]);
  addListValidation(listRange(sheet, 3, 6, 105), "'Lists'!$A$2:$A$7");
  addListValidation(listRange(sheet, 8, 6, 105), "'Lists'!$B$2:$B$11");
  sheet.autoFilter = "A5:J105";
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
}

function buildLists(sheet) {
  sheet.getRow(1).values = ["Account Type", "Review Category", "Status", "Input Mode"];
  [accountTypes, reviewCategories, ["Review", "Complete", "OK", "Unmapped", "Unusual"], ["Paste Import", "Manual Input"]]
    .forEach((values, column) => values.forEach((value, index) => { sheet.getCell(2 + index, column + 1).value = value; }));
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(1).fill = fill(COLORS.ink);
  sheet.getRow(1).height = 30;
  [19, 24, 16, 18].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
}

function sourceResult(row, column) {
  return sampleData[row - 6]?.[column - 1] ?? "";
}

function calculatedResult(row) {
  const source = sampleData[row - 6];
  if (!source) return { currentNet: "", priorNet: "", change: "", changePct: "", adjusted: "", mapping: "", sign: "", materiality: "", status: "" };
  const currentNet = source[3] - source[4];
  const priorNet = source[5] - source[6];
  const change = currentNet - priorNet;
  const changePct = priorNet === 0 ? (currentNet === 0 ? "" : "New") : change / Math.abs(priorNet);
  const adjusted = currentNet + source[8];
  const mapping = !source[2] || !source[7] ? "Unmapped" : "OK";
  const sign = ((["Asset", "Expense"].includes(source[2]) && currentNet < 0)
    || (["Liability", "Equity", "Revenue"].includes(source[2]) && currentNet > 0)) ? "Unusual" : "OK";
  const materiality = Math.abs(change) >= 5000 && (changePct === "New" || Math.abs(changePct) >= 0.10) ? "Review" : "OK";
  const status = [mapping, sign, materiality].some((value) => value !== "OK") ? "Review" : "Complete";
  return { currentNet, priorNet, change, changePct, adjusted, mapping, sign, materiality, status };
}

function buildReview(sheet) {
  title(sheet, "Trial Balance Review", 19);
  sheet.mergeCells("A4:S4");
  sheet.getCell("A4").value = "Formula-driven mapping, sign, and materiality review of the selected input mode.";
  sheet.getCell("A4").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = reviewHeaders;
  sheet.getRow(5).height = 44;
  [15, 27, 16, 16, 16, 16, 16, 16, 16, 16, 14, 22, 19, 18, 15, 15, 17, 15, 31]
    .forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
  styleTable(sheet, "A5:S105", "A5:S5", ["D", "E", "F", "G", "H", "I", "J", "M", "N"]);
  for (let row = 6; row <= 105; row += 1) {
    for (let column = 1; column <= 7; column += 1) {
      const letter = String.fromCharCode(64 + column);
      sheet.getCell(row, column).value = formula(sourceFormula(letter, row).slice(1), sourceResult(row, column));
    }
    for (const [column, letter] of [[12, "H"], [13, "I"], [19, "J"]]) {
      sheet.getCell(row, column).value = formula(sourceFormula(letter, row).slice(1), sourceResult(row, letter.charCodeAt(0) - 64));
    }
    const result = calculatedResult(row);
    sheet.getCell(row, 8).value = formula(`IF(B${row}="","",D${row}-E${row})`, result.currentNet);
    sheet.getCell(row, 9).value = formula(`IF(B${row}="","",F${row}-G${row})`, result.priorNet);
    sheet.getCell(row, 10).value = formula(`IF(B${row}="","",H${row}-I${row})`, result.change);
    sheet.getCell(row, 11).value = formula(`IF(B${row}="","",IF(I${row}=0,IF(H${row}=0,"","New"),J${row}/ABS(I${row})))`, result.changePct);
    sheet.getCell(row, 14).value = formula(`IF(B${row}="","",H${row}+M${row})`, result.adjusted);
    sheet.getCell(row, 15).value = formula(`IF(B${row}="","",IF(OR(C${row}="",L${row}=""),"Unmapped","OK"))`, result.mapping);
    sheet.getCell(row, 16).value = formula(`IF(B${row}="","",IF(OR(AND(OR(C${row}="Asset",C${row}="Expense"),H${row}<0),AND(OR(C${row}="Liability",C${row}="Equity",C${row}="Revenue"),H${row}>0)),"Unusual","OK"))`, result.sign);
    sheet.getCell(row, 17).value = formula(`IF(B${row}="","",IF(AND(ABS(J${row})>='Start Here'!$B$10,IFERROR(ABS(K${row})>='Start Here'!$B$11,TRUE)),"Review","OK"))`, result.materiality);
    sheet.getCell(row, 18).value = formula(`IF(B${row}="","",IF(OR(O${row}<>"OK",P${row}<>"OK",Q${row}<>"OK"),"Review","Complete"))`, result.status);
    sheet.getCell(row, 11).numFmt = "0.0%";
  }
  for (const column of [15, 16, 17, 18]) {
    const letter = String.fromCharCode(64 + column);
    sheet.addConditionalFormatting({ ref: `${letter}6:${letter}105`, rules: [
      { type: "containsText", operator: "containsText", text: "Review", style: { fill: fill(COLORS.amberSoft), font: { color: { argb: "FFD97706", bold: true } } } },
      { type: "containsText", operator: "containsText", text: "Unmapped", style: { fill: fill(COLORS.redSoft), font: { color: { argb: "FFDC2626", bold: true } } } },
      { type: "containsText", operator: "containsText", text: "Unusual", style: { fill: fill(COLORS.amberSoft), font: { color: { argb: "FFD97706", bold: true } } } },
      { type: "containsText", operator: "containsText", text: "OK", style: { fill: fill(COLORS.greenSoft), font: { color: { argb: "FF047857" } } } },
      { type: "containsText", operator: "containsText", text: "Complete", style: { fill: fill(COLORS.greenSoft), font: { color: { argb: "FF047857" } } } },
    ] });
  }
  sheet.autoFilter = "A5:S105";
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
}

function metric(sheet, labelAddress, label, valueAddress, formulaText, result, count = false) {
  sheet.getCell(labelAddress).value = label;
  sheet.getCell(labelAddress).font = { bold: true, color: { argb: "FF6B7280" } };
  sheet.getCell(labelAddress).fill = fill(COLORS.blueSoft);
  sheet.getCell(valueAddress).value = formula(formulaText, result);
  sheet.getCell(valueAddress).font = { bold: true, size: 18, color: { argb: "FF111827" } };
  sheet.getCell(valueAddress).numFmt = count ? "0" : '$#,##0;[Red]($#,##0);0';
}

function buildSummary(sheet) {
  title(sheet, "Trial Balance Review — Summary", 8);
  sheet.mergeCells("A3:H3");
  sheet.getCell("A3").value = "Printable balance, adjustment, mapping, sign, and materiality controls";
  sheet.getCell("A3").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = ["Client", formula("'Start Here'!B4", "Northstar Components LLC"), "Period End", formula("'Start Here'!B5", new Date("2026-06-30T00:00:00Z")), "Prepared By", formula("'Start Here'!B6", "Taylor Morgan"), "Status", ""];
  sheet.getCell("D5").numFmt = "mmm d, yyyy";
  metric(sheet, "A8", "Current Debits", "B9", "SUM('Review'!$D$6:$D$105)", 450000);
  metric(sheet, "C8", "Current Credits", "D9", "SUM('Review'!$E$6:$E$105)", 450000);
  metric(sheet, "E8", "Current Difference", "F9", "B9-D9", 0);
  metric(sheet, "A11", "Proposed Adjustments", "B12", "SUM('Review'!$M$6:$M$105)", 0);
  metric(sheet, "C11", "Adjusted Difference", "D12", "F9+B12", 0);
  metric(sheet, "E11", "Material Movement Count", "F12", 'COUNTIF(\'Review\'!$Q$6:$Q$105,"Review")', 9, true);
  metric(sheet, "A14", "Unusual Sign Count", "B15", 'COUNTIF(\'Review\'!$P$6:$P$105,"Unusual")', 1, true);
  metric(sheet, "C14", "Unmapped Count", "D15", 'COUNTIF(\'Review\'!$O$6:$O$105,"Unmapped")', 1, true);
  metric(sheet, "E14", "Open Review Count", "F15", 'COUNTIF(\'Review\'!$R$6:$R$105,"Review")', 9, true);
  sheet.getCell("H5").value = formula('IF(AND(ABS(D12)<0.01,F15=0),"Complete","Review")', "Review");
  sheet.getCell("H5").font = { bold: true };
  sheet.addConditionalFormatting({ ref: "H5", rules: [
    { type: "expression", formulae: ['H5="Review"'], style: { fill: fill(COLORS.amberSoft), font: { color: { argb: "FFD97706", bold: true } } } },
    { type: "expression", formulae: ['H5="Complete"'], style: { fill: fill(COLORS.greenSoft), font: { color: { argb: "FF047857", bold: true } } } },
  ] });
  sheet.mergeCells("A18:H18");
  sheet.getCell("A18").value = "Reviewer Notes";
  sheet.getCell("A18").fill = fill(COLORS.ink);
  sheet.getCell("A18").font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.mergeCells("A19:H22");
  sheet.getCell("A19").value = "Resolve mapping, unusual-sign, and material-movement review items before sign-off. Proposed adjustments use positive debit and negative credit signs.";
  sheet.getCell("A19").alignment = { wrapText: true, vertical: "top" };
  sheet.getCell("A19").fill = fill(COLORS.blueSoft);
  sheet.getCell("A19").font = { color: { argb: "FF0000FF" } };
  [18, 23, 20, 23, 22, 23, 16, 21].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
  for (let row = 5; row <= 22; row += 1) sheet.getRow(row).eachCell({ includeEmpty: true }, (cell) => { cell.border = { bottom: border }; });
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 1, paperSize: 9, margins: { left: 0.25, right: 0.25, top: 0.4, bottom: 0.4, header: 0.1, footer: 0.1 }, printArea: "A1:H22" };
}

export async function buildTrialBalanceReview(workbook) {
  workbook.creator = "FinBoard";
  workbook.created = new Date("2026-07-22T00:00:00Z");
  workbook.calcProperties.fullCalcOnLoad = true;
  workbook.calcProperties.forceFullCalc = true;
  const sheets = createShell(workbook, {
    title: "Trial Balance Review Workpaper",
    startLabels: ["Client Name", "Period End", "Prepared By", "Review Date", "Input Mode", "Currency", "Materiality Amount", "Materiality Percentage"],
    startValues: ["Northstar Components LLC", new Date("2026-06-30T00:00:00Z"), "Taylor Morgan", new Date("2026-07-10T00:00:00Z"), "Paste Import", "USD", 5000, 0.10],
    instructions: ["1. Confirm the client, period, preparer, selected input mode, and materiality settings.", "2. Paste or manually enter a balanced trial balance and map each account to a review category.", "3. Review mapping, sign, and materiality flags; proposed adjustments use positive debit and negative credit signs.", "4. Print or export the Summary after all Review items are resolved."],
  });
  buildInput(sheets.paste);
  buildInput(sheets.manual);
  buildReview(sheets.review);
  buildSummary(sheets.summary);
  buildLists(sheets.lists);
  return workbook;
}
