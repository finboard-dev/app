import Link from "next/link";
import { VIDEOS } from "@/data/videos";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FinBoard videos | Finance operations for multi-entity teams",
  description:
    "Watch FinBoard videos on multi-entity finance operations, advisory firms, and industry reporting.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <main className="bg-[#F5F0E8] min-h-screen">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0A0A0A]/55">Video library</p>
        <h1 className="mt-4 max-w-3xl font-serif-display text-5xl sm:text-6xl leading-[0.95] tracking-tight text-[#0A0A0A]">
          Finance operations, in motion.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#0A0A0A]/70">
          Short films on multi-entity reporting, advisory workflows, and the teams FinBoard serves.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video) => (
            <Link
              key={video.slug}
              href={`/videos/${video.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#0A0A0A]/10 bg-white shadow-[0_16px_42px_-28px_rgba(10,10,10,0.35)] transition-transform hover:-translate-y-1"
            >
              <img src={video.thumbnailPath} alt="" className="aspect-video w-full object-cover" />
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]/50">{video.topic}</p>
                <h2 className="mt-2 font-serif-display text-2xl leading-tight tracking-tight">{video.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#0A0A0A]/65">{video.description}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-[#0A0A0A] underline underline-offset-4">Watch video</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
