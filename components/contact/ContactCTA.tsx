import { CONTACT_REDIRECT_URL } from "@/lib/constants";
import { getTranslations } from "next-intl/server";

export default async function ContactCTA() {
  const t = await getTranslations("contact");

  return (
    <a
      className="inline-flex rounded-md bg-zinc-900 px-4 py-2 font-medium text-white"
      href={CONTACT_REDIRECT_URL}
    >
      {t("continue")}
    </a>
  );
}
