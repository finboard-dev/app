import { getAllPosts } from "@/lib/blog";
import { getAllTemplates } from "@/lib/templates";
import { SITE_URL } from "@/lib/seo";

// Generated sitemap served at /sitemap.xml. Static routes are listed once here;
// blog posts are pulled from content/blog automatically, so publishing a post
// adds it to the sitemap with no manual edit. Blog entries carry a real
// lastModified from frontmatter; evergreen marketing routes omit it rather than
// churn a fake "changed today" signal on every deploy.
const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/operators", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/advisory", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/engagement", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/templates", changeFrequency: "weekly", priority: 0.8 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.6 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/products/month-end-close", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/consolidation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/analytics", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/fpa", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/p2p", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products/o2c", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries/restaurants", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries/construction", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries/retail", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries/ecommerce", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries/healthcare", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries/software-and-services", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    ...(post.date ? { lastModified: new Date(post.date) } : {}),
  }));

  const templateEntries = getAllTemplates().map((tpl) => ({
    url: `${SITE_URL}/templates/${tpl.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries, ...templateEntries];
}
