/**
 * Copy for Sample 10 - Coaching Classes / Tuition Institute.
 * Brief: samples/coaching-classes-site-full-build-doc.md
 *
 * Positioning: sells proof of results to parents and adult students —
 * scores improved, exams cleared, skills gained. Distinct from School
 * (belonging / small-class trust): here the outcome data carries the sale.
 */

export type CoachingCourse = {
  slug: string;
  name: string;
  target: string;
  duration: string;
  fee: string;
  feeNote: string;
  teaser: string;
  body: string;
  schedule: { day: string; time: string }[];
};

export type CoachingFaculty = {
  name: string;
  subject: string;
  qualification: string;
  years: number;
  credibility: string;
};

export type ResultCallout = {
  name: string;
  achievement: string;
  line: string;
};

export type BatchResultRow = {
  year: string;
  batch: string;
  enrolled: number;
  cleared: number;
  topPercentile: string;
};

const courses: CoachingCourse[] = [
  {
    slug: "jee-two-year",
    name: "JEE Main + Advanced · Two-Year",
    target: "JEE Main & Advanced",
    duration: "24 months · Class 11 entry",
    fee: "₹1,85,000",
    feeNote: "Full programme · payable in 4 instalments",
    teaser:
      "Physics, Chemistry and Maths from first principles through Advanced-level problem sets, with fortnightly full mocks.",
    body: "Built for students entering Class 11 who want a measured path to JEE Main and Advanced — not a scramble in Class 12. Weekly chapter tests, fortnightly full-length mocks, and a rank-predictor dashboard so parents see progress in numbers, not vibes. Small sections (max 28) so doubt sessions stay real.",
    schedule: [
      { day: "Mon · Wed · Fri", time: "5:30 – 8:30 PM" },
      { day: "Saturday", time: "9:00 AM – 1:00 PM (mock / revision)" },
      { day: "Sunday", time: "Doubts by appointment" },
    ],
  },
  {
    slug: "jee-one-year",
    name: "JEE Main + Advanced · One-Year",
    target: "JEE Main & Advanced",
    duration: "12 months · Class 12 / droppers",
    fee: "₹1,45,000",
    feeNote: "Full programme · payable in 3 instalments",
    teaser:
      "Compressed syllabus coverage with heavy mock density — for Class 12 and serious droppers who already know the basics.",
    body: "For Class 12 students and droppers who need volume and feedback, not another slow theory pass. Daily practice sets, three full mocks a month, and a personal scorecard after every test. Mentors flag weak chapters within 48 hours of each mock so the next week is spent closing gaps, not guessing.",
    schedule: [
      { day: "Tue · Thu · Sat", time: "5:30 – 8:30 PM" },
      { day: "Sunday", time: "8:00 AM – 12:00 PM (full mock)" },
      { day: "Weekdays", time: "Doubt desk 4:00 – 5:15 PM" },
    ],
  },
  {
    slug: "neet-two-year",
    name: "NEET UG · Two-Year",
    target: "NEET UG",
    duration: "24 months · Class 11 entry",
    fee: "₹1,75,000",
    feeNote: "Full programme · payable in 4 instalments",
    teaser:
      "Biology-led with Physics and Chemistry paced to NEET pattern — NCERT depth first, then PYQ volume.",
    body: "Biology owns the timetable; Physics and Chemistry are paced to NEET's question mix rather than board chapter order. NCERT line-by-line for Bio, then PYQ and assertion-reason drills. Monthly full NEET mocks under exam conditions, with All-India percentile shared with parents the same week.",
    schedule: [
      { day: "Mon · Wed · Fri", time: "5:30 – 8:30 PM" },
      { day: "Saturday", time: "2:00 – 6:00 PM (Bio + mock review)" },
      { day: "Sunday", time: "Doubts by appointment" },
    ],
  },
  {
    slug: "boards-pcm",
    name: "Class 11–12 Boards · PCM",
    target: "Maharashtra / CBSE Boards + JEE Main base",
    duration: "Academic year · renewable",
    fee: "₹72,000",
    feeNote: "Per academic year · books & test series included",
    teaser:
      "Board-first Physics, Chemistry and Maths with enough Main-level stretch that JEE aspirants stay covered.",
    body: "For students whose primary goal is a strong board percentage, with optional Main-level stretch modules. Chapter tests map to the board blueprint; pre-boards run in December and January under timed conditions. Parents get a term report with subject averages and attendance — the same clarity we use for competitive batches.",
    schedule: [
      { day: "Tue · Thu", time: "5:30 – 8:00 PM" },
      { day: "Saturday", time: "10:00 AM – 1:00 PM" },
      { day: "Before boards", time: "Daily revision blocks (Dec–Feb)" },
    ],
  },
  {
    slug: "boards-pcb",
    name: "Class 11–12 Boards · PCB",
    target: "Maharashtra / CBSE Boards + NEET base",
    duration: "Academic year · renewable",
    fee: "₹72,000",
    feeNote: "Per academic year · books & test series included",
    teaser:
      "Board Biology, Physics and Chemistry with NEET-aware depth where it helps — without ignoring the board paper.",
    body: "Board paper patterns lead; NEET-style depth is added where it raises board scores and keeps medical aspirants warm. Practical viva prep and diagram drills are timetabled, not left to the last fortnight. Same term reports and attendance tracking as the PCM board batch.",
    schedule: [
      { day: "Mon · Wed", time: "5:30 – 8:00 PM" },
      { day: "Saturday", time: "10:00 AM – 1:00 PM" },
      { day: "Before boards", time: "Daily revision blocks (Dec–Feb)" },
    ],
  },
  {
    slug: "test-series",
    name: "All-India Test Series",
    target: "JEE Main / Advanced · NEET UG",
    duration: "6 months · mocks only",
    fee: "₹28,000",
    feeNote: "Includes 18 full mocks + detailed solutions",
    teaser:
      "Eighteen full-length mocks with All-India ranks — for students already enrolled elsewhere who need honest comparison.",
    body: "Weekend mocks under strict exam conditions, scanned OMR / CBT as applicable, and a percentile report within 48 hours. Solutions and video walkthroughs for every paper. Designed for students who already have a teacher but need a ranking signal before the real attempt.",
    schedule: [
      { day: "Alternate Sundays", time: "9:00 AM – 12:00 PM (JEE)" },
      { day: "Alternate Sundays", time: "2:00 – 5:00 PM (NEET)" },
      { day: "Tuesday after mock", time: "Review class 6:00 – 8:00 PM" },
    ],
  },
];

