import Landing from "@/views/Landing";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const VIDEO_URL = `${SITE_URL}/videos/finboard-testimonial.mp4`;
const VIDEO_POSTER = `${SITE_URL}/videos/finboard-testimonial-poster.jpg`;

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

// VideoObject structured data — enables video rich results in Google Search.
// Hosted on the homepage (highest authority) since the testimonial now leads here.
const VIDEO_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Olga Hurtado, Founder & CEO of NeatBooks LLC, on FinBoard",
  description:
    "Olga Hurtado runs a 20-person accounting firm, and FinBoard powers their complex franchise consolidations across multiple restaurant chains. Hear what they have to say about FinBoard.",
  thumbnailUrl: [VIDEO_POSTER],
  uploadDate: "2026-07-23",
  duration: "PT2M1S",
  contentUrl: VIDEO_URL,
  embedUrl: `${SITE_URL}/`,
  publisher: {
    "@type": "Organization",
    name: "FinBoard",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/finboard-landscape.png`,
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_JSON_LD) }}
      />
      <Landing />
    </>
  );
}
