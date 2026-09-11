# Automated Daily Blog Launchd Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a safe daily macOS LaunchAgent that researches, validates, publishes, verifies, and announces at most one new FinBoard blog at 12:10 PM local time.

**Architecture:** The canonical `/Users/ujjwal/self/blog-pipeline` skill owns editorial policy, topic scoring, artifact shape, and duplicate rules. A deterministic Python runner in the FinBoard `app` repository treats model output as untrusted data and exclusively owns writes, validation, Git, production verification, state, locking, and Slack delivery; the model receives read/search/web tools but no shell, Git, or credentials.

**Tech Stack:** Python 3 standard library and `unittest`, Claude headless CLI structured output, Next.js/Yarn, Git, Vercel's existing Git integration, macOS `launchd`, Slack incoming webhook.

**Spec:** `docs/superpowers/specs/2026-09-08-automated-daily-blog-launchd-design.md`

## Global Constraints

- Publish no more than one blog per `Asia/Kolkata` calendar date and do not backfill missed dates.
- Schedule the LaunchAgent at 12:10 PM local time; Codex does not need to be open.
- Automatic publication is enabled only when both approval gates are exactly `auto`; existing `manual` and `poll` behavior remains intact.
- The model may use only `Read`, `Grep`, `Glob`, `WebSearch`, and `WebFetch`; it may not use Bash, Edit, Git, or Slack credentials.
- Treat model output as untrusted JSON and perform duplicate, schema, path, content, Git, live-page, and sitemap checks deterministically.
- Operate only on `/Users/ujjwal/finboard/app`, branch `main`, and remote `origin`; never reset, stash, clean, delete, or stage unrelated worktree changes.
- Store only Slack environment-variable names in configuration. Never place a webhook value in source, model input, subprocess arguments, state, or logs.
- Stage exactly one article JSON and its generated PNG cover; a validation failure must prevent commit and push.
- Post a success message to `#dev` only after both the article URL and sitemap are verified; include clickable live and commit links.
- Keep business/editorial rules in the skill and keep the application runner generic, functional, and auditable.

---

## File Structure

### Canonical skill repository: `/Users/ujjwal/self/blog-pipeline`

- `SKILL.md` - route `daily-auto` and define the unattended editorial workflow.
- `references/auto-blog-template.md` - FinBoard article structure, sourcing, controls, internal-link, FAQ, and CTA rules.
- `scripts/config.py` - canonical configuration enums and automatic-mode validation.
- `scripts/runstate.py` - canonical unattended states and immutable transition history.
- `scripts/existing.py` - load normalized post records and produce auditable similarity results.
- `scripts/auto_artifact.py` - parse and validate the model's structured envelope without side effects.
- `tests/test_config.py` - gate and automation configuration contract.
- `tests/test_runstate.py` - automatic transition and terminal-state contract.
- `tests/test_existing.py` - exact, semantic, recent-topic, and dated-update duplicate cases.
- `tests/test_auto_artifact.py` - schema, score, source, article, URL, and path validation.
- `tests/test_skill_contract.py` - skill route and editorial-template contract.

### FinBoard app repository: `/Users/ujjwal/finboard/app`

- `.blog-pipeline/config.json` - one-post automation policy and all named runtime values.
- `.gitignore` - ignore local run records without deleting existing records.
- `scripts/daily_blog.py` - deterministic orchestration and effect boundaries.
- `scripts/daily-blog.sh` - minimal environment/bootstrap wrapper invoked by launchd.
- `ops/launchd/ai.ujjwalks.blog-pipeline.app.plist` - versioned LaunchAgent definition.
- `scripts/install-daily-blog-launchd.sh` - validate, install, reload, and inspect the LaunchAgent.
- `tests/test_daily_blog.py` - runner behavior using injected subprocess, HTTP, clock, and notifier functions.
- `tests/test_daily_blog_launchd.py` - wrapper and plist contract.
- `tests/fixtures/daily-blog-publish.json` - deterministic structured model response for dry-run verification.

---

### Task 1: Add explicit automatic configuration mode

**Files:**
- Modify: `/Users/ujjwal/self/blog-pipeline/scripts/config.py`
- Create: `/Users/ujjwal/self/blog-pipeline/tests/test_config.py`

**Interfaces:**
- Consumes: existing `validate_config(cfg: dict) -> list[str]` and `load_config(repo_path) -> dict`.
- Produces: `AUTO_GATE_MODE`, `AUTOMATION_REQUIRED_FIELDS`, and validation that requires both gates to be `auto` together and validates numeric/URL/timezone settings.

- [ ] **Step 1: Write failing configuration tests**

```python
import copy
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

from config import validate_config


BASE = {
    "target": {"repoPath": "/tmp/app", "contentDir": "content/blog", "blogFormat": "json", "categories": ["accounting"], "authors": [{"id": "finboard-team"}]},
    "personas": [{"id": "cfo", "name": "CFO", "pains": ["slow close"], "keywords": ["close"]}],
    "topicsPerRun": 10,
    "blogsPerRun": 1,
    "frequency": "daily",
    "cron": "10 12 * * *",
    "scheduler": "launchd",
    "gates": {"topicApproval": "auto", "contentApproval": "auto"},
    "reviewChannel": {"type": "slack", "slack": {"channelId": "C123", "webhookEnv": "BLOG_WEBHOOK", "botTokenEnv": "BLOG_BOT_TOKEN"}},
    "review": {"mode": "vercel-preview"},
    "deploy": {"mode": "git-push", "remote": "origin", "target": "main"},
    "automation": {
        "timezone": "Asia/Kolkata", "minTopicScore": 18,
        "minSourceAuthority": 4, "similarityThreshold": 0.72,
        "productionBaseUrl": "https://finboard.ai",
        "sitemapUrl": "https://finboard.ai/sitemap.xml",
        "verificationAttempts": 30, "verificationIntervalSeconds": 20,
        "validationCommands": [["python3", "-m", "unittest", "discover", "-s", "tests"], ["yarn", "--cwd", "frontend", "test:unit"], ["yarn", "--cwd", "frontend", "build"]]
    }
}


class AutoConfigTest(unittest.TestCase):
    def test_accepts_complete_auto_config(self):
        self.assertEqual(validate_config(BASE), [])

    def test_rejects_one_automatic_gate(self):
        cfg = copy.deepcopy(BASE)
        cfg["gates"]["contentApproval"] = "manual"
        self.assertIn("gates: automatic mode requires topicApproval and contentApproval to both equal 'auto'", validate_config(cfg))

    def test_rejects_secret_value_and_bad_threshold(self):
        cfg = copy.deepcopy(BASE)
        cfg["reviewChannel"]["slack"]["webhookEnv"] = "https://hooks.slack.com/services/secret"
        cfg["automation"]["similarityThreshold"] = 1.2
        errors = validate_config(cfg)
        self.assertTrue(any("webhookEnv" in error for error in errors))
        self.assertTrue(any("similarityThreshold" in error for error in errors))
```

