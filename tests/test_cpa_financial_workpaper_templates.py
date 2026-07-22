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


if __name__ == "__main__":
    unittest.main()
