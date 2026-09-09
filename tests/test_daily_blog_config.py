import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class DailyBlogConfigTest(unittest.TestCase):
    def test_daily_auto_values_are_explicit(self):
        cfg = json.loads((ROOT / ".blog-pipeline/config.json").read_text())
        self.assertEqual(cfg["blogsPerRun"], 1)
        self.assertEqual(cfg["cron"], "10 12 * * *")
        self.assertEqual(cfg["gates"], {"topicApproval": "auto", "contentApproval": "auto"})
        self.assertEqual(cfg["automation"]["timezone"], "Asia/Kolkata")
        self.assertEqual(cfg["automation"]["productionBaseUrl"], "https://finboard.ai")
        self.assertEqual(cfg["automation"]["sitemapUrl"], "https://finboard.ai/sitemap.xml")
        self.assertEqual(cfg["reviewChannel"]["slack"]["webhookEnv"], "BLOG_PIPELINE_SLACK_WEBHOOK")

    def test_run_records_are_ignored(self):
        ignored = (ROOT / ".gitignore").read_text().splitlines()
        self.assertIn(".blog-pipeline/runs/", ignored)
        self.assertIn(".blog-pipeline/daily-blog.lock", ignored)

    def test_automation_object_matches_plan_exactly(self):
        cfg = json.loads((ROOT / ".blog-pipeline/config.json").read_text())
        self.assertEqual(cfg["automation"], {"timezone": "Asia/Kolkata", "minTopicScore": 18, "minSourceAuthority": 4, "similarityThreshold": 0.72, "productionBaseUrl": "https://finboard.ai", "sitemapUrl": "https://finboard.ai/sitemap.xml", "verificationAttempts": 30, "verificationIntervalSeconds": 20, "validationCommands": [["python3", "-m", "unittest", "tests.test_daily_blog", "tests.test_daily_blog_config", "tests.test_daily_blog_launchd", "-v"], ["yarn", "--cwd", "frontend", "build"]]})
