import Link from "next/link";
import { notFound } from "next/navigation";
import { VIDEOS, VIDEOS_BY_SLUG } from "@/data/videos";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return VIDEOS.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const video = VIDEOS_BY_SLUG[slug];
  if (!video) return {};
  return buildMetadata({
    title: `${video.title} | FinBoard video`,
    description: video.description,
    path: `/videos/${video.slug}`,
    image: `${SITE_URL}${video.thumbnailPath}`,
  });
}

export default async function VideoWatchPage({ params }) {
  const { slug } = await params;
  const video = VIDEOS_BY_SLUG[slug];
  if (!video) notFound();

  const pageUrl = `${SITE_URL}/videos/${video.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: [`${SITE_URL}${video.thumbnailPath}`],
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: `${SITE_URL}${video.videoPath}`,
    mainEntityOfPage: pageUrl,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <Link href="/videos" className="text-sm text-[#F5F0E8]/70 hover:text-white underline underline-offset-4">All videos</Link>
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5F0E8]/55">{video.topic}</p>
        <h1 className="mt-4 max-w-4xl font-serif-display text-4xl sm:text-6xl leading-[0.98] tracking-tight">{video.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#F5F0E8]/70">{video.description}</p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_28px_70px_-30px_rgba(0,0,0,0.8)]">
          <video
            className="block aspect-video w-full"
            controls
            preload="metadata"
            poster={video.thumbnailPath}
            aria-label={video.title}
          >
            <source src={video.videoPath} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[#F5F0E8]/55">
          This is the canonical page for this FinBoard video. The video is available to watch directly above.
        </p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
