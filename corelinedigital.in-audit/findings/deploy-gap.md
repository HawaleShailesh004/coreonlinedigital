# The Deploy Gap - the single highest-leverage finding

**The production site is running commit `738d638` (31 Aug 2026). The working
tree contains 542 lines of uncommitted SEO changes that fix most of what this
audit would otherwise recommend building from scratch.**

This reframes the whole audit. The majority of the on-page, schema, and
social-preview findings below are _already solved in code_ and simply not
deployed.

## Live vs. local

| Element                                  | Live now                                     | In working tree                                                                   |
| ---------------------------------------- | -------------------------------------------- | --------------------------------------------------------------------------------- |
| Homepage title                           | `Digital Infrastructure \| coreline.`        | `Websites for Thane Businesses`                                                   |
| Services title                           | `Digital Storefronts & Systems \| coreline.` | `Website Design in Thane`                                                         |
| Contact title                            | `Book a Strategy Call \| coreline.`          | `Talk to Me in Thane`                                                             |
| Work title                               | `Sample Systems by Vertical \| coreline.`    | `Sample Websites`                                                                 |
| Meta description                         | "bespoke web architecture… AI triage"        | "Websites for Thane and Mumbai businesses… From ₹15,000, live in 10 working days" |
| `og:image`                               | **absent**                                   | `app/opengraph-image.tsx`, 1200×630, generated                                    |
| `twitter:card`                           | `summary`                                    | `summary_large_image`                                                             |
| `og:type` / `og:locale` / `og:site_name` | absent                                       | `website` / `en_IN` / `Coreline Digital`                                          |
| Person schema (founder)                  | absent                                       | `personJsonLd()`, wired in `app/layout.tsx`                                       |
| FAQPage schema                           | absent                                       | `faqJsonLd()`, wired into services page                                           |
| Published pricing                        | absent                                       | `₹15,000` in content + `priceSpecification` in schema                             |
| `/about`                                 | 404                                          | `app/(site)/about/page.tsx`                                                       |
| `/privacy`                               | 404                                          | `app/(site)/privacy/page.tsx`                                                     |
| robots.txt disallow                      | `/samples/`, `/api/`                         | adds `/admin/`                                                                    |
| Keyword targeting                        | none                                         | 15-term `seoKeywords` list, geo + commercial intent                               |

## Why it matters most

The live titles are the problem. `Digital Infrastructure | coreline.` contains
no service word, no location, and not even the full brand name - it is not
competitive for any query a Thane business owner would type. The local version
(`Websites for Thane Businesses`) targets the actual market.

Likewise, every link shared on WhatsApp - stated in the code comments as the
primary distribution channel - currently previews with **no image at all**,
because `og:image` is absent in production. `app/opengraph-image.tsx` exists and
is not deployed.

## Recommended action

Review, commit, and deploy the working tree before doing anything else in this
report. Then re-run this audit against the new build - several findings in
`onpage.md`, `schema.md`, and `content.md` should close on deploy alone.

**Caveat:** the working tree also contains substantial unrelated in-flight work
(chat assistant, `/admin` dashboard, lead capture, `app/api/*`). Those are not
audited here and are not SEO-safe by default - in particular, confirm `/admin`
and `/api` are `noindex` + Disallow before shipping. Ship deliberately, not with
a blanket `git add -A`.
