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

The creation-time Summary generation and inspection needed to make a usable cover is allowed in scratch before the atomic copy. There is no post-publication visual verification.

## Scratch and atomic copy

Build all four items under `/private/tmp/finboard-content-batch/YYYY-MM-DD`. Do not copy any item into the repository until both blogs, both blog covers, both XLSX files, both Summary covers, and both template JSON records exist.

Copy into final paths only after the complete set exists. Do not publish a partial batch.

## Plain text

Pass generated titles, descriptions, article copy, workbook labels, notes, image prompts, and metadata through `scripts/clean_plain_text.py` before writing final files. Preserve special characters only for technical syntax, formulas, URLs, financial notation, or proper names.

## Batch record

Create `content-pipeline/runs/YYYY-MM-DD.json` with these fixed fields, then populate the dynamic arrays under the precise schema below:

```json
{
  "publicationDate": "YYYY-MM-DD",
  "timeZone": "Asia/Kolkata",
  "batchId": "YYYY-MM-DD-finboard-content",
  "commitSubject": "content: publish FinBoard batch YYYY-MM-DD",
  "publicationOrder": ["Blog 1", "Template 1", "Blog 2", "Template 2"]
}
```

The cadence success signal is a complete locally committed batch record whose exact file version is committed in local `HEAD`.

The precise record schema is:

1. `publicationDate` is the ISO date in the filename and `timeZone` is `Asia/Kolkata`.
2. `researchSources` contains at least one object. Every object has a nonempty HTTP or HTTPS `url` and ISO `observedDate`.
3. `candidateBlogs` and `candidateTemplates` each contain at least six Candidate objects.
4. Every Candidate has a unique nonempty `candidateId`, nonempty `topic`, nonempty `primaryKeyword`, `keywordDemandEvidence`, numeric `score`, and nonempty numeric `scoreBreakdown`. `keywordDemandEvidence` has a nonempty `metric`, numeric `value`, HTTP or HTTPS `sourceUrl`, and ISO `observedDate`.
5. `selectedBlogs` and `selectedTemplates` each contain exactly two objects. Every selection has a `candidateId` present in its corresponding pool, a unique nonempty `slug`, and nonempty `selectionReason`.
6. `publicationOrder` is exactly `Blog 1`, `Template 1`, `Blog 2`, `Template 2`.
7. `batchId` is `YYYY-MM-DD-finboard-content` and `commitSubject` is `content: publish FinBoard batch YYYY-MM-DD`.

Use local Git inspection without fetching. Ignore malformed and incomplete records. Also ignore structurally complete records that are untracked, staged only, modified after their committed version, or otherwise absent in their exact current form from local `HEAD`.

When a complete record is committed in local `HEAD` but that exact version is absent from `refs/remotes/origin/main`, the batch is waiting for push. Return `{"eligible": false, "action": "retry_push", "reason": "push_retry"}` instead of allowing research or a new batch. When the exact version exists on `refs/remotes/origin/main`, apply the same-day, yesterday, and two-or-more-day cadence rules normally.

The record does not contain its own commit SHA. Report the actual SHA after push.

## Git publication

Before cadence evaluation, require that the current branch is `main` and run `git fetch origin main`. Stop if the branch check or fetch fails. For a new batch, before research or writes, inspect the working tree and require that local `HEAD` exactly equals `refs/remotes/origin/main`. Stop without publishing if these preconditions fail. Stop when user changes overlap selected final paths.

Stage only the four items, their required assets, source files required to create the templates, and the batch record. Create one commit using the record commit subject. Before push, require that its parent equals `refs/remotes/origin/main` and that the batch record was introduced or changed by that exact `HEAD` commit. Record that exact SHA in runtime output only. Push with `git push origin HEAD:refs/heads/main`. Stop without publishing if any precondition fails.

If the direct push fails after the local commit succeeds, retry the existing completed batch and its commit only when cadence returns `retry_push` and `batchCommit`. Confirm current `HEAD` still equals `batchCommit`, then use `git push origin HEAD:refs/heads/main`. Never push an arbitrary branch or unrelated ancestors. Do not research or create a replacement batch, and do not create a second batch record for that publication date.

## No verification phase

Do not run test suites, production builds, visual verification, HTTP checks, or post publication verification during an operational batch. Report the created slugs, batch record, commit SHA, and push result.
