# Performance - corelinedigital.in

**Score: 82/100** - the strongest category.

> **Measurement note:** the PageSpeed Insights API returned HTTP 429 (daily
> quota exhausted, no API key configured) and the Claude SEO runtime is not set
> up, so no CrUX field data or Lighthouse score was obtainable. Figures below
> are direct transfer measurements taken over the wire, not lab or field CWV
> scores. **LCP/INP/CLS were not measured.** Configure a PSI key or run
> Lighthouse locally to close this gap.

## Measured

| Metric                              | Value       |
| ----------------------------------- | ----------- |
| TTFB (edge cache HIT)               | **88 ms**   |
| HTML transfer (compressed)          | 15.7 KB     |
| HTML uncompressed                   | 87.9 KB     |
| JS (10 chunks, compressed)          | ~194 KB     |
| CSS (2 files)                       | 14.2 KB     |
| Fonts (4 × woff2, preloaded)        | ~90 KB      |
| **Total page weight, excl. photos** | **~310 KB** |
| `/work` imagery (10 × AVIF)         | 663 KB      |

## What works

- Statically prerendered, served from Vercel edge with cache HIT - 88 ms TTFB
  is excellent
- Brotli/gzip compression active
- Images served as **AVIF** with correct `srcset` and `sizes`
- Explicit `width`/`height` or `fill` on every image - CLS risk is low
- Fonts preloaded with `crossorigin`, immutable hashed asset URLs
- Below-fold images correctly `loading="lazy"`
- Above-fold logo preloaded via `imageSrcSet`

## Findings

### 1. Four font files across three families - MEDIUM

Space Grotesk, Inter, and IBM Plex Mono total ~90 KB, with 48 KB in a single
face. Preloading all four blocks early bandwidth. Subset to the Latin range and
consider dropping to two families.

### 2. 47 KB of RSC flight payload inline in the HTML - LOW

`self.__next_f.push(...)` accounts for 47 KB of the 88 KB uncompressed document

- more than half the HTML is hydration data rather than content. Normal for the
  App Router, but it is why a ~1,450-word site ships an 88 KB document.

### 3. All photography hotlinked from Unsplash - MEDIUM

Every photo proxies `images.unsplash.com` through Vercel's optimizer. This adds
a third-party dependency on the critical path for `/work` and means the site's
imagery can change or disappear outside your control.

### 4. `src` fallback resolves to the 3840px variant - LOW

Next.js sets the largest srcset entry as the `src` fallback. Browsers honouring
`sizes` pick correctly, so real-world impact is small - but any client that
ignores `srcset` pulls 663 KB of 4K imagery on `/work`.
