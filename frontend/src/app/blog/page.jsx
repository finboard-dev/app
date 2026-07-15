import BlogIndex from "@/views/BlogIndex";
import { getAllPosts, categoryLabel } from "@/lib/blog";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog | FinBoard",
  description:
    "Playbooks, benchmarks and engineering notes on multi-entity finance: month-end close, consolidation, FP&A, and the systems behind them.",
  path: "/blog",
});

export default function Page() {
  // Attach the display label here so the client view never imports the
  // filesystem-backed blog lib (which uses node:fs).
  const posts = getAllPosts().map((post) => ({
    ...post,
    categoryLabel: categoryLabel(post.category),
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FinBoard Blog",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <BlogIndex posts={posts} />
    </>
  );
}
