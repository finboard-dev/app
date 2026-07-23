import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = path.join(TEST_DIR, "..");
const readSource = (relativePath) => fs.readFileSync(path.join(FRONTEND_DIR, relativePath), "utf8");

test("navbar exposes Login links to the FinBoard app on desktop and mobile", () => {
  const source = readSource("src/components/landing/Navbar.jsx");
  assert.match(source, /data-testid="nav-login-link"[\s\S]*?href="https:\/\/app\.finboard\.ai"/);
  assert.match(source, /data-testid="mobile-nav-login-link"[\s\S]*?href="https:\/\/app\.finboard\.ai"/);
});
