/**
 * Copy for Sample 1 - Clinic / Doctor. Brief: samples/sample-1-clinic-doctor.md
 *
 * Positioning: sells calm and trust first, convenience second. A worried parent
 * lands here needing reassurance before they need a form.
 */

export const clinic = {
  business: "Meridian",
  brandNote: "Family Clinic · Thane",

  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Doctor", href: "#doctor" },
      { label: "Contact", href: "#visit" },
    ],
    cta: { label: "Book Appointment", href: "#book" },
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
        name: "General Consultation",
        body: "Same-day slots for fever, infections, checkups and repeat prescriptions.",
      },
      {
        name: "Diagnostics & Lab Tests",
        body: "Blood work and ECG on site, with most results back the same day.",
      },
      {
        name: "Follow-Up Care",
        body: "Every visit ends with a date and a WhatsApp reminder, so nothing gets dropped.",
      },
      {
        name: "Preventive Health Checks",
        body: "Annual panels for adults, explained line by line instead of just handed over.",
      },
      {
        name: "Vaccinations",
        body: "Childhood and adult schedules tracked for you, including travel shots.",
      },
      {
        name: "Chronic Care",
        body: "Ongoing support for blood pressure, thyroid and diabetes, reviewed every quarter.",
      },
    ],
  },

  doctor: {
    eyebrow: "Who you'll see",
    heading: "Meet Dr. Aditya Rao",
    credentials: "MBBS, MD (General Medicine)",
    paragraphs: [
      "Dr. Rao started Meridian after a decade in hospital medicine, wanting to run the kind of practice where ten minutes isn't the ceiling and a patient isn't a file number.",
      "He treats adults and children, and still calls patients himself when a result needs explaining.",
    ],
    stats: [
      { value: "14 yrs", label: "In practice" },
      { value: "11 yrs", label: "In Thane" },
      { value: "MMC", label: "Registered" },
    ],
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

  booking: {
    eyebrow: "Book an appointment",
    heading: "Pick a time that works.",
    sub: "We'll confirm on WhatsApp. No account, no payment, nothing to download.",
    submit: "Request this appointment",
    successTitle: "Appointment requested.",
    successBody:
      "We'll confirm on WhatsApp within a few minutes. If it's urgent, call the clinic directly and we'll fit you in today.",
    note: "Demo form - this sample isn't connected to a live clinic calendar.",
  },

  bottomCta: {
    heading: "Skip the wait. Book your visit online.",
    body: "Most patients are seen the same day they book.",
    cta: "Book Appointment",
  },

  footer: {
    blurb:
      "A family practice in Naupada, Thane - general medicine, diagnostics and preventive care for adults and children.",
    legal: "This is a concept build, not a real clinic.",
  },
};
