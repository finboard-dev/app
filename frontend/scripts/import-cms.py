#!/usr/bin/env python3
"""One-off importer: Framer CMS CSV exports -> content/{blog,templates}/*.json.

Each generated JSON file is a self-contained post/template consumed by
src/lib/blog.js and src/lib/templates.js. Re-runnable; overwrites outputs.

Usage:
  python3 scripts/import-cms.py \
    --blogs /path/Blogs.csv \
    --templates /path/Template.csv
"""
import argparse
import csv
import json
import os
import re
import sys
from datetime import date, timedelta

from blog_author import AUTHOR_ID, AUTHOR_NAME, normalize_structured_data

# Deterministic, plausible publishing history for CMS blogs (the export had no
# dates). Newest CMS post sits just under the hand-authored posts (2026-07-12),
# spaced a few days apart going back through 2026.
BLOG_DATE_ANCHOR = date(2026, 7, 8)
BLOG_DATE_STEP_DAYS = 4

HERE = os.path.dirname(os.path.abspath(__file__))
FRONTEND = os.path.dirname(HERE)
BLOG_DIR = os.path.join(FRONTEND, "content", "blog")
TPL_DIR = os.path.join(FRONTEND, "content", "templates")

csv.field_size_limit(10 * 1024 * 1024)


def slugify(value):
    value = (value or "").strip().lower()
    value = value.replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"^-+|-+$", "", value)


def strip_tags(html):
    text = re.sub(r"<[^>]+>", " ", html or "")
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


# Markers that indicate CMS authoring notes / pasted JSON-LD leaked into a
# Meta/description field. Everything from the first marker on is dropped.
_JUNK_MARKERS = [
    "```",
    '"@context"',
    "Updated with `date",
    "as in your reference",
    "datePublished",
]


def sanitize_excerpt(text, limit=200):
    text = (text or "").strip()
    for marker in _JUNK_MARKERS:
        idx = text.find(marker)
        if idx != -1:
            text = text[:idx]
    text = re.sub(r"\s+", " ", text).strip().rstrip(":—-").strip()
    if len(text) > limit:
        text = text[:limit].rsplit(" ", 1)[0].rstrip(",;:") + "…"
    return text


def excerpt_from(meta, html, limit=200):
    source = meta if (meta and meta.strip()) else strip_tags(html)
    return sanitize_excerpt(source, limit)


def inject_alt(html, fallback):
    """Give every alt-less <img> a descriptive alt from the nearest heading
    (preceding, else following), falling back to the article title."""
    heads = [
        (m.start(), strip_tags(m.group(1)))
        for m in re.finditer(r"<h[1-6][^>]*>(.*?)</h[1-6]>", html, re.S)
    ]

    def nearest(pos):
        prev = [t for s, t in heads if s < pos and t]
        if prev:
            return prev[-1]
        nxt = [t for s, t in heads if s >= pos and t]
        return nxt[0] if nxt else fallback

    def repl(m):
        tag = m.group(0)
        if re.search(r'alt="[^"]+"', tag):  # already has a non-empty alt
            return tag
        alt = (nearest(m.start()) or fallback).replace('"', "'")[:120]
        if "alt=" in tag:
            return re.sub(r'alt="[^"]*"', f'alt="{alt}"', tag, count=1)
        return tag.replace("<img", f'<img alt="{alt}"', 1)

    return re.sub(r"<img\b[^>]*>", repl, html)


def clean_content(html, fallback_alt):
    """Downgrade in-body H1s (page already has the title H1), lazy-load imgs,
    and backfill missing alt text."""
    html = re.sub(r"<h1(\s|>)", r"<h2\1", html)
    html = re.sub(r"</h1>", "</h2>", html)
    html = re.sub(r"<img\s", '<img loading="lazy" ', html)
    html = inject_alt(html, fallback_alt)
    return html


def parse_jsonld(raw):
    if not raw or not raw.strip():
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def write_json(path, obj):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


def import_blogs(csv_path):
    os.makedirs(BLOG_DIR, exist_ok=True)
    rows = list(csv.DictReader(open(csv_path, encoding="utf-8")))
    seen, written, no_meta, no_ld = set(), 0, 0, 0
    for i, r in enumerate(rows):
        slug = slugify(r["Slug"] or r["Title"])
        if not slug or slug in seen:
            print(f"  ! skip dup/empty slug: {r.get('Slug')!r}")
            continue
        seen.add(slug)
        meta = (r.get("Meta") or "").strip()
        ld = parse_jsonld(r.get("Structured data"))
        if not meta:
            no_meta += 1
        if not ld:
            no_ld += 1
        title = (r["Title"] or "").strip()
        post = {
            "slug": slug,
            "title": title,
            "category": "accounting",
            "excerpt": excerpt_from(meta, r["Content"]),
            "author": AUTHOR_NAME,
            "authorId": AUTHOR_ID,
            "date": (BLOG_DATE_ANCHOR - timedelta(days=i * BLOG_DATE_STEP_DAYS)).isoformat(),
            "coverImage": (r.get("thumbnail") or "").strip() or None,
            "coverAlt": (r.get("thumbnail:alt") or "").strip() or title,
            "format": "html",
            "order": i,
            "structuredData": normalize_structured_data(ld),
            "content": clean_content(r["Content"] or "", title),
        }
        write_json(os.path.join(BLOG_DIR, f"{slug}.json"), post)
        written += 1
    print(f"blogs: wrote {written} files "
          f"({no_meta} without Meta -> derived excerpt, {no_ld} without JSON-LD -> generated)")


def import_templates(csv_path):
    os.makedirs(TPL_DIR, exist_ok=True)
    rows = list(csv.DictReader(open(csv_path, encoding="utf-8")))
    seen, written, drafts = set(), 0, 0
    for i, r in enumerate(rows):
        if (r.get(":draft") or "").strip().lower() == "true":
            drafts += 1
            continue
        slug = slugify(r["Slug"] or r["Title"])
        if not slug or slug in seen:
            print(f"  ! skip dup/empty template slug: {r.get('Slug')!r}")
            continue
        seen.add(slug)
        meta = (r.get("Meta") or "").strip()
        short = (r.get("Short description") or "").strip()
        tpl = {
            "slug": slug,
            "title": (r["Title"] or "").strip(),
            "category": (r.get("Category") or "Other").strip() or "Other",
            "shortDescription": short,
            "about": (r.get("About template") or "").strip(),
            "excerpt": sanitize_excerpt(meta or short),
            "link": (r.get("Link") or "").strip(),
            "image": (r.get("Image") or "").strip() or None,
            "imageAlt": (r.get("Image:alt") or "").strip() or (r["Title"] or "").strip(),
            "order": i,
            "structuredData": parse_jsonld(r.get("Structured data")),
        }
        write_json(os.path.join(TPL_DIR, f"{slug}.json"), tpl)
        written += 1
    print(f"templates: wrote {written} files ({drafts} draft(s) skipped)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--blogs")
    ap.add_argument("--templates")
    args = ap.parse_args()
    if args.blogs:
        import_blogs(args.blogs)
    if args.templates:
        import_templates(args.templates)
    if not args.blogs and not args.templates:
        ap.error("provide --blogs and/or --templates")


if __name__ == "__main__":
    main()
