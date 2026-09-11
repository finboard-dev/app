"""Contracts for the versioned macOS LaunchAgent integration."""

import plistlib
import os
import shutil
import subprocess
import tempfile
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

    def test_wrapper_does_not_print_environment_and_propagates_exit_code(self):
        source = (ROOT / "scripts/daily-blog.sh").read_text()
        self.assertNotIn("printenv", source)
        self.assertNotIn("env |", source)
        self.assertIn("exec /usr/bin/python3", source)
        with tempfile.TemporaryDirectory() as directory:
            runner = Path(directory) / "runner.py"
            runner.write_text("import sys\nprint(' '.join(sys.argv[1:]))\nraise SystemExit(37)\n")
            result = subprocess.run(
                ["/bin/bash", str(ROOT / "scripts/daily-blog.sh"), "--test-runner", str(runner)],
                capture_output=True,
                text=True,
            )
        self.assertEqual(result.returncode, 37)
        self.assertEqual(result.stdout.strip(), "--repo /Users/ujjwal/finboard/app")

    def test_installer_is_repeatable_and_never_triggers_job(self):
        with tempfile.TemporaryDirectory() as directory:
            temp = Path(directory)
            repo = temp / "repo"
            user_root = temp / "user"
            plist_dir = repo / "ops/launchd"
            plist_dir.mkdir(parents=True)
            shutil.copyfile(ROOT / f"ops/launchd/{LABEL}.plist", plist_dir / f"{LABEL}.plist")
            bin_dir = temp / "bin"
            bin_dir.mkdir()
            calls = temp / "launchctl.calls"
            launchctl = bin_dir / "launchctl"
            launchctl.write_text("#!/bin/bash\necho \"$*\" >> \"$TEST_LAUNCHCTL_LOG\"\nexit 0\n")
            launchctl.chmod(0o700)
            env = dict(os.environ)
            env.update({
                "BLOG_PIPELINE_REPO": str(repo),
                "BLOG_PIPELINE_USER_ROOT": str(user_root),
                "TEST_LAUNCHCTL_LOG": str(calls),
                "PATH": f"{bin_dir}:{env['PATH']}",
            })
            installer = ROOT / "scripts/install-daily-blog-launchd.sh"
            first = subprocess.run(["/bin/bash", str(installer)], env=env, capture_output=True, text=True)
            second = subprocess.run(["/bin/bash", str(installer)], env=env, capture_output=True, text=True)
            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertEqual(second.returncode, 0, second.stderr)
            installed = user_root / f"Library/LaunchAgents/{LABEL}.plist"
            self.assertEqual(installed.read_bytes(), (plist_dir / f"{LABEL}.plist").read_bytes())
            self.assertEqual(installed.stat().st_mode & 0o777, 0o600)
            lines = calls.read_text().splitlines()
        self.assertEqual(len(lines), 6)
        for offset in (0, 3):
            self.assertTrue(lines[offset].startswith("bootout gui/"))
            self.assertTrue(lines[offset + 1].startswith("bootstrap gui/"))
            self.assertTrue(lines[offset + 2].startswith("print gui/"))
        self.assertFalse(any(any(word in line for word in ("kickstart", " start ", "submit")) for line in lines))


if __name__ == "__main__":
    unittest.main()
