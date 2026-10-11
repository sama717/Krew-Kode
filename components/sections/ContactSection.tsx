import { getTranslations } from "next-intl/server";
import CairoTimeInline from "@/components/contact/CairoTimeInline";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/constants";

type ContactSectionProps = {
  heading?: "h1" | "h2";
  firstOnPage?: boolean;
};

export default async function ContactSection({
  heading = "h2",
  firstOnPage = false,
}: ContactSectionProps) {
  const t = await getTranslations("contact");
  const Heading = heading;
  const socials = SITE.socials.filter(({ href }) => href);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      data-theme="dark"
      className={`bg-bg text-fg ${firstOnPage ? "pt-[var(--nav-h)]" : ""}`}
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-14 px-6 py-[120px] lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
        <div>
          <p className="font-mono text-[13px] uppercase tracking-wider text-white/60">
            {t("label")}
          </p>
          <Reveal
            as={Heading}
            id="contact-heading"
            variant="lines"
            className="mt-7 text-[clamp(64px,11vw,148px)] font-extrabold leading-[.95] tracking-[-0.05em] rtl:text-[clamp(52px,9vw,120px)] rtl:leading-[1.3] rtl:tracking-normal"
          >
            <span className="contact-heading-mask block overflow-hidden pb-[0.08em] rtl:py-[.15em] rtl:pb-[.25em] rtl:my-[-.15em] rtl:mb-[-.25em]">
              <span className="block" data-reveal-line>
                {t("heading.line1")}
              </span>
            </span>
            <span className="contact-heading-mask block overflow-hidden pb-[0.08em] rtl:py-[.15em] rtl:pb-[.25em] rtl:my-[-.15em] rtl:mb-[-.25em]">
              <span className="block" data-reveal-line>
                {t("heading.line2")}
              </span>
            </span>
          </Reveal>
          <Reveal
            className="mt-8 max-w-[420px] text-xl leading-[1.5] text-white/70"
            variant="fade-up"
          >
            {t("intro")}
          </Reveal>

          <Reveal className="mt-14" variant="stagger">
            <div
              data-reveal-item
              className="flex items-center justify-between gap-4 border-t border-white/[.14] py-5"
            >
              <span className="font-mono text-xs uppercase text-white/55">
                {t("rows.email")}
              </span>
              <a
                className="text-xl font-bold tracking-[-0.02em] transition-transform duration-300 hover:translate-x-2 rtl:hover:-translate-x-2"
                href={`mailto:${SITE.email}`}
              >
                {SITE.email}
              </a>
            </div>
            <div
              data-reveal-item
              className="flex items-center justify-between gap-4 border-t border-white/[.14] py-5"
            >
              <span className="font-mono text-xs uppercase text-white/55">
                {t("rows.basedIn")}
              </span>
              <CairoTimeInline />
            </div>
            <div
              data-reveal-item
              className="flex items-center justify-between gap-4 border-y border-white/[.14] py-5"
            >
              <span className="font-mono text-xs uppercase text-white/55">
                {t("rows.follow")}
              </span>
              <div className="flex flex-wrap justify-end gap-4">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    className="text-[17px] font-bold transition-transform duration-300 hover:translate-x-2 rtl:hover:-translate-x-2"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:pt-2" variant="fade-up">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
