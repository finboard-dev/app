# SEO/GEO Blog Pair Design

## Goal

Publish two authoritative FinBoard articles that expand organic discovery beyond narrow product-intent searches while preserving a credible path to FinBoard's multi-entity reporting product. The pair combines one timely QuickBooks product-change explainer with one durable small-business financial-literacy guide.

## Audience and success criteria

The editorial priority is broad organic reach across FinBoard's audience segments rather than optimizing only for immediate demo requests. Both articles must nevertheless connect naturally to FinBoard's reporting capabilities and existing resources.

The work succeeds when:

- two new article URLs are published and return successful responses;
- each article targets a distinct search intent without duplicating an existing FinBoard post;
- claims about QuickBooks functionality are supported by current Intuit documentation;
- each article provides answer-first passages, useful tables, and question-based sections suitable for conventional search and AI citation;
- every post has a unique cover image, accurate metadata, descriptive alternative text, Article and Breadcrumb structured data, and relevant internal links;
- the production pages render correctly on desktop and mobile and appear in the generated sitemap.

## Selected article 1

### Working title

**QuickBooks Online Added Multi-Entity Reporting in 2026: What It Does, What It Still Misses**

### Search intent and audience

This article answers whether QuickBooks can now consolidate multiple companies and how the answer differs by QuickBooks product and region. It serves accounting firms, controllers, CFOs, and operators managing multiple legal entities.

Primary query cluster:

- QuickBooks multi-entity reporting 2026
- QuickBooks consolidated reports multiple companies
- QuickBooks Online Accountant consolidated report
- Intuit Enterprise Suite consolidation
- can QuickBooks consolidate companies

### Editorial position

The article must not repeat the outdated blanket claim that QuickBooks Online cannot consolidate. It will explain that Intuit now offers different multi-entity capabilities through different products and regions:

- Intuit Enterprise Suite in the United States includes consolidated P&L, balance sheet, cash flow, trial balance, transaction-level reports, intercompany workflows, and shared chart-of-accounts features.
- QuickBooks Online Accountant documentation in the United Kingdom describes a narrower consolidated-report builder for P&L and balance sheet, with access varying by region or firm.
- FinBoard remains relevant where a team needs spreadsheet-native delivery, custom management reporting, cross-source data, reusable mappings, drill-down, or a different implementation and pricing profile.

The comparison must be accurate and respectful. It will help readers choose a fit rather than presenting every native limitation as a sales objection.

### Planned structure

1. A 40-60 word direct answer explaining that QuickBooks now has multi-entity functionality, but capabilities depend on the product and region.
2. A short summary table comparing ordinary QBO company files, the documented QBO Accountant consolidated-report experience, Intuit Enterprise Suite, and FinBoard.
3. What changed in 2026.
4. What Intuit Enterprise Suite can consolidate.
5. What the documented QBO Accountant workflow can do.
6. How account mapping, adjustments, and eliminations differ.
7. When native QuickBooks reporting is enough.
8. When a separate reporting and consolidation layer still makes sense.
9. A decision checklist organized by entity count, report type, workflow, data source, and output destination.
10. Concise FAQs answering the primary query variations.
11. A contextual FinBoard CTA inviting readers to evaluate the workflow using their own entities.

### Required sources

The factual core must cite current primary documentation, including:

- Intuit's US help article for consolidated reports in Intuit Enterprise Suite, updated May 26, 2026;
- Intuit's UK help article for multi-entity reports in QuickBooks Online Accountant, updated in July 2026;
- Intuit's US help article for a shared multi-entity chart of accounts, updated July 16, 2026.

Secondary sources may supply workflow context, but no unsupported competitor feature, price, customer-count, or performance claim may be included. Any availability caveat must remain explicit.

### Internal links

The article will link contextually to:

- the existing guide comparing every method for combining reports from multiple QuickBooks companies;
- the FinBoard versus LiveFlow comparison;
- the intercompany-eliminations guide;
- the relevant FinBoard multi-entity product or industry page;
- pricing or demo only where the CTA is appropriate.

### Cover image

Create a landscape editorial illustration for a blog/social preview. Several distinct company ledgers flow into one unified financial statement or reporting grid. Use FinBoard's warm neutral, black, white, and restrained blue visual language. Keep generous negative space and crisp shapes. Do not use the QuickBooks logo, UI copied from a real product, embedded words, numbers, watermarks, or unsupported performance claims.

Suggested filename:

`frontend/public/blog/covers/quickbooks-multi-entity-reporting-2026-what-it-does-and-misses.png`

Suggested alt text:

`Multiple QuickBooks company ledgers flowing into one consolidated financial report`

## Selected article 2

### Working title

**Five Numbers Every Small-Business Owner Should Check on Their P&L Each Month**

### Search intent and audience

This is an evergreen, plain-English guide for small-business owners and solopreneurs who receive a profit-and-loss statement but do not know what to inspect or what action to take.

Primary query cluster:

- how to read a profit and loss statement
- P&L numbers to watch
- monthly financial numbers for small business
- what to check on an income statement
- small-business P&L explained

### Editorial position

The article will be an action guide, not a line-by-line accounting glossary. It will show five signals, how to calculate or read each one, what comparison makes it meaningful, and which operating decision it should trigger.

