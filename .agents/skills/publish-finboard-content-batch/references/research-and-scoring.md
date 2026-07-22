# Research and Scoring Contract

## Evidence

Use current web research and available SEO capabilities. Collect direct URLs for competitor pages, current search results, AI answer patterns, and buyer questions. Research keyword demand for every candidate and record a measurable demand signal with its source and observation date. Inspect existing files in `frontend/content/blog` and `frontend/content/templates` before scoring.

Create separate blog and template candidate pools. Include at least six candidates in each pool before rejection.

## Candidate record

Each candidate contains:

```json
{
  "candidateId": "blog-or-template-stable-id",
  "topic": "Plain topic title",
  "primaryKeyword": "keyword",
  "keywordDemandEvidence": {
    "metric": "monthlySearchVolume",
    "value": 100,
    "sourceUrl": "https://example.com/demand-source",
    "observedDate": "YYYY-MM-DD"
  },
  "buyer": "CPA, accountant, controller, or multi entity finance team",
  "pain": "Specific operating problem",
  "competitorGap": "What existing results fail to answer",
  "finboardConnection": "Relevant FinBoard product or workflow",
  "sourceUrls": ["https://example.com/source"],
  "score": 75,
  "scoreBreakdown": {
    "buyerPain": 20,
    "searchIntent": 20,
    "productRelevance": 20,
    "competitorGap": 10,
    "geoPotential": 5,
    "practicalValue": 0
  },
  "eligible": true,
  "rejectionReason": null
}
```

`candidateId` is nonempty and unique within its pool. `scoreBreakdown` contains exactly `buyerPain` from 0 to 20, `searchIntent` from 0 to 20, `productRelevance` from 0 to 20, `competitorGap` from 0 to 15, `geoPotential` from 0 to 15, and `practicalValue` from 0 to 10. Every dimension and `score` is finite and numeric. `score` is from 0 to 100 and equals the `scoreBreakdown` total within 0.000001. The keyword demand evidence contains a named metric, numeric value, direct source URL, and ISO observation date.

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
