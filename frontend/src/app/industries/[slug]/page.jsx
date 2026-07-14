import { notFound } from "next/navigation";
import Industry from "@/views/Industry";
import { INDUSTRIES, INDUSTRIES_BY_SLUG } from "@/data/industries";
import { buildMetadata, breadcrumbs } from "@/lib/seo";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = INDUSTRIES_BY_SLUG[slug];
  if (!industry) return {};
  return buildMetadata({
    title: `Finance Software for ${industry.nav} | FinBoard`,
    description: industry.metaDescription || industry.subhead,
    path: `/industries/${slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const industry = INDUSTRIES_BY_SLUG[slug];
  if (!industry) notFound();

  // No /industries index route exists, so go straight Home -> industry. (A
  // middle "Industries" crumb pointing at "/" duplicates Home's URL and
  // invalidates the BreadcrumbList.)
  const jsonLd = breadcrumbs([
    { name: "Home", path: "/" },
    { name: industry.nav, path: `/industries/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Industry slug={slug} />
    </>
  );
}
