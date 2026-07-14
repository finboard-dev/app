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

  const jsonLd = breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Products", path: "/" },
    { name: product.nav, path: `/products/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Product slug={slug} />
    </>
  );
}
