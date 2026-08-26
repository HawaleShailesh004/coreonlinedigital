/**
 * Copy for Sample 7 - Gym / Fitness Studio. Brief: samples/sample-7-gym.md
 * Multi-page expansion: samples/gym-site-full-build-doc.md
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

export type GymProgram = {
  name: string;
  /** Short line for home teaser cards. */
  teaser: string;
  /** Full 3–4 sentence description for the Programs page. */
  body: string;
  timing: string;
};

export type GymTrainer = {
  name: string;
  specialization: string;
  bio: string;
  certifications: string[];
};

export type GymFaq = {
  question: string;
  answer: string;
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

const faq: GymFaq[] = [
  {
    question: "Can I pause my membership?",
    answer:
      "Yes. Pause once per year for up to 30 days with 7 days' notice on WhatsApp. Your billing date shifts by the pause length - no restart fee.",
  },
  {
    question: "Is there a joining fee?",
    answer:
      "No. No joining fee, no locker deposit, and no annual maintenance charge on any plan.",
  },
  {
    question: "Do I need to sign a long contract?",
    answer:
      "No. Every plan is available month-to-month. Commit to three months for 10% off, or twelve months for 20% off - still cancel with 15 days' notice at the end of a paid term.",
  },
  {
    question: "What's included in the free trial?",
    answer:
      "One coached session on the floor or in a group class of your choice. No card required. Wear shoes you can lift in; we provide a locker for the visit.",
  },
  {
    question: "Can I bring a guest?",
    answer:
      "Standard and Premium members get two guest passes a month. Guests need a photo ID at the desk and must sign the waiver before training.",
  },
];

export const gym = {
  business: "FORGE",
  brandNote: "Strength Co. · Thane",

  nav: {
    links: [
      { label: "Programs", href: "/samples/gym/programs" },
      { label: "Membership", href: "/samples/gym/membership" },
      { label: "Trainers", href: "/samples/gym/trainers" },
      { label: "Contact", href: "/samples/gym/contact" },
    ],
    cta: { label: "Book a Free Trial", href: "/samples/gym/contact" },
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
    /** Home teaser heading. */
    heading: "Four ways to train here.",
    /** Programs page header. */
    pageHeading: "Train the way that actually works for you.",
    pageSub:
      "Strength, classes, one-to-one coaching and nutrition - pick a lane or mix them. Every program starts with a free trial session.",
    items: [
      {
        name: "Strength Training",
        teaser:
          "Racks, platforms and free weights, with a coach on the floor every hour we're open.",
        body: "The open floor is built for barbell work - racks, platforms, bumper plates and enough space that nobody is waiting on a squat. A coach is on the floor every hour we're open, so form checks and load jumps happen in real time, not on a whiteboard. Whether you're chasing a first pull-up or a heavier deadlift, the program is progressive and logged. Come for a free trial and leave with a clear next session, not a sales pitch.",
        timing: "Open floor · 6 AM – 10 PM",
      },
      {
        name: "Group Classes",
        teaser:
          "HIIT, Zumba and circuits that will genuinely wreck you, in the best way.",
        body: "Eighteen coached classes a week across HIIT, strength circuits, yoga and mobility, Zumba and spin. Sessions are capped so the coach can actually coach, not shout over a packed room. Book any class on WhatsApp or ask the chat assistant - no app download, no portal login. First-timers start with a free trial class in the format that fits their schedule.",
        timing: "18 classes a week",
      },
      {
        name: "Personal Training",
        teaser:
          "One coach, one plan, tracked week to week until the numbers move.",
        body: "One coach, one plan, reviewed every week until the numbers on the bar and the scale actually move. Sessions are programmed around your schedule, injury history and goal - strength, fat loss, sport prep or getting back into training after a break. Standard memberships include one PT session a month; Premium includes four. Book a free intro session to meet the coach before you commit to a block.",
        timing: "By appointment",
      },
      {
        name: "Nutrition Coaching",
        teaser:
          "Fuel the training. Simple targets, monthly reviews, no crash diets.",
        body: "Training only sticks when the plate matches the program. Nutrition coaching sets protein, calorie and meal-timing targets you can actually keep on a work week - no detoxes, no grocery lists from another planet. Premium members get a plan reviewed monthly; anyone can book a standalone consult after their free trial. We work alongside your coach so floor work and food aren't fighting each other.",
        timing: "Consults by appointment",
      },
    ] satisfies GymProgram[],
  },

  schedule: {
    eyebrow: "This week",
    heading: "Class timings.",
    sub: "Book any class on WhatsApp, or ask the chat assistant in the corner.",
    slots: schedule,
  },

  membership: {
    eyebrow: "Membership",
    heading: "Simple pricing. No surprise renewals.",
    sub: "Pay monthly and leave whenever. Three months takes 10% off, a year takes 20%.",
    plans,
    note: "No joining fee, no locker deposit, no annual maintenance charge.",
    faq,
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
    pageSub:
      "Certified coaches on the floor every hour we're open - not desk staff in branded shirts.",
    people: [
      {
        name: "Vikram Rane",
        specialization: "Head strength coach",
        bio: "Vikram built Forge's barbell programming and still coaches the morning open-floor blocks himself. Ten years of strength coaching, with a bias toward simple progressions that busy people actually finish. If your deadlift has stalled, he's the one who finds the missing five kilos.",
        certifications: ["CSCS", "ISSA Strength & Conditioning"],
      },
      {
        name: "Neha Sharma",
        specialization: "Group class lead",
        bio: "Neha runs HIIT, circuits and the evening energy that keeps the class board full. She coaches for intensity without ego - scaled options on every movement so beginners and regulars train in the same room. Expect clear demos, honest pacing, and a class that ends on time.",
        certifications: ["ACE Group Fitness", "Zumba Licensed Instructor"],
      },
      {
        name: "Arjun Patil",
        specialization: "Personal trainer",
        bio: "Arjun takes members from first-session nerves to a plan they can own. He specialises in fat-loss and return-to-training blocks, with weekly check-ins that stay short and specific. Most of his clients start on a free trial and stay because the program fits their week, not the other way around.",
        certifications: ["NASM-CPT", "Precision Nutrition L1"],
      },
      {
        name: "Priya Nair",
        specialization: "Conditioning & nutrition coach",
        bio: "Priya bridges conditioning work and nutrition coaching - the person you see when energy, recovery and food need to line up. She keeps targets simple enough for a Thane work week and reviews them monthly on Premium. Soft-spoken on the floor, ruthless about consistency.",
        certifications: ["ISSN Sports Nutrition", "Yoga Alliance RYT-200"],
      },
    ] satisfies GymTrainer[],
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
    timeSlots: [
      "Early morning (6 – 8 AM)",
      "Morning (8 – 11 AM)",
      "Afternoon (11 AM – 4 PM)",
      "Evening (4 – 7 PM)",
      "Night (7 – 10 PM)",
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
  `Programs: ${gym.programs.items.map((p) => p.name).join(", ")}.`,
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
  `Membership FAQ: ${faq.map((item) => `${item.question} ${item.answer}`).join(" | ")}.`,
  `Free trial: the first session is free, no card and no commitment required.`,
  `Personal training is included 1x/month on Standard and 4x/month on Premium.`,
  `Trainers: ${gym.trainers.people
    .map(
      (t) =>
        `${t.name} (${t.specialization}; certs: ${t.certifications.join(", ")})`,
    )
    .join("; ")}.`,
].join("\n");
