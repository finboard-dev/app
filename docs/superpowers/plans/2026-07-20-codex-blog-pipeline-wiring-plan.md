# Codex Blog Pipeline Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Claude's scheduled research and Codex's interactive Slack review/deployment operate as one correlated, documented, and testable blog/template pipeline.

**Architecture:** Claude remains the launchd research worker and writes run files without Slack access. Codex discovers the same canonical skill, receives pending-run context at session start, uses its Slack connector for review messages, persists the returned message timestamp, and reads only that message's thread before advancing a gate. Repository-local context and deployment files make the app self-describing and deployable.

**Tech Stack:** Markdown agent instructions, Python 3 standard library, Slack Web API semantics, POSIX shell, Git, launchd, Codex skills/hooks.

## Global Constraints

- Do not store Slack webhooks, bot tokens, OAuth tokens, or connector credentials in the repository or local pipeline environment files.
- Preserve the managed `<claude-mem-context>` block in `AGENTS.md` exactly.
- Do not modify or commit unrelated untracked files, including `package-lock.json` and pending run files except when a pipeline state transition requires it.
- Keep `/Users/ujjwal/self/blog-pipeline` as the single canonical skill implementation for Claude and Codex.
- Scheduled research remains on headless Claude; Slack review and deployment remain interactive Codex actions.
- Never advance a human gate without a reply from the correlated Slack thread.
- Never deploy without human content approval, current publish dates, successful validation, and daily-cap checks.

---

### Task 1: Add app-specific context for both runtimes

**Files:**
- Create: `CLAUDE.md`
- Create: `CONTEXT.md`
- Modify: `AGENTS.md`
- Create: `tests/test_agent_context.py`

**Interfaces:**
- Consumes: parent `/Users/ujjwal/finboard/CLAUDE.md` and `/Users/ujjwal/finboard/AGENTS.md`.
- Produces: app-local instructions that identify the Next.js frontend, filesystem content, pipeline state, validation commands, and Claude/Codex runtime boundary.

- [ ] **Step 1: Write the failing context test**

```python
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class AgentContextTest(unittest.TestCase):
    def test_required_context_files_describe_pipeline_boundary(self):
        for name in ("CLAUDE.md", "AGENTS.md", "CONTEXT.md"):
            self.assertTrue((ROOT / name).is_file(), name)
        agents = (ROOT / "AGENTS.md").read_text()
        context = (ROOT / "CONTEXT.md").read_text()
        self.assertIn("<claude-mem-context>", agents)
        self.assertIn("scheduled research", context.lower())
        self.assertIn("interactive", context.lower())
        self.assertIn("frontend/content/blog", context)
        self.assertIn("frontend/content/templates", context)
```

- [ ] **Step 2: Run the test and verify RED**

Run: `python3 -m unittest tests.test_agent_context -v`

Expected: FAIL because `CLAUDE.md` and `CONTEXT.md` do not exist.

- [ ] **Step 3: Write the minimal context files**

`CLAUDE.md` and `AGENTS.md` must state:

```markdown
# FinBoard Marketing App

Read `CONTEXT.md` before changing application code or the content pipeline.
Parent monorepo instructions still apply. For this app, filesystem content in
`frontend/content/blog` and `frontend/content/templates` is authoritative.
```

`AGENTS.md` must append the existing managed memory block unchanged. `CONTEXT.md` must document the current Next.js application, JSON blog/template formats, `.blog-pipeline/config.json`, run-state gates, Claude research ownership, Codex Slack ownership, validation commands, daily caps, and deployment prerequisites.

- [ ] **Step 4: Run the focused and repository tests**

Run: `python3 -m unittest tests.test_agent_context -v`

Expected: PASS.

Run: `git diff --check -- CLAUDE.md AGENTS.md CONTEXT.md tests/test_agent_context.py`

Expected: no output.

- [ ] **Step 5: Commit the context boundary**

```bash
git add CLAUDE.md AGENTS.md CONTEXT.md tests/test_agent_context.py
git commit -m "docs: add app agent context"
```

### Task 2: Require Slack thread correlation in the canonical skill

