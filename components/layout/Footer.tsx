import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import BackToTop from "@/components/layout/BackToTop";
import CairoTimeInline from "@/components/contact/CairoTimeInline";
import Logo from "@/components/layout/Logo";
import Reveal from "@/components/ui/Reveal";
import { NAV_LINKS, SITE } from "@/lib/constants";

const serviceIds = ["design", "web", "mobile", "desktop", "ai"] as const;
const linkClassName =
  "inline-block text-[17px] font-medium text-white/70 transition hover:translate-x-1.5 hover:text-white rtl:hover:-translate-x-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default async function Footer() {
  const t = await getTranslations("footer");
  const navT = await getTranslations("nav");
  const servicesT = await getTranslations("services");
  const socials = SITE.socials.filter(({ href }) => href);

  return (
    <footer data-theme="dark" className="bg-bg text-fg">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-24">
        <Reveal
          variant="stagger"
          className="grid grid-cols-2 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]"
        >
          <div
            data-reveal-item
            className="col-span-2 md:col-span-1"
          >
            <Link
              href="/"
              aria-label="Krew Kode"
              className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Logo
                variant="color"
                height={56}
                className="text-fg"
                style={{ "--logo-accent": "var(--accent)" }}
              />
            </Link>
            <p className="mt-7 max-w-[300px] text-[26px] font-bold leading-[1.2] tracking-[-0.03em]">
              {t("tagline")}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-7 inline-flex items-center gap-2 border-b border-current pb-0.5 text-[17px] font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {SITE.email}
              <ArrowIcon />
            </a>
          </div>

          <FooterColumn title={t("columns.pages")}>
            {NAV_LINKS.map(({ key, href }) => (
              <Link key={key} className={linkClassName} href={href}>
                {navT(key)}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title={t("columns.services")}>
            {serviceIds.map((id) => (
              <Link
                key={id}
                className={linkClassName}
                href={`/services/${id}`}
              >
                {servicesT(`items.${id}.title`)}
              </Link>
            ))}
          </FooterColumn>

          {socials.length > 0 && (
            <FooterColumn title={t("columns.follow")}>
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  className={linkClassName}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              ))}
            </FooterColumn>
          )}
        </Reveal>

        <Reveal variant="lines" className="mt-[88px]">
          <div
            dir="ltr"
            aria-hidden="true"
            className="flex h-[.76em] justify-between overflow-hidden text-[clamp(48px,16vw,200px)] leading-[.82] font-extrabold tracking-[-0.05em] text-transparent select-none [-webkit-text-stroke:1.5px_rgba(255,255,255,.28)] transition-[color,-webkit-text-stroke-color] duration-[600ms] hover:text-white hover:[-webkit-text-stroke-color:#fff]"
          >
            <span data-reveal-line>KREW</span>
            <span data-reveal-line>KODE</span>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 border-t border-white/[.14] py-6 font-mono text-xs uppercase tracking-wider text-white/55 md:justify-between">
          <p>{t("copyright")}</p>
          <CairoTimeInline />
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div data-reveal-item>
      <h2 className="font-mono text-xs uppercase tracking-wider text-white/50">
        {title}
      </h2>
      <nav aria-label={title} className="mt-5 flex flex-col items-start gap-3">
        {children}
      </nav>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 rtl:-scale-x-100"
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
