# FinBoard – Product Requirements Document

## Original Problem Statement
Build and refine the FinBoard B2B SaaS marketing site: landing, product, industry, advisory (For Firms) and engagement pages. Cohesive visual system, monochrome icons, spreadsheet-like structural layouts, cinematic dark hero sections with edge-to-edge autoplay video, and a high-converting narrative sequence on the landing page.

## Users
- Multi-entity operators (restaurants, e-commerce, healthcare, construction, software & services)
- Fractional CFO / CAS / advisory firms (Advisory / "For Firms" audience)
- Founders (secondary audience via AudienceFork)

## Architecture
- Frontend: React (CRA), Tailwind CSS, Lucide React icons, react-router-dom, shadcn/ui.
- Backend: FastAPI + MongoDB (unused for landing/marketing).
- Video assets: Local MP4s served from `/app/frontend/public/videos/`, all pre-processed with `ffmpeg -movflags +faststart` for browser autoplay.

## Implemented (as of Feb 2026)
- Landing page: HeroCarousel (rotation fixed), IndustryCollage 2x2 video grid, AudienceFork, Outcomes, Manifesto extracted to standalone page, sequence optimized for conversion funnel.
- Product pages: 5 unified pages (Consolidation, Analytics, FP&A, Procure-to-Pay, Order-to-Cash) with monochrome nav icons.
- Industry pages: Restaurants, E-commerce, Healthcare, Construction, Software & Services — cinematic dark hero + edge-to-edge full-viewport video.
- Advisory (For Firms) page: hero video, feature grid, modules cross-link, "how firms roll it out", partner/pricing block.
- Engagement page: spreadsheet-style timeline, full-width cinematic Gantt hero, How it Works and Forward Deployed sections integrated.
- Manifesto: standalone page/tab.
- **Feb 2026 update**: All "white-label" mentions removed from Advisory page and AudienceFork (per user request). CAPABILITIES/FEATURES reduced from 4→3 items, METRICS reduced 3→2 (grid adjusted to 2-col), partner tags trimmed, hero paragraph rewritten.

## Backlog / Next
- P2: Refactor test files under `/app/backend/tests` if backend features are added.
- P2: Await user feedback on the newly refined Advisory copy and Software & Services industry page.
- Ongoing: iterate on landing sections per user critique.

## Critical Notes for Next Agent
- Any new MP4 must be processed with `ffmpeg -c copy -movflags +faststart` before serving.
- Frontend served via REACT_APP_BACKEND_URL — do NOT hardcode.
- `AdvisoryVisual` function in Advisory.jsx is defined but not currently rendered (hero uses `/videos/for-firms.mp4`).
