import Landing from "@/views/Landing";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { VIDEO_TESTIMONIALS } from "@/data/videoTestimonials";

// Both customer testimonial videos are embedded on this page, so both are
// declared for Open Graph. Derived from the same list the page renders.
const OG_VIDEOS = VIDEO_TESTIMONIALS.map((testimonial) => {
  const url = `${SITE_URL}${testimonial.videoPath}`;
  return { url, secureUrl: url, type: "video/mp4", width: 1920, height: 1080 };
});

const baseMetadata = buildMetadata({
  title: "FinBoard | AI Native Finance for Multi-Entity Operators",
  description:
    "Consolidation, month-end close, FP&A, reporting and spend across every entity, all in one governed AI-native workspace with a forward-deployed team.",
  path: "/",
});

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    videos: OG_VIDEOS,
  },
};

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <Landing />
    </>
  );
}
