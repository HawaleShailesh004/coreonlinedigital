# Sample Site Build Doc — Coaching Classes / Tuition Institute (Multi-Page)
New vertical — no prior one-pager exists for this, so positioning and design system are established fresh here (unlike the other build docs, which extend an earlier sample doc).
Vertical: academic tuition, competitive exam coaching, or skill-based classes (dance/music/spoken English, etc.)

---

## 1. Positioning
This site sells proof of results to a parent (or an adult student, for skill classes) who's cautious about wasting money and time on a coaching center that doesn't actually deliver. Unlike the School sample (which sells belonging and small-class trust), this vertical sells **outcomes — scores improved, exams cleared, skills gained** — so results and instructor credibility need real visual weight, not just a friendly tone.

---

## 2. Design Tokens — "Momentum Violet"
```css
--bg:      #FAF8FC;   /* light lavender-white */
--ink:     #221B2E;   /* deep violet-black */
--primary: #5B3A8E;   /* rich violet — ambition, achievement */
--accent:  #E3B23C;   /* gold — results, trophies, success */
--grey:    #786F87;
--hair:    rgba(34,27,46,0.12);
```
Violet + gold reads "achievement and ambition" without falling into generic education-brand orange/blue — distinct from the School sample's palette, deliberately, since a parent may be evaluating both a school and a coaching class in the same buying season.

### Typography
- **Display:** Space Grotesk or Poppins (semibold) — confident, slightly punchy, not childish.
- **Body:** Inter, regular, comfortable line-height.
- **Numbers/results (scores, percentages, rankings):** bold, large, high-contrast — these numbers are the actual product being sold, give them real visual weight wherever they appear.

### Spacing & Feel
- Sharp-ish corners (4-6px) — a middle ground, not fully sharp (Coreline) or fully rounded (Clinic/School) — reflects "serious but not corporate."
- Results/achievement content should visually dominate — don't let generic stock-photo classroom shots outweigh actual outcome data (scorecards, rank lists, testimonial-style result callouts).

### Motion
- Numbers (results, scores, student count) count up on scroll into view — reinforces the achievement-focused brand immediately and concretely.
- Fade-up scroll reveals, moderate pace.
- Batch/schedule table rows stagger in, same pattern as other samples.
- Nothing flashy beyond the count-up moment — let the actual results data carry the energy, not motion effects.

---

## 3. Sitemap
1. **Home** — `/`
2. **Courses / Batches** — `/courses`
3. **Results** — `/results`
4. **Faculty** — `/faculty`
5. **Admissions / Enroll** — `/enroll`
6. **Contact** — `/contact`

Global: sticky nav, footer, no floating chat widget on this vertical (per the shared rule — chatbot demo stays limited to Gym and Trader/Seller only).

---

## 4. Page-by-Page Content

### Home (`/`)
**Hero eyebrow:** Admissions Open — [Batch/Session Name]
**Headline:** Results you can actually measure, not just promises.
**Sub:** [Institute Name] runs focused batches for [exam/skill type] with real outcome tracking — so you always know if it's working, not just hoping it is.
**CTAs:** View Results · Book a Free Demo Class

Sections: Courses teaser (link to `/courses`), Results teaser — a few headline stats (e.g. "87% batch clearing rate," "120+ students placed") link to `/results`, Faculty teaser, final CTA.

### Courses / Batches (`/courses`)
**Header:** "Choose the batch that fits your goal."
Full course/batch listing: name, exam/skill target, duration, schedule (day × time table), fee (shown transparently — like the Gym sample, hiding coaching fees reads as evasive, not premium). Each with "Book a demo class" CTA.

### Results (`/results`)
**Header:** "The numbers, not just the promise."
This is the most important page on the site for this vertical:
- Headline stats block (pass rate, average score improvement, number of students placed/selected)
- Year-by-year or batch-by-batch results table if available
- Short student result callouts (name/initial, achievement, one line) — real specifics beat generic praise
- Optional: toppers list by year

### Faculty (`/faculty`)
Grid of instructor cards: photo, name, subject/specialization, qualification, years teaching, one credibility line (e.g. "Ex-[institution]," "15 years teaching [subject]").

### Admissions / Enroll (`/enroll`)
**Header:** "Book a free demo class before you decide."
Simple form: Student name, parent name (if minor), phone, course/batch interested in, preferred demo class date. Explain what happens after enrollment enquiry (Demo Class → Assessment if applicable → Batch Assignment → Start) as a short numbered strip, same clarity-first approach as the School sample's admissions process.

### Contact (`/contact`)
Map, address, phone, WhatsApp, batch timing overview, office hours.

---

## 5. Reusable Components
- `<Nav />` — sticky, standard
- `<Footer />` — hours, address, "Built by Coreline Digital" credit
- `<CourseCard />` — Home teaser + Courses page, `variant` prop
- `<ResultsStatBlock />` — count-up numbers, used on Home teaser and Results page
- `<FacultyCard />`
- `<CTAButton />` — violet fill (primary) / bordered (secondary)
- `<EnrollForm />` — Admissions page
- `<ScheduleTable />` — Courses page, day × time batch schedule

---

## 6. Cursor Build Guide
- **Stack:** Next.js (App Router) + Tailwind, consistent with your other builds.
- **Folder structure suggestion:**
  ```
  /app
    /courses/page.tsx
    /results/page.tsx
    /faculty/page.tsx
    /enroll/page.tsx
    /contact/page.tsx
    page.tsx (Home)
    layout.tsx (Nav, Footer)
  /components
    Nav.tsx, Footer.tsx, CourseCard.tsx, ResultsStatBlock.tsx,
    FacultyCard.tsx, CTAButton.tsx, EnrollForm.tsx, ScheduleTable.tsx
  ```
- No chatbot needed for this build — keep scope to design/content polish, same as the Clinic sample.
- Results page is the highest-leverage page on this entire site — if you're short on time, prioritize making this page genuinely convincing (real-feeling numbers, clean data presentation) over polishing every other page equally.
