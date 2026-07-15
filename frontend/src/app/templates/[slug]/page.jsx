import { notFound } from "next/navigation";
import TemplateDetail from "@/views/TemplateDetail";
import { getAllTemplates, getTemplateBySlug } from "@/lib/templates";
import { buildMetadata, breadcrumbs, clampDescription, SITE_URL, DEFAULT_IMAGE } from "@/lib/seo";

export function generateStaticParams() {
  return getAllTemplates().map((t) => ({ slug: t.slug }));
}

function absoluteImage(image) {
  if (!image) return DEFAULT_IMAGE;
  return image.startsWith("http") ? image : `${SITE_URL}${image}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);
  if (!tpl) return {};
  return buildMetadata({
    title: `${tpl.title} — Free Template | FinBoard`,
    description: clampDescription(tpl.excerpt),
    path: `/templates/${slug}`,
    image: absoluteImage(tpl.image),
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);
  if (!tpl) notFound();

  const breadcrumbJsonLd = breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: tpl.title, path: `/templates/${slug}` },
  ]);

  // Prefer CMS-authored structured data; otherwise synthesize a CreativeWork.
  const generated = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: tpl.title,
    description: tpl.excerpt,
    url: `${SITE_URL}/templates/${slug}`,
    image: absoluteImage(tpl.image),
    genre: tpl.category,
    isAccessibleForFree: true,
    provider: { "@id": `${SITE_URL}/#organization` },
  };

  const schemas = [tpl.structuredData || generated, breadcrumbJsonLd];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <TemplateDetail template={tpl} />
    </>
  );
}
