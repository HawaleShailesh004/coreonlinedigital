"use server";

import { contactPage } from "@/lib/content";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<
    Record<"name" | "businessType" | "otherBusinessType" | "phone", string>
  >;
};

export const initialContactState: ContactState = { status: "idle" };

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
    errors.otherBusinessType = "Please tell us what kind of business.";
  }

  if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const resolvedType =
    businessType === "Other" ? otherBusinessType : businessType;

  // Delivery target: contact@corelinedigital.in (wire Resend/Formspree when ready).
  console.info("[contact] callback requested", {
    name,
    businessType: resolvedType,
    phone,
  });

  return {
    status: "success",
    message: contactPage.microCopy,
  };
}
