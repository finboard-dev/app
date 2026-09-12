# Automated Daily Blog Launchd Design

Date: 2026-09-08

Status: Approved direction, pending specification review

## Objective

Run one unattended FinBoard blog production cycle every day around noon on the local Mac. The job researches a timely topic, rejects duplicate or overlapping coverage, writes one publication-ready article with its own cover, validates the complete site, pushes the article to `main`, waits for Vercel, and posts the verified production link to Slack `#dev`.

The workflow follows the operating pattern of the existing QuickBooks ratings job: macOS `launchd` owns the schedule, a repository script owns deterministic execution, local files capture stdout and stderr, and Slack receives the result. Opening the Codex desktop application is not part of the trigger.

## Success Criteria

The workflow is complete when:

1. A LaunchAgent runs daily at 12:10 PM local time without Codex or another desktop application being open.
2. The scheduled command invokes the canonical `blog-pipeline` skill through the already-authenticated headless Codex CLI.
3. At most one new FinBoard blog is published per local calendar day.
4. Exact and substantially overlapping topics are rejected before writing.
5. Only an article that passes every deterministic content and frontend check can be committed.
6. A push to `main` triggers the existing Vercel deployment path.
7. Slack `#dev` receives either a verified live article link or a concise failure report.
8. Re-running the job on the same day is safe and never publishes a second article.
9. Existing user changes in the `app` worktree are never overwritten or included in the automated commit.

## Scope

This design covers the blog pipeline only. The existing spreadsheet-template research runs are not drafted or deployed by this job.

The first automatic article will target the current unused search opportunity around QuickBooks inside ChatGPT and Claude, provided it still passes the freshness and duplicate checks at execution time. The intended working title is:

> QuickBooks Is Now Inside ChatGPT and Claude: What Finance Teams Should Automate and What Still Needs Review

Future runs choose their topic dynamically from current accounting, QuickBooks, tax, AI, controller, and CFO signals.

## Existing System

The original LaunchAgent, `ai.ujjwalks.blog-pipeline.app`, invoked Claude with read and research tools, created blog and template run files, and stopped at `awaiting_topic_approval`. The unattended route invokes Codex in a read-only sandbox with live web search.

The accumulated run files demonstrate that scheduling and research work, but the two mandatory human gates prevent drafting and publication. The configured deployment script is also absent from the `app` repository, so the existing run cannot progress to production.

The canonical skill lives at `/Users/ujjwal/self/blog-pipeline` and is already shared between local agent runtimes. It remains the single definition of editorial and pipeline behavior.

## Chosen Architecture

Extend the existing local launchd flow instead of introducing GitHub Actions or a hosted service.

The implementation adds a `daily-auto` route to the canonical `blog-pipeline` skill. This route is an explicit exception to the skill's normal manual gates and is enabled only when the target configuration selects `auto` for both gates. Manual and polling modes retain their existing behavior.

The automation is split into two responsibilities:

- The skill and headless model decide what to write and return one structured article artifact.
- A deterministic repository script controls validation, filesystem writes, Git, deployment verification, logging, locking, and Slack notification.

The model never receives a Slack webhook or a Git command tool. This keeps untrusted web content away from deployment credentials.

## Daily Execution Flow

At 12:10 PM local time, `launchd` executes the repository runner.

1. Acquire a per-repository lock. If another run is active, log the skip and exit successfully.
2. Resolve the local date and check whether an article is already published for that date. If so, exit without invoking the model.
3. Confirm that the `app` repository is on `main`, matches the expected remote, and has no tracked or untracked changes outside ignored pipeline state and log files.
4. Fast-forward from `origin/main`. A diverged branch or failed fetch stops the run.
5. Invoke Codex non-interactively with the `blog-pipeline daily-auto` instruction in a read-only sandbox with live web search.
6. Require Codex to return schema-constrained direct JSON fields for the selected topic, scoring evidence, source list, final FinBoard blog document, and cover-generation inputs.
7. Parse the envelope, run duplicate checks again, and validate the article without trusting the model's self-assessment.
8. Write exactly one JSON article and generate exactly one unique cover using the skill's deterministic cover generator.
9. Run the focused blog validators, content tests, and the production Next.js build.
10. Stage only the new article and cover. Abort if any other path changed.
11. Commit with the local date and article slug, then push the current `main` commit to `origin/main` using a fast-forward-only precondition.
12. Poll the expected FinBoard article URL until it returns HTTP 200, then confirm the slug appears in the production sitemap.
13. Post the success notification with the article title, live link, commit identifier, and completion time to Slack `#dev`.
14. Record the terminal state and release the lock.

Every failure leaves the pipeline at its current stage, writes an actionable log entry, sends a failure notification to `#dev`, and exits non-zero. A failed day may remain unpublished; the automation does not lower the quality bar to satisfy cadence.

## Topic Research and Selection

Each run evaluates current questions across the configured FinBoard personas. Topic selection is based on five named dimensions, each scored from zero to five:

