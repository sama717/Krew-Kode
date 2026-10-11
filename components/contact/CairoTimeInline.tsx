"use client";

import { useCairoTime } from "@/lib/cairo-time";

export default function CairoTimeInline() {
  const cairoTime = useCairoTime();

  if (!cairoTime) {
    return <span aria-hidden="true" className="inline-block h-5 w-[190px]" />;
  }

  return (
    <span className="font-mono text-[15px]">
      Cairo, EG /{" "}
      <bdi dir="ltr">
        {cairoTime.time} {cairoTime.offset}
      </bdi>
    </span>
  );
}
