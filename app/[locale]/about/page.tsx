import { setRequestLocale } from "next-intl/server";
import AboutSection from "@/components/sections/AboutSection";
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

  return <AboutSection heading="h1" showCta={false} />;
}
