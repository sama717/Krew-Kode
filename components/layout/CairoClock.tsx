"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type CairoTime = {
  time: string;
  offset: string;
  isNight: boolean;
};

type CairoClockProps = {
  tone: "blend" | "theme";
};

function getCairoTime(): CairoTime {
  const date = new Date();
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const zoneParts = new Intl.DateTimeFormat("en", {
    timeZone: "Africa/Cairo",
    timeZoneName: "shortOffset",
  }).formatToParts(date);
  const hour = Number(timeParts.find((part) => part.type === "hour")?.value);
  const minute = timeParts.find((part) => part.type === "minute")?.value ?? "00";
  const offset =
    zoneParts.find((part) => part.type === "timeZoneName")?.value ?? "GMT";

  return {
    time: `${String(hour).padStart(2, "0")}:${minute}`,
    offset: offset === "GMT" ? "GMT+0" : offset,
    isNight: hour >= 18 || hour < 6,
  };
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8a8.5 8.5 0 1 0 11.4 11.4Z"
      />
    </svg>
  );
}

export default function CairoClock({ tone }: CairoClockProps) {
  const t = useTranslations("clock");
  const [cairoTime, setCairoTime] = useState<CairoTime | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setCairoTime(getCairoTime());
    });
    const interval = window.setInterval(() => {
      setCairoTime(getCairoTime());
    }, 15_000);

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, []);

  if (!cairoTime) {
    return <div aria-hidden="true" className="h-[38px] w-[150px]" />;
  }

  const secondaryText = tone === "blend" ? "text-white/65" : "text-muted";

  return (
    <div
      aria-label={`${t("city")}, ${cairoTime.time} ${cairoTime.offset}`}
      className="flex h-[38px] w-[150px] flex-col items-start justify-center text-start font-mono text-[12px] uppercase tracking-wider"
    >
      <div className={`flex items-center gap-1.5 ${secondaryText}`}>
        {cairoTime.isNight ? <MoonIcon /> : <SunIcon />}
        <span className="cairo-clock-city">{t("city")}</span>
      </div>
      <div className="font-bold text-start">
        <bdi dir="ltr">
          {cairoTime.time} {cairoTime.offset}
        </bdi>
      </div>
    </div>
  );
}
