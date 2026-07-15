import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "@/index.css";
import "@/App.css";
import Providers from "./providers";

const GA_MEASUREMENT_ID = "G-YDZCD9VQJS";

// Mirror the Google Fonts Inter (weight 600) that public/index.html loaded.
// The full Inter weight/italic range is still loaded via the @import in
// index.css, which drives all `font-family: 'Inter'` usage — this ensures the
// 600 weight is available at first paint without changing any classNames.
const inter = Inter({ subsets: ["latin"], weight: "600", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://finboard.ai"),
  title: {
    default: "FinBoard | AI Native Finance for Multi-Entity Operators",
    template: "%s",
  },
  description:
    "AI-native finance platform for multi-entity operators: consolidation, month-end close, FP&A, reporting and spend in one governed workspace.",
  keywords:
    "multi-entity accounting, financial consolidation software, AI finance platform, month-end close, FP&A software, group reporting, spend management, forward-deployed finance, fractional CFO tools",
  authors: [{ name: "FinBoard" }],
  robots: "index, follow",
  icons: {
    icon: "/brand/finboard-mark-dark.png",
    apple: "/brand/finboard-mark-dark.png",
  },
};

export const viewport = {
  themeColor: "#0A0A0A",
};

// Site-wide structured data: the software product, the publishing
// organization, and the website entity, emitted as one JSON-LD graph.
// Nodes are cross-linked by @id so search/AI engines resolve a single entity.
const SITE_URL = "https://finboard.ai";
const LOGO_URL = `${SITE_URL}/brand/finboard-mark-dark.png`;
const SITE_DESCRIPTION =
  "AI-native finance platform for multi-entity operators: consolidation, month-end close, FP&A, reporting and spend in one governed workspace.";

const SITE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "FinBoard",
    // FinanceApplication is a more precise category than BusinessApplication.
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    image: [LOGO_URL, `${SITE_URL}/brand/finboard-landscape.png`],
    // Custom-quoted product: describe the pricing model rather than declaring a
    // literal price (a `price: "0"` would be parsed as "free" — factually wrong).
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        description:
          "Custom-quoted per group. Pricing varies by entity count, modules and seats.",
      },
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/pricing`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "FinBoard",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    // TODO: add company social profiles once live, e.g.
    // sameAs: ["https://www.linkedin.com/company/finboard-ai", "https://x.com/..."]
    // to strengthen entity resolution for Google Knowledge Graph and AI engines.
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "FinBoard",
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

// Suppress a benign DataCloneError from PerformanceServerTiming (ported verbatim
// from public/index.html).
const DATA_CLONE_SUPPRESS =
  'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }}
        />
        <script dangerouslySetInnerHTML={{ __html: DATA_CLONE_SUPPRESS }} />
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
      </head>
      <body>
        <Providers>
          <div className="App">{children}</div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
