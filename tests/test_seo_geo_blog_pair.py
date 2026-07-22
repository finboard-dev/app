import json
import struct
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "frontend" / "content" / "blog"
COVERS = ROOT / "frontend" / "public" / "blog" / "covers"

POSTS = {
    "quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses": {
        "title": "QuickBooks Multi-Entity Reporting in 2026: What It Does and Still Misses",
        "cover": "quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png",
        "required_external": (
            "quickbooks.intuit.com/learn-support/en-us/help-article/vendor-management/",
            "quickbooks.intuit.com/learn-support/en-uk/help-article/multi-entity/",
            "quickbooks.intuit.com/learn-support/en-us/help-article/multi-entity/",
        ),
        "required_internal": (
            "/blog/how-to-combine-reports-from-multiple-quickbooks-online-companies-every-method-compared",
            "/blog/intercompany-eliminations-a-practical-guide-for-busy-finance-teams",
            "/blog/finboard-ai-vs-liveflow-live-quickbooks-reporting-compared-2026",
            "/products/consolidation",
        ),
        "required_phrases": (
            "availability may vary",
            "Intuit Enterprise Suite",
            "QuickBooks Online Accountant",
        ),
    },
    "five-p-and-l-numbers-small-business-owners-should-check-monthly": {
        "title": "Five Numbers Every Small-Business Owner Should Check on Their P&L Each Month",
        "cover": "five-p-and-l-numbers-small-business-owners-should-check-monthly.png",
        "required_external": (),
        "required_internal": (
            "/blog/why-quickbooks-online-cannot-manage-a-reliable-13-week-cash-flow-forecast-and-how-to-fix-it",
            "/blog/consolidated-budget-vs-actuals-a-guide-to-multi-entity-budgeting",
            "/blog/multi-location-restaurant-p-and-l-in-quickbooks-online-prime-cost-by-location",
            "/products/analytics",
        ),
        "required_phrases": (
            "Revenue trend",
            "Gross margin",
            "Operating expense ratio",
            "Profit margin",
            "cash",
        ),
    },
}


def png_size(path):
    data = path.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise AssertionError(f"not a PNG: {path}")
    return struct.unpack(">II", data[16:24])


class SeoGeoBlogPairTest(unittest.TestCase):
    def test_two_posts_have_complete_metadata_and_content(self):
        for slug, expected in POSTS.items():
            with self.subTest(slug=slug):
                path = BLOG / f"{slug}.json"
                self.assertTrue(path.is_file(), path)
                post = json.loads(path.read_text())
                self.assertEqual(post["slug"], slug)
                self.assertEqual(post["title"], expected["title"])
                self.assertEqual(post["category"], "accounting")
                self.assertEqual(post["authorId"], "vaishnav-gupta")
                self.assertEqual(post["date"], "2026-07-22")
                self.assertEqual(post["coverImage"], f"/blog/covers/{expected['cover']}")
                self.assertGreaterEqual(len(post["excerpt"]), 110)
                self.assertLessEqual(len(post["excerpt"]), 155)
                self.assertGreaterEqual(len(post["content"].split()), 1500)
                self.assertGreaterEqual(post["content"].count("<h2>"), 6)
                self.assertIn("<table>", post["content"])
                self.assertIn("FAQ", post["content"])
                for needle in expected["required_external"] + expected["required_internal"]:
                    self.assertIn(needle, post["content"])
                for phrase in expected["required_phrases"]:
                    self.assertIn(phrase.lower(), post["content"].lower())

    def test_structured_data_describes_each_published_article(self):
        for slug in POSTS:
            with self.subTest(slug=slug):
                post = json.loads((BLOG / f"{slug}.json").read_text())
                schema = post["structuredData"]
                self.assertEqual(schema["@context"], "https://schema.org")
                self.assertIn(schema["@type"], ("Article", "BlogPosting"))
                self.assertEqual(schema["headline"], post["title"])
                self.assertEqual(schema["datePublished"], "2026-07-22")
                self.assertEqual(schema["dateModified"], "2026-07-22")
                self.assertEqual(schema["mainEntityOfPage"], f"https://finboard.ai/blog/{slug}")
                self.assertEqual(schema["author"]["name"], "Vaishnav Gupta")

    def test_covers_are_landscape_pngs_large_enough_for_social_preview(self):
        for expected in POSTS.values():
            path = COVERS / expected["cover"]
            with self.subTest(path=path):
                self.assertTrue(path.is_file(), path)
                width, height = png_size(path)
                self.assertGreater(width, height)
                self.assertGreaterEqual(width, 1200)
                self.assertGreaterEqual(height, 630)


if __name__ == "__main__":
    unittest.main()
