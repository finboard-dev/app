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