- [ ] **Step 2: Run the tests and confirm the red state**

Run: `python3 -m unittest discover -s tests -p 'test_config.py' -v` from `/Users/ujjwal/self/blog-pipeline`.

Expected: failure because `auto` is not a valid gate mode and automation fields are not validated.

- [ ] **Step 3: Implement the canonical vocabulary and validation**

```python
AUTO_GATE_MODE = "auto"
GATE_MODES = ("manual", "poll", AUTO_GATE_MODE)
AUTOMATION_REQUIRED_FIELDS = (
    "timezone", "minTopicScore", "minSourceAuthority", "similarityThreshold",
    "productionBaseUrl", "sitemapUrl", "verificationAttempts",
    "verificationIntervalSeconds", "validationCommands",
)


def _validate_automation(cfg: dict, errors: list[str]) -> None:
    gates = cfg.get("gates", {})
    gate_values = (gates.get("topicApproval", "manual"), gates.get("contentApproval", "manual"))
    if AUTO_GATE_MODE in gate_values and gate_values != (AUTO_GATE_MODE, AUTO_GATE_MODE):
        errors.append("gates: automatic mode requires topicApproval and contentApproval to both equal 'auto'")
    if gate_values != (AUTO_GATE_MODE, AUTO_GATE_MODE):
        return
    automation = cfg.get("automation", {})
    for field in AUTOMATION_REQUIRED_FIELDS:
        if field not in automation:
            errors.append(f"automation.{field}: required in automatic mode")
    threshold = automation.get("similarityThreshold")
    if not isinstance(threshold, (int, float)) or not 0 < threshold <= 1:
        errors.append("automation.similarityThreshold: must be greater than 0 and at most 1")
    for field in ("minTopicScore", "minSourceAuthority", "verificationAttempts", "verificationIntervalSeconds"):
        value = automation.get(field)
        if not isinstance(value, int) or value < 1:
            errors.append(f"automation.{field}: must be a positive integer")
    for field in ("productionBaseUrl", "sitemapUrl"):
        value = automation.get(field, "")
        if not isinstance(value, str) or not value.startswith("https://"):
            errors.append(f"automation.{field}: must be an https URL")
    commands = automation.get("validationCommands")
    if not isinstance(commands, list) or not commands or any(not isinstance(command, list) or not command or not all(isinstance(token, str) and token for token in command) for command in commands):
        errors.append("automation.validationCommands: must be a non-empty list of non-empty argv lists")
```

Call `_validate_automation(cfg, errors)` once at the end of `validate_config` before returning errors. Also require `blogsPerRun == 1` whenever both gates equal `auto`.

- [ ] **Step 4: Run the focused and existing skill tests**

Run: `python3 -m unittest discover -s tests -v`.

Expected: all tests pass and manual/poll configurations remain valid.

- [ ] **Step 5: Commit the configuration contract**

```bash
git add scripts/config.py tests/test_config.py
git commit -m "feat: add automatic blog pipeline mode"
```

### Task 2: Add auditable automatic states

**Files:**
- Modify: `/Users/ujjwal/self/blog-pipeline/scripts/runstate.py`
- Create: `/Users/ujjwal/self/blog-pipeline/tests/test_runstate.py`

**Interfaces:**
- Consumes: `create_run`, `load_run`, `save_run`, and `advance`.
- Produces: named automatic states, legal transitions, and `record_event(run, event, at, details) -> dict` that returns a copied run with an appended audit event.

- [ ] **Step 1: Write failing transition and immutability tests**

```python
import unittest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

from runstate import RESEARCHING, SELECTING, FAILED, advance, record_event


class AutoRunStateTest(unittest.TestCase):
    def test_automatic_happy_path_transition_is_legal(self):
        run = {"status": RESEARCHING, "history": []}
        advanced = advance(run, SELECTING, "2026-09-08T12:10:00+05:30")
        self.assertEqual(advanced["status"], SELECTING)

    def test_failure_is_legal_from_non_terminal_state(self):
        run = {"status": SELECTING, "history": []}
        self.assertEqual(advance(run, FAILED)["status"], FAILED)

    def test_record_event_does_not_mutate_input(self):
        run = {"status": SELECTING, "history": []}
        updated = record_event(run, "candidate_scored", "2026-09-08T12:11:00+05:30", {"score": 22})
        self.assertEqual(run["history"], [])
        self.assertEqual(updated["history"][0]["details"]["score"], 22)
```

- [ ] **Step 2: Run the tests and confirm they fail on missing names**

Run: `python3 -m unittest discover -s tests -p 'test_runstate.py' -v`.

Expected: import failure for `SELECTING`, `FAILED`, and `record_event`.

- [ ] **Step 3: Implement the full state graph**

