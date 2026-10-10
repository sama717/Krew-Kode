export default function DesignPanel() {
  return (
    <>
      <div className="hero-design-perspective flex h-full items-center justify-center">
        <div className="hero-design-canvas relative h-[200px] w-[300px]">
          <div className="hero-design-plane absolute inset-0 rounded-[10px] border border-white/40 bg-white/5 p-[18px]" />
          <div className="hero-design-plane-two hero-design-plane absolute inset-0 rounded-[10px] border border-white/40 bg-white/5 p-[18px]">
            <div className="grid h-full grid-cols-2 gap-3">
              <div className="rounded-[8px] border border-white/35" />
              <div className="rounded-[8px] border border-white/35" />
            </div>
          </div>
          <div className="hero-design-plane-three hero-design-plane absolute inset-0 rounded-[10px] border border-white/40 bg-white/5 p-[18px]">
            <div className="flex h-full flex-col items-start gap-3">
              <span className="h-[14px] w-[70%] rounded-sm bg-white" />
              <span className="h-[6px] w-[90%] rounded-sm bg-white/40" />
              <span className="h-[6px] w-[60%] rounded-sm bg-white/40" />
              <span className="mt-auto h-6 w-20 rounded-md bg-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
