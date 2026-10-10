"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";

type Panel = "terminal" | "design" | "ship";
type Panels = Record<Panel, ReactNode>;

type HeroInteractiveProps = {
  panels: Panels;
};

export default function HeroInteractive({ panels }: HeroInteractiveProps) {
  const locale = useLocale();
  const t = useTranslations("hero");
  const [activePanel, setActivePanel] = useState<Panel>("terminal");
  const [terminalReplay, setTerminalReplay] = useState(0);
  const touchSelection = useRef(false);

  const activatePanel = useCallback((panel: Panel) => {
    setActivePanel(panel);
    if (panel === "terminal") {
      setTerminalReplay((replay) => replay + 1);
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) {
      return;
    }

    const panels: Panel[] = ["terminal", "design", "ship"];
    let index = 0;
    const interval = window.setInterval(() => {
      if (touchSelection.current) {
        return;
      }
      index = (index + 1) % panels.length;
      activatePanel(panels[index]);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [activatePanel]);

  function selectPanel(panel: Panel) {
    activatePanel(panel);
    if (window.matchMedia("(hover: none)").matches) {
      touchSelection.current = true;
    }
  }

  const wordButtonClasses =
    "hero-word-button cursor-pointer bg-transparent p-0 text-inherit underline decoration-dotted decoration-[3px] decoration-white/35 underline-offset-[.1em] hover:decoration-white focus-visible:decoration-white focus-visible:outline-none";
  const codeWord = (
    <>
      <span className="font-mono">{"{"}</span>
      <span
        className={
          locale === "ar"
            ? "font-[var(--font-arabic)] tracking-normal"
            : "font-mono"
        }
      >
        {t("codeWord")}
      </span>
      <span className="font-mono">{"}"}</span>
    </>
  );

  return (
    <div className="grid flex-1 grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_.9fr]">
      <h1
        className="hero-headline text-start text-[clamp(48px,8.4vw,112px)] font-extrabold leading-[.96] tracking-[-0.05em]"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            activatePanel("terminal");
          }
        }}
        onMouseLeave={() => {
          if (!window.matchMedia("(hover: none)").matches) {
            activatePanel("terminal");
          }
        }}
      >
        <span className="hero-headline-mask block pb-2">
          <span className="hero-headline-reveal hero-headline-line-one">
            {t("headlineBeforeDesign")}
            <button
              className={wordButtonClasses}
              onClick={() => selectPanel("design")}
              onFocus={() => activatePanel("design")}
              onMouseEnter={() => activatePanel("design")}
              type="button"
            >
              {t("design")}
            </button>
            {t("designSuffix")}
          </span>
        </span>
        <span className="hero-headline-mask block pb-2">
          <span
            className={`hero-headline-reveal hero-headline-line-two font-extrabold text-accent ${locale === "ar" ? "tracking-normal" : "font-mono tracking-[-0.09em]"}`}
          >
            <button
              className={wordButtonClasses}
              onClick={() => selectPanel("terminal")}
              onFocus={() => activatePanel("terminal")}
              onMouseEnter={() => activatePanel("terminal")}
              type="button"
            >
              {codeWord}
            </button>
          </span>
        </span>
        <span className="hero-headline-mask block pb-2">
          <span className="hero-headline-reveal hero-headline-line-three">
            {t("conjunction")}
            <button
              className={wordButtonClasses}
              onClick={() => selectPanel("ship")}
              onFocus={() => activatePanel("ship")}
              onMouseEnter={() => activatePanel("ship")}
              type="button"
            >
              {t("ship")}
            </button>
            {t("shipSuffix")}
            <span
              aria-hidden="true"
              className="hero-caret ms-[.08em] inline-block h-[.1em] w-[.42em] bg-white align-middle"
            />
          </span>
        </span>
      </h1>

      <div className="flex w-full flex-col items-center md:items-end">
        <div
          aria-hidden="true"
          className="relative h-[320px] w-full max-w-[520px] [perspective:1400px] md:h-[380px] md:justify-self-end"
        >
          {(["terminal", "design", "ship"] as const).map((panel) => (
            <div
              className={`hero-panel ${activePanel === panel ? "hero-panel-active" : "hero-panel-inactive"}`}
              key={panel === "terminal" ? terminalReplay : panel}
            >
              {panels[panel]}
            </div>
          ))}
        </div>
        <p className="hero-hint-hover mt-3 text-center font-mono text-[11px] uppercase text-white/45">
          {t("hintHover")}
        </p>
        <p className="hero-hint-tap mt-3 text-center font-mono text-[11px] uppercase text-white/45">
          {t("hintTap")}
        </p>
      </div>
    </div>
  );
}
