#!/usr/bin/env python3
"""Deterministic boundary for FinBoard's unattended daily blog workflow."""

from __future__ import annotations

import argparse
import datetime as dt
import fcntl
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path
from typing import Mapping, Optional, Protocol, Sequence
from zoneinfo import ZoneInfo


MODEL_TOOLS = "Read,Grep,Glob,WebSearch,WebFetch"
DEFAULT_SKILL_ROOT = Path("/Users/ujjwal/self/blog-pipeline")
AUTO_RUN_SUFFIX = "auto"
SUCCESS = "published"
VALIDATED_DRY_RUN = "dry_run_validated"
NOTHING_PUBLISHABLE = "nothing_publishable"
ALREADY_PUBLISHED = "already_published"
SKIPPED_LOCKED = "skipped_locked"
FAILED = "failed"
MODEL_ENV_NAMES = frozenset(
    {
        "PATH",
        "HOME",
        "USER",
        "LOGNAME",
        "TMPDIR",
        "LANG",
        "LC_ALL",
        "CLAUDE_CODE_OAUTH_TOKEN",
        "ANTHROPIC_API_KEY",
    }
)


@dataclass(frozen=True)
class CommandResult:
    returncode: int
    stdout: str = ""
    stderr: str = ""


@dataclass(frozen=True)
class RunOutcome:
    status: str
    exit_code: int
    slug: Optional[str] = None
    commit: Optional[str] = None
    production_url: Optional[str] = None


class Effects(Protocol):
    """All nondeterministic system boundaries used by ``run_daily``."""

    def acquire_lock(self, path: Path): ...
    def release_lock(self, handle: object) -> None: ...
    def run(
        self,
        argv: Sequence[str],
        cwd: Path,
        env: Optional[Mapping[str, str]] = None,
    ) -> CommandResult: ...
    def fetch(self, url: str) -> tuple[int, str]: ...
    def notify(self, kind: str, message: str, cfg: dict) -> None: ...
    def sleep(self, seconds: float) -> None: ...
    def now(self) -> dt.datetime: ...


