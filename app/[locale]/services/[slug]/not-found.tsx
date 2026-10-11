import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function ServiceNotFound() {
  const t = await getTranslations("services");
  const errors = await getTranslations("errors");

  return (
    <section className="bg-bg px-6 pt-[var(--nav-h)] text-fg">
      <div className="mx-auto max-w-[1200px] py-24">
        <h1 className="text-[clamp(36px,6vw,72px)] font-bold">
          {errors("notFound")}
        </h1>
        <Link
          className="mt-8 inline-flex text-[17px] font-bold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
          href="/services"
        >
          {t("detail.back")}
        </Link>
      </div>
    </section>
  );
}
