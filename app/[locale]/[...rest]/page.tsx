import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const instant = false;

type UnknownPageProps = {
  params: Promise<{ locale: string; rest: string[] }>;
};

export default async function UnknownPage({
  params,
}: UnknownPageProps): Promise<never> {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
