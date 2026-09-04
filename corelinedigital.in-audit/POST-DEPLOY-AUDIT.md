# Post-Deploy Re-Audit — 2 September 2026

Requested as a pre-push audit; mid-task, `git fetch` confirmed the branch was
already on `origin/main`, and a direct check of `https://www.corelinedigital.in`
confirmed it was already live in production. This document reflects that
reality — everything below was checked against the live site, not a local
build or an unpushed branch.

**Health score: 86/100** (was 81 at the last remediation pass, 56 at first audit)

---

## The most important thing this pass found

**Two of your four previously-indexed pages, including `/services`, are
completely absent from Google's index.** Confirmed via Search Console's own
URL Inspection API, not inferred:

| URL | Status |
|---|---|
| `/` | Indexed, canonical matches |
| `/contact` | Indexed — cached canonical is stale (pre-www-fix crawl), should self-correct |
| `/services` | **"URL is unknown to Google"** |
| `/work` | **"URL is unknown to Google"** |

The sitemap on file in Search Console was last submitted 28 August with 4 URLs
— before every fix in this branch. GA4 confirms **zero organic sessions** in
the last 30 days, which is the direct consequence of this, not a ranking
problem. **Resubmit the now-11-URL sitemap and request indexing on
`/services` and `/work` directly — today, not as a backlog item.**

---

## What's new since the last remediation pass

The codebase grew substantially between passes — five new indexed vertical
landing pages, a documented copy-style guide, and full founder identity:

- `/clinic-website-thane`, `/jewellery-website-thane`, `/gym-website-thane`,
  `/coaching-class-website-thane`, `/real-estate-website-thane` — each with a
  unique title, description, H1, and `Service` + `FAQPage` + `BreadcrumbList`
  + `WebPage` schema. Body copy passes a genuine swap test (verified by
  reading two in full: "ladies batch" for the gym page, "Magicbricks already
  has the listings" for real estate — neither swaps to the other vertical).
- Real local photography (`/verticals/*.jpg`) replaces Unsplash hotlinks on
  all five — delivered as AVIF, 56–64 KB per hero.
- Founder identity closed: "Shailesh Hawale", job title, 521-word About page.
  This closes the E-E-A-T gap flagged as blocked in the last pass.
- Site word count: 2,867 → ~7,047 across 11 pages.
- `llms.txt` correctly regenerated to include the five new pages automatically
  (it's built from `lib/content.ts`, not hand-maintained).
- Footer now surfaces the `sameAs` links visibly, not just in schema.

---

## Verified this pass (against production)

- `tsc --noEmit`, `next build`, `eslint` all clean on the pushed commit
- All 21 unique internal link targets resolve to 200
- No duplicate `<title>` or meta description across any of the 11 live pages
- `robots.txt` correct: `/api/` and `/admin/` disallowed, `/samples/` open
- `sitemap.xml` live with all 11 URLs
- `sameAs` live with all three URLs (GBP, LinkedIn, Instagram), confirmed via
  the rendered JSON-LD on the production homepage
- Security headers, HSTS, favicon, `og:image`, `manifest.webmanifest` all 200
  on production

## New findings from this pass

| Finding | Severity | Detail |
|---|---|---|
| Sitemap not resubmitted since 28 Aug | High (action item) | See above — the reason organic traffic reads zero. |
| Mobile LCP regressed past the "good" threshold | Medium | Measured twice this session: 95/2.6s early, then 88/3.3s against the confirmed-current build. Desktop stayed 100/100/100/100 throughout. PageSpeed's diagnosis: render-blocking requests now cost ~1,000ms (was ~560ms). Likely contributors: the chat widget's script, added fonts/components from this session's growth. |
| Four meta descriptions exceed ~155 chars | Low | `/services` 157, `/coaching-class-website-thane` 161, `/real-estate-website-thane` 164, `/jewellery-website-thane` 171 — the last risks truncating "From ₹15,000" in the snippet. |
| `/work` and one homepage card still hotlink Unsplash | Medium (downgraded) | The five vertical pages got real photography; ten `/work` sample cards and one homepage feature card did not. |

## A methodology note worth flagging

PageSpeed Insights was run twice in this session with materially different
results (95→88 mobile performance, 2.6s→3.3s LCP) because the site was
mid-deploy during the first reading. The numbers in the published report are
from the second run, confirmed against the settled production build — but it's
a reminder that a live-site measurement taken during or shortly after a deploy
should be treated as provisional until re-confirmed.

---

## Bottom line

Nothing found in this pass indicates a defect in what shipped. The code is
clean, live, and verified. The two things that matter now are both actions,
not fixes: resubmit the sitemap today, and keep an eye on the mobile LCP
regression before the site grows further on top of it.
