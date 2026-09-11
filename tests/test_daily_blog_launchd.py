"""Contracts for the versioned macOS LaunchAgent integration."""

import plistlib
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LABEL = "ai.ujjwalks.blog-pipeline.app"
CANONICAL_REPO = "/Users/ujjwal/finboard/app"


class LaunchdContractTest(unittest.TestCase):
    def test_plist_contract(self):
        with (ROOT / f"ops/launchd/{LABEL}.plist").open("rb") as handle:
            plist = plistlib.load(handle)
        self.assertEqual(plist["Label"], LABEL)
        self.assertEqual(plist["StartCalendarInterval"], {"Hour": 12, "Minute": 10})
        self.assertEqual(plist["ProgramArguments"], ["/bin/bash", f"{CANONICAL_REPO}/scripts/daily-blog.sh"])
        self.assertEqual(plist["WorkingDirectory"], CANONICAL_REPO)
        self.assertEqual(plist["ProcessType"], "Background")
        self.assertNotIn("RunAtLoad", plist)
        self.assertEqual(plist["StandardOutPath"], "/Users/ujjwal/Library/Logs/finboard-blog-pipeline/stdout.log")
        self.assertEqual(plist["StandardErrorPath"], "/Users/ujjwal/Library/Logs/finboard-blog-pipeline/stderr.log")

    def test_shell_scripts_parse(self):
        for relative in ("scripts/daily-blog.sh", "scripts/install-daily-blog-launchd.sh"):
            result = subprocess.run(["/bin/bash", "-n", str(ROOT / relative)], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)

    def test_wrapper_does_not_print_environment_or_swallow_exit_code(self):
        source = (ROOT / "scripts/daily-blog.sh").read_text()
        self.assertNotIn("printenv", source)
        self.assertNotIn("env |", source)
        self.assertIn("exec /usr/bin/python3", source)

    def test_installer_validates_before_copy_and_never_triggers_job(self):
        source = (ROOT / "scripts/install-daily-blog-launchd.sh").read_text()
        self.assertLess(source.index("plutil -lint"), source.index("cp "))
        self.assertIn("launchctl bootstrap", source)
        self.assertIn("launchctl print", source)
        self.assertNotIn("kickstart", source)


if __name__ == "__main__":
    unittest.main()
