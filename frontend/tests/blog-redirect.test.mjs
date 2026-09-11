import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const nextConfig = require("../next.config.js");

test("legacy plural blog URL permanently redirects to the canonical blog index", async () => {
  const redirects = await nextConfig.redirects();
  const blogsRedirect = redirects.find(({ source }) => source === "/blogs");

  assert.deepEqual(blogsRedirect, {
    source: "/blogs",
    destination: "/blog",
    permanent: true,
  });
});
