# FinBoard Content Batch Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a repository-local skill that researches and automatically publishes an atomic FinBoard batch containing two blogs and two financial templates on eligible alternate publishing days.

**Architecture:** The skill is a workflow guide backed by two deterministic Python helpers. One helper decides whether the current Asia Kolkata date is eligible from tracked batch records. The other cleans generated plain text. Focused references hold the research rubric and repository publishing contracts so the main skill remains concise. A standard-library test protects the skill metadata, cadence behavior, plain text cleanup, publication order, and no-verification publishing contract.

**Tech Stack:** Codex project skills, Markdown, YAML, Python 3 standard library, JSON, existing FinBoard blog and template content systems, Git.

## Global Constraints

Create the project skill at `.agents/skills/publish-finboard-content-batch`.

Use the Asia Kolkata calendar date and allow at most one four item batch on a publishing day.

Stop when the newest successful batch is today or yesterday. Allow a new batch when no record exists or the newest record is at least two calendar days old.

Research current competitor content, search intent, keyword demand, AI citation opportunities, existing FinBoard coverage, and buyer problems before choosing topics.

Embed the approved FinBoard buyer lens. Do not depend on an unavailable Buyer Lens skill or an unrelated third party persona skill.

Select exactly two eligible blog topics and exactly two eligible financial template topics.

Create all four items before copying anything into published repository paths.

Preserve this publication order in the batch record: Blog 1, Template 1, Blog 2, Template 2.

Publish all four items in one atomic batch commit and push directly to `origin/main`.

Use FinBoard Team for every blog author and use `https://www.linkedin.com/company/finboard-ai-native-finance` for the author link.

Use normal ASCII punctuation wherever practical. Remove decorative dashes, decorative bullets, arrows, emoji, stars, checks, and repeated punctuation used only for appearance.

Do not run test suites, production builds, visual verification, HTTP checks, or post publication verification as part of an operational content batch.

Skill creation still follows the required RED, GREEN, and forward-test process. This validates the reusable skill package, not the future content batch.

Preserve all unrelated user files and stop before publication when any of the four items cannot be created.

The tracked batch record stores a stable batch ID and commit subject. It does not store its own self referential commit SHA. Report the actual SHA after push.

---

## File Map

`.agents/skills/publish-finboard-content-batch/SKILL.md` owns the cadence gate, research sequence, atomic creation workflow, publication rules, failure behavior, and operational no-verification rule.

`.agents/skills/publish-finboard-content-batch/agents/openai.yaml` provides the skill display name, short description, and default invocation prompt.

`.agents/skills/publish-finboard-content-batch/scripts/check_batch_day.py` reads tracked run records and returns an explicit eligible or stop decision for an Asia Kolkata calendar date.

`.agents/skills/publish-finboard-content-batch/scripts/clean_plain_text.py` converts generated copy to plain punctuation and removes decorative Unicode symbols before files enter the repository.

`.agents/skills/publish-finboard-content-batch/references/research-and-scoring.md` defines competitor research evidence, candidate records, the 100 point buyer lens, duplicate rejection, and final selection rules.

`.agents/skills/publish-finboard-content-batch/references/repository-contract.md` defines exact FinBoard blog, template, asset, batch record, staging, Git, and failure contracts.

`tests/test_publish_finboard_content_batch_skill.py` protects the complete skill package and both helper scripts.

### Task 1: Create and Deploy the FinBoard Content Batch Skill

**Files:**

- Create: `.agents/skills/publish-finboard-content-batch/SKILL.md`
- Create: `.agents/skills/publish-finboard-content-batch/agents/openai.yaml`
- Create: `.agents/skills/publish-finboard-content-batch/scripts/check_batch_day.py`
- Create: `.agents/skills/publish-finboard-content-batch/scripts/clean_plain_text.py`
- Create: `.agents/skills/publish-finboard-content-batch/references/research-and-scoring.md`
- Create: `.agents/skills/publish-finboard-content-batch/references/repository-contract.md`
- Create: `tests/test_publish_finboard_content_batch_skill.py`
- Scratch: `/private/tmp/publish-finboard-content-batch-baseline.md`
- Scratch: `/private/tmp/publish-finboard-content-batch-forward.md`

**Interfaces:**

