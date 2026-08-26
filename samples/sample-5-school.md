# Sample Build 5 - School / Educational Institution

Vertical: Private school, coaching institute, or classes (K-12 or after-school academic)
Purpose: Portfolio sample for Coreline's Work page + cold-call demo asset for school/classes leads.

---

## 1. Positioning

This site sells trust and belonging to parents, not excitement to students. A parent is evaluating safety, results, and community fit - the design should feel warm and alive without ever tipping into looking unserious or under-resourced.

---

## 2. Copy

### Nav

Logo/school name · Academics · Admissions · Contact
CTA button: **Schedule a Visit**

### Hero

**Eyebrow:** Admissions Open for [Year]

**Headline:** Where your child is known, not just enrolled.

**Sub:** [School Name] combines small class sizes, structured academics, and real communication with parents - so you always know how your child is actually doing.

**CTAs:** Schedule a Visit · Download Brochure

### Academics / Programs

Grid of 3–5 offerings (e.g. by grade level or subject stream), each with a short description of approach, not just a subject list - parents want to know _how_ it's taught, not just _what_.

### Why Parents Choose Us

3–4 point strip:

- Low student-to-teacher ratio
- Weekly progress updates sent directly to parents via WhatsApp/app
- [Specific differentiator - e.g. sports, arts, bilingual program]
- Transparent fee structure, no hidden costs

### Campus / Facilities

Photo-driven section: classrooms, library, playground/sports facilities. Short captions, not paragraphs.

### Admissions Process

Simple numbered steps: Enquire → Visit Campus → Assessment (if applicable) → Enrollment. Removes ambiguity for a parent who's never dealt with this specific school before.

### Contact / Enquiry

Map, address, phone, WhatsApp, office hours. Form: Parent name, child's age/grade, phone, preferred visit time.

**Bottom CTA:** Come see the classroom before you decide. Schedule a visit this week.

---

## 3. Design System

### Palette - "Warm Academic"

```
--bg:      #FDFBF6   /* warm off-white, welcoming not sterile */
--ink:     #223245   /* deep navy-charcoal, grounded and serious */
--primary: #2F5D8A   /* confident blue, trust without being corporate-cold */
--accent:  #E08C3E   /* warm orange - energy, used for CTAs and highlight badges only */
--grey:    #6B7280
--hair:    rgba(34,50,69,0.12)
```

Blue + warm orange reads as "serious institution with genuine warmth" - avoids both the overly corporate all-navy look and the overly playful primary-color-heavy look many school sites default to.

### Typography

- **Display:** A friendly but structured sans - Manrope or Poppins (semibold) - approachable, still legible and organized, not childish.
- **Body:** Inter, regular, generous line-height for parents reading on mobile between other tasks.
- **Small accents (badges like "Admissions Open"):** same font, uppercase, small, in the accent orange.

### Spacing & Feel

- Rounded corners (8–10px) on cards and images - warmth matters here, similar reasoning to the clinic sample.
- Photography of real campus life (or realistic placeholders) dominates - this audience needs to see the actual environment, not illustrations.
- Sectioned clearly with generous white space between - a cluttered school site reads as disorganized administration, which is a real parent fear.

### Motion

- Fade-up scroll reveals, staggered by section, moderate speed (not too slow, this audience wants information efficiently).
- Admissions Process steps: each step number "lights up" in sequence as the section scrolls into view, connected by a simple progress line - mirrors the clarity a parent wants from the actual admissions process itself.
- Photo gallery: gentle crossfade or slide transition if used as a carousel, auto-advancing slowly (6–8s per slide), pausable on hover/tap.
- Nothing flashy - energy comes from color and photography, not from motion effects.

---

## 4. Build Notes

- Keep fee/pricing information available but not the headline focus - parents want to know it exists and is transparent, not have it be the first thing sold.
- Small "Built by Coreline Digital" credit in the footer.