| Dimension | Meaning |
|---|---|
| Freshness | A dated change, active deadline, new product capability, or current discussion creates a reason to publish now. |
| Audience fit | The topic solves a concrete problem for a configured FinBoard persona. |
| Source authority | Important claims can be grounded in current primary or authoritative sources. |
| Search and sharing potential | The title answers a recognizable search prompt and has a clear, useful hook worth sharing. |
| Product relevance | FinBoard has credible expertise and a natural non-forced connection to the topic. |

The winning topic must meet a minimum total score and a minimum source-authority score. If no candidate qualifies, the run records `nothing_publishable`, notifies `#dev`, and publishes nothing.

## Duplicate Prevention

Duplicate prevention runs twice: once during research and once immediately before writing the file.

The deterministic check compares the candidate with:

- every existing blog slug;
- normalized existing titles;
- primary keyword phrases;
- recent pipeline topic titles and slugs; and
- token similarity between the proposed intent summary and existing title plus excerpt text.

An exact slug or normalized-title match always fails. A high similarity score fails unless the artifact explicitly identifies a dated material change and the title and content are framed as an update rather than a replacement. The check reports the closest existing articles in logs so a rejection is reviewable.

This is stronger than the current filename-only deduplication and ensures that a rewritten title cannot silently recreate an existing article.

## Reusable Blog Template

The canonical skill will contain a reusable FinBoard article template. Business and editorial rules remain in the skill, while the runner only parses and validates the returned artifact.

Every generated article contains:

1. A direct 40 to 60 word answer in the opening.
2. A short why-now section tied to a dated source or active business decision.
3. A comparison or decision table only where repeated fields justify one.
4. Three to six substantive sections that answer the target search intent.
5. An accounting or finance control section that distinguishes source data, calculation, review, and decision.
6. Common mistakes or limits stated without competitor disparagement.
7. Four to five visible FAQs whose answers match the structured data.
8. Two to four contextual internal links to real FinBoard pages.
9. One relevant FinBoard call to action after the educational answer is complete.

The JSON document uses the fields consumed by `frontend/src/lib/blog.js`, the canonical `FinBoard Team` author, current publication dates, Article or BlogPosting structured data, descriptive cover alt text, and the existing category vocabulary.

## Content Validation

Publication requires every check below to pass:

- JSON parses and matches the FinBoard blog contract.
- Filename, slug, canonical URL, and structured-data URL agree.
- The author is `FinBoard Team` with identifier `finboard-team`.
- The publication and modification dates equal the local publish date.
- Title, excerpt, first paragraph, and image alt text contain the primary topic naturally.
- Article length, heading structure, FAQ parity, internal links, and CTA follow the skill template.
- Important changing claims link to current primary sources near the claim.
- Forbidden formulaic prose and invalid typography are absent.
- No internal link points to a missing local route.
- The cover is unique, readable at social-preview dimensions, and uses no borrowed article asset.
- Duplicate checks pass after the final title and excerpt exist.
- Focused unit tests pass.
- The production frontend build passes.

Validation is deterministic wherever possible. The model proposes and writes; code decides whether the artifact is safe to publish.

## Git and Deployment Safety

The runner operates only on the `app` repository and only on `main`. It never resets, stashes, deletes, or incorporates a user's local changes.

Before generation, any unexpected dirty path causes a safe failure. Pipeline run-state files are added to `.gitignore` so existing local history does not make the application tree permanently dirty.

After generation, the runner computes the expected article and cover paths from the validated slug. It stages those two paths explicitly. It then confirms the staged path set is exactly the expected set before committing.

The push uses the existing `origin` remote and refuses a non-fast-forward update. A successful Git push is not treated as a successful publication. Production is complete only after the live article returns HTTP 200 and the sitemap contains its slug.

If Git succeeds but Vercel verification fails, the Slack message clearly states that the content commit exists but production verification failed, and includes the commit link for investigation.

## Scheduling and Runtime

The LaunchAgent label remains `ai.ujjwalks.blog-pipeline.app`. Its scheduled time changes from 12:00 PM to 12:10 PM so it does not start at the exact same moment as `com.finboard.quickbooks-ratings`.

The plist invokes `/bin/bash` with the repository runner as a direct argument, matching the ratings job. It declares the required executable paths explicitly and directs output to:

- `~/Library/Logs/finboard-blog-pipeline/stdout.log`
- `~/Library/Logs/finboard-blog-pipeline/stderr.log`

The job runs when the user is logged in. Codex does not need to be open. When the Mac is unavailable, missing a day is acceptable; there is no catch-up loop that publishes several articles at once.

The runner supports `--dry-run` and a normal manual invocation. Dry-run mode performs research, generation, and validation but never commits, pushes, or posts a success message.

## Slack Notifications

Slack delivery reuses the `#dev` destination used by the QuickBooks ratings job. The webhook is loaded from the environment-variable name already declared in `.blog-pipeline/config.json`; the secret value is never added to a new source file or printed.

A successful message contains:

