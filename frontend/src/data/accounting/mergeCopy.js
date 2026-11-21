/**
 * Merge a segment's copy over the base /accounting-services copy. Plain
 * objects merge one level deep (so a segment can override HERO.lede without
 * restating the whole HERO); arrays and strings replace outright.
 */
const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

export function mergeCopy(base, overrides = {}) {
  const out = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    out[key] = isPlainObject(value) && isPlainObject(base[key]) ? { ...base[key], ...value } : value;
  }
  return Object.freeze(out);
}

/** A pre-filled mailto link for the "Email us instead" call to action. */
export const emailHref = (address, subject) => `mailto:${address}?subject=${encodeURIComponent(subject)}`;
