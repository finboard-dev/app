import { notFound } from "next/navigation";
import ComparePage from "@/views/ComparePage";
import { COMPARISONS, COMPARISONS_BY_SLUG } from "@/data/compare/pages";
import { buildMetadata, breadcrumbs, SITE_URL } from "@/lib/seo";

// Only the five comparison slugs exist; Google Ads points at these exact URLs.
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = COMPARISONS_BY_SLUG[slug];
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/compare/${slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = COMPARISONS_BY_SLUG[slug];
  if (!page) notFound();

  const url = `${SITE_URL}/compare/${slug}`;
  // No /compare index route exists, so the trail goes straight Home -> page
  // (same rule as the industry pages).
  const breadcrumb = {
    ...breadcrumbs([
      { name: "Home", path: "/" },
      { name: page.breadcrumb, path: `/compare/${slug}` },
    ]),
    "@id": `${url}#breadcrumb`,
  };
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#software` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <ComparePage page={page} />
    </>
  );
}