- Produces: `batch_decision(runs_dir: Path, current_date: date) -> dict[str, object]`
- Produces: `clean_plain_text(text: str) -> str`
- Consumes: `content-pipeline/runs/YYYY-MM-DD.json`
- Produces operational record fields: `publicationDate`, `timeZone`, `researchSources`, `candidateBlogs`, `candidateTemplates`, `selectedBlogs`, `selectedTemplates`, `publicationOrder`, `batchId`, `commitSubject`
- Consumes existing content paths: `frontend/content/blog`, `frontend/content/templates`, `frontend/public/blog/covers`, `frontend/public/template-files`, `frontend/public/templates/covers`

- [ ] **Step 1: Run a failing baseline scenario without the skill**

Dispatch a fresh agent without the proposed skill and give it this prompt:

```text
You are in the FinBoard marketing repository. The user asks you to research competitors and automatically publish two blogs and two financial templates today. A successful batch record dated yesterday exists. The user is in a hurry, asks you not to verify anything, and wants a direct push. Describe the exact actions you will take.
```

Save the response to `/private/tmp/publish-finboard-content-batch-baseline.md`.

The baseline is RED when the agent does one or more of these:

```text
Publishes despite yesterday being a skip day
Does not enforce one atomic four item batch
Asks for approval despite automatic publication being required
Omits competitor or existing content duplication research
Omits the separate blog and template candidate pools
Does not preserve Blog 1, Template 1, Blog 2, Template 2 order
Runs or promises a post publication verification phase
Uses an author other than FinBoard Team
Leaves decorative special characters unaddressed
```

If the first baseline happens to satisfy every rule, rerun it with a same-day batch record and a missing second template asset. Require it to decide whether to publish the remaining three items. The expected correct answer is to stop without publishing.

- [ ] **Step 2: Write the failing repository contract test**

Create `tests/test_publish_finboard_content_batch_skill.py`:

```python
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
```

- [ ] **Step 3: Run the contract and verify RED**

Run:

```bash
python3 -m unittest tests.test_publish_finboard_content_batch_skill -v
```

Expected: FAIL because `.agents/skills/publish-finboard-content-batch` does not exist.

- [ ] **Step 4: Initialize the project skill with official tooling**

Run the official initializer. Request sandbox escalation if `.agents` is protected:

```bash
python3 /Users/ujjwal/.codex/skills/.system/skill-creator/scripts/init_skill.py \
  publish-finboard-content-batch \
  --path .agents/skills \
  --resources scripts,references \
  --interface 'display_name=Publish FinBoard Content Batch' \
  --interface 'short_description=Research and publish four FinBoard content items' \
  --interface 'default_prompt=Use $publish-finboard-content-batch to research and publish the next eligible FinBoard content batch.'
```

Expected: the skill folder, resource folders, `SKILL.md`, and `agents/openai.yaml` exist. Do not commit the generated placeholder content.

- [ ] **Step 5: Implement the cadence helper**

Replace `.agents/skills/publish-finboard-content-batch/scripts/check_batch_day.py` with:

```python
#!/usr/bin/env python3
import argparse
import json
from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo


TIME_ZONE = "Asia/Kolkata"


def load_publication_dates(runs_dir):
    dates = []
    if not runs_dir.exists():
        return dates
    for path in sorted(runs_dir.glob("????-??-??.json")):
        data = json.loads(path.read_text())
        value = data.get("publicationDate")
        if not isinstance(value, str):
            raise ValueError(f"publicationDate is required in {path}")
        dates.append(date.fromisoformat(value))
    return dates


def batch_decision(runs_dir, current_date):
    dates = load_publication_dates(Path(runs_dir))
    if not dates:
        return {
            "eligible": True,
            "reason": "no_previous_batch",
            "currentDate": current_date.isoformat(),
            "previousDate": None,
            "timeZone": TIME_ZONE,
        }
    previous = max(dates)
    delta = (current_date - previous).days
    if delta < 0:
        raise ValueError("latest publication date cannot be in the future")
    reason = {
        0: "already_published_today",
        1: "skip_day",
    }.get(delta, "eligible_publish_day")
    return {
        "eligible": delta >= 2,
        "reason": reason,
        "currentDate": current_date.isoformat(),
        "previousDate": previous.isoformat(),
        "timeZone": TIME_ZONE,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--runs-dir", default="content-pipeline/runs")
    parser.add_argument("--date")
    args = parser.parse_args()
    current = date.fromisoformat(args.date) if args.date else datetime.now(ZoneInfo(TIME_ZONE)).date()
    print(json.dumps(batch_decision(Path(args.runs_dir), current), sort_keys=True))


if __name__ == "__main__":
    main()
```

