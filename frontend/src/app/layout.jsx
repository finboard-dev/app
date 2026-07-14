import { Inter } from "next/font/google";
import Script from "next/script";
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

// Site-wide organization / software schema (from public/index.html).
const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FinBoard",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-native finance platform for multi-entity operators: consolidation, month-end close, FP&A, reporting and spend in one governed workspace.",
  url: "https://finboard.ai/",
  image: "https://finboard.ai/brand/finboard-landscape.png",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Custom-quoted per group",
  },
  publisher: {
    "@type": "Organization",
    name: "FinBoard",
    url: "https://finboard.ai/",
    logo: "https://finboard.ai/brand/finboard-mark-dark.png",
  },
};

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
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
      </body>
    </html>
  );
}
