"""Pure boundaries used by the deterministic daily blog runner."""

import datetime as dt
import json
import os
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from daily_blog import (
    build_codex_argv,
    build_failure_message,
    build_success_message,
    CommandResult,
    resolve_skill_root,
    run_daily,
    sanitize_model_env,
    validate_changed_paths,
)

ROOT = Path(__file__).resolve().parents[1]
SKILL_ROOT = Path(os.environ.get("BLOG_PIPELINE_TEST_SKILL_ROOT", "/Users/ujjwal/self/blog-pipeline"))
FIXED_NOW = dt.datetime(2026, 9, 9, 12, 10, tzinfo=dt.timezone(dt.timedelta(hours=5, minutes=30)))


class DailyBlogPureTest(unittest.TestCase):
    def test_codex_model_has_live_search_and_read_only_access(self):
        schema = Path("/schema with spaces.json")
        argv = build_codex_argv(Path("/app with spaces"), Path("/skill"), schema)
        self.assertEqual(argv[:3], ["codex", "--search", "exec"])
        self.assertEqual(argv[argv.index("--sandbox") + 1], "read-only")
        self.assertEqual(argv[argv.index("--output-schema") + 1], str(schema))
        self.assertEqual(argv[argv.index("-C") + 1], "/app with spaces")
        self.assertIn("--ephemeral", argv)
        self.assertIn("--ignore-user-config", argv)
        self.assertNotIn("--add-dir", argv)
        instruction = argv[-1]
        self.assertIn("/skill/SKILL.md", instruction)
        self.assertIn("/app with spaces", instruction)
        self.assertIn("daily-auto", instruction)
        self.assertIn("read-only inspection commands", instruction)
        self.assertIn("Do not write files", instruction)
        self.assertNotIn("Do not run shell commands", instruction)

    def test_model_environment_is_allowlisted_and_excludes_slack(self):
        env = {
            "PATH": "/bin", "HOME": "/home/runner", "LANG": "en_US.UTF-8",
            "CODEX_HOME": "/home/runner/.codex", "CODEX_API_KEY": "model-key",
            "BLOG_PIPELINE_SLACK_WEBHOOK": "webhook-secret",
            "BLOG_PIPELINE_SLACK_BOT_TOKEN": "bot-secret",
            "SLACK_TOKEN": "other-slack-secret", "GH_TOKEN": "git-secret",
            "AWS_SECRET_ACCESS_KEY": "cloud-secret", "UNLISTED_SETTING": "unknown",
            "ANTHROPIC_BASE_URL": "https://untrusted.invalid",
        }
        snapshot = dict(env)
        self.assertEqual(sanitize_model_env(env, {"BLOG_PIPELINE_SLACK_WEBHOOK"}), {
            "PATH": "/bin", "HOME": "/home/runner", "LANG": "en_US.UTF-8",
            "CODEX_HOME": "/home/runner/.codex", "CODEX_API_KEY": "model-key",
        })
        self.assertEqual(env, snapshot)

    def test_explicit_secret_names_override_the_allowlist(self):
        self.assertEqual(sanitize_model_env({"PATH": "/bin", "CODEX_API_KEY": "secret"}, {"CODEX_API_KEY"}), {"PATH": "/bin"})

    def test_skill_root_defaults_to_canonical_and_accepts_override(self):
        self.assertEqual(resolve_skill_root({}), Path("/Users/ujjwal/self/blog-pipeline"))
        self.assertEqual(resolve_skill_root({"BLOG_PIPELINE_SKILL_ROOT": "/private/tmp/test-skill"}), Path("/private/tmp/test-skill"))

    def test_changed_paths_must_equal_article_and_cover(self):
        expected = {"frontend/content/blog/a.json", "frontend/public/blog/covers/a.png"}
        self.assertEqual(validate_changed_paths(expected, expected), [])
        self.assertEqual(validate_changed_paths(expected, expected | {"frontend/src/app/page.jsx"}), ["unexpected changed path: frontend/src/app/page.jsx"])
        self.assertEqual(validate_changed_paths(expected, {"frontend/content/blog/a.json"}), ["missing expected changed path: frontend/public/blog/covers/a.png"])

    def test_reports_all_path_differences_in_stable_order(self):
        self.assertEqual(validate_changed_paths({"article", "cover"}, {"z", "a"}), [
            "unexpected changed path: a", "unexpected changed path: z",
            "missing expected changed path: article", "missing expected changed path: cover",
        ])

    def test_success_message_contains_clickable_live_and_commit_links(self):
        message = build_success_message("A useful article", "https://finboard.ai/blog/a", "https://github.com/finboard-dev/app/commit/abc", "abc", "2026-09-08 12:18 IST")
        self.assertIn("A useful article", message)
        self.assertIn("<https://finboard.ai/blog/a|Read the article>", message)
        self.assertIn("<https://github.com/finboard-dev/app/commit/abc|abc>", message)
        self.assertIn("2026-09-08 12:18 IST", message)

    def test_failure_message_contains_stage_error_and_log_without_live_claim(self):
        message = build_failure_message("validating", "Content failed validation", Path("/logs/stderr.log"))
        for detail in ("validating", "Content failed validation", "/logs/stderr.log"):
            self.assertIn(detail, message)
        for unverified_claim in ("Live post:", "Read the article", "Published:", "Commit:"):
            self.assertNotIn(unverified_claim, message)

    def test_failure_after_commit_links_commit_but_does_not_claim_publication(self):
        message = build_failure_message("verifying", "Sitemap did not contain slug", Path("/logs/stderr.log"), "https://github.com/finboard-dev/app/commit/abc", "abc")
        self.assertIn("<https://github.com/finboard-dev/app/commit/abc|abc>", message)
        self.assertIn("not verified", message)
        self.assertNotIn("Live post:", message)
        self.assertNotIn("Published:", message)