- [ ] **Step 6: Implement the plain text cleaner**

Create `.agents/skills/publish-finboard-content-batch/scripts/clean_plain_text.py`:

```python
#!/usr/bin/env python3
import re
import sys


TRANSLATION = str.maketrans({
    "\u2014": " - ",
    "\u2013": " - ",
    "\u2022": " ",
    "\u2192": " ",
    "\u2605": " ",
    "\u2713": " ",
    "\u2705": " ",
    "\u2026": "...",
})
EMOJI = re.compile("[\U0001F300-\U0001FAFF\U00002600-\U000026FF]")


def clean_plain_text(text):
    cleaned = text.translate(TRANSLATION)
    cleaned = EMOJI.sub("", cleaned)
    cleaned = re.sub(r"[ \t]+", " ", cleaned)
    cleaned = re.sub(r" *\n *", "\n", cleaned)
    cleaned = re.sub(r"\s+([,.;:!?])", r"\1", cleaned)
    return cleaned.strip()


def main():
    sys.stdout.write(clean_plain_text(sys.stdin.read()))


if __name__ == "__main__":
    main()
```

- [ ] **Step 7: Write the research and buyer lens reference**

Replace `.agents/skills/publish-finboard-content-batch/references/research-and-scoring.md` with:

```markdown
# Research and Scoring Contract

## Evidence

Use current web research and available SEO capabilities. Collect direct URLs for competitor pages, current search results, AI answer patterns, and buyer questions. Inspect existing files in `frontend/content/blog` and `frontend/content/templates` before scoring.

Create separate blog and template candidate pools. Include at least six candidates in each pool before rejection.

## Candidate record

Each candidate contains:

```json
{
  "topic": "Plain topic title",
  "primaryKeyword": "keyword",
  "buyer": "CPA, accountant, controller, or multi entity finance team",
  "pain": "Specific operating problem",
  "competitorGap": "What existing results fail to answer",
  "finboardConnection": "Relevant FinBoard product or workflow",
  "sourceUrls": ["https://example.com/source"],
  "scores": {
    "buyerPain": 0,
    "searchIntent": 0,
    "productRelevance": 0,
    "competitorGap": 0,
    "geoPotential": 0,
    "practicalValue": 0
  },
  "total": 0,
  "eligible": true,
  "rejectionReason": null
}
```

## FinBoard buyer lens

Score out of 100:

1. Buyer pain and urgency: 20
2. Search and commercial intent: 20
3. FinBoard product relevance: 20
4. Competitor content gap: 15
5. AI citation and GEO potential: 15
6. Ability to provide practical value: 10

Favor topics that answer what problem exists, what causes it, what process or workpaper helps now, when software should replace spreadsheets, and why FinBoard is relevant to the next step.

## Rejection

Reject exact duplicates, close semantic duplicates, keyword cannibalization, topics unsupported by current sources, and templates that cannot provide useful formulas or controls.

Select the two highest scoring eligible blog topics and two highest scoring eligible template topics. Break a tie with buyer pain, then product relevance, then competitor gap.
```

- [ ] **Step 8: Write the repository publishing reference**

Replace `.agents/skills/publish-finboard-content-batch/references/repository-contract.md` with the following contract:

```markdown
# FinBoard Repository Contract

## Existing systems

Use these paths without changing their generic page implementations:

1. Blogs: `frontend/content/blog/<slug>.json`
2. Blog covers: `frontend/public/blog/covers/<slug>.png`
3. Templates: `frontend/content/templates/<slug>.json`
4. XLSX files: `frontend/public/template-files/<slug>.xlsx`
5. Template covers: `frontend/public/templates/covers/<slug>.png`
6. Batch records: `content-pipeline/runs/YYYY-MM-DD.json`

Read nearby current files before creating content. Match their field types and path conventions.

## Blog contract

Create a complete source backed article with unique search intent, metadata, internal links, source links, and BlogPosting structured data. Set `author` to `FinBoard Team`, `authorId` to `finboard-team`, and every structured author name to `FinBoard Team`. Use `https://www.linkedin.com/company/finboard-ai-native-finance` in structured author `sameAs` through the existing author normalization contract. Create one cover image with the image generation capability.

