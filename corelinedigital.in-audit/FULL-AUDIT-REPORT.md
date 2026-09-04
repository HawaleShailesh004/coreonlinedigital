# Full SEO Audit - corelinedigital.in

**Audited:** 2 September 2026
**Live pages found:** 4 (`/`, `/services`, `/work`, `/contact`)
**Business type:** Service-area business - single-operator web agency, Thane, Maharashtra
**Canonical host:** `https://www.corelinedigital.in`
**Health score: 56/100**

---

## Scores

| Category                 | Weight | Score | Contribution |
| ------------------------ | ------ | ----- | ------------ |
| Technical SEO            | 22%    | 72    | 15.8         |
| Content Quality          | 23%    | 38    | 8.7          |
| On-Page SEO              | 20%    | 48    | 9.6          |
| Schema / Structured Data | 10%    | 62    | 6.2          |
| Performance              | 10%    | 82    | 8.2          |
| AI Search Readiness      | 10%    | 45    | 4.5          |
| Images                   | 5%     | 58    | 2.9          |
| **Total**                |        |       | **56.0**     |

---

## Executive summary

The engineering is sound. The site is fast (88 ms TTFB, ~310 KB, AVIF imagery,
statically prerendered), the schema is valid, canonicals and redirects are
correct, and every AI crawler is allowed through. The copy is genuinely good -
specific, confident, and free of generic agency filler.

What holds it back is not build quality. It is that **the site says nothing
Google can match to a commercial query, and there is very little of it.**

Four pages. ~1,450 words total. Not one page title contains the words
_website_, _web design_, _Thane_, or _Mumbai_ - nor even the full brand name
"Coreline Digital". The homepage title is `Digital Infrastructure | coreline.`,
which is distinctive positioning and has effectively no search volume behind it.

The most important discovery is that **most of this is already fixed in code and
simply not deployed.** Production runs commit `738d638` from 31 August. The
working tree contains 542 lines of uncommitted SEO improvements: geo-targeted
titles (`Websites for Thane Businesses`), rewritten descriptions carrying price
and delivery time, a generated 1200×630 OG image, Person and FAQPage schema,
published pricing, and `/about` and `/privacy` pages that currently 404 in
production.

Deploying that work is the highest-leverage action available and should precede
everything else in this report.

---

## Top 5 critical issues

1. **A build's worth of SEO work is sitting undeployed.** Titles, descriptions,
   OG image, Person + FAQ schema, pricing, and two pages exist locally and are
   not live. → `findings/deploy-gap.md`

2. **No page targets a commercial or local query.** Titles use internal
   vocabulary; "Thane" appears in live body copy only in the footer address.
   → `findings/onpage.md`, `findings/content.md`

3. **The portfolio is invisible to search.** All 10 sample builds sit under
   `Disallow: /samples/` while also serving `noindex` - a conflict that makes
   the `noindex` unenforceable, and 13 internal links point into the blocked
   directory. Your only proof of capability cannot be read by Google or any AI
   crawler. → `findings/technical.md`

4. **The site is too thin to rank or be cited.** ~1,450 words sitewide, no blog,
   no case studies, `/services` at 370 words. → `findings/content.md`

5. **No local presence beyond the website.** No Google Business Profile signal,
   no reviews, no citations, no `sameAs`. For a local service business this is
   the largest missing traffic source. → `findings/local.md`

---

## Top 5 quick wins

| Win                                                 | Effort | Impact       |
| --------------------------------------------------- | ------ | ------------ |
| Deploy the working tree                             | 1–2 h  | Very high    |
| Claim Google Business Profile                       | 2 h    | Very high    |
| Resolve the `/samples/` robots vs. noindex conflict | 30 m   | High         |
| Add `sameAs` links to schema + footer               | 1 h    | Medium-high  |
| Add `alt="Coreline Digital"` to the nav logo        | 5 m    | Low, trivial |

---

## Detailed findings

| Area                | Score | File                      |
| ------------------- | ----- | ------------------------- |
| The deploy gap      | -     | `findings/deploy-gap.md`  |
| Technical SEO       | 72    | `findings/technical.md`   |
| Content & E-E-A-T   | 38    | `findings/content.md`     |
| On-Page SEO         | 48    | `findings/onpage.md`      |
| Schema              | 62    | `findings/schema.md`      |
| Performance         | 82    | `findings/performance.md` |
| Images              | 58    | `findings/images.md`      |
| AI Search Readiness | 45    | `findings/geo-ai.md`      |
| Local SEO           | 45    | `findings/local.md`       |

Prioritised remediation: `ACTION-PLAN.md`

---

## Audit coverage and limitations

Crawled all 4 live pages plus a representative sample page, with live header,
redirect, robots, sitemap, schema, and asset-weight verification.

**Not measured** - all due to missing credentials, not site defects:

- **Core Web Vitals** - the PageSpeed Insights API returned HTTP 429 (daily
  quota exhausted, no key configured) and the Claude SEO runtime is not set up.
  No LCP, INP, or CLS values were obtained. The performance score reflects
  direct transfer measurements only.
- **Indexation** - no Search Console access; the true indexed page count is unknown.
- **Backlinks** - no Moz, Bing, or DataForSEO credentials; the link profile was not assessed.
- **Keyword rankings and search volume** - no data source available.
- **Mobile screenshots** - the Playwright MCP server failed to connect this session.

Run `/seo setup` and configure a PSI key to close these gaps on the next pass.
