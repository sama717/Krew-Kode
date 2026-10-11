import { useEffect, useState } from "react";

export type CairoTime = {
  time: string;
  offset: string;
  isNight: boolean;
};

function getCairoTime(): CairoTime {
  const date = new Date();
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    numberingSystem: "latn",
  }).formatToParts(date);
  const zoneParts = new Intl.DateTimeFormat("en", {
    timeZone: "Africa/Cairo",
    timeZoneName: "shortOffset",
    numberingSystem: "latn",
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

export function useCairoTime(): CairoTime | null {
  const [cairoTime, setCairoTime] = useState<CairoTime | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCairoTime(getCairoTime()));
    const interval = window.setInterval(
      () => setCairoTime(getCairoTime()),
      15_000,
    );

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, []);

  return cairoTime;
}
