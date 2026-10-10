"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { submitContact, type ContactData } from "@/lib/contact";

type SubmissionState = "idle" | "submitting" | "success" | "error";
type FormErrors = Partial<Record<keyof ContactData, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const t = useTranslations("contact");
  const [state, setState] = useState<SubmissionState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function validateForm(data: ContactData): FormErrors {
    const nextErrors: FormErrors = {};

    if (!data.name.trim()) {
      nextErrors.name = t("nameRequired");
    }

    if (!data.email.trim()) {
      nextErrors.email = t("emailRequired");
    } else if (!emailPattern.test(data.email.trim())) {
      nextErrors.email = t("emailInvalid");
    }

    if (!data.message.trim()) {
      nextErrors.message = t("messageRequired");
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: ContactData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const nextErrors = validateForm(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setState("error");
      return;
    }

    setState("submitting");

    try {
      await submitContact(data);
      setState("success");
      form.reset();
      setErrors({});
    } catch {
      setState("error");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor="contact-name">
          {t("name")}
        </label>
        <input
          aria-invalid={Boolean(errors.name)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-zinc-700 focus:outline-none"
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          defaultValue=""
        />
        {errors.name && (
          <p className="text-sm text-red-700" role="alert">
            {errors.name}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor="contact-email">
          {t("email")}
        </label>
        <input
          aria-invalid={Boolean(errors.email)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-zinc-700 focus:outline-none"
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue=""
        />
        {errors.email && (
          <p className="text-sm text-red-700" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor="contact-message">
          {t("message")}
        </label>
        <textarea
          aria-invalid={Boolean(errors.message)}
          className="min-h-32 w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-zinc-700 focus:outline-none"
          id="contact-message"
          name="message"
          defaultValue=""
        />
        {errors.message && (
          <p className="text-sm text-red-700" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      <button
        className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? t("sending") : t("send")}
      </button>
      {state === "success" && (
        <p className="text-sm text-green-700" role="status">
          {t("sent")}
        </p>
      )}
      {state === "error" && Object.keys(errors).length === 0 && (
        <p className="text-sm text-red-700" role="alert">
          {t("sendError")}
        </p>
      )}
    </form>
  );
}
