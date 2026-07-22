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
