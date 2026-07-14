const path = require("path");

// Baseline security headers applied to every route. A Content-Security-Policy
// is intentionally omitted here: the app serves inline scripts (JSON-LD, gtag,
// the DataClone suppressor) plus third parties (GA, Calendly, LogRocket), so a
// CSP needs dedicated nonce work and is tracked separately to avoid breakage.
const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // This app dir has its own yarn.lock; pin the tracing root here so Next does
  // not walk up to a parent lockfile.
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

module.exports = nextConfig;
