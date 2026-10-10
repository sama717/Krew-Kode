"use client";

import { useTranslations } from "next-intl";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  const t = useTranslations("errors");

  return (
    <section>
      <p>{t("generic")}</p>
      <button type="button" onClick={reset}>
        {t("retry")}
      </button>
    </section>
  );
}
