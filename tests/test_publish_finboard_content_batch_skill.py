import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / ".agents" / "skills" / "publish-finboard-content-batch"
SKILL_MD = SKILL / "SKILL.md"
CADENCE = SKILL / "scripts" / "check_batch_day.py"
CLEANER = SKILL / "scripts" / "clean_plain_text.py"
FORBIDDEN = ("\u2014", "\u2013", "\u2022", "\u2192", "\u2605", "\u2713", "\u2705")


def run_cadence(runs_dir, current_date):
    result = subprocess.run(
        [sys.executable, str(CADENCE), "--runs-dir", str(runs_dir), "--date", current_date],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


class PublishFinboardContentBatchSkillTest(unittest.TestCase):
    def test_required_skill_files_exist(self):
        required = [
            SKILL_MD,
            SKILL / "agents" / "openai.yaml",
            CADENCE,
            CLEANER,
            SKILL / "references" / "research-and-scoring.md",
            SKILL / "references" / "repository-contract.md",
        ]
        for path in required:
            with self.subTest(path=path):
                self.assertTrue(path.is_file(), path)

    def test_skill_metadata_and_operational_contract(self):
        text = SKILL_MD.read_text()
        self.assertTrue(text.startswith("---\nname: publish-finboard-content-batch\n"))
        self.assertIn("description: Use when", text)
        self.assertIn("Asia Kolkata", text)
        self.assertIn("Blog 1", text)
        self.assertLess(text.index("Blog 1"), text.index("Template 1"))
        self.assertLess(text.index("Template 1"), text.index("Blog 2"))
        self.assertLess(text.index("Blog 2"), text.index("Template 2"))
        self.assertIn("FinBoard Team", text)
        self.assertIn("https://www.linkedin.com/company/finboard-ai-native-finance", text)
        self.assertIn("one atomic batch commit", text)
        self.assertIn("push directly to origin/main", text)
        self.assertIn("Do not run test suites", text)
        self.assertIn("Do not publish a partial batch", text)
        self.assertIn("Clean every visible field immediately before copying", text)

    def test_openai_metadata_has_required_interface(self):
        text = (SKILL / "agents" / "openai.yaml").read_text()
        self.assertIn('display_name: "Publish FinBoard Content Batch"', text)
        self.assertIn('short_description: "Research and publish four FinBoard content items"', text)
        self.assertIn("$publish-finboard-content-batch", text)

    def test_cadence_allows_first_and_two_day_batches(self):
        with tempfile.TemporaryDirectory() as tmp:
            runs = Path(tmp)
            self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "no_previous_batch")
            (runs / "2026-07-20.json").write_text(json.dumps({"publicationDate": "2026-07-20"}))
            decision = run_cadence(runs, "2026-07-22")
            self.assertTrue(decision["eligible"])
            self.assertEqual(decision["reason"], "eligible_publish_day")

    def test_cadence_stops_same_day_and_skip_day(self):
        with tempfile.TemporaryDirectory() as tmp:
            runs = Path(tmp)
            (runs / "2026-07-22.json").write_text(json.dumps({"publicationDate": "2026-07-22"}))
            self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "already_published_today")
            self.assertEqual(run_cadence(runs, "2026-07-23")["reason"], "skip_day")

    def test_plain_text_cleaner_removes_decorative_characters(self):
        source = "Review \u2014 Summary \u2022 Ready \u2192 publish \u2705"
        result = subprocess.run(
            [sys.executable, str(CLEANER)],
            input=source,
            capture_output=True,
            text=True,
            check=True,
        )
        self.assertEqual(result.stdout.strip(), "Review - Summary Ready publish")

    def test_skill_package_has_no_forbidden_characters_or_placeholders(self):
        for path in SKILL.rglob("*"):
            if not path.is_file() or path.suffix not in {".md", ".py", ".yaml"}:
                continue
            text = path.read_text()
            for token in FORBIDDEN:
                self.assertNotIn(token, text, f"{token!r} in {path}")
            for token in ("TO" + "DO", "T" + "BD", "FIX" + "ME"):
                self.assertNotIn(token, text, path)


if __name__ == "__main__":
    unittest.main()
