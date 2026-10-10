import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  IBM_Plex_Sans_Arabic,
  JetBrains_Mono,
} from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import Logo from "@/components/layout/Logo";
import Navbar from "@/components/layout/Navbar";
import OfflineScreen from "@/components/layout/OfflineScreen";
import RouteProgressBar from "@/components/loading/RouteProgressBar";
import SplashScreen from "@/components/splash/SplashScreen";
import { routing } from "@/i18n/routing";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import "../globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const arabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/",
        ar: "/ar",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const navT = await getTranslations("nav");

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${bricolage.variable} ${jetBrains.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="site-initialization"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `${THEME_INIT_SCRIPT}
document.documentElement.dataset.js = "1";
try {
  if (!sessionStorage.getItem("splash") && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    document.documentElement.dataset.splash = "on";
  }
} catch (error) {
  console.error("Unable to check splash session state.", error);
}`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SplashScreen
            logo={
              <Logo
                variant="color"
                label={navT("homeLabel")}
                height={72}
                className="text-fg"
                style={{ "--logo-accent": "var(--accent)" }}
              />
            }
          />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <OfflineScreen />
          <RouteProgressBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
