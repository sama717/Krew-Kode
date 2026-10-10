import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function ProjectNotFound() {
  const t = await getTranslations("errors");

  return (
    <section className="pt-[var(--nav-h)]">
      <h1>{t("projectNotFound")}</h1>
      <Link href="/work">{t("backToWork")}</Link>
    </section>
  );
}
