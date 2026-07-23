import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = path.join(TEST_DIR, "..");
const readSource = (relativePath) => fs.readFileSync(path.join(FRONTEND_DIR, relativePath), "utf8");

const JSX_OPENING_TAG_CONTENT = "(?:[^>]|=>)*";

const loginAnchorPattern = (testId) => new RegExp(
  `<a\\b(?=${JSX_OPENING_TAG_CONTENT}\\bdata-testid="${testId}")${JSX_OPENING_TAG_CONTENT}>\\s*Login\\s*</a>`,
);

const assertLoginLink = (source, { loginTestId, consultationTestId }) => {
  const anchor = source.match(loginAnchorPattern(loginTestId));
  assert.ok(anchor, `expected ${loginTestId} to be a Login anchor`);
  assert.match(anchor[0], /\bhref="https:\/\/app\.finboard\.ai"/);
  assert.doesNotMatch(anchor[0], /\btarget\s*=/);

  assert.match(
    source,
    new RegExp(
      `${loginAnchorPattern(loginTestId).source}\\s*<button\\b(?=${JSX_OPENING_TAG_CONTENT}\\bdata-testid="${consultationTestId}")`,
    ),
    `${loginTestId} must immediately precede ${consultationTestId}`,
  );
};

test("navbar Login links independently target the FinBoard app before their consultation CTAs", () => {
  const source = readSource("src/components/landing/Navbar.jsx");

  assertLoginLink(source, {
    loginTestId: "nav-login-link",
    consultationTestId: "nav-book-demo-button",
  });
  assertLoginLink(source, {
    loginTestId: "mobile-nav-login-link",
    consultationTestId: "mobile-nav-book-demo",
  });
});
