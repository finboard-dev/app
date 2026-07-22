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

Use the Asia Kolkata calendar date.

Before cadence evaluation, require that the current branch is `main`, then run `git fetch origin main`. Stop without publishing if the branch check or fetch fails. From the repository root run:

```bash
python3 .agents/skills/publish-finboard-content-batch/scripts/check_batch_day.py --runs-dir content-pipeline/runs
```

If `action` is `retry_push`, do no research and create no files. Confirm current `HEAD` still equals the returned `batchCommit`, confirm the current branch is `main`, and run:

```bash
git push origin HEAD:refs/heads/main
```

Push only that exact commit. Run no tests, builds, visual checks, HTTP checks, or other verification. Report the existing batch, `batchCommit`, and push result, then stop.

If `action` is `stop`, report `unsafe_push_state` and stop without pushing or changing files.

If `eligible` is false, stop. Report `already_published_today` or `skip_day`. Do not research or change files.

## 2. Protect the workspace

Read repository instructions and inspect Git status. Preserve unrelated changes. Stop if existing changes overlap a final content or asset path selected for this batch.

For a new eligible batch, before research or writes, require that the current branch is `main` and local `HEAD` exactly equals `refs/remotes/origin/main` after the cadence fetch. Stop without publishing if either precondition fails. This prevents unrelated local commits from entering the batch push.

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

The creation-time Summary generation and inspection needed to produce a usable workbook cover is allowed in scratch before the atomic copy. There is no post-publication visual verification.

Clean visible copy with:

```bash
python3 .agents/skills/publish-finboard-content-batch/scripts/clean_plain_text.py
```

Do not publish a partial batch. If any of the four items or required assets is missing, stop before copying files into the repository.

## 5. Copy and record

Clean every visible field immediately before copying. Use `scripts/clean_plain_text.py` and confirm the final scratch files contain no decorative special characters.

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

Before pushing, require that the atomic batch commit parent equals `refs/remotes/origin/main` and that the batch record was introduced or changed by that exact `HEAD` commit. Record the exact `HEAD` SHA as the runtime batch commit output only. If either check fails, stop without publishing.

Then push directly to origin/main with `git push origin HEAD:refs/heads/main`. Do not ask for topic approval or publication approval.

Do not run test suites, production builds, visual verification, HTTP checks, or post publication verification.

Report the four topics, four slugs, batch record path, actual commit SHA, and push result.

## Stop conditions

Stop without publishing when cadence is ineligible, research cannot support four eligible topics, an item or asset cannot be created, selected final paths overlap user changes, or direct push authority is unavailable.
