/**
 * Copy for Sample 6 - Travel Agency / Tour Operator.
 * Brief: samples/sample-6-travel-agency.md
 *
 * Positioning: sells a feeling before it sells an itinerary. The buyer browses
 * emotionally (photo, destination) and evaluates logistically second (price,
 * dates, inclusions) - so the page opens on a horizon, not on a form.
 *
 * Package names follow the photography in lib/samples/media.ts. This is a Pune
 * operator running trips across India, not a Sahyadri-only trekking outfit, so
 * the six destinations span the Ghats, the Himalaya, the Ganga and the coast.
 */

export const travel = {
  business: "Sahyadri Trails",
  brandNote: "Tour Operator · Pune",

  nav: {
    links: [
      { label: "Packages", href: "#packages" },
      { label: "How It Works", href: "#how" },
      { label: "Why Us", href: "#why" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Plan My Trip", href: "#contact" },
  },

  hero: {
    eyebrow: "Group tours & custom trips · Pune based",
    headline: "Trips planned properly, so all you do is show up.",
    sub: "Sahyadri Trails handles the stays, transport, permits and day-by-day plan for trips across India - so you spend your time deciding what to see, not how to book it.",
    primaryCta: "View Packages",
    secondaryCta: "Talk to a Trip Planner",
    trust: [
      "Running trips since 2012",
      "Groups of 8–16, never 40",
      "Fixed price, written down",
    ],
  },

  packages: {
    eyebrow: "Featured packages",
    heading: "Six trips we run again and again.",
    sub: "Fixed departure dates through the year, and every one of these can be rebuilt as a private trip for your own group.",
    priceNote: "starting from",
    ctaLabel: "See the itinerary",
    items: [
      {
        name: "Coorg & Wayanad Coffee Trail",
        duration: "5 days · 4 nights",
        price: "₹18,500",
        blurb:
          "Estate stays deep in the Ghats, forest walks at first light, and the drive between the two done in daylight rather than at 2am.",
        tags: ["Nature", "Family Friendly", "Small Group"],
      },
      {
        name: "Spiti Valley Monastery Circuit",
        duration: "9 days · 8 nights",
        price: "₹36,900",
        blurb:
          "Kaza, Key, Dhankar and Tabo at an altitude your body can actually handle - two acclimatisation nights built in, not skipped.",
        tags: ["High Altitude", "Heritage", "Guided Convoy"],
      },
      {
        name: "Chopta Stargazing Weekend",
        duration: "4 days · 3 nights",
        price: "₹14,900",
        blurb:
          "Camp above the treeline in Uttarakhand on a new-moon weekend, when the ridgeline goes dark enough to see the Milky Way clearly.",
        tags: ["Stargazing", "Camping", "Weekend Trip"],
      },
      {
        name: "Varanasi & Sarnath Ghats",
        duration: "3 days · 2 nights",
        price: "₹12,400",
        blurb:
          "A dawn boat along the ghats before the crowd arrives, evening aarti from the water, and a guide who knows which lanes to walk.",
        tags: ["Heritage", "Short Break", "Guided Walks"],
      },
      {
        name: "Golden Triangle: Delhi · Agra · Jaipur",
        duration: "6 days · 5 nights",
        price: "₹24,200",
        blurb:
          "The Taj at sunrise on a weekday, a private car for the whole loop, and hotels within walking distance of what you came to see.",
        tags: ["Monuments", "Family Friendly", "Private Car"],
      },
      {
        name: "Kerala Backwaters & Fort Kochi",
        duration: "6 days · 5 nights",
        price: "₹27,600",
        blurb:
          "One night on a houseboat, three in a palm-lined homestay, and enough unscheduled time to do very little on purpose.",
        tags: ["Houseboat", "Slow Travel", "Couples"],
      },
    ],
  },

  how: {
    eyebrow: "How it works",
    heading: "What happens after you enquire.",
    sub: "Four steps, and you only pay at the third one.",
    steps: [
      {
        title: "Tell us the idea",
        body: "Pick a package or describe the trip you have in mind. A planner replies on WhatsApp the same day.",
      },
      {
        title: "We plan the itinerary",
        body: "Day-by-day plan with stays, transport and permits costed out - usually back with you within 48 hours.",
      },
      {
        title: "You confirm and pay",
        body: "Confirm the plan, pay 25% to hold your dates, and the balance a week before you travel.",
      },
      {
        title: "We handle the rest",
        body: "Bookings, permits, drivers and a planner on WhatsApp for the whole trip, not just until you pay.",
      },
    ],
  },

  why: {
    eyebrow: "Why book with us",
    heading: "Three things a booking site cannot do for you.",
    points: [
      {
        title: "Routes we have actually walked",
        body: "Every stay in these itineraries has been slept in by someone on this team. Nothing here is listed off a supplier sheet.",
      },
      {
        title: "WhatsApp support during the trip",
        body: "The same planner who built your itinerary answers while you are on it - a missed connection at 6am gets a human, not a ticket number.",
      },
      {
        title: "Transparent, fixed pricing",
        body: "What is included and what is not is written into the plan before you pay. No entry fees, tolls or driver charges appearing on day four.",
      },
    ],
  },

  planner: {
    eyebrow: "Custom trips",
    heading: "Don't see what you're looking for?",
    body: "Tell us your dates, budget, and what you want to experience - we'll build the itinerary around it. Honeymoons, family groups, college batches, corporate offsites and one very specific birdwatching trip so far.",
    cta: "Start Planning",
    note: "Custom itineraries are quoted free. You pay once you like the plan.",
  },

  contact: {
    eyebrow: "Contact",
    heading: "Tell us where you want to go.",
    sub: "Send this across and a planner picks it up on WhatsApp - usually within a couple of hours during the day.",
    submit: "Send my enquiry",
    successTitle: "Enquiry received.",
    successBody:
      "A trip planner will message you on WhatsApp shortly with two or three options for those dates. Nothing is held or charged until you approve a plan.",
    note: "Demo form - this sample isn't connected to a live booking system.",
    destinations: [
      "Coorg & Wayanad Coffee Trail",
      "Spiti Valley Monastery Circuit",
      "Chopta Stargazing Weekend",
      "Varanasi & Sarnath Ghats",
      "Golden Triangle",
      "Kerala Backwaters & Fort Kochi",
      "Something custom / not sure yet",
    ],
    reachEyebrow: "Reach us",
    reachHeading: "WhatsApp is fastest.",
    whatsappLabel: "Message on WhatsApp",
    whatsappHref: "https://wa.me/919822041770",
    whatsappNote: "+91 98220 41770 · 8am – 9pm, all week",
    phoneLabel: "+91 20 4123 8870",
    phoneHref: "tel:+912041238870",
    phoneNote: "Office line, weekdays 10am – 7pm",
    address: [
      "Office 12, Sahyadri House",
      "Prabhat Road Lane 4, Erandwane",
      "Pune 411004",
    ],
    mapLabel: "Sahyadri Trails, Erandwane, Pune",
    coords: { lat: 18.5122, lon: 73.8322 },
  },

  bottomCta: {
    heading: "The best trips start with a 5-minute conversation.",
    body: "Let's plan yours. Tell us the dates and we'll take it from there.",
    cta: "Plan My Trip",
  },

  footer: {
    blurb:
      "A Pune-based tour operator running small group departures and custom private trips across India since 2012.",
    legal: "This is a concept build, not a real tour operator.",
  },
};
