import { getTranslations } from "next-intl/server";

type ProjectSectionProps = {
  slug: string;
};

export default async function ProjectSection({ slug }: ProjectSectionProps) {
  const t = await getTranslations("project");

  return (
    <section
      aria-label={t("ariaLabel", { slug })}
      className="pt-[var(--nav-h)]"
    />
  );
}
