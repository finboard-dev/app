# Login Navigation and Testimonial Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a direct Login route to the FinBoard application and present the supplied testimonial video on the testimonials page.

**Architecture:** The shared `Navbar` owns desktop and mobile Login links. A focused `TestimonialVideo` component owns native-video semantics and responsive presentation; `TestimonialsPage` composes it between written testimonials and the CTA. A Node test validates static source contracts because the project has no JSX renderer.

**Tech Stack:** Next.js 15, React 19, Tailwind utility classes, Node.js built-in test runner, FFmpeg.

## Global Constraints

- Login navigates in the same tab to exactly `https://app.finboard.ai`.
- Login immediately precedes `Book consultation` on desktop and its full-width equivalent on mobile.
- The video is an optimized MP4 in `frontend/public/videos/`, uses native controls and `preload="metadata"`, and never autoplays.
- Render the video after testimonials and before the CTA band on `/testimonials`.
- Preserve the warm sand, dark type, bordered, rounded FinBoard visual language.
- Do not create or alter an authentication flow.

---

## File Structure

- Modify: `frontend/src/components/landing/Navbar.jsx` — external Login links in existing desktop and mobile action areas.
- Create: `frontend/src/components/landing/TestimonialVideo.jsx` — accessible native-video feature.
- Modify: `frontend/src/views/TestimonialsPage.jsx` — approved video composition point.
- Create: `frontend/public/videos/finboard-testimonial.mp4` — optimized copy of the supplied source video.
- Create: `frontend/tests/marketing-navigation-and-video.test.mjs` — public source-contract tests and asset check.

### Task 1: Cover and add shared Login navigation

**Files:**

- Modify: `frontend/src/components/landing/Navbar.jsx:259-273,373-387`
- Create: `frontend/tests/marketing-navigation-and-video.test.mjs`

**Interfaces:**

- Consumes: `Navbar({ onBookDemo: () => void })`.
- Produces: `data-testid="nav-login-link"` and `data-testid="mobile-nav-login-link"`, each with `href="https://app.finboard.ai"`.

- [ ] **Step 1: Write the failing test**

```js
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
  assert.match(source, /data-testid="nav-login-link"[\\s\\S]*?href="https:\/\/app\\.finboard\\.ai"/);
  assert.match(source, /data-testid="mobile-nav-login-link"[\\s\\S]*?href="https:\/\/app\\.finboard\\.ai"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- marketing-navigation-and-video.test.mjs`

Expected: FAIL because neither Login test ID exists.

- [ ] **Step 3: Write the minimal implementation**

Add the following link immediately before the existing `nav-book-demo-button`:

```jsx
<a href="https://app.finboard.ai" data-testid="nav-login-link" className="rounded-full border border-[#0A0A0A]/20 px-4 py-2.5 text-sm text-[#0A0A0A] transition-colors hover:border-[#0A0A0A]">
  Login
</a>
```

Add this link immediately before the existing `mobile-nav-book-demo` button:

```jsx
<a href="https://app.finboard.ai" data-testid="mobile-nav-login-link" onClick={() => setOpen(false)} className="w-full rounded-full border border-[#0A0A0A]/20 px-4 py-2.5 text-center text-base text-[#0A0A0A]">
  Login
</a>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- marketing-navigation-and-video.test.mjs`

Expected: PASS with the Login navigation contract verified.

- [ ] **Step 5: Commit**

Run: `git add frontend/src/components/landing/Navbar.jsx frontend/tests/marketing-navigation-and-video.test.mjs && git commit -m "feat: add FinBoard app login navigation"`

### Task 2: Cover and add the testimonial video feature

**Files:**

- Create: `frontend/src/components/landing/TestimonialVideo.jsx`
- Modify: `frontend/src/views/TestimonialsPage.jsx:3-25`
- Modify: `frontend/tests/marketing-navigation-and-video.test.mjs`

**Interfaces:**

- Consumes: `TestimonialVideo()` with no props.
- Produces: `testimonial-video-section` with a controlled `testimonial-video` using `/videos/finboard-testimonial.mp4`.

