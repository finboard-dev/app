const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // This app dir has its own yarn.lock; pin the tracing root here so Next does
  // not walk up to a parent lockfile.
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
