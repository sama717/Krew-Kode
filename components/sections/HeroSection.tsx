import { getTranslations } from "next-intl/server";
import ArrowLink from "@/components/ui/ArrowLink";
import HeroBackground from "@/components/hero/HeroBackground";
import HeroInteractive from "@/components/hero/HeroInteractive";
import DesignPanel from "@/components/hero/panels/DesignPanel";
import ShipPanel from "@/components/hero/panels/ShipPanel";
import TerminalPanel from "@/components/hero/panels/TerminalPanel";

function ArrowIcon({ direction }: { direction: "right" | "down" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "right" ? "h-5 w-5 rtl:-scale-x-100" : "h-4 w-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      {direction === "right" ? (
        <path
          d="M4 12h15m-6-6 6 6-6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M12 4v15m-6-6 6 6 6-6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default async function HeroSection() {
  const t = await getTranslations("hero");
  return (
    <section
      data-theme="dark"
      className="relative flex min-h-screen flex-col overflow-hidden bg-bg text-fg"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-6 pt-[var(--nav-h)]">
        <div className="flex flex-1 items-center">
          <HeroInteractive
            panels={{
              terminal: <TerminalPanel />,
              design: <DesignPanel />,
              ship: <ShipPanel />,
            }}
          />
        </div>
        <div className="flex items-center justify-between border-t border-white/14 pt-5 pb-7">
          <ArrowLink href="/work" tone="onDark">
            {t("workLink")}
          </ArrowLink>
          <span className="hero-scroll-label inline-flex items-center gap-2 font-mono text-[13px] uppercase text-white/70">
            {t("scroll")}
            <ArrowIcon direction="down" />
          </span>
        </div>
      </div>
    </section>
  );
}
