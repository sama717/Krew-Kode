import { getTranslations } from "next-intl/server";
import ContactCTA from "@/components/contact/ContactCTA";
import ContactForm from "@/components/contact/ContactForm";
import { CONTACT_MODE } from "@/lib/constants";

export default async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section className="w-full max-w-2xl space-y-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-zinc-600">{t("intro")}</p>
      </div>
      {CONTACT_MODE === "form" ? <ContactForm /> : <ContactCTA />}
    </section>
  );
}
