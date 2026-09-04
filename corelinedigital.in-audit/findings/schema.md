# Schema & Structured Data - corelinedigital.in

**Score: 62/100**

## Current implementation

One JSON-LD block per page containing a 2-entity graph, identical sitewide:

- `ProfessionalService` @ `#organization`
- `WebSite` @ `#website` (publisher → organization)

**Valid JSON, parses cleanly, no syntax errors.** `@id` values are stable and
correctly cross-referenced.

## What works

- Correct `@id` anchoring and `publisher` reference between entities
- Complete `PostalAddress` including `postalCode`
- `GeoCoordinates` present (19.1929, 72.9614)
- `areaServed` covering Thane, Thane West, Mumbai, Maharashtra
- `ContactPoint` with `availableLanguage` (English, Hindi, Marathi) - good local signal
- `hasOfferCatalog` with 5 typed `Service` offers
- `knowsAbout` array
- `inLanguage: en-IN`
- Referenced logo assets resolve (`/logo-mark.png` 200, `/logo-lockup.png` 200)

## Findings

### 1. No `sameAs` - HIGH

No social or third-party profile links anywhere in the schema or the page. This
is the primary mechanism by which Google reconciles a business into its
Knowledge Graph. Add Google Business Profile, LinkedIn, Instagram, and any
directory listings.

### 2. No `founder` / Person entity live - HIGH

The homepage devotes a section to Shailesh, but no `Person` entity exists in the
markup. `personJsonLd()` is written and wired in the working tree - unshipped.

### 3. No `openingHoursSpecification` - MEDIUM

`LocalBusiness` subtypes are eligible for hours display. The contact page
promises "same-day reply before 6pm" - encode that.

### 4. No `aggregateRating` or `review` - MEDIUM

No review markup because there are no reviews. Collecting Google reviews and
marking them up is the highest-value schema addition available, but it depends
on the reviews existing first.

### 5. Identical schema on all four pages - MEDIUM

Every page emits the same organization graph and nothing page-specific. Missing:
`WebPage` per URL, `ContactPage` on `/contact`, `FAQPage` on `/services`,
`BreadcrumbList`, and `ItemList` for the `/work` grid.

`faqJsonLd()` exists in the working tree and is already wired into the services
page - unshipped.

### 6. `priceRange: "$$"` is uninformative - LOW

A US-dollar band on an Indian INR business. The working tree replaces this with
a real `priceSpecification` (₹15,000–₹35,000). Ship that instead.