**Files:**
- Modify: `/Users/ujjwal/self/blog-pipeline/tests/test_channels.py`
- Modify: `/Users/ujjwal/self/blog-pipeline/scripts/channels/slack.py`
- Modify: `/Users/ujjwal/self/blog-pipeline/SKILL.md`

**Interfaces:**
- Consumes: `run["channel"]["threadTs"]` recorded from an interactive Slack connector post.
- Produces: `SlackChannel.read_reply(run, cfg) -> str | None`, scoped to `conversations.replies` for that exact thread.

- [ ] **Step 1: Add failing correlation tests**

Add tests asserting that `read_reply` raises `ChannelError` when `threadTs` is absent, calls `https://slack.com/api/conversations.replies` with `channel` and `ts`, ignores the root bot post and bot replies, and returns the newest human reply in the correlated thread.

```python
def test_read_reply_requires_thread_timestamp(self):
    with self.assertRaises(ChannelError) as ctx:
        self._read([], run=make_run())
    self.assertIn("threadTs", str(ctx.exception))

def test_read_reply_uses_correlated_thread(self):
    run = make_run()
    run["channel"] = {"posted": True, "threadTs": "123.456"}
    messages = [
        {"bot_id": "B01", "ts": "123.456", "text": "topics"},
        {"user": "U42", "ts": "123.789", "text": "1,2"},
    ]
    self.assertEqual(self._read(messages, run=run), "1,2")
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `python3 -m unittest /Users/ujjwal/self/blog-pipeline/tests/test_channels.py -v`

Expected: FAIL because the adapter currently scans `conversations.history` and accepts runs without `threadTs`.

- [ ] **Step 3: Implement the minimal correlated reader**

Replace the history endpoint with:

```python
CONVERSATIONS_REPLIES_URL = "https://slack.com/api/conversations.replies"

thread_ts = run.get("channel", {}).get("threadTs")
if not thread_ts:
    raise ChannelError("run channel.threadTs is required to read Slack approval replies")
params = {"channel": channel_id, "ts": str(thread_ts), "limit": str(HISTORY_LIMIT)}
```

Iterate returned messages in reverse chronological order, ignore bot/subtype messages and the root message at `threadTs`, and return the newest remaining non-empty human text. Update `SKILL.md` so connector posts must save `channelId`, `messageTs`, `threadTs`, `postedAt`, and `via` before any read.

- [ ] **Step 4: Run the canonical skill suite**

Run: `python3 -m unittest discover -s /Users/ujjwal/self/blog-pipeline/tests -v`

Expected: all tests PASS.

- [ ] **Step 5: Commit the canonical skill fix**

```bash
git -C /Users/ujjwal/self/blog-pipeline add SKILL.md scripts/channels/slack.py tests/test_channels.py
git -C /Users/ujjwal/self/blog-pipeline commit -m "fix: correlate Slack approvals to review threads"
```

### Task 3: Add a connector-safe review-post recorder

**Files:**
- Create: `/Users/ujjwal/self/blog-pipeline/scripts/record_review_post.py`
- Create: `/Users/ujjwal/self/blog-pipeline/tests/test_record_review_post.py`
- Modify: `/Users/ujjwal/self/blog-pipeline/SKILL.md`

**Interfaces:**
- Consumes: `record_review_post.py <repo> <run-id> <message-ts> --via codex-slack-connector` and config `reviewChannel.slack.channelId`.
- Produces: persisted `run.channel` with `posted`, `channelId`, `messageTs`, `threadTs`, `postedAt`, and `via`.

- [ ] **Step 1: Write failing recorder tests**

Use a temporary target repo with a valid config and run file. Assert `record_review_post.record(...)` writes the exact metadata, treats `messageTs` as `threadTs`, preserves topics/history, and rejects an empty timestamp.

```python
channel = record(repo, "2026-07-20", "123.456", "codex-slack-connector")
self.assertEqual(channel["threadTs"], "123.456")
self.assertEqual(channel["channelId"], "C123456")
self.assertTrue(channel["posted"])
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `python3 -m unittest /Users/ujjwal/self/blog-pipeline/tests/test_record_review_post.py -v`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the recorder**

