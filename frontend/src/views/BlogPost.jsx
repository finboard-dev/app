"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

function formatDate(value) {
  if (!value) return null;
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost({
  frontmatter,
  categoryLabel,
  content,
  format = "markdown",
  related = [],
}) {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="blog-post-page">
      <Navbar onBookDemo={openDemo} />
      <main>
        <article className="max-w-3xl mx-auto px-6 lg:px-8 pt-10 lg:pt-14 pb-16">
          <Link
            href="/blog"
            data-testid="blog-back-link"
            className="inline-flex items-center gap-1.5 text-sm text-[#0A0A0A]/55 hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft size={14} /> All articles
          </Link>

          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {categoryLabel ? (
                <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2563EB]">
                  {categoryLabel}
                </span>
              ) : null}
              {frontmatter.tags?.map((tag) => (
                <span key={tag} className="kbd-chip text-[11px]">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.05] tracking-tight text-[#0A0A0A]">
              {frontmatter.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#0A0A0A]/55">
              <span>{frontmatter.author}</span>
              {frontmatter.date ? (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
                </>
              ) : null}
              <span aria-hidden>·</span>
              <span>{frontmatter.readingTime} min read</span>
            </div>
          </header>

          {frontmatter.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.coverAlt || frontmatter.title}
              className="mt-8 w-full rounded-2xl border border-line object-cover"
              data-testid="blog-cover-image"
            />
          ) : null}

          <div className="mt-8 blog-prose" data-testid="blog-post-body">
            {format === "html" ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            )}
          </div>
        </article>

        {related.length > 0 ? (
          <section
            className="max-w-5xl mx-auto px-6 lg:px-8 pb-8 border-t border-line pt-12"
            data-testid="blog-related"
          >
            <h2 className="font-serif-display text-2xl tracking-tight text-[#0A0A0A] mb-6">
              Related articles
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  data-testid={`blog-related-${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white hover:border-line-strong hover:-translate-y-0.5 transition-all"
                >
                  {post.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      loading="lazy"
                      className="aspect-video w-full object-cover border-b border-line bg-sand"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-serif-display text-[15px] leading-snug tracking-tight text-[#0A0A0A] group-hover:text-[#2563EB] transition-colors">
                      {post.title}
                    </h3>
                    <span className="mt-2 text-[11.5px] text-[#0A0A0A]/45">
                      {post.readingTime} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