```python
SELECTING = "selecting"
VALIDATING = "validating"
COMMITTING = "committing"
VERIFYING = "verifying"
FAILED = "failed"
NOTHING_PUBLISHABLE = "nothing_publishable"
ALREADY_PUBLISHED = "already_published"
SKIPPED_LOCKED = "skipped_locked"
DRY_RUN_VALIDATED = "dry_run_validated"

AUTO_TERMINAL_STATES = (PUBLISHED, FAILED, NOTHING_PUBLISHABLE, ALREADY_PUBLISHED, SKIPPED_LOCKED, DRY_RUN_VALIDATED)

TRANSITIONS.update({
    RESEARCHING: (AWAITING_TOPIC_APPROVAL, SELECTING, PUBLISHED, FAILED, NOTHING_PUBLISHABLE),
    SELECTING: (DRAFTING, FAILED, NOTHING_PUBLISHABLE),
    DRAFTING: (AWAITING_CONTENT_APPROVAL, VALIDATING, FAILED),
    VALIDATING: (COMMITTING, FAILED, DRY_RUN_VALIDATED),
    COMMITTING: (DEPLOYING, FAILED),
    DEPLOYING: (VERIFYING, PUBLISHED, FAILED),
    VERIFYING: (PUBLISHED, FAILED),
    FAILED: (), NOTHING_PUBLISHABLE: (), ALREADY_PUBLISHED: (), SKIPPED_LOCKED: (), DRY_RUN_VALIDATED: (),
})


def record_event(run: dict, event: str, at: str, details: dict | None = None) -> dict:
    updated = {**run, "history": [*run.get("history", [])]}
    entry = {"event": event, "at": at}
    if details:
        entry["details"] = details
    updated["history"].append(entry)
    return updated
```

Update `advance` to copy the input and append history instead of mutating it. Add every new constant to `STATES`. Permit startup terminal records by adding `create_terminal_run(repo_path, date, status, at, details) -> dict` and restrict its status argument to `ALREADY_PUBLISHED` or `SKIPPED_LOCKED`.

- [ ] **Step 4: Run the full state suite**

Run: `python3 -m unittest discover -s tests -p 'test_runstate.py' -v`.

Expected: all automatic and existing manual transitions pass.

- [ ] **Step 5: Commit the state model**

```bash
git add scripts/runstate.py tests/test_runstate.py
git commit -m "feat: record unattended blog run states"
```

### Task 3: Strengthen duplicate detection

**Files:**
- Modify: `/Users/ujjwal/self/blog-pipeline/scripts/existing.py`
- Modify: `/Users/ujjwal/self/blog-pipeline/tests/test_existing.py`

**Interfaces:**
- Consumes: content directory containing JSON, Markdown, and MDX posts.
- Produces: `PostRecord`, `DuplicateMatch`, `load_post_records(content_dir) -> list[PostRecord]`, and `find_duplicate(candidate, posts, recent_topics, threshold) -> DuplicateMatch | None`; preserves `list_slugs` and `dedupe` compatibility.

- [ ] **Step 1: Add failing exact, semantic, recent, and update tests**

```python
def test_finds_overlap_from_title_excerpt_and_keyword(self):
    posts = [PostRecord("ai-finance-controls", "AI Finance Controls", "How to verify AI output", ("audit trail",))]
    candidate = {"slug": "controls-for-ai-finance", "title": "Controls for AI Finance", "intentSummary": "verify AI finance output with an audit trail", "primaryKeyword": "AI finance controls"}
    match = find_duplicate(candidate, posts, [], 0.50)
    assert match is not None
    assert match.slug == "ai-finance-controls"


def test_rejects_recent_unpublished_topic():
    candidate = {"slug": "quickbooks-chatgpt", "title": "QuickBooks in ChatGPT", "intentSummary": "connect QuickBooks and ChatGPT", "primaryKeyword": "QuickBooks ChatGPT"}
    match = find_duplicate(candidate, [], [{"slug": "quickbooks-in-chatgpt", "title": "QuickBooks inside ChatGPT", "intentSummary": "connect QuickBooks and ChatGPT"}], 0.60)
    assert match is not None
    assert match.source == "recent-run"


def test_dated_material_update_requires_update_framing():
    posts = [PostRecord("quickbooks-ai", "QuickBooks AI", "Available AI features", ("QuickBooks AI",))]
    candidate = {"slug": "quickbooks-ai-2026-update", "title": "QuickBooks AI 2026 Update", "intentSummary": "new July 2026 capabilities", "primaryKeyword": "QuickBooks AI", "materialUpdate": {"date": "2026-07-28", "summary": "transactional actions launched"}}
    assert find_duplicate(candidate, posts, [], 0.40) is None
```

- [ ] **Step 2: Run the duplicate tests and confirm failure**

Run: `python3 -m unittest tests.test_existing -v`.

Expected: failures because record loading and contextual similarity APIs do not exist.

- [ ] **Step 3: Implement normalized records and deterministic comparison**

```python
from dataclasses import dataclass
import json

@dataclass(frozen=True)
class PostRecord:
    slug: str
    title: str
    excerpt: str
    keywords: tuple[str, ...]

@dataclass(frozen=True)
class DuplicateMatch:
    source: str
    slug: str
    title: str
    score: float
    reason: str


def comparison_text(item: dict | PostRecord) -> str:
    if isinstance(item, PostRecord):
        values = (item.slug, item.title, item.excerpt, *item.keywords)
    else:
        values = (item.get("slug", ""), item.get("title", ""), item.get("intentSummary", ""), item.get("primaryKeyword", ""))
    return " ".join(normalize(value).replace("-", " ") for value in values if value)


def find_duplicate(candidate: dict, posts: list[PostRecord], recent_topics: list[dict], threshold: float) -> DuplicateMatch | None:
    candidate_slug = normalize(candidate.get("slug", ""))
    candidate_title = normalize(candidate.get("title", ""))
    candidate_tokens = frozenset(comparison_text(candidate).split())
    matches = []
    for source, item in [("published", post) for post in posts] + [("recent-run", topic) for topic in recent_topics]:
        slug = normalize(item.slug if isinstance(item, PostRecord) else item.get("slug", ""))
        title = normalize(item.title if isinstance(item, PostRecord) else item.get("title", ""))
        score = _jaccard(candidate_tokens, frozenset(comparison_text(item).split()))
        exact = bool(candidate_slug and candidate_slug == slug) or bool(candidate_title and candidate_title == title)
        if exact or score >= threshold:
            matches.append(DuplicateMatch(source, slug, title, 1.0 if exact else score, "exact identity" if exact else "intent overlap"))
    if not matches:
        return None
    closest = max(matches, key=lambda value: value.score)
    update = candidate.get("materialUpdate")
    update_framed = bool(update and re.search(r"\b(update|new|changed|202\d)\b", candidate.get("title", ""), re.IGNORECASE))
    return None if update_framed and closest.reason != "exact identity" else closest
```

