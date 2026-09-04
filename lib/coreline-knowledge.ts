import { demos, services, site, team } from "@/lib/site-content";

/**
 * Full site context for the assistant. Not RAG — the whole site fits.
 * Update this when the public site copy changes.
 */
export function corelineKnowledge(): string {
  const serviceLines = services
    .map((service) => `- ${service.name}: ${service.promise}`)
    .join("\n");

  const demoLines = demos
    .map((demo) => {
      const noun = demo.trade.replace(/s$/, "").toLowerCase();
      return `- ${demo.trade} (${demo.business}): ${demo.tagline} Link as [see the ${noun} demo](${site.url}${demo.demoHref}). Status: ${demo.status}.`;
    })
    .join("\n");

  const people = team
    .filter((member) => member.known)
    .map((member) => `${member.name} — ${member.discipline}. ${member.description}`)
    .join(" ");

  return `
CORELINE DIGITAL
A small digital studio in ${site.location}, run by Shailesh, serving small businesses across Thane and Mumbai.
${people}
The studio is new. Builds on the work page are our own concept work, labelled Demo build, unless marked Live. We do not invent clients, testimonials, or results.

CONTACT
WhatsApp / phone: ${site.phone}
Call link: ${site.phoneHref}
Email: ${site.email}
Instagram: ${site.socials.instagram}
LinkedIn: ${site.socials.linkedin}
Work page: ${site.url}/work

WHAT WE BUILD
${serviceLines}

HOW WE WORK
1. We talk — one call about what you sell and who buys it.
2. We plan — a structure and a direction, not a mood board.
3. We build — design, then code, then agents and automations.
4. We run it — live on your domain, on Google, kept fast after launch.

You own the domain, hosting and code from day one.

PRICING
Never quote a rupee figure, a range, a starting price, or a delivery date. Cost depends on scope. Shailesh gives a real number on a quick call. Offer WhatsApp or a call.

WHAT WE WON'T DO
We don't resell a generic chat widget and call it an agent. We don't take on work we can't stand behind. We tell you when something isn't worth building.

NINE BUILDS (open on a phone)
${demoLines}

INDUSTRIES
Jewellers, clinics, gyms, real estate, schools and coaching, chartered accountants, interior designers, travel agencies, traders and wholesalers. If their trade is close to one of these, point them at that demo with a markdown link.

THIS CHAT
This assistant is the same kind of agent Coreline builds for clients, running live on Coreline's own site. That is a selling point when asked.
`.trim();
}