The five signals are:

1. revenue trend;
2. gross margin percentage;
3. operating expense ratio;
4. operating or net profit margin;
5. a cash-coverage or runway companion metric that demonstrates why profit is not the same as cash.

The fifth measure may draw from the balance sheet or cash-flow view, but the article must label that distinction clearly rather than pretending it is a P&L line.

### Planned structure

1. A direct definition and the five-number summary in the opening section.
2. A small worked example used consistently throughout the article.
3. One section per number containing its formula, interpretation, comparison period, warning pattern, and resulting business decision.
4. A table showing what to review daily, weekly, and monthly.
5. Common P&L reading mistakes, including treating revenue as cash, ignoring seasonality, and reviewing one isolated month.
6. How to compare actual results with the previous month, prior year, and budget.
7. A ten-minute monthly review routine.
8. Concise FAQs matching common owner questions.
9. A soft CTA connecting automated, current reports with faster decisions.

The article will avoid universal numeric benchmarks where industry economics differ. When it uses a threshold, it must either be framed as an illustrative example or supported by a relevant primary or authoritative source.

### Internal links

The article will link contextually to:

- the existing profit-versus-cash or cash-flow forecasting content where applicable;
- the consolidated budget-versus-actual guide;
- the multi-location restaurant P&L article as an industry-specific example;
- a suitable FinBoard report/template page;
- the product or demo page only after the reader has received the complete educational answer.

### Cover image

Create a landscape editorial illustration showing a simplified P&L or financial dashboard with five visually distinct signals highlighted. Use FinBoard's warm neutral, black, white, and restrained blue palette. The visual should feel approachable to an owner rather than like an institutional trading terminal. Do not embed labels, numbers, logos, watermarks, or tiny pseudo-UI text.

Suggested filename:

`frontend/public/blog/covers/five-p-and-l-numbers-small-business-owners-should-check.png`

Suggested alt text:

`Small-business profit and loss report with five key financial signals highlighted`

## Shared content and GEO requirements

Both articles will use the repository's JSON blog format and current author/category conventions. Each post should generally be 1,800-2,400 words, with length determined by completeness rather than padding.

Required editorial characteristics:

- the searcher's main answer appears in the first 60 words;
- H2 and H3 headings follow a logical hierarchy and use natural questions where helpful;
- important sections open with a self-contained answer before supporting detail;
- paragraphs stay short and tables are used for comparisons or repeated fields;
- concrete claims cite their sources close to the claim;
- sources favor primary documentation and current authoritative material;
- the prose distinguishes facts, examples, estimates, and FinBoard's interpretation;
- FAQs answer real adjacent queries without repeating entire sections;
- author, publish date, and update date are visible through the existing blog presentation;
- all outbound links are descriptive and all internal links are relevant.

Each JSON artifact will contain a unique title, excerpt, publication date, category, tags, cover path, cover alternative text, HTML content, and structured data. Structured data will include BlogPosting/Article and BreadcrumbList information compatible with the existing renderer. FAQ content may remain in the visible article without FAQ schema unless the current site implementation and search-engine policy make that schema appropriate.

## Publishing flow

The implementation will follow the repository's existing filesystem-backed blog pipeline:

1. create and validate both JSON article files;
2. generate and visually inspect both cover images;
3. run focused content, build, and repository checks;
4. preview both article pages and correct rendering or metadata issues;
5. verify the daily publication cap and current publication dates;
6. commit the content and assets on the appropriate draft branch or use the repository's approved content-deployment workflow;
7. publish through the configured Git/Vercel path;
8. verify the live URLs, images, canonical tags, structured data, internal links, and sitemap entries.

Publishing is not complete merely because files exist locally. Both production URLs must be checked after deployment.

## Risks and controls

- **Product-change accuracy:** Native QuickBooks functionality is changing quickly. Recheck Intuit's primary documentation immediately before drafting and again before publishing.
- **Keyword cannibalization:** The first article must focus on the 2026 product change and decision comparison, while the existing combine-reports article remains the method-by-method implementation guide.
- **Overly promotional prose:** Deliver the full answer before the CTA and acknowledge when native QuickBooks is sufficient.
- **Financial overgeneralization:** Use worked examples and formulas without presenting cross-industry benchmarks as universal rules.
- **Image legibility:** Avoid generated text and inspect each final cover at full size and thumbnail size.
- **Unverified deployment:** Do not mark the work published until both production pages and their metadata have been inspected.

## Verification checklist

- JSON parses successfully and matches the fields consumed by `frontend/src/lib/blog.js`.
- No duplicate slug or substantially duplicate title exists.
- Titles and excerpts fit the current metadata helpers without awkward truncation.
- All cited URLs resolve and directly support the associated claims.
- Images load from their production paths, have correct dimensions, and have meaningful alt text.
- Article and breadcrumb structured data parse correctly.
- The Next.js build and applicable tests pass.
- Desktop and mobile previews show correct typography, tables, lists, and images.
- Canonical URLs point to the final `/blog/<slug>` routes.
- Internal links resolve without redirects or 404 responses.
- Both live article URLs and sitemap entries are verified after deployment.
