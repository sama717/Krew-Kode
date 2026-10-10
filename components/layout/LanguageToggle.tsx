"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type LanguageToggleProps = {
  tone?: "blend" | "theme";
};

export default function LanguageToggle({ tone }: LanguageToggleProps) {
  void tone;
  const locale = useLocale();
  const t = useTranslations("controls");
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "en" ? "ar" : "en";
  const isArabic = nextLocale === "ar";

  return (
    <button
      aria-label={t("switchLanguage")}
      className="inline-flex h-11 min-w-11 cursor-pointer items-center justify-center rounded-full px-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      type="button"
    >
      {isArabic ? (
        <span className="font-[var(--font-arabic)] text-lg leading-none" lang="ar">
          ع
        </span>
      ) : (
        <span className="font-mono text-xs font-medium tracking-wider" lang="en">
          EN
        </span>
      )}
    </button>
  );
}
