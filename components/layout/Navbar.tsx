import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import CairoClock from "@/components/layout/CairoClock";
import LanguageToggle from "@/components/layout/LanguageToggle";
import Logo from "@/components/layout/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLink from "@/components/layout/NavLink";
import ThemeToggle from "@/components/layout/ThemeToggle";
import {
  CONTACT_MODE,
  CONTACT_REDIRECT_URL,
  NAV_CTA,
  NAV_LINKS,
} from "@/lib/constants";

const ctaClasses =
  "inline-flex h-11 w-[132px] items-center justify-center rounded-[10px] text-[15px] font-bold bg-btn text-btn-fg hover:bg-btn-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";

export default async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] pointer-events-none mix-blend-difference">
        <div className="mx-auto flex h-full max-w-[1240px] items-center gap-10 px-6">
          <Link
            aria-label="Krew Kode"
            className="pointer-events-auto inline-flex min-h-11 items-center text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            href="/"
          >
            <Logo variant="letters" height={48} />
          </Link>
          <nav
            aria-label={t("mainLabel")}
            className="pointer-events-auto hidden items-center gap-6 text-white min-[900px]:flex"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} tone="blend">
                {t(link.key)}
              </NavLink>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-5 pointer-events-auto text-white min-[900px]:me-[236px]">
            <div className="hidden min-[1100px]:block">
              <CairoClock tone="blend" />
            </div>
            <div className="hidden min-[900px]:block">
              <Suspense
                fallback={<span aria-hidden="true" className="inline-block h-8 w-[72px]" />}
              >
                <LanguageToggle tone="blend" />
              </Suspense>
            </div>
            <div className="min-[900px]:hidden">
              <Suspense fallback={<span className="inline-block h-11 w-11" />}>
                <MobileMenu
                  links={NAV_LINKS}
                  cta={{ href: NAV_CTA.href, label: t(NAV_CTA.key) }}
                  navLabels={Object.fromEntries(
                    NAV_LINKS.map((link) => [link.key, t(link.key)]),
                  )}
                  logo={
                    <Logo
                      variant="color"
                      label={t("homeLabel")}
                      height={48}
                      className="text-fg [--logo-accent:var(--accent)]"
                    />
                  }
                  redirectUrl={
                    CONTACT_MODE === "redirect"
                      ? CONTACT_REDIRECT_URL
                      : undefined
                  }
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] pointer-events-none">
        <div className="mx-auto flex h-full max-w-[1240px] items-center px-6">
          <Logo variant="chevron" height={48} />
          <div className="ms-auto flex items-center gap-5 pointer-events-auto max-[899px]:me-14">
            <ThemeToggle />
            <div className="hidden min-[900px]:flex">
              {CONTACT_MODE === "redirect" ? (
                <a className={ctaClasses} href={CONTACT_REDIRECT_URL}>
                  {t(NAV_CTA.key)}
                </a>
              ) : (
                <Link className={ctaClasses} href={NAV_CTA.href}>
                  {t(NAV_CTA.key)}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
