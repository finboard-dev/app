import {
  FINBOARD_TEAM_AUTHOR,
  resolveAuthor,
} from "./blogAuthor.mjs";

export { resolveAuthor };

// Canonical author registry. Blog posts resolve to one of these named authors
// (for YMYL E-E-A-T + Person structured data). Each carries a verifiable
// LinkedIn used as sameAs. Kept in sync with the founders in
// components/landing/Team.jsx.

export const AUTHORS = {
  "vaishnav-gupta": {
    id: "vaishnav-gupta",
    name: "Vaishnav Gupta",
    role: "Co-founder, Finance",
    bio: "Led finance transformations for Fortune 500 groups at PwC, then ran tax & payroll product at Rippling. 10+ years advising CFOs on multi-entity accounting.",
    linkedin: "https://www.linkedin.com/in/vaishnav-gupta-07b1b218/",
    photo: "/team/vaishnav.webp",
    photoPos: "center 20%",
    alumniOf: ["PwC", "Rippling"],
  },
  "ujjwal-singh": {
    id: "ujjwal-singh",
    name: "Ujjwal Singh",
    role: "Co-founder, Engineering",
    bio: "Built distributed learning systems at MindTickle and shipped R&D at Samsung. Published peer-reviewed work on search & ranking.",
    linkedin: "https://www.linkedin.com/in/ujjwal-singh-87617637",
    photo: "/team/ujjwal.webp",
    photoPos: "center 20%",
    alumniOf: ["MindTickle", "Samsung"],
  },
  "finboard-team": FINBOARD_TEAM_AUTHOR,
};
