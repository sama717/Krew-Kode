import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProjectCover from "@/components/work/ProjectCover";
import Reveal from "@/components/ui/Reveal";
import { getNextProject, getProject } from "@/lib/content/projects";

type ProjectSectionProps = {
  slug: string;
};

function ArrowIcon({
  className = "h-5 w-5",
  rtlMirror = true,
}: {
  className?: string;
  rtlMirror?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`${className} ${rtlMirror ? "rtl:-scale-x-100" : ""}`}
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

export default async function ProjectSection({ slug }: ProjectSectionProps) {
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("work");
  const serviceT = await getTranslations("services");
  const content = t.raw(`projects.${project.slug}`) as {
    title: string;
    category: string;
    subtitle: string;
    tagline: string;
    client: string;
    role: string;
    overview: string;
    challenge: string;
    approach: string;
    result: string;
    tags: string[];
  };
  const nextProject = getNextProject(project.slug);
  const nextContent = t.raw(`projects.${nextProject.slug}`) as {
    title: string;
  };
  const steps = [
    { number: "01", title: t("steps.challenge"), body: content.challenge },
    { number: "02", title: t("steps.approach"), body: content.approach },
    { number: "03", title: t("steps.result"), body: content.result },
  ];

  return (
    <>
      <section className="bg-bg text-fg">
        <div className="mx-auto max-w-[1200px] px-6 pt-[calc(var(--nav-h)+52px)] pb-[120px]">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-[13px] uppercase text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          >
            <ArrowIcon
              className="h-4 w-4 rotate-180 rtl:rotate-0"
              rtlMirror={false}
            />
            {t("back")}
          </Link>

          <Reveal
            as="h1"
            variant="lines"
            className="project-title mt-7 text-[clamp(64px,11vw,148px)] font-extrabold leading-[.95] tracking-[-0.05em]"
          >
            <span className="project-title-mask">
              <span data-reveal-line="">{content.title}</span>
            </span>
          </Reveal>

          <Reveal className="mt-6 max-w-[640px] text-[22px] leading-[1.45] text-muted">
            {content.tagline}
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-fg pt-6 md:grid-cols-4">
            <div>
              <p className="font-mono text-xs uppercase text-muted">
                {t("meta.client")}
              </p>
              <p className="mt-2 text-xl font-bold tracking-[-0.02em]">
                {content.client}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-muted">
                {t("meta.year")}
              </p>
              <p className="mt-2 text-xl font-bold tracking-[-0.02em]">
                {project.year}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-muted">
                {t("meta.services")}
              </p>
              <p className="mt-2 text-xl font-bold tracking-[-0.02em]">
                {project.services.map((service, index) => (
                  <span key={service}>
                    {index > 0 ? ", " : ""}
                    <Link
                      className="underline decoration-current underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                      href={`/services/${service}`}
                    >
                      {serviceT(`items.${service}.title`)}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-muted">
                {t("meta.role")}
              </p>
              <p className="mt-2 text-xl font-bold tracking-[-0.02em]">
                {content.role}
              </p>
            </div>
          </div>

          <ProjectCover
            kind={project.kind}
            tone={project.tone}
            scale={1.6}
            className="mt-16 h-[320px] rounded-[20px] md:h-[520px]"
          />

          <div className="mt-[120px] grid gap-8 md:grid-cols-[200px_1fr]">
            <p className="font-mono text-[13px] uppercase text-muted">
              {t("overviewLabel")}
            </p>
            <p className="text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.3] tracking-[-0.02em]">
              {content.overview}
            </p>
          </div>

          <Reveal
            className="mt-24 grid gap-8 md:grid-cols-3"
            variant="stagger"
          >
            {steps.map((step) => (
              <div
                key={step.number}
                className="border-t border-line pt-5"
                data-reveal-item=""
              >
                <p className="font-mono text-xs text-muted">{step.number}</p>
                <h2 className="mt-7 text-[26px] font-bold">{step.title}</h2>
                <p className="mt-2.5 max-w-[320px] text-[17px] leading-[1.5] text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </Reveal>

          <div className="mt-24 grid gap-8 md:grid-cols-2">
            <ProjectCover
              kind="mobile"
              tone="light"
              className="h-[380px]"
            />
            <ProjectCover
              kind="desktop"
              tone="dark"
              className="h-[380px]"
            />
          </div>
        </div>
      </section>

      <section data-theme="dark" className="bg-bg text-fg">
        <Link
          href={`/work/${nextProject.slug}`}
          className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-24">
            <div>
              <p className="font-mono text-[13px] uppercase text-white/60">
                {t("nextProject")}
              </p>
              <p className="mt-3 text-[clamp(56px,9vw,120px)] font-extrabold leading-none tracking-[-0.05em]">
                {nextContent.title}
              </p>
            </div>
            <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-[background-color,color] duration-300 group-hover:bg-white group-hover:text-black">
              <ArrowIcon className="h-6 w-6" />
            </span>
          </div>
        </Link>
      </section>
    </>
  );
}
