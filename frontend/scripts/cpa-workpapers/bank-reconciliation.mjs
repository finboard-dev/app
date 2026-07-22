import { COLORS, addListValidation, createShell, sourceFormula, styleInputTable, styleTable } from "./shared.mjs";

const inputHeaders = [
  "Date", "Reference", "Description", "Amount", "Source",
  "Reconciliation Type", "Cleared Status", "Notes",
];

const reviewHeaders = [
  "Date", "Reference", "Description", "Amount", "Source",
  "Reconciliation Type", "Cleared Status", "Notes",
  "Duplicate", "Input Check",
];

const sources = ["Bank", "Books"];
const reconciliationTypes = ["Cleared", "Outstanding Check", "Deposit in Transit", "Bank Adjustment", "Book Adjustment", "Unresolved"];
const clearedStatuses = ["Open", "Cleared"];
const statementDate = new Date("2026-06-30T00:00:00Z");
const sampleBalances = { statement: 51200, book: 50000 };
const sampleData = [
  [statementDate, "CHK-1042", "Vendor payment", 2500, "Books", "Outstanding Check", "Open", "Clears next period"],
  [statementDate, "DEP-0630", "Month-end customer deposit", 3000, "Books", "Deposit in Transit", "Open", "Deposited at month-end"],
  [statementDate, "FEE-0630", "Bank service fee", -50, "Bank", "Bank Adjustment", "Cleared", "Post fee to the ledger"],
  [statementDate, "JE-0630", "Book-side correction", 1650, "Books", "Book Adjustment", "Cleared", "Approved adjustment"],
  [statementDate, "UNR-0630", "Unidentified bank debit", 75, "Bank", "Unresolved", "Open", "Research in progress"],
  [statementDate, "CLR-0021", "Cleared transfer — bank", 100, "Bank", "Cleared", "Cleared", "Matched item"],
  [statementDate, "CLR-0021", "Cleared transfer — books", -100, "Books", "Cleared", "Cleared", "Matched item"],
];

const border = { style: "thin", color: { argb: "FFD1D5DB" } };
const fill = (hex) => ({ type: "pattern", pattern: "solid", fgColor: { argb: `FF${hex.slice(1)}` } });
const formula = (formulaText, result = "") => ({ formula: formulaText, result });

function title(sheet, text, endColumn, endRow = 1) {
  sheet.mergeCells(1, 1, endRow, endColumn);
  const cell = sheet.getCell(1, 1);
  cell.value = text;
  cell.font = { name: "Aptos Display", size: 20, bold: true, color: { argb: "FFFFFFFF" } };
  cell.fill = fill(COLORS.ink);
  cell.alignment = { vertical: "middle" };
  sheet.getRow(1).height = 30;
}

function listRange(sheet, column, startRow, endRow) {
  return { eachCell: (options, callback) => {
    for (let row = startRow; row <= endRow; row += 1) callback(sheet.getCell(row, column));
  } };
}

