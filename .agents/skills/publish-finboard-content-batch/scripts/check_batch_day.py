#!/usr/bin/env python3
import argparse
import json
import subprocess
from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo


TIME_ZONE = "Asia/Kolkata"
PUBLICATION_ORDER = ["Blog 1", "Template 1", "Blog 2", "Template 2"]


def is_nonempty_string(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def is_number(value: object) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def is_iso_date(value: object) -> bool:
    if not isinstance(value, str):
        return False
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def is_source_url(value: object) -> bool:
    return isinstance(value, str) and value.startswith(("https://", "http://"))


def is_research_source(value: object) -> bool:
    return (
        isinstance(value, dict)
        and is_source_url(value.get("url"))
        and is_iso_date(value.get("observedDate"))
    )


def is_candidate(value: object) -> bool:
    if not isinstance(value, dict):
        return False
    if not all(
        is_nonempty_string(value.get(field))
        for field in ("candidateId", "topic", "primaryKeyword")
    ):
        return False
    evidence = value.get("keywordDemandEvidence")
    if not isinstance(evidence, dict):
        return False
    if not is_nonempty_string(evidence.get("metric")):
        return False
    if not is_number(evidence.get("value")):
        return False
    if not is_source_url(evidence.get("sourceUrl")):
        return False
    if not is_iso_date(evidence.get("observedDate")):
        return False
    if not is_number(value.get("score")):
        return False
    breakdown = value.get("scoreBreakdown")
    return (
        isinstance(breakdown, dict)
        and bool(breakdown)
        and all(is_nonempty_string(key) and is_number(score) for key, score in breakdown.items())
    )


def candidate_ids(values: object) -> set[str] | None:
    if not isinstance(values, list) or len(values) < 6 or not all(is_candidate(value) for value in values):
        return None
    identifiers = [value["candidateId"] for value in values]
    if len(set(identifiers)) != len(identifiers):
        return None
    return set(identifiers)


def selections_match_pool(values: object, pool_ids: set[str]) -> bool:
    if not isinstance(values, list) or len(values) != 2:
        return False
    selected_ids = []
    slugs = []
    for value in values:
        if not isinstance(value, dict):
            return False
        if not all(
            is_nonempty_string(value.get(field))
            for field in ("candidateId", "slug", "selectionReason")
        ):
            return False
        if value["candidateId"] not in pool_ids:
            return False
        selected_ids.append(value["candidateId"])
        slugs.append(value["slug"])
    return len(set(selected_ids)) == 2 and len(set(slugs)) == 2


def is_complete_batch_record(path: Path, data: object) -> bool:
    if not isinstance(data, dict):
        return False
    publication_date = data.get("publicationDate")
    if publication_date != path.stem:
        return False
    if not is_iso_date(publication_date):
        return False
    if data.get("timeZone") != TIME_ZONE:
        return False
    research_sources = data.get("researchSources")
    if not isinstance(research_sources, list) or not research_sources:
        return False
    if not all(is_research_source(value) for value in research_sources):
        return False
    blog_ids = candidate_ids(data.get("candidateBlogs"))
    template_ids = candidate_ids(data.get("candidateTemplates"))
    if blog_ids is None or template_ids is None:
        return False
    if not selections_match_pool(data.get("selectedBlogs"), blog_ids):
        return False
    if not selections_match_pool(data.get("selectedTemplates"), template_ids):
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


def load_committed_records(runs_dir: Path) -> list[tuple[date, bool, str]]:
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
                    relative_path,
                )
            )
    return records


def safe_retry_commit(repository: Path, relative_path: str) -> str | None:
    branch = git_output(repository, "symbolic-ref", "--quiet", "--short", "HEAD")
    head = git_output(repository, "rev-parse", "HEAD")
    parent = git_output(repository, "rev-parse", "HEAD^")
    origin_main = git_output(repository, "rev-parse", "refs/remotes/origin/main")
    record_commit = git_output(repository, "rev-list", "-1", "HEAD", "--", relative_path)
    if None in (branch, head, parent, origin_main, record_commit):
        return None
    if branch.strip() != b"main":
        return None
    if parent.strip() != origin_main.strip():
        return None
    if record_commit.strip() != head.strip():
        return None
    return head.decode().strip()


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
    previous = max(publication_date for publication_date, _, _ in records)
    delta = (current_date - previous).days
    if delta < 0:
        raise ValueError("latest publication date cannot be in the future")
    retry_records = [record for record in records if not record[1]]
    if retry_records:
        retry_date, _, relative_path = max(retry_records, key=lambda record: record[0])
        repository = find_git_root(Path(runs_dir))
        batch_commit = safe_retry_commit(repository, relative_path) if repository else None
        if batch_commit is None:
            return {
                "eligible": False,
                "action": "stop",
                "reason": "unsafe_push_state",
                "currentDate": current_date.isoformat(),
                "previousDate": retry_date.isoformat(),
                "timeZone": TIME_ZONE,
            }
        return {
            "eligible": False,
            "action": "retry_push",
            "reason": "push_retry",
            "batchCommit": batch_commit,
            "currentDate": current_date.isoformat(),
            "previousDate": retry_date.isoformat(),
            "timeZone": TIME_ZONE,
        }
    published_dates = [publication_date for publication_date, pushed, _ in records if pushed]
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