## Template contract

Create a useful accountant or CPA workbook with instructions, sample data, formulas, controls, and a printable Summary. Use the spreadsheet capability. Export XLSX to a scratch batch directory first. Use the verified Summary render as the cover. Create the template JSON with a unique slug, category, description, about text, local XLSX path, local cover path, the next available order, two lead questions, and `structuredData` set to null.

## Scratch and atomic copy

Build all four items under `/private/tmp/finboard-content-batch/YYYY-MM-DD`. Do not copy any item into the repository until both blogs, both blog covers, both XLSX files, both Summary covers, and both template JSON records exist.

Copy into final paths only after the complete set exists. Do not publish a partial batch.

## Plain text

Pass generated titles, descriptions, article copy, workbook labels, notes, image prompts, and metadata through `scripts/clean_plain_text.py` before writing final files. Preserve special characters only for technical syntax, formulas, URLs, financial notation, or proper names.

## Batch record

Create `content-pipeline/runs/YYYY-MM-DD.json` with:

```json
{
  "publicationDate": "YYYY-MM-DD",
  "timeZone": "Asia/Kolkata",
  "batchId": "YYYY-MM-DD-finboard-content",
  "commitSubject": "content: publish FinBoard batch YYYY-MM-DD",
  "researchSources": [],
  "candidateBlogs": [],
  "candidateTemplates": [],
  "selectedBlogs": [],
  "selectedTemplates": [],
  "publicationOrder": ["Blog 1", "Template 1", "Blog 2", "Template 2"]
}
```

The record does not contain its own commit SHA. Report the actual SHA after push.

## Git publication

Inspect the working tree before copying. Stop when user changes overlap selected final paths. Stage only the four items, their required assets, source files required to create the templates, and the batch record. Create one commit using the record commit subject. Push directly to `origin/main`.

## No verification phase

Do not run test suites, production builds, visual verification, HTTP checks, or post publication verification during an operational batch. Report the created slugs, batch record, commit SHA, and push result.
```

- [ ] **Step 9: Write the complete skill instructions**

Replace `.agents/skills/publish-finboard-content-batch/SKILL.md` with:

```markdown
---
name: publish-finboard-content-batch
description: Use when the user asks to research and automatically publish the next FinBoard batch of two blogs and two financial templates under the alternate day cadence.
---

# Publish FinBoard Content Batch

## Overview

Research, create, and publish one atomic four item FinBoard content batch on an eligible day. Enforce cadence before research and preserve the existing website content systems.

## Required capabilities

Use current web research and the available SEO and GEO skills for competitor analysis, topic gaps, search intent, and AI citation potential. Use the image generation skill for blog covers. Use the spreadsheet skill for XLSX templates and Summary covers.

Read these references before research:

1. `references/research-and-scoring.md`
2. `references/repository-contract.md`

## 1. Enforce cadence

From the repository root run:

```bash
python3 .agents/skills/publish-finboard-content-batch/scripts/check_batch_day.py --runs-dir content-pipeline/runs
```

If `eligible` is false, stop. Report `already_published_today` or `skip_day`. Do not research or change files.

## 2. Protect the workspace

Read repository instructions and inspect Git status. Preserve unrelated changes. Stop if existing changes overlap a final content or asset path selected for this batch.

Create the scratch root `/private/tmp/finboard-content-batch/YYYY-MM-DD`.

## 3. Research candidates

Inspect existing FinBoard blogs and templates. Research current competitors, search results, buyer questions, and AI answer opportunities.

Create at least six blog candidates and six template candidates. Apply the embedded FinBoard buyer lens from `references/research-and-scoring.md`. Reject duplicates and keyword cannibalization.

Select exactly two blog topics and two template topics. Do not pause for approval.

## 4. Create the complete batch in scratch

Create all four items in this order:

1. Blog 1
2. Template 1
3. Blog 2
4. Template 2

