import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactSection from "@/components/sections/ContactSection";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krewkode.com";
  const localizedUrl = (targetLocale: string) =>
    new URL(targetLocale === "ar" ? "/ar/contact" : "/contact", baseUrl).toString();

  return {
    title: "Contact | Krew Kode",
    description: t("intro"),
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactSection heading="h1" firstOnPage />;
}
