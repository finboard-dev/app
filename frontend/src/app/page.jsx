import Landing from "@/views/Landing";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const VIDEO_URL = `${SITE_URL}/videos/finboard-testimonial.mp4`;

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
    videos: [
      {
        url: VIDEO_URL,
        secureUrl: VIDEO_URL,
        type: "video/mp4",
        width: 1920,
        height: 1080,
      },
    ],
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
