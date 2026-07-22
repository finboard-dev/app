import { createCanvas } from "@napi-rs/canvas";

export const COLORS = Object.freeze({
  ink: "#111827", blue: "#2563EB", blueText: "#0000FF", blueSoft: "#EFF6FF",
  sand: "#FAF7F0", white: "#FFFFFF", line: "#D1D5DB", gray: "#6B7280",
  amber: "#D97706", amberSoft: "#FEF3C7", red: "#DC2626", redSoft: "#FEE2E2",
  green: "#047857", greenSoft: "#D1FAE5",
});

export const SHEET_NAMES = ["Start Here", "Paste Import", "Manual Input", "Review", "Summary", "Lists"];
const thinBorder = { style: "thin", color: { argb: "FFD1D5DB" } };
const argb = (hex) => `FF${hex.replace("#", "")}`;
const parseRange = (address) => {
  const [start, end = start] = address.split(":").map(decodeAddress);
  return { startRow: start.row, endRow: end.row, startColumn: start.column, endColumn: end.column };
};
const eachCellInRange = (sheet, address, callback) => {
  const range = parseRange(address);
  for (let row = range.startRow; row <= range.endRow; row += 1) {
    for (let column = range.startColumn; column <= range.endColumn; column += 1) callback(sheet.getCell(row, column));
  }
  return range;
};

export function createShell(workbook, config) {
  const sheets = Object.fromEntries(SHEET_NAMES.map((name) => [name, workbook.addWorksheet(name, { views: [{ showGridLines: false }] })]));
  const start = sheets["Start Here"];
  start.mergeCells("A1:H2");
  start.getCell("A1").value = config.title;
  start.getCell("A1").font = { name: "Aptos Display", size: 20, bold: true, color: { argb: argb(COLORS.white) } };
  start.getCell("A1").alignment = { vertical: "middle" };
  start.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(COLORS.ink) } };
  start.getColumn(1).width = 25; start.getColumn(2).width = 22;
  for (let col = 3; col <= 8; col += 1) start.getColumn(col).width = 14;
  config.startLabels.forEach((label, index) => { start.getCell(4 + index, 1).value = label; });
  config.startValues.forEach((value, index) => {
    const cell = start.getCell(4 + index, 2); cell.value = value;
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(COLORS.blueSoft) } };
    cell.font = { name: "Aptos", size: 10, color: { argb: argb(COLORS.blueText) } };
    cell.border = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };
  });
  start.getCell("B5").numFmt = "mmm d, yyyy"; start.getCell("B7").numFmt = "mmm d, yyyy";
  start.getCell("B10").numFmt = '$#,##0;[Red]($#,##0);-'; start.getCell("B11").numFmt = "0.0%";
  start.getCell("B8").dataValidation = { type: "list", allowBlank: false, formulae: ["'Lists'!$D$2:$D$3"] };
  start.mergeCells("A14:H14"); start.getCell("A14").value = "Workflow";
  start.getCell("A14").font = { bold: true, color: { argb: argb(COLORS.white) } };
  start.getCell("A14").fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(COLORS.blue) } };
  config.instructions.forEach((text, index) => {
    start.mergeCells(15 + index, 1, 15 + index, 8); start.getCell(15 + index, 1).value = text;
    start.getCell(15 + index, 1).alignment = { wrapText: true, vertical: "middle" };
    start.getRow(15 + index).height = 28;
  });
  [["Color", "Meaning"], ["Blue text", "Editable input"], ["Black text", "Formula or calculated result"], ["Amber or red", "Review item or failed control"]]
    .forEach((row, index) => { start.getRow(22 + index).values = row; });
  start.getRow(22).font = { bold: true, color: { argb: argb(COLORS.white) } };
  start.getRow(22).fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(COLORS.ink) } };
  for (const name of ["Paste Import", "Manual Input", "Review"]) sheets[name].views = [{ state: "frozen", ySplit: 5, showGridLines: false }];
  return { start, paste: sheets["Paste Import"], manual: sheets["Manual Input"], review: sheets.Review, summary: sheets.Summary, lists: sheets.Lists };
}

export function sourceFormula(columnLetter, rowNumber) {
  return `=IF('Start Here'!$B$8="Paste Import",'Paste Import'!${columnLetter}${rowNumber},'Manual Input'!${columnLetter}${rowNumber})`;
}

export function styleTable(sheet, address, headerAddress, currencyColumns = []) {
  const bounds = eachCellInRange(sheet, address, (cell) => { cell.font = { name: "Aptos", size: 10, color: { argb: argb(COLORS.ink) } }; });
  eachCellInRange(sheet, headerAddress, (cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(COLORS.ink) } };
    cell.font = { name: "Aptos", size: 10, bold: true, color: { argb: argb(COLORS.white) } };
    cell.alignment = { wrapText: true, vertical: "middle" }; cell.border = { bottom: thinBorder };
  });
  for (const column of currencyColumns) {
    const columnNumber = decodeAddress(`${column}1`).column;
    for (let row = bounds.startRow; row <= bounds.endRow; row += 1) sheet.getCell(row, columnNumber).numFmt = '$#,##0;[Red]($#,##0);-';
  }
}

