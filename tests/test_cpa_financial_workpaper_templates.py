import struct
import unittest
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = ROOT / "frontend" / "public" / "template-files"
COVERS = ROOT / "frontend" / "public" / "templates" / "covers"
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
            self.assertEqual(cell_value(archive, start, "A9"), "Review Date")
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
                "O6": 'IF(B6="","",IF(OR(C6="",L6=""),"Unmapped","OK"))',
                "P6": 'IF(B6="","",IF(OR(AND(OR(C6="Asset",C6="Expense"),H6<0),AND(OR(C6="Liability",C6="Equity",C6="Revenue"),H6>0)),"Unusual","OK"))',
                "Q6": 'IF(B6="","",IF(AND(ABS(J6)>=\'Start Here\'!$B$10,IFERROR(ABS(K6)>=\'Start Here\'!$B$11,TRUE)),"Review","OK"))',
                "R6": 'IF(B6="","",IF(OR(O6<>"OK",P6<>"OK",Q6<>"OK"),"Review","Complete"))',
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
                "B12": (None, "0"),
                "D12": (None, "0"),
                "F12": (None, "9"),
                "B15": (None, "1"),
                "D15": (None, "1"),
                "F15": (None, "9"),
                "H5": ("str", "Review"),
            }
            for address, (cell_type, cached_value) in expected.items():
                cell = worksheet_cell(summary, address)
                self.assertEqual(cell.attrib.get("t"), cell_type, address)
                self.assertEqual(cell.findtext("main:v", namespaces=NS), cached_value, address)


if __name__ == "__main__":
    unittest.main()
