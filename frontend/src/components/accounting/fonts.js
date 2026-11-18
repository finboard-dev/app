import { Inter_Tight } from "next/font/google";

/**
 * Inter Tight for the accounting page's titles: Inter's headline cut, with
 * tighter spacing and real italic glyphs at every weight. The site-wide Inter
 * only ships italics up to weight 500, so the browser was faking a bold italic
 * for the 600-weight titles, which looked soft. A distinct family name also
 * keeps it from colliding with the site's own "Inter" faces.
 */
export const displayFont = Inter_Tight({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-acct-display",
});
