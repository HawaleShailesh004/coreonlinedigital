/**
 * Registry for the sample vertical sites under /samples.
 *
 * These are concept builds, not client work. Each one is briefed in
 * /samples/sample-*.md - copy, palette and motion decisions live there and are
 * argued for, so read the brief before changing a sample's direction.
 *
 * The businesses named here are fictional. Sample pages are noindex for that
 * reason; the indexed /work page is what describes them publicly.
 */

export type SampleSlug =
  | "clinic"
  | "jeweller"
  | "ca"
  | "realty"
  | "school"
  | "travel"
  | "gym"
  | "interior"
  | "trader"
  | "coaching";

/** Shown on the Coreline Work page filter tabs. */
export type SampleIndustry =
  | "Clinic"
  | "Jeweller"
  | "CA / Professional"
  | "School"
  | "Real Estate"
  | "Travel"
  | "Gym"
  | "Interior Design"
  | "Trader / D2C"
  | "Coaching";

export type Sample = {
  slug: SampleSlug;
  /** Matches the sample-N-*.md brief number. */
  order: number;
  industry: SampleIndustry;
  /** Fictional business the sample is built for. */
  business: string;
  city: string;
  /** What the sample is called on the Work page. */
  name: string;
  /** The business problem the build solves, in one line. */
  summary: string;
  /** Which Coreline service lines the build demonstrates. */
  tags: string[];
  /** Interactive pieces worth clicking on a call. */
  demos: string[];
  palette: {
    name: string;
    /** bg, primary, accent - drawn as swatches on the samples index. */
    swatches: [string, string, string];
    dark: boolean;
  };
};