function buildInput(sheet) {
  title(sheet, `${sheet.name} — Bank Reconciliation`, 8);
  sheet.getCell("A2").value = "Statement Balance";
  sheet.getCell("B2").value = sampleBalances.statement;
  sheet.getCell("A3").value = "Book Balance";
  sheet.getCell("B3").value = sampleBalances.book;
  sheet.getCell("A4").value = "Statement Date";
  sheet.getCell("B4").value = statementDate;
  sheet.mergeCells("C2:H4");
  sheet.getCell("C2").value = "Sign convention: checks and deposits = positive; bank and book adjustments = signed.";
  sheet.getCell("C2").alignment = { wrapText: true, vertical: "middle" };
  sheet.getCell("C2").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = inputHeaders;
  sheet.getRow(5).height = 38;
  sampleData.forEach((values, index) => { sheet.getRow(6 + index).values = values; });
  styleTable(sheet, "A5:H105", "A5:H5", ["D"]);
  styleInputTable(sheet, "A6:H105", [15, 17, 29, 16, 14, 23, 17, 28]);
  for (const address of ["B2", "B3", "B4"]) {
    const cell = sheet.getCell(address);
    cell.fill = fill(COLORS.blueSoft);
    cell.font = { color: { argb: "FF0000FF" } };
    cell.border = { top: border, bottom: border, left: border, right: border };
  }
  sheet.getCell("B2").numFmt = '$#,##0;[Red]($#,##0);-';
  sheet.getCell("B3").numFmt = '$#,##0;[Red]($#,##0);-';
  sheet.getCell("B4").numFmt = "mmm d, yyyy";
  for (let row = 6; row <= 105; row += 1) {
    sheet.getCell(row, 1).numFmt = "mmm d, yyyy";
    sheet.getCell(row, 4).numFmt = '$#,##0;[Red]($#,##0);-';
  }
  addListValidation(listRange(sheet, 5, 6, 105), "'Lists'!$A$2:$A$3");
  addListValidation(listRange(sheet, 6, 6, 105), "'Lists'!$B$2:$B$7");
  addListValidation(listRange(sheet, 7, 6, 105), "'Lists'!$C$2:$C$3");
  sheet.autoFilter = "A5:H105";
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
}

function buildLists(sheet) {
  sheet.getRow(1).values = ["Source", "Reconciliation Type", "Cleared Status", "Input Mode"];
  [sources, reconciliationTypes, clearedStatuses, ["Paste Import", "Manual Input"]]
    .forEach((values, column) => values.forEach((value, index) => { sheet.getCell(2 + index, column + 1).value = value; }));
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(1).fill = fill(COLORS.ink);
  sheet.getRow(1).height = 30;
  [18, 25, 19, 18].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
}

function sourceResult(row, column) {
  if (row === 2 && column === 2) return sampleBalances.statement;
  if (row === 3 && column === 2) return sampleBalances.book;
  if (row === 4 && column === 2) return statementDate;
  return sampleData[row - 6]?.[column - 1] ?? "";
}

