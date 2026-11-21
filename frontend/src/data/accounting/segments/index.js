import { ECOMMERCE } from "./ecommerce.js";
import { CREATORS } from "./creators.js";
import { AGENCIES } from "./agencies.js";
import { CPA_FIRMS } from "./cpaFirms.js";

/** Accounting-services segment pages, in the order they appear in links. */
export const SEGMENTS = Object.freeze([ECOMMERCE, CREATORS, AGENCIES, CPA_FIRMS]);

/** Pages for businesses, cross-linked from each other (the CPA firm page is not). */
export const BUSINESS_SEGMENTS = Object.freeze(SEGMENTS.filter((s) => s.listed !== false));

export const SEGMENTS_BY_SLUG = Object.freeze(Object.fromEntries(SEGMENTS.map((s) => [s.slug, s])));
