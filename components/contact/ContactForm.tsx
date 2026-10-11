"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { sendContact, type ContactState } from "@/app/actions/contact";
import {
  CONTACT_SERVICE_IDS,
  hasValidServices,
  validate,
  type ContactErrorCode,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact-validation";
import { SITE } from "@/lib/constants";

const initialState: ContactState = { status: "idle" };
type FieldName = "name" | "email" | "message";

export default function ContactForm() {
  const t = useTranslations("contact");
  const serviceT = useTranslations("services");
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [startedAt, setStartedAt] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [clientGeneric, setClientGeneric] = useState(false);
  const [dismissedSuccess, setDismissedSuccess] =
    useState<ContactState | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  useEffect(() => {
    if (state.status !== "error") return;
    setFormKey((key) => key + 1);
  }, [state]);

  useEffect(() => {
    if (state.status !== "error") return;
    const firstInvalid = state.errors?.name
      ? nameRef.current
      : state.errors?.email
        ? emailRef.current
        : state.errors?.message
          ? messageRef.current
          : null;
    firstInvalid?.focus();
  }, [formKey, state]);

  const showSuccess =
    state.status === "success" && dismissedSuccess !== state;

  useEffect(() => {
    if (showSuccess) successRef.current?.focus();
  }, [showSuccess]);

  function errorMessage(code?: ContactErrorCode) {
    return code ? t(`form.errors.${code}`) : null;
  }

  function fieldError(name: FieldName) {
    return clientErrors[name] ?? state.errors?.[name];
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: ContactValues = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      services: data
        .getAll("services")
        .filter((value): value is string => typeof value === "string"),
      message: String(data.get("message") ?? ""),
    };
    const errors = validate(values);
    setClientErrors(errors);
    setClientGeneric(!hasValidServices(values.services));

    const firstInvalid = errors.name
      ? nameRef.current
      : errors.email
        ? emailRef.current
        : errors.message
          ? messageRef.current
          : null;
    if (Object.keys(errors).length > 0 || !hasValidServices(values.services)) {
      event.preventDefault();
      firstInvalid?.focus();
    }
  }

  function resetForm() {
    setClientErrors({});
    setDismissedSuccess(state);
    setFormKey((key) => key + 1);
  }

  if (showSuccess) {
    return (
      <div aria-live="polite" className="rounded-2xl border border-white/20 p-8">
        <h3
          ref={successRef}
          tabIndex={-1}
          className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {t("form.success.title")}
        </h3>
        <p className="mt-4 text-lg text-white/70">{t("form.success.body")}</p>
        <button
          className="mt-7 inline-flex items-center gap-2 text-[17px] font-bold text-white underline decoration-white underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-4"
          onClick={resetForm}
          type="button"
        >
          {t("form.success.again")}
          <ArrowIcon />
        </button>
      </div>
    );
  }

  const nameError = fieldError("name");
  const emailError = fieldError("email");
  const messageError = fieldError("message");

  return (
    <form
      key={formKey}
      action={formAction}
      noValidate
      onSubmit={handleSubmit}
      className="relative"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -start-[9999px] h-0 w-0 opacity-0"
      />
      <input type="hidden" name="t" value={startedAt} />

      <div className="mb-8">
        <label
          className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/60"
          htmlFor="contact-name"
        >
          {t("form.name")}
        </label>
        <input
          ref={nameRef}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          dir="auto"
          maxLength={120}
          defaultValue={state.values?.name ?? ""}
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? "contact-name-error" : undefined}
          className="block w-full border-0 border-b border-white/30 bg-transparent py-2.5 text-[22px] font-medium text-white outline-none transition-colors placeholder:text-white/30 focus:border-white"
          placeholder={t("form.namePlaceholder")}
        />
        {nameError && (
          <FieldError id="contact-name-error">
            {errorMessage(nameError)}
          </FieldError>
        )}
      </div>

      <div className="mb-8">
        <label
          className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/60"
          htmlFor="contact-email"
        >
          {t("form.email")}
        </label>
        <input
          ref={emailRef}
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          dir="ltr"
          maxLength={254}
          defaultValue={state.values?.email ?? ""}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "contact-email-error" : undefined}
          className="block w-full border-0 border-b border-white/30 bg-transparent py-2.5 text-[22px] font-medium text-white outline-none transition-colors placeholder:text-white/30 focus:border-white rtl:text-end rtl:text-[20px]"
          placeholder={t("form.emailPlaceholder")}
        />
        {emailError && (
          <FieldError id="contact-email-error">
            {errorMessage(emailError)}
          </FieldError>
        )}
      </div>

      <fieldset className="mb-8">
        <legend className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/60">
          {t("form.needs")}
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {CONTACT_SERVICE_IDS.map((id) => {
            const label =
              id === "unsure"
                ? t("form.notSure")
                : serviceT(`items.${id}.title`);
            return (
              <span key={id} className="relative">
                <input
                  id={`contact-service-${id}`}
                  className="peer sr-only"
                  type="checkbox"
                  name="services"
                  value={id}
                  defaultChecked={state.values?.services.includes(id)}
                />
                <label
                  htmlFor={`contact-service-${id}`}
                  className="inline-flex cursor-pointer rounded-full border border-white/30 px-4 py-2.5 text-[15px] font-medium text-white transition-colors hover:border-white peer-checked:border-white peer-checked:bg-white peer-checked:text-black peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white"
                >
                  {label}
                </label>
              </span>
            );
          })}
        </div>
      </fieldset>

      <div className="mb-8">
        <label
          className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-white/60"
          htmlFor="contact-message"
        >
          {t("form.message")}
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          rows={3}
          dir="auto"
          maxLength={4000}
          defaultValue={state.values?.message ?? ""}
          aria-invalid={Boolean(messageError)}
          aria-describedby={messageError ? "contact-message-error" : undefined}
          className="block w-full resize-none border-0 border-b border-white/30 bg-transparent py-2.5 text-[22px] font-medium text-white outline-none transition-colors placeholder:text-white/30 focus:border-white rtl:text-[20px]"
          placeholder={t("form.messagePlaceholder")}
        />
        {messageError && (
          <FieldError id="contact-message-error">
            {errorMessage(messageError)}
          </FieldError>
        )}
      </div>

      {state.generic && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-white/30 p-4 text-[15px]"
        >
          {t("form.errors.generic")}{" "}
          <a className="underline underline-offset-2" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </p>
      )}
      {clientGeneric && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-white/30 p-4 text-[15px]"
        >
          {t("form.errors.generic")}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-btn px-8 text-[17px] font-bold text-btn-fg transition-colors hover:bg-btn-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? t("form.sending") : t("form.submit")}
          <ArrowIcon />
        </button>
        <span className="font-mono text-xs uppercase text-white/50">
          {t("form.noSpam")}
        </span>
      </div>
    </form>
  );
}

function FieldError({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <p id={id} role="alert" className="mt-2 flex items-start gap-2 text-sm text-white">
      <span aria-hidden="true">!</span>
      <span>{children}</span>
    </p>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 rtl:-scale-x-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
