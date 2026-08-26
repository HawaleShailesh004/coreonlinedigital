# Sample Build 8 - Interior Designer

Vertical: Independent interior designer or small design studio
Purpose: Portfolio sample for Coreline's Work page + cold-call demo asset for interior design leads.

---

## 1. Positioning

This site sells taste and vision - a client is hiring a point of view, not a service checklist. The site itself must demonstrate design sensibility directly (if this site looks templated, the designer's own portfolio undermines their pitch before a word is read).

---

## 2. Copy

### Nav

Logo/studio name · Portfolio · Process · Contact
CTA button: **Start Your Project**

### Hero

**Eyebrow:** Interior Design Studio · [City]

**Headline:** Spaces designed around how you actually live.

**Sub:** [Studio/Designer Name] designs homes and offices that balance how a space looks with how it's actually used - from concept to the last light fixture.

**CTAs:** View Portfolio · Book a Consultation

### Portfolio (large image grid, project-led)

4–6 projects as large photo cards: project name/type (e.g. "3BHK, Thane" or "Boutique Office, Andheri"), one-line concept description. Click-through to a project detail view if built out further.

### Process

**Heading:** How a project comes together

Numbered steps: Consultation → Concept & Moodboard → Design & Material Selection → Execution & Styling. Removes ambiguity for a first-time client who doesn't know what hiring a designer actually involves.

### Services

Short list: Full Home Design · Single Room Makeover · Commercial/Office Spaces · Consultation Only. Each with one line on what's included.

### About

**Heading:** About [Name]

2–3 sentences: design background/education, years practicing, design philosophy in one sentence. Photo: designer in a completed space, not a studio headshot.

### Contact

Studio address (if applicable), phone, WhatsApp, Instagram link (portfolio-heavy fields lean on Instagram as a secondary proof channel). Form: Name, phone, project type, approximate space size/budget range (optional).

**Bottom CTA:** Let's talk about your space before you commit to anything.

---

## 3. Design System

### Palette - "Studio Neutral"

```
--bg:      #F5F3EE   /* warm gallery-white */
--ink:     #2B2A26   /* warm near-black */
--primary: #8A7A63   /* warm taupe/clay - material, tactile, non-corporate */
--accent:  #B5482E   /* muted terracotta-rust, used sparingly for CTAs/highlights only */
--grey:    #7A756A
--hair:    rgba(43,42,38,0.10)
```

Warm neutrals let the project photography do the talking - this is a portfolio-first site, the palette's job is to stay out of the way of the images, not compete with them.

### Typography

- **Display:** A refined, slightly editorial sans or light-weight serif for section headers - Fraunces (light weight) or Söhne - should feel like a design magazine, not a corporate brochure.
- **Body:** Inter, light/regular weight, generous letter-spacing on captions under project photos.
- **Project labels:** small caps, wide tracking, muted grey - gallery-caption style.

### Spacing & Feel

- Extremely photography-forward - large, uninterrupted images, minimal text overlay.
- Generous whitespace between projects, borderline gallery/museum pacing - never crowd images together.
- Soft, thin borders only if needed; no shadows, no rounded-card gimmicks - let the photography and whitespace carry the premium feeling.

### Motion

- Portfolio grid: images fade in with a slight upward drift as they scroll into view, staggered - slow and deliberate (400–500ms), never snappy.
- Project hover: image very subtly desaturates slightly less / brightens on hover, project name and one-line description fade in as an overlay - restrained, gallery-style interaction, not a hard slide-up label.
- Process steps: connected by a thin line that draws in as the section scrolls into view (same line-motif language, styled in the taupe/rust palette) - reinforces "a considered process," similar function to the Coreline process section but visually distinct.
- No parallax, no bounce, no loud transitions anywhere - restraint IS the design signal in this vertical.

---

## 4. Build Notes

- This sample lives or dies on photography quality more than any other in the portfolio - invest disproportionate effort in sourcing/generating strong interior shots if real client photos aren't available yet.
- Small "Built by Coreline Digital" credit in the footer.