class SystemEffects:
    def acquire_lock(self, path: Path):
        path.parent.mkdir(parents=True, exist_ok=True)
        handle = path.open("a+")
        try:
            fcntl.flock(handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            handle.close()
            return None
        return handle

    def release_lock(self, handle: object) -> None:
        if handle is None:
            return
        fcntl.flock(handle.fileno(), fcntl.LOCK_UN)
        handle.close()

    def run(
        self,
        argv: Sequence[str],
        cwd: Path,
        env: Optional[Mapping[str, str]] = None,
    ) -> CommandResult:
        completed = subprocess.run(
            list(argv),
            cwd=str(cwd),
            env=None if env is None else dict(env),
            capture_output=True,
            text=True,
            timeout=1800,
        )
        return CommandResult(completed.returncode, completed.stdout, completed.stderr)

    def fetch(self, url: str) -> tuple[int, str]:
        request = urllib.request.Request(url, headers={"User-Agent": "FinBoardBlogVerifier/1.0"})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.status, response.read().decode("utf-8", errors="replace")
        except urllib.error.HTTPError as error:
            return error.code, error.read().decode("utf-8", errors="replace")

    def notify(self, kind: str, message: str, cfg: dict) -> None:
        slack = cfg["reviewChannel"]["slack"]
        webhook_name = slack.get("webhookEnv")
        bot_name = slack.get("botTokenEnv")
        webhook = os.environ.get(webhook_name, "") if webhook_name else ""
        token = os.environ.get(bot_name, "") if bot_name else ""
        used_webhook = bool(webhook)
        if used_webhook:
            request = urllib.request.Request(
                webhook,
                data=json.dumps({"text": message}).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
        elif token:
            request = urllib.request.Request(
                "https://slack.com/api/chat.postMessage",
                data=json.dumps({"channel": slack["channelId"], "text": message}).encode("utf-8"),
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                method="POST",
            )
        else:
            raise RuntimeError("Slack notification credential is not set")
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8", errors="replace")
            if response.status >= 300:
                raise RuntimeError(f"Slack returned HTTP {response.status}")
            if not used_webhook:
                payload = json.loads(body)
                if not payload.get("ok"):
                    raise RuntimeError(f"Slack rejected the message: {payload.get('error', 'unknown error')}")

    def sleep(self, seconds: float) -> None:
        time.sleep(seconds)

    def now(self) -> dt.datetime:
        return dt.datetime.now().astimezone()


class StageError(RuntimeError):
    def __init__(self, stage: str, message: str):
        super().__init__(message)
        self.stage = stage


def resolve_skill_root(env: Mapping[str, str]) -> Path:
    return Path(env.get("BLOG_PIPELINE_SKILL_ROOT", str(DEFAULT_SKILL_ROOT)))


def build_claude_argv(
    repo: Path,
    skill_root: Path,
    schema_json: str,
    publish_date: Optional[str] = None,
    validated_config: Optional[dict] = None,
) -> list[str]:
    context = ""
    if publish_date and validated_config:
        context = (
            f" The local publish date is {publish_date}. Use this validated configuration: "
            f"{json.dumps(validated_config, separators=(',', ':'), sort_keys=True)}."
        )
    instruction = (
        f"Read {skill_root / 'SKILL.md'} completely, then execute its daily-auto route "
        f"for {repo}.{context} Return structured JSON only. Do not write files, run shell commands, "
        "use Git, deploy, or contact Slack."
    )
    return [
        "claude",
        "-p",
        instruction,
        "--restricted",
        "--add-dir",
        str(skill_root),
        "--tools",
        MODEL_TOOLS,
        "--allowedTools",
        MODEL_TOOLS,
        "--json-schema",
        schema_json,
        "--output-format",
        "json",
    ]


def sanitize_model_env(env: Mapping[str, str], secret_names: set[str]) -> dict[str, str]:
    return {
        key: value
        for key, value in env.items()
        if key in MODEL_ENV_NAMES and key not in secret_names
    }


def validate_changed_paths(expected: set[str], actual: set[str]) -> list[str]:
    errors = [f"unexpected changed path: {path}" for path in sorted(actual - expected)]
    errors.extend(f"missing expected changed path: {path}" for path in sorted(expected - actual))
    return errors


def build_success_message(
    title: str,
    live_url: str,
    commit_url: str,
    short_sha: str,
    completed: str,
) -> str:
    return "\n".join(
        (
            "*FinBoard Daily Blog Published*",
            f"Title: {title}",
            f"Live post: <{live_url}|Read the article>",
            f"Commit: <{commit_url}|{short_sha}>",
            f"Published: {completed}",
        )
    )


def build_failure_message(
    stage: str,
    error: str,
    log_path: Path,
    commit_url: Optional[str] = None,
    short_sha: Optional[str] = None,
) -> str:
    lines = [
        "*FinBoard Daily Blog Failed*",
        f"Stage: {stage}",
        f"Error: {error}",
        f"Log: {log_path}",
    ]
    if commit_url and short_sha:
        lines.append(f"Commit (deployment not verified): <{commit_url}|{short_sha}>")
    return "\n".join(lines)


def _load_skill_modules(skill_root: Path):
    scripts = skill_root / "scripts"
    if not scripts.is_dir():
        raise StageError("configuration", f"blog skill scripts not found: {scripts}")
    scripts_text = str(scripts)
    if scripts_text not in sys.path:
        sys.path.insert(0, scripts_text)
    from auto_artifact import ARTIFACT_JSON_SCHEMA, parse_claude_output, safe_artifact_paths, validate_artifact
    from config import load_config
    from existing import load_post_records
    from gen_cover import main as generate_cover
    from runstate import (
        ALREADY_PUBLISHED as STATE_ALREADY_PUBLISHED,
        COMMITTING,
        DEPLOYING,
        DRAFTING,
        DRY_RUN_VALIDATED,
        FAILED as STATE_FAILED,
        NOTHING_PUBLISHABLE as STATE_NOTHING,
        PUBLISHED,
        SELECTING,
        SKIPPED_LOCKED as STATE_SKIPPED,
        VALIDATING,
        VERIFYING,
        advance,
        create_run,
        create_terminal_run,
        load_run,
        record_event,
        save_run,
    )
    from validate_blog import validate_file

    return {
        "schema": ARTIFACT_JSON_SCHEMA,
        "parse": parse_claude_output,
        "paths": safe_artifact_paths,
        "validate_artifact": validate_artifact,
        "load_config": load_config,
        "load_posts": load_post_records,
        "generate_cover": generate_cover,
        "validate_file": validate_file,
        "states": {
            "selecting": SELECTING,
            "drafting": DRAFTING,
            "validating": VALIDATING,
            "committing": COMMITTING,
            "deploying": DEPLOYING,
            "verifying": VERIFYING,
            "published": PUBLISHED,
            "failed": STATE_FAILED,
            "nothing": STATE_NOTHING,
            "already": STATE_ALREADY_PUBLISHED,
            "skipped": STATE_SKIPPED,
            "dry": DRY_RUN_VALIDATED,
        },
        "advance": advance,
        "create_run": create_run,
        "create_terminal": create_terminal_run,
        "load_run": load_run,
        "record_event": record_event,
        "save_run": save_run,
    }


def _timestamp(now: dt.datetime) -> str:
    return now.isoformat(timespec="seconds")


def _command(effects: Effects, argv: Sequence[str], repo: Path, stage: str, env=None) -> CommandResult:
    result = effects.run(argv, repo, env=env)
    if result.returncode:
        detail = (result.stderr or result.stdout or "command failed").strip()
        raise StageError(stage, f"{' '.join(argv)}: {detail[-1000:]}")
    return result


def _blog_dates(content_dir: Path) -> set[str]:
    dates = set()
    if not content_dir.is_dir():
        return dates
    for path in content_dir.iterdir():
        if path.suffix.lower() != ".json" or not path.is_file():
            continue
        try:
            value = json.loads(path.read_text()).get("date")
        except (OSError, json.JSONDecodeError, AttributeError):
            continue
        if isinstance(value, str):
            dates.add(value)
    return dates


def _model_config(cfg: dict) -> dict:
    """Return the validated, non-operational policy the research model needs."""
    automation = cfg["automation"]
    return {
        "target": {
            key: cfg["target"][key]
            for key in ("repoPath", "contentDir", "blogFormat", "categories", "authors")
        },
        "personas": cfg["personas"],
        "topicsPerRun": cfg["topicsPerRun"],
        "blogsPerRun": cfg["blogsPerRun"],
        "gates": cfg["gates"],
        "automation": {
            key: automation[key]
            for key in (
                "timezone",
                "minTopicScore",
                "minSourceAuthority",
                "similarityThreshold",
                "productionBaseUrl",
            )
        },
    }


def _recent_topics(repo: Path, before_date: str, days: int = 30) -> list[dict]:
    topics = []
    runs = repo / ".blog-pipeline" / "runs"
    if not runs.is_dir():
        return topics
    cutoff = dt.date.fromisoformat(before_date) - dt.timedelta(days=days)
    for path in sorted(runs.glob("*.json")):
        try:
            record = json.loads(path.read_text())
            run_date = dt.date.fromisoformat(str(record.get("date", ""))[:10])
        except (OSError, ValueError, json.JSONDecodeError):
            continue
        if cutoff <= run_date < dt.date.fromisoformat(before_date):
            for topic in record.get("topics", []):
                if isinstance(topic, dict):
                    topics.append(topic)
    return topics


def _status_paths(output: str) -> set[str]:
    paths = set()
    for line in output.splitlines():
        if len(line) < 4:
            continue
        path = line[3:]
        if " -> " in path:
            path = path.split(" -> ", 1)[1]
        paths.add(path)
    return paths


def _remote_commit_url(remote_url: str, sha: str) -> str:
    cleaned = remote_url.strip()
    if cleaned.startswith("git@github.com:"):
        cleaned = "https://github.com/" + cleaned.split(":", 1)[1]
    elif cleaned.startswith("ssh://git@github.com/"):
        cleaned = "https://github.com/" + cleaned.split("github.com/", 1)[1]
    cleaned = re.sub(r"\.git$", "", cleaned.rstrip("/"))
    return f"{cleaned}/commit/{sha}"


def _sitemap_contains(body: str, canonical_url: str) -> bool:
    try:
        root = ET.fromstring(body)
    except ET.ParseError:
        return False
    return any(
        element.tag.rsplit("}", 1)[-1] == "loc"
        and (element.text or "").strip().rstrip("/") == canonical_url.rstrip("/")
        for element in root.iter()
    )


def _write_log(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(text.rstrip() + "\n")


def run_daily(
    repo: Path,
    now: dt.datetime,
    effects: Effects,
    dry_run: bool = False,
    artifact_file: Optional[Path] = None,
) -> RunOutcome:
    repo = Path(repo).resolve()
    lock = None
    owns_lock = False
    skill_root = resolve_skill_root(os.environ)
    modules = None
    cfg = None
    run = None
    run_id = None
    local_date = None
    zone = None
    stage = "locking"
    commit = None
    commit_url = None
    slug = None
    log_path = repo / ".blog-pipeline" / "runs" / "daily-blog.log"
    created_paths: list[Path] = []
    cleanup_allowed = True
    event_at = lambda: _timestamp(now)
    try:
        modules = _load_skill_modules(skill_root)
        stage = "configuration"
        cfg = modules["load_config"](repo)
        cfg = json.loads(json.dumps(cfg))
        cfg["target"]["repoPath"] = str(repo)
        zone = ZoneInfo(cfg["automation"]["timezone"])
        local_now = now.astimezone(zone)
        local_date = local_now.date().isoformat()
        run_id = f"{local_date}-{AUTO_RUN_SUFFIX}"
        log_path = repo / ".blog-pipeline" / "runs" / f"{run_id}.log"
        event_at = lambda: _timestamp(effects.now().astimezone(zone))
        lock = effects.acquire_lock(repo / ".blog-pipeline" / "daily-blog.lock")
        if lock is None:
            try:
                effects.notify(
                    "skipped_locked",
                    f"*FinBoard Daily Blog*\nSkipped {local_date} because another run holds the lock.",
                    cfg,
                )
            except Exception as notify_error:
                _write_log(log_path, f"{event_at()} lock-skip notification failed: {notify_error}")
            return RunOutcome(SKIPPED_LOCKED, 0)
        owns_lock = True
        if cfg.get("gates") != {"topicApproval": "auto", "contentApproval": "auto"}:
            raise StageError(stage, "daily runner requires both approval gates to equal 'auto'")
        content_dir = repo / cfg["target"]["contentDir"]

        existing_run = modules["load_run"](repo, run_id)
        if existing_run and existing_run["status"] != modules["states"]["dry"]:
            exit_code = 1 if existing_run["status"] == modules["states"]["failed"] else 0
            if existing_run["status"] == modules["states"]["published"]:
                try:
                    effects.notify("already_published", f"*FinBoard Daily Blog*\nThe {local_date} automatic run is already published; no second post was created.", cfg)
                except Exception as notify_error:
                    _write_log(log_path, f"{event_at()} repeat-run notification failed: {notify_error}")
            return RunOutcome(existing_run["status"], exit_code)
        if local_date in _blog_dates(content_dir):
            modules["create_terminal"](repo, run_id, modules["states"]["already"], event_at(), {"reason": "article date exists"})
            try:
                effects.notify("already_published", f"*FinBoard Daily Blog*\nA {local_date} article already exists; no second post was created.", cfg)
            except Exception as notify_error:
                _write_log(log_path, f"{event_at()} already-published notification failed: {notify_error}")
            return RunOutcome(ALREADY_PUBLISHED, 0)

        if existing_run:
            run = {**existing_run, "status": "researching"}
            run = modules["record_event"](run, "real_run_started", event_at(), {"after": VALIDATED_DRY_RUN})
            modules["save_run"](repo, run)

        stage = "preflight"
        branch = _command(effects, ["git", "branch", "--show-current"], repo, stage).stdout.strip()
        if branch != cfg["deploy"]["target"]:
            raise StageError(stage, f"expected branch {cfg['deploy']['target']}, got {branch or '(detached)'}")
        dirty = _status_paths(_command(effects, ["git", "status", "--porcelain", "--untracked-files=all"], repo, stage).stdout)
        if dirty:
            raise StageError(stage, "worktree is not clean: " + ", ".join(sorted(dirty)))
        remote = cfg["deploy"]["remote"]
        target = cfg["deploy"]["target"]
        _command(effects, ["git", "fetch", remote, target], repo, stage)
        _command(effects, ["git", "merge", "--ff-only", f"{remote}/{target}"], repo, stage)
        local_head = _command(effects, ["git", "rev-parse", "HEAD"], repo, stage).stdout.strip()
        upstream_head = _command(effects, ["git", "rev-parse", f"{remote}/{target}"], repo, stage).stdout.strip()
        if local_head != upstream_head:
            raise StageError(stage, "local deployment branch contains commits not present on the configured remote branch")
        if local_date in _blog_dates(content_dir):
            if existing_run:
                existing_run = {**existing_run, "status": modules["states"]["already"]}
                existing_run = modules["record_event"](existing_run, ALREADY_PUBLISHED, event_at(), {"reason": "article date fetched from remote"})
                modules["save_run"](repo, existing_run)
            else:
                modules["create_terminal"](repo, run_id, modules["states"]["already"], event_at(), {"reason": "article date fetched from remote"})
            try:
                effects.notify("already_published", f"*FinBoard Daily Blog*\nA {local_date} article was fetched from {remote}; no second post was created.", cfg)
            except Exception as notify_error:
                _write_log(log_path, f"{event_at()} fetched-article notification failed: {notify_error}")
            return RunOutcome(ALREADY_PUBLISHED, 0)

        if run is None:
            run = modules["create_run"](repo, run_id)

        run = modules["advance"](run, modules["states"]["selecting"], event_at())
        modules["save_run"](repo, run)
        stage = "researching"
        if artifact_file:
            raw = (artifact_file if artifact_file.is_absolute() else repo / artifact_file).read_text()
        else:
            slack = cfg["reviewChannel"]["slack"]
            secret_names = {name for name in (slack.get("webhookEnv"), slack.get("botTokenEnv")) if name}
            argv = build_claude_argv(
                repo,
                skill_root,
                json.dumps(modules["schema"], separators=(",", ":")),
                local_date,
                _model_config(cfg),
            )
            result = _command(effects, argv, repo, stage, sanitize_model_env(os.environ, secret_names))
            raw = result.stdout
        artifact = modules["parse"](raw)
        if artifact.get("outcome") == NOTHING_PUBLISHABLE:
            errors = modules["validate_artifact"](artifact, cfg, local_date, [], [])
            if errors:
                raise StageError("validating", "; ".join(errors))
            effects.notify(
                "nothing_publishable",
                f"*FinBoard Daily Blog*\nNo publishable topic for {local_date}.\nReason: {artifact['reason']}",
                cfg,
            )
            run = modules["advance"](run, modules["states"]["nothing"], event_at())
            run = modules["record_event"](run, NOTHING_PUBLISHABLE, event_at(), {"reason": artifact["reason"], "slackPosted": True})
            modules["save_run"](repo, run)
            return RunOutcome(NOTHING_PUBLISHABLE, 0)

        run = modules["advance"](run, modules["states"]["drafting"], event_at())
        modules["save_run"](repo, run)
        stage = "validating"
        posts = modules["load_posts"](content_dir)
        recent = _recent_topics(repo, local_date)
        errors = modules["validate_artifact"](artifact, cfg, local_date, posts, recent)
        if errors:
            raise StageError(stage, "; ".join(errors))
        run["topics"] = [artifact["topic"]]
        run["selected"] = [0]
        run = modules["record_event"](
            run,
            "topic_selected",
            event_at(),
            {
                "slug": artifact["topic"]["slug"],
                "scores": artifact["topic"]["scores"],
                "sources": artifact["topic"]["sources"],
            },
        )
        modules["save_run"](repo, run)
        article_path, cover_path = modules["paths"](repo, cfg, artifact)
        for path in (article_path, cover_path):
            if path.exists():
                raise StageError(stage, f"refusing to overwrite existing path: {path}")
        article_path.parent.mkdir(parents=True, exist_ok=True)
        article_path.write_text(json.dumps(artifact["blog"], indent=2, ensure_ascii=False) + "\n")
        created_paths.append(article_path)
        cover_path.parent.mkdir(parents=True, exist_ok=True)
        cover_args = [
            sys.executable,
            str(skill_root / "scripts" / "gen_cover.py"),
            "blog",
            str(cover_path),
            "--title",
            artifact["blog"]["title"],
            "--tag",
            artifact["cover"]["tag"],
            "--accent",
            artifact["cover"]["accent"],
        ]
        _command(effects, cover_args, repo, stage)
        if not cover_path.is_file():
            raise StageError(stage, "cover generation failed")
        created_paths.append(cover_path)
        file_errors = modules["validate_file"](article_path, cfg, [post.slug for post in posts])
        if file_errors:
            raise StageError(stage, "; ".join(file_errors))
        run = modules["advance"](run, modules["states"]["validating"], event_at())
        modules["save_run"](repo, run)
        validation_results = []
        for argv in cfg["automation"]["validationCommands"]:
            result = effects.run(argv, repo)
            validation_results.append({"argv": list(argv), "returncode": result.returncode})
            run["validation"] = {"commands": list(validation_results), "changedPaths": []}
            modules["save_run"](repo, run)
            if result.returncode:
                detail = (result.stderr or result.stdout or "command failed").strip()
                raise StageError(stage, f"{' '.join(argv)}: {detail[-1000:]}")
        expected = {str(article_path.relative_to(repo)), str(cover_path.relative_to(repo))}
        actual = _status_paths(_command(effects, ["git", "status", "--porcelain", "--untracked-files=all"], repo, stage).stdout)
        path_errors = validate_changed_paths(expected, actual)
        if path_errors:
            raise StageError(stage, "; ".join(path_errors))
        run["validation"] = {"commands": validation_results, "changedPaths": sorted(actual)}
        modules["save_run"](repo, run)

        slug = artifact["blog"]["slug"]
        if dry_run:
            for path in reversed(created_paths):
                path.unlink()
            created_paths.clear()
            run = modules["advance"](run, modules["states"]["dry"], event_at())
            run = modules["record_event"](run, VALIDATED_DRY_RUN, event_at(), {"slug": slug, "paths": sorted(expected)})
            modules["save_run"](repo, run)
            return RunOutcome(VALIDATED_DRY_RUN, 0, slug=slug)

        stage = "committing"
        run = modules["advance"](run, modules["states"]["committing"], event_at())
        modules["save_run"](repo, run)
        cleanup_allowed = False
        _command(effects, ["git", "add", "--", *sorted(expected)], repo, stage)
        staged = set(_command(effects, ["git", "diff", "--cached", "--name-only"], repo, stage).stdout.splitlines())
        path_errors = validate_changed_paths(expected, staged)
        if path_errors:
            raise StageError(stage, "; ".join(path_errors))
        _command(effects, ["git", "commit", "-m", f"blog: publish {slug}"], repo, stage)
        commit = _command(effects, ["git", "rev-parse", "HEAD"], repo, stage).stdout.strip()
        remote_url = _command(effects, ["git", "remote", "get-url", remote], repo, stage).stdout.strip()
        commit_url = _remote_commit_url(remote_url, commit)
        run = modules["advance"](run, modules["states"]["deploying"], event_at())
        run["deploy"] = {"branch": target, "commit": commit, "prodUrls": []}
        modules["save_run"](repo, run)
        _command(effects, ["git", "push", remote, f"HEAD:{target}"], repo, "deploying")

        stage = "verifying"
        run = modules["advance"](run, modules["states"]["verifying"], event_at())
        modules["save_run"](repo, run)
        base = cfg["automation"]["productionBaseUrl"].rstrip("/")
        live_url = f"{base}/blog/{slug}"
        page_ok = sitemap_ok = False
        for attempt in range(cfg["automation"]["verificationAttempts"]):
            if not page_ok:
                page_status, _ = effects.fetch(live_url)
                page_ok = page_status == 200
            if not sitemap_ok:
                sitemap_status, sitemap = effects.fetch(cfg["automation"]["sitemapUrl"])
                sitemap_ok = sitemap_status == 200 and _sitemap_contains(sitemap, live_url)
            if page_ok and sitemap_ok:
                break
            if attempt + 1 < cfg["automation"]["verificationAttempts"]:
                effects.sleep(cfg["automation"]["verificationIntervalSeconds"])
        if not page_ok or not sitemap_ok:
            missing = "page and sitemap" if not page_ok and not sitemap_ok else "page" if not page_ok else "sitemap"
            raise StageError(stage, f"production {missing} verification failed for {slug}")
        completed = effects.now().astimezone(zone).strftime("%Y-%m-%d %H:%M %Z")
        message = build_success_message(artifact["blog"]["title"], live_url, commit_url, commit[:7], completed)
        effects.notify("success", message, cfg)
        run = modules["advance"](run, modules["states"]["published"], event_at())
        run["drafted"] = [{"slug": slug, "file": str(article_path.relative_to(repo))}]
        run["deploy"] = {
            "branch": target,
            "commit": commit,
            "prodUrls": [live_url],
            "pageVerified": True,
            "sitemapVerified": True,
            "slackPosted": True,
        }
        run = modules["record_event"](run, SUCCESS, event_at(), {"slug": slug, "productionUrl": live_url, "commit": commit})
        modules["save_run"](repo, run)
        return RunOutcome(SUCCESS, 0, slug, commit, live_url)
    except Exception as error:
        if not isinstance(error, StageError):
            error = StageError(stage, str(error))
        _write_log(log_path, f"{event_at()} [{error.stage}] {error}")
        if owns_lock and modules is not None and run is None and run_id is not None:
            try:
                run = modules["create_run"](repo, run_id)
            except Exception:
                run = None
        if owns_lock and modules is not None and run is not None:
            try:
                if run.get("status") != modules["states"]["failed"]:
                    run = modules["advance"](run, modules["states"]["failed"], event_at())
                run = modules["record_event"](run, FAILED, event_at(), {"stage": error.stage, "error": str(error)[:1000]})
                modules["save_run"](repo, run)
            except Exception as state_error:
                _write_log(log_path, f"state write failed: {state_error}")
        if cfg is not None:
            try:
                effects.notify("failure", build_failure_message(error.stage, str(error), log_path, commit_url, commit[:7] if commit else None), cfg)
            except Exception as notify_error:
                _write_log(log_path, f"failure notification failed: {notify_error}")
        return RunOutcome(FAILED, 1, slug, commit)
    finally:
        # Cleanup is intentionally limited to files created by this failed run
        # before Git committed them. Never reset, clean, stash, or touch prior files.
        if cleanup_allowed:
            for path in reversed(created_paths):
                try:
                    path.unlink()
                except FileNotFoundError:
                    pass
        effects.release_lock(lock)


def main(argv: Optional[Sequence[str]] = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, required=True)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--artifact-file", type=Path)
    args = parser.parse_args(argv)
    now = dt.datetime.now().astimezone()
    outcome = run_daily(args.repo, now, SystemEffects(), args.dry_run, args.artifact_file)
    print(json.dumps(outcome.__dict__, sort_keys=True))
    return outcome.exit_code


if __name__ == "__main__":
    raise SystemExit(main())
