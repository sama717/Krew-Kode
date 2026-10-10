import type { CSSProperties } from "react";

const lineDelays = ["0.3s", "1.7s", "2.6s", "3.4s"] as const;

type TerminalLineStyle = CSSProperties & {
  "--typing-width": string;
  "--typing-steps": number;
  "--typing-delay": string;
};

function typingStyle(
  width: string,
  steps: number,
  delay: string,
): TerminalLineStyle {
  return {
    "--typing-width": width,
    "--typing-steps": steps,
    "--typing-delay": delay,
  };
}

export default function TerminalPanel() {
  const lines = [
    "$ npx create-next-app krew-kode",
    "Project created.",
    "$ npm run dev",
    "Ready on localhost:3000",
  ];

  return (
    <div
      className="hero-tilt relative h-full w-full max-w-[440px]"
      dir="ltr"
      lang="en"
    >
      <div className="hero-ghost-plate" />
      <div className="hero-ghost-plate hero-ghost-plate-back" />
      <div className="hero-window relative z-[1] flex h-full flex-col">
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/12 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-white/22" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/22" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/22" />
          <span className="ms-2 font-mono text-[11px] text-white/70">
            krew-kode / zsh
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1 overflow-hidden px-5 py-[18px] font-mono text-sm leading-[1.9] text-white/85">
          {lines.map((line, index) => {
            const isCommand = line.startsWith("$ ");
            const isReady = index === 3;
            const lineText = isCommand ? line.slice(2) : line;
            const lineStyle = typingStyle(
              `${line.length}ch`,
              line.length,
              lineDelays[index],
            );

            return (
              <span
                className={`terminal-line ${isReady ? "text-accent" : ""}`}
                key={line}
                style={lineStyle}
              >
                {isCommand && <span className="text-white/45">$ </span>}
                {lineText}
              </span>
            );
          })}
          <span
            className="terminal-line text-white/45"
            style={typingStyle("3ch", 2, "4.8s")}
          >
            ${" "}
            <span className="terminal-cursor inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-white/80" />
          </span>
        </div>
      </div>
      <span className="hero-chip absolute -end-[14px] -top-4 z-[2] rounded-full bg-white px-3 py-1 font-mono text-[11px] uppercase text-black">
        localhost:3000
      </span>
    </div>
  );
}
