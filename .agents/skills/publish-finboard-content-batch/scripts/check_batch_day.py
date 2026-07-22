#!/usr/bin/env python3
import argparse
import json
from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo


TIME_ZONE = "Asia/Kolkata"
PUBLICATION_ORDER = ["Blog 1", "Template 1", "Blog 2", "Template 2"]


def is_complete_batch_record(path: Path, data: object) -> bool:
    if not isinstance(data, dict):
        return False
    publication_date = data.get("publicationDate")
    if publication_date != path.stem:
        return False
    try:
        date.fromisoformat(publication_date)
    except (TypeError, ValueError):
        return False
    required_lists = ("researchSources", "candidateBlogs", "candidateTemplates")
    if data.get("timeZone") != TIME_ZONE:
        return False
    if any(not isinstance(data.get(field), list) for field in required_lists):
        return False
    if not isinstance(data.get("selectedBlogs"), list) or len(data["selectedBlogs"]) != 2:
        return False
    if not isinstance(data.get("selectedTemplates"), list) or len(data["selectedTemplates"]) != 2:
        return False
    if data.get("publicationOrder") != PUBLICATION_ORDER:
        return False
    if data.get("batchId") != f"{publication_date}-finboard-content":
        return False
    if data.get("commitSubject") != f"content: publish FinBoard batch {publication_date}":
        return False
    return True


def load_publication_dates(runs_dir: Path) -> list[date]:
    dates = []
    if not runs_dir.exists():
        return dates
    for path in sorted(runs_dir.glob("????-??-??.json")):
        try:
            data = json.loads(path.read_text())
        except (OSError, json.JSONDecodeError):
            continue
        if is_complete_batch_record(path, data):
            dates.append(date.fromisoformat(data["publicationDate"]))
    return dates


def batch_decision(runs_dir: Path, current_date: date) -> dict[str, object]:
    dates = load_publication_dates(Path(runs_dir))
    if not dates:
        return {
            "eligible": True,
            "reason": "no_previous_batch",
            "currentDate": current_date.isoformat(),
            "previousDate": None,
            "timeZone": TIME_ZONE,
        }
    previous = max(dates)
    delta = (current_date - previous).days
    if delta < 0:
        raise ValueError("latest publication date cannot be in the future")
    reason = {
        0: "already_published_today",
        1: "skip_day",
    }.get(delta, "eligible_publish_day")
    return {
        "eligible": delta >= 2,
        "reason": reason,
        "currentDate": current_date.isoformat(),
        "previousDate": previous.isoformat(),
        "timeZone": TIME_ZONE,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--runs-dir", default="content-pipeline/runs")
    parser.add_argument("--date")
    args = parser.parse_args()
    current = date.fromisoformat(args.date) if args.date else datetime.now(ZoneInfo(TIME_ZONE)).date()
    print(json.dumps(batch_decision(Path(args.runs_dir), current), sort_keys=True))


if __name__ == "__main__":
    main()