Implement `record(repo_path, run_id, message_ts, via, now=None)` using `config.load_config`, `runstate.load_run`, and `runstate.save_run`. Reject missing runs, empty timestamps, and non-Slack configs. The CLI prints only `recorded Slack review post for <run-id>` and never prints connector data beyond the non-secret timestamp already stored in the run.

- [ ] **Step 4: Update connector instructions and run tests**

Add the exact command to `SKILL.md` immediately after connector posting instructions. Run:

`python3 -m unittest discover -s /Users/ujjwal/self/blog-pipeline/tests -v`

Expected: all tests PASS.

- [ ] **Step 5: Commit the recorder**

```bash
git -C /Users/ujjwal/self/blog-pipeline add SKILL.md scripts/record_review_post.py tests/test_record_review_post.py
git -C /Users/ujjwal/self/blog-pipeline commit -m "feat: record connector Slack review threads"
```

### Task 4: Register the canonical skill for Codex

**Files:**
- Create symlink: `/Users/ujjwal/.agents/skills/blog-pipeline` -> `/Users/ujjwal/self/blog-pipeline`

**Interfaces:**
- Consumes: canonical skill directory.
- Produces: Codex skill discovery without copying or forking skill content.

- [ ] **Step 1: Verify the missing registration**

Run: `test -L /Users/ujjwal/.agents/skills/blog-pipeline`

Expected: non-zero exit status.

- [ ] **Step 2: Create the narrow symlink**

Run: `ln -s /Users/ujjwal/self/blog-pipeline /Users/ujjwal/.agents/skills/blog-pipeline`

Expected: no output.

- [ ] **Step 3: Verify both runtimes resolve the same source**

Run: `readlink /Users/ujjwal/.agents/skills/blog-pipeline && readlink /Users/ujjwal/.claude/skills/blog-pipeline`

Expected: both lines equal `/Users/ujjwal/self/blog-pipeline`.

### Task 5: Install the guarded blog/template deploy script

**Files:**
- Create: `scripts/blog-deploy.sh`
- Create: `tests/test_blog_deploy_script.py`

**Interfaces:**
- Consumes: `scripts/blog-deploy.sh <YYYY-MM-DD> [blog|templates]`.
- Produces: merge/push from `blog/draft-<date>` or `template/draft-<date>` into `main` through `origin`.

- [ ] **Step 1: Write failing script-contract tests**

```python
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "blog-deploy.sh"


class DeployScriptTest(unittest.TestCase):
    def test_script_exists_and_has_no_template_tokens(self):
        self.assertTrue(SCRIPT.is_file())
        self.assertNotIn("{{", SCRIPT.read_text())

    def test_shell_syntax(self):
        result = subprocess.run(["bash", "-n", str(SCRIPT)], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_invalid_content_type_is_rejected_before_git(self):
        result = subprocess.run(["bash", str(SCRIPT), "2026-07-20", "pages"], capture_output=True, text=True)
        self.assertEqual(result.returncode, 2)
        self.assertIn("blog or templates", result.stderr)
```

- [ ] **Step 2: Run the test and verify RED**

Run: `python3 -m unittest tests.test_blog_deploy_script -v`

Expected: FAIL because the script is missing.

- [ ] **Step 3: Render the script with explicit branch selection**

Create a Bash script with `set -euo pipefail`, fixed repository path `/Users/ujjwal/finboard/app`, remote `origin`, target `main`, and this selection:

```bash
CONTENT_TYPE="${2:-blog}"
case "$CONTENT_TYPE" in
  blog) DRAFT_BRANCH="blog/draft-${DATE}" ;;
  templates) DRAFT_BRANCH="template/draft-${DATE}" ;;
  *) echo "error: content type must be blog or templates" >&2; exit 2 ;;
esac
```

It must validate the date, refuse a dirty tree, fetch `origin`, verify `refs/remotes/origin/$DRAFT_BRANCH`, switch to `main`, fast-forward from `origin/main`, merge `origin/$DRAFT_BRANCH` with `--no-ff`, and push `main`. It must not run `vercel deploy`; the Git push remains the production trigger.

- [ ] **Step 4: Verify tests and script permissions**

Run: `chmod +x scripts/blog-deploy.sh`

Run: `python3 -m unittest tests.test_blog_deploy_script -v`

Expected: PASS.

Run: `bash scripts/blog-deploy.sh bad-date`

