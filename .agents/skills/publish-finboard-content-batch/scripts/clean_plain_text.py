#!/usr/bin/env python3
import re
import sys


TRANSLATION = str.maketrans({
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2014": " - ",
    "\u2013": " - ",
    "\u2022": " ",
    "\u2192": " ",
    "\u2605": " ",
    "\u2713": " ",
    "\u2705": " ",
    "\u2026": "...",
})
EMOJI = re.compile("[\U0001F300-\U0001FAFF\U00002600-\U000026FF]")


def clean_plain_text(text: str) -> str:
    cleaned = text.translate(TRANSLATION)
    cleaned = EMOJI.sub("", cleaned)
    cleaned = re.sub(r"([!?])\1+", r"\1", cleaned)
    cleaned = re.sub(r"\.{4,}", "...", cleaned)
    cleaned = re.sub(r"[ \t]+", " ", cleaned)
    cleaned = re.sub(r" *\n *", "\n", cleaned)
    cleaned = re.sub(r"\s+([,.;:!?])", r"\1", cleaned)
    return cleaned.strip()


def main():
    sys.stdout.write(clean_plain_text(sys.stdin.read()))


if __name__ == "__main__":
    main()