- [ ] **Step 1: Write the failing test**

Append this test:

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- marketing-navigation-and-video.test.mjs`

Expected: FAIL with `ENOENT` for `TestimonialVideo.jsx`.

- [ ] **Step 3: Write the minimal implementation**

Create `frontend/src/components/landing/TestimonialVideo.jsx`:

```jsx
export default function TestimonialVideo() {
  return (
    <section className="pb-10 lg:pb-12" data-testid="testimonial-video-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="overflow-hidden rounded-xl border border-line bg-[#0A0A0A] shadow-[0_20px_50px_-28px_rgba(10,10,10,0.45)]">
          <video controls preload="metadata" aria-label="FinBoard customer testimonial video" data-testid="testimonial-video" className="block aspect-video w-full">
            <source src="/videos/finboard-testimonial.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </div>
    </section>
  );
}
```

Add `import TestimonialVideo from "@/components/landing/TestimonialVideo";` to `TestimonialsPage.jsx`, then insert `<TestimonialVideo />` between `<Testimonials />` and `<CTABand onBookDemo={openDemo} />`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- marketing-navigation-and-video.test.mjs`

Expected: PASS with navigation and video-source contracts passing.

- [ ] **Step 5: Commit**

Run: `git add frontend/src/components/landing/TestimonialVideo.jsx frontend/src/views/TestimonialsPage.jsx frontend/tests/marketing-navigation-and-video.test.mjs && git commit -m "feat: add testimonial video feature"`

### Task 3: Produce the web-ready asset and validate the release

**Files:**

- Create: `frontend/public/videos/finboard-testimonial.mp4`
- Modify: `frontend/tests/marketing-navigation-and-video.test.mjs`

**Interfaces:**

- Consumes: `/Users/ujjwal/Downloads/Video_OHJuly16 (4).mp4`.
- Produces: `frontend/public/videos/finboard-testimonial.mp4`, H.264 MP4 with fast-start metadata.

- [ ] **Step 1: Write the failing test**

Append this test:

```js
test("web-ready testimonial video asset is present", () => {
  const asset = path.join(FRONTEND_DIR, "public/videos/finboard-testimonial.mp4");
  assert.ok(fs.existsSync(asset), "testimonial video asset must exist");
  assert.ok(fs.statSync(asset).size > 0, "testimonial video asset must not be empty");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- marketing-navigation-and-video.test.mjs`

Expected: FAIL with `testimonial video asset must exist`.

- [ ] **Step 3: Generate the production asset**

Run: `ffmpeg -i "/Users/ujjwal/Downloads/Video_OHJuly16 (4).mp4" -map 0:v:0 -map 0:a? -c:v libx264 -preset slow -crf 23 -movflags +faststart -c:a aac -b:a 128k -pix_fmt yuv420p frontend/public/videos/finboard-testimonial.mp4`

Expected: FFmpeg completes successfully and creates the source used by `TestimonialVideo`.

- [ ] **Step 4: Verify the asset and unit tests**

Run: `ffprobe -v error -show_entries format=format_name -of default=nw=1 frontend/public/videos/finboard-testimonial.mp4 && npm run test:unit`

Expected: FFprobe reports a format containing `mov,mp4,m4a,3gp,3g2,mj2`; all unit tests pass.

- [ ] **Step 5: Verify the production build**

Run: `npm run build`

Expected: Next.js completes without errors.

- [ ] **Step 6: Commit**

Run: `git add frontend/public/videos/finboard-testimonial.mp4 frontend/tests/marketing-navigation-and-video.test.mjs && git commit -m "chore: add optimized testimonial video asset"`

## Plan Self-Review

- Spec coverage: Task 1 covers the destination, responsive placement, secondary styling, and test IDs. Tasks 2–3 cover video placement, controls, metadata preload, no autoplay, accessible label, responsive frame, optimization, tests, and production build.
- Placeholder scan: no deferred work markers or ambiguous validation instructions remain.
- Interface consistency: all tasks use the declared `TestimonialVideo` name and `/videos/finboard-testimonial.mp4` path.
