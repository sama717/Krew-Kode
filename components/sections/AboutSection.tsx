import { getTranslations } from "next-intl/server";
import ArrowLink from "@/components/ui/ArrowLink";
import Reveal from "@/components/ui/Reveal";
import { principles as principleIds } from "@/lib/content/about";

type AboutSectionProps = {
  heading?: "h1" | "h2";
  showCta?: boolean;
};

export default async function AboutSection({
  heading = "h2",
  showCta = true,
}: AboutSectionProps) {
  const t = await getTranslations("about");
  const principles = principleIds.map((id, index) => ({
    number: `0${index + 1}`,
    title: t(`principles.${id}.title`),
    body: t(`principles.${id}.body`),
  }));
  const facts = [
    { label: t("factOneLabel"), value: t("factOneValue") },
    { label: t("factTwoLabel"), value: t("factTwoValue") },
    { label: t("factThreeLabel"), value: t("factThreeValue") },
  ];
  const headline = [
    t("headlineOne"),
    t("headlineTwo"),
    t("headlineThree"),
  ];

  return (
    <section
      aria-labelledby="about-heading"
      className={`bg-bg text-fg ${heading === "h1" ? "pt-[var(--nav-h)]" : ""}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-[120px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
          <p className="about-mono-label pt-[14px] text-start font-mono text-[13px] uppercase tracking-wider text-muted">
            {t("label")}
          </p>
          <Reveal
            as={heading}
            variant="lines"
            id="about-heading"
            className="text-start text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-balance"
          >
            <span className="about-headline-line">
              <span data-reveal-line="">{headline[0]}</span>
            </span>
            <span className="about-headline-line">
              <span data-reveal-line="">{headline[1]}</span>
            </span>
            <span className="about-headline-line">
              <span className="text-muted" data-reveal-line="">
                {headline[2]}
              </span>
            </span>
          </Reveal>
        </div>

        <Reveal
          className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3"
          variant="stagger"
        >
          {principles.map((principle) => (
            <div
              className="border-t border-line pt-5"
              data-reveal-item=""
              key={principle.number}
            >
              <p className="about-mono-label font-mono text-xs text-muted">
                {principle.number}
              </p>
              <h3 className="about-principle-title mt-7 text-[26px] font-bold tracking-[-0.02em]">
                {principle.title}
              </h3>
              <p className="mt-2.5 max-w-[320px] text-[17px] leading-[1.5] text-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal
          className="mt-24 grid grid-cols-1 gap-8 border-t border-fg pt-8 md:grid-cols-3"
          variant="stagger"
        >
          {facts.map((fact) => (
            <div data-reveal-item="" key={fact.label}>
              <p className="about-mono-label font-mono text-xs uppercase tracking-wider text-muted">
                {fact.label}
              </p>
              <p className="about-fact-value mt-2 text-[clamp(32px,3.4vw,44px)] font-extrabold tracking-[-0.04em]">
                {fact.value}
              </p>
            </div>
          ))}
        </Reveal>

        {showCta && (
          <Reveal className="mt-16">
            <ArrowLink href="/about" tone="theme">
              {t("cta")}
            </ArrowLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
