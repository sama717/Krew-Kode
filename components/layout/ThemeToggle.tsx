"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { THEME_KEY, type Theme } from "@/lib/theme";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8a8.5 8.5 0 1 0 11.4 11.4Z"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  const t = useTranslations("controls");
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setTheme(
        document.documentElement.dataset.theme === "light" ? "light" : "dark",
      );
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!theme) {
    return <span aria-hidden="true" className="inline-block h-11 w-16" />;
  }

  const isDark = theme === "dark";
  const sunIconColor = isDark ? "text-white/60" : "text-black";
  const moonIconColor = isDark ? "text-black" : "text-white/60";

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  }

  return (
    <button
      aria-label={t("darkMode")}
      aria-checked={isDark}
      className="inline-flex min-h-11 w-16 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      onClick={toggleTheme}
      role="switch"
      dir="ltr"
      type="button"
    >
      <span
        className="relative flex h-8 w-16 items-center rounded-full border border-white/25 bg-black"
      >
        <span className={`absolute left-[7px] top-1/2 flex -translate-y-1/2 ${sunIconColor}`}>
          <SunIcon />
        </span>
        <span className={`absolute right-[7px] top-1/2 flex -translate-y-1/2 ${moonIconColor}`}>
          <MoonIcon />
        </span>
        <span
          className={`absolute left-[3px] top-[3px] flex h-6 w-6 items-center justify-center rounded-full bg-white text-black shadow-sm transition-transform motion-reduce:transition-none ${isDark ? "translate-x-[32px]" : "translate-x-0"}`}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
      </span>
    </button>
  );
}