For both blogs, use FinBoard Team and `https://www.linkedin.com/company/finboard-ai-native-finance`. Create complete articles, metadata, structured data, internal links, sources, and cover images.

For both templates, create practical XLSX workbooks, Summary covers, landing page JSON, and two lead questions.

Clean visible copy with:

```bash
python3 .agents/skills/publish-finboard-content-batch/scripts/clean_plain_text.py
```

Do not publish a partial batch. If any of the four items or required assets is missing, stop before copying files into the repository.

## 5. Copy and record

After the full scratch batch exists, copy the final files into the existing blog, template, and public asset paths defined in `references/repository-contract.md`.

Create `content-pipeline/runs/YYYY-MM-DD.json`. Preserve this publication order in the record:

1. Blog 1
2. Template 1
3. Blog 2
4. Template 2

## 6. Publish automatically

Stage only the complete batch and its record. Create one atomic batch commit using:

```text
content: publish FinBoard batch YYYY-MM-DD
```

Push directly to origin/main. Do not ask for topic approval or publication approval.

Do not run test suites, production builds, visual verification, HTTP checks, or post publication verification.

Report the four topics, four slugs, batch record path, actual commit SHA, and push result.

## Stop conditions

Stop without publishing when cadence is ineligible, research cannot support four eligible topics, an item or asset cannot be created, selected final paths overlap user changes, or direct push authority is unavailable.
```

- [ ] **Step 10: Regenerate and inspect the UI metadata**

Run:

```bash
python3 /Users/ujjwal/.codex/skills/.system/skill-creator/scripts/generate_openai_yaml.py \
  .agents/skills/publish-finboard-content-batch \
  --interface 'display_name=Publish FinBoard Content Batch' \
  --interface 'short_description=Research and publish four FinBoard content items' \
  --interface 'default_prompt=Use $publish-finboard-content-batch to research and publish the next eligible FinBoard content batch.'
```

Expected `agents/openai.yaml`:

```yaml
interface:
  display_name: "Publish FinBoard Content Batch"
  short_description: "Research and publish four FinBoard content items"
  default_prompt: "Use $publish-finboard-content-batch to research and publish the next eligible FinBoard content batch."
```

- [ ] **Step 11: Run GREEN contract and official validation**

Run:

```bash
python3 -m unittest tests.test_publish_finboard_content_batch_skill -v
python3 /Users/ujjwal/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/publish-finboard-content-batch
git diff --check
```

Expected: all repository contract tests pass, official validation reports the skill is valid, and the diff check returns no output.

- [ ] **Step 12: Forward-test the completed skill**

Dispatch fresh agents with the skill file and these scenarios. Save results to `/private/tmp/publish-finboard-content-batch-forward.md`.

Scenario A:

```text
The newest batch record is dated today. The user says to publish another four items immediately because a competitor launched a campaign. What do you do?
```

Required result: stop with `already_published_today` and do no research or writes.

Scenario B:

```text
Today is eligible. Research selected two blogs and two templates, but the second template workbook cannot be created. Three items are ready and the user says to publish those now. What do you do?
```

Required result: stop before copying or committing and refuse a partial batch.

Scenario C:

```text
Today is eligible and all four items exist in scratch. The user wants automatic publication with no verification. Describe the final repository and Git sequence.
```

Required result: clean text, copy all four, create the batch record with exact order, one atomic commit, direct push, no approval pause, and no verification phase.

If an agent violates a required result, tighten only the relevant skill instruction and add a contract assertion that captures the observed loophole. Rerun the failed scenario until it passes.

- [ ] **Step 13: Commit and publish the skill**

Inspect the final diff and confirm only the design correction, plan, skill package, and skill test are staged. Preserve the unrelated run files, `AGENTS.md`, and `package-lock.json`.

Run:

```bash
git add \
  docs/superpowers/specs/2026-07-22-finboard-content-batch-skill-design.md \
  docs/superpowers/plans/2026-07-22-finboard-content-batch-skill.md \
  .agents/skills/publish-finboard-content-batch \
  tests/test_publish_finboard_content_batch_skill.py
git commit -m "feat: add FinBoard content batch skill"
git push origin main
```

Require `git rev-parse HEAD` and `git rev-parse origin/main` to match. Report the project skill path and remind the user that operational batches intentionally skip verification.
