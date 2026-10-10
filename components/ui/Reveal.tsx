"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Variant = "fade-up" | "stagger" | "lines";
type Props = {
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  stagger?: number;
  start?: string;
  className?: string;
  id?: string;
  children: ReactNode;
};

export default function Reveal({
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  stagger = 0.12,
  start = "top 88%",
  className,
  id,
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets: Element[] =
        variant === "lines"
          ? Array.from(root.querySelectorAll("[data-reveal-line]"))
          : variant === "stagger"
            ? Array.from(root.querySelectorAll("[data-reveal-item]"))
            : [root];
      if (!targets.length) return;

      const showNow = () =>
        gsap.set(
          targets,
          variant === "lines"
            ? { yPercent: 0, visibility: "visible" }
            : { autoAlpha: 1, y: 0 },
        );

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        showNow();
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let timer: number | undefined;
        try {
          const from =
            variant === "lines"
              ? { yPercent: 105, visibility: "visible" }
              : { autoAlpha: 0, y: 24 };
          const to =
            variant === "lines"
              ? { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.12 }
              : {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power3.out",
                  stagger,
                };
          gsap.fromTo(targets, from, {
            ...to,
            delay,
            scrollTrigger: { trigger: root, start, once: true },
          });
          timer = window.setTimeout(() => {
            const hidden =
              variant === "lines"
                ? gsap.getProperty(targets[0], "yPercent") !== 0
                : Number(gsap.getProperty(targets[0], "opacity")) < 1;
            if (hidden && ScrollTrigger.isInViewport(root)) showNow();
          }, 2500);
        } catch {
          showNow();
        }
        return () => {
          if (timer) window.clearTimeout(timer);
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [variant, delay, stagger, start] },
  );

  const marker =
    variant === "fade-up" ? { "data-reveal": "" } : { "data-reveal-group": "" };
  return (
    <Tag ref={ref} id={id} className={className} {...marker}>
      {children}
    </Tag>
  );
}
