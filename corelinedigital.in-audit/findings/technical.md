# Technical SEO - corelinedigital.in

**Score: 72/100**

## What works

- HTTPS enforced; HTTP → HTTPS 308 on both apex and www
- Canonical host consolidated on `https://www.corelinedigital.in` (apex 308s to www)
- `robots.txt` valid, declares `Host` and `Sitemap`
- `sitemap.xml` valid XML, correct `<loc>` values matching canonicals
- Self-referencing canonicals on all 4 live pages, all absolute and www-consistent
- `<html lang="en-IN">`, `<meta charSet="utf-8">`, correct viewport
- Custom 404 returns a true 404 status
- Trailing-slash normalisation (`/services/` → `/services`, 308)
- Prerendered HTML (`X-Nextjs-Prerender: 1`), Vercel edge cache HIT, TTFB ~88 ms
- No `noindex` leakage on indexable pages

## Findings

### 1. robots.txt Disallow makes the `noindex` on /samples/ unenforceable - CRITICAL

`robots.txt` contains `Disallow: /samples/`, but every sample page also serves
`<meta name="robots" content="noindex, nofollow, nocache">`.

Google cannot read a meta tag on a page it is forbidden to fetch. The result is
the classic conflict: the `noindex` never takes effect, and the URLs remain
eligible for indexing as URL-only entries if anything links to them.

Pick one mechanism:

- To keep them out of the index: remove `Disallow: /samples/` and let the
  `noindex` do the work.
- To keep crawlers off them entirely: keep the Disallow and drop the meta tag,
  accepting that URL-only indexing stays possible.

### 2. 13 internal links point into a crawler-blocked directory - HIGH

The homepage links to 3 sample pages and `/work` links to all 10. Of `/work`'s
12 outbound links, 10 lead into `/samples/`, which is Disallowed.

For a crawler, `/work` is a near dead-end: the page exists to prove capability,
and every proof link terminates at a blocked URL. Link equity flowing into
`/work` has almost nowhere to go.

### 3. Security headers largely absent - MEDIUM

Only `Strict-Transport-Security` is present. Missing:
`X-Content-Type-Options: nosniff`, `Referrer-Policy`,
`X-Frame-Options` (or CSP `frame-ancestors`), `Permissions-Policy`.
HSTS is also missing `includeSubDomains` and `preload`.

Not a ranking factor directly, but these are standard "best practices" audit
items and cheap to add in `next.config.ts`.

### 4. Two-hop redirect from apex over HTTP - LOW

`http://corelinedigital.in` → `https://corelinedigital.in` → `https://www.corelinedigital.in`.
Within tolerance, but a single hop to the final HTTPS+www target is cleaner.

### 5. `/favicon.ico` returns 404 - LOW

Icons are served via `/icon.svg` and `/apple-icon.png` (Next.js conventions),
which modern browsers honour. Some legacy crawlers and link-preview bots still
request `/favicon.ico` at the root.

### 6. Sitemap lists 4 URLs; local sitemap.ts declares 6 - HIGH (deploy gap)

`app/sitemap.ts` in the working tree already includes `/about` and `/privacy`.
Both return 404 in production. See `deploy-gap.md`.