export function styleInputTable(sheet, address, widths) {
  const bounds = parseRange(address);
  widths.forEach((width, index) => { sheet.getColumn(bounds.startColumn + index).width = width; });
  eachCellInRange(sheet, address, (cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(COLORS.blueSoft) } };
    cell.font = { name: "Aptos", size: 10, color: { argb: argb(COLORS.blueText) } };
    cell.border = { bottom: thinBorder };
  });
}

export function styleInputRange(range) {
  range.eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: argb(COLORS.blueSoft) } };
    cell.font = { name: "Aptos", size: 10, color: { argb: argb(COLORS.blueText) } };
    cell.border = { bottom: thinBorder };
  });
}

export function addListValidation(range, listRange) {
  range.eachCell({ includeEmpty: true }, (cell) => { cell.dataValidation = { type: "list", allowBlank: true, formulae: [listRange] }; });
}

function colorFromCell(cell, fallback = COLORS.white) {
  const color = cell.fill?.fgColor?.argb;
  return color ? `#${color.slice(-6)}` : fallback;
}

function displayValue(cell) {
  const value = cell.value && typeof cell.value === "object" && "formula" in cell.value ? cell.value.result ?? "" : cell.value;
  if (typeof value === "number" && cell.numFmt?.includes("%")) return `${(value * 100).toFixed(1)}%`;
  if (typeof value === "number" && cell.numFmt?.includes("$")) return value === 0 ? "-" : `${value < 0 ? "(" : ""}$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}${value < 0 ? ")" : ""}`;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (value !== cell.value) return value;
  if (cell.value instanceof Date) return cell.value.toISOString().slice(0, 10);
  return cell.value ?? "";
}

function decodeAddress(address) {
  const match = /^([A-Z]+)(\d+)$/.exec(address); let column = 0;
  for (const char of match[1]) column = column * 26 + char.charCodeAt(0) - 64;
  return { row: Number(match[2]), column };
}

function mergedRegions(sheet) {
  return (sheet.model.merges || []).map((address) => {
    const [start, end] = address.split(":"); const from = decodeAddress(start); const to = decodeAddress(end);
    return { ...from, endRow: to.row, endColumn: to.column };
  });
}

async function renderWorksheet(sheet, filePath, fs) {
  const isSummary = sheet.name === "Summary";
  const width = isSummary ? 1600 : 1400;
  const height = isSummary ? 900 : 1000;
  const canvas = createCanvas(width, height); const ctx = canvas.getContext("2d");
  ctx.fillStyle = COLORS.sand; ctx.fillRect(0, 0, width, height);
  const maxCol = Math.min(sheet.columnCount || 8, isSummary ? 8 : 15);
  const maxRow = Math.min(sheet.rowCount || 25, isSummary ? 24 : 25);
  const margin = 34; const contentWidth = width - margin * 2;
  const rawWidths = Array.from({ length: maxCol }, (_, i) => Math.max(55, Math.min(230, (sheet.getColumn(i + 1).width || 12) * 8)));
  const factor = Math.min(1, contentWidth / rawWidths.reduce((a, b) => a + b, 0));
  const widths = rawWidths.map((value) => value * factor);
  const rowHeights = Array.from({ length: maxRow }, (_, i) => Math.max(28, Math.min(62, (sheet.getRow(i + 1).height || 20) * 1.45)));
  const rowPositions = []; let position = margin; rowHeights.forEach((rowHeight) => { rowPositions.push(position); position += rowHeight; });
  const merges = mergedRegions(sheet); let y = margin;
  for (let row = 1; row <= maxRow; row += 1) {
    const rowHeight = rowHeights[row - 1];
    if (y + rowHeight > height - margin) break;
    let x = margin;
    for (let col = 1; col <= maxCol; col += 1) {
      const merge = merges.find((region) => row >= region.row && row <= region.endRow && col >= region.column && col <= region.endColumn);
      const cellWidth = widths[col - 1];
      if (merge && (row !== merge.row || col !== merge.column)) { x += cellWidth; continue; }
      const cell = sheet.getCell(row, col);
      const drawWidth = merge ? widths.slice(col - 1, Math.min(maxCol, merge.endColumn)).reduce((sum, value) => sum + value, 0) : cellWidth;
      const drawHeight = merge ? rowHeights.slice(row - 1, Math.min(maxRow, merge.endRow)).reduce((sum, value) => sum + value, 0) : rowHeight;
      let background = colorFromCell(cell, row % 2 === 0 ? "#FFFFFF" : "#F9FAFB");
      if (sheet.name === "Review" && col === 13 && displayValue(cell) === "Review") background = COLORS.redSoft;
      if (sheet.name === "Review" && col === 13 && displayValue(cell) === "Incomplete") background = COLORS.amberSoft;
      ctx.fillStyle = background; ctx.fillRect(x, rowPositions[row - 1], drawWidth, drawHeight);
      ctx.strokeStyle = COLORS.line; ctx.strokeRect(x, rowPositions[row - 1], drawWidth, drawHeight);
      ctx.fillStyle = cell.font?.color?.argb ? `#${cell.font.color.argb.slice(-6)}` : COLORS.ink;
      ctx.font = `${cell.font?.bold ? "700" : "400"} ${Math.max(12, Math.min(24, (cell.font?.size || 10) * 1.35))}px Arial`;
      ctx.textBaseline = "middle"; const value = String(displayValue(cell));
      const clipped = value.length > Math.max(5, Math.floor(drawWidth / 7)) ? `${value.slice(0, Math.max(2, Math.floor(drawWidth / 7) - 1))}…` : value;
      ctx.fillText(clipped, x + 7, rowPositions[row - 1] + drawHeight / 2, drawWidth - 14);
      x += cellWidth;
    }
    y += rowHeight;
  }
  await fs.writeFile(filePath, canvas.toBuffer("image/png"));
}

