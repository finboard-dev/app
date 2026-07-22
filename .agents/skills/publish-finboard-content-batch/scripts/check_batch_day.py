#!/usr/bin/env python3
import argparse
import json
import subprocess
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


def git_output(repository: Path, *args: str) -> bytes | None:
    try:
        result = subprocess.run(
            ["git", "-C", str(repository), *args],
            capture_output=True,
            check=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return None
    return result.stdout


def find_git_root(path: Path) -> Path | None:
    candidate = path.resolve()
    while not candidate.exists() and candidate != candidate.parent:
        candidate = candidate.parent
    output = git_output(candidate, "rev-parse", "--show-toplevel")
    if output is None:
        return None
    return Path(output.decode().strip()).resolve()


def load_committed_records(runs_dir: Path) -> list[tuple[date, bool]]:
    records = []
    if not runs_dir.exists():
        return records
    repository = find_git_root(runs_dir)
    if repository is None:
        return records
    for path in sorted(runs_dir.glob("????-??-??.json")):
        try:
            relative_path = path.resolve().relative_to(repository).as_posix()
            current_content = path.read_bytes()
        except (OSError, ValueError):
            continue
        head_content = git_output(repository, "show", f"HEAD:{relative_path}")
        if head_content != current_content:
            continue
        try:
            data = json.loads(current_content)
        except (UnicodeDecodeError, json.JSONDecodeError):
            continue
        if is_complete_batch_record(path, data):
            remote_content = git_output(
                repository,
                "show",
                f"refs/remotes/origin/main:{relative_path}",
            )
            records.append(
                (
                    date.fromisoformat(data["publicationDate"]),
                    remote_content == current_content,
                )
            )
    return records


def batch_decision(runs_dir: Path, current_date: date) -> dict[str, object]:
    records = load_committed_records(Path(runs_dir))
    if not records:
        return {
            "eligible": True,
            "reason": "no_previous_batch",
            "currentDate": current_date.isoformat(),
            "previousDate": None,
            "timeZone": TIME_ZONE,
        }
    previous = max(publication_date for publication_date, _ in records)
    delta = (current_date - previous).days
    if delta < 0:
        raise ValueError("latest publication date cannot be in the future")
    retry_dates = [publication_date for publication_date, pushed in records if not pushed]
    if retry_dates:
        retry_date = max(retry_dates)
        return {
            "eligible": False,
            "action": "retry_push",
            "reason": "push_retry",
            "currentDate": current_date.isoformat(),
            "previousDate": retry_date.isoformat(),
            "timeZone": TIME_ZONE,
        }
    published_dates = [publication_date for publication_date, pushed in records if pushed]
    previous = max(published_dates)
    delta = (current_date - previous).days
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