Implement `load_post_records` by parsing JSON fields `slug`, `title`, `excerpt`, and `tags`; for Markdown/MDX, parse the existing leading YAML frontmatter with a small key/list reader and fall back to the filename stem. Sort by slug for stable results. Keep `dedupe` delegating to this comparison with its existing return shape.

- [ ] **Step 4: Run all duplicate tests**

Run: `python3 -m unittest tests.test_existing -v`.

Expected: all legacy and new cases pass, and dropped entries report source, closest slug, score, and reason.

- [ ] **Step 5: Commit duplicate analysis**

```bash
git add scripts/existing.py tests/test_existing.py
git commit -m "feat: reject overlapping blog topics"
```

### Task 4: Define and validate the structured daily artifact

**Files:**
- Create: `/Users/ujjwal/self/blog-pipeline/scripts/auto_artifact.py`
- Create: `/Users/ujjwal/self/blog-pipeline/tests/test_auto_artifact.py`

**Interfaces:**
- Consumes: Claude JSON output, publish date, configuration, published records, and recent topics.
- Produces: `ARTIFACT_JSON_SCHEMA`, `parse_claude_output(raw) -> dict`, `validate_artifact(...) -> list[str]`, and `safe_artifact_paths(repo, cfg, artifact) -> tuple[Path, Path]`.

- [ ] **Step 1: Write failing parser and validation tests**

```python
import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

from auto_artifact import parse_claude_output, safe_artifact_paths, validate_artifact


class AutoArtifactTest(unittest.TestCase):
    def test_parses_structured_output_wrapper(self):
        artifact = {"outcome": "nothing_publishable", "reason": "No candidate met 18 points"}
        self.assertEqual(parse_claude_output(json.dumps({"structured_output": artifact})), artifact)

    def test_rejects_low_score_and_non_primary_sources(self):
        artifact = valid_artifact()
        artifact["topic"]["scores"]["sourceAuthority"] = 3
        artifact["topic"]["sources"] = [{"url": "https://example.com/post", "publisher": "Example", "publishedOrUpdated": "2026-09-08", "claim": "A feature launched", "authority": "secondary"}]
        errors = validate_artifact(artifact, AUTO_CONFIG, "2026-09-08", [], [])
        self.assertTrue(any("sourceAuthority" in error for error in errors))
        self.assertTrue(any("primary source" in error for error in errors))

    def test_rejects_path_escape(self):
        artifact = valid_artifact()
        artifact["blog"]["slug"] = "../../outside"
        with self.assertRaises(ValueError):
            safe_artifact_paths(Path("/tmp/app"), AUTO_CONFIG, artifact)
```

Define `valid_artifact()` in the test as a complete `publish` envelope with all five score keys, two HTTPS sources including one `authority: "primary"`, a FinBoard blog object, and `cover: {"tag": "For Finance Teams", "accent": "#2563EB"}`. Its HTML must contain the direct-answer paragraph, dated why-now paragraph, three `h2` sections, a controls section, four visible FAQs, two local links, and one `https://finboard.ai` CTA.

- [ ] **Step 2: Run and confirm the new module is absent**

Run: `python3 -m unittest discover -s tests -p 'test_auto_artifact.py' -v`.

Expected: import failure for `scripts.auto_artifact`.

- [ ] **Step 3: Implement the strict schema and pure validators**

The schema must allow exactly two outcomes. `publish` requires `topic`, `blog`, and `cover`; `nothing_publishable` requires a non-empty `reason`. Set `additionalProperties: false` at the envelope, topic, score, source, and cover levels. Score keys are `freshness`, `audienceFit`, `sourceAuthority`, `searchSharingPotential`, and `productRelevance`, each integer 0 through 5.

```python
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
HEX_RE = re.compile(r"^#[0-9A-Fa-f]{6}$")
SCORE_KEYS = ("freshness", "audienceFit", "sourceAuthority", "searchSharingPotential", "productRelevance")
AUTHOR_NAME = "FinBoard Team"
AUTHOR_ID = "finboard-team"
PUBLISH_OUTCOME = "publish"
NO_TOPIC_OUTCOME = "nothing_publishable"


def parse_claude_output(raw: str) -> dict:
    wrapper = json.loads(raw)
    value = wrapper.get("structured_output")
    if value is None and isinstance(wrapper.get("result"), str):
        value = json.loads(wrapper["result"])
    if not isinstance(value, dict):
        raise ValueError("Claude response has no object structured_output")
    return value


def safe_child(root: Path, relative: Path) -> Path:
    resolved_root = root.resolve()
    resolved = (resolved_root / relative).resolve()
    if resolved_root not in resolved.parents:
        raise ValueError(f"artifact path escapes configured root: {relative}")
    return resolved


def safe_artifact_paths(repo: Path, cfg: dict, artifact: dict) -> tuple[Path, Path]:
    slug = artifact["blog"]["slug"]
    if not SLUG_RE.fullmatch(slug):
        raise ValueError(f"invalid slug: {slug!r}")
    article = safe_child(repo, Path(cfg["target"]["contentDir"]) / f"{slug}.json")
    cover = safe_child(repo, Path("frontend/public/blog/covers") / f"{slug}.png")
    return article, cover
```

