from copy import deepcopy

AUTHOR_ID = "finboard-team"
AUTHOR_NAME = "FinBoard Team"
SCHEMA_AUTHOR = {
    "@type": "Organization",
    "@id": "https://finboard.ai/#organization",
    "name": AUTHOR_NAME,
    "url": "https://finboard.ai/about",
}
ARTICLE_TYPES = {
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
}


def _schema_type_name(value):
    if not isinstance(value, str):
        return None
    for prefix in ("http://schema.org/", "https://schema.org/"):
        if value.startswith(prefix):
            return value[len(prefix):]
    return value


def _is_article_type(value):
    values = value if isinstance(value, list) else [value]
    return any(_schema_type_name(item) in ARTICLE_TYPES for item in values)


def normalize_structured_data(value):
    if isinstance(value, list):
        return [normalize_structured_data(item) for item in value]
    if not isinstance(value, dict):
        return value

    normalized = {
        key: normalize_structured_data(child)
        for key, child in value.items()
    }
    if _is_article_type(normalized.get("@type")):
        normalized["author"] = deepcopy(SCHEMA_AUTHOR)
    return normalized


def normalize_post(post):
    normalized = deepcopy(post)
    normalized["author"] = AUTHOR_NAME
    normalized["authorId"] = AUTHOR_ID
    normalized["structuredData"] = normalize_structured_data(
        normalized.get("structuredData")
    )
    return normalized