function buildReview(sheet) {
  title(sheet, "Bank Reconciliation Review", 10, 2);
  sheet.mergeCells("A4:J4");
  sheet.getCell("A4").value = "Formula-driven review of the selected input mode. Resolve duplicate, incomplete, and unresolved items before sign-off.";
  sheet.getCell("A4").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = reviewHeaders;
  sheet.getRow(5).height = 40;
  [15, 17, 29, 16, 14, 23, 17, 28, 16, 17].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
  styleTable(sheet, "A5:J105", "A5:J5", ["D"]);
  for (let row = 6; row <= 105; row += 1) {
    for (let column = 1; column <= 8; column += 1) {
      const letter = String.fromCharCode(64 + column);
      sheet.getCell(row, column).value = formula(sourceFormula(letter, row).slice(1), sourceResult(row, column));
    }
    const reference = sourceResult(row, 2);
    const duplicate = reference && sampleData.filter((item) => item[1] === reference).length > 1 ? "Duplicate" : "";
    const hasInput = sampleData[row - 6]?.some((value) => value !== "" && value !== null && value !== undefined) ?? false;
    const incomplete = hasInput && (!sourceResult(row, 1) || sourceResult(row, 4) === "" || !sourceResult(row, 5) || !sourceResult(row, 6));
    const inputCheck = !hasInput ? "" : incomplete ? "Incomplete" : sourceResult(row, 6) === "Unresolved" ? "Review" : "OK";
    sheet.getCell(row, 9).value = formula(`IF(B${row}="","",IF(COUNTIF($B$6:$B$105,B${row})>1,"Duplicate",""))`, duplicate);
    sheet.getCell(row, 10).value = formula(`IF(COUNTA(A${row}:H${row})=0,"",IF(OR(A${row}="",D${row}="",E${row}="",F${row}=""),"Incomplete",IF(F${row}="Unresolved","Review","OK")))`, inputCheck);
    sheet.getCell(row, 1).numFmt = "mmm d, yyyy";
    sheet.getCell(row, 4).numFmt = '$#,##0;[Red]($#,##0);-';
    if (duplicate) {
      sheet.getCell(row, 9).fill = fill(COLORS.redSoft);
      sheet.getCell(row, 9).font = { bold: true, color: { argb: "FFDC2626" } };
    }
    const statusColors = inputCheck === "Incomplete" ? [COLORS.redSoft, "FFDC2626"] : inputCheck === "Review" ? [COLORS.amberSoft, "FFD97706"] : inputCheck === "OK" ? [COLORS.greenSoft, "FF047857"] : null;
    if (statusColors) {
      sheet.getCell(row, 10).fill = fill(statusColors[0]);
      sheet.getCell(row, 10).font = { bold: inputCheck !== "OK", color: { argb: statusColors[1] } };
    }
  }
  sheet.addConditionalFormatting({ ref: "I6:I105", rules: [
    { type: "containsText", operator: "containsText", text: "Duplicate", style: { fill: fill(COLORS.redSoft), font: { color: { argb: "FFDC2626", bold: true } } } },
  ] });
  sheet.addConditionalFormatting({ ref: "J6:J105", rules: [
    { type: "containsText", operator: "containsText", text: "Review", style: { fill: fill(COLORS.amberSoft), font: { color: { argb: "FFD97706", bold: true } } } },
    { type: "containsText", operator: "containsText", text: "Incomplete", style: { fill: fill(COLORS.redSoft), font: { color: { argb: "FFDC2626", bold: true } } } },
    { type: "containsText", operator: "containsText", text: "OK", style: { fill: fill(COLORS.greenSoft), font: { color: { argb: "FF047857" } } } },
  ] });
  sheet.autoFilter = "A5:J105";
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
}