`validate_artifact` must check: schema shape; total topic score; source-authority floor; at least two HTTPS sources and one primary source; no duplicate; canonical author; exact publish/modified dates; category membership; slug/cover/canonical URL agreement; BlogPosting plus FAQPage parity; 40-60 word opening; 3-6 `h2` headings; 4-5 matching visible FAQs; 2-4 existing FinBoard local links; one CTA; descriptive alt text; unique cover path; and cleanliness rules from `validate_blog.py`. Return every problem instead of stopping at the first.

- [ ] **Step 4: Run parser, artifact, duplicate, and content tests**

Run: `python3 -m unittest discover -s tests -v`.

Expected: all tests pass.

- [ ] **Step 5: Commit the artifact gate**

```bash
git add scripts/auto_artifact.py tests/test_auto_artifact.py
git commit -m "feat: validate automatic blog artifacts"
```

### Task 5: Add the skill route and reusable editorial template

**Files:**
- Modify: `/Users/ujjwal/self/blog-pipeline/SKILL.md`
- Create: `/Users/ujjwal/self/blog-pipeline/references/auto-blog-template.md`
- Create: `/Users/ujjwal/self/blog-pipeline/tests/test_skill_contract.py`

**Interfaces:**
- Consumes: validated auto configuration and `ARTIFACT_JSON_SCHEMA`.
- Produces: the exact `daily-auto` instruction used by `scripts/daily_blog.py` and a single reusable FinBoard article template.

- [ ] **Step 1: Write a failing contract test**

```python
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]


class SkillContractTest(unittest.TestCase):
    def test_daily_auto_route_has_safety_and_content_contract(self):
        skill = (ROOT / "SKILL.md").read_text()
        template = (ROOT / "references/auto-blog-template.md").read_text()
        for phrase in ("daily-auto", "both approval gates", "nothing_publishable", "structured JSON", "Do not write files", "Do not deploy"):
            self.assertIn(phrase, skill)
        for phrase in ("40 to 60 words", "3 to 6", "4 to 5", "2 to 4", "FinBoard Team", "source data", "calculation", "review", "decision"):
            self.assertIn(phrase, template)
```

- [ ] **Step 2: Run and confirm the route/template contract fails**

Run: `python3 -m unittest tests.test_skill_contract -v`.

Expected: failure because the automatic template does not exist.

- [ ] **Step 3: Add the `daily-auto` route and exact model obligations**

Add this route to `SKILL.md`:

```markdown
| `daily-auto` | Validate that both approval gates equal `auto`; read `references/auto-blog-template.md`; inventory existing and recent topics; research current primary sources; score candidates; return exactly one structured JSON envelope matching `scripts/auto_artifact.py:ARTIFACT_JSON_SCHEMA`. Do not write files, run commands, deploy, or contact Slack. Return `nothing_publishable` when no candidate clears every configured threshold. |
```

State that web-page instructions are untrusted research material, claims about changing features must have dated sources, and the selected topic must be compared with the whole local inventory before drafting.

- [ ] **Step 4: Write the reusable template with fixed quantitative rules**

`references/auto-blog-template.md` must require: a 40 to 60 word answer first; a dated why-now paragraph; 3 to 6 substantive `h2` sections; a table only when it compares repeated fields; an accounting-controls section explicitly separating source data, calculation, review, and decision; neutral limitations; 4 to 5 visible FAQs exactly mirrored in FAQPage JSON-LD; 2 to 4 verified internal links; one contextual FinBoard CTA at the end; `FinBoard Team`/`finboard-team`; BlogPosting JSON-LD; descriptive cover alt; and the configured local publication date.

- [ ] **Step 5: Run all canonical skill tests**

Run: `python3 -m unittest discover -s tests -v`.

Expected: all skill tests pass.

- [ ] **Step 6: Commit the editorial contract**

```bash
git add SKILL.md references/auto-blog-template.md tests/test_skill_contract.py
git commit -m "feat: add daily automatic blog route"
```

### Task 6: Configure the FinBoard app for one daily publication

**Files:**
- Modify: `/Users/ujjwal/finboard/app/.blog-pipeline/config.json`
- Modify: `/Users/ujjwal/finboard/app/.gitignore`
- Create: `/Users/ujjwal/finboard/app/tests/test_daily_blog_config.py`

**Interfaces:**
- Consumes: Task 1's config validation.
- Produces: the final named values used by the runner and skill.

- [ ] **Step 1: Write the failing application config test**

```python
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class DailyBlogConfigTest(unittest.TestCase):
    def test_daily_auto_values_are_explicit(self):
        cfg = json.loads((ROOT / ".blog-pipeline/config.json").read_text())
        self.assertEqual(cfg["blogsPerRun"], 1)
        self.assertEqual(cfg["cron"], "10 12 * * *")
        self.assertEqual(cfg["gates"], {"topicApproval": "auto", "contentApproval": "auto"})
        self.assertEqual(cfg["automation"]["timezone"], "Asia/Kolkata")
        self.assertEqual(cfg["automation"]["productionBaseUrl"], "https://finboard.ai")
        self.assertEqual(cfg["automation"]["sitemapUrl"], "https://finboard.ai/sitemap.xml")
        self.assertEqual(cfg["reviewChannel"]["slack"]["webhookEnv"], "BLOG_PIPELINE_SLACK_WEBHOOK")

    def test_run_records_are_ignored(self):
        self.assertIn(".blog-pipeline/runs/", (ROOT / ".gitignore").read_text().splitlines())
```

- [ ] **Step 2: Run and confirm the existing manual values fail**

Run: `python3 -m unittest tests.test_daily_blog_config -v` from `/Users/ujjwal/finboard/app`.

Expected: failures for two blogs, noon, manual gates, missing automation, and missing ignore entry.

- [ ] **Step 3: Set the final application configuration**

