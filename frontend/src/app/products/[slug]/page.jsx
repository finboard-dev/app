import { notFound } from "next/navigation";
import Product from "@/views/Product";
import { PRODUCTS, PRODUCTS_BY_SLUG } from "@/data/products";
import { buildMetadata, breadcrumbs } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS_BY_SLUG[slug];
  if (!product) return {};
  return buildMetadata({
    title: `${product.nav} Software for Multi-Entity Groups | FinBoard`,
    description: product.metaDescription || product.subhead,
    path: `/products/${slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = PRODUCTS_BY_SLUG[slug];
  if (!product) notFound();

  // No /products index route exists, so go straight Home -> product. (A middle
  // "Products" crumb pointing at "/" duplicates Home's URL and invalidates the
  // BreadcrumbList.)
  const breadcrumbJsonLd = breadcrumbs([
    { name: "Home", path: "/" },
    { name: product.nav, path: `/products/${slug}` },
  ]);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://finboard.ai/products/${slug}#service`,
    name: product.nav,
    description: product.metaDescription || product.subhead,
    url: `https://finboard.ai/products/${slug}`,
    serviceType: "Financial software",
    provider: { "@id": "https://finboard.ai/#organization" },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbJsonLd, serviceJsonLd]),
        }}
      />
      <Product slug={slug} />
    </>
  );
}
