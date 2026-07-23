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

test("navbar uses the compact menu until the full navigation can fit", () => {
  const source = readSource("src/components/landing/Navbar.jsx");

  assert.match(source, /hidden xl:flex items-center gap-7/);
  assert.match(source, /hidden xl:flex items-center gap-3/);
  assert.match(source, /className="xl:hidden p-2 rounded-md hover:bg-black\/5"/);
  assert.match(source, /className="xl:hidden border-t border-line bg-\[#F5F0E8\]"/);
});

test("testimonials page renders an accessible non-autoplaying video", () => {
  const component = readSource("src/components/landing/TestimonialVideo.jsx");
  const page = readSource("src/views/TestimonialsPage.jsx");
  assert.match(component, /data-testid="testimonial-video-section"/);
  assert.match(component, /data-testid="testimonial-video"/);
  assert.match(component, /controls/);
  assert.match(component, /preload="metadata"/);
  assert.match(component, /aria-label="FinBoard customer testimonial video"/);
  assert.match(component, /src="\/videos\/finboard-testimonial\.mp4"/);
  assert.doesNotMatch(component, /autoPlay/);
  assert.match(page, /<Testimonials \/>[\s\S]*<TestimonialVideo \/>[\s\S]*<CTABand/);
});

test("testimonial video identifies Olga Hurtado and NeatBooks LLC", () => {
  const component = readSource("src/components/landing/TestimonialVideo.jsx");

  assert.match(component, /data-testid="testimonial-video-attribution"/);
  assert.match(component, />Olga Hurtado</);
  assert.match(component, />NeatBooks LLC</);
});

test("web-ready testimonial video asset is present", () => {
  const asset = path.join(FRONTEND_DIR, "public/videos/finboard-testimonial.mp4");
  assert.ok(fs.existsSync(asset), "testimonial video asset must exist");
  assert.ok(fs.statSync(asset).size > 0, "testimonial video asset must not be empty");
});
