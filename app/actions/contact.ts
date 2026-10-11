"use server";

import { deliverMessage } from "@/lib/contact";
import {
  hasValidServices,
  validate,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact-validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: ContactErrors;
  generic?: boolean;
  values?: ContactValues;
};

export async function sendContact(
  prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  void prev;

  const getText = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  };
  const submittedServices = formData.getAll("services");
  const values: ContactValues = {
    name: getText("name"),
    email: getText("email"),
    services: submittedServices.map((value) =>
      typeof value === "string" ? value : "",
    ),
    message: getText("message"),
  };

  const company = formData.get("company");
  const timestampValue = formData.get("t");
  const startedAt =
    typeof timestampValue === "string" && timestampValue.trim() !== ""
      ? Number(timestampValue)
      : Number.NaN;
  const elapsed = Date.now() - startedAt;

  if (
    (typeof company === "string" ? company.length > 0 : company !== null) ||
    !Number.isFinite(startedAt) ||
    elapsed < 3000
  ) {
    return { status: "success" };
  }

  // TODO: Add real rate limiting with the hosting provider.
  if (!hasValidServices(values.services)) {
    return { status: "error", generic: true, values };
  }

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  try {
    await deliverMessage(values);
  } catch {
    return { status: "error", generic: true, values };
  }

  return { status: "success" };
}
