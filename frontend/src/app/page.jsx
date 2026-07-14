import Landing from "@/views/Landing";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FinBoard | AI Native Finance for Multi-Entity Operators",
  description:
    "Consolidation, month-end close, FP&A, reporting and spend across every entity, all in one governed AI-native workspace with a forward-deployed team.",
  path: "/",
});

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