export const samples: Sample[] = [
  {
    slug: "clinic",
    order: 1,
    industry: "Clinic",
    business: "Meridian Family Clinic",
    city: "Thane",
    name: "Family Clinic Booking Site",
    summary:
      "Patients book a slot themselves instead of walking in and waiting, and get a WhatsApp confirmation plus a reminder before the appointment.",
    tags: ["Website", "Booking", "WhatsApp automation"],
    demos: [
      "Multi-page clinic site",
      "Appointment booking form",
      "Clinic hours table",
    ],
    palette: {
      name: "Clinical Calm",
      swatches: ["#fafbfa", "#3d8b7d", "#e8a13f"],
      dark: false,
    },
  },
  {
    slug: "jeweller",
    order: 2,
    industry: "Jeweller",
    business: "Vasant & Sons",
    city: "Thane",
    name: "Jeweller Collection Catalogue",
    summary:
      "Puts the display case online without listing a single price, so people arrive at the showroom already knowing what they want to see.",
    tags: ["Website", "Enquiry capture"],
    demos: [
      "Multi-page jeweller site",
      "Editorial collections",
      "Custom order enquiry",
      "Private viewing booking",
    ],
    palette: {
      name: "Warm Gold on Ink",
      swatches: ["#0f0d0a", "#c9a55c", "#f7f1e5"],
      dark: true,
    },
  },
  {
    slug: "ca",
    order: 3,
    industry: "CA / Professional",
    business: "Deshmukh & Associates",
    city: "Mumbai",
    name: "CA Practice Intake",
    summary:
      "Sorts enquiries by service before they reach the partner's desk, so nobody spends twenty minutes finding out the caller wanted something else.",
    tags: ["Website", "Enquiry capture", "WhatsApp automation"],
    demos: ["Service-routed intake form", "Compliance calendar"],
    palette: {
      name: "Ledger Navy",
      swatches: ["#ffffff", "#1e3a6e", "#b8934a"],
      dark: false,
    },
  },
  {
    slug: "realty",
    order: 4,
    industry: "Real Estate",
    business: "Keystone Properties",
    city: "Thane",
    name: "Realty Listings Front Door",
    summary:
      "Asks about budget and timeline before a site visit is booked, so agents stop losing Sundays driving to the wrong property.",
    tags: ["Website", "Enquiry capture", "Booking"],
    demos: ["Verified listings grid", "Budget-qualified enquiry form"],
    palette: {
      name: "Warm Stone",
      swatches: ["#f7f5f1", "#5b6b5e", "#c08a4e"],
      dark: false,
    },
  },
  {
    slug: "school",
    order: 5,
    industry: "School",
    business: "Brightfield Academy",
    city: "Thane",
    name: "School Admissions Site",
    summary:
      "Handles admission enquiries through the whole season, so a parent asking about fees at 10pm doesn't wait until the office opens.",
    tags: ["Website", "Booking", "WhatsApp automation"],
    demos: ["Admissions process stepper", "Campus visit booking"],
    palette: {
      name: "Warm Academic",
      swatches: ["#fdfbf6", "#2f5d8a", "#e08c3e"],
      dark: false,
    },
  },
  {
    slug: "travel",
    order: 6,
    industry: "Travel",
    business: "Sahyadri Trails",
    city: "Pune",
    name: "Tour Operator Package Site",
    summary:
      "Shows the packages and the prices up front, then collects trip enquiries with dates and budget already attached.",
    tags: ["Website", "Enquiry capture"],
    demos: ["Package grid with live pricing", "Custom trip planner form"],
    palette: {
      name: "Horizon",
      swatches: ["#faf7f0", "#1f5c63", "#e5793a"],
      dark: false,
    },
  },
  {
    slug: "gym",
    order: 7,
    industry: "Gym",
    business: "Forge Strength Co.",
    city: "Thane",
    name: "Gym Trial Booking + Assistant",
    summary:
      "Answers the fees-and-timings questions that flood a gym's WhatsApp all day, and books the free trial inside the chat. This one is live - talk to it.",
    tags: ["Website", "AI chat assistant", "Booking"],
    demos: [
      "Multi-page gym site",
      "Live AI chat assistant",
      "Membership plans",
      "Free trial booking",
    ],
    palette: {
      name: "Kinetic",
      swatches: ["#101010", "#e13b3b", "#d4ff3f"],
      dark: true,
    },
  },
  {
    slug: "interior",
    order: 8,
    industry: "Interior Design",
    business: "Studio Kadam",
    city: "Mumbai",
    name: "Interior Design Portfolio",
    summary:
      "Shows past work properly, so someone can judge the taste before calling instead of asking for photos on WhatsApp.",
    tags: ["Website", "Enquiry capture"],
    demos: ["Project gallery", "Process walkthrough"],
    palette: {
      name: "Studio Neutral",
      swatches: ["#f5f3ee", "#8a7a63", "#b5482e"],
      dark: false,
    },
  },
  {
    slug: "trader",
    order: 9,
    industry: "Trader / D2C",
    business: "Nilaya Home",
    city: "Thane",
    name: "Online Store + Assistant",
    summary:
      "Takes orders through a working cart, answers stock and returns questions in chat, and sends the after-order WhatsApp messages on its own.",
    tags: ["Website", "Online store", "AI chat assistant", "WhatsApp automation"],
    demos: [
      "Multi-page shop",
      "Working cart & checkout",
      "Live AI chat assistant",
      "Post-order automation flow",
    ],
    palette: {
      name: "Clean Commerce",
      swatches: ["#ffffff", "#2f6f5e", "#e8622e"],
      dark: false,
    },
  },
  {
    slug: "coaching",
    order: 10,
    industry: "Coaching",
    business: "Summit Prep",
    city: "Thane",
    name: "Coaching Classes Results Site",
    summary:
      "Puts batch fees and last year's results where parents can see them - the first thing they ask and the last thing most classes publish.",
    tags: ["Website", "Enquiry capture", "Booking"],
    demos: [
      "Multi-page coaching site",
      "Results scoreboard with count-up",
      "Transparent batch fees",
      "Demo class enrolment form",
    ],
    palette: {
      name: "Momentum Violet",
      swatches: ["#FAF8FC", "#5B3A8E", "#E3B23C"],
      dark: false,
    },
  },
];

export function getSample(slug: SampleSlug): Sample {
  const sample = samples.find((entry) => entry.slug === slug);
  if (!sample) throw new Error(`Unknown sample: ${slug}`);
  return sample;
}

export const samplesIndex = {
  eyebrow: "Sample sites",
  heading: "Ten verticals, ten different jobs to do.",
  sub: "Each one is a complete build for a specific kind of business - its own palette, its own typography, its own path to an enquiry. None of them look like each other. That's the point: your site shouldn't look like anyone else's either.",
  note: "Fictional businesses and stand-in photography. Two carry a live assistant you can talk to.",
};
