# Research and Scoring Contract

## Evidence

Use current web research and available SEO capabilities. Collect direct URLs for competitor pages, current search results, AI answer patterns, and buyer questions. Research keyword demand for every candidate and record a measurable demand signal with its source and observation date. Inspect existing files in `frontend/content/blog` and `frontend/content/templates` before scoring.

Create separate blog and template candidate pools. Include at least six candidates in each pool before rejection.

## Candidate record

Each candidate contains:

```json
{
  "topic": "Plain topic title",
  "primaryKeyword": "keyword",
  "demandEvidence": {
    "metric": "Monthly search volume, trend, or another named demand signal",
    "value": "Measured value",
    "sourceUrl": "https://example.com/demand-source",
    "observedDate": "YYYY-MM-DD"
  },
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
