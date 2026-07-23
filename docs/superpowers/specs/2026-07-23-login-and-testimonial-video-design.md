# Login navigation and testimonial video design

## Purpose

Give visitors a direct route to the FinBoard application and feature the supplied
customer testimonial video on the testimonials page.

## Navigation

- Add a `Login` link immediately to the left of the desktop `Book consultation`
  button in the shared landing navbar.
- The link navigates in the same tab to `https://app.finboard.ai`.
- Use an understated outlined treatment so `Book consultation` remains the visual
  primary action.
- Add the same Login action to the mobile navigation panel, before the full-width
  consultation button.
- Include accessible link text and a stable test ID following existing navbar
  conventions.

## Testimonials video

- Transcode the supplied source video (`Video_OHJuly16 (4).mp4`) to a web-ready
  MP4 and store it under `frontend/public/videos/`.
- Render it as a native HTML video with user controls, metadata preloading, and
  no autoplay.
- Place the responsive video feature after the existing testimonials section and
  before the closing CTA band on `/testimonials`.
- Retain the page's warm sand surface, dark type, restrained border, and rounded
  media frame so the video fits the existing FinBoard visual language.
- Provide a meaningful accessible label and preserve a sensible aspect ratio on
  both desktop and mobile.

## Verification

- Add or extend unit coverage to confirm the navbar exposes the external Login
  destination and the testimonials page exposes the video source and accessible
  controls.
- Run the relevant unit tests and a production frontend build.

## Scope

This work changes only the shared marketing navbar, testimonials view, its
supporting media asset, and focused tests. It does not create an authentication
flow or alter the FinBoard application itself.
