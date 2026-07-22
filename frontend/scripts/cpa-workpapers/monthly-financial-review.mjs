import { COLORS, addListValidation, createShell, sourceFormula, styleInputTable, styleTable } from "./shared.mjs";

const inputHeaders = ["Statement", "Account Number", "Account Name", "Account Type", "Current Period", "Prior Period", "Budget", "Review Category"];
const reviewHeaders = ["Statement", "Account Number", "Account Name", "Account Type", "Current", "Prior", "Budget", "Change $", "Change %", "Budget Var $", "Budget Var %", "Review Category", "Flag", "Notes", "Exception Score"];
const categories = ["Revenue", "Cost of Goods Sold", "Operating Expense", "Other Income", "Other Expense", "Cash", "Accounts Receivable", "Current Assets", "Accounts Payable", "Current Liabilities", "Other"];

const sampleData = [
  ["Income Statement", "4000", "Product Revenue", "Income", 245000, 210000, 230000, "Revenue"],
  ["Income Statement", "4010", "Service Revenue", "Income", 58000, 0, 45000, "Revenue"],
  ["Income Statement", "5000", "Materials", "Cost of Goods Sold", 91000, 78000, 85000, "Cost of Goods Sold"],
  ["Income Statement", "6100", "Payroll", "Expense", 73000, 68000, 70000, "Operating Expense"],
  ["Income Statement", "6200", "Marketing", "Expense", 31000, 19000, 20000, "Operating Expense"],
  ["Income Statement", "6300", "Rent", "Expense", 18000, 18000, 18000, "Operating Expense"],
  ["Balance Sheet", "1000", "Operating Cash", "Bank", 122000, 96000, 110000, "Cash"],
  ["Balance Sheet", "1100", "Accounts Receivable", "Accounts Receivable", 87000, 72000, 76000, "Accounts Receivable"],
  ["Balance Sheet", "1200", "Prepaid Expenses", "Other Current Asset", 14000, 12000, 13000, "Current Assets"],
  ["Balance Sheet", "1300", "Inventory in Transit", "", 6000, 5000, 5500, "Current Assets"],
  ["Balance Sheet", "2000", "Accounts Payable", "Accounts Payable", 62000, 51000, 55000, "Accounts Payable"],
  ["Balance Sheet", "2100", "Accrued Payroll", "Other Current Liability", 28000, 24000, 26000, "Current Liabilities"],
  ["Balance Sheet", "2200", "Sales Tax Payable", "Other Current Liability", 9000, 8000, 8500, "Current Liabilities"],
];

const border = { style: "thin", color: { argb: "FFD1D5DB" } };
const fill = (hex) => ({ type: "pattern", pattern: "solid", fgColor: { argb: `FF${hex.slice(1)}` } });
function formula(formulaText, result = "") { return { formula: formulaText, result }; }

function title(sheet, text, endColumn) {
  sheet.mergeCells(1, 1, 2, endColumn); const cell = sheet.getCell(1, 1); cell.value = text;
  cell.font = { name: "Aptos Display", size: 20, bold: true, color: { argb: "FFFFFFFF" } };
  cell.fill = fill(COLORS.ink); cell.alignment = { vertical: "middle" }; sheet.getRow(1).height = 28;
}

function buildInput(sheet) {
  title(sheet, `${sheet.name} — Monthly Trial Balance`, 8);
  sheet.getCell("A4").value = "Enter or paste values in blue cells. Do not add rows beyond row 105.";
  sheet.mergeCells("A4:H4"); sheet.getCell("A4").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = inputHeaders; sheet.getRow(5).height = 34;
  sampleData.forEach((values, index) => { sheet.getRow(6 + index).values = values; });
  styleTable(sheet, "A5:H105", "A5:H5", ["E", "F", "G"]); styleInputTable(sheet, "A6:H105", [18, 16, 27, 22, 17, 17, 17, 23]);
  addListValidation({ eachCell: (opts, fn) => { for (let row = 6; row <= 105; row += 1) fn(sheet.getCell(row, 1)); } }, "'Lists'!$A$2:$A$3");
  addListValidation({ eachCell: (opts, fn) => { for (let row = 6; row <= 105; row += 1) fn(sheet.getCell(row, 4)); } }, "'Lists'!$B$2:$B$10");
  addListValidation({ eachCell: (opts, fn) => { for (let row = 6; row <= 105; row += 1) fn(sheet.getCell(row, 8)); } }, "'Lists'!$C$2:$C$12");
  for (let row = 6; row <= 105; row += 1) for (let col = 5; col <= 7; col += 1) sheet.getCell(row, col).numFmt = '$#,##0;[Red]($#,##0);-';
  sheet.autoFilter = "A5:H105"; sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
}