const faculty: CoachingFaculty[] = [
  {
    name: "Dr. Aniket Deshmukh",
    subject: "Physics · JEE Advanced",
    qualification: "PhD Physics, IIT Bombay",
    years: 14,
    credibility:
      "Ex-FIITJEE senior faculty; 40+ Advanced selections from his Thane batches since 2019.",
  },
  {
    name: "Meera Kulkarni",
    subject: "Chemistry · Organic & Physical",
    qualification: "MSc Chemistry, University of Mumbai",
    years: 11,
    credibility:
      "Known for mechanism maps that stick — her organic notes circulate across three Thane centres.",
  },
  {
    name: "Rahul Sawant",
    subject: "Mathematics · JEE Main & Advanced",
    qualification: "BTech, COEP Pune",
    years: 9,
    credibility:
      "Writes every mock paper in-house; average Main maths score in his sections: 78/100 (2025).",
  },
  {
    name: "Dr. Sneha Patil",
    subject: "Biology · NEET UG",
    qualification: "MBBS, Grant Medical College",
    years: 8,
    credibility:
      "NCERT-line teaching with clinical asides — 92% of her 2025 NEET batch cleared the cutoff.",
  },
  {
    name: "Vikrant Joshi",
    subject: "Physics · Boards & Main",
    qualification: "MSc Physics, Fergusson College",
    years: 12,
    credibility:
      "Board-first coach; last three PCM batches averaged 91% in Physics at HSC.",
  },
  {
    name: "Priya Nambiar",
    subject: "Mentorship & Test Analytics",
    qualification: "MEd, SNDT · Data analytics cert",
    years: 7,
    credibility:
      "Owns the scorecard system parents see — every mock mapped to chapter-level gaps within 48 hours.",
  },
];

