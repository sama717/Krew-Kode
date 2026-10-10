function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m3 8 3.2 3.2L13 4.5" />
    </svg>
  );
}

export default function ShipPanel() {
  return (
    <div
      className="hero-tilt relative h-full w-full max-w-[440px]"
      dir="ltr"
      lang="en"
    >
      <div className="hero-ghost-plate" />
      <div className="hero-ghost-plate hero-ghost-plate-back" />
      <div className="hero-window relative z-[1] flex h-full flex-col">
        <div className="flex h-10 shrink-0 items-center border-b border-white/12 px-4">
          <span className="rounded-full bg-white/8 px-3 py-1 font-mono text-[11px] text-white/70">
            your-site.com
          </span>
        </div>
        <div className="flex flex-1 flex-col items-start gap-4 px-6 py-7">
          <span className="h-[10px] w-[30%] rounded-sm bg-white/30" />
          <span className="h-[26px] w-[80%] rounded-sm bg-white" />
          <span className="h-[26px] w-[55%] rounded-sm bg-white" />
          <span className="h-2 w-[70%] rounded-sm bg-white/35" />
          <span className="h-2 w-[48%] rounded-sm bg-white/35" />
          <span className="mt-auto h-[34px] w-[120px] rounded-lg border border-white/50" />
        </div>
        <div className="flex h-11 shrink-0 items-center justify-between border-t border-white/12 px-4 font-mono text-[11px] uppercase text-white/70">
          <span>
            Build passed / Deployed
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Live
          </span>
        </div>
      </div>
      <span className="hero-chip absolute -end-[14px] -top-4 z-[2] flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-mono text-[11px] uppercase text-black">
        <CheckIcon />
        Shipped
      </span>
    </div>
  );
}
