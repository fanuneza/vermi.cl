import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readDistFile(relativePath) {
  const absolutePath = path.join(distRoot, relativePath);
  if (!(await fileExists(absolutePath))) {
    throw new Error(`Missing build artifact: dist/${relativePath}`);
  }

  return readFile(absolutePath, "utf8");
}

async function getHtmlFiles(directory = distRoot) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return getHtmlFiles(entryPath);
      return entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );

  return nestedFiles.flat();
}

function assertMatch(content, pattern, message) {
  if (!pattern.test(content)) {
    throw new Error(message);
  }
}

function assertNoMatch(content, pattern, message) {
  if (pattern.test(content)) {
    throw new Error(message);
  }
}

const homeHtml = await readDistFile("index.html");
const privacyHtml = await readDistFile("privacidad/index.html");
const articleHtml = await readDistFile("blog/vermi-en-departamento/index.html");
const robotsTxt = await readDistFile("robots.txt");
const schemamapXml = await readDistFile("schemamap.xml");
const apiCatalog = await readDistFile(".well-known/api-catalog");
const schemaJson = await readDistFile("schema/post.json");
const markdownAlternate = await readDistFile("blog/vermi-en-departamento.md");
const headers = await readDistFile("_headers");
await readDistFile("591c2b87f0b68c44f260215f5d8e9da3.txt");

const htmlFiles = await getHtmlFiles();
const builtHtml = await Promise.all(
  htmlFiles.map((filePath) => readFile(filePath, "utf8")),
);

assertMatch(
  homeHtml,
  /<script[^>]+type="application\/ld\+json"/,
  "Home page is missing JSON-LD output.",
);
assertMatch(
  homeHtml,
  /<meta[^>]+name="twitter:card"[^>]+content="summary_large_image"/,
  "Home page is missing twitter:card metadata.",
);
assertMatch(
  homeHtml,
  /<link[^>]+rel="canonical"/,
  "Home page is missing canonical metadata.",
);

assertMatch(
  privacyHtml,
  /<meta[^>]+name="robots"[^>]+content="[^"]*noindex[^"]*"/,
  "Privacy page should emit noindex metadata.",
);
assertNoMatch(
  privacyHtml,
  /<link[^>]+rel="canonical"/,
  "Privacy page should not emit a canonical link while noindex is active.",
);

assertMatch(
  articleHtml,
  /<script[^>]+type="application\/ld\+json"/,
  "Blog article is missing JSON-LD output.",
);
assertMatch(
  articleHtml,
  /type="text\/markdown"/,
  "Blog article is missing its Markdown alternate link.",
);
assertMatch(
  articleHtml,
  /"@type":"BlogPosting"|\"@type\":\s*\"BlogPosting\"/,
  "Blog article JSON-LD should include a BlogPosting entity.",
);

assertMatch(
  robotsTxt,
  /Sitemap:\s+https:\/\/vermi\.cl\/sitemap\.xml/,
  "robots.txt is missing the sitemap directive.",
);
assertNoMatch(
  robotsTxt,
  /Schemamap:/,
  "robots.txt should not include the non-standard Schemamap directive.",
);
assertMatch(
  schemamapXml,
  /<loc>https:\/\/vermi\.cl\/schema\/post\.json<\/loc>/,
  "schemamap.xml is missing the consolidated post schema endpoint.",
);
assertMatch(
  apiCatalog,
  /https:\/\/vermi\.cl\/schema\/post\.json/,
  "API catalog is missing the schema endpoint.",
);
assertMatch(
  schemaJson,
  /"@type":"BlogPosting"|\"@type\":\s*\"BlogPosting\"/,
  "Schema corpus endpoint should contain BlogPosting entries.",
);
assertMatch(
  markdownAlternate,
  /canonical:\s+"?https:\/\/vermi\.cl\/blog\/vermi-en-departamento\/"?/,
  "Markdown alternate should preserve article frontmatter.",
);

assertMatch(
  headers,
  /Content-Security-Policy:.*default-src 'self'/,
  "Cloudflare headers should retain a restrictive CSP baseline.",
);
assertMatch(
  headers,
  /No-Vary-Search:/,
  "Cloudflare headers should retain campaign-parameter normalization.",
);

for (const html of builtHtml) {
  assertNoMatch(
    html,
    /https?:\/\/localhost(?::\d+)?\//,
    "Build output must not contain a local development URL.",
  );
}

console.log("SEO and deployment build artifacts verified.");
