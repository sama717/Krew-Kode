import { setRequestLocale } from "next-intl/server";
import ProjectSection from "@/components/sections/ProjectSection";
import { routing } from "@/i18n/routing";

export const instant = false;

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <ProjectSection slug={slug} />;
}
