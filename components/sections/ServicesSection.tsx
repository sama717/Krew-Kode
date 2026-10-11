import { getTranslations } from "next-intl/server";
import ArrowLink from "@/components/ui/ArrowLink";
import Reveal from "@/components/ui/Reveal";
import ServicesList from "@/components/services/ServicesList";

type ServicesSectionProps = {
  heading?: "h1" | "h2";
  showCta?: boolean;
  firstOnPage?: boolean;
};

export default async function ServicesSection({
  heading = "h2",
  showCta = true,
  firstOnPage = false,
}: ServicesSectionProps) {
  const t = await getTranslations("services");
  const rawItems = t.raw("items") as Record<
    string,
    { title: string; description: string; tags: string[] }
  >;

  const items = Object.entries(rawItems).map(([id, value]) => ({
    id,
    title: value.title,
    description: value.description,
    tags: value.tags,
  }));

  return (
    <section
      aria-labelledby="services-heading"
      data-theme="dark"
      className="bg-bg text-fg"
    >
      <div
        className={`mx-auto w-full max-w-[1200px] px-6 py-[120px] ${
          firstOnPage ? "pt-[var(--nav-h)]" : ""
        }`}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
          <p className="pt-[14px] font-mono text-[13px] uppercase tracking-[0.22em] text-white/60 text-start">
            {t("label")}
          </p>

          <Reveal as={heading} variant="lines" id="services-heading" className="text-start text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-[-0.03em]">
            <span className="services-headline-line">
              <span data-reveal-line="">{t("heading.line1")}</span>
            </span>
            <span className="services-headline-line">
              <span data-reveal-line="" className="text-white/50">
                {t("heading.line2")}
              </span>
            </span>
          </Reveal>
        </div>

        <ServicesList items={items} />

        {showCta && (
          <Reveal className="mt-12">
            <ArrowLink href="/services" tone="onDark">
              {t("cta")}
            </ArrowLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