export async function verifyAndExport({ workbook, slug, outputRoot, fs }) {
  const artifactDir = `${outputRoot}/outputs/cpa-financial-workpapers`;
  const renderDir = `${artifactDir}/${slug}-renders`;
  await fs.mkdir(renderDir, { recursive: true });
  const records = [];
  let formulaCount = 0; let validationCount = 0;
  for (const sheet of workbook.worksheets) {
    sheet.eachRow({ includeEmpty: true }, (row) => row.eachCell({ includeEmpty: true }, (cell) => {
      if (cell.value && typeof cell.value === "object" && "formula" in cell.value) {
        formulaCount += 1; records.push({ kind: "formula", sheet: sheet.name, address: cell.address, formula: cell.value.formula, result: cell.value.result ?? null });
        if (/\#(?:REF!|DIV\/0!|VALUE!|NAME\?|N\/A)/.test(String(cell.value.result ?? ""))) throw new Error(`formula error ${sheet.name}!${cell.address}`);
      }
      if (cell.dataValidation?.type) validationCount += 1;
    }));
  }
  const snapshot = (sheetName, startRow, endRow, startCol, endCol) => ({
    kind: "key_range", range: `${sheetName}!${workbook.getWorksheet(sheetName).getCell(startRow, startCol).address}:${workbook.getWorksheet(sheetName).getCell(endRow, endCol).address}`,
    values: Array.from({ length: endRow - startRow + 1 }, (_, rowOffset) => Array.from({ length: endCol - startCol + 1 }, (_, colOffset) => displayValue(workbook.getWorksheet(sheetName).getCell(startRow + rowOffset, startCol + colOffset)))),
  });
  const modeMetrics = (sheetName) => {
    const sheet = workbook.getWorksheet(sheetName); let revenue = 0; let exceptionCount = 0;
    for (let row = 6; row <= 105; row += 1) {
      const current = Number(sheet.getCell(row, 5).value || 0); const prior = Number(sheet.getCell(row, 6).value || 0); const budget = Number(sheet.getCell(row, 7).value || 0); const category = sheet.getCell(row, 8).value;
      if (category === "Revenue") revenue += current;
      if (!sheet.getCell(row, 3).value) continue;
      if (!sheet.getCell(row, 4).value || !category) { exceptionCount += 1; continue; }
      const change = current - prior; const budgetVar = current - budget;
      const changeMaterial = Math.abs(change) >= 5000 && (prior === 0 || Math.abs(change / Math.abs(prior)) >= 0.1);
      const budgetMaterial = Math.abs(budgetVar) >= 5000 && (budget === 0 || Math.abs(budgetVar / Math.abs(budget)) >= 0.1);
      if (changeMaterial || budgetMaterial) exceptionCount += 1;
    }
    return { revenue, exceptionCount };
  };
  const pasteMetrics = modeMetrics("Paste Import"); const manualMetrics = modeMetrics("Manual Input");
  if (pasteMetrics.revenue !== manualMetrics.revenue || pasteMetrics.exceptionCount !== manualMetrics.exceptionCount) throw new Error("input modes do not reconcile");
  records.unshift(
    { kind: "summary", sheets: workbook.worksheets.map((sheet) => sheet.name), formulaCount, validationCount },
    snapshot("Start Here", 1, 25, 1, 8), snapshot("Review", 1, 18, 1, 15), snapshot("Summary", 1, 24, 1, 8),
    { kind: "mode_check", pasteImport: pasteMetrics, manualInput: manualMetrics, equal: true },
  );
  const inspectionPath = `${artifactDir}/${slug}-inspection.ndjson`;
  await fs.writeFile(inspectionPath, records.slice(0, 350).map((record) => JSON.stringify(record)).join("\n"));
  const renderPaths = [];
  for (const sheetName of SHEET_NAMES) {
    const renderPath = `${renderDir}/${sheetName.toLowerCase().replaceAll(" ", "-")}.png`;
    await renderWorksheet(workbook.getWorksheet(sheetName), renderPath, fs); renderPaths.push(renderPath);
  }
  const xlsxPath = `${artifactDir}/${slug}.xlsx`;
  await workbook.xlsx.writeFile(xlsxPath);
  return { xlsxPath, renderPaths, renderDir, inspectionPath };
}
