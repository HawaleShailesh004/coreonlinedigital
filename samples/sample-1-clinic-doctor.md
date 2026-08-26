# Sample Build 1 - Clinic / Doctor

Vertical: Healthcare (family clinic, single-doctor practice, or small diagnostic center)
Purpose: Portfolio sample for Coreline's Work page + cold-call demo asset for medical/clinic leads.

---

## 1. Positioning

This site sells calm and trust first, convenience second. A patient (or a worried parent) lands here needing reassurance before they need a form. Never let the design feel clinical-cold or hospital-sterile - warm, human, still professional.

---

## 2. Copy

### Nav

Logo/clinic name · Services · Doctor · Contact
CTA button: **Book Appointment**

### Hero

**Eyebrow:** Now accepting new patients

**Headline:** Care that fits your schedule, not the other way around.

**Sub:** [Clinic Name] offers same-day appointments, online booking, and clear follow-up - so getting care doesn't take longer than the visit itself.

**CTAs:** Book Appointment · Call Now

### Services (grid, 4–6 items)

Short name + one-line plain-English description per service. Example:

- **General Consultation** - Same-day slots available for common illness, checkups, and prescriptions.
- **Diagnostics & Tests** - On-site basic testing with same-day results where possible.
- **Follow-up Care** - Automatic WhatsApp reminders so no follow-up gets missed.

### About the Doctor

**Heading:** Meet Dr. [Name]

2–3 sentences: qualification, years of practice, one human detail (why they practice, what they focus on). Photo placeholder: doctor in clinic, natural light, not a stock photo.

### Why Book Online

Short 3-point strip:

- No waiting on hold - book in under a minute
- Instant WhatsApp confirmation
- Reminders before every visit, automatically

### Contact / Location

Map embed, address, phone, WhatsApp button, clinic hours table.

**Bottom CTA:** Skip the wait. Book your visit online.

---

## 3. Design System

### Palette - "Clinical Calm"

```
--bg:      #FAFBFA   /* soft white, slight cool tint */
--ink:     #1C2B2A   /* deep teal-black, not pure black - softer, less clinical */
--primary: #3D8B7D   /* muted teal-green - trust + calm, avoids generic hospital blue */
--accent:  #E8A13F   /* warm amber, used sparingly for CTA emphasis only */
--grey:    #6B7873
--hair:    rgba(28,43,42,0.10)
```

Avoid stark hospital blue/white - it's the most overused palette in this category and reads generic. The muted teal + warm amber pairing feels human without losing trust.

### Typography

- **Display:** Poppins or Manrope, medium weight - rounded terminals are fine and even helpful here, this is the one vertical where "friendly" outranks "engineered."
- **Body:** Inter, regular/medium, generous line-height (1.7) - readability matters more here than anywhere else, patients are often older or reading while anxious.
- **Never use a hard technical/mono font anywhere on this site** - reserve that for Coreline's own brand only.

### Spacing & Feel

- Rounded corners this time - 8–12px radius on cards and buttons. This is the one sample where the "no rounded corners" Coreline house rule is deliberately broken, because rounded reads warm/approachable, which is exactly right for healthcare.
- Generous padding, soft drop shadows (very subtle, `0 4px 20px rgba(0,0,0,0.05)`) instead of hard hairlines - softness over sharpness throughout.
- Photography-forward: real (or realistic placeholder) photos of the clinic interior and doctor, not icons or illustrations.

### Motion

- Gentle fade-up on scroll, nothing snappy or techy.
- Booking button: soft pulse glow on hover, not a hard color-swap.
- No marquees, no scroll-linked effects - calm is the entire brand here, restraint on motion supports that directly.

---

## 4. Build Notes

- This site should NOT look related to Coreline's own brand at all (except a tiny "Built by Coreline Digital" credit in the footer, linking back).
- Keep total sections to 5 - this is a demo, not a full production build. Enough to prove the concept convincingly on a call.
