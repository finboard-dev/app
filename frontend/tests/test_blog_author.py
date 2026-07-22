import json
import sys
import unittest
from pathlib import Path

FRONTEND = Path(__file__).resolve().parents[1]
REPO = FRONTEND.parent
sys.path.insert(0, str(FRONTEND / "scripts"))

from blog_author import (  # noqa: E402
    AUTHOR_ID,
    AUTHOR_NAME,
    SCHEMA_AUTHOR,
    normalize_post,
    normalize_structured_data,
)


class BlogAuthorPolicyTest(unittest.TestCase):
    def test_normalizes_post_metadata_and_nested_article_schema(self):
        post = {
            "title": "Example",
            "author": "Someone Else",
            "authorId": "someone-else",
            "structuredData": {
                "@graph": [
                    {"@type": "BlogPosting", "author": {"@type": "Person"}},
                    {"@type": "Organization", "name": "Publisher"},
                ]
            },
        }

        result = normalize_post(post)

        self.assertEqual(result["author"], AUTHOR_NAME)
        self.assertEqual(result["authorId"], AUTHOR_ID)
        self.assertEqual(result["structuredData"]["@graph"][0]["author"], SCHEMA_AUTHOR)
        self.assertNotIn("author", result["structuredData"]["@graph"][1])

    def test_normalizes_article_type_arrays(self):
        result = normalize_structured_data({"@type": ["Article", "TechArticle"]})
        self.assertEqual(result["author"], SCHEMA_AUTHOR)

    def test_pipeline_exposes_only_finboard_team(self):
        config = json.loads((REPO / ".blog-pipeline" / "config.json").read_text())
        self.assertEqual(config["target"]["authors"], [{"id": AUTHOR_ID}])


if __name__ == "__main__":
    unittest.main()
