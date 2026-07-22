#!/usr/bin/env python3
import argparse
import json
from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo


TIME_ZONE = "Asia/Kolkata"


def load_publication_dates(runs_dir):
    dates = []
    if not runs_dir.exists():
        return dates
    for path in sorted(runs_dir.glob("????-??-??.json")):
        data = json.loads(path.read_text())
        value = data.get("publicationDate")
        if not isinstance(value, str):
            raise ValueError(f"publicationDate is required in {path}")
        dates.append(date.fromisoformat(value))
    return dates


def batch_decision(runs_dir, current_date):
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
