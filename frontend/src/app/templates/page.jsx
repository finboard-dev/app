import TemplatesIndex from "@/views/TemplatesIndex";
import { getAllTemplates, getTemplateCategories } from "@/lib/templates";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Finance Templates for QuickBooks Online | FinBoard",
  description:
    "Free, QuickBooks Online–ready finance templates: budgets, forecasts, P&L, cash flow, calculators and more. Open in Google Sheets and make them yours.",
  path: "/templates",
});

export default function Page() {
  // Trim heavy fields (about/structuredData) from the client gallery payload.
  const templates = getAllTemplates().map((t) => ({
    slug: t.slug,
    title: t.title,
    category: t.category,
    shortDescription: t.shortDescription,
    image: t.image,
    imageAlt: t.imageAlt,
  }));
  const categories = getTemplateCategories();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FinBoard Finance Templates",
    url: `${SITE_URL}/templates`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: templates.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/templates/${t.slug}`,
        name: t.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <TemplatesIndex templates={templates} categories={categories} />
    </>
  );
}
