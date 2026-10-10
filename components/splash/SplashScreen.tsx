"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ScrollTrigger } from "@/lib/gsap";

type SplashScreenProps = {
  logo: ReactNode;
  onComplete?: () => void;
};

export default function SplashScreen({ logo, onComplete }: SplashScreenProps) {
  const t = useTranslations("splash");
  const [isFinished, setIsFinished] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.splash !== "on") {
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) {
      return;
    }
    const overlayElement = overlay;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let startTime: number | undefined;
    let animationFrame = 0;
    let exitTimeout = 0;
    let completed = false;

    function complete() {
      if (completed) {
        return;
      }

      completed = true;
      try {
        sessionStorage.setItem("splash", "1");
      } catch (error) {
        console.error("Unable to save splash session state.", error);
      }

      delete document.documentElement.dataset.splash;
      document.body.style.overflow = previousOverflow;
      ScrollTrigger.refresh();
      setIsFinished(true);
      onComplete?.();
    }

    function animate(timestamp: number) {
      startTime ??= timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / 2200, 1);
      const count = Math.floor(progress * 100);

      if (counterRef.current) {
        counterRef.current.textContent = String(count).padStart(3, "0");
      }
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }

      if (elapsed >= 2400) {
        overlayElement.classList.add("splash-exiting");
        exitTimeout = window.setTimeout(complete, 800);
        return;
      }

      animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimeout);
      if (!completed) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [onComplete]);

  if (isFinished) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="splash fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      data-theme="dark"
      ref={overlayRef}
    >
      <div className="overflow-hidden">
        <div className="splash-logo">{logo}</div>
      </div>
      <div className="absolute inset-x-6 bottom-8">
        <div className="mb-4 h-px w-full bg-white/14">
          <span
            className="block h-full w-0 bg-white"
            ref={progressRef}
          />
        </div>
        <div className="flex items-center justify-between font-mono uppercase">
          <span className="tabular-nums text-white/70" ref={counterRef}>
            000
          </span>
          <span className="text-white">{t("loading")}</span>
        </div>
      </div>
    </div>
  );
}