function buildSummary(sheet) {
  title(sheet, "Bank Reconciliation — Summary", 8, 2);
  sheet.mergeCells("A3:H3");
  sheet.getCell("A3").value = "Printable reconciliation control and sign-off workpaper";
  sheet.getCell("A3").font = { italic: true, color: { argb: "FF6B7280" } };
  sheet.getRow(5).values = ["Client", formula("'Start Here'!B4", "Northstar Components LLC"), "Statement Date", formula(sourceFormula("B", 4).slice(1), statementDate), "Prepared By", formula("'Start Here'!B7", "Taylor Morgan"), "Status", ""];
  sheet.getCell("D5").numFmt = "mmm d, yyyy";

  const metrics = [
    ["A8", "Statement Balance", "B9", sourceFormula("B", 2).slice(1), 51200],
    ["C8", "Book Balance", "D9", sourceFormula("B", 3).slice(1), 50000],
    ["A11", "Outstanding Checks", "B12", `SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Outstanding Check")`, 2500],
    ["C11", "Deposits in Transit", "D12", `SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Deposit in Transit")`, 3000],
    ["E11", "Bank Adjustments", "F12", `SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Bank Adjustment")`, -50],
    ["G11", "Book Adjustments", "H12", `SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Book Adjustment")`, 1650],
    ["A14", "Adjusted Bank", "B15", "B9-B12+D12+F12", 51650],
    ["C14", "Adjusted Books", "D15", "D9+H12", 51650],
    ["E14", "Difference", "F15", "B15-D15", 0],
    ["A17", "Unresolved Count", "B18", `COUNTIF('Review'!$F$6:$F$105,"Unresolved")`, 1],
    ["C17", "Unresolved Amount", "D18", `SUMIFS('Review'!$D$6:$D$105,'Review'!$F$6:$F$105,"Unresolved")`, 75],
  ];
  for (const [labelAddress, label, valueAddress, formulaText, result] of metrics) {
    sheet.getCell(labelAddress).value = label;
    sheet.getCell(labelAddress).font = { bold: true, color: { argb: "FF6B7280" } };
    sheet.getCell(labelAddress).fill = fill(COLORS.blueSoft);
    sheet.getCell(valueAddress).value = formula(formulaText, result);
    sheet.getCell(valueAddress).font = { bold: true, size: 18, color: { argb: "FF111827" } };
    sheet.getCell(valueAddress).numFmt = label === "Unresolved Count" ? "0" : label === "Difference" ? '$#,##0;[Red]($#,##0);0' : '$#,##0;[Red]($#,##0);-';
  }
  sheet.getCell("H5").value = formula(`IF(AND(ABS(F15)<='Start Here'!$B$11,B18=0),"Complete","Review")`, "Review");
  sheet.getCell("H5").font = { bold: true };
  sheet.addConditionalFormatting({ ref: "H5", rules: [
    { type: "expression", formulae: ['H5="Review"'], style: { fill: fill(COLORS.amberSoft), font: { color: { argb: "FFD97706", bold: true } } } },
    { type: "expression", formulae: ['H5="Complete"'], style: { fill: fill(COLORS.greenSoft), font: { color: { argb: "FF047857", bold: true } } } },
  ] });
  sheet.mergeCells("A20:H20");
  sheet.getCell("A20").value = "Reviewer Notes";
  sheet.getCell("A20").fill = fill(COLORS.ink);
  sheet.getCell("A20").font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.mergeCells("A21:H23");
  sheet.getCell("A21").value = "Resolve the unidentified bank debit before the reconciliation can be marked Complete.";
  sheet.getCell("A21").alignment = { wrapText: true, vertical: "top" };
  sheet.getCell("A21").fill = fill(COLORS.blueSoft);
  sheet.getCell("A21").font = { color: { argb: "FF0000FF" } };
  [16, 24, 20, 20, 18, 18, 19, 22].forEach((width, index) => { sheet.getColumn(index + 1).width = width; });
  for (let row = 5; row <= 23; row += 1) sheet.getRow(row).eachCell({ includeEmpty: true }, (cell) => { cell.border = { bottom: border }; });
  sheet.pageSetup = { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 1, paperSize: 9, margins: { left: 0.25, right: 0.25, top: 0.4, bottom: 0.4, header: 0.1, footer: 0.1 }, printArea: "A1:H23" };
}

export async function buildBankReconciliation(workbook) {
  workbook.creator = "FinBoard";
  workbook.created = new Date("2026-07-22T00:00:00Z");
  workbook.calcProperties.fullCalcOnLoad = true;
  workbook.calcProperties.forceFullCalc = true;
  const sheets = createShell(workbook, {
    title: "Bank Reconciliation Workpaper",
    startLabels: ["Client Name", "Bank Account", "Statement Date", "Prepared By", "Input Mode", "Review Date", "Currency", "Reconciliation Tolerance"],
    startValues: ["Northstar Components LLC", "Operating Account ••4821", statementDate, "Taylor Morgan", "Paste Import", new Date("2026-07-10T00:00:00Z"), "USD", 0.01],
    instructions: ["1. Confirm the client, bank account, dates, selected input mode, and tolerance.", "2. Paste bank reconciliation detail or enter reconciling items manually in blue cells.", "3. Classify each item and resolve duplicate, incomplete, and unresolved review flags.", "4. Print or export the Summary only after the difference is within tolerance and unresolved items are cleared."],
  });
  sheets.start.getCell("B6").numFmt = "mmm d, yyyy";
  sheets.start.getCell("B9").numFmt = "mmm d, yyyy";
  sheets.start.getCell("B10").numFmt = "General";
  sheets.start.getCell("B11").numFmt = "0.00";
  buildInput(sheets.paste);
  buildInput(sheets.manual);
  buildReview(sheets.review);
  buildSummary(sheets.summary);
  buildLists(sheets.lists);
  return workbook;
}