Expected: exit 2 before any Git mutation.

- [ ] **Step 5: Commit the deployment machinery**

```bash
git add scripts/blog-deploy.sh tests/test_blog_deploy_script.py
git commit -m "feat: add guarded content deploy script"
```

### Task 6: Verify scheduler, memory runtime, connector readiness, and pending runs

**Files:**
- Modify only if a legal state transition occurs: `.blog-pipeline/runs/2026-07-20.json`
- Modify only if a legal state transition occurs: `.blog-pipeline/runs/2026-07-20-templates.json`

**Interfaces:**
- Consumes: launchd job, Codex hook, Slack connector availability, pending run files.
- Produces: evidence-backed readiness report; correlated Slack posts only when the connector is actually available.

- [ ] **Step 1: Run all local verification**

Run:

```bash
python3 -m unittest discover -s tests -v
python3 -m unittest discover -s /Users/ujjwal/self/blog-pipeline/tests -v
python3 /Users/ujjwal/self/blog-pipeline/scripts/config.py /Users/ujjwal/finboard/app
python3 /Users/ujjwal/self/blog-pipeline/scripts/runstate.py /Users/ujjwal/finboard/app 2026-07-20
python3 /Users/ujjwal/self/blog-pipeline/scripts/runstate.py /Users/ujjwal/finboard/app 2026-07-20-templates
npx claude-mem status
launchctl print gui/$(id -u)/ai.ujjwalks.blog-pipeline.app
```

Expected: tests pass, config is valid, both current runs remain at `awaiting_topic_approval` until Slack posting succeeds, claude-mem is running, and launchd reports last exit code 0.

- [ ] **Step 2: Check the interactive Slack connector**

Query the current Codex tool inventory for Slack post and thread-read operations. If absent, report the connector setup blocker and do not change either run. If present, post each numbered list to channel `C09E0C9G8TW`, capture each returned timestamp, and run `record_review_post.py` for the corresponding run.

- [ ] **Step 3: Re-read saved run state**

Run: `jq '.status, .channel' .blog-pipeline/runs/2026-07-20.json .blog-pipeline/runs/2026-07-20-templates.json`

Expected after successful connector posts: `posted` is true and every channel object has `channelId`, `messageTs`, and `threadTs`. Expected without a connector: files remain unchanged with `posted:false`.

- [ ] **Step 4: Inspect the approved July 19 deployment without mutating Git**

Run: `git status --short` and validate both draft files from `origin/blog/draft-2026-07-19` using temporary copies. Confirm the daily blog cap for 2026-07-20 before any deploy attempt. Do not deploy if the main working tree is dirty or the connector cannot post confirmation.

### Task 7: Upgrade and verify the Vercel CLI separately

**Files:**
- No repository files.

**Interfaces:**
- Consumes: global npm installation permission.
- Produces: `vercel` CLI version `56.3.2` or newer.

- [ ] **Step 1: Record the current version**

Run: `vercel --version`

Expected before upgrade: `52.0.0`.

- [ ] **Step 2: Upgrade with explicit machine-level approval**

Run: `npm i -g vercel@latest`

Expected: successful global package update.

- [ ] **Step 3: Verify the upgraded version and project linkage**

Run: `vercel --version && test -f .vercel/project.json`

Expected: version `56.3.2` or newer and exit status 0.

### Task 8: Final verification and handoff

**Files:**
- No additional files unless verification exposes a documented defect.

**Interfaces:**
- Consumes: all previous task outputs.
- Produces: final status separating completed local wiring from external Slack authorization.

- [ ] **Step 1: Run whitespace and status checks**

Run: `git diff --check && git status --short --branch`

Expected: no whitespace errors; only known user-owned or pending-run changes remain.

- [ ] **Step 2: Run all relevant tests again**

Run: `python3 -m unittest discover -s tests -v && python3 -m unittest discover -s /Users/ujjwal/self/blog-pipeline/tests -v`

Expected: all tests PASS with no warnings or errors.

- [ ] **Step 3: Report precise operational state**

Report the app commit SHAs, canonical skill commit SHAs, scheduler status, memory-worker status, Vercel version, connector availability, pending run states, and any action the user must complete in the Slack connector UI.
