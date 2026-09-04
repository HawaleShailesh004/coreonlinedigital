# Images - corelinedigital.in

**Score: 58/100**

## Inventory

| Page        | `<img>` | Empty alt | Unsplash | Lazy |
| ----------- | ------- | --------- | -------- | ---- |
| `/`         | 5       | 2         | 3        | 3    |
| `/services` | 2       | 2         | 0        | 0    |
| `/work`     | 12      | 2         | 10       | 10   |
| `/contact`  | 2       | 2         | 0        | 0    |

## What works

- **AVIF** delivery via the Next.js optimizer
- Correct `srcset` + `sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"`
- Dimensions or `fill` on every image - no layout shift
- Below-fold images lazy-loaded
- Content photography carries genuinely descriptive alt text, e.g.
  _"Waiting area with timber panelling, plants and full-height windows"_

## Findings

### 1. No Open Graph / social share image - HIGH

Nothing to preview when a link is shared. `app/opengraph-image.tsx` in the
working tree generates a 1200×630 card and is unshipped. See `deploy-gap.md`.

### 2. All imagery is stock - MEDIUM

Every photograph on the site is Unsplash stock. On a page headed "Recent builds
/ A few systems we've built", stock interiors of clinics and showrooms are a
credibility risk. Screenshots of the actual sample builds would be both more
honest and more persuasive - and would carry keyword-relevant alt text.

### 3. Logo `alt=""` in nav and footer - LOW

The two empty-alt images on every page are the logo lockup. It is wrapped in the
home link, so screen readers announce a link with no accessible name. Set
`alt="Coreline Digital"` on the nav instance; the footer instance can stay
decorative.

### 4. `/favicon.ico` 404 - LOW

Covered in `technical.md`.
