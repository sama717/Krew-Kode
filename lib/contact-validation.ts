export type ContactValues = {
  name: string;
  email: string;
  services: string[];
  message: string;
};

export type ContactErrorCode =
  | "nameRequired"
  | "emailInvalid"
  | "messageShort";

export type ContactErrors = {
  name?: ContactErrorCode;
  email?: ContactErrorCode;
  message?: ContactErrorCode;
};

export const CONTACT_SERVICE_IDS = [
  "design",
  "web",
  "mobile",
  "desktop",
  "ai",
  "unsure",
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function hasValidServices(services: string[]): boolean {
  return services.every((service) =>
    CONTACT_SERVICE_IDS.some((allowed) => allowed === service),
  );
}

export function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 1 || name.length > 120) {
    errors.name = "nameRequired";
  }

  if (email.length > 254 || !emailPattern.test(email)) {
    errors.email = "emailInvalid";
  }

  if (message.length < 10 || message.length > 4000) {
    errors.message = "messageShort";
  }

  return errors;
}
