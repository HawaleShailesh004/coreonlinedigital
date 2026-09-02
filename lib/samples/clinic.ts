/**
 * Copy for Sample 1 - Clinic / Doctor. Brief: samples/sample-1-clinic-doctor.md
 * Multi-page build: samples/clinic-doctor-site-full-build-doc.md
 *
 * Positioning: sells calm and trust first, convenience second. A worried parent
 * lands here needing reassurance before they need a form.
 */

export const clinic = {
  business: "Meridian",
  brandNote: "Family Clinic · Thane",

  nav: {
    links: [
      { label: "Services", href: "/samples/clinic/services" },
      { label: "Doctor", href: "/samples/clinic/doctor" },
      { label: "Contact", href: "/samples/clinic/contact" },
    ],
    cta: { label: "Book Appointment", href: "/samples/clinic/book" },
  },

  hero: {
    eyebrow: "Now accepting new patients",
    headline: "Care that fits your schedule, not the other way around.",
    sub: "Meridian Family Clinic offers same-day appointments, online booking, and clear follow-up - so getting care doesn't take longer than the visit itself.",
    primaryCta: "Book Appointment",
    secondaryCta: "Call Now",
    reassurance: [
      "Same-day slots",
      "Book in under a minute",
      "WhatsApp confirmation",
    ],
  },

  services: {
    eyebrow: "What we treat",
    heading: "Everyday care, handled properly.",
    sub: "One clinic for the whole family - routine, urgent, and ongoing.",
    items: [
      {
        slug: "general-consultation",
        name: "General Consultation",
        teaser:
          "Same-day slots for fever, infections, checkups and repeat prescriptions.",
        body: "Walk in or book ahead for everyday illness, checkups, and prescriptions. We keep the visit unhurried so you leave knowing what to do next, not just what was written on a pad. Same-day slots are held each morning and evening for common concerns.",
        expect:
          "Bring any recent reports and a list of medicines you take. Arrive five minutes early so we can update your file before you see the doctor.",
      },
      {
        slug: "diagnostics-lab-tests",
        name: "Diagnostics & Lab Tests",
        teaser:
          "Blood work and ECG on site, with most results back the same day.",
        body: "Basic blood work, ECG, and common panels are done on site so you are not sent across town and asked to wait a week. Where results can be ready the same day, we call or WhatsApp you ourselves. Complex tests are referred out with clear instructions, not a shrug.",
        expect:
          "Fasting tests need 8–10 hours without food (water is fine). Wear a short-sleeved top for blood draws and ECG. Collect results at the desk or ask us to send them on WhatsApp.",
      },
      {
        slug: "follow-up-care",
        name: "Follow-Up Care",
        teaser:
          "Every visit ends with a date and a WhatsApp reminder, so nothing gets dropped.",
        body: "Follow-ups are scheduled before you leave, with a reminder the day before so the date does not quietly slip. We review how treatment is working, adjust if needed, and close the loop on any pending reports. Continuity matters more than a one-off prescription.",
        expect:
          "Bring the medicines you were started on and any reports from the last visit. Mentions of side effects or new symptoms help us adjust safely in one sitting.",
      },
      {
        slug: "preventive-health-checks",
        name: "Preventive Health Checks",
        teaser:
          "Annual panels for adults, explained line by line instead of just handed over.",
        body: "Annual panels for adults, sized to your age and risk rather than a generic package. Results are walked through line by line so a number means something, not just a printout. We flag what to watch and what can wait until next year.",
        expect:
          "Most panels need overnight fasting. Wear comfortable clothes and plan 45–60 minutes for draw plus a short consult when results are ready.",
      },
      {
        slug: "vaccinations",
        name: "Vaccinations",
        teaser:
          "Childhood and adult schedules tracked for you, including travel shots.",
        body: "Childhood and adult schedules are tracked on your file so we know what is due before you ask. Travel vaccines and boosters are stocked where demand is steady; others are ordered with clear timing. We record every shot so the next clinic visit picks up where this one left off.",
        expect:
          "Bring your vaccine card or a photo of past records. Stay 15 minutes after the shot so we can watch for a rare reaction. Mild arm soreness is common and usually settles in a day.",
      },
      {
        slug: "chronic-care",
        name: "Chronic Care",
        teaser:
          "Ongoing support for blood pressure, thyroid and diabetes, reviewed every quarter.",
        body: "Blood pressure, thyroid, and diabetes need steady review, not only crisis visits. We set a quarterly rhythm, adjust medicines carefully, and keep a simple plan you can follow between appointments. The goal is fewer surprises and clearer days between check-ins.",
        expect:
          "Bring a home BP or sugar log if you keep one, plus your current medicines. Morning slots work best when fasting labs are due the same day.",
      },
    ],
  },

  servicesPage: {
    eyebrow: "Services",
    heading: "Care, explained simply.",
    sub: "Plain language on what we offer, what a visit looks like, and how to prepare - so you arrive calm, not guessing.",
  },

  doctor: {
    eyebrow: "Who you'll see",
    heading: "Meet Dr. Aditya Rao",
    credentials: "MBBS, MD (General Medicine)",
    paragraphs: [
      "Dr. Rao started Meridian after a decade in hospital medicine, wanting to run the kind of practice where ten minutes isn't the ceiling and a patient isn't a file number.",
      "He treats adults and children, and still calls patients himself when a result needs explaining.",
    ],
    quote:
      "I left the hospital wards because good medicine needs time. A parent should leave knowing what to watch for tonight - not just holding a prescription they don't understand.",
    stats: [
      { value: "14 yrs", label: "In practice" },
      { value: "11 yrs", label: "In Thane" },
      { value: "MMC", label: "Registered" },
    ],
  },

  doctorPage: {
    eyebrow: "The doctor",
    heading: "Meet Dr. Aditya Rao",
    sub: "One doctor, one clinic, and enough time in the room to answer the question you actually came with.",
  },

  why: {
    eyebrow: "Why book online",
    heading: "Three fewer phone calls.",
    points: [
      {
        title: "No waiting on hold",
        body: "Pick a slot in under a minute, at any hour - including after we've closed.",
      },
      {
        title: "Instant WhatsApp confirmation",
        body: "Your appointment lands on your phone before you've closed the tab.",
      },
      {
        title: "Reminders before every visit",
        body: "Sent automatically the day before, so a follow-up never quietly gets missed.",
      },
    ],
  },

  visit: {
    eyebrow: "Visit us",
    heading: "Where to find us.",
    address: [
      "2nd Floor, Sunrise Plaza",
      "Gokhale Road, Naupada",
      "Thane West 400602",
    ],
    phoneLabel: "+91 22 4890 1120",
    phoneHref: "tel:+912248901120",
    whatsappLabel: "Message on WhatsApp",
    whatsappHref: "https://wa.me/919820041120",
    coords: { lat: 19.1943, lon: 72.9705 },
    hours: [
      { day: "Monday – Friday", time: "9:00 AM – 1:00 PM · 5:00 PM – 9:00 PM" },
      { day: "Saturday", time: "9:00 AM – 2:00 PM" },
      { day: "Sunday", time: "Closed · emergency line open" },
    ],
  },

  contactPage: {
    eyebrow: "Contact",
    heading: "Come in, call, or message.",
    sub: "Hours, map, and the numbers you need - all in one place.",
  },

  booking: {
    eyebrow: "Book an appointment",
    heading: "Pick a time that works.",
    sub: "We'll confirm on WhatsApp. No account, no payment, nothing to download.",
    submit: "Request this appointment",
    successTitle: "Appointment requested.",
    successBody:
      "We'll confirm your slot on WhatsApp within a few hours. If it's urgent, call the clinic directly and we'll fit you in today.",
    note: "We'll confirm your slot on WhatsApp within a few hours.",
  },

  bookPage: {
    eyebrow: "Book",
    heading: "Request a visit.",
    sub: "Tell us who the visit is for and when works. We confirm the slot on WhatsApp - usually the same day.",
  },

  bottomCta: {
    heading: "Skip the wait. Book your visit online.",
    body: "Most patients are seen the same day they book.",
    cta: "Book Appointment",
  },

  footer: {
    blurb:
      "A family practice in Naupada, Thane - general medicine, diagnostics and preventive care for adults and children.",
    legal: "",
  },
};
