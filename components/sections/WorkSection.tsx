import { getTranslations } from "next-intl/server";
import ArrowLink from "@/components/ui/ArrowLink";
import Reveal from "@/components/ui/Reveal";
import WorkStack, { type WorkCardItem } from "@/components/work/WorkStack";
import { projects } from "@/lib/content/projects";

type WorkSectionProps = {
  heading?: "h1" | "h2";
  showCta?: boolean;
  firstOnPage?: boolean;
};

export default async function WorkSection({
  heading = "h2",
  showCta = true,
  firstOnPage = false,
}: WorkSectionProps) {
  const t = await getTranslations("work");
  const cards: WorkCardItem[] = projects.map((project) => {
    const content = t.raw(`projects.${project.slug}`) as {
      title: string;
      category: string;
      subtitle: string;
      tagline: string;
      tags: string[];
    };

    return { ...project, ...content, viewProject: t("viewProject") };
  });

  return (
    <section aria-labelledby="work-heading" className="bg-bg text-fg">
      <div
        className={`mx-auto w-full max-w-[1200px] px-6 py-[120px] ${
          firstOnPage ? "pt-[var(--nav-h)]" : ""
        }`}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
          <p className="pt-[14px] text-start font-mono text-[13px] uppercase tracking-wider text-muted">
            {t("label")}
          </p>

          <Reveal
            as={heading}
            variant="lines"
            id="work-heading"
            className="text-start text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.08] tracking-[-0.03em]"
          >
            <span className="work-headline-line">
              <span data-reveal-line="">{t("heading.line1")}</span>
            </span>
            <span className="work-headline-line">
              <span className="text-muted" data-reveal-line="">
                {t("heading.line2")}
              </span>
            </span>
          </Reveal>
        </div>

        <WorkStack items={cards} />

        {showCta && (
          <Reveal className="mt-14">
            <ArrowLink href="/work" tone="theme">
              {t("cta")}
            </ArrowLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
