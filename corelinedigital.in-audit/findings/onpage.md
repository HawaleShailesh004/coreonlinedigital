# On-Page SEO - corelinedigital.in

**Score: 48/100**

## Title & description inventory (live)

| Page        | Title                                      | Len | Desc len |
| ----------- | ------------------------------------------ | --- | -------- |
| `/`         | Digital Infrastructure \| coreline.        | 34  | 125      |
| `/services` | Digital Storefronts & Systems \| coreline. | 41  | 124      |
| `/work`     | Sample Systems by Vertical \| coreline.    | 38  | 119      |
| `/contact`  | Book a Strategy Call \| coreline.          | 32  | 95       |

## Findings

### 1. No title contains a commercial or geographic keyword - CRITICAL

Not one title says _website_, _web design_, _Thane_, or _Mumbai_. Titles are
built from internal positioning vocabulary ("Digital Infrastructure", "Digital
Storefronts & Systems") that nobody searches for.

Fixed in the working tree - see `deploy-gap.md`.

### 2. Full brand name absent from every title - HIGH

Titles suffix with `coreline.` but the registered name is **Coreline Digital**.
Someone searching "Coreline Digital Thane" is matching against a string the
titles never contain. Use `| Coreline Digital` as the suffix.

### 3. `og:image` missing sitewide - HIGH

No `og:image` on any page, and `twitter:card` is `summary` rather than
`summary_large_image`. Every WhatsApp, LinkedIn, and Slack share of this site
renders as a bare text link.

This matters more here than usual: the code comments identify WhatsApp link
sharing as the primary distribution channel. `app/opengraph-image.tsx` exists
in the working tree and would fix it on deploy.

### 4. Missing Open Graph completeness - MEDIUM

`og:type`, `og:locale`, and `og:site_name` are all absent. Present in the
working tree.

### 5. Titles left of the pipe are under-length - MEDIUM

32–41 characters against a ~60-character budget. Roughly 20 characters of free
keyword real estate is being left unused on every page.

### 6. Two meta descriptions under-length - LOW

`/work` (119) and `/contact` (95) against a ~155 budget. `/contact` in
particular omits the phone number and the "same-day callback" hook.

### 7. Heading structure - LOW

One unique, descriptive H1 per page - correct. But `/services` uses 4 H2s and
**zero H3s** for its "Includes" feature lists, and `/contact` has no subheadings
at all. Flat structures are harder for passage-level extraction.

### 8. No BreadcrumbList - LOW

Flat 4-page site, so low impact, but breadcrumbs would earn richer SERP display
once `/about` and `/privacy` ship.
