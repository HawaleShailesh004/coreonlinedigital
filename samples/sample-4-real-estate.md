# Sample Build 4 - Real Estate Agent / Broker

Vertical: Independent real estate agent, small brokerage, or property consultant
Purpose: Portfolio sample for Coreline's Work page + cold-call demo asset for real estate leads.

---

## 1. Positioning

This site sells aspiration and access - a buyer is imagining a life in a space before they're evaluating square footage. But real estate buyers in this market are also cautious about fraud and misrepresentation, so the design has to feel aspirational AND credible at once, not one at the expense of the other.

---

## 2. Copy

### Nav

Logo/agent name · Listings · Areas We Serve · Contact
CTA button: **Enquire About a Property**

### Hero

**Eyebrow:** [City] Real Estate

**Headline:** Find the property that actually fits how you live.

**Sub:** [Agent/Agency Name] helps you buy, sell, or rent across [neighborhoods/city] - with verified listings, honest pricing, and someone who actually answers the phone.

**CTAs:** Browse Listings · Talk to an Agent

### Featured Listings (grid, 3–6 properties)

Each card: property photo, price range, location, 2–3 key specs (BHK, sq. ft., type), "Enquire" button. Real numbers where possible, ranges if not - never hide pricing entirely here, unlike the jeweller sample; real estate buyers expect and need it upfront.

### Areas We Serve

Short list/map of neighborhoods or localities covered - builds local credibility fast for a cautious buyer checking if this agent actually knows their area.

### Why Work With Us

3-point strip:

- Verified listings only - no bait-and-switch pricing
- Site visits scheduled within 24 hours
- Paperwork and negotiation support included, not billed separately

### About the Agent

**Heading:** About [Name]

2–3 sentences: years in the local market, number of areas covered, one credibility marker (RERA registration if applicable, years active). Photo: agent at a property or in the office, not a stock suit photo.

### Contact

Map, phone, WhatsApp, office hours. Short form: Name, phone, "Buying / Selling / Renting" dropdown, budget range (optional).

**Bottom CTA:** Tell us what you're looking for - we'll shortlist it for you.

---

## 3. Design System

### Palette - "Warm Stone"

```
--bg:      #F7F5F1   /* warm stone-white, architectural */
--ink:     #2A2620   /* warm charcoal-brown, not pure black */
--primary: #5B6B5E   /* muted sage-slate green - grounded, natural, distinct from generic real-estate navy */
--accent:  #C08A4E   /* warm terracotta-clay, used for CTAs and price highlights only */
--grey:    #837A6E
--hair:    rgba(42,38,32,0.12)
```

Avoid the generic real-estate navy-and-white combo - sage + terracotta reads more like considered architecture/interiors branding, which sets this apart from every other broker site using the same corporate blue template.

### Typography

- **Display:** A confident modern sans with some geometric weight - Archivo or Space Grotesk (semibold), used boldly for property prices and headlines.
- **Body:** Inter, regular, comfortable line-height.
- **Numbers (price, specs):** Tabular/mono-adjacent treatment for prices specifically, so they scan cleanly across listing cards - use IBM Plex Mono at small size for the spec row (BHK · sq.ft · price) under each listing photo.

### Spacing & Feel

- Photography-forward, large image cards for listings - real estate is sold on the photo first, copy second.
- Soft corners on cards (6–8px), sharp corners on buttons - a middle ground between the clinic's full softness and Coreline's full sharpness.
- Generous gaps between listing cards; never let the grid feel like a cramped classifieds page - that's the exact feeling this site needs to avoid.

### Motion

- Listing cards: subtle image zoom on hover (scale 1.0 → 1.04, 300ms ease) - makes photography feel alive without being flashy.
- Price/spec row fades in slightly after the image on card entry, staggered by 100ms - draws the eye to photo first, numbers second.
- Map section: pin markers for "Areas We Serve" drop in with a small bounce-once animation on scroll into view - the one slightly playful motion moment on this site, kept brief.
- No parallax scrolling - real estate sites overuse this already; skip it.

---

## 4. Build Notes

- Show real price ranges/estimates on listing cards - unlike the jeweller sample, hiding price here reads as evasive, not premium.
- Small "Built by Coreline Digital" credit in the footer.
