"use client";

import { useEffect, useState, type FocusEvent, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import AiIcon from "@/components/services/icons/AiIcon";
import DesignIcon from "@/components/services/icons/DesignIcon";
import DesktopIcon from "@/components/services/icons/DesktopIcon";
import MobileIcon from "@/components/services/icons/MobileIcon";
import WebIcon from "@/components/services/icons/WebIcon";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

type ServicesListProps = {
  items: ServiceItem[];
};

const iconMap: Record<string, ReactNode> = {
  design: <DesignIcon />,
  web: <WebIcon />,
  mobile: <MobileIcon />,
  desktop: <DesktopIcon />,
  ai: <AiIcon />,
};

function ArrowGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 rtl:-scale-x-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M5 12h12m-5-5 5 5-5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesList({ items }: ServicesListProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none)");
    const updateTouchState = () => {
      const touch = mediaQuery.matches;
      setIsTouch(touch);
      if (touch) setHovered(null);
    };

    updateTouchState();
    mediaQuery.addEventListener("change", updateTouchState);

    return () => mediaQuery.removeEventListener("change", updateTouchState);
  }, []);

  const handleListBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (
      !(event.relatedTarget instanceof Node) ||
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setHovered(null);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouch) setHovered(null);
  };

  return (
    <div
      className="relative mt-[88px]"
      onBlur={handleListBlur}
      onMouseLeave={handleMouseLeave}
    >
      <Reveal variant="stagger">
        {items.map((item, index) => {
          const isActive =
            hovered === item.id || (hovered === null && index === 0);
          const isExpanded = isTouch || isActive;
          const isIconVisible = !isTouch && hovered === item.id;
          const isArrowActive = !isTouch && isActive;

          return (
            <Link
              key={item.id}
              href={`/services/${item.id}`}
              className={`grid grid-cols-[36px_1fr] items-start gap-x-4 border-t border-white/[.14] py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:grid-cols-[64px_1fr_56px] ${
                index === items.length - 1 ? "border-b border-white/[.14]" : ""
              }`}
              data-reveal-item=""
              onFocus={() => {
                if (!isTouch) setHovered(item.id);
              }}
              onMouseEnter={() => {
                if (!isTouch) setHovered(item.id);
              }}
            >
              <div
                className={`pt-[18px] font-mono text-[13px] ${
                  isActive ? "text-white" : "text-white/45"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0">
                <span
                  className={`block text-[clamp(34px,4.6vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] transition-[color,translate] duration-400 ease-[cubic-bezier(.2,.8,.2,1)] rtl:text-[clamp(28px,4vw,48px)] rtl:leading-[1.35] ${
                    isActive
                      ? "translate-x-3 text-white rtl:-translate-x-3"
                      : "text-white/50"
                  }`}
                >
                  {item.title}
                </span>

                <div
                  className={`grid transition-[grid-template-rows] duration-450 ease-[cubic-bezier(.2,.8,.2,1)] ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-[minmax(0,1fr)_380px]">
                      <div className="self-start">
                        <p className="ms-3 max-w-[520px] text-[18px] leading-[1.5] text-white/70">
                          {item.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2 ms-3">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/25 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-white/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="relative hidden h-[320px] lg:block [@media(hover:none)]:hidden">
                        <div
                          aria-hidden="true"
                          dir="ltr"
                          className={`pointer-events-none absolute inset-0 flex items-center justify-center [perspective:1200px] transition-[opacity,translate,scale] duration-500 ${
                            isIconVisible
                              ? "translate-y-0 scale-100 opacity-100"
                              : "translate-y-3 scale-[.96] opacity-0"
                          }`}
                        >
                          {iconMap[item.id]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-1 hidden md:flex md:justify-end">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border [transition:background-color_300ms,border-color_300ms,color_300ms,rotate_400ms] ${
                    isArrowActive
                      ? "rotate-[-45deg] border-white bg-white text-black rtl:rotate-[45deg]"
                      : "rotate-0 border-white/30 bg-transparent text-white"
                  }`}
                >
                  <ArrowGlyph />
                </span>
              </div>
            </Link>
          );
        })}
      </Reveal>
    </div>
  );
}
