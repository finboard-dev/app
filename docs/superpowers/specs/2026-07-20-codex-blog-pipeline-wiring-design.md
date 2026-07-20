# Codex Blog Pipeline Wiring Design

## Goal

Make the existing blog and template pipeline work predictably across Claude and Codex: Claude performs unattended daily research, while Codex handles Slack topic review, drafting, preview approval, and deployment in an interactive session.

## Runtime boundary

The existing launchd job remains research-only and continues to invoke headless Claude at noon. It creates one blog run and one template run per day, but it does not post to Slack or advance a human gate.

Codex owns the interactive half of the workflow. Its session-start hook surfaces unposted or awaiting runs. When the Slack connector is available, Codex posts the review message, records its Slack channel and message timestamp in the run file, reads only replies associated with that message, and advances the state machine after a valid human response.

This design intentionally does not store a Slack token or webhook on disk. Consequently, Slack work waits until a Codex session has the Slack connector installed, connected, and available.

## Project context

The app will have three explicit context files:

- `CLAUDE.md` gives Claude app-specific instructions and points to the shared monorepo guidance.
- `AGENTS.md` gives Codex the same app-specific instructions while preserving the managed `claude-mem-context` block.
- `CONTEXT.md` describes the marketing application, content formats, blog/template pipeline, approval gates, and deployment constraints.

The files will identify the current Next.js frontend and filesystem-backed content as authoritative. They will not repeat the entire parent monorepo instruction file.

## Codex skill discovery

The existing `blog-pipeline` skill remains maintained in `/Users/ujjwal/self/blog-pipeline`. Codex receives a link at `~/.agents/skills/blog-pipeline`, while Claude keeps its existing `~/.claude/skills/blog-pipeline` link. Both runtimes therefore execute the same skill implementation and cannot drift.

## Slack correlation

Run files will use a transport-neutral Slack reference:

```json
{
  "channel": {
    "posted": true,
    "channelId": "C09E0C9G8TW",
    "messageTs": "1234567890.123456",
    "threadTs": "1234567890.123456",
    "postedAt": "2026-07-20T12:00:00Z",
    "via": "codex-slack-connector"
  }
}
```

Codex must save the identifiers returned by the Slack connector after a successful post. Approval reads must target `threadTs`; they must never infer approval from the newest unrelated channel message. A run without a thread timestamp stays at its gate and reports that it needs a correlated review post.

The credential-based Slack adapter will also reject uncorrelated reads. It remains available to other adopters of the reusable skill, but this project will not configure its environment variables.

## Deployment

The repository will contain `scripts/blog-deploy.sh`, rendered from the skill template for:

- remote `origin`;
- production branch `main`;
- blog draft branches prefixed `blog/draft-`;
- template draft branches prefixed `template/draft-`.

The script will refuse a dirty working tree, fetch the remote, verify the requested draft branch, merge without rewriting history, and push the resulting production commit. The caller remains responsible for re-stamping publish dates, validating artifacts, enforcing daily caps, and verifying production URLs before marking a run published.

The existing approved July 19 run will not deploy until the working tree is clean and the generated script passes its dry safety checks.

## Tests and verification

Automated tests will cover:

- Slack reads requiring a stored thread timestamp;
- thread reply selection excluding bot messages and unrelated channel messages;
- post metadata preserving channel and message identifiers;
- deploy-script rendering and its clean-tree/branch guards;
- valid config and legal run-state transitions.

Verification will run the complete blog-pipeline unit suite, shell syntax validation for the deploy script, config validation, launchd inspection, Codex skill discovery, and claude-mem worker status.

## Operational limitations

- Slack connector installation and OAuth authorization are user/workspace operations; repository code cannot perform them.
- The noon job can research while no interactive session is open, but Slack review waits for the next connected Codex session.
- Production deployment remains a human-approved action and never runs from the research cron.
- Vercel CLI upgrades are machine-level maintenance and are separate from pipeline correctness.
