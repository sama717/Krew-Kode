import { setRequestLocale } from "next-intl/server";
import ServicesSection from "@/components/sections/ServicesSection";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesSection />;
}
