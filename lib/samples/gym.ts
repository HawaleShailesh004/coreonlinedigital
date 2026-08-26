/**
 * Copy for Sample 7 - Gym / Fitness Studio. Brief: samples/sample-7-gym.md
 *
 * Positioning: sells energy and momentum. High energy visually, but the actual
 * conversion action (trial booking) has to be frictionless.
 *
 * `chatFacts` at the bottom is the single source of truth shared with the AI
 * chat assistant, so the bot can never quote a price or a class time that
 * contradicts the page a prospect is looking at.
 */

export type MembershipPlan = {
  name: string;
  price: number;
  cadence: string;
  summary: string;
  includes: string[];
  featured?: boolean;
};

export type ClassSlot = {
  name: string;
  days: string;
  times: string;
};

const plans: MembershipPlan[] = [
  {
    name: "Basic",
    price: 1200,
    cadence: "per month",
    summary: "Train on your own, whenever you want.",
    includes: [
      "Full gym floor access, 6 AM – 10 PM",
      "Locker and shower access",
      "Month-to-month, no lock-in",
    ],
  },
  {
    name: "Standard",
    price: 1900,
    cadence: "per month",
    summary: "Everything in Basic, plus every group class.",
    includes: [
      "All group classes included",
      "One personal training session a month",
      "Body composition check every quarter",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: 3400,
    cadence: "per month",
    summary: "Coached properly, start to finish.",
    includes: [
      "Four personal training sessions a month",
      "Nutrition plan reviewed monthly",
      "Priority class booking",
    ],
  },
];

const schedule: ClassSlot[] = [
  { name: "HIIT", days: "Mon · Wed · Fri", times: "7:00 AM & 7:00 PM" },
  { name: "Strength Circuit", days: "Tue · Thu", times: "6:30 AM & 6:30 PM" },
  {
    name: "Yoga & Mobility",
    days: "Mon · Thu · Sat",
    times: "8:00 AM (Sat 9:00 AM)",
  },
  { name: "Zumba", days: "Tue · Fri", times: "8:00 PM" },
  { name: "Spin", days: "Wed · Sat", times: "7:30 AM" },
];

export const gym = {
  business: "FORGE",
  brandNote: "Strength Co. · Thane",

  nav: {
    links: [
      { label: "Programs", href: "#programs" },
      { label: "Membership", href: "#membership" },
      { label: "Trainers", href: "#trainers" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Book a Free Trial", href: "#trial" },
  },

  hero: {
    eyebrow: "Thane · Open 6 AM – 10 PM",
    headline: ["Stop planning", "your first workout.", "Book it."],
    sub: "Forge Strength Co. runs strength training, group classes and personal coaching - real trainers, flexible timings, and a free session before you commit to anything.",
    primaryCta: "Book Free Trial",
    chatCta: "Chat With Us Now",
    stats: [
      { value: "6 AM", label: "Doors open" },
      { value: "18", label: "Classes a week" },
      { value: "₹0", label: "First session" },
    ],
  },

  programs: {
    eyebrow: "Programs",
    heading: "Four ways to train here.",
    items: [
      {
        name: "Strength Training",
        body: "Racks, platforms and free weights, with a coach on the floor every hour we're open.",
        timing: "Open floor · 6 AM – 10 PM",
      },
      {
        name: "Group Classes",
        body: "HIIT, Zumba and circuits that will genuinely wreck you, in the best way.",
        timing: "18 classes a week",
      },
      {
        name: "Personal Training",
        body: "One coach, one plan, tracked week to week until the numbers move.",
        timing: "By appointment",
      },
      {
        name: "Mobility & Recovery",
        body: "Yoga and mobility work, because the training only counts if you can keep doing it.",
        timing: "Mon · Thu · Sat mornings",
      },
    ],
  },

  schedule: {
    eyebrow: "This week",
    heading: "Class timings.",
    sub: "Book any class on WhatsApp, or ask the chat assistant in the corner.",
    slots: schedule,
  },

  membership: {
    eyebrow: "Membership",
    heading: "Straight pricing. No joining fee.",
    sub: "Pay monthly and leave whenever. Three months takes 10% off, a year takes 20%.",
    plans,
    note: "No joining fee, no locker deposit, no annual maintenance charge.",
  },

  why: {
    eyebrow: "Why train here",
    heading: "Equipment is the easy part.",
    points: [
      {
        title: "Certified trainers, not just equipment",
        body: "Every coach on the floor is certified and actually coaches - they don't sit at the desk.",
      },
      {
        title: "Book a class in seconds",
        body: "WhatsApp us or ask the chat assistant. No app to install, no portal login.",
      },
      {
        title: "No long-term lock-in",
        body: "Month-to-month is a real option, not a more expensive trap.",
      },
    ],
  },

  trainers: {
    eyebrow: "The floor team",
    heading: "Who you'll be working with.",
    people: [
      { name: "Vikram Rane", role: "Head strength coach" },
      { name: "Neha Sharma", role: "Group class lead" },
      { name: "Arjun Patil", role: "Personal trainer" },
      { name: "Priya Nair", role: "Conditioning coach" },
    ],
  },

  contact: {
    eyebrow: "Come in",
    heading: "Your first session is free.",
    sub: "No card, no commitment. Turn up, train, decide after.",
    address: [
      "Unit 4, Kapadia Industrial Estate",
      "Road No. 22, Wagle Estate",
      "Thane West 400604",
    ],
    phoneLabel: "+91 22 4712 8890",
    phoneHref: "tel:+912247128890",
    whatsappLabel: "WhatsApp us",
    whatsappHref: "https://wa.me/919820047128",
    coords: { lat: 19.1929, lon: 72.9614 },
    hours: [
      { day: "Monday – Friday", time: "6:00 AM – 10:00 PM" },
      { day: "Saturday", time: "6:00 AM – 9:00 PM" },
      { day: "Sunday", time: "7:00 AM – 1:00 PM" },
    ],
  },

  trial: {
    submit: "Book my free session",
    successTitle: "You're booked in.",
    successBody:
      "We'll confirm on WhatsApp and tell you exactly what to bring. Wear shoes you can lift in.",
    note: "Demo form - this sample isn't wired to a live gym schedule.",
  },

  bottomCta: {
    heading: "Your first session is free. No card required.",
    body: "Walk in, train with a coach, and decide afterwards.",
    cta: "Book Free Trial",
  },

  footer: {
    blurb:
      "A strength and conditioning gym in Wagle Estate, Thane. Open seven days, coached every hour.",
    legal: "This is a concept build, not a real gym.",
  },
};

/**
 * Factsheet handed to the AI assistant. Derived from the copy above so the two
 * can't drift apart. Keep it terse - it is spent as prompt tokens on every turn.
 */
export const gymChatFacts = [
  `Gym: Forge Strength Co., Unit 4 Kapadia Industrial Estate, Road No. 22, Wagle Estate, Thane West 400604.`,
  `Phone ${gym.contact.phoneLabel}. WhatsApp ${gym.contact.whatsappHref}.`,
  `Opening hours: ${gym.contact.hours.map((h) => `${h.day} ${h.time}`).join("; ")}.`,
  `Class timetable: ${schedule
    .map((slot) => `${slot.name} on ${slot.days} at ${slot.times}`)
    .join("; ")}.`,
  `Membership: ${plans
    .map(
      (plan) =>
        `${plan.name} Rs ${plan.price}/month (${plan.includes.join(", ")})`,
    )
    .join("; ")}.`,
  `Discounts: 3-month plans 10% off, 12-month plans 20% off. No joining fee, no locker deposit, no annual maintenance charge. Month-to-month available on every plan.`,
  `Free trial: the first session is free, no card and no commitment required.`,
  `Personal training is included 1x/month on Standard and 4x/month on Premium.`,
].join("\n");