Set `blogsPerRun` to `1`, `cron` to `10 12 * * *`, and both gates to `auto`. Add:

```json
"automation": {
  "timezone": "Asia/Kolkata",
  "minTopicScore": 18,
  "minSourceAuthority": 4,
  "similarityThreshold": 0.72,
  "productionBaseUrl": "https://finboard.ai",
  "sitemapUrl": "https://finboard.ai/sitemap.xml",
  "verificationAttempts": 30,
  "verificationIntervalSeconds": 20,
  "validationCommands": [
    ["python3", "-m", "unittest", "discover", "-s", "tests"],
    ["yarn", "--cwd", "frontend", "test:unit"],
    ["yarn", "--cwd", "frontend", "build"]
  ]
}
```

Add `.blog-pipeline/runs/` to `.gitignore`. Do not remove, rename, stage, or modify any existing run record.

- [ ] **Step 4: Validate with both repositories' tests**

Run: `python3 /Users/ujjwal/self/blog-pipeline/scripts/config.py /Users/ujjwal/finboard/app`.

Expected: `OK` with one blog per run and Slack review channel.

Run: `python3 -m unittest tests.test_daily_blog_config -v`.

Expected: all tests pass.

- [ ] **Step 5: Commit only configuration and ignore changes**

```bash
git add .blog-pipeline/config.json .gitignore tests/test_daily_blog_config.py
git commit -m "config: enable one daily automatic blog"
```

### Task 7: Implement the deterministic runner

**Files:**
- Create: `/Users/ujjwal/finboard/app/scripts/daily_blog.py`
- Create: `/Users/ujjwal/finboard/app/tests/test_daily_blog.py`
- Create: `/Users/ujjwal/finboard/app/tests/fixtures/daily-blog-publish.json`

**Interfaces:**
- Consumes: config loader, state model, duplicate records, artifact schema/validator, `validate_blog.py`, `gen_cover.py`, Git, HTTP, and Slack webhook environment variable.
- Produces: `RunOutcome`, `Effects`, `run_daily(repo, now, effects, dry_run=False, artifact_file=None) -> RunOutcome`, an isolated `YYYY-MM-DD-auto.json` run record, and CLI flags `--repo`, `--dry-run`, `--artifact-file`.

- [ ] **Step 1: Write failing pure-function and idempotency tests**

```python
import datetime as dt
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "scripts"))

from daily_blog import build_claude_argv, build_success_message, sanitize_model_env, validate_changed_paths


class DailyBlogPureTest(unittest.TestCase):
    def test_model_has_only_read_research_tools(self):
        argv = build_claude_argv(Path("/app"), Path("/skill"), "{}")
        self.assertIn("Read,Grep,Glob,WebSearch,WebFetch", argv)
        self.assertNotIn("Bash", " ".join(argv))
        self.assertNotIn("Edit", " ".join(argv))

    def test_model_environment_excludes_slack_secrets(self):
        env = {"PATH": "/bin", "BLOG_PIPELINE_SLACK_WEBHOOK": "secret", "CLAUDE_CODE_OAUTH_TOKEN": "auth"}
        sanitized = sanitize_model_env(env, {"BLOG_PIPELINE_SLACK_WEBHOOK", "BLOG_PIPELINE_SLACK_BOT_TOKEN"})
        self.assertNotIn("BLOG_PIPELINE_SLACK_WEBHOOK", sanitized)
        self.assertEqual(sanitized["CLAUDE_CODE_OAUTH_TOKEN"], "auth")

    def test_changed_paths_must_equal_article_and_cover(self):
        expected = {"frontend/content/blog/a.json", "frontend/public/blog/covers/a.png"}
        self.assertEqual(validate_changed_paths(expected, expected), [])
        self.assertEqual(validate_changed_paths(expected, expected | {"frontend/src/app/page.jsx"}), ["unexpected changed path: frontend/src/app/page.jsx"])

    def test_success_message_contains_clickable_live_and_commit_links(self):
        message = build_success_message("A useful article", "https://finboard.ai/blog/a", "https://github.com/finboard-dev/app/commit/abc", "abc", "2026-09-08 12:18 IST")
        self.assertIn("<https://finboard.ai/blog/a|Read the article>", message)
        self.assertIn("<https://github.com/finboard-dev/app/commit/abc|abc>", message)
```

- [ ] **Step 2: Write failing orchestration tests with injected effects**

Test these cases with a fake `Effects`: lock held; article already exists for the local date; dirty path; malformed model output; `nothing_publishable`; validation command failure; unexpected post-generation path; dry-run; non-fast-forward push failure; page 200 but missing sitemap slug; verified success. Assert model call counts, written paths, Git calls, Slack kind, terminal state, and exit result for each case.

```python
def test_same_day_article_exits_before_model(fake_effects, repo):
    fake_effects.blog_dates = {"2026-09-08"}
    outcome = run_daily(repo, dt.datetime(2026, 9, 8, 12, 10, tzinfo=dt.timezone(dt.timedelta(hours=5, minutes=30))), fake_effects)
    assert outcome.status == "already_published"
    assert fake_effects.model_calls == 0


def test_dry_run_never_commits_pushes_or_posts_success(fake_effects, repo):
    fake_effects.model_result = fixture_text("daily-blog-publish.json")
    outcome = run_daily(repo, FIXED_NOW, fake_effects, dry_run=True)
    assert outcome.status == "validated_dry_run"
    assert fake_effects.commit_calls == []
    assert fake_effects.push_calls == []
    assert fake_effects.success_messages == []
```

- [ ] **Step 3: Run and confirm the runner module is absent**

Run: `python3 -m unittest tests.test_daily_blog -v`.

Expected: import failure for `scripts.daily_blog`.

- [ ] **Step 4: Implement values, protocols, and pure helpers**

