"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProjectCover from "@/components/work/ProjectCover";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Project, ProjectTone } from "@/lib/content/projects";

export type WorkCardItem = Project & {
  title: string;
  category: string;
  subtitle: string;
  tagline: string;
  viewProject: string;
  tags: string[];
};

type WorkStackProps = {
  items: WorkCardItem[];
};

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`${className} rtl:-scale-x-100`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function toneClasses(tone: ProjectTone) {
  return tone === "dark"
    ? "bg-[#0A0A0A] text-white"
    : "bg-[#E4E7E5] text-[#0A0A0A]";
}

export default function WorkStack({ items }: WorkStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-work-card]",
            wrapper,
          );
          const navHeight =
            Number.parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--nav-h",
              ),
            ) || 0;

          cards.slice(0, -1).forEach((card, index) => {
            const nextCard = cards[index + 1];
            const body = card.querySelector<HTMLElement>("[data-work-body]");
            const overlay =
              card.querySelector<HTMLElement>("[data-work-overlay]");
            if (!nextCard || !body || !overlay) return;

            const scrollTrigger = {
              trigger: nextCard,
              start: "top bottom",
              end: `top top+=${navHeight + index * 72}`,
              scrub: 0.6,
            };

            gsap.to(body, {
              scale: 0.96,
              transformOrigin: "center center",
              scrollTrigger,
            });
            gsap.fromTo(
              overlay,
              { opacity: 0 },
              { opacity: 0.45, scrollTrigger },
            );
          });
        },
      );

      return () => media.revert();
    },
    { scope: wrapperRef, dependencies: [locale], revertOnUpdate: true },
  );

  useEffect(() => {
    let active = true;
    void document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <div ref={wrapperRef} className="mt-[72px] flex flex-col">
      {items.map((project, index) => {
        const style = {
          top: `calc(var(--nav-h) + ${index * 72}px)`,
          zIndex: index + 1,
        };
        const colorVariables = {
          "--card-bg": project.tone === "dark" ? "#0A0A0A" : "#E4E7E5",
          "--card-fg": project.tone === "dark" ? "#FFFFFF" : "#0A0A0A",
        } as CSSProperties & {
          "--card-bg": string;
          "--card-fg": string;
        };

        return (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            data-work-card=""
            className={`group relative mb-4 block h-auto overflow-hidden rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg lg:sticky lg:mb-0 lg:h-[520px] ${toneClasses(project.tone)}`}
            style={{ ...style, ...colorVariables }}
          >
            <div className="grid h-[72px] grid-cols-[40px_1fr_44px] items-center gap-4 border-b border-current/15 px-6 lg:grid-cols-[48px_1fr_auto_44px] lg:px-8">
              <span className="font-mono text-[13px] opacity-60">
                {project.number}
              </span>
              <span className="text-[28px] font-bold tracking-[-0.03em]">
                {project.title}
              </span>
              <span className="hidden font-mono text-xs uppercase opacity-60 lg:block">
                {project.category} / {project.subtitle}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/40 transition-[background-color,color,rotate] duration-300 group-hover:rotate-[-45deg] group-hover:bg-[var(--card-fg)] group-hover:text-[var(--card-bg)] rtl:group-hover:rotate-[45deg]">
                <ArrowIcon />
              </span>
            </div>

            <div
              data-work-body=""
              className="grid grid-cols-1 items-center gap-8 px-6 lg:h-[448px] lg:grid-cols-[1.05fr_.95fr] lg:px-10"
            >
              <div className="py-8 lg:py-0">
                <p className="max-w-[520px] text-[clamp(26px,3vw,40px)] font-bold leading-[1.15] tracking-[-0.03em]">
                  {project.tagline}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-current/30 px-3.5 py-1.5 font-mono text-xs uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-9 inline-flex items-center gap-2 border-b border-current pb-0.5 text-[17px] font-bold">
                  {project.viewProject}
                  <ArrowIcon className="h-5 w-5" />
                </span>
              </div>

              <ProjectCover
                bare
                kind={project.kind}
                tone={project.tone}
                scale={1.45}
                className="h-[260px] lg:h-full"
              />
            </div>

            <div
              aria-hidden="true"
              data-work-overlay=""
              className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0"
            />
          </Link>
        );
      })}
    </div>
  );
}
