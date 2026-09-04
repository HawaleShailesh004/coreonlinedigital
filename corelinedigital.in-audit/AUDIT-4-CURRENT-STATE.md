# Full SEO Re-Audit — 4 September 2026

Fresh, complete audit of **the live production site**, `https://www.corelinedigital.in`,
which is confirmed to reflect `origin/main` at commit `04fdb98`
("Drop the price from SERP titles and ship a square search icon").

**Health score: 88/100** (was 86 two days ago, 81 before that, 56 at first audit)

> **Scope note:** the local repository also has a large, unpushed, uncommitted
> "full rebuild" in progress on branch `redesign/full-rebuild` — new `/v2`,
> `/demos`, `/industries` directories, deleted vertical-page files, and more.
> None of it is live or committed, so it is **not** covered by this audit. This
> report describes what Google and your visitors actually see today.

---

## Scores

| Category | Weight | Score | Was |
|---|---|---|---|
| Technical SEO | 22% | 95 | 95 |
| Content Quality | 23% | 78 | 78 |
| On-Page SEO | 20% | **95** | 88 |
| Schema | 10% | 92 | 90 |
| Performance | 10% | 85 | 83 |
| AI Search Readiness | 10% | **85** | 82 |
| Images | 5% | 80 | 80 |

---

## What changed since the last audit (2 days ago)

### Fixed
- **All four over-length meta descriptions are now within budget.** `/services`
  157→143, `/jewellery-website-thane` 171→151, `/coaching-class-website-thane`
  161→147, `/real-estate-website-thane` 164→150. Every description on the site
  is now under 155 characters.
- **Price removed from SERP titles.** Commit `04fdb98` explicitly did this —
  "Google was showing From ₹15000 in the snippet and a generic globe; keep the
  floor on the page, not in metadata." The floor still lives in the copy and
  in schema's `priceSpecification`, just not duplicated into every title.
- **Search icon fixed.** A new 192×192 opaque PNG (`icon-192.png`) now backs
  `manifest.webmanifest` and the icon `<link>` set, alongside the SVG and
  `favicon.ico` — addresses the generic-globe-in-search-results problem
  directly.
- **Sitemap resubmitted.** Search Console shows `last_submitted:
  2026-09-02T15:58:30Z` with all 11 URLs, up from the stale 28-August, 4-URL
  submission.

### Indexation — the headline number
**9 of 11 pages are now indexed** (verified via Search Console URL Inspection,
not inferred), up from 2 of 4 last pass:

| URL | Status |
|---|---|
| `/` | Indexed |
| `/work` | **Indexed** (was "unknown to Google") — Rich Results: Breadcrumbs detected |
| `/about` | **Indexed** — Rich Results: Breadcrumbs detected |
| `/contact` | Indexed — canonical still stale (see below) |
| `/clinic-website-thane` | **Indexed** — Rich Results: Breadcrumbs detected |
| `/jewellery-website-thane` | **Indexed** |
| `/gym-website-thane` | **Indexed** |
| `/coaching-class-website-thane` | **Indexed** |
| `/real-estate-website-thane` | **Indexed** |
| `/services` | "Discovered — currently not indexed" (was "unknown to Google") |
| `/privacy` | "Discovered — currently not indexed" |

`/services` and `/privacy` have progressed from invisible to "discovered" —
Google knows they exist via the sitemap but hasn't crawled and indexed them
yet. Nothing in the code explains the delay: both correctly serve
`index, follow` and a matching self-canonical. This is a normal queue state
for a low-authority site days after resubmission, not a defect. `/services`
being the primary money page makes it worth a manual "Request Indexing" in
the Search Console UI rather than waiting out the crawl queue.

### Partially improved, still open
**Mobile performance regression (flagged last pass) improved but did not
resolve.** Measured against the current live build:

| Metric | 2 days ago | Now |
|---|---|---|
| Mobile Performance | 88 | 92 |
| Mobile LCP | 3.3s | 3.1s |
| Mobile Speed Index | 4.9s | 3.5s |
| Desktop (all 4 categories) | 100 | 100 |

Trending the right direction, but LCP is still past the 2.5s "good" threshold.
PageSpeed's diagnosis: render-blocking requests still cost an estimated
1,010ms (basically unchanged from 1,000ms). A **new** failed audit appeared
this pass — "Forced reflow" — worth a look, as it indicates some script is
causing synchronous layout recalculation.

### Unchanged
- `/contact`'s cached canonical in Search Console is still the bare apex
  (`corelinedigital.in`, no www) from an `28-August` crawl, predating the
  www-canonicalization fix. Google hasn't recrawled this specific page since.
  Will self-correct on next crawl; not urgent.
- The two-hop HTTP→HTTPS→www apex redirect is unchanged (Vercel domain
  config, not application code).
- `/work`'s ten sample cards and one homepage feature section still hotlink
  Unsplash. The five vertical pages' own hero/detail imagery is real local
  photography, confirmed again this pass.
- GA4 organic sessions: still zero over the last 7 days — expected, since the
  reindexing that would drive this only started 2 days ago.

---

## Full verification performed this pass

- `robots.txt`, `sitemap.xml` (11 URLs), all icon assets (`icon.svg`,
  `favicon.ico`, `icon-192.png`, `apple-icon.png`), `manifest.webmanifest` —
  all 200, all correctly cross-referenced
- All 11 pages: unique titles, unique descriptions, all within length budget,
  one H1 each, healthy H2/H3 structure
- Word count sitewide: ~7,047 (unchanged from last pass — no new content
  added, only metadata/title tuning)
- Schema on homepage: `ProfessionalService` with correct `sameAs` (GBP,
  LinkedIn, Instagram) and `Person` with full name and job title — all
  confirmed live and correct
- Security headers (HSTS, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy, Permissions-Policy) all present
- `/samples/` still correctly `noindex, follow` with `/api/` and `/admin/`
  disallowed in robots.txt
- PageSpeed Insights (mobile + desktop) and Chrome UX Report (still no field
  data — traffic too low for eligibility) pulled fresh against the live site
- Search Console: sitemap status, URL Inspection on all 11 URLs
- GA4: organic sessions, last 7 days

---

## Recommended next actions, in order

1. **Manually request indexing on `/services`** via the Search Console UI —
   it's the primary money page and shouldn't wait out a passive crawl queue.
2. **Investigate the "Forced reflow" and render-blocking findings** on
   mobile — LCP is close to the "good" line but hasn't crossed back.
3. Let `/contact`'s canonical self-correct on the next natural crawl, or force
   it with a manual re-inspect request if it's still stale in a week.
4. Everything else from the prior pass stands: build the content engine
   (blog/case studies), replace the remaining Unsplash stock on `/work`, and
   the off-site work (GBP completeness, reviews, citations) that no code
   change substitutes for.

---

## Two things outside this audit's scope, worth flagging separately

1. **The `C:` drive on this machine is completely full** (0 GB free of
   342.6 GB) — discovered mid-session when a routine temp-file write failed.
   This is unrelated to the website but is a real, urgent system issue: full
   system drives cause failed builds, IDE instability, and worse. Worth
   clearing space soon.
2. **A large, unpushed, uncommitted rebuild exists locally** on
   `redesign/full-rebuild` — new page structures, deleted files, hundreds of
   changes. It is not part of this audit because it isn't live. Worth a
   deliberate review before it's committed, the same way the last SEO
   remediation was reviewed rather than blind-committed.
