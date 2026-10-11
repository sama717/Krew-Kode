"use client";

import { useTranslations } from "next-intl";

export default function BackToTop() {
  const t = useTranslations("footer");

  function handleClick() {
    const behavior = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
      ? "auto"
      : "smooth";

    window.scrollTo({ top: 0, behavior });
  }

  return (
    <button
      type="button"
      aria-label={t("backToTop")}
      onClick={handleClick}
      className="group inline-flex items-center gap-3 text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {t("backToTop")}
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-transform duration-[400ms] group-hover:-translate-y-1">
        <span className="absolute inset-0 rounded-full transition-colors duration-300 group-hover:bg-white" />
        <svg
          aria-hidden="true"
          className="relative h-5 w-5 text-white transition-colors duration-300 group-hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path
            d="M12 20V5m-6 6 6-6 6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
