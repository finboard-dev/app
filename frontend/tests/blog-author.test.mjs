import assert from "node:assert/strict";
import test from "node:test";
import {
  FINBOARD_TEAM_AUTHOR,
  FINBOARD_TEAM_SCHEMA_AUTHOR,
  normalizeBlogStructuredData,
  resolveAuthor,
} from "../src/lib/blogAuthor.mjs";

test("always resolves FinBoard Team for blog authorship", () => {
  assert.equal(resolveAuthor().name, "FinBoard Team");
  assert.equal(resolveAuthor("tech", "ujjwal-singh"), FINBOARD_TEAM_AUTHOR);
  assert.equal(resolveAuthor("accounting", "vaishnav-gupta"), FINBOARD_TEAM_AUTHOR);
});

test("normalizes Article and BlogPosting authors recursively", () => {
  const input = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: "Example",
        author: { "@type": "Person", name: "Someone Else" },
      },
      {
        "@type": ["Article", "TechArticle"],
        name: "Nested article",
      },
      {
        "@type": "TechArticle",
        name: "Subtype article",
      },
      {
        "@type": "https://schema.org/BlogPosting",
        name: "Expanded blog posting",
      },
      { "@type": "Organization", name: "Publisher" },
    ],
  };

  const result = normalizeBlogStructuredData(input);

  assert.deepEqual(result["@graph"][0].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.deepEqual(result["@graph"][1].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.deepEqual(result["@graph"][2].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.deepEqual(result["@graph"][3].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.equal(result["@graph"][4].author, undefined);
  assert.notEqual(result, input);
});
