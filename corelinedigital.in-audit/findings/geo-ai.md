# AI Search Readiness (GEO) - corelinedigital.in

**Score: 45/100**

## Crawler access - verified live

| Agent           | Status |
| --------------- | ------ |
| Googlebot       | 200    |
| bingbot         | 200    |
| GPTBot          | 200    |
| OAI-SearchBot   | 200    |
| ClaudeBot       | 200    |
| PerplexityBot   | 200    |
| Google-Extended | 200    |

No AI crawler is blocked, and `robots.txt` contains no user-agent-specific
rules. Nothing to fix here.

## What works

- Content is server-rendered - AI crawlers that do not execute JavaScript still
  see the full text
- Clean semantic HTML with a proper heading hierarchy
- Organization schema gives LLMs a structured entity to anchor to
- Distinctive, quotable phrasing - "A missed call at 9pm is a lost customer by
  9:05" is exactly the kind of line that gets lifted into a generated answer

## Findings

### 1. Not enough content to cite - CRITICAL

AI answer engines cite passages. With ~1,450 words sitewide and no
question-shaped content, there is almost nothing to extract. This is the
binding constraint on AI visibility.

### 2. No FAQ or Q&A content live - HIGH

Question-and-answer blocks are the highest-yield GEO format. Five FAQs and
`faqJsonLd()` exist in the working tree, unshipped.

### 3. No author or expertise entity - HIGH

No `Person` schema, no author byline, no bio, no `sameAs`. LLMs weight
identifiable expertise heavily when deciding what to cite. `personJsonLd()` is
written and unshipped.

### 4. Portfolio invisible to AI crawlers - HIGH

All 10 sample builds sit under the `Disallow: /samples/` path. The most
substantive content on the site - the actual demonstrations - cannot be read by
any AI crawler. See `technical.md` finding 1.

### 5. No citable facts, figures, or definitions - MEDIUM

No statistics, no pricing (live), no timelines, no comparison tables. The one
comparison ("Template vs System") is two short lines. Concrete numbers -
₹15,000, 10 working days - exist in the working tree and are far more citable
than adjectives.

### 6. No `llms.txt` - LOW

`/llms.txt` returns 404. Optional and ignored by Google; some AI tools consume
it. Trivial to add, low expected return.

### 7. No off-site brand corroboration - MEDIUM

LLMs weight third-party mentions. There are no reviews, directory listings, or
social profiles to corroborate that this business exists. Google Business
Profile is the highest-value first step.