```text
FinBoard Daily Blog Published
Title: <article title>
Live post: <clickable production URL>
Commit: <linked short commit>
Published: <local completion time>
```

The success message is sent only after live URL and sitemap verification.

A failure message contains the failed stage, concise error, local log location, and a commit link when a commit was already pushed. It does not claim publication or include an unverified article URL.

A no-op message explains whether the daily cap was already met, no topic cleared the threshold, or another run held the lock.

## State and Auditability

The state machine gains terminal outcomes appropriate for unattended execution while keeping every transition visible:

```text
researching
  -> selecting
  -> drafting
  -> validating
  -> committing
  -> deploying
  -> verifying
  -> published

Any non-terminal state -> failed
researching/selecting -> nothing_publishable
startup -> already_published
startup -> skipped_locked
```

Each run file records timestamps, selected topic and scores, closest duplicate candidates, source URLs, artifact paths, validation commands and results, commit identifier, production URL, Slack result, and error information. Run files are append-only within a run and are not committed to the application repository.

## Configuration

Meaningful values are named once in `.blog-pipeline/config.json` and consumed by the skill and runner:

- schedule and timezone;
- automatic gate modes;
- one-blog daily cap;
- minimum topic score and similarity threshold;
- canonical author and categories;
- production base URL and sitemap URL;
- deploy remote and branch;
- Slack channel and webhook environment-variable name;
- validation commands;
- retry count and interval for production verification.

Code does not contain FinBoard personas, accounting topics, category strings, Slack channel identifiers, or publication thresholds.

## Files and Ownership

Expected implementation areas:

### Canonical skill repository

- Modify `SKILL.md` to document `daily-auto` and its explicit automatic-mode contract.
- Modify `scripts/config.py` to define automatic gate values and automation configuration.
- Modify `scripts/runstate.py` to define automatic states and transitions.
- Extend `scripts/existing.py` or add a focused duplicate-analysis module.
- Add a structured artifact parser and automatic-run tests.
- Add the reusable FinBoard-compatible blog template to `references/`.

### FinBoard app repository

- Modify `.blog-pipeline/config.json` to enable one automatic blog per day and declare validation, production, and notification settings.
- Modify `.gitignore` to exclude local pipeline run state.
- Add `scripts/daily-blog.sh` as the deterministic orchestrator.
- Add focused contract tests for the runner, config, path isolation, notifications, and dry-run behavior.
- Add or render the guarded deployment helper if it remains separate from the runner.
- Update the existing LaunchAgent plist during installation; the plist itself may also be stored as a source template for reproducibility.

No accounting business rules move into application routers or runtime framework code.

## Testing

Automated tests cover:

1. Auto mode is rejected unless both approval gates explicitly equal `auto`.
2. Same-day re-entry exits before model invocation.
3. Exact slug, normalized title, and high intent similarity are rejected.
4. A dated update can pass only with explicit update metadata and a sufficiently different intent.
5. Malformed model output cannot write a content file.
6. Article and cover paths cannot escape their configured directories.
7. Validation failure prevents staging and push.
8. Unexpected repository changes prevent staging and push.
9. Only the expected article and cover are staged.
10. Non-fast-forward push failure is reported without destructive recovery.
11. Slack success messages require verified URL and sitemap results.
12. Failure messages never label an unverified URL as live.
13. The launchd plist has the correct label, time, executable paths, and log paths.
14. Dry-run never commits, pushes, or posts a success message.

End-to-end verification will manually trigger the LaunchAgent once in dry-run mode, inspect its logs and run state, then trigger one real run. The real run is complete only after the generated article, Git commit, production page, sitemap entry, and Slack `#dev` message are all verified.

## Operational Risks and Controls

### Incorrect or stale financial claims

The skill prefers primary sources, requires publication dates or update dates for changing claims, and refuses candidates without sufficient authoritative support. Deterministic link and content checks run before publication.

### Prompt injection from researched pages

The model receives read, search, and web capabilities but no Git or Slack credentials and no shell command tool. Its output is treated as untrusted data and parsed through a strict schema before any write.

### Local worktree interference

The runner never cleans the tree automatically. It fails when unexpected changes exist and names them in the log and Slack message.

### Repeated or low-value publishing

Daily caps, two-stage duplicate detection, a minimum topic score, and `nothing_publishable` as a successful terminal outcome prevent cadence from overriding relevance.

### Partial deployment

The run distinguishes `pushed` from `published`. A production verification failure is reported with the commit link and remains visible in run state.

### Secret leakage

The new code stores environment-variable names only. The Slack secret is loaded only by the deterministic notification stage after the model process exits and is never written to logs.

## Acceptance Criteria

The implementation is accepted when the canonical skill supports and tests the explicit `daily-auto` route, the FinBoard runner passes its unit and dry-run checks, the LaunchAgent is loaded for 12:10 PM, one real article is generated and deployed from the full automatic path, the production URL and sitemap are verified, and Slack `#dev` receives the clickable live link.
