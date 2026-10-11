import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getService, getRelatedProjects, serviceIds } from "@/lib/content/services";
import { NAV_CTA, CONTACT_MODE, CONTACT_REDIRECT_URL } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import ArrowLink from "@/components/ui/ArrowLink";
import ProjectCover from "@/components/work/ProjectCover";
import Reveal from "@/components/ui/Reveal";

type ServicePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const instant = false;

type ServiceDetailMessages = {
  intro: string;
  included: string[];
};

type ProcessStep = {
  title: string;
  body: string;
};

function ArrowIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`${className} rtl:-scale-x-100`}
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

export function generateStaticParams() {
  return serviceIds.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const detail = t.raw(`detail.items.${service.id}`) as ServiceDetailMessages;
  const title = t(`items.${service.id}.title`);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krewkode.com";
  const localizedUrl = (targetLocale: string) =>
    new URL(
      `${targetLocale === "ar" ? "/ar" : ""}/services/${service.id}`,
      baseUrl,
    ).toString();

  return {
    title: `${title} | Krew Kode`,
    description: detail.intro,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((targetLocale) => [
          targetLocale,
          localizedUrl(targetLocale),
        ]),
      ),
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const workT = await getTranslations("work");
  const serviceTitle = t(`items.${service.id}.title`);
  const detail = t.raw(`detail.items.${service.id}`) as ServiceDetailMessages;
  const process = t.raw("detail.process") as ProcessStep[];
  const relatedProjects = getRelatedProjects(service.id);
  const IconScene = service.IconScene;

  return (
    <>
      <section className="bg-bg text-fg">
        <div className="mx-auto max-w-[1200px] px-6 pt-[calc(var(--nav-h)+52px)] pb-[120px]">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-[13px] uppercase text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                d="M20 12H5m6-6-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("detail.back")}
          </Link>

          <div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <Reveal
                as="h1"
                variant="lines"
                id="service-heading"
                className="service-title text-start text-[clamp(52px,8vw,112px)] font-extrabold leading-[.98] tracking-[-0.05em]"
              >
                <span className="service-title-mask">
                  <span data-reveal-line="">{serviceTitle}</span>
                </span>
              </Reveal>

              <Reveal className="mt-6 max-w-[560px] text-[22px] leading-[1.45] text-muted">
                {detail.intro}
              </Reveal>
            </div>

            <div
              aria-hidden="true"
              data-theme="dark"
              dir="ltr"
              className="relative flex h-[360px] items-center justify-center overflow-hidden rounded-[20px] bg-bg [perspective:1200px] lg:h-[420px]"
            >
              <div style={{ transform: "scale(1.2)" }}>
                <IconScene />
              </div>
            </div>
          </div>

          <section className="mt-[120px] grid gap-8 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-[13px] uppercase text-muted">
              {t("detail.includedLabel")}
            </h2>
            <Reveal
              className="grid gap-x-8 sm:grid-cols-2"
              variant="stagger"
            >
              {detail.included.map((item, index) => (
                <div
                  key={item}
                  className="border-t border-line py-6"
                  data-reveal-item=""
                >
                  <p className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-[22px] font-bold leading-[1.25] tracking-[-0.02em]">
                    {item}
                  </p>
                </div>
              ))}
            </Reveal>
          </section>

          <section className="mt-[120px] grid gap-8 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-[13px] uppercase text-muted">
              {t("detail.processLabel")}
            </h2>
            <Reveal
              className="grid gap-8 md:grid-cols-4"
              variant="stagger"
            >
              {process.map((step, index) => (
                <div
                  key={step.title}
                  className="border-t border-line pt-5"
                  data-reveal-item=""
                >
                  <p className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-7 text-[24px] font-bold">{step.title}</h3>
                  <p className="mt-2.5 text-[17px] leading-[1.5] text-muted">
                    {step.body}
                  </p>
                </div>
              ))}
            </Reveal>
          </section>

          {relatedProjects.length > 0 && (
            <section className="mt-[120px] grid gap-8 md:grid-cols-[200px_1fr]">
              <h2 className="font-mono text-[13px] uppercase text-muted">
                {t("detail.relatedLabel")}
              </h2>
              <Reveal
                className="grid gap-8 sm:grid-cols-2"
                variant="stagger"
              >
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                    data-reveal-item=""
                  >
                    <ProjectCover
                      kind={project.kind}
                      tone={project.tone}
                      scale={1.1}
                      className="aspect-[16/11]"
                    />
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[28px] font-bold">
                          {workT(`projects.${project.slug}.title`)}
                        </p>
                        <p className="font-mono text-xs uppercase text-muted">
                          {workT(`projects.${project.slug}.category`)}
                        </p>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current/40 transition-[background-color,color,rotate] duration-300 group-hover:-rotate-45 group-hover:bg-fg group-hover:text-bg rtl:group-hover:rotate-45">
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </Reveal>
            </section>
          )}
        </div>
      </section>

      <section data-theme="dark" className="bg-bg text-fg">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-24 md:flex-row md:items-end md:justify-between">
          <Reveal
            as="h2"
            className="text-[clamp(40px,6vw,80px)] font-extrabold leading-[1] tracking-[-0.04em]"
          >
            {t("detail.ctaTitle")}
          </Reveal>
          <Reveal>
            {CONTACT_MODE === "redirect" ? (
              <a
                href={CONTACT_REDIRECT_URL}
                className="inline-flex items-center gap-2 text-[17px] font-bold text-white underline decoration-current underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
              >
                {t("detail.ctaLink")}
                <ArrowIcon />
              </a>
            ) : (
              <ArrowLink href={NAV_CTA.href} tone="onDark">
                {t("detail.ctaLink")}
              </ArrowLink>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
