import AboutPage from "@/views/AboutPage";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { AUTHORS } from "@/lib/authors";

export const metadata = buildMetadata({
  title: "About FinBoard | AI-Native Finance for Multi-Entity Operators",
  description:
    "FinBoard builds AI-native finance infrastructure for multi-entity operators. Meet the team — finance and engineering leaders from PwC, Rippling, Samsung and more.",
  path: "/about",
});

const ABOUT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}/about`,
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "FinBoard",
    url: `${SITE_URL}/`,
    description:
      "AI-native finance platform for multi-entity operators: consolidation, month-end close, FP&A, reporting and spend in one governed workspace.",
    founder: Object.values(AUTHORS).map((a) => ({
      "@type": "Person",
      name: a.name,
      jobTitle: a.role,
      sameAs: [a.linkedin],
      alumniOf: (a.alumniOf || []).map((n) => ({ "@type": "Organization", name: n })),
    })),
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_JSON_LD) }}
      />
      <AboutPage />
    </>
  );
}