function buildLists(sheet) {
  sheet.getRow(1).values = ["Statement", "Account Type", "Review Category", "Input Mode"];
  [["Income Statement", "Balance Sheet"], ["Income", "Cost of Goods Sold", "Expense", "Bank", "Accounts Receivable", "Other Current Asset", "Accounts Payable", "Other Current Liability", "Other"], categories, ["Paste Import", "Manual Input"]]
    .forEach((values, col) => values.forEach((value, index) => { sheet.getCell(2 + index, col + 1).value = value; }));
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } }; sheet.getRow(1).fill = fill(COLORS.ink); sheet.getRow(1).height = 30;
  [22, 27, 26, 18].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
}

function sourceResult(rowIndex, columnIndex) { return sampleData[rowIndex - 6]?.[columnIndex - 1] ?? ""; }

function buildReview(sheet) {
  title(sheet, "Monthly Financial Statement Review", 15); sheet.mergeCells("A4:O4");
  sheet.getCell("A4").value = "Formula-driven comparison. Add reviewer notes only in column N."; sheet.getCell("A4").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = reviewHeaders; sheet.getRow(5).height = 42;
  [16, 14, 24, 20, 14, 14, 14, 14, 13, 14, 13, 22, 18, 27, 17].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
  styleTable(sheet, "A5:O105", "A5:O5", ["E", "F", "G", "H", "J", "O"]);
  for (let row = 6; row <= 105; row += 1) {
    for (let col = 1; col <= 7; col += 1) sheet.getCell(row, col).value = formula(sourceFormula(String.fromCharCode(64 + col), row).slice(1), sourceResult(row, col));
    sheet.getCell(row, 12).value = formula(sourceFormula("H", row).slice(1), sourceResult(row, 8));
    const hasData = Boolean(sourceResult(row, 3)); const current = Number(sourceResult(row, 5) || 0); const prior = Number(sourceResult(row, 6) || 0); const budget = Number(sourceResult(row, 7) || 0);
    const change = current - prior; const budgetVar = current - budget;
    const changePct = prior === 0 ? (current === 0 ? "" : "New") : change / Math.abs(prior);
    const budgetPct = budget === 0 ? (current === 0 ? "" : "New") : budgetVar / Math.abs(budget);
    const incomplete = hasData && (!sourceResult(row, 4) || !sourceResult(row, 8));
    const flag = !hasData ? "" : incomplete ? "Incomplete" : ((Math.abs(change) >= 5000 && (changePct === "New" || Math.abs(changePct) >= 0.1)) || (Math.abs(budgetVar) >= 5000 && (budgetPct === "New" || Math.abs(budgetPct) >= 0.1)) ? "Review" : "OK");
    sheet.getCell(row, 8).value = formula(`IF(C${row}="","",E${row}-F${row})`, hasData ? change : "");
    sheet.getCell(row, 9).value = formula(`IF(C${row}="","",IF(F${row}=0,IF(E${row}=0,"","New"),H${row}/ABS(F${row})))`, hasData ? changePct : "");
    sheet.getCell(row, 10).value = formula(`IF(C${row}="","",E${row}-G${row})`, hasData ? budgetVar : "");
    sheet.getCell(row, 11).value = formula(`IF(C${row}="","",IF(G${row}=0,IF(E${row}=0,"","New"),J${row}/ABS(G${row})))`, hasData ? budgetPct : "");
    sheet.getCell(row, 13).value = formula(`IF(C${row}="","",IF(OR(D${row}="",L${row}=""),"Incomplete",IF(OR(AND(ABS(H${row})>='Start Here'!$B$10,IFERROR(ABS(I${row})>='Start Here'!$B$11,TRUE)),AND(ABS(J${row})>='Start Here'!$B$10,IFERROR(ABS(K${row})>='Start Here'!$B$11,TRUE))),"Review","OK")))`, flag);
    sheet.getCell(row, 15).value = formula(`IF(M${row}="Review",ABS(H${row})+ABS(J${row})+ROW()/1000000,0)`, flag === "Review" ? Math.abs(change) + Math.abs(budgetVar) + row / 1000000 : 0);
    sheet.getCell(row, 14).fill = fill(COLORS.blueSoft); sheet.getCell(row, 14).font = { color: { argb: "FF0000FF" } };
    [5, 6, 7, 8, 10, 15].forEach((col) => { sheet.getCell(row, col).numFmt = '$#,##0;[Red]($#,##0);-'; });
    [9, 11].forEach((col) => { sheet.getCell(row, col).numFmt = "0.0%"; });
  }
  sheet.addConditionalFormatting({ ref: "M6:M105", rules: [
    { type: "containsText", operator: "containsText", text: "Review", style: { fill: fill(COLORS.redSoft), font: { color: { argb: "FFDC2626", bold: true } } } },
    { type: "containsText", operator: "containsText", text: "Incomplete", style: { fill: fill(COLORS.amberSoft), font: { color: { argb: "FFD97706", bold: true } } } },
    { type: "containsText", operator: "containsText", text: "OK", style: { fill: fill(COLORS.greenSoft), font: { color: { argb: "FF047857" } } } },
  ] });
  sheet.autoFilter = "A5:O105"; sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
}

