import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { VIDEO_TESTIMONIALS } from "../src/data/videoTestimonials.js";
import { VIDEOS } from "../src/data/videos.js";

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
  assert.match(component, /aria-label=\{videoLabel\}/);
  assert.match(component, /<source src=\{videoPath\} type="video\/mp4" \/>/);
  assert.doesNotMatch(component, /autoPlay/);
  assert.match(page, /<TestimonialVideo \/>[\s\S]*<Testimonials \/>[\s\S]*<CTABand/);
});

test("both customer video testimonials render on the homepage and testimonials page", () => {
  const component = readSource("src/components/landing/TestimonialVideo.jsx");
  const landing = readSource("src/views/Landing.jsx");
  const page = readSource("src/views/TestimonialsPage.jsx");

  // One <TestimonialVideo /> on each page renders every entry in the data file,
  // so a new customer video needs no page edit.
  assert.match(component, /VIDEO_TESTIMONIALS\.map/);
  assert.match(landing, /<TestimonialVideo \/>/);
  assert.match(page, /<TestimonialVideo \/>/);
  assert.equal(VIDEO_TESTIMONIALS.length, 2);
});

test("video testimonials identify the speaker and link to their company", () => {
  const component = readSource("src/components/landing/TestimonialVideo.jsx");
  assert.match(component, /data-testid="testimonial-video-attribution"/);
  assert.match(component, /data-testid="testimonial-video-company-link"/);

  const olga = VIDEO_TESTIMONIALS.find((t) => t.id === "olga-hurtado-neatbooks");
  assert.equal(olga.name, "Olga Hurtado");
  assert.equal(olga.company, "NeatBooks LLC");
  assert.equal(olga.companyUrl, "https://neatbooksllc.com/");

  const corinnee = VIDEO_TESTIMONIALS.find((t) => t.id === "corinnee-vallier-kindbridge");
  assert.equal(corinnee.name, "Corinnee Vallier");
  assert.equal(corinnee.company, "Kindbridge Behavioral Health");
  assert.equal(corinnee.companyUrl, "https://kindbridge.com/");
  assert.equal(corinnee.linkedinUrl, "https://www.linkedin.com/in/corinnee-v-4078515/");

  // The name links to the person and the role line to their employer, so both
  // targets must be real URLs on every testimonial.
  for (const testimonial of VIDEO_TESTIMONIALS) {
    assert.match(testimonial.companyUrl, /^https:\/\//);
    assert.match(testimonial.linkedinUrl, /^https:\/\/www\.linkedin\.com\/in\//);
  }
});

test("video testimonials alternate which side the video sits on", () => {
  const component = readSource("src/components/landing/TestimonialVideo.jsx");

  // Odd-indexed testimonials put the video on the left, so consecutive
  // testimonials mirror each other instead of stacking identically.
  assert.match(component, /const mediaFirst = index % 2 === 1;/);
  assert.match(component, /lg:col-span-3 \$\{mediaFirst \? "lg:order-2" : "lg:order-1"\}/);
  assert.match(component, /lg:col-span-7 \$\{mediaFirst \? "lg:order-1" : "lg:order-2"\}/);
});

test("web-ready testimonial video assets are present", () => {
  for (const testimonial of VIDEO_TESTIMONIALS) {
    for (const assetPath of [testimonial.videoPath, testimonial.posterPath]) {
      const asset = path.join(FRONTEND_DIR, "public", assetPath);
      assert.ok(fs.existsSync(asset), `${assetPath} must exist`);
      assert.ok(fs.statSync(asset).size > 0, `${assetPath} must not be empty`);
    }
  }
});

test("each video testimonial has a canonical watch page entry", () => {
  for (const testimonial of VIDEO_TESTIMONIALS) {
    const video = VIDEOS.find((v) => v.videoPath === testimonial.videoPath);
    assert.ok(video, `${testimonial.videoPath} must appear in data/videos.js`);
    assert.match(video.duration, /^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/);
  }
});
