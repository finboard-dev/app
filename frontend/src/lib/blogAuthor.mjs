export const FINBOARD_TEAM_AUTHOR = Object.freeze({
  id: "finboard-team",
  name: "FinBoard Team",
  role: "",
  bio: "Written by the FinBoard team. We build multi-entity reporting and consolidation for QuickBooks Online, and we write from what we see across our customers' books.",
  linkedin: "https://finboard.ai/about",
});

export const FINBOARD_TEAM_SCHEMA_AUTHOR = Object.freeze({
  "@type": "Organization",
  "@id": "https://finboard.ai/#organization",
  name: "FinBoard Team",
  url: "https://finboard.ai/about",
});

const ARTICLE_TYPES = new Set([
  "Article",
  "AdvertiserContentArticle",
  "NewsArticle",
  "AnalysisNewsArticle",
  "AskPublicNewsArticle",
  "BackgroundNewsArticle",
  "OpinionNewsArticle",
  "ReportageNewsArticle",
  "ReviewNewsArticle",
  "Report",
  "SatiricalArticle",
  "ScholarlyArticle",
  "MedicalScholarlyArticle",
  "SocialMediaPosting",
  "BlogPosting",
  "LiveBlogPosting",
  "DiscussionForumPosting",
  "TechArticle",
  "APIReference",
]);

function schemaTypeName(value) {
  if (typeof value !== "string") return null;
  return value.replace(/^https?:\/\/schema\.org\//, "");
}

function isArticleType(value) {
  const types = Array.isArray(value) ? value : [value];
  return types.some((type) => ARTICLE_TYPES.has(schemaTypeName(type)));
}

export function resolveAuthor() {
  return FINBOARD_TEAM_AUTHOR;
}

export function normalizeBlogStructuredData(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeBlogStructuredData);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const normalized = Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      normalizeBlogStructuredData(child),
    ]),
  );

  if (isArticleType(normalized["@type"])) {
    normalized.author = { ...FINBOARD_TEAM_SCHEMA_AUTHOR };
  }

  return normalized;
}