const batchResults: BatchResultRow[] = [
  {
    year: "2025",
    batch: "JEE Two-Year",
    enrolled: 56,
    cleared: 49,
    topPercentile: "99.7 (AIR 412)",
  },
  {
    year: "2025",
    batch: "JEE One-Year",
    enrolled: 42,
    cleared: 34,
    topPercentile: "99.2 (AIR 1,840)",
  },
  {
    year: "2025",
    batch: "NEET Two-Year",
    enrolled: 48,
    cleared: 44,
    topPercentile: "AIR 286",
  },
  {
    year: "2024",
    batch: "JEE Two-Year",
    enrolled: 52,
    cleared: 45,
    topPercentile: "99.5 (AIR 690)",
  },
  {
    year: "2024",
    batch: "NEET Two-Year",
    enrolled: 44,
    cleared: 39,
    topPercentile: "AIR 410",
  },
  {
    year: "2024",
    batch: "Boards PCM",
    enrolled: 68,
    cleared: 68,
    topPercentile: "Avg 89.6%",
  },
];

const callouts: ResultCallout[] = [
  {
    name: "Aarav Mehta",
    achievement: "JEE Advanced AIR 412 · 2025",
    line: "Two-year batch — Physics went from 42 to 88 in Main mocks before Advanced.",
  },
  {
    name: "Ishita Rao",
    achievement: "NEET AIR 286 · 2025",
    line: "Cleared on first attempt; Bio scorecard stayed above 320 after December.",
  },
  {
    name: "Siddharth Kulkarni",
    achievement: "JEE Main 99.2 %ile · 2025",
    line: "One-year dropper batch — Maths mentorship fixed the April panic pattern.",
  },
  {
    name: "Ananya Desai",
    achievement: "HSC PCM 94.2% · 2025",
    line: "Board batch with Main stretch modules — Chemistry practical viva scored full.",
  },
  {
    name: "Rohan Pawar",
    achievement: "NEET AIR 1,104 · 2024",
    line: "Second attempt; fortnightly mocks made the weak Physics chapters visible early.",
  },
  {
    name: "Kavya Iyer",
    achievement: "JEE Advanced AIR 1,840 · 2025",
    line: "One-year batch — cleared Advanced after missing it by 12 marks the year before.",
  },
];

const toppers = [
  { year: "2025", name: "Aarav Mehta", result: "JEE Adv AIR 412" },
  { year: "2025", name: "Ishita Rao", result: "NEET AIR 286" },
  { year: "2025", name: "Siddharth Kulkarni", result: "JEE Main 99.2 %ile" },
  { year: "2024", name: "Neha Salvi", result: "JEE Adv AIR 690" },
  { year: "2024", name: "Rohan Pawar", result: "NEET AIR 1,104" },
  { year: "2024", name: "Devansh Shah", result: "HSC PCM 96.8%" },
];

