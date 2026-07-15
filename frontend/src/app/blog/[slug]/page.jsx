import { notFound } from "next/navigation";
import BlogPost from "@/views/BlogPost";
import { getAllPosts, getPostBySlug, categoryLabel } from "@/lib/blog";
import { buildMetadata, breadcrumbs, clampDescription, SITE_URL, DEFAULT_IMAGE } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// CMS cover images are absolute (Framer) URLs; hand-authored ones are
// site-relative paths. Resolve both to an absolute URL.
function absoluteImage(coverImage) {
  if (!coverImage) return DEFAULT_IMAGE;
  return coverImage.startsWith("http") ? coverImage : `${SITE_URL}${coverImage}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { frontmatter } = post;
  return buildMetadata({
    title: `${frontmatter.title} | FinBoard Blog`,
    description: clampDescription(frontmatter.excerpt),
    path: `/blog/${slug}`,
    type: "article",
    image: absoluteImage(frontmatter.coverImage),
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, format, structuredData } = post;

  // Up to 3 more posts in the same category for internal linking.
  const related = getAllPosts()
    .filter((p) => p.slug !== slug && p.category === frontmatter.category)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      coverImage: p.coverImage,
      coverAlt: p.coverAlt,
      readingTime: p.readingTime,
    }));

  const breadcrumbJsonLd = breadcrumbs([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: frontmatter.title, path: `/blog/${slug}` },
  ]);

  // Prefer the CMS-authored structured data (rich @graph). Otherwise synthesize
  // an Article. Always add our BreadcrumbList.
  const generatedArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    ...(frontmatter.date
      ? { datePublished: frontmatter.date, dateModified: frontmatter.date }
      : {}),
    author: { "@type": "Organization", name: frontmatter.author, url: `${SITE_URL}/` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: absoluteImage(frontmatter.coverImage),
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  const schemas = [structuredData || generatedArticle, breadcrumbJsonLd];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <BlogPost
        frontmatter={frontmatter}
        categoryLabel={categoryLabel(frontmatter.category)}
        content={content}
        format={format}
        related={related}
      />
    </>
  );
}
