/**
 * Copy for Sample 8 - Interior Designer.
 * Brief: samples/sample-8-interior-designer.md
 *
 * Positioning: sells taste, not a service checklist. A client is hiring a point
 * of view, so the copy stays short and gets out of the photography's way -
 * project labels read like gallery captions, not like listings.
 *
 * Project names and concepts follow the photography in lib/samples/media.ts, in
 * the same order as interiorMedia.projects.
 */

export const interior = {
  business: "Studio Kadam",
  brandNote: "Interior Design · Mumbai",

  nav: {
    links: [
      { label: "Portfolio", href: "#portfolio" },
      { label: "Process", href: "#process" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
    ],
    cta: { label: "Start Your Project", href: "#contact" },
  },

  hero: {
    eyebrow: "Interior Design Studio · Mumbai",
    headline: "Spaces designed around how you actually live.",
    sub: "Studio Kadam designs homes and offices that balance how a space looks with how it is actually used - from the first concept to the last light fixture.",
    primaryCta: "View Portfolio",
    secondaryCta: "Book a Consultation",
    caption: "Bandra West apartment · living room, completed 2024",
  },

  portfolio: {
    eyebrow: "Selected work",
    heading: "Six projects, six different briefs.",
    items: [
      {
        name: "Kalina House",
        label: "3BHK · Bandra West",
        concept:
          "A charcoal bedroom wing that stays calm at 11pm and workable at 7am.",
      },
      {
        name: "Carter Road Residence",
        label: "2BHK · Khar West",
        concept:
          "Cream, bouclé and two round mirrors, placed to carry west light deeper into the room.",
      },
      {
        name: "Matunga Family Home",
        label: "3BHK · Matunga East",
        concept:
          "Deep green joinery absorbs four generations of storage; the yellow chair is the only thing allowed to shout.",
      },
      {
        name: "Powai Lakeview",
        label: "4BHK · Powai",
        concept:
          "Timber and rust warm up a large open plan that had nowhere for a family to actually sit.",
      },
      {
        name: "Studio Nine",
        label: "Boutique Office · Andheri East",
        concept:
          "Black steel glazing gives an eleven-person studio four meeting rooms without losing the daylight.",
      },
      {
        name: "Worli Rental Reset",
        label: "1BHK Rental · Worli",
        concept:
          "A gallery wall and three movable pieces - nothing drilled that a landlord would notice.",
      },
    ],
  },

  process: {
    eyebrow: "Process",
    heading: "How a project comes together",
    sub: "Four stages, and you see a full design before any material is ordered.",
    steps: [
      {
        title: "Consultation",
        note: "One visit",
        body: "We walk the space, talk through how you use it, and agree a budget range before anything is drawn.",
      },
      {
        title: "Concept & Moodboard",
        note: "1–2 weeks",
        body: "Direction, palette and reference imagery - enough to know whether we are reading you correctly.",
      },
      {
        title: "Design & Material Selection",
        note: "3–5 weeks",
        body: "Layouts, joinery drawings and material samples you can hold, costed line by line.",
      },
      {
        title: "Execution & Styling",
        note: "8–16 weeks",
        body: "We run the contractors and vendors, then style the space before handover.",
      },
    ],
  },

  services: {
    eyebrow: "Services",
    heading: "Four ways to work together",
    items: [
      {
        name: "Full Home Design",
        body: "Concept to handover for the whole home - layouts, joinery, finishes, furniture and styling.",
      },
      {
        name: "Single Room Makeover",
        body: "One room reworked properly, usually a living room or a primary bedroom.",
      },
      {
        name: "Commercial & Office Spaces",
        body: "Studios, clinics and offices up to about 4,000 sq ft, planned around how the team works.",
      },
      {
        name: "Consultation Only",
        body: "A two-hour visit and a written direction, for clients who want to execute it themselves.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    heading: "About Aarti Kadam",
    paragraphs: [
      "Aarti trained in interior design at Sir J. J. School of Art and spent six years with a Mumbai architecture practice before starting the studio in 2016.",
      "She works on eight to ten projects a year, deliberately - every drawing that leaves this studio has been through her hands.",
      "Her one rule: a room should be planned around the hour you use it most, not the photograph you take of it once.",
    ],
    facts: [
      "Practising since 2010",
      "40+ completed projects",
      "Sir J. J. School of Art",
    ],
    detailCaption: "Material study · rust linen, oiled teak, lime plaster",
  },

  contact: {
    eyebrow: "Contact",
    heading: "Tell us about the space.",
    sub: "A first conversation is free and there is no proposal to sign at the end of it.",
    submit: "Send enquiry",
    successTitle: "Thank you - this is with the studio.",
    successBody:
      "Aarti reviews new enquiries herself and will reply within two working days to arrange a first visit.",
    note: "Aarti reviews new enquiries herself and replies within two working days.",
    projectTypes: [
      "Full home design",
      "Single room makeover",
      "Commercial / office",
      "Consultation only",
    ],
    budgets: [
      "Under ₹5 lakh",
      "₹5 – 15 lakh",
      "₹15 – 30 lakh",
      "₹30 lakh and above",
      "Not sure yet",
    ],
    studioEyebrow: "The studio",
    address: [
      "Unit 3, Trade House",
      "Kamala Mills, Lower Parel",
      "Mumbai 400013",
    ],
    phoneLabel: "+91 22 6178 4420",
    phoneHref: "tel:+912261784420",
    whatsappLabel: "WhatsApp the studio",
    whatsappHref: "https://wa.me/919920184420",
    instagramLabel: "@studio.kadam",
    instagramHref: "https://www.instagram.com/",
    instagramNote:
      "Current projects and material studies are posted as they happen.",
    hours: "Studio visits by appointment · Monday to Saturday",
    mapLabel: "Studio Kadam, Kamala Mills, Lower Parel",
    coords: { lat: 18.995, lon: 72.8258 },
  },

  bottomCta: {
    heading: "Let's talk about your space before you commit to anything.",
    cta: "Book a Consultation",
  },

  footer: {
    blurb:
      "An interior design studio in Lower Parel, Mumbai - homes and small commercial spaces, taken from concept through execution.",
    legal: "",
  },
};