function buildSummary(sheet) {
  title(sheet, "Monthly Financial Review — Executive Summary", 8);
  sheet.mergeCells("A3:H3"); sheet.getCell("A3").value = "Decision-ready KPIs and the five largest exceptions"; sheet.getCell("A3").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = ["Client", formula("'Start Here'!B4", "Northstar Components LLC"), "Period End", formula("'Start Here'!B5", "2026-06-30"), "Prepared By", formula("'Start Here'!B6", "Taylor Morgan"), "Status", ""];
  const revenue = 303000; const cogs = 91000; const opEx = 122000; const gross = revenue - cogs; const operating = gross - opEx; const net = operating; const working = 122000 + 87000 + 20000 - 62000 - 37000;
  const incompleteItems = sampleData.filter((row) => !row[3] || !row[7]);
  const flags = sampleData.filter((row) => { if (!row[3] || !row[7]) return false; const ch = row[4] - row[5]; const bv = row[4] - row[6]; const cp = row[5] === 0 ? "New" : ch / Math.abs(row[5]); const bp = row[6] === 0 ? "New" : bv / Math.abs(row[6]); return (Math.abs(ch) >= 5000 && (cp === "New" || Math.abs(cp) >= .1)) || (Math.abs(bv) >= 5000 && (bp === "New" || Math.abs(bp) >= .1)); });
  const exceptionCount = flags.length + incompleteItems.length;
  const kpis = [
    ["Revenue", `SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Revenue")`, revenue],
    ["Gross Profit", `B8-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Cost of Goods Sold")`, gross],
    ["Operating Income", `D8-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Operating Expense")`, operating],
    ["Net Income", `F8+SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Other Income")-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Other Expense")`, net],
    ["Working Capital", `SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Cash")+SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Accounts Receivable")+SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Current Assets")-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Accounts Payable")-SUMIFS('Review'!$E$6:$E$105,'Review'!$L$6:$L$105,"Current Liabilities")`, working],
    ["Exception Count", `COUNTIF('Review'!$M$6:$M$105,"Review")+COUNTIF('Review'!$M$6:$M$105,"Incomplete")`, exceptionCount],
  ];
  [[1, "B"], [3, "D"], [5, "F"], [7, "H"], [1, "B"], [3, "D"]].forEach(([col], index) => {
    const row = index < 4 ? 8 : 11; const c = index < 4 ? col : col;
    sheet.getCell(row, c).value = kpis[index][0]; sheet.getCell(row + 1, c).value = formula(kpis[index][1], kpis[index][2]);
    sheet.getCell(row, c).font = { bold: true, color: { argb: "FF6B7280" } }; sheet.getCell(row + 1, c).font = { bold: true, size: 18, color: { argb: "FF111827" } };
    sheet.getCell(row + 1, c).numFmt = index === 5 ? "0" : '$#,##0;[Red]($#,##0);-'; sheet.getCell(row, c).fill = fill(COLORS.blueSoft); sheet.getCell(row + 1, c).fill = fill(COLORS.white);
  });
  sheet.getCell("H5").value = formula('IF(D12=0,"Complete","Review")', exceptionCount === 0 ? "Complete" : "Review"); sheet.getCell("H5").fill = fill(exceptionCount ? COLORS.amberSoft : COLORS.greenSoft); sheet.getCell("H5").font = { bold: true, color: { argb: exceptionCount ? "FFD97706" : "FF047857" } };
  sheet.mergeCells("A14:H14"); sheet.getCell("A14").value = "Top Five Exceptions"; sheet.getCell("A14").fill = fill(COLORS.ink); sheet.getCell("A14").font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(15).values = ["Rank", "Account", "Category", "Current", "Change $", "Budget Var $", "Flag", "Reviewer Notes"];
  sheet.getRow(15).fill = fill(COLORS.blue); sheet.getRow(15).font = { bold: true, color: { argb: "FFFFFFFF" } };
  const ranked = sampleData.map((row, idx) => ({ row, sourceRow: idx + 6, score: flags.includes(row) ? Math.abs(row[4] - row[5]) + Math.abs(row[4] - row[6]) + (idx + 6) / 1000000 : 0 })).filter((item) => item.score).sort((a, b) => b.score - a.score).slice(0, 5);
  for (let rank = 1; rank <= 5; rank += 1) {
    const row = 15 + rank; const item = ranked[rank - 1]; sheet.getCell(row, 1).value = rank;
    const large = `LARGE('Review'!$O$6:$O$105,${rank})`; const match = `MATCH(${large},'Review'!$O$6:$O$105,0)`;
    [[2, `IFERROR(INDEX('Review'!$C$6:$C$105,${match}),"")`, item?.row[2] ?? ""], [3, `IFERROR(INDEX('Review'!$L$6:$L$105,${match}),"")`, item?.row[7] ?? ""], [4, `IFERROR(INDEX('Review'!$E$6:$E$105,${match}),"")`, item?.row[4] ?? ""], [5, `IFERROR(INDEX('Review'!$H$6:$H$105,${match}),"")`, item ? item.row[4] - item.row[5] : ""], [6, `IFERROR(INDEX('Review'!$J$6:$J$105,${match}),"")`, item ? item.row[4] - item.row[6] : ""], [7, `IFERROR(INDEX('Review'!$M$6:$M$105,${match}),"")`, item ? "Review" : ""], [8, `IFERROR(INDEX('Review'!$N$6:$N$105,${match}),"")`, ""]].forEach(([col, f, result]) => { sheet.getCell(row, col).value = formula(f, result); });
    [4, 5, 6].forEach((col) => { sheet.getCell(row, col).numFmt = '$#,##0;[Red]($#,##0);-'; });
  }
  [14, 29, 24, 17, 17, 17, 14, 26].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
  for (let row = 5; row <= 20; row += 1) sheet.getRow(row).eachCell({ includeEmpty: true }, (cell) => { cell.border = { bottom: border }; });
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 1, paperSize: 9, margins: { left: 0.25, right: 0.25, top: 0.4, bottom: 0.4, header: 0.1, footer: 0.1 }, printArea: "A1:H20" };
}

export async function buildMonthlyFinancialReview(workbook) {
  workbook.creator = "FinBoard"; workbook.created = new Date("2026-07-22T00:00:00Z");
  workbook.calcProperties.fullCalcOnLoad = true; workbook.calcProperties.forceFullCalc = true;
  const sheets = createShell(workbook, {
    title: "Monthly Financial Statement Review",
    startLabels: ["Client Name", "Period End", "Prepared By", "Review Date", "Input Mode", "Currency", "Materiality Amount", "Materiality Percentage"],
    startValues: ["Northstar Components LLC", new Date("2026-06-30T00:00:00Z"), "Taylor Morgan", new Date("2026-07-10T00:00:00Z"), "Paste Import", "USD", 5000, 0.10],
    instructions: ["1. Confirm client, period, preparer, input mode, and materiality settings.", "2. Paste a trial balance or enter it manually in the blue input table.", "3. Review formula-driven period and budget variances; document exceptions.", "4. Print or export the Summary after all Review flags are resolved."],
  });
  buildInput(sheets.paste); buildInput(sheets.manual); buildReview(sheets.review); buildSummary(sheets.summary); buildLists(sheets.lists);
  return workbook;
}
