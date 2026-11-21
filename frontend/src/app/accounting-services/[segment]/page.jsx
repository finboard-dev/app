import { notFound } from "next/navigation";
import AccountingServices from "@/views/AccountingServices";
import { SEGMENTS, SEGMENTS_BY_SLUG } from "@/data/accounting/segments";
import { ACCOUNTING_PATH } from "@/data/accountingServices";
import { buildMetadata, breadcrumbs, SITE_URL } from "@/lib/seo";

// Only the listed segment pages exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({ params }) {
  const { segment } = await params;
  const page = SEGMENTS_BY_SLUG[segment];
  if (!page) return {};
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: `${ACCOUNTING_PATH}/${segment}` });
}

export default async function Page({ params }) {
  const { segment } = await params;
  const page = SEGMENTS_BY_SLUG[segment];
  if (!page) notFound();

  const path = `${ACCOUNTING_PATH}/${segment}`;
  const url = `${SITE_URL}${path}`;
  const breadcrumb = {
    ...breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Accounting services", path: ACCOUNTING_PATH },
      { name: page.breadcrumb, path },
    ]),
    "@id": `${url}#breadcrumb`,
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.breadcrumb,
    description: page.metaDescription,
    url,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "US",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AccountingServices segment={segment} />
    </>
  );
}
