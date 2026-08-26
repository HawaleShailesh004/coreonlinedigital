/**
 * Copy for Sample 5 - School / Educational Institution. Brief: samples/sample-5-school.md
 *
 * Positioning: this sells trust and belonging to a parent, not excitement to a
 * child. Warm, but never unserious - a school site that reads as disorganised
 * is read as disorganised administration, which is the fear underneath the
 * whole visit. Fees stay available and honest without leading the page.
 */

export const school = {
  business: "Brightfield",
  brandNote: "Academy · Thane",

  nav: {
    links: [
      { label: "Academics", href: "#academics" },
      { label: "Campus", href: "#campus" },
      { label: "Admissions", href: "#admissions" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Schedule a Visit", href: "#visit" },
  },

  hero: {
    eyebrow: "Admissions open for 2026-27",
    headline: "Where your child is known, not just enrolled.",
    sub: "Brightfield Academy combines small class sizes, structured academics and real communication with parents - so you always know how your child is actually doing.",
    primaryCta: "Schedule a Visit",
    secondaryCta: "Download Brochure",
    reassurance: [
      "Nursery to Grade 10",
      "CBSE affiliated",
      "24 children per class, capped",
    ],
    card: {
      label: "This admission season",
      value: "1 : 18",
      note: "Student-to-teacher ratio across the school, counted classroom by classroom.",
    },
  },

  academics: {
    eyebrow: "Academics",
    heading: "Four stages, each taught differently on purpose.",
    sub: "A six-year-old and a fifteen-year-old do not learn the same way, so we do not pretend they do. Here is how teaching actually changes as your child moves up.",
    items: [
      {
        stage: "Nursery – Sr. KG",
        name: "Early Years",
        body: "Play-led, but planned. Children move between four activity corners each morning while a teacher tracks the same twelve skills for every child, so nobody quietly falls behind while the room looks busy.",
        detail: "Two adults in every early years room.",
      },
      {
        stage: "Grades 1 – 5",
        name: "Primary",
        body: "One class teacher who stays with the group all year and knows every child's handwriting. Reading is timetabled daily, and maths is taught to mastery - a topic is not closed until the whole class has it.",
        detail: "Daily reading hour, no homework before Grade 3.",
      },
      {
        stage: "Grades 6 – 8",
        name: "Middle School",
        body: "The handover to subject teachers, done gradually. Projects run across subjects rather than in parallel, and every child picks up a second language and a sport they stay with for three years.",
        detail: "Termly one-to-one review with the mentor teacher.",
      },
      {
        stage: "Grades 9 – 10",
        name: "Senior School",
        body: "Board preparation without the coaching-class treadmill. Supervised study runs until 5 PM on campus, so revision happens here with a teacher in the room rather than at home at midnight.",
        detail: "Board average 88.4% across the last three batches.",
      },
    ],
  },

  why: {
    eyebrow: "Why parents choose us",
    heading: "The four things parents tell us mattered.",
    points: [
      {
        title: "Small classes, actually enforced",
        body: "24 children per section, capped. When a section fills, we open another one rather than adding a 27th desk.",
      },
      {
        title: "A progress update every Friday",
        body: "A short written note on your child's week - what went well, what needs work - sent on WhatsApp. Not a report card twice a year.",
      },
      {
        title: "An hour of sport and an hour of reading, daily",
        body: "Both are timetabled for every grade, every day. Neither gets quietly given up to syllabus pressure in February.",
      },
      {
        title: "One fee, published in full",
        body: "Tuition, books, labs, activities and the annual trip are in a single figure shared at your first visit. No separate charges through the year.",
      },
    ],
  },

  campus: {
    eyebrow: "Campus",
    heading: "Come and see the rooms your child would be in.",
    sub: "Photographs of the actual campus, taken on ordinary school days.",
    /** `media` keys into schoolMedia; captions describe what is in that frame. */
    items: [
      {
        media: "classroom" as const,
        caption: "Homerooms built for 24 desks, not squeezed to fit 40.",
      },
      {
        media: "library" as const,
        caption: "A library that stays open through lunch and after school.",
      },
      {
        media: "auditorium" as const,
        caption: "The auditorium - every child is on this stage twice a year.",
      },
      {
        media: "smartboard" as const,
        caption: "Smartboards in every room from Grade 3 upward.",
      },
      {
        media: "primary" as const,
        caption: "Primary circle time, first thing every morning.",
      },
      {
        media: "senior" as const,
        caption: "Supervised senior study hall, until 5 PM on campus.",
      },
    ],
  },

  admissions: {
    eyebrow: "Admissions",
    heading: "Four steps, and you will know where you stand at each one.",
    sub: "The whole process takes about two weeks. You hear from us after every stage, whether the answer is yes or no.",
    steps: [
      {
        title: "Enquire",
        body: "Send the form below or call the office. We reply the same working day with available seats for your child's grade.",
        meta: "Day 1",
      },
      {
        title: "Visit campus",
        body: "A 45-minute walk-through on a working day, so you see real classrooms mid-lesson. The full fee structure is handed to you here.",
        meta: "Within 3 days",
      },
      {
        title: "Interaction",
        body: "An informal session for your child, and a conversation with both parents. Grade 1 and above sit a short readiness check - it is not competitive.",
        meta: "Week 2",
      },
      {
        title: "Enrolment",
        body: "Offer letter, document submission and the fee schedule in writing. Your child's class teacher calls you before the first day.",
        meta: "Week 2",
      },
    ],
    feeNote:
      "Fees: one consolidated annual figure covering tuition, books, labs, activities and the annual trip. Shared in full at your campus visit - there is nothing added later.",
    brochureCta: "Download the prospectus",
  },

  contact: {
    eyebrow: "Visit us",
    heading: "Book a campus visit.",
    sub: "Weekday mornings are best - you will see classes running rather than an empty building.",
    address: [
      "Brightfield Academy Campus",
      "Panchpakhadi, off Eastern Express Highway",
      "Thane West, Maharashtra 400602",
    ],
    phoneLabel: "+91 22 2534 7180",
    phoneHref: "tel:+912225347180",
    whatsappLabel: "Message the office",
    whatsappHref: "https://wa.me/919920347180",
    coords: { lat: 19.1972, lon: 72.9722 },
    mapLabel: "Brightfield Academy, Panchpakhadi, Thane West",
    hours: [
      { day: "Monday – Friday", time: "8:00 AM – 4:30 PM" },
      { day: "Saturday", time: "9:00 AM – 12:30 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    form: {
      submit: "Request a visit",
      successTitle: "Visit request received.",
      successBody:
        "The admissions office will call you the same working day to confirm a slot. If you would rather message, the office WhatsApp number is on this page.",
      note: "Demo form - this sample is not connected to a live admissions desk.",
    },
  },

  bottomCta: {
    heading: "Come see the classroom before you decide.",
    body: "Schedule a visit this week. Weekday mornings, forty-five minutes, no obligation.",
    cta: "Schedule a Visit",
  },

  footer: {
    blurb:
      "A CBSE school in Panchpakhadi, Thane - Nursery to Grade 10, with classes capped at 24 and a written progress note home every Friday.",
    legal: "This is a concept build, not a real school.",
  },
};
