// Centralized SEO helpers for Next.js Metadata API.
// Ports the constants and breadcrumb schema from the old SEO component.

export const SITE_URL = "https://finboard.ai";
export const DEFAULT_IMAGE = `${SITE_URL}/brand/finboard-landscape.png`;

/**
 * Build a Next.js Metadata object for a page.
 * Mirrors the tags the old <Seo> component emitted: title, description,
 * canonical, Open Graph and Twitter.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const canonical = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      siteName: "FinBoard",
      title,
      description,
      url: canonical,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Clamp a meta description to ~155 chars on a word boundary (SERP-safe). */
export function clampDescription(text, max = 155) {
  const t = String(text || "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).replace(/\s+\S*$/, "").replace(/[,;:]$/, "") + "…";
}

/** Helper: BreadcrumbList schema from [{name, path}] pairs. */
export function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