class FakeEffects:
    def __init__(self):
        self.lock_available = True
        self.lock_error = None
        self.dirty = set()
        self.model_calls = 0
        self.commands = []
        self.notifications = []
        self.fetches = []
        self.page_status = 200
        self.sitemap_body = ""
        self.fail_commands = set()
        self.fail_after_commit = set()
        self.lock = object()
        self.local_head = "base123"
        self.remote_head = "base123"
        self.committed = False
        self.model_output = ""
        self.model_schema = None
        self.model_schema_path = None
        self.after_merge = None

    def acquire_lock(self, path):
        if self.lock_error:
            raise self.lock_error
        return self.lock if self.lock_available else None

    def release_lock(self, handle):
        pass

    def run(self, argv, cwd, env=None):
        argv = list(argv)
        self.commands.append((argv, dict(env) if env is not None else None))
        signature = tuple(argv)
        if self.committed and signature in self.fail_after_commit:
            return CommandResult(1, "", "planned failure")
        if signature in self.fail_commands:
            return CommandResult(1, "", "planned failure")
        if argv[:3] == ["git", "branch", "--show-current"]:
            return CommandResult(0, "main\n", "")
        if argv[:3] == ["git", "status", "--porcelain"]:
            generated = set(self.dirty)
            for relative in (
                "frontend/content/blog/quickbooks-ai-control-matrix.json",
                "frontend/public/blog/covers/quickbooks-ai-control-matrix.png",
            ):
                if (cwd / relative).exists():
                    generated.add(relative)
            return CommandResult(0, "".join(f"?? {path}\n" for path in sorted(generated)), "")
        if len(argv) > 1 and argv[1].endswith("gen_cover.py"):
            Path(argv[3]).parent.mkdir(parents=True, exist_ok=True)
            Path(argv[3]).write_bytes(b"png")
            return CommandResult(0, "cover written\n", "")
        if argv[:4] == ["git", "diff", "--cached", "--name-only"]:
            return CommandResult(0, "frontend/content/blog/quickbooks-ai-control-matrix.json\nfrontend/public/blog/covers/quickbooks-ai-control-matrix.png\n", "")
        if argv[:3] == ["git", "rev-parse", "HEAD"]:
            return CommandResult(0, ("abcdef1234567890" if self.committed else self.local_head) + "\n", "")
        if argv[:2] == ["git", "rev-parse"] and argv[2] == "origin/main":
            return CommandResult(0, self.remote_head + "\n", "")
        if argv[:3] == ["git", "merge", "--ff-only"] and self.after_merge:
            self.after_merge(cwd)
        if argv[:3] == ["git", "remote", "get-url"]:
            return CommandResult(0, "git@github.com:finboard-dev/app.git\n", "")
        if argv[:3] == ["codex", "--search", "exec"]:
            self.model_calls += 1
            self.model_schema_path = Path(argv[argv.index("--output-schema") + 1])
            self.model_schema = json.loads(self.model_schema_path.read_text())
            return CommandResult(0, self.model_output, "")
        if argv[:2] == ["git", "commit"]:
            self.committed = True
        return CommandResult(0, "", "")

    def fetch(self, url):
        self.fetches.append(url)
        if url.endswith("sitemap.xml"):
            return 200, self.sitemap_body
        return self.page_status, "page"

    def notify(self, kind, message, cfg):
        self.notifications.append((kind, message))

    def sleep(self, seconds):
        pass

    def now(self):
        return FIXED_NOW


class DailyBlogOrchestrationTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.repo = Path(self.temp.name)
        (self.repo / ".blog-pipeline/runs").mkdir(parents=True)
        cfg = json.loads((ROOT / ".blog-pipeline/config.json").read_text())
        cfg["target"]["repoPath"] = str(self.repo)
        cfg["automation"]["validationCommands"] = [["check"]]
        (self.repo / ".blog-pipeline/config.json").write_text(json.dumps(cfg))
        content = self.repo / "frontend/content/blog"
        content.mkdir(parents=True)
        for slug in (
            "designing-and-implementing-comprehensive-internal-control-procedures-for-prepaid-expenses-amortization",
            "top-5-tools-for-consolidation-in-quickbooks-online",
        ):
            (content / f"{slug}.json").write_text("{}")
        self.fixture = self.repo / "fixture.json"
        shutil.copyfile(ROOT / "tests/fixtures/daily-blog-publish.json", self.fixture)
        fixture_payload = json.loads(self.fixture.read_text())
        fixture_blog = fixture_payload["structured_output"]["blog"]
        fixture_blog["date"] = "2026-09-09"
        posting = fixture_blog["structuredData"]["@graph"][0]
        posting["datePublished"] = "2026-09-09"
        posting["dateModified"] = "2026-09-09"
        self.fixture.write_text(json.dumps(fixture_payload))
        self.previous_skill_root = os.environ.get("BLOG_PIPELINE_SKILL_ROOT")
        os.environ["BLOG_PIPELINE_SKILL_ROOT"] = str(SKILL_ROOT)
        self.effects = FakeEffects()
        self.effects.sitemap_body = "<urlset><url><loc>https://finboard.ai/blog/quickbooks-ai-control-matrix</loc></url></urlset>"

    def tearDown(self):
        if self.previous_skill_root is None:
            os.environ.pop("BLOG_PIPELINE_SKILL_ROOT", None)
        else:
            os.environ["BLOG_PIPELINE_SKILL_ROOT"] = self.previous_skill_root
        self.temp.cleanup()

    def execute(self, **kwargs):
        return run_daily(self.repo, FIXED_NOW, self.effects, artifact_file=self.fixture, **kwargs)

    def state(self):
        return json.loads((self.repo / ".blog-pipeline/runs/2026-09-09-auto.json").read_text())

    def test_lock_held_stops_before_model_or_git(self):
        self.effects.lock_available = False
        outcome = self.execute()
        self.assertEqual(outcome.status, "skipped_locked")
        self.assertEqual(self.effects.commands, [])
        self.assertFalse((self.repo / ".blog-pipeline/runs/2026-09-09-auto.json").exists())

    def test_lock_skip_does_not_poison_later_winning_run(self):
        self.effects.lock_available = False
        self.assertEqual(self.execute().status, "skipped_locked")
        self.effects.lock_available = True
        self.assertEqual(self.execute(dry_run=True).status, "dry_run_validated")

    def test_lock_loser_cannot_mutate_an_active_run_even_with_bad_gates(self):
        state_path = self.repo / ".blog-pipeline/runs/2026-09-09-auto.json"
        state_path.write_text(json.dumps({"date": "2026-09-09-auto", "status": "selecting", "history": [], "topics": [], "selected": [], "drafted": [], "deploy": {}}))
        cfg_path = self.repo / ".blog-pipeline/config.json"
        cfg = json.loads(cfg_path.read_text())
        cfg["gates"] = {"topicApproval": "manual", "contentApproval": "manual"}
        cfg_path.write_text(json.dumps(cfg))
        self.effects.lock_available = False
        self.assertEqual(self.execute().status, "skipped_locked")
        self.assertEqual(json.loads(state_path.read_text())["status"], "selecting")

    def test_lock_acquisition_error_cannot_mutate_an_active_run(self):
        state_path = self.repo / ".blog-pipeline/runs/2026-09-09-auto.json"
        state_path.write_text(json.dumps({"date": "2026-09-09-auto", "status": "selecting", "history": [], "topics": [], "selected": [], "drafted": [], "deploy": {}}))
        self.effects.lock_error = PermissionError("lock denied")
        self.assertEqual(self.execute().status, "failed")
        self.assertEqual(json.loads(state_path.read_text())["status"], "selecting")

    def test_manual_gates_cannot_publish(self):
        cfg_path = self.repo / ".blog-pipeline/config.json"
        cfg = json.loads(cfg_path.read_text())
        cfg["gates"] = {"topicApproval": "manual", "contentApproval": "manual"}
        cfg_path.write_text(json.dumps(cfg))
        self.assertEqual(self.execute().status, "failed")
        self.assertFalse(any(command[0][:2] == ["git", "push"] for command in self.effects.commands))

    def test_same_day_article_stops_before_git_and_model(self):
        (self.repo / "frontend/content/blog/today.json").write_text('{"date":"2026-09-09"}')
        outcome = self.execute()
        self.assertEqual(outcome.status, "already_published")
        self.assertEqual(self.effects.commands, [])

    def test_same_day_article_fetched_during_preflight_stops_before_model(self):
        def add_upstream_article(repo):
            (repo / "frontend/content/blog/upstream.json").write_text('{"date":"2026-09-09"}')
        self.effects.after_merge = add_upstream_article
        outcome = self.execute()
        self.assertEqual(outcome.status, "already_published")
        self.assertEqual(self.effects.model_calls, 0)

    def test_local_commits_ahead_of_remote_are_not_pushed(self):
        self.effects.local_head = "local-ahead"
        self.effects.remote_head = "origin-main"
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertFalse(any(command[0][:2] == ["git", "push"] for command in self.effects.commands))

    def test_dirty_worktree_fails_without_generation(self):
        self.effects.dirty.add("user-notes.txt")
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertFalse((self.repo / "frontend/content/blog/quickbooks-ai-control-matrix.json").exists())
        self.assertEqual(self.effects.notifications[0][0], "failure")

    def test_malformed_artifact_fails_before_writes(self):
        self.fixture.write_text("not-json")
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertFalse((self.repo / "frontend/content/blog/quickbooks-ai-control-matrix.json").exists())

    def test_nothing_publishable_is_a_clean_terminal_outcome(self):
        self.fixture.write_text(json.dumps({"structured_output": {"outcome": "nothing_publishable", "reason": "No candidate met the configured score"}}))
        outcome = self.execute()
        self.assertEqual(outcome.status, "nothing_publishable")
        self.assertEqual(outcome.exit_code, 0)
        self.assertEqual(self.effects.notifications[-1][0], "nothing_publishable")

    def test_validation_command_failure_removes_only_generated_files(self):
        keep = self.repo / "keep.txt"
        keep.write_text("mine")
        self.effects.fail_commands.add(("check",))
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertEqual(keep.read_text(), "mine")
        self.assertFalse((self.repo / "frontend/content/blog/quickbooks-ai-control-matrix.json").exists())
        self.assertEqual(self.state()["validation"]["commands"], [{"argv": ["check"], "returncode": 1}])

    def test_unexpected_generated_path_prevents_commit(self):
        self.effects.dirty.add("unexpected.txt")
        # Let the first cleanliness check pass, then inject at validation time.
        original = self.effects.run
        calls = {"status": 0}
        def staged_dirty(argv, cwd, env=None):
            if list(argv)[:3] == ["git", "status", "--porcelain"]:
                calls["status"] += 1
                if calls["status"] == 1:
                    saved = self.effects.dirty
                    self.effects.dirty = set()
                    result = original(argv, cwd, env)
                    self.effects.dirty = saved
                    return result
            return original(argv, cwd, env)
        self.effects.run = staged_dirty
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertFalse(any(command[0][:2] == ["git", "commit"] for command in self.effects.commands))

    def test_dry_run_validates_and_removes_generated_paths_without_commit_or_success(self):
        outcome = self.execute(dry_run=True)
        self.assertEqual(outcome.status, "dry_run_validated")
        self.assertFalse((self.repo / "frontend/content/blog/quickbooks-ai-control-matrix.json").exists())
        self.assertFalse(any(command[0][:2] == ["git", "commit"] for command in self.effects.commands))
        self.assertEqual(self.effects.notifications, [])

    def test_push_failure_does_not_claim_live_publication(self):
        self.effects.fail_commands.add(("git", "push", "origin", "HEAD:main"))
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertEqual(outcome.commit, "abcdef1234567890")
        message = self.effects.notifications[-1][1]
        self.assertIn("deployment not verified", message)
        self.assertNotIn("Read the article", message)

    def test_failed_push_retry_remains_failed_instead_of_claiming_published(self):
        self.effects.fail_commands.add(("git", "push", "origin", "HEAD:main"))
        self.assertEqual(self.execute().status, "failed")
        command_count = len(self.effects.commands)
        self.assertEqual(self.execute().status, "failed")
        self.assertEqual(len(self.effects.commands), command_count)

    def test_dry_retry_refuses_post_commit_failure_instead_of_claiming_published(self):
        self.effects.fail_commands.add(("git", "push", "origin", "HEAD:main"))
        self.assertEqual(self.execute().status, "failed")
        self.effects.fail_commands.clear()
        command_count = len(self.effects.commands)
        outcome = self.execute(dry_run=True, retry_failed=True)
        self.assertEqual(outcome.status, "failed")
        self.assertEqual(outcome.exit_code, 1)
        self.assertEqual(len(self.effects.commands), command_count)
        self.assertEqual(self.state()["status"], "failed")

    def test_missing_sitemap_after_page_success_fails_without_live_claim(self):
        self.effects.sitemap_body = "<urlset></urlset>"
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertIn("not verified", self.effects.notifications[-1][1])
        self.assertNotIn("Read the article", self.effects.notifications[-1][1])

    def test_sitemap_requires_exact_location_not_slug_prefix(self):
        self.effects.sitemap_body = "<urlset><url><loc>https://finboard.ai/blog/quickbooks-ai-control-matrix-old</loc></url></urlset>"
        self.assertEqual(self.execute().status, "failed")

    def test_failure_after_commit_does_not_delete_staged_or_committed_artifacts(self):
        self.effects.fail_after_commit.add(("git", "rev-parse", "HEAD"))
        outcome = self.execute()
        self.assertEqual(outcome.status, "failed")
        self.assertTrue((self.repo / "frontend/content/blog/quickbooks-ai-control-matrix.json").exists())
        self.assertTrue((self.repo / "frontend/public/blog/covers/quickbooks-ai-control-matrix.png").exists())

    def test_verified_success_pushes_then_posts_clickable_link(self):
        outcome = self.execute()
        self.assertEqual(outcome.status, "published")
        self.assertEqual(outcome.production_url, "https://finboard.ai/blog/quickbooks-ai-control-matrix")
        self.assertEqual(self.effects.notifications[-1][0], "success")
        self.assertIn("<https://finboard.ai/blog/quickbooks-ai-control-matrix|Read the article>", self.effects.notifications[-1][1])
        push_index = next(i for i, value in enumerate(self.effects.commands) if value[0][:2] == ["git", "push"])
        self.assertGreater(len(self.effects.fetches), 0)
        self.assertGreater(push_index, 0)
        self.assertEqual(self.state()["status"], "published")
        self.assertEqual(self.state()["topics"][0]["scores"]["sourceAuthority"], 5)
        self.assertEqual(self.state()["validation"]["commands"], [{"argv": ["check"], "returncode": 0}])

    def test_repeat_after_success_posts_noop_notification(self):
        self.assertEqual(self.execute().status, "published")
        self.effects.commands.clear()
        self.effects.notifications.clear()
        self.assertEqual(self.execute().status, "published")
        self.assertEqual(self.effects.commands, [])
        self.assertEqual(self.effects.notifications[-1][0], "already_published")

    def test_model_path_allows_skill_without_exposing_slack_environment(self):
        artifact = json.loads(self.fixture.read_text())["structured_output"]
        self.effects.model_output = json.dumps({"artifact": json.dumps(artifact)})
        outcome = run_daily(self.repo, FIXED_NOW, self.effects, dry_run=True)
        self.assertEqual(outcome.status, "dry_run_validated")
        model_argv, model_env = next(value for value in self.effects.commands if value[0][:3] == ["codex", "--search", "exec"])
        self.assertEqual(model_argv[model_argv.index("--sandbox") + 1], "read-only")
        self.assertEqual(model_argv[model_argv.index("-C") + 1], str(self.repo.resolve()))
        self.assertEqual(
            self.effects.model_schema,
            {
                "type": "object",
                "additionalProperties": False,
                "required": ["artifact"],
                "properties": {"artifact": {"type": "string"}},
            },
        )
        self.assertFalse(self.effects.model_schema_path.exists())
        instruction = model_argv[-1]
        self.assertIn("local publish date is 2026-09-09", instruction)
        self.assertIn('"minTopicScore":18', instruction)
        self.assertIn('"gates":{"contentApproval":"auto","topicApproval":"auto"}', instruction)
        self.assertNotIn("BLOG_PIPELINE_SLACK_WEBHOOK", model_env)

    def test_nothing_publishable_notifies_dev(self):
        self.fixture.write_text(json.dumps({"structured_output": {"outcome": "nothing_publishable", "reason": "No candidate met the configured score"}}))
        self.assertEqual(self.execute().status, "nothing_publishable")
        self.assertEqual(self.effects.notifications[-1][0], "nothing_publishable")

    def test_dry_run_record_can_transition_to_failed_real_preflight(self):
        self.assertEqual(self.execute(dry_run=True).status, "dry_run_validated")
        self.effects.dirty.add("user-notes.txt")
        self.assertEqual(self.execute().status, "failed")
        self.assertEqual(self.state()["status"], "failed")

    def test_explicit_manual_retry_preserves_failure_history_and_can_validate(self):
        self.effects.dirty.add("user-notes.txt")
        self.assertEqual(self.execute().status, "failed")
        self.effects.dirty.clear()
        outcome = self.execute(dry_run=True, retry_failed=True)
        self.assertEqual(outcome.status, "dry_run_validated")
        events = [entry.get("event") for entry in self.state()["history"]]
        self.assertIn("failed", events)
        self.assertIn("manual_retry_started", events)

    def test_explicit_retry_preserves_prior_validation_evidence(self):
        self.effects.fail_commands.add(("check",))
        self.assertEqual(self.execute().status, "failed")
        self.effects.fail_commands.clear()
        self.assertEqual(self.execute(dry_run=True, retry_failed=True).status, "dry_run_validated")
        attempts = self.state()["validationAttempts"]
        self.assertEqual(attempts[0]["commands"], [{"argv": ["check"], "returncode": 1}])

    def test_explicit_retry_can_recover_precommit_failure_for_real_publication(self):
        self.effects.dirty.add("user-notes.txt")
        self.assertEqual(self.execute().status, "failed")
        self.effects.dirty.clear()
        self.assertEqual(self.execute(retry_failed=True).status, "published")
        self.assertTrue(any(command[0][:2] == ["git", "push"] for command in self.effects.commands))

    def test_configured_timezone_controls_daily_id(self):
        utc_now = dt.datetime(2026, 9, 8, 20, 0, tzinfo=dt.timezone.utc)
        outcome = run_daily(self.repo, utc_now, self.effects, dry_run=True, artifact_file=self.fixture)
        self.assertEqual(outcome.status, "dry_run_validated")
        self.assertTrue((self.repo / ".blog-pipeline/runs/2026-09-09-auto.json").exists())


if __name__ == "__main__":
    unittest.main()
