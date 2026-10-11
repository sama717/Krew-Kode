import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectSection from "@/components/sections/ProjectSection";
import { routing } from "@/i18n/routing";
import { getProject, projects } from "@/lib/content/projects";

export const instant = false;

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "work" });
  const content = t.raw(`projects.${project.slug}`) as {
    title: string;
    tagline: string;
  };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krewkode.com";
  const localizedUrl = (targetLocale: string) =>
    new URL(
      `${targetLocale === "ar" ? "/ar" : ""}/work/${project.slug}`,
      baseUrl,
    ).toString();

  return {
    title: `${content.title} | Krew Kode`,
    description: content.tagline,
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <ProjectSection slug={slug} />;
}
