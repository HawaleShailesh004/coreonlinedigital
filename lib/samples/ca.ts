/**
 * Copy for Sample 3 - CA / Professional Services.
 * Brief: samples/sample-3-ca-professional.md
 *
 * Positioning: sells competence and reliability, nothing else. This is the most
 * conservative page in the portfolio on purpose - the client is handing over
 * money and compliance, so "designed" reads as risk. Information density is the
 * feature: more text per section than any other sample, in lists and tables.
 */

export const ca = {
  business: "Deshmukh & Associates",
  brandNote: "Chartered Accountants · Mumbai",

  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Calendar", href: "#calendar" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Book a Consultation", href: "#contact" },
  },

  hero: {
    eyebrow: "Chartered Accountants · Mumbai",
    headline:
      "Your filings, audits and compliance - handled before the deadline worries you.",
    sub: "Deshmukh & Associates manages tax filing, GST, audits and financial planning for individuals and small businesses, with direct access to the person handling your case - not a call centre.",
    primaryCta: "Book a Consultation",
    secondaryCta: "View Services",
    credential: "ICAI Member · M. No. 118472",
    facts: [
      { label: "In practice since", value: "2006" },
      { label: "Returns filed a year", value: "600+" },
      { label: "Statutory audits a year", value: "40+" },
      { label: "Clients on retainer", value: "120+" },
    ],
  },

  /** A live panel is the right hero asset here: it proves the product, which is
   *  organisation, rather than decorating around it. */
  deadlines: {
    title: "Next statutory dates",
    note: "Updated for the current quarter. Clients get a reminder seven days and one day before each.",
    items: [
      { date: "11 Sep", label: "GSTR-1", who: "Monthly filers" },
      {
        date: "15 Sep",
        label: "Advance tax, Q2",
        who: "Individuals & companies",
      },
      { date: "20 Sep", label: "GSTR-3B", who: "Monthly filers" },
      { date: "30 Sep", label: "Tax audit report", who: "Audited assessees" },
    ],
  },

  services: {
    eyebrow: "Services",
    heading: "Four practice areas, handled end to end.",
    sub: "Engagements are quoted as an annual retainer or per filing. Either way you get a fixed fee in writing before any work starts.",
    items: [
      {
        name: "Income Tax Filing",
        body: "Individual and business returns, with planning included rather than sold separately. We reconcile Form 26AS and AIS against your books before filing, so a mismatch notice does not arrive six months later.",
        points: [
          "ITR-1 to ITR-6, including capital gains and foreign income",
          "Advance tax computed and scheduled across all four instalments",
          "Notice and scrutiny handling under sections 139(9), 143(1) and 148",
        ],
        fee: "From ₹3,500 per return",
      },
      {
        name: "GST Registration & Filing",
        body: "Monthly and quarterly compliance handled end to end, from registration and amendments through to annual return. Input credit is reconciled against GSTR-2B every month, not at year end.",
        points: [
          "GSTR-1, GSTR-3B, and GSTR-9 / 9C annual reconciliation",
          "Input tax credit matched monthly against GSTR-2B",
          "LUT filing and refund applications for exporters",
        ],
        fee: "From ₹2,000 per month",
      },
      {
        name: "Audit & Assurance",
        body: "Statutory and internal audits for small and mid-size businesses, plus tax audit under section 44AB. Findings come with a written management letter, so you get something usable rather than only a signed report.",
        points: [
          "Statutory audit under the Companies Act, 2013",
          "Tax audit under section 44AB and transfer pricing certification",
          "Internal audit and internal financial controls review",
        ],
        fee: "Quoted per engagement",
      },
      {
        name: "Financial & Tax Planning",
        body: "Advisory to reduce liability legally and ahead of the deadline, not in the last week of March. Covers business structure, salary and dividend mix, capital gains timing and succession.",
        points: [
          "Entity structuring - proprietorship, LLP or private limited",
          "Capital gains planning, including 54 and 54F exemptions",
          "NRI residency, DTAA relief and repatriation certificates",
        ],
        fee: "₹5,000 consultation, adjusted against the engagement",
      },
    ],
  },

  why: {
    eyebrow: "Why us",
    heading: "Direct access, not a queue.",
    points: [
      {
        title: "You work with the CA on your case",
        body: "The partner who signs your return is the person you speak to. Nothing is handed to a junior and re-explained back to you.",
      },
      {
        title: "Deadline reminders sent automatically",
        body: "Every due date on your calendar is tracked in our system, with reminders a week and a day ahead. Nothing gets missed because someone forgot to call.",
      },
      {
        title: "Documents shared securely, tracked in one place",
        body: "One folder per client per year, with an acknowledgement for every document received. No chasing attachments across three WhatsApp threads.",
      },
    ],
  },

  calendar: {
    eyebrow: "Compliance calendar",
    heading: "The dates we track for you.",
    sub: "The full statutory calendar for a small business in FY 2025-26. Your engagement covers the rows that apply to you; reminders are automatic.",
    rows: [
      {
        due: "11th monthly",
        item: "GSTR-1",
        detail: "Outward supplies statement",
        who: "Monthly GST filers",
      },
      {
        due: "20th monthly",
        item: "GSTR-3B",
        detail: "Summary return and tax payment",
        who: "Monthly GST filers",
      },
      {
        due: "7th monthly",
        item: "TDS / TCS deposit",
        detail: "Challan 281 payment",
        who: "All deductors",
      },
      {
        due: "31 Jul",
        item: "Form 24Q / 26Q",
        detail: "Quarterly TDS return, Q1",
        who: "All deductors",
      },
      {
        due: "15 Jun · 15 Sep · 15 Dec · 15 Mar",
        item: "Advance tax",
        detail: "Instalments at 15, 45, 75 and 100 per cent",
        who: "Liability above ₹10,000",
      },
      {
        due: "31 Jul",
        item: "ITR filing",
        detail: "Non-audit individuals and firms",
        who: "Salaried and small business",
      },
      {
        due: "30 Sep",
        item: "Tax audit report",
        detail: "Form 3CA / 3CB and 3CD",
        who: "Turnover above the 44AB limit",
      },
      {
        due: "31 Oct",
        item: "ITR filing, audited",
        detail: "Companies and audited assessees",
        who: "Audited assessees",
      },
      {
        due: "31 Dec",
        item: "GSTR-9 / 9C",
        detail: "Annual return and reconciliation",
        who: "Turnover above ₹2 crore",
      },
    ],
  },

  about: {
    eyebrow: "About the practice",
    heading: "About Ketan Deshmukh, CA",
    credentials: "FCA · ICAI Membership No. 118472 · B.Com (Mumbai)",
    paragraphs: [
      "Ketan Deshmukh qualified with the Institute of Chartered Accountants of India in 2005 and started the practice in Dadar the following year, after three years in the audit division of a mid-tier firm.",
      "The practice works with owner-managed businesses - manufacturing units in Bhiwandi, professional firms, and a long-standing NRI taxation panel - and deliberately stays small enough that the partner reviews every file that leaves the office.",
    ],
    memberships: [
      "Institute of Chartered Accountants of India (ICAI)",
      "Bombay Chartered Accountants' Society",
      "Registered valuer, securities and financial assets",
    ],
  },

  contact: {
    eyebrow: "Contact",
    heading: "Book a consultation.",
    sub: "Tell us which service you need and we will confirm a slot within one working day. First consultation runs 30 minutes, in the office or over a call.",
    submit: "Request a consultation",
    successTitle: "Request received.",
    successBody:
      "We will confirm a slot within one working day. If your deadline is inside a week, call the office directly and we will make room.",
    note: "Demo form - this sample is not connected to a live practice management system.",
    serviceOptions: [
      "Income tax filing",
      "GST registration & filing",
      "Audit & assurance",
      "Financial & tax planning",
      "NRI taxation",
      "Something else",
    ],
  },

  office: {
    eyebrow: "The office",
    heading: "Where to find us.",
    address: [
      "3rd Floor, Sundervilla",
      "Dr. Ambedkar Road, Dadar East",
      "Mumbai 400014",
    ],
    phoneLabel: "+91 22 2414 6820",
    phoneHref: "tel:+912224146820",
    whatsappLabel: "WhatsApp the office",
    whatsappHref: "https://wa.me/919920146820",
    emailLabel: "office@deshmukhca.in",
    emailHref: "mailto:office@deshmukhca.in",
    coords: { lat: 19.0186, lon: 72.848 },
    hours: [
      { day: "Monday – Friday", time: "10:00 AM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    parkingNote:
      "Five minutes from Dadar station, east side. Visitor parking in the building compound.",
  },

  bottomCta: {
    heading: "Don't wait for the deadline to find a CA.",
    body: "Book a consultation today. We will tell you what applies to you and what it costs before you commit to anything.",
    cta: "Book a Consultation",
  },

  footer: {
    blurb:
      "A chartered accountancy practice in Dadar East, Mumbai - income tax, GST, statutory and tax audit, and advisory for individuals and owner-managed businesses.",
    legal: "This is a concept build, not a real practice.",
  },
};
