/**
 * One delivery seam for every lead the site captures.
 *
 * Right now it writes a structured server log. That is deliberately a single
 * function: when Resend (or a WhatsApp notification) is wired up, it gets wired
 * up here once and every entry point - the chat assistant, the contact form -
 * starts delivering, rather than each growing its own copy of the same code.
 *
 * A lead is never dropped silently on the client side either: the chat widget
 * shows the WhatsApp handoff whether or not this call succeeds, so a delivery
 * outage costs a notification, not the customer.
 */

export type LeadSource = "chat" | "contact-form";

export type Lead = {
  source: LeadSource;
  /** 10 digits, no country code. */
  phone: string;
  name?: string;
  business?: string;
  websiteState?: string;
  problem?: string;
  /** "consult" | "quick" - chat only. */
  path?: string;
  goal?: string;
  obstacle?: string;
  /** "yes" | "questions" | "no" - chat only. */
  fit?: string;
  /** Trimmed conversation, chat only. */
  transcript?: string;
};

export async function deliverLead(lead: Lead): Promise<void> {
  // Structured on one line so it is greppable in whatever host logs this ends
  // up in, and so the shape does not change when real delivery is added.
  console.info(
    "[lead]",
    JSON.stringify({
      at: new Date().toISOString(),
      ...lead,
    }),
  );

  // TODO: deliver to contact@corelinedigital.in via Resend, and/or ping
  // WhatsApp. Keep this function's signature - callers depend on it.
}
