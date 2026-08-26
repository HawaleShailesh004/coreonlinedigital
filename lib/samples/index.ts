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
  | "trader";

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
  | "Trader / D2C";

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
      "Turns walk-in-only enquiries into a same-day booking calendar, with WhatsApp confirmations and automatic follow-up reminders.",
    tags: ["Storefront", "Acquisition System"],
    demos: ["Appointment booking form", "Clinic hours table"],
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
      "Puts the display case online without listing a single price, then routes every enquiry to WhatsApp so the sale still closes in the showroom.",
    tags: ["Storefront"],
    demos: ["Collection grid", "Custom order enquiry"],
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
    name: "CA Practice Intake System",
    summary:
      "Screens and sorts client enquiries by service before they reach the partner's desk, with deadline reminders running in the background.",
    tags: ["Acquisition System"],
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
      "Qualifies site-visit requests by budget and intent before an agent spends a Sunday driving to the wrong property.",
    tags: ["Storefront", "Acquisition System"],
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
    name: "School Admissions Funnel",
    summary:
      "Handles admission enquiries and follow-up through the whole season, so a parent never waits on the office to call back.",
    tags: ["Storefront", "Acquisition System"],
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
      "Sells the destination first and the itinerary second, then captures trip enquiries with dates and budget already attached.",
    tags: ["Storefront", "Acquisition System"],
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
    name: "Gym Trial Booking + AI Chat",
    summary:
      "Answers the timing and pricing questions that flood a gym's WhatsApp inbox all day, and books the free trial inside the chat.",
    tags: ["Storefront", "Acquisition System", "AI Chat Agent"],
    demos: ["Live AI chat assistant", "Membership plans", "Free trial booking"],
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
      "Sells a point of view rather than a service list - the site itself has to prove the designer's taste before a word is read.",
    tags: ["Storefront"],
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
    name: "D2C Store + AI Chat + Automation",
    summary:
      "A working cart and checkout, an AI assistant handling stock and returns questions, and the post-order WhatsApp flow drawn out in full.",
    tags: ["Storefront", "Acquisition System", "AI Chat Agent", "Automation"],
    demos: [
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
];

export function getSample(slug: SampleSlug): Sample {
  const sample = samples.find((entry) => entry.slug === slug);
  if (!sample) throw new Error(`Unknown sample: ${slug}`);
  return sample;
}

export const samplesIndex = {
  eyebrow: "Sample builds",
  heading: "Nine verticals, nine different jobs to do.",
  sub: "Each of these is a complete concept build for a specific kind of business - its own palette, its own typography, its own conversion path. None of them look like each other, and none of them look like us. That is the point.",
  note: "Concept builds using fictional businesses and stand-in photography. Two carry a live AI chat assistant you can talk to.",
};
