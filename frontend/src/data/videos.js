// Canonical, indexable videos. A video is exposed once on its own watch page;
// marketing pages may use the same file as a preview, but do not become the
// canonical destination for it.
export const VIDEOS = [
  {
    slug: "olga-hurtado-neatbooks-testimonial",
    title: "Olga Hurtado of NeatBooks on complex franchise consolidation",
    description:
      "Olga Hurtado, Founder and CEO of NeatBooks, shares how FinBoard supports complex franchise consolidations for multi-entity accounting clients.",
    videoPath: "/videos/finboard-testimonial.mp4",
    thumbnailPath: "/videos/finboard-testimonial-poster.jpg",
    duration: "PT2M1S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Customer story",
  },
  {
    slug: "finance-for-accounting-firms",
    title: "Finance operations for accounting firms",
    description:
      "A short overview of how accounting firms can bring multi-client financial operations into a governed workspace.",
    videoPath: "/videos/for-firms.mp4",
    thumbnailPath: "/videos/thumbnails/for-firms.jpg",
    duration: "PT19S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Advisory firms",
  },
  {
    slug: "finance-backoffice",
    title: "FinBoard BackOffice for advisory firms",
    description:
      "An overview of FinBoard BackOffice and the operating support available to advisory firms.",
    videoPath: "/videos/backoffice.mp4",
    thumbnailPath: "/videos/thumbnails/backoffice.jpg",
    duration: "PT19S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Back office",
  },
  {
    slug: "finance-for-restaurants",
    title: "Finance reporting for restaurant groups",
    description:
      "A short introduction to finance visibility and reporting for multi-location restaurant groups.",
    videoPath: "/videos/restaurants.mp4",
    thumbnailPath: "/videos/thumbnails/restaurants.jpg",
    duration: "PT19S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Restaurants",
  },
  {
    slug: "finance-for-healthcare",
    title: "Finance reporting for healthcare organizations",
    description:
      "A short introduction to finance visibility and reporting for multi-entity healthcare organizations.",
    videoPath: "/videos/healthcare.mp4",
    thumbnailPath: "/videos/thumbnails/healthcare.jpg",
    duration: "PT19S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Healthcare",
  },
  {
    slug: "finance-for-construction",
    title: "Finance reporting for construction companies",
    description:
      "A short introduction to finance visibility and reporting for construction companies and their operating entities.",
    videoPath: "/videos/construction.mp4",
    thumbnailPath: "/videos/thumbnails/construction.jpg",
    duration: "PT19S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Construction",
  },
  {
    slug: "finance-for-ecommerce",
    title: "Finance reporting for ecommerce businesses",
    description:
      "A short introduction to finance visibility and reporting for ecommerce businesses with multiple operating entities.",
    videoPath: "/videos/ecommerce.mp4",
    thumbnailPath: "/videos/thumbnails/ecommerce.jpg",
    duration: "PT19S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Ecommerce",
  },
  {
    slug: "finance-for-software-and-services",
    title: "Finance reporting for software and services businesses",
    description:
      "A short introduction to finance visibility and reporting for multi-entity software and services businesses.",
    videoPath: "/videos/software-and-services.mp4",
    thumbnailPath: "/videos/thumbnails/software-and-services.jpg",
    duration: "PT19S",
    uploadDate: "2026-07-23T09:00:00+05:30",
    topic: "Software and services",
  },
];

export const VIDEOS_BY_SLUG = Object.fromEntries(VIDEOS.map((video) => [video.slug, video]));
