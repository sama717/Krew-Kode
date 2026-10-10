"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import CairoClock from "@/components/layout/CairoClock";
import LanguageToggle from "@/components/layout/LanguageToggle";
import NavLink from "@/components/layout/NavLink";
import ThemeToggle from "@/components/layout/ThemeToggle";
import type { ReactNode } from "react";

type MobileMenuProps = {
  links: readonly { key: string; href: string }[];
  cta: { label: string; href: string };
  navLabels: Record<string, string>;
  logo: ReactNode;
  redirectUrl?: string;
};

export default function MobileMenu({
  links,
  cta,
  navLabels,
  logo,
  redirectUrl,
}: MobileMenuProps) {
  const t = useTranslations("mobile");
  const navT = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    const frame = requestAnimationFrame(() => setIsOpen(false));

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [isOpen]);

  const overlay = isOpen ? (
    <div
      aria-label={t("navigation")}
      aria-modal="true"
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg px-6 pb-6 pt-5 text-fg"
      id="mobile-navigation"
      role="dialog"
    >
      <div className="flex min-h-11 items-center justify-between border-b border-line pb-5">
        <Link
          aria-label={navT("homeLabel")}
          className="inline-flex min-h-11 items-center text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg [--logo-accent:var(--accent)]"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          {logo}
        </Link>
        <button
          aria-label={t("closeMenu")}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          onClick={() => setIsOpen(false)}
          ref={closeButtonRef}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav aria-label={t("navigation")} className="mt-5">
        <ol>
          {links.map((link, index) => (
            <li className="border-b border-line" key={link.href}>
              <div className="flex items-center gap-5">
                <span className="font-mono text-sm text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <NavLink
                  className="text-[30px] font-semibold"
                  href={link.href}
                  tone="theme"
                  onClick={() => setIsOpen(false)}
                >
                  {navLabels[link.key]}
                </NavLink>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-auto pt-8">
        {redirectUrl !== undefined ? (
          <a
            className="flex h-[52px] min-h-11 items-center justify-center rounded-[10px] bg-btn px-5 text-btn-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg hover:bg-btn-hover"
            href={redirectUrl}
            onClick={() => setIsOpen(false)}
          >
            {cta.label}
          </a>
        ) : (
          <Link
            className="flex h-[52px] min-h-11 items-center justify-center rounded-[10px] bg-btn px-5 text-btn-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg hover:bg-btn-hover"
            href={cta.href}
            onClick={() => setIsOpen(false)}
          >
            {cta.label}
          </Link>
        )}
        <div className="mt-5 flex items-center justify-between gap-5">
          <CairoClock tone="theme" />
          <div className="flex items-center gap-3">
            <LanguageToggle tone="theme" />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={t("openMenu")}
        className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        onClick={() => setIsOpen((open) => !open)}
        ref={menuButtonRef}
        type="button"
      >
        <span aria-hidden="true" className="h-px w-5 bg-white" />
        <span aria-hidden="true" className="h-px w-5 bg-white" />
        <span aria-hidden="true" className="h-px w-5 bg-white" />
      </button>
      {overlay && createPortal(overlay, document.body)}
    </>
  );
}
