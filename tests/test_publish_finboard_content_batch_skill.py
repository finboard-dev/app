import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / ".agents" / "skills" / "publish-finboard-content-batch"
SKILL_MD = SKILL / "SKILL.md"
CADENCE = SKILL / "scripts" / "check_batch_day.py"
CLEANER = SKILL / "scripts" / "clean_plain_text.py"
FORBIDDEN = ("\u2014", "\u2013", "\u2022", "\u2192", "\u2605", "\u2713", "\u2705")


def candidate(kind, index):
    return {
        "candidateId": f"{kind}-{index}",
        "topic": f"{kind.title()} topic {index}",
        "primaryKeyword": f"{kind} keyword {index}",
        "keywordDemandEvidence": {
            "metric": "monthlySearchVolume",
            "value": 100 + index,
            "sourceUrl": "https://example.com/keyword-demand",
            "observedDate": "2026-07-22",
        },
        "score": 80 + index,
        "scoreBreakdown": {
            "buyerPain": 20,
            "searchIntent": 20,
            "productRelevance": 20,
            "competitorGap": 10,
            "geoPotential": 10,
            "practicalValue": index,
        },
    }


def complete_record(publication_date):
    blogs = [candidate("blog", index) for index in range(1, 7)]
    templates = [candidate("template", index) for index in range(1, 7)]
    return {
        "publicationDate": publication_date,
        "timeZone": "Asia/Kolkata",
        "batchId": f"{publication_date}-finboard-content",
        "commitSubject": f"content: publish FinBoard batch {publication_date}",
        "researchSources": [
            {"url": "https://example.com/research", "observedDate": publication_date}
        ],
        "candidateBlogs": blogs,
        "candidateTemplates": templates,
        "selectedBlogs": [
            {
                "candidateId": blogs[0]["candidateId"],
                "slug": "blog-1",
                "selectionReason": "Highest eligible blog score",
            },
            {
                "candidateId": blogs[1]["candidateId"],
                "slug": "blog-2",
                "selectionReason": "Second highest eligible blog score",
            },
        ],
        "selectedTemplates": [
            {
                "candidateId": templates[0]["candidateId"],
                "slug": "template-1",
                "selectionReason": "Highest eligible template score",
            },
            {
                "candidateId": templates[1]["candidateId"],
                "slug": "template-2",
                "selectionReason": "Second highest eligible template score",
            },
        ],
        "publicationOrder": ["Blog 1", "Template 1", "Blog 2", "Template 2"],
    }


def run_cadence(runs_dir, current_date):
    result = subprocess.run(
        [sys.executable, str(CADENCE), "--runs-dir", str(runs_dir), "--date", current_date],
        capture_output=True,
        text=True,
        check=True,
    )
    return json.loads(result.stdout)


def run_git(repo, *args):
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        capture_output=True,
        text=True,
        check=True,
    )


def init_repository(tmp):
    repo = Path(tmp)
    runs = repo / "content-pipeline" / "runs"
    runs.mkdir(parents=True)
    run_git(repo, "init", "-q", "-b", "main")
    run_git(repo, "config", "user.name", "Skill Test")
    run_git(repo, "config", "user.email", "skill-test@example.com")
    return repo, runs


def commit_record(repo, runs, publication_date, data=None, subject=None):
    record = data if data is not None else complete_record(publication_date)
    path = runs / f"{publication_date}.json"
    path.write_text(json.dumps(record))
    run_git(repo, "add", str(path.relative_to(repo)))
    run_git(repo, "commit", "-q", "-m", subject or record["commitSubject"])
    return path


def mark_origin_main(repo):
    run_git(repo, "update-ref", "refs/remotes/origin/main", "HEAD")


def commit_base(repo, update_origin=True):
    marker = repo / "README.md"
    marker.write_text("base")
    run_git(repo, "add", "README.md")
    run_git(repo, "commit", "-q", "-m", "base")
    if update_origin:
        mark_origin_main(repo)
    return run_git(repo, "rev-parse", "HEAD").stdout.strip()


