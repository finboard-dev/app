# FinBoard Content Batch Skill Design

## Goal

Create a FinBoard project skill named `publish-finboard-content-batch` that researches, creates, and automatically publishes two blogs and two financial templates on eligible publishing days.

The skill publishes one four item batch, skips the next calendar day, and allows the following batch two or more calendar days after the previous successful batch.

## Scope

The skill owns:

1. Competitor and search research
2. Blog and template topic discovery
3. FinBoard buyer lens scoring
4. Selection of two blog topics and two template topics
5. Creation of two complete blogs and cover images
6. Creation of two usable XLSX templates, Summary covers, and landing pages
7. Plain text cleanup
8. One atomic batch commit
9. Direct push to `origin/main`
10. A tracked batch record

The skill does not add a scheduler. It runs when invoked and enforces the alternate day cadence.

The content workflow does not run test suites, production builds, visual verification, HTTP checks, or post publication verification.

## Skill Location and Trigger

Create the project skill in the repository skill directory with this folder name:

`publish-finboard-content-batch`

The skill should trigger when a user asks to research and publish the next FinBoard content batch, publish two blogs and two templates, run the alternate day publishing workflow, or create the next competitor informed FinBoard content set.

## Batch Cadence

Use the Asia Kolkata calendar date.

Each successful batch creates:

`content-pipeline/runs/YYYY-MM-DD.json`

On invocation:

1. Read all tracked batch records.
2. Find the newest successful publication date.
3. If the newest batch was published today, stop and report that the daily batch already exists.
4. If the newest batch was yesterday, stop and report that today is a skip day.
5. If the newest batch was two or more days ago, continue.
6. If no batch record exists, continue immediately.

The date check is based on calendar dates, not elapsed hours.

## Research Workflow

Create separate candidate pools for blogs and templates.

Use current web research and the available SEO and GEO capabilities to study:

1. Competitor blog topics
2. Competitor downloadable resources and workpapers
3. Search intent and keyword demand
4. Questions appearing in AI generated answers
5. Existing FinBoard blog and template coverage
6. Problems faced by CPAs, accountants, controllers, and multi entity finance teams
7. Topics connected to FinBoard products and buyer problems

Do not select a topic already covered by an existing FinBoard page. Reject topics that create material keyword cannibalization.

## Embedded FinBoard Buyer Lens

No exact Buyer Lens skill is available in the installed skills or public skill catalog. Embed a FinBoard specific buyer lens in this skill instead of depending on an unrelated third party persona skill.

Score every candidate out of 100:

1. Buyer pain and urgency: 20
2. Search and commercial intent: 20
3. FinBoard product relevance: 20
4. Competitor content gap: 15
5. AI citation and GEO potential: 15
6. Ability to provide practical value: 10

The buyer lens should favor topics that help a buyer answer:

1. What problem am I experiencing?
2. What is causing it?
3. What process or workpaper can help now?
4. When should I use software instead of spreadsheets?
5. Why is FinBoard relevant to the next step?

Select the two highest scoring eligible blog topics and the two highest scoring eligible template topics.

## Blog Creation Contract

For each selected blog:

1. Create an SEO and GEO content brief.
2. Write a complete source backed article.
3. Use FinBoard Team as the author.
4. Link the author to `https://www.linkedin.com/company/finboard-ai-native-finance`.
5. Create a blog cover image.
6. Add metadata, structured data, internal links, and source links using existing repository conventions.
7. Use the existing FinBoard blog content system without changing the generic page implementation.

## Template Creation Contract

For each selected template:

1. Define a practical CPA or accountant use case.
2. Create a usable XLSX workbook with instructions, sample data, formulas, controls, and a Summary sheet.
3. Support the input style appropriate to the use case.
4. Create the published cover from the workbook Summary.
5. Create a template landing page with category, description, about copy, local XLSX path, local cover path, and two lead questions.
6. Use the existing FinBoard template content and lead gate system without changing the generic page implementation.

## Plain Text Contract

Clean all visible generated text before publication.

Use normal ASCII punctuation wherever practical. Remove:

1. Decorative dashes and title separators
2. Decorative bullets
3. Arrows
4. Emoji
5. Stars and check marks used for decoration
6. Repeated punctuation used only for appearance
7. Unnecessary special characters in titles, descriptions, workbook labels, notes, metadata, and skill instructions

Preserve special characters only when they are required for correct technical syntax, formulas, URLs, code, financial notation, or a proper name.

## Atomic Publication

Generate all four items before publishing anything.

The required batch order is:

1. Blog 1
2. Template 1
3. Blog 2
4. Template 2

If any research, article, image, workbook, cover, or landing page cannot be created, stop before the batch commit and leave the published website unchanged.

When all four items exist:

1. Create the batch record.
2. Stage only the four content items, their assets, and the batch record.
3. Create one batch commit.
4. Push directly to `origin/main`.

Do not publish a partial batch.

## Batch Record

The tracked JSON record contains:

1. Publication date
2. Time zone
3. Research sources
4. Candidate blog topics and scores
5. Candidate template topics and scores
6. Selected topics and selection reasons
7. Final slugs
8. Publication order
9. Stable batch ID
10. Batch commit subject

The record cannot contain the SHA of the same atomic commit that contains the record because the SHA depends on the record contents. Report the actual commit SHA after the push instead of storing a self referential value.

The batch record is the durable source for the next cadence check and duplication review.

## Error Handling

Stop before publication when:

1. The current date is a skip day.
2. Research sources are unavailable.
3. Fewer than two eligible blog or template topics remain after duplication checks.
4. Any required image, XLSX file, content source, or landing page cannot be created.
5. The Git worktree contains overlapping user changes in files selected for the batch.
6. Direct push requires authority that is not available.

Report the blocking stage and preserve all unrelated user files.

## Success Result

A successful invocation on an eligible day leaves:

1. Two published blogs
2. Two published financial templates
3. Two blog cover images
4. Two XLSX files
5. Two workbook Summary covers
6. Two template landing pages
7. One tracked batch record
8. One batch commit on `origin/main`

No verification phase follows publication.
