#!/usr/bin/env python3
import json
from pathlib import Path

from blog_author import normalize_post

FRONTEND = Path(__file__).resolve().parents[1]
BLOG_DIR = FRONTEND / "content" / "blog"


def render(post, indented):
    return json.dumps(
        post,
        ensure_ascii=False,
        indent=2 if indented else None,
    )


def main():
    changed = []
    for path in sorted(BLOG_DIR.glob("*.json")):
        raw = path.read_text(encoding="utf-8")
        post = json.loads(raw)
        normalized = normalize_post(post)
        if normalized == post:
            continue

        suffix = "\n" if raw.endswith("\n") else ""
        indented = raw.lstrip().startswith("{\n")
        path.write_text(render(normalized, indented) + suffix, encoding="utf-8")
        changed.append(path.name)

    print(f"normalized {len(changed)} blog files")
    for name in changed:
        print(name)


if __name__ == "__main__":
    main()