class PublishFinboardContentBatchSkillTest(unittest.TestCase):
    def test_required_skill_files_exist(self):
        required = [
            SKILL_MD,
            SKILL / "agents" / "openai.yaml",
            CADENCE,
            CLEANER,
            SKILL / "references" / "research-and-scoring.md",
            SKILL / "references" / "repository-contract.md",
        ]
        for path in required:
            with self.subTest(path=path):
                self.assertTrue(path.is_file(), path)

    def test_skill_metadata_and_operational_contract(self):
        text = SKILL_MD.read_text()
        self.assertTrue(text.startswith("---\nname: publish-finboard-content-batch\n"))
        self.assertIn("description: Use when", text)
        self.assertIn("Asia Kolkata", text)
        self.assertIn("Blog 1", text)
        self.assertLess(text.index("Blog 1"), text.index("Template 1"))
        self.assertLess(text.index("Template 1"), text.index("Blog 2"))
        self.assertLess(text.index("Blog 2"), text.index("Template 2"))
        self.assertIn("FinBoard Team", text)
        self.assertIn("https://www.linkedin.com/company/finboard-ai-native-finance", text)
        self.assertIn("one atomic batch commit", text)
        self.assertIn("push directly to origin/main", text)
        self.assertIn("Do not run test suites", text)
        self.assertIn("Do not publish a partial batch", text)
        self.assertIn("Clean every visible field immediately before copying", text)
        retry = text.index("If `action` is `retry_push`")
        generic_stop = text.index("If `eligible` is false")
        self.assertLess(retry, generic_stop)
        self.assertIn("git push origin HEAD:refs/heads/main", text)

    def test_safe_direct_to_main_protocol_is_explicit(self):
        skill = SKILL_MD.read_text()
        repository = (SKILL / "references" / "repository-contract.md").read_text()
        for text in (skill, repository):
            self.assertIn("git fetch origin main", text)
            self.assertIn("current branch is `main`", text)
            self.assertIn("local `HEAD` exactly equals `refs/remotes/origin/main`", text)
            self.assertIn("parent equals `refs/remotes/origin/main`", text)
            self.assertIn("batch record was introduced or changed by that exact `HEAD` commit", text)
            self.assertIn("actual `HEAD` commit subject equals the record `commitSubject`", text)
            self.assertIn("git push origin HEAD:refs/heads/main", text)
        self.assertLess(skill.index("git fetch origin main"), skill.index("## 3. Research candidates"))

    def test_summary_cover_creation_is_not_post_publication_verification(self):
        for path in (SKILL_MD, SKILL / "references" / "repository-contract.md"):
            text = path.read_text()
            self.assertIn("creation-time Summary generation and inspection", text)
            self.assertIn("no post-publication visual verification", text)

    def test_declared_helper_type_annotations_are_present(self):
        self.assertIn(
            "def batch_decision(runs_dir: Path, current_date: date) -> dict[str, object]:",
            CADENCE.read_text(),
        )
        self.assertIn("def clean_plain_text(text: str) -> str:", CLEANER.read_text())

    def test_research_contract_requires_keyword_demand_evidence(self):
        text = (SKILL / "references" / "research-and-scoring.md").read_text()
        self.assertIn("keyword demand", text.lower())
        self.assertIn('"keywordDemandEvidence"', text)

    def test_scoring_contract_defines_exact_finite_breakdown(self):
        paths = (
            SKILL / "references" / "research-and-scoring.md",
            SKILL / "references" / "repository-contract.md",
        )
        for path in paths:
            text = path.read_text()
            for field in (
                "buyerPain",
                "searchIntent",
                "productRelevance",
                "competitorGap",
                "geoPotential",
                "practicalValue",
            ):
                self.assertIn(field, text)
            self.assertIn("finite", text)
            self.assertIn("equals the `scoreBreakdown` total", text)

    def test_repository_contract_defines_success_signal_and_push_retry(self):
        text = (SKILL / "references" / "repository-contract.md").read_text()
        self.assertIn("complete locally committed batch record", text)
        self.assertIn("retry the existing completed batch", text)
        self.assertIn("exact file version is committed in local `HEAD`", text)
        self.assertIn("absent from `refs/remotes/origin/main`", text)

    def test_openai_metadata_has_required_interface(self):
        text = (SKILL / "agents" / "openai.yaml").read_text()
        self.assertIn('display_name: "Publish FinBoard Content Batch"', text)
        self.assertIn('short_description: "Research and publish four FinBoard content items"', text)
        self.assertIn("$publish-finboard-content-batch", text)

    def test_cadence_allows_first_and_two_day_batches(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo, runs = init_repository(tmp)
            self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "no_previous_batch")
            commit_record(repo, runs, "2026-07-20")
            mark_origin_main(repo)
            decision = run_cadence(runs, "2026-07-22")
            self.assertTrue(decision["eligible"])
            self.assertEqual(decision["reason"], "eligible_publish_day")

    def test_cadence_stops_same_day_and_skip_day(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo, runs = init_repository(tmp)
            commit_record(repo, runs, "2026-07-22")
            mark_origin_main(repo)
            self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "already_published_today")
            self.assertEqual(run_cadence(runs, "2026-07-23")["reason"], "skip_day")

    def test_cadence_retries_local_commit_absent_from_origin_main(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo, runs = init_repository(tmp)
            commit_base(repo)
            commit_record(repo, runs, "2026-07-22")
            batch_commit = run_git(repo, "rev-parse", "HEAD").stdout.strip()
            decision = run_cadence(runs, "2026-07-22")
            self.assertFalse(decision["eligible"])
            self.assertEqual(decision["action"], "retry_push")
            self.assertEqual(decision["reason"], "push_retry")
            self.assertEqual(decision["previousDate"], "2026-07-22")
            self.assertEqual(decision["batchCommit"], batch_commit)

    def test_cadence_stops_unsafe_local_only_push_states(self):
        states = ("non_main", "unrelated_commit", "missing_origin", "divergent_origin")
        for state in states:
            with self.subTest(state=state), tempfile.TemporaryDirectory() as tmp:
                repo, runs = init_repository(tmp)
                base_commit = commit_base(repo, update_origin=state != "missing_origin")
                if state == "non_main":
                    run_git(repo, "checkout", "-q", "-b", "feature")
                elif state == "divergent_origin":
                    run_git(repo, "checkout", "-q", "-b", "divergent")
                    divergent = repo / "divergent.txt"
                    divergent.write_text("divergent")
                    run_git(repo, "add", "divergent.txt")
                    run_git(repo, "commit", "-q", "-m", "divergent")
                    divergent_commit = run_git(repo, "rev-parse", "HEAD").stdout.strip()
                    run_git(repo, "checkout", "-q", "main")
                    run_git(repo, "update-ref", "refs/remotes/origin/main", divergent_commit)
                commit_record(repo, runs, "2026-07-22")
                if state == "unrelated_commit":
                    extra = repo / "extra.txt"
                    extra.write_text("unrelated")
                    run_git(repo, "add", "extra.txt")
                    run_git(repo, "commit", "-q", "-m", "unrelated")
                decision = run_cadence(runs, "2026-07-22")
                self.assertFalse(decision["eligible"])
                self.assertEqual(decision["action"], "stop")
                self.assertEqual(decision["reason"], "unsafe_push_state")
                self.assertNotIn("batchCommit", decision)
                self.assertTrue(base_commit)

    def test_cadence_stops_two_parent_merge_batch_commit(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo, runs = init_repository(tmp)
            commit_base(repo)
            run_git(repo, "checkout", "-q", "-b", "side")
            side_file = repo / "side.txt"
            side_file.write_text("side")
            run_git(repo, "add", "side.txt")
            run_git(repo, "commit", "-q", "-m", "side")
            run_git(repo, "checkout", "-q", "main")
            run_git(repo, "merge", "--no-ff", "--no-commit", "side")
            data = complete_record("2026-07-22")
            path = runs / "2026-07-22.json"
            path.write_text(json.dumps(data))
            run_git(repo, "add", str(path.relative_to(repo)))
            run_git(repo, "commit", "-q", "-m", data["commitSubject"])
            parents = run_git(repo, "rev-list", "--parents", "-n", "1", "HEAD").stdout.split()
            self.assertEqual(len(parents), 3)
            decision = run_cadence(runs, "2026-07-22")
            self.assertEqual(decision["action"], "stop")
            self.assertEqual(decision["reason"], "unsafe_push_state")
            self.assertNotIn("batchCommit", decision)

    def test_cadence_stops_retry_with_mismatched_commit_subject(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo, runs = init_repository(tmp)
            commit_base(repo)
            commit_record(repo, runs, "2026-07-22", subject="wrong batch subject")
            decision = run_cadence(runs, "2026-07-22")
            self.assertEqual(decision["action"], "stop")
            self.assertEqual(decision["reason"], "unsafe_push_state")
            self.assertNotIn("batchCommit", decision)

    def test_cadence_ignores_malformed_records(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo, runs = init_repository(tmp)
            path = runs / "2026-07-22.json"
            path.write_text("not json")
            run_git(repo, "add", str(path.relative_to(repo)))
            run_git(repo, "commit", "-q", "-m", "malformed record")
            self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "no_previous_batch")

    def test_cadence_ignores_incomplete_and_unrelated_records(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo, runs = init_repository(tmp)
            incomplete = complete_record("2026-07-22")
            incomplete["selectedTemplates"] = [{"slug": "template-1"}]
            (runs / "2026-07-22.json").write_text(json.dumps(incomplete))
            mismatched = complete_record("2026-07-21")
            (runs / "2026-07-20.json").write_text(json.dumps(mismatched))
            (runs / "2026-07-19.json").write_text(json.dumps({"date": "2026-07-19"}))
            run_git(repo, "add", "content-pipeline/runs")
            run_git(repo, "commit", "-q", "-m", "invalid records")
            self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "no_previous_batch")

    def test_cadence_ignores_semantically_incomplete_records(self):
        def empty_sources(data):
            data["researchSources"] = []

        def too_few_candidates(data):
            data["candidateBlogs"] = data["candidateBlogs"][:5]

        def malformed_candidate(data):
            data["candidateTemplates"][0].pop("candidateId")

        def missing_selection_fields(data):
            data["selectedBlogs"][0].pop("selectionReason")

        def selection_not_in_pool(data):
            data["selectedTemplates"][0]["candidateId"] = "template-unknown"

        cases = {
            "empty_sources": empty_sources,
            "too_few_candidates": too_few_candidates,
            "malformed_candidate": malformed_candidate,
            "missing_selection_fields": missing_selection_fields,
            "selection_not_in_pool": selection_not_in_pool,
        }
        for name, mutate in cases.items():
            with self.subTest(name=name), tempfile.TemporaryDirectory() as tmp:
                repo, runs = init_repository(tmp)
                data = complete_record("2026-07-22")
                mutate(data)
                commit_record(repo, runs, "2026-07-22", data)
                self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "no_previous_batch")

    def test_cadence_ignores_invalid_candidate_scores(self):
        def missing_dimension(data):
            data["candidateBlogs"][0]["scoreBreakdown"].pop("practicalValue")

        def extra_dimension(data):
            data["candidateBlogs"][0]["scoreBreakdown"]["extra"] = 0

        def out_of_range(data):
            data["candidateBlogs"][0]["scoreBreakdown"]["buyerPain"] = 21

        def nan_score(data):
            data["candidateBlogs"][0]["score"] = float("nan")

        def infinite_breakdown(data):
            data["candidateBlogs"][0]["scoreBreakdown"]["buyerPain"] = float("inf")

        def total_mismatch(data):
            data["candidateBlogs"][0]["score"] = 99

        cases = {
            "missing_dimension": missing_dimension,
            "extra_dimension": extra_dimension,
            "out_of_range": out_of_range,
            "nan_score": nan_score,
            "infinite_breakdown": infinite_breakdown,
            "total_mismatch": total_mismatch,
        }
        for name, mutate in cases.items():
            with self.subTest(name=name), tempfile.TemporaryDirectory() as tmp:
                repo, runs = init_repository(tmp)
                data = complete_record("2026-07-22")
                mutate(data)
                commit_record(repo, runs, "2026-07-22", data)
                self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "no_previous_batch")

    def test_cadence_ignores_uncommitted_record_states(self):
        for state in ("untracked", "staged", "modified"):
            with self.subTest(state=state), tempfile.TemporaryDirectory() as tmp:
                repo, runs = init_repository(tmp)
                path = runs / "2026-07-22.json"
                path.write_text(json.dumps(complete_record("2026-07-22")))
                if state == "staged":
                    run_git(repo, "add", str(path.relative_to(repo)))
                elif state == "modified":
                    run_git(repo, "add", str(path.relative_to(repo)))
                    run_git(repo, "commit", "-q", "-m", "complete record")
                    changed = complete_record("2026-07-22")
                    changed["researchSources"].append(
                        {"url": "https://example.com/changed", "observedDate": "2026-07-22"}
                    )
                    path.write_text(json.dumps(changed))
                self.assertEqual(run_cadence(runs, "2026-07-22")["reason"], "no_previous_batch")

    def test_plain_text_cleaner_removes_decorative_characters(self):
        source = "Review \u2014 Summary \u2022 Ready \u2192 publish \u2705"
        result = subprocess.run(
            [sys.executable, str(CLEANER)],
            input=source,
            capture_output=True,
            text=True,
            check=True,
        )
        self.assertEqual(result.stdout.strip(), "Review - Summary Ready publish")

    def test_plain_text_cleaner_normalizes_quotes_and_repeated_punctuation(self):
        source = "\u201cReview\u201d isn\u2019t ready!!! Wait??? Value..."
        result = subprocess.run(
            [sys.executable, str(CLEANER)],
            input=source,
            capture_output=True,
            text=True,
            check=True,
        )
        self.assertEqual(result.stdout, '"Review" isn\'t ready! Wait? Value...')

    def test_plain_text_cleaner_preserves_required_technical_syntax(self):
        source = "https://example.com/a?x=1&&y=2\n=SUM(A1:A3)\n$1,234.56"
        result = subprocess.run(
            [sys.executable, str(CLEANER)],
            input=source,
            capture_output=True,
            text=True,
            check=True,
        )
        self.assertEqual(result.stdout, source)

    def test_plain_text_cleaner_normalizes_mixed_ornamental_punctuation(self):
        source = "Ready?!?! Really!!!??? Still?!?!!"
        result = subprocess.run(
            [sys.executable, str(CLEANER)],
            input=source,
            capture_output=True,
            text=True,
            check=True,
        )
        self.assertEqual(result.stdout, "Ready! Really? Still!")

    def test_skill_package_has_no_forbidden_characters_or_placeholders(self):
        for path in SKILL.rglob("*"):
            if not path.is_file() or path.suffix not in {".md", ".py", ".yaml"}:
                continue
            text = path.read_text()
            for token in FORBIDDEN:
                self.assertNotIn(token, text, f"{token!r} in {path}")
            for token in ("TO" + "DO", "T" + "BD", "FIX" + "ME"):
                self.assertNotIn(token, text, path)


if __name__ == "__main__":
    unittest.main()
