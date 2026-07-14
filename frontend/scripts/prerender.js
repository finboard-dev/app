/* eslint-disable no-console */
/**
 * Prerender every route of the built SPA to static HTML.
 *
 * Runs automatically after `yarn build` (see the `postbuild` script).
 * Serves the `build/` folder, opens each route in headless Chrome
 * (system install via puppeteer-core), waits for React + react-helmet-async
 * to render, then writes the resulting HTML to build/<route>/index.html.
 *
 * The client entry (src/index.js) hydrates when the root already has
 * markup, so the prerendered pages stay fully interactive.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");
const puppeteer = require("puppeteer-core");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PORT = 45111;
const DEBUG_PORT = 9333;

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const ROUTES = [
  "/",
  "/operators",
  "/advisory",
  "/engagement",
  "/pricing",
  "/manifesto",
  "/testimonials",
  "/products/month-end-close",
  "/products/consolidation",
  "/products/analytics",
  "/products/fpa",
  "/products/p2p",
  "/products/o2c",
  "/industries/restaurants",
  "/industries/construction",
  "/industries/retail",
  "/industries/ecommerce",
  "/industries/healthcare",
  "/industries/software-and-services",
];

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".map": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function findChrome() {
  const found = CHROME_PATHS.find((p) => fs.existsSync(p));
  if (!found) {
    console.error("prerender: no Chrome binary found. Set CHROME_PATH.");
    process.exit(1);
  }
  return found;
}

function startServer() {
  // Snapshot the pristine CRA shell BEFORE any route is prerendered.
  // Every route must be rendered from this shell - if we fell back to
  // build/index.html, the prerendered homepage (with its baked helmet tags)
  // would leak into every other page. 200.html also doubles as the SPA
  // fallback for unknown routes on static hosts.
  const shellPath = path.join(BUILD_DIR, "200.html");
  // A fresh `craco build` wipes build/, so no 200.html means index.html is the
  // pristine shell. If 200.html already exists we are re-running prerender and
  // index.html has been overwritten - keep the existing snapshot.
  if (!fs.existsSync(shellPath)) {
    fs.copyFileSync(path.join(BUILD_DIR, "index.html"), shellPath);
  }

  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(BUILD_DIR, urlPath);
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = shellPath; // SPA fallback: always the pristine shell
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

// Spawn Chrome directly and connect over CDP - more reliable than
// puppeteer's launcher against a system Chrome install.
async function startChrome() {
  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "prerender-chrome-"));
  const child = spawn(
    findChrome(),
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profileDir}`,
      `--remote-debugging-port=${DEBUG_PORT}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );
  // Wait for the DevTools endpoint to come up.
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (res.ok) return { child, profileDir };
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  child.kill("SIGKILL");
  throw new Error("Chrome did not expose its DevTools endpoint in time");
}

(async () => {
  const server = await startServer();
  const chrome = await startChrome();
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${DEBUG_PORT}`,
    defaultViewport: { width: 1440, height: 900 },
  });

  try {
    const page = await browser.newPage();

    // Keep prerendering fast + deterministic: no third-party calls, no media.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = new URL(req.url());
      if (url.hostname !== "localhost" || req.resourceType() === "media") return req.abort();
      return req.continue();
    });

    for (const route of ROUTES) {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 60000 });
      await page.waitForSelector("#root > *", { timeout: 30000 });
      // Let helmet flush + fonts/layout settle.
      await new Promise((r) => setTimeout(r, 250));

      let html = await page.content();
      if (!/^<!doctype html>/i.test(html.trimStart())) html = "<!DOCTYPE html>\n" + html;

      // Keep only the first <title> (helmet's per-page one); drop the static
      // shell title that remains in the DOM behind it.
      const firstTitleEnd = html.indexOf("</title>");
      if (firstTitleEnd !== -1) {
        const head = html.slice(0, firstTitleEnd + "</title>".length);
        const rest = html.slice(firstTitleEnd + "</title>".length).replace(/<title[^>]*>[\s\S]*?<\/title>/g, "");
        html = head + rest;
      }

      const outDir = route === "/" ? BUILD_DIR : path.join(BUILD_DIR, route.slice(1));
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html);
      console.log(`✓ prerendered ${route}`);
    }

    console.log(`Done - ${ROUTES.length} routes prerendered.`);
  } finally {
    browser.disconnect();
    chrome.child.kill("SIGKILL");
    // Give Chrome a beat to release the temp profile; cleanup is best-effort.
    await new Promise((r) => setTimeout(r, 500));
    try {
      fs.rmSync(chrome.profileDir, { recursive: true, force: true });
    } catch {
      /* leftover temp dir is harmless */
    }
    server.close();
  }
})().catch((err) => {
  console.error("prerender failed:", err);
  process.exit(1);
});
