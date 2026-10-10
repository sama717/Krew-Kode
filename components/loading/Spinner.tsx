import { getTranslations } from "next-intl/server";

export default async function Spinner() {
  return <div role="status">{(await getTranslations("loading"))("label")}</div>;
}
