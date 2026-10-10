"use client";

import useOnlineStatus from "@/hooks/useOnlineStatus";
import { useTranslations } from "next-intl";

export default function OfflineScreen() {
  const t = useTranslations("offline");
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <section role="alert">
      <p>{t("message")}</p>
      <button type="button" onClick={() => window.location.reload()}>
        {t("retry")}
      </button>
    </section>
  );
}
