import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutCarousel from "@/components/about/AboutCarousel";
import GlobeLazy from "@/components/about/GlobeLazy";
import ArrowLink from "@/components/ui/ArrowLink";
import Reveal from "@/components/ui/Reveal";
import { principles } from "@/lib/content/about";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const headline = [
    t("headlineOne"),
    t("headlineTwo"),
    t("headlineThree"),
  ];

  return (
    <>
      <section aria-labelledby="about-page-heading" className="bg-bg text-fg">
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-16 pt-[calc(var(--nav-h)+72px)]">
          <div className="grid grid-cols-1 gap-8 min-[860px]:grid-cols-[200px_1fr]">
            <p className="about-page-mono pt-[14px] text-start font-mono text-[13px] text-muted">
              {t("label")}
            </p>
            <Reveal
              as="h1"
              id="about-page-heading"
              variant="lines"
              className="text-start text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-balance"
            >
              {headline.map((line, index) => (
                <span className="about-page-headline-line" key={line}>
                  <span
                    className={index === 2 ? "text-muted" : ""}
                    data-reveal-line=""
                  >
                    {line}
                  </span>
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label={t("carouselLabel")} className="bg-bg pb-24 text-fg">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <AboutCarousel />
        </div>
      </section>

      <section aria-label={t("principlesLabel")} className="bg-bg text-fg">
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-28">
          <Reveal
            className="grid grid-cols-1 gap-10 md:grid-cols-3"
            variant="stagger"
          >
            {principles.map((id, index) => (
              <article
                className="border-t border-line pt-5"
                data-reveal-item=""
                key={id}
              >
                <p className="about-page-mono font-mono text-xs text-muted">
                  {`0${index + 1}`}
                </p>
                <h2 className="about-principle-title mt-7 text-[26px] font-bold tracking-[-0.02em]">
                  {t(`principles.${id}.title`)}
                </h2>
                <p className="mt-2.5 max-w-[320px] text-[17px] leading-[1.5] text-muted">
                  {t(`principles.${id}.body`)}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="about-location-heading"
        className="bg-bg text-fg"
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 pt-4">
          <p className="about-page-mono text-start font-mono text-[13px] text-muted">
            {t("where.label")}
          </p>
          <Reveal
            as="h2"
            id="about-location-heading"
            variant="lines"
            className="mt-6 text-start text-[clamp(38px,5vw,64px)] font-bold leading-[1.08] tracking-[-0.04em]"
          >
            <span className="about-page-headline-line">
              <span data-reveal-line="">{t("where.city")}</span>
            </span>
            <span className="about-page-headline-line">
              <span className="text-muted" data-reveal-line="">
                {t("where.remote")}
              </span>
            </span>
          </Reveal>
        </div>
        <div id="globe-slot">
          <GlobeLazy
            est={t("globe.est")}
            hint={t("globe.hint")}
            label={t("globe.label")}
          />
        </div>
      </section>

      <section
        aria-labelledby="about-cta-heading"
        className="bg-bg text-fg"
        data-theme="dark"
      >
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-end gap-8 px-6 py-20 md:grid-cols-[1fr_auto] md:py-28">
          <Reveal
            as="h2"
            id="about-cta-heading"
            variant="lines"
            className="text-start text-[clamp(40px,6vw,80px)] font-extrabold leading-[1.05] tracking-[-0.04em]"
          >
            <span className="about-page-headline-line">
              <span data-reveal-line="">{t("ctaHeading")}</span>
            </span>
          </Reveal>
          <ArrowLink href="/contact#contact" tone="onDark">
            {t("ctaLink")}
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
