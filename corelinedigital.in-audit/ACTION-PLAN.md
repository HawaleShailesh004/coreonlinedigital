# Action Plan - corelinedigital.in

Ordered by impact per unit of effort. **Health score: 56/100.**

---

## Phase 0 - Ship what you already built (this week)

Highest leverage in the entire report. Production runs commit `738d638`
(31 Aug); the working tree holds 542 lines of uncommitted SEO fixes.

| #   | Action                                                                | Fixes                                                                              | Effort |
| --- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------ |
| 0.1 | Review, commit and deploy the SEO working tree                        | Titles, descriptions, OG image, Person + FAQ schema, pricing, `/about`, `/privacy` | 1–2 h  |
| 0.2 | Before shipping, confirm `/admin` and `/api` are `noindex` + Disallow | Prevents indexing the new admin dashboard                                          | 15 m   |
| 0.3 | Verify `/about` and `/privacy` return 200 and appear in `sitemap.xml` | Two 404s in the local sitemap                                                      | 10 m   |
| 0.4 | Re-submit sitemap in Search Console, request indexing on all pages    | Re-crawl with new titles                                                           | 15 m   |

> Ship deliberately - the tree also contains unaudited chat/admin/lead work.
> Do not `git add -A` blind.

---

## Phase 1 - Critical fixes (week 1)

| #   | Action                                                                                                                                        | Why                                                                                        | Effort  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------- |
| 1.1 | **Claim and complete Google Business Profile**                                                                                                | Largest single source of local traffic; prerequisite for map pack                          | 2 h     |
| 1.2 | Resolve the `/samples/` robots conflict - remove `Disallow: /samples/` and let `noindex` work, **or** drop the meta tag and keep the Disallow | The `noindex` is currently unenforceable; 13 internal links point into a blocked directory | 30 m    |
| 1.3 | Decide whether sample builds should be indexable at all                                                                                       | They are your only proof of capability and are invisible to Google and every AI crawler    | 1 h     |
| 1.4 | Add location + service keywords to body copy on `/` and `/services`                                                                           | "Thane" currently appears in live body text only in the footer                             | 2 h     |
| 1.5 | Start collecting Google reviews                                                                                                               | Dominant local ranking factor; you sell review automation and have none                    | ongoing |

---

## Phase 2 - High-impact improvements (weeks 2–3)

| #   | Action                                                                | Why                                                                                                    | Effort |
| --- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------ |
| 2.1 | Expand `/services` from 370 → 900+ words, one H3 per "Includes" item  | Critically thin for the primary money page                                                             | 4 h    |
| 2.2 | Add `sameAs` (GBP, LinkedIn, Instagram) to org schema + footer        | Primary Knowledge Graph reconciliation signal                                                          | 1 h    |
| 2.3 | Flesh out the About page - surname, photo, bio, experience, LinkedIn  | Single-operator agency: the operator is the trust signal                                               | 2 h    |
| 2.4 | Align homepage "Recent builds" heading with `/work`'s "sample builds" | The two pages currently tell different stories                                                         | 30 m   |
| 2.5 | Add security headers in `next.config.ts`                              | `nosniff`, `Referrer-Policy`, `frame-ancestors`, `Permissions-Policy`; add `includeSubDomains` to HSTS | 1 h    |
| 2.6 | Replace stock photos with screenshots of the real sample builds       | Stock interiors under "systems we've built" is a credibility risk                                      | 3 h    |
| 2.7 | Add `alt="Coreline Digital"` to the nav logo                          | Home link currently has no accessible name                                                             | 5 m    |

---

## Phase 3 - Content & authority (month 2)

| #   | Action                                                                                     | Why                                                               | Effort  |
| --- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------- |
| 3.1 | Build 3–5 genuine location/service pages (web design Thane, Thane West, Mumbai)            | Nothing currently targets geo-modified commercial queries         | 8 h     |
| 3.2 | Launch a blog; publish 2 posts/month                                                       | No informational content exists; nothing builds topical authority | ongoing |
| 3.3 | Write 3 real case studies with outcome numbers                                             | No named clients, testimonials, or results anywhere               | 6 h     |
| 3.4 | Add `openingHoursSpecification`, `BreadcrumbList`, per-page `WebPage`/`ContactPage` schema | Richer SERP display                                               | 2 h     |
| 3.5 | Build citations - JustDial, Sulekha, IndiaMART, LinkedIn - with identical NAP              | Citation consistency is a core local factor                       | 4 h     |
| 3.6 | Subset fonts; consider 3 families → 2                                                      | ~90 KB of preloaded fonts                                         | 2 h     |

---

## Phase 4 - Monitoring (ongoing)

| #   | Action                                                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------- |
| 4.1 | Configure a PageSpeed Insights API key - PSI returned 429 and **no CWV data could be captured in this audit** |
| 4.2 | Set up the Claude SEO runtime (`/seo setup`) to unlock CrUX, GSC, and backlink data                           |
| 4.3 | Confirm Search Console verification and monitor Pages → indexed count                                         |
| 4.4 | Track map-pack position for "web design Thane" once GBP is live                                               |
| 4.5 | Re-audit after Phase 0 + 1 - expect roughly 56 → 72                                                           |

---

## Not measured in this audit

Be aware of the gaps, all from missing credentials rather than site problems:

- **Core Web Vitals (LCP/INP/CLS)** - PSI API returned HTTP 429; no CrUX field data
- **Indexation status** - no Search Console access; actual indexed page count unknown
- **Backlink profile** - no Moz/Bing/DataForSEO credentials; referring domains unknown
- **Keyword rankings & search volume** - no rank-tracking data source available
- **Real-device mobile rendering** - Playwright MCP server failed to connect, so no
  screenshots were captured