```python
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

MODEL_TOOLS = "Read,Grep,Glob,WebSearch,WebFetch"
SKILL_ROOT = Path("/Users/ujjwal/self/blog-pipeline")
AUTO_RUN_SUFFIX = "auto"
SUCCESS = "published"
VALIDATED_DRY_RUN = "validated_dry_run"

@dataclass(frozen=True)
class RunOutcome:
    status: str
    exit_code: int
    slug: str | None = None
    commit: str | None = None
    production_url: str | None = None

@dataclass(frozen=True)
class Effects:
    run: Callable[..., object]
    fetch: Callable[[str], tuple[int, str]]
    notify: Callable[[str, str], None]
    sleep: Callable[[float], None]


def build_claude_argv(repo: Path, skill_root: Path, schema_json: str) -> list[str]:
    instruction = f"Read {skill_root / 'SKILL.md'} completely, then execute its daily-auto route for {repo}. Return structured JSON only."
    return ["claude", "-p", instruction, "--restricted", "--tools", MODEL_TOOLS, "--allowedTools", MODEL_TOOLS, "--json-schema", schema_json, "--output-format", "json"]


def sanitize_model_env(env: dict[str, str], secret_names: set[str]) -> dict[str, str]:
    return {key: value for key, value in env.items() if key not in secret_names}


def build_success_message(title: str, live_url: str, commit_url: str, short_sha: str, completed: str) -> str:
    return "\n".join(("*FinBoard Daily Blog Published*", f"Title: {title}", f"Live post: <{live_url}|Read the article>", f"Commit: <{commit_url}|{short_sha}>", f"Published: {completed}"))
```

- [ ] **Step 5: Implement the orchestration sequence and audit writes**

`run_daily` must execute in this order: non-blocking lock; local date; same-day scan; config validation; branch/remote/worktree checks using `cfg["deploy"]["target"]` and `cfg["deploy"]["remote"]`; fast-forward fetch/merge; recent-run loading; model or fixture invocation; parse; `nothing_publishable` terminal; pre-write artifact validation; article write; cover generation; canonical file validation; configured validation commands; changed-path equality; dry-run terminal with generated paths removed; explicit `git add -- article cover`; staged-path equality; commit; configured push; page polling; sitemap polling; success Slack; published terminal.

Use run id `YYYY-MM-DD-auto` so the automatic audit record never overwrites an existing manual `YYYY-MM-DD.json` or templates record. Every state transition must save a timestamped run event containing only serializable non-secret details. Catch stage errors at the top boundary, save `failed` with `stage` and `error`, post a failure message that includes the log path and commit URL only when a commit exists, and exit non-zero. Do not call Git cleanup commands on any path.

- [ ] **Step 6: Add a complete deterministic fixture**

Create `tests/fixtures/daily-blog-publish.json` in Claude's outer `structured_output` form. Use slug `quickbooks-inside-chatgpt-and-claude`, date `2026-09-08`, canonical author and cover fields, all five scores totaling at least 18, Intuit and QuickBooks HTTPS sources marked primary, content satisfying every template count, BlogPosting JSON-LD, and four FAQ entries matching the visible HTML.

- [ ] **Step 7: Run the runner and skill suites**

Run: `python3 -m unittest tests.test_daily_blog -v` from the app repository.

Expected: all runner cases pass without network, Git mutation, Slack, or Chrome.

Run: `python3 -m unittest discover -s tests -v` from the skill repository.

Expected: all skill tests pass.

- [ ] **Step 8: Commit the deterministic runner**

```bash
git add scripts/daily_blog.py tests/test_daily_blog.py tests/fixtures/daily-blog-publish.json
git commit -m "feat: orchestrate safe daily blog publishing"
```

### Task 8: Add the launchd wrapper, plist, and installer

**Files:**
- Create: `/Users/ujjwal/finboard/app/scripts/daily-blog.sh`
- Create: `/Users/ujjwal/finboard/app/ops/launchd/ai.ujjwalks.blog-pipeline.app.plist`
- Create: `/Users/ujjwal/finboard/app/scripts/install-daily-blog-launchd.sh`
- Create: `/Users/ujjwal/finboard/app/tests/test_daily_blog_launchd.py`

**Interfaces:**
- Consumes: `scripts/daily_blog.py --repo /Users/ujjwal/finboard/app`.
- Produces: LaunchAgent label `ai.ujjwalks.blog-pipeline.app`, 12:10 schedule, fixed log files, and repeatable installer.

- [ ] **Step 1: Write failing plist and shell contract tests**

```python
import plistlib
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class LaunchdContractTest(unittest.TestCase):
    def test_plist_contract(self):
        with (ROOT / "ops/launchd/ai.ujjwalks.blog-pipeline.app.plist").open("rb") as handle:
            plist = plistlib.load(handle)
        self.assertEqual(plist["Label"], "ai.ujjwalks.blog-pipeline.app")
        self.assertEqual(plist["StartCalendarInterval"], {"Hour": 12, "Minute": 10})
        self.assertEqual(plist["ProgramArguments"], ["/bin/bash", "/Users/ujjwal/finboard/app/scripts/daily-blog.sh"])
        self.assertEqual(plist["WorkingDirectory"], "/Users/ujjwal/finboard/app")
        self.assertTrue(plist["StandardOutPath"].endswith("/Library/Logs/finboard-blog-pipeline/stdout.log"))

    def test_shell_scripts_parse(self):
        for relative in ("scripts/daily-blog.sh", "scripts/install-daily-blog-launchd.sh"):
            result = subprocess.run(["/bin/bash", "-n", str(ROOT / relative)], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
```

- [ ] **Step 2: Run and confirm missing-file failures**

Run: `python3 -m unittest tests.test_daily_blog_launchd -v`.

Expected: failure because the wrapper and versioned plist do not exist.

- [ ] **Step 3: Create the minimal runtime wrapper**

