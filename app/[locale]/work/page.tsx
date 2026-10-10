import { setRequestLocale } from "next-intl/server";
import WorkSection from "@/components/sections/WorkSection";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type WorkPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorkSection />;
}
