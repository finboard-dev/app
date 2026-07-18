// Filesystem-backed conference calendar source. Events live in
// content/conferences.json. Server-only: uses node:fs at build time.
// Vocabulary and grouping helpers are in lib/conferences-meta.js so the
// client calendar view can share them without pulling in fs.

import fs from "node:fs";
import path from "node:path";

const DATA_PATH = path.join(process.cwd(), "content", "conferences.json");

export function getConferenceData() {
  const raw = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const events = [...(raw.events ?? [])].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );
  return { updated: raw.updated ?? null, events };
}
