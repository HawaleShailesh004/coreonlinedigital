# Remediation Log - 2 September 2026

Executed against the audit. Branch: **`seo/audit-fixes`** (5 commits, not pushed).

**Health score: 56 → 81** (projected; re-measure after deploy)

| Category            | Before | After |
| ------------------- | ------ | ----- |
| Technical SEO       | 72     | 92    |
| Content Quality     | 38     | 62    |
| On-Page SEO         | 48     | 88    |
| Schema              | 62     | 90    |
| Performance         | 82     | 85    |
| AI Search Readiness | 45     | 76    |
| Images              | 58     | 72    |

---

## Fixed and verified

### Technical

- **`/samples/` crawl conflict resolved.** Removed `Disallow: /samples/` so the
  `noindex` on those pages is actually readable. `/api/` and `/admin/` stay blocked.
- **`follow: false` → `follow: true`** on samples, so /work's ten links no longer
  dead-end. Still `noindex` - the businesses are fictional.
- **Removed the samples' `canonical: /work`** - it claimed they were duplicates
  of a page they aren't, and contradicted the `noindex`.
- **Removed the site-wide `canonical: "/"`** in `app/layout.tsx`. Metadata
  inherits, so it was silently labelling every non-overriding page a homepage
  duplicate - which is what the sample pages were doing.
- **HSTS** gains `includeSubDomains; preload`.
- **`deviceSizes` capped at 2048** (was defaulting to 3840 in the no-srcset `src`).
- **`favicon.ico` added** - was 404.

### On-page

- **Title suffix is now `| Coreline Digital`**, not `| coreline.`. The wordmark
  is unchanged everywhere it is drawn.
- Verified live titles now read: `Websites for Thane Businesses`,
  `Website Design in Thane`, `Talk to Me in Thane`, `Sample Websites`.
- `og:image` (1200×630 generated), `summary_large_image`, `og:type`,
  `og:locale`, `og:site_name` all present.
- Contact page gained two heading landmarks (had an h1 and nothing else).

### Schema

- `Person` (founder), `FAQPage`, `BreadcrumbList` on every subpage, and per-page
  `WebPage` / `ContactPage` / `AboutPage` / `CollectionPage`.
- `openingHoursSpecification` - Mon–Sat 09:00–18:00, per your answer.
- `priceSpecification` in INR replaces `priceRange: "$$"`.
- **`sameAs` now populated** - Google Business Profile, LinkedIn, and Instagram,
  all verified to resolve (200) before committing. This also confirms the GBP
  listing referenced already exists; whether it's fully optimized (categories,
  photos, hours matching the site) wasn't checked and stays worth a manual pass.
- **`llms.txt` added** as a Route Handler generated from `lib/content.ts`, so it
  can't drift from the price or the pages it lists. Not a ranking or citation
  lever for any AI product with evidence behind it, and Google ignores it -
  shipped because it cost nothing.

### Content

| Page        | Before    | After     |
| ----------- | --------- | --------- |
| `/`         | 554       | 739       |
| `/services` | 370       | **1,079** |
| `/work`     | 425       | 485       |
| `/contact`  | 97        | 145       |
| `/about`    | 404       | 226       |
| `/privacy`  | 404       | 193       |
| **Total**   | **1,446** | **2,867** |

- Five new FAQs (10 total, all in `FAQPage` schema) targeting what people search
  before they search a company name: hosting/domains, redesigns, service area,
  "will I show up on Google", and what you need to start.
- `/about` and `/privacy` now exist (both were 404 while listed in sitemap.ts).

---

## Retracted finding

**The nav logo alt is not a defect.** The audit flagged `alt=""` as leaving the
home link with no accessible name. It doesn't - the wrapping `<Link>` already
carries `aria-label="Coreline Digital - home"`, which is the correct decorative
pattern. No change made.

---

## Blocked on information only you have

1. **Founder E-E-A-T** - surname, photo, LinkedIn (personal), years of
   experience. The about page is live but thin, and for a single-operator
   agency the operator is the trust signal. `sameAs` now links the _company_
   LinkedIn; a personal profile for Shailesh, if he wants one public, is separate.

## Not code - still yours to do

- Confirm the Google Business Profile is complete: correct category, hours
  matching the site's Mon–Sat 09:00–18:00, photos, and a request for reviews
  (its listing exists and is now linked - completeness wasn't checked)
- Collect Google reviews
- Build citations (JustDial, Sulekha, IndiaMART) with identical NAP
- Submit the sitemap in Search Console and request indexing

## Still open in code (lower priority)

- No blog or case studies - the largest remaining content gap
- All photography is Unsplash stock, including under "sample sites"
- Font loading already uses `next/font/google` with Latin-only subsets and
  minimal weights per family (2–3 each); the three families are a design
  choice - Space Grotesk, Inter and IBM Plex Mono are each used across the
  site (Plex Mono in 21 files) - so dropping one wasn't done without asking.
- Two-hop redirect on `http://` apex - Vercel domain config, not code
- Core Web Vitals still unmeasured (no PSI key; PSI returned 429)
