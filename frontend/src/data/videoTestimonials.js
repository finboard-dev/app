// Customer video testimonials rendered by <TestimonialVideo />. The same list
// drives the homepage and /testimonials, so a new customer video is one entry
// here — not a new component. Attribution links out to the person's LinkedIn
// when we have a verified profile, and always to the company site.
export const VIDEO_TESTIMONIALS = [
  {
    id: "corinnee-vallier-kindbridge",
    blurb:
      "Corinnee leads finance at Kindbridge Behavioral Health, and FinBoard carries their multi-entity reporting and month-end close. Hear what they have to say about us.",
    name: "Corinnee Vallier",
    linkedinUrl: "https://www.linkedin.com/in/corinnee-v-4078515/",
    role: "Controller",
    company: "Kindbridge Behavioral Health",
    companyUrl: "https://kindbridge.com/",
    videoPath: "/videos/finboard-kindbridge-testimonial.mp4",
    posterPath: "/videos/finboard-kindbridge-testimonial-poster.jpg",
    videoLabel: "FinBoard customer testimonial video with Corinnee Vallier of Kindbridge Behavioral Health",
  },
  {
    id: "olga-hurtado-neatbooks",
    blurb:
      "Olga runs a 20-person accounting firm, and FinBoard powers their complex franchise consolidations across multiple restaurant chains. Hear what they have to say about us.",
    name: "Olga Hurtado",
    linkedinUrl: "https://www.linkedin.com/in/olga-hurtado-ea-mba-0759294b/",
    role: "Founder & CEO",
    company: "NeatBooks LLC",
    companyUrl: "https://neatbooksllc.com/",
    videoPath: "/videos/finboard-testimonial.mp4",
    posterPath: "/videos/finboard-testimonial-poster.jpg",
    videoLabel: "FinBoard customer testimonial video",
  },
];