export const coaching = {
  business: "Summit Prep",
  brandNote: "Competitive Coaching · Thane",

  nav: {
    links: [
      { label: "Courses", href: "/samples/coaching/courses" },
      { label: "Results", href: "/samples/coaching/results" },
      { label: "Faculty", href: "/samples/coaching/faculty" },
      { label: "Contact", href: "/samples/coaching/contact" },
    ],
    cta: { label: "Book Free Demo", href: "/samples/coaching/enroll" },
  },

  hero: {
    eyebrow: "Admissions Open — April 2026 Batch",
    headline: "Results you can actually measure, not just promises.",
    sub: "Summit Prep runs focused JEE, NEET and Class 11–12 board batches in Thane with real outcome tracking — so you always know if it's working, not just hoping it is.",
    primaryCta: "View Results",
    secondaryCta: "Book Free Demo",
  },

  courses: {
    eyebrow: "Courses",
    heading: "Batches built around one exam, not a vague syllabus.",
    pageHeading: "Choose the batch that fits your goal.",
    pageSub:
      "Every programme lists duration, weekly schedule and fee up front. Book a free demo class before you commit to a seat.",
    items: courses,
  },

  results: {
    eyebrow: "Results",
    heading: "The scoreboard, not the brochure.",
    pageHeading: "The numbers, not just the promise.",
    pageSub:
      "Pass rates, percentile bands and named outcomes from recent batches. This is what parents ask for on the first call — we put it on the page.",
    stats: [
      {
        value: 87,
        suffix: "%",
        label: "Batch clearing rate",
        detail: "JEE Main qualifying · 2024–25 combined",
      },
      {
        value: 42,
        suffix: "",
        label: "Avg. score lift",
        detail: "Points gained across 6 months of mocks",
      },
      {
        value: 120,
        suffix: "+",
        label: "Selections",
        detail: "IIT / NIT / medical seats · last 3 years",
      },
      {
        value: 28,
        suffix: "",
        label: "Max batch size",
        detail: "Hard cap per classroom section",
      },
    ],
    table: {
      eyebrow: "By batch",
      heading: "Year-by-year outcomes",
      rows: batchResults,
    },
    callouts: {
      eyebrow: "Student outcomes",
      heading: "Names and numbers, not vague praise.",
      items: callouts,
    },
    toppers: {
      eyebrow: "Toppers",
      heading: "Highest ranks by year",
      items: toppers,
    },
  },

  faculty: {
    eyebrow: "Faculty",
    heading: "Teachers whose results travel by word of mouth.",
    pageHeading: "The people who own the numbers.",
    pageSub:
      "Subject specialists with years in competitive classrooms — not rotating guest lecturers. Bios below are what parents ask for before paying a deposit.",
    people: faculty,
  },

  enroll: {
    eyebrow: "Admissions",
    heading: "Book a free demo class before you decide.",
    sub: "Sit one class, meet the mentor, see a sample scorecard. No fee for the demo; seat offers go out within three working days of the assessment.",
    process: {
      eyebrow: "What happens next",
      heading: "Four steps from enquiry to first week.",
      steps: [
        {
          title: "Demo Class",
          body: "One free session in the batch you're considering — same timing, same teacher, same room.",
        },
        {
          title: "Assessment",
          body: "A short diagnostic (45–60 min) so we place you in the right section, not the fullest one.",
        },
        {
          title: "Batch Assignment",
          body: "We share seat availability, fee schedule and mentor name in writing on WhatsApp.",
        },
        {
          title: "Start",
          body: "Books and login issued; first fortnightly mock appears on your parent scorecard.",
        },
      ],
    },
    form: {
      submit: "Book my free demo",
      successTitle: "Demo request received.",
      successBody:
        "We'll confirm the slot on WhatsApp within one working day and tell you which classroom to find.",
      note: "Demo form — this sample isn't wired to a live admissions desk.",
    },
  },

  contact: {
    eyebrow: "Visit",
    heading: "Come see a classroom mid-lesson.",
    sub: "Office hours cover walk-ins for fee queries and demo bookings. Batch timings below are the evening and weekend blocks most parents ask about first.",
    address: [
      "2nd Floor, Siddhi Vinayak Arcade",
      "Gokhale Road, Naupada",
      "Thane West 400602",
    ],
    phoneLabel: "+91 22 2547 3300",
    phoneHref: "tel:+912225473300",
    whatsappLabel: "WhatsApp admissions",
    whatsappHref: "https://wa.me/919820033047",
    coords: { lat: 19.1872, lon: 72.9754 },
    officeHours: [
      { day: "Monday – Saturday", time: "10:00 AM – 8:00 PM" },
      { day: "Sunday", time: "9:00 AM – 1:00 PM (demo / mocks only)" },
    ],
    batchOverview: [
      {
        label: "Weekday evenings",
        time: "5:30 – 8:30 PM",
        note: "JEE / NEET long programmes",
      },
      {
        label: "Saturday blocks",
        time: "9:00 AM – 6:00 PM",
        note: "Mocks, Bio labs, board revision",
      },
      {
        label: "Sunday",
        time: "8:00 AM – 12:00 PM",
        note: "Full-length mocks · one-year batch",
      },
      {
        label: "Doubt desk",
        time: "Weekdays 4:00 – 5:15 PM",
        note: "Walk-in for enrolled students",
      },
    ],
  },

  bottomCta: {
    heading: "See the results page, then book a demo.",
    body: "If the numbers hold up for your exam goal, sit one free class before you pay anything.",
    primaryCta: "View Results",
    secondaryCta: "Book Free Demo",
  },

  footer: {
    blurb:
      "JEE, NEET and board coaching in Naupada, Thane — batches capped, fees published, results tracked.",
    legal: "This is a concept build, not a real coaching institute.",
  },
};

export const coachingCourseOptions = coaching.courses.items.map((c) => c.name);
