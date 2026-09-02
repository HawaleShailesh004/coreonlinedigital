"use server";

import { headers } from "next/headers";
import type { ContactState } from "@/app/(site)/contact/state";
import { contactPage } from "@/lib/content";
import { deliverLead } from "@/lib/leads";
import { checkRateLimit } from "@/lib/rate-limit";

/** A real visitor submits once, maybe twice if they mistyped. */
const PER_IP_RULES = [
  { limit: 4, windowMs: 10 * 60_000 },
  { limit: 10, windowMs: 24 * 60 * 60_000 },
];

export async function requestCallback(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const businessType = String(formData.get("businessType") ?? "").trim();
  const otherBusinessType = String(
    formData.get("otherBusinessType") ?? "",
  ).trim();
  const phone = String(formData.get("phone") ?? "").trim();

  const errors: ContactState["errors"] = {};

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!contactPage.businessTypes.includes(businessType)) {
    errors.businessType = "Please pick a business type.";
  } else if (businessType === "Other" && otherBusinessType.length < 2) {
    errors.otherBusinessType = "Please tell me what kind of business.";
  }

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      values: { name, businessType, otherBusinessType, phone },
    };
  }

  const resolvedType =
    businessType === "Other" ? otherBusinessType : businessType;

  // Server Actions are a public POST endpoint like any other, so this is
  // throttled the same way the chat lead route is.
  const forwarded = (await headers()).get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const limited = checkRateLimit(`contact:${ip}`, PER_IP_RULES);

  if (limited.ok) {
    try {
      await deliverLead({
        source: "contact-form",
        // Stored as the last 10 digits so it matches the chat leads, which are
        // normalised the same way.
        phone: digits.slice(-10),
        name,
        business: resolvedType,
      });
    } catch (error) {
      // The visitor has done their part and the WhatsApp and phone links are
      // right there on the page - failing the form would lose the lead twice.
      console.error("[contact] delivery failed:", error);
    }
  }

  return {
    status: "success",
    message: contactPage.microCopy,
  };
}
