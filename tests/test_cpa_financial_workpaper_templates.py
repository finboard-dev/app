import hashlib
import json
import re
import struct
import unittest
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = ROOT / "frontend" / "public" / "template-files"
COVERS = ROOT / "frontend" / "public" / "templates" / "covers"
CONTENT = ROOT / "frontend" / "content" / "templates"
SHEETS = ["Start Here", "Paste Import", "Manual Input", "Review", "Summary", "Lists"]
NS = {
    "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pkg": "http://schemas.openxmlformats.org/package/2006/relationships",
}

WORKBOOKS = {
    "monthly-financial-statement-review-template": {
        "min_formulas": 500,
        "min_validations": 3,
    },
    "bank-reconciliation-workpaper-template": {
        "min_formulas": 400,
        "min_validations": 4,
    },
    "trial-balance-review-workpaper-template": {
        "min_formulas": 900,
        "min_validations": 3,
    },
}

PAGE_EXPECTATIONS = {
    "monthly-financial-statement-review-template": {
        "title": "Monthly Financial Statement Review Template",
        "category": "Financial Planning",
        "keywords": ("variance", "working capital", "Paste Import", "Manual Input"),
        "lead_question_labels": (
            "How many client financials do you review monthly?",
            "Which accounting system do you use?",
        ),
    },
    "bank-reconciliation-workpaper-template": {
        "title": "Bank Reconciliation Workpaper Template",
        "category": "Accounting Operations",
        "keywords": ("outstanding checks", "deposits in transit", "Paste Import", "Manual Input"),
        "lead_question_labels": (
            "How many bank accounts do you reconcile monthly?",
            "Which accounting system do you use?",
        ),
    },
    "trial-balance-review-workpaper-template": {
        "title": "Trial Balance Review Workpaper Template",
        "category": "Accounting Operations",
        "keywords": ("unusual", "proposed adjustments", "Paste Import", "Manual Input"),
        "lead_question_labels": (
            "How many client trial balances do you review monthly?",
            "Which accounting system do you use?",
        ),
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


def worksheet_xml(archive, sheet_name):
    workbook = ET.fromstring(archive.read("xl/workbook.xml"))
    sheet = next(
        node for node in workbook.findall("main:sheets/main:sheet", NS)
        if node.attrib["name"] == sheet_name
    )
    relationship_id = sheet.attrib[f"{{{NS['rel']}}}id"]
    relationships = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
    relationship = next(
        node for node in relationships.findall("pkg:Relationship", NS)
        if node.attrib["Id"] == relationship_id
    )
    return ET.fromstring(archive.read(f"xl/{relationship.attrib['Target']}"))


def worksheet_cell(sheet, address):
    return next(
        cell for cell in sheet.findall(".//main:c", NS)
        if cell.attrib.get("r") == address
    )


def cell_value(archive, sheet, address):
    cell = worksheet_cell(sheet, address)
    value = cell.findtext("main:v", namespaces=NS)
    if cell.attrib.get("t") != "s":
        return value
    shared_strings = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    item = shared_strings.findall("main:si", NS)[int(value)]
    return "".join(node.text or "" for node in item.iter() if node.tag.endswith("}t"))


def cell_number_format(archive, sheet, address):
    cell = worksheet_cell(sheet, address)
    styles = ET.fromstring(archive.read("xl/styles.xml"))
    style = styles.findall("main:cellXfs/main:xf", NS)[int(cell.attrib["s"])]
    number_format_id = style.attrib["numFmtId"]
    custom_formats = {
        item.attrib["numFmtId"]: item.attrib["formatCode"]
        for item in styles.findall("main:numFmts/main:numFmt", NS)
    }
    return custom_formats.get(number_format_id, number_format_id)


def formula_text(sheet, address):
    return worksheet_cell(sheet, address).findtext("main:f", namespaces=NS)


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def workbook_strings(archive):
    shared_strings = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    return [
        "".join(node.text or "" for node in item.iter() if node.tag.endswith("}t"))
        for item in shared_strings.findall("main:si", NS)
    ]


def evaluate_monthly_formula_graph(archive, mode):
    """Deterministically evaluate the supported monthly Review/Summary formula graph.

    This is a focused evaluator for the formulas emitted by this workbook builder; it
    does not represent or claim a general Excel calculation engine.
    """
    self_reference = "'Start Here'!$B$8"
    review = worksheet_xml(archive, "Review")
    selected = []
    for row in range(6, 106):
        values = {}
        for review_column, source_column in (("E", "E"), ("L", "H")):
            address = f"{review_column}{row}"
            expected_formula = (
                f'IF({self_reference}="Paste Import",'
                f"'Paste Import'!{source_column}{row},"
                f"'Manual Input'!{source_column}{row})"
            )
            assert formula_text(review, address) == expected_formula, address
            source = worksheet_xml(archive, mode)
            values[review_column] = cell_value(archive, source, f"{source_column}{row}")
        selected.append((float(values["E"] or 0), values["L"] or ""))

    totals = {}
    for value, category in selected:
        totals[category] = totals.get(category, 0) + value
    revenue = totals.get("Revenue", 0)
    gross_profit = revenue - totals.get("Cost of Goods Sold", 0)
    operating_income = gross_profit - totals.get("Operating Expense", 0)
    net_income = (
        operating_income
        + totals.get("Other Income", 0)
        - totals.get("Other Expense", 0)
    )
    return revenue, gross_profit, operating_income, net_income


class CpaFinancialWorkpaperTemplatesTest(unittest.TestCase):
    def test_monthly_summary_formula_graph_is_exact_and_evaluates_both_modes(self):
        path = FILES / "monthly-financial-statement-review-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            summary = worksheet_xml(archive, "Summary")
            expected_formulas = {
                "A9": 'SUMIFS(\'Review\'!$E$6:$E$105,\'Review\'!$L$6:$L$105,"Revenue")',
                "C9": 'A9-SUMIFS(\'Review\'!$E$6:$E$105,\'Review\'!$L$6:$L$105,"Cost of Goods Sold")',
                "E9": 'C9-SUMIFS(\'Review\'!$E$6:$E$105,\'Review\'!$L$6:$L$105,"Operating Expense")',
                "G9": 'E9+SUMIFS(\'Review\'!$E$6:$E$105,\'Review\'!$L$6:$L$105,"Other Income")-SUMIFS(\'Review\'!$E$6:$E$105,\'Review\'!$L$6:$L$105,"Other Expense")',
            }
            for address, expected_formula in expected_formulas.items():
                self.assertEqual(formula_text(summary, address), expected_formula, address)
            for mode in ("Paste Import", "Manual Input"):
                with self.subTest(mode=mode):
                    self.assertEqual(
                        evaluate_monthly_formula_graph(archive, mode),
                        (303000, 212000, 90000, 90000),
                    )
            self.assertEqual(
                tuple(float(cell_value(archive, summary, address)) for address in ("A9", "C9", "E9", "G9")),
                (303000, 212000, 90000, 90000),
            )

    def test_monthly_period_end_is_a_real_date_with_display_format(self):
        path = FILES / "monthly-financial-statement-review-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            summary = worksheet_xml(archive, "Summary")
            self.assertEqual(formula_text(summary, "D5"), "'Start Here'!B5")
            self.assertEqual(cell_value(archive, summary, "D5"), "46203")
            self.assertEqual(cell_number_format(archive, summary, "D5"), "mmm d, yyyy")

    def test_monthly_statement_values_and_visible_wording_match_design(self):
        path = FILES / "monthly-financial-statement-review-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            lists = worksheet_xml(archive, "Lists")
            self.assertEqual(
                [cell_value(archive, lists, address) for address in ("A2", "A3")],
                ["Profit and Loss", "Balance Sheet"],
            )
            for sheet_name in ("Paste Import", "Manual Input"):
                sheet = worksheet_xml(archive, sheet_name)
                statements = {
                    cell_value(archive, sheet, f"A{row}")
                    for row in range(6, 106)
                    if cell_value(archive, sheet, f"A{row}")
                }
                self.assertEqual(statements, {"Profit and Loss", "Balance Sheet"}, sheet_name)
            visible_copy = "\n".join(workbook_strings(archive)).lower()
            self.assertNotIn("monthly trial balance", visible_copy)
            self.assertNotIn("paste a trial balance", visible_copy)
            self.assertIn("monthly financial statement", visible_copy)

    def test_all_summaries_show_completion_date_from_start_here(self):
        mappings = {
            "monthly-financial-statement-review-template": ("B7", "46213"),
            "bank-reconciliation-workpaper-template": ("B9", "46213"),
            "trial-balance-review-workpaper-template": ("B7", "46213"),
        }
        for slug, (start_address, expected_serial) in mappings.items():
            with self.subTest(slug=slug), zipfile.ZipFile(FILES / f"{slug}.xlsx") as archive:
                start = worksheet_xml(archive, "Start Here")
                summary = worksheet_xml(archive, "Summary")
                self.assertEqual(cell_value(archive, start, f"A{start_address[1:]}") , "Completion Date")
                self.assertEqual(cell_number_format(archive, start, start_address), "mmm d, yyyy")
                self.assertEqual(cell_value(archive, summary, "A6"), "Completion Date")
                self.assertEqual(formula_text(summary, "B6"), f"'Start Here'!{start_address}")
                self.assertEqual(cell_value(archive, summary, "B6"), expected_serial)
                self.assertEqual(cell_number_format(archive, summary, "B6"), "mmm d, yyyy")

    def test_workbook_sources_and_artifacts_have_no_ornamental_characters(self):
        forbidden = re.compile("[—•]")
        source_dir = ROOT / "frontend" / "scripts" / "cpa-workpapers"
        for path in source_dir.glob("*.mjs"):
            self.assertIsNone(forbidden.search(path.read_text()), path)
        for slug in WORKBOOKS:
            with self.subTest(slug=slug), zipfile.ZipFile(FILES / f"{slug}.xlsx") as archive:
                for text in workbook_strings(archive):
                    self.assertIsNone(forbidden.search(text), text)

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
                self.assertEqual(
                    tuple(question["label"] for question in data["leadQuestions"]),
                    expected["lead_question_labels"],
                )
                combined = f'{data["shortDescription"]} {data["about"]}'
                for keyword in expected["keywords"]:
                    self.assertIn(keyword.lower(), combined.lower())

    def test_published_workbooks_have_required_structure(self):
        for slug, expected in WORKBOOKS.items():
            with self.subTest(slug=slug):
                path = FILES / f"{slug}.xlsx"
                self.assertTrue(path.is_file(), path)
                sheets, formulas, validations = workbook_stats(path)
                self.assertEqual(sheets, SHEETS)
                self.assertGreaterEqual(formulas, expected["min_formulas"])
                self.assertGreaterEqual(validations, expected["min_validations"])

    def test_summary_covers_are_exact_card_dimensions(self):
        for slug in WORKBOOKS:
            with self.subTest(slug=slug):
                path = COVERS / f"{slug}.png"
                self.assertTrue(path.is_file(), path)
                width, height = png_size(path)
                self.assertEqual((width, height), (1600, 900))

    def test_input_mode_validation_references_lists_sheet(self):
        path = FILES / "monthly-financial-statement-review-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            start = worksheet_xml(archive, "Start Here")
            validations = start.findall(".//main:dataValidation", NS)
            input_mode = next(item for item in validations if "B8" in item.attrib["sqref"].split())
            formula = input_mode.findtext("main:formula1", namespaces=NS)
            self.assertIn("Lists", formula)

    def test_review_contains_cached_incomplete_sample(self):
        path = FILES / "monthly-financial-statement-review-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            review = worksheet_xml(archive, "Review")
            cached_flags = [
                cell.findtext("main:v", namespaces=NS)
                for cell in review.findall(".//main:c", NS)
                if cell.attrib.get("r", "").startswith("M")
            ]
            self.assertIn("Incomplete", cached_flags)

    def test_review_status_conditional_format_colors(self):
        path = FILES / "monthly-financial-statement-review-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            review = worksheet_xml(archive, "Review")
            styles = ET.fromstring(archive.read("xl/styles.xml"))
            differential_styles = styles.findall("main:dxfs/main:dxf", NS)
            status_colors = {}
            for rule in review.findall(".//main:conditionalFormatting/main:cfRule", NS):
                formula = rule.findtext("main:formula", namespaces=NS) or ""
                for status in ("Review", "Incomplete", "OK"):
                    if f'&quot;{status}&quot;' in formula or f'"{status}"' in formula:
                        style = differential_styles[int(rule.attrib["dxfId"])]
                        color = style.find("main:fill/main:patternFill/main:fgColor", NS)
                        status_colors[status] = color.attrib["rgb"][-6:]
            self.assertEqual(
                status_colors,
                {"Review": "FEF3C7", "Incomplete": "FEE2E2", "OK": "D1FAE5"},
            )

    def test_bank_input_mode_selector_and_dates_are_in_expected_cells(self):
        path = FILES / "bank-reconciliation-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            start = worksheet_xml(archive, "Start Here")
            self.assertEqual(cell_value(archive, start, "A8"), "Input Mode")
            self.assertEqual(cell_value(archive, start, "B8"), "Paste Import")
            validations = start.findall(".//main:dataValidation", NS)
            input_mode = next(item for item in validations if "B8" in item.attrib["sqref"].split())
            self.assertEqual(
                input_mode.findtext("main:formula1", namespaces=NS),
                "'Lists'!$D$2:$D$3",
            )
            self.assertEqual(cell_value(archive, start, "A6"), "Statement Date")
            self.assertEqual(cell_value(archive, start, "A9"), "Completion Date")
            self.assertEqual(cell_number_format(archive, start, "B6"), "mmm d, yyyy")
            self.assertEqual(cell_number_format(archive, start, "B9"), "mmm d, yyyy")

    def test_bank_review_source_formulas_use_input_mode_cell(self):
        path = FILES / "bank-reconciliation-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            review = worksheet_xml(archive, "Review")
            for row in range(6, 106):
                for column in "ABCDEFGH":
                    address = f"{column}{row}"
                    formula = worksheet_cell(review, address).findtext("main:f", namespaces=NS)
                    self.assertIn("'Start Here'!$B$8", formula, address)

    def test_bank_input_modes_contain_the_same_control_data(self):
        path = FILES / "bank-reconciliation-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            paste = worksheet_xml(archive, "Paste Import")
            manual = worksheet_xml(archive, "Manual Input")
            for address in ("B2", "B3", "B4"):
                self.assertEqual(
                    cell_value(archive, paste, address),
                    cell_value(archive, manual, address),
                    address,
                )
            for row in range(6, 106):
                for column in "ABCDEFGH":
                    address = f"{column}{row}"
                    paste_cell = next(
                        (cell for cell in paste.findall(".//main:c", NS) if cell.attrib.get("r") == address),
                        None,
                    )
                    manual_cell = next(
                        (cell for cell in manual.findall(".//main:c", NS) if cell.attrib.get("r") == address),
                        None,
                    )
                    self.assertEqual(
                        ET.tostring(paste_cell) if paste_cell is not None else None,
                        ET.tostring(manual_cell) if manual_cell is not None else None,
                        address,
                    )

    def test_bank_summary_has_exact_numeric_cached_controls(self):
        path = FILES / "bank-reconciliation-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            summary = worksheet_xml(archive, "Summary")
            expected = {
                "B15": (None, "51650"),
                "D15": (None, "51650"),
                "F15": (None, "0"),
                "B18": (None, "1"),
                "D18": (None, "75"),
                "H5": ("str", "Review"),
            }
            for address, (cell_type, cached_value) in expected.items():
                cell = worksheet_cell(summary, address)
                self.assertEqual(cell.attrib.get("t"), cell_type, address)
                self.assertEqual(cell.findtext("main:v", namespaces=NS), cached_value, address)

    def test_bank_summary_status_conditional_format_colors(self):
        path = FILES / "bank-reconciliation-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            summary = worksheet_xml(archive, "Summary")
            styles = ET.fromstring(archive.read("xl/styles.xml"))
            differential_styles = styles.findall("main:dxfs/main:dxf", NS)
            status_colors = {}
            for rule in summary.findall(".//main:conditionalFormatting/main:cfRule", NS):
                formula = rule.findtext("main:formula", namespaces=NS) or ""
                for status in ("Review", "Complete"):
                    if f'"{status}"' in formula:
                        style = differential_styles[int(rule.attrib["dxfId"])]
                        color = style.find("main:fill/main:patternFill/main:fgColor", NS)
                        status_colors[status] = color.attrib["rgb"][-6:]
            self.assertEqual(
                status_colors,
                {"Review": "FEF3C7", "Complete": "D1FAE5"},
            )

    def test_trial_balance_review_uses_required_source_and_control_formulas(self):
        path = FILES / "trial-balance-review-workpaper-template.xlsx"
        self.assertTrue(path.is_file(), path)
        with zipfile.ZipFile(path) as archive:
            review = worksheet_xml(archive, "Review")
            expected = {
                "H6": 'IF(B6="","",D6-E6)',
                "I6": 'IF(B6="","",F6-G6)',
                "J6": 'IF(B6="","",H6-I6)',
                "K6": 'IF(B6="","",IF(I6=0,IF(H6=0,"","New"),J6/ABS(I6)))',
                "N6": 'IF(B6="","",H6+M6)',
                "O6": 'IF(B6="","",IF(L6="Unresolved","Unresolved",IF(OR(C6="",L6=""),"Unmapped","OK")))',
                "P6": 'IF(B6="","",IF(OR(AND(OR(C6="Asset",C6="Expense"),H6<0),AND(OR(C6="Liability",C6="Equity",C6="Revenue"),H6>0)),"Unusual","OK"))',
                "Q6": 'IF(B6="","",IF(AND(ABS(J6)>=\'Start Here\'!$B$10,IFERROR(ABS(K6)>=\'Start Here\'!$B$11,TRUE)),"Review","OK"))',
                "R6": 'IF(B6="","",IF(O6="Unresolved","Unresolved",IF(OR(O6<>"OK",P6<>"OK",Q6<>"OK"),"Review","Complete")))',
            }
            for address, expected_formula in expected.items():
                actual = worksheet_cell(review, address).findtext("main:f", namespaces=NS)
                self.assertEqual(actual, expected_formula, address)
            for row in range(6, 106):
                for column in "ABCDEFGH":
                    if column == "H":
                        continue
                    address = f"{column}{row}"
                    formula = worksheet_cell(review, address).findtext("main:f", namespaces=NS)
                    self.assertIn("'Start Here'!$B$8", formula, address)
                for column in "LMS":
                    address = f"{column}{row}"
                    formula = worksheet_cell(review, address).findtext("main:f", namespaces=NS)
                    self.assertIn("'Start Here'!$B$8", formula, address)

    def test_trial_balance_input_modes_and_summary_controls_are_exact(self):
        path = FILES / "trial-balance-review-workpaper-template.xlsx"
        self.assertTrue(path.is_file(), path)
        with zipfile.ZipFile(path) as archive:
            paste = worksheet_xml(archive, "Paste Import")
            manual = worksheet_xml(archive, "Manual Input")
            for row in range(6, 106):
                for column in "ABCDEFGHIJ":
                    address = f"{column}{row}"
                    paste_cell = next((cell for cell in paste.findall(".//main:c", NS) if cell.attrib.get("r") == address), None)
                    manual_cell = next((cell for cell in manual.findall(".//main:c", NS) if cell.attrib.get("r") == address), None)
                    self.assertEqual(
                        ET.tostring(paste_cell) if paste_cell is not None else None,
                        ET.tostring(manual_cell) if manual_cell is not None else None,
                        address,
                    )
            summary = worksheet_xml(archive, "Summary")
            expected = {
                "B9": (None, "450000"),
                "D9": (None, "450000"),
                "F9": (None, "0"),
                "B12": (None, "395000"),
                "D12": (None, "395000"),
                "F12": (None, "0"),
                "B15": (None, "0"),
                "D15": (None, "0"),
                "F15": (None, "9"),
                "B18": (None, "1"),
                "D18": (None, "1"),
                "F18": (None, "1"),
                "H18": (None, "10"),
                "H5": ("str", "Review"),
            }
            for address, (cell_type, cached_value) in expected.items():
                cell = worksheet_cell(summary, address)
                self.assertEqual(cell.attrib.get("t"), cell_type, address)
                self.assertEqual(cell.findtext("main:v", namespaces=NS), cached_value, address)

    def test_trial_balance_all_sheets_are_visible_and_mode_is_lists_backed(self):
        path = FILES / "trial-balance-review-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            workbook = ET.fromstring(archive.read("xl/workbook.xml"))
            sheets = workbook.findall("main:sheets/main:sheet", NS)
            self.assertEqual([sheet.attrib["name"] for sheet in sheets], SHEETS)
            self.assertTrue(all(sheet.attrib.get("state", "visible") == "visible" for sheet in sheets))
            start = worksheet_xml(archive, "Start Here")
            validation = next(
                item for item in start.findall(".//main:dataValidation", NS)
                if "B8" in item.attrib["sqref"].split()
            )
            self.assertEqual(validation.findtext("main:formula1", namespaces=NS), "'Lists'!$D$2:$D$3")

    def test_trial_balance_current_and_prior_samples_balance(self):
        path = FILES / "trial-balance-review-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            for sheet_name in ("Paste Import", "Manual Input"):
                sheet = worksheet_xml(archive, sheet_name)
                totals = {
                    column: sum(float(cell_value(archive, sheet, f"{column}{row}") or 0) for row in range(6, 106))
                    for column in "DEFGI"
                }
                self.assertEqual(totals["D"], totals["E"], sheet_name)
                self.assertEqual(totals["F"], totals["G"], sheet_name)
                self.assertEqual(totals["I"], 0, sheet_name)
                adjustments = [
                    float(cell_value(archive, sheet, f"I{row}") or 0)
                    for row in range(6, 106)
                ]
                self.assertTrue(any(value > 0 for value in adjustments), sheet_name)
                self.assertTrue(any(value < 0 for value in adjustments), sheet_name)

    def test_trial_balance_all_review_formulas_are_filled_and_safe(self):
        path = FILES / "trial-balance-review-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            review = worksheet_xml(archive, "Review")
            for row in range(6, 106):
                expected = {
                    "H": f'IF(B{row}="","",D{row}-E{row})',
                    "I": f'IF(B{row}="","",F{row}-G{row})',
                    "J": f'IF(B{row}="","",H{row}-I{row})',
                    "K": f'IF(B{row}="","",IF(I{row}=0,IF(H{row}=0,"","New"),J{row}/ABS(I{row})))',
                    "N": f'IF(B{row}="","",H{row}+M{row})',
                    "O": f'IF(B{row}="","",IF(L{row}="Unresolved","Unresolved",IF(OR(C{row}="",L{row}=""),"Unmapped","OK")))',
                    "P": f'IF(B{row}="","",IF(OR(AND(OR(C{row}="Asset",C{row}="Expense"),H{row}<0),AND(OR(C{row}="Liability",C{row}="Equity",C{row}="Revenue"),H{row}>0)),"Unusual","OK"))',
                    "Q": f'IF(B{row}="","",IF(AND(ABS(J{row})>=\'Start Here\'!$B$10,IFERROR(ABS(K{row})>=\'Start Here\'!$B$11,TRUE)),"Review","OK"))',
                    "R": f'IF(B{row}="","",IF(O{row}="Unresolved","Unresolved",IF(OR(O{row}<>"OK",P{row}<>"OK",Q{row}<>"OK"),"Review","Complete")))',
                }
                for column, expected_formula in expected.items():
                    self.assertEqual(formula_text(review, f"{column}{row}"), expected_formula, f"{column}{row}")
            for name in archive.namelist():
                if not name.startswith("xl/worksheets/sheet") or not name.endswith(".xml"):
                    continue
                xml = ET.fromstring(archive.read(name))
                for node in xml.findall(".//main:f", NS):
                    formula = node.text or ""
                    self.assertNotRegex(formula.upper(), r"\b(?:INDIRECT|OFFSET)\s*\(", formula)
                    self.assertNotRegex(formula, r"(?<![A-Z0-9_])\$?[A-Z]{1,3}:\$?[A-Z]{1,3}(?![A-Z0-9_])", formula)

    def test_trial_balance_cached_samples_and_summary_include_unresolved(self):
        path = FILES / "trial-balance-review-workpaper-template.xlsx"
        with zipfile.ZipFile(path) as archive:
            review = worksheet_xml(archive, "Review")
            cached = {
                column: [cell_value(archive, review, f"{column}{row}") for row in range(6, 106)]
                for column in "KOPQR"
            }
            self.assertIn("New", cached["K"])
            self.assertIn("Unmapped", cached["O"])
            self.assertIn("Unresolved", cached["O"])
            self.assertIn("Unusual", cached["P"])
            self.assertIn("Review", cached["Q"])
            self.assertIn("Complete", cached["R"])
            self.assertIn("Unresolved", cached["R"])

            summary = worksheet_xml(archive, "Summary")
            expected = {
                "B9": ("SUM('Review'!$D$6:$D$105)", "450000"),
                "D9": ("SUM('Review'!$E$6:$E$105)", "450000"),
                "F9": ("B9-D9", "0"),
                "B12": ("SUM('Review'!$F$6:$F$105)", "395000"),
                "D12": ("SUM('Review'!$G$6:$G$105)", "395000"),
                "F12": ("B12-D12", "0"),
                "B15": ("SUM('Review'!$M$6:$M$105)", "0"),
                "D15": ("F9+B15", "0"),
                "F15": ('COUNTIF(\'Review\'!$Q$6:$Q$105,"Review")', "9"),
                "B18": ('COUNTIF(\'Review\'!$P$6:$P$105,"Unusual")', "1"),
                "D18": ('COUNTIF(\'Review\'!$O$6:$O$105,"Unmapped")', "1"),
                "F18": ('COUNTIF(\'Review\'!$R$6:$R$105,"Unresolved")', "1"),
                "H18": ('COUNTIF(\'Review\'!$R$6:$R$105,"Review")+COUNTIF(\'Review\'!$R$6:$R$105,"Unresolved")', "10"),
            }
            for address, (expected_formula, expected_value) in expected.items():
                cell = worksheet_cell(summary, address)
                self.assertEqual(cell.findtext("main:f", namespaces=NS), expected_formula, address)
                self.assertEqual(cell.findtext("main:v", namespaces=NS), expected_value, address)

    def test_trial_balance_publication_manifest_guards_hashes_and_review_width(self):
        manifest_path = FILES / "trial-balance-review-workpaper-template.verification.json"
        self.assertTrue(manifest_path.is_file(), manifest_path)
        manifest = json.loads(manifest_path.read_text())
        xlsx_path = FILES / "trial-balance-review-workpaper-template.xlsx"
        cover_path = COVERS / "trial-balance-review-workpaper-template.png"
        self.assertEqual(manifest["xlsx"]["scratch_sha256"], manifest["xlsx"]["published_sha256"])
        self.assertEqual(manifest["xlsx"]["published_sha256"], sha256(xlsx_path))
        self.assertEqual(manifest["cover"]["scratch_sha256"], manifest["cover"]["published_sha256"])
        self.assertEqual(manifest["cover"]["published_sha256"], sha256(cover_path))
        self.assertGreaterEqual(manifest["renders"]["Review"]["width"], 2600)
        self.assertGreaterEqual(manifest["renders"]["Review"]["height"], 900)

    def test_all_review_renders_have_durable_natural_width_evidence(self):
        minimum_widths = {
            "monthly-financial-statement-review-template": 1900,
            "bank-reconciliation-workpaper-template": 1700,
            "trial-balance-review-workpaper-template": 2600,
        }
        for slug, minimum_width in minimum_widths.items():
            with self.subTest(slug=slug):
                manifest_path = FILES / f"{slug}.verification.json"
                self.assertTrue(manifest_path.is_file(), manifest_path)
                manifest = json.loads(manifest_path.read_text())
                self.assertGreaterEqual(manifest["renders"]["Review"]["width"], minimum_width)
                self.assertGreaterEqual(manifest["renders"]["Review"]["height"], 900)
                if slug == "trial-balance-review-workpaper-template":
                    self.assertGreaterEqual(manifest["renders"]["Paste Import"]["width"], 1600)
                    self.assertGreaterEqual(manifest["renders"]["Manual Input"]["width"], 1600)


if __name__ == "__main__":
    unittest.main()
