#!/usr/bin/env node
/**
 * Capture desktop + mobile screenshots of a sample site and composite them
 * into a GBP-ready device mockup (laptop + phone, one image).
 *
 *   node scripts/generate-mockup.mjs gym          # one sample
 *   node scripts/generate-mockup.mjs --all        # all ten
 *   node scripts/generate-mockup.mjs gym --base http://localhost:3000
 *
 * Requires: Google Chrome, dev server running.
 * Output:   marketing/mockups/<slug>-mockup.png
 */
import { execSync, spawnSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { allSlugs, mockupSamples } from "./mockup-samples.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "marketing", "mockups");
const TMP_DIR = join(ROOT, ".tmp-img", "mockups");
const TEMPLATE = join(__dirname, "mockup-template.html");

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
];

const DESKTOP = { w: 1280, h: 800 };
const MOBILE = { w: 390, h: 844 };
const MOCKUP = { w: 1200, h: 900 };

function findChrome() {
  for (const p of CHROME_CANDIDATES) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    "Google Chrome not found. Install Chrome or set CHROME_PATH.",
  );
}

function parseArgs(argv) {
  const args = { slugs: [], base: "http://localhost:3000", all: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--all") args.all = true;
    else if (a === "--base" && argv[i + 1])
      args.base = argv[++i].replace(/\/$/, "");
    else if (!a.startsWith("-")) args.slugs.push(a);
  }
  if (args.all) args.slugs = allSlugs;
  if (args.slugs.length === 0) {
    console.error(
      "Usage: node scripts/generate-mockup.mjs <slug>|--all [--base URL]",
    );
    process.exit(1);
  }
  return args;
}

/** Headless Chrome viewport screenshot. */
function capture(url, outPath, width, height, chrome) {
  const profile = join(
    TMP_DIR,
    `_chrome-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  mkdirSync(profile, { recursive: true });
  rmSync(outPath, { force: true });

  const winOut =
    process.platform === "win32" ? outPath.replace(/\//g, "\\") : outPath;

  const result = spawnSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=2",
      `--user-data-dir=${profile}`,
      "--virtual-time-budget=15000",
      `--window-size=${width},${height}`,
      `--screenshot=${winOut}`,
      url,
    ],
    { stdio: "pipe", encoding: "utf8" },
  );

  rmSync(profile, { recursive: true, force: true });

  if (!existsSync(outPath)) {
    const err =
      result.stderr?.trim() || result.stdout?.trim() || "unknown error";
    throw new Error(`Screenshot failed for ${url}: ${err}`);
  }
}

function toFileUrl(p) {
  return "file:///" + resolve(p).replace(/\\/g, "/");
}

function buildComposeHtml(slug, desktopPath, mobilePath, meta) {
  let html = readFileSync(TEMPLATE, "utf8");
  const [bg, accent, highlight] = meta.swatches;
  const dark = meta.dark;

  const bgGrad = dark
    ? `linear-gradient(145deg, ${bg} 0%, #0c1210 55%, ${accent}22 100%)`
    : `linear-gradient(145deg, ${bg} 0%, #e8ebe6 60%, ${accent}18 100%)`;
  const accentGlow = dark ? `${accent}55` : `${accent}33`;
  const textColor = dark ? "#f6f7f5" : "#0c1210";

  html = html.replace(
    "<body>",
    `<body style="--bg-gradient:${bgGrad};--accent-glow:${accentGlow};color:${textColor}">`,
  );

  const desktopUrl = toFileUrl(desktopPath);
  const mobileUrl = toFileUrl(mobilePath);

  html = html
    .replace('id="desktop-img"', `id="desktop-img" src="${desktopUrl}"`)
    .replace('id="mobile-img"', `id="mobile-img" src="${mobileUrl}"`)
    .replace('id="industry"', `id="industry">${meta.industry}`)
    .replace('id="business"', `id="business">${meta.business} · ${meta.city}`);

  if (!dark) {
    html = html.replace('class="footer-bar"', 'class="footer-bar light"');
  }

  const composePath = join(TMP_DIR, `${slug}-compose.html`);
  writeFileSync(composePath, html);
  return composePath;
}

function generateMockup(slug, base, chrome) {
  const meta = mockupSamples[slug];
  if (!meta) throw new Error(`Unknown slug: ${slug}`);

  const url = `${base}/samples/${slug}`;
  const desktopPath = join(TMP_DIR, `${slug}-desktop.png`);
  const mobilePath = join(TMP_DIR, `${slug}-mobile.png`);
  const outPath = join(OUT_DIR, `${slug}-mockup.png`);

  console.log(`\n[${slug}] Capturing desktop (${DESKTOP.w}×${DESKTOP.h})…`);
  capture(url, desktopPath, DESKTOP.w, DESKTOP.h, chrome);

  console.log(`[${slug}] Capturing mobile (${MOBILE.w}×${MOBILE.h})…`);
  capture(url, mobilePath, MOBILE.w, MOBILE.h, chrome);

  console.log(`[${slug}] Compositing mockup…`);
  const composeHtml = buildComposeHtml(slug, desktopPath, mobilePath, meta);
  capture(toFileUrl(composeHtml), outPath, MOCKUP.w, MOCKUP.h, chrome);

  const kb = Math.round(readFileSync(outPath).length / 1024);
  console.log(`[${slug}] ✓ ${outPath} (${MOCKUP.w}×${MOCKUP.h}, ${kb} KB)`);
  return outPath;
}

function main() {
  const { slugs, base } = parseArgs(process.argv);
  const chrome = process.env.CHROME_PATH || findChrome();

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  // Quick health check
  try {
    execSync(
      `curl -s -o /dev/null -w "%{http_code}" "${base}/samples/${slugs[0]}"`,
      {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      },
    );
  } catch {
    console.warn(
      `Warning: could not reach ${base} - make sure the dev server is running.`,
    );
  }

  console.log(`Chrome: ${chrome}`);
  console.log(`Base URL: ${base}`);
  console.log(`Output: ${OUT_DIR}`);

  const results = [];
  for (const slug of slugs) {
    try {
      results.push(generateMockup(slug, base, chrome));
    } catch (err) {
      console.error(`[${slug}] FAILED: ${err.message}`);
      process.exitCode = 1;
    }
  }

  if (results.length === 1) {
    console.log(`\nPreview: ${results[0]}`);
  } else {
    console.log(`\nDone: ${results.length} mockups in ${OUT_DIR}`);
  }
}

main();
