# FinBoard Team Blog Author Design

Date: 2026-07-22

Status: Approved direction, pending specification review

## Objective

Every FinBoard blog post must identify FinBoard Team as its author. This rule applies to all existing posts and every future post, regardless of category, source format, publishing script, or embedded structured data.

The exact public author name is `FinBoard Team`. The canonical author identifier is `finboard-team`.

## Scope

This change covers the complete blog publishing system:

1. Visible author names and author cards on blog index and article pages.
2. Author metadata loaded from JSON, Markdown, and MDX content.
3. Article and BlogPosting structured data rendered for search engines and AI systems.
4. Existing blog source files.
5. The automated blog pipeline configuration.
6. Repository scripts that import or generate blog posts.
7. Tests that prevent an individual author from being published accidentally.

This change does not rename people on the About page, team page, or other non-blog product pages. Those are biographies, not blog authorship.

## Canonical Author

The existing `finboard-team` registry entry remains the single source of truth for the public author profile:

1. ID: `finboard-team`
2. Name: `FinBoard Team`
3. Profile URL: `https://finboard.ai/about`
4. Bio: the existing FinBoard Team bio in the author registry

Individual founder records may remain in the registry if another part of the site needs them, but the blog resolver must never select them.

## Runtime Behavior

The blog author resolver will always return the canonical FinBoard Team record. Category and explicit content values will no longer change the selected blog author.

This runtime rule is a safety guard. If an old file, external import, or future generator supplies another author identifier, visitors must still see FinBoard Team.

The blog page will generate article author structured data as an Organization representing FinBoard Team. The author node will use the canonical FinBoard organization identity and the About page URL. Publisher data remains the existing FinBoard organization.

When a JSON post contains custom Article or BlogPosting structured data, its author field must also identify FinBoard Team. Existing custom schema will be migrated at the source so the stored content and rendered page agree.

## Content Migration

Every blog JSON file will contain:

```json
"author": "FinBoard Team",
"authorId": "finboard-team"
```

Every Markdown or MDX file with author frontmatter will contain:

```yaml
author: "FinBoard Team"
authorId: "finboard-team"
```

For embedded Article and BlogPosting schema, the author will be an Organization named FinBoard Team. No existing post will retain an individual person as its article author.

The migration will preserve titles, dates, body content, images, categories, tags, URLs, and all schema fields unrelated to author identity.

## Future Publishing Paths

The automated blog pipeline will expose only `finboard-team` as a valid author. Category based author assignments will be removed.

All repository importers and post generators will emit both the canonical display name and canonical author ID. Any structured data they create will use the FinBoard Team organization author.

The runtime resolver remains authoritative even if a future publishing path omits or misstates author metadata.

## Validation

Automated coverage will verify all of the following:

1. Resolving a blog author for any category returns FinBoard Team.
2. Supplying an individual author ID still returns FinBoard Team.
3. Every JSON blog source uses `finboard-team` and the FinBoard Team display name.
4. Every Markdown and MDX blog source with author metadata uses the canonical values.
5. Every embedded Article or BlogPosting author identifies FinBoard Team and does not identify an individual person.
6. A production build succeeds and generates blog pages without author or schema regressions.

The implementation will also search the blog system for the former individual author IDs and names. Any remaining matches must be either non-blog team biography data or explicitly justified test fixtures.

## Publishing and Verification

After implementation, the relevant test suite and production build will run locally. The site will then run on port 3010 for page checks.

Verification will inspect at least one older article and both newly published articles. Each must show FinBoard Team in the visible byline and in rendered Article structured data.

After verification, the changes will be committed and pushed directly to the configured remote branch, following the user's publishing instruction.

## Risks and Controls

### Stale embedded schema

Some JSON articles contain hand-authored structured data. Migrating only frontmatter would leave conflicting person authors in search metadata. The source migration and schema validation prevent that conflict.

### New generator drift

A future script could introduce another author. The runtime resolver protects the visible page, while repository-wide content tests catch source drift before publishing.

### Unrelated team identity changes

Removing individual people from the shared author registry could affect other pages. The implementation will change blog selection behavior without deleting unrelated person records unless repository inspection proves they are unused and removal is separately warranted.

### Content damage during bulk migration

JSON migration can reorder or rewrite large files. The implementation should use a focused transformation and verify that only author fields changed. Unrelated content and the user's existing untracked files must remain untouched.

## Acceptance Criteria

The work is complete when every existing blog page and every supported publishing path uses FinBoard Team, all article structured data agrees with the visible byline, regression tests pass, the production build passes, local checks on port 3010 pass, and the verified changes are pushed directly to the remote branch.