```bash
#!/bin/bash
set -eu

REPO="/Users/ujjwal/finboard/app"
ENV_FILE="/Users/ujjwal/.blog-pipeline.env"
LOG_DIR="/Users/ujjwal/Library/Logs/finboard-blog-pipeline"

mkdir -p "$LOG_DIR"
if [ -f "$ENV_FILE" ]; then
  set -a
  . "$ENV_FILE"
  set +a
fi
exec /usr/bin/python3 "$REPO/scripts/daily_blog.py" --repo "$REPO"
```

The wrapper must not echo its environment and must let the Python exit code reach launchd.

- [ ] **Step 4: Create the plist and installer**

The plist must use the exact label, arguments, working directory, hour, minute, stdout, and stderr asserted by the test, plus `ProcessType` set to `Background`. Do not set `RunAtLoad`; a reload must not create an extra publication attempt.

The installer must run `plutil -lint` on the versioned plist, create the log directory, copy the plist to `/Users/ujjwal/Library/LaunchAgents/ai.ujjwalks.blog-pipeline.app.plist`, boot out the existing label if present, bootstrap the new plist into `gui/$(id -u)`, and print `launchctl print gui/$(id -u)/ai.ujjwalks.blog-pipeline.app`. It must not trigger the job.

- [ ] **Step 5: Run contract checks**

Run: `python3 -m unittest tests.test_daily_blog_launchd -v`.

Expected: all tests pass.

Run: `plutil -lint ops/launchd/ai.ujjwalks.blog-pipeline.app.plist`.

Expected: `OK`.

- [ ] **Step 6: Commit the launchd integration**

```bash
git add scripts/daily-blog.sh scripts/install-daily-blog-launchd.sh ops/launchd/ai.ujjwalks.blog-pipeline.app.plist tests/test_daily_blog_launchd.py
git commit -m "feat: schedule daily blog publication"
```

### Task 9: Verify locally, install, and perform the first real run

**Files:**
- Verify: `/Users/ujjwal/finboard/app`
- Install: `/Users/ujjwal/Library/LaunchAgents/ai.ujjwalks.blog-pipeline.app.plist`
- Inspect: `/Users/ujjwal/Library/Logs/finboard-blog-pipeline/stdout.log`
- Inspect: `/Users/ujjwal/Library/Logs/finboard-blog-pipeline/stderr.log`

**Interfaces:**
- Consumes: all prior tasks plus an authenticated Claude CLI, Git push access, Vercel Git deployment, and `BLOG_PIPELINE_SLACK_WEBHOOK` in `/Users/ujjwal/.blog-pipeline.env`.
- Produces: a loaded 12:10 LaunchAgent and one verified production article with Slack `#dev` notification.

- [ ] **Step 1: Run every deterministic test and production build**

Run: `python3 -m unittest discover -s tests -v` from `/Users/ujjwal/self/blog-pipeline`.

Expected: all tests pass.

Run: `python3 -m unittest discover -s tests -v` from `/Users/ujjwal/finboard/app`.

Expected: all application tests pass.

Run: `yarn --cwd frontend test:unit` from `/Users/ujjwal/finboard/app`.

Expected: exit 0.

Run: `yarn --cwd frontend build` from `/Users/ujjwal/finboard/app`.

Expected: exit 0 with the sitemap and blog routes generated.

- [ ] **Step 2: Run a fixture-backed dry run**

Run:

```bash
/usr/bin/python3 scripts/daily_blog.py --repo /Users/ujjwal/finboard/app --dry-run --artifact-file tests/fixtures/daily-blog-publish.json
```

Expected: `validated_dry_run`, no commit, no push, no Slack success, and no generated article or cover left in the worktree.

- [ ] **Step 3: Confirm real-run prerequisites without exposing secrets**

Run `claude -p 'Reply with OK only' --output-format json` and require exit 0. Run `git status --short` and require no paths after ignored run records disappear from status. Load `/Users/ujjwal/.blog-pipeline.env` in a shell and use `${BLOG_PIPELINE_SLACK_WEBHOOK:+set}` to confirm the result is `set`; never print the variable value.

- [ ] **Step 4: Install and inspect the LaunchAgent**

Run: `/bin/bash scripts/install-daily-blog-launchd.sh`.

Expected: `plutil` succeeds and `launchctl print` shows `ai.ujjwalks.blog-pipeline.app` with hour 12 and minute 10.

- [ ] **Step 5: Trigger one real run through launchd**

Run: `launchctl kickstart -k gui/$(id -u)/ai.ujjwalks.blog-pipeline.app`.

Expected: the process starts once. Poll `launchctl print` and both log files until the run reaches a terminal state. Do not trigger it again on the same date.

- [ ] **Step 6: Verify publication and notification evidence**

Read the day's `.blog-pipeline/runs/YYYY-MM-DD-auto.json` and require `status: published`, one article path, one cover path, validation results, commit SHA, production URL, sitemap result, and Slack result. Use `curl` to require HTTP 200 from the production URL and require its slug in `https://finboard.ai/sitemap.xml`. Confirm the Slack message in `#dev` contains the title, clickable `Read the article` link, linked short commit, and local publication time.

- [ ] **Step 7: Record final repository state**

Run `git status --short` in both repositories and require clean tracked state. Record the skill commit SHA, app commit SHA, published article URL, content commit SHA, LaunchAgent label, next scheduled time, and log paths in the implementation handoff.

---

## Acceptance Checklist

- [ ] Both repositories' complete Python test suites pass.
- [ ] Next.js unit tests and production build pass.
- [ ] Fixture dry-run performs no Git, network publication, or Slack success side effect.
- [ ] The loaded LaunchAgent shows 12:10 PM and does not depend on Codex being open.
- [ ] Same-day re-entry does not invoke the model or create a second post.
- [ ] The model process cannot access Slack secrets or mutation tools.
- [ ] The first chosen topic passes full inventory and recent-run duplicate analysis.
- [ ] Exactly one article and unique cover are committed.
- [ ] Production page returns HTTP 200 and appears in the sitemap.
- [ ] Slack `#dev` contains the verified clickable article link and commit link.
- [ ] Failure paths retain auditable stage details and never claim an unverified post is live.
