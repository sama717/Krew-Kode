import type { CSSProperties } from "react";
import type { ProjectKind, ProjectTone } from "@/lib/content/projects";
import { AiIconScene } from "@/components/services/icons/AiIcon";
import { DesktopIconScene } from "@/components/services/icons/DesktopIcon";
import { MobileIconScene } from "@/components/services/icons/MobileIcon";
import { WebIconScene } from "@/components/services/icons/WebIcon";

type ProjectCoverProps = {
  kind: ProjectKind;
  tone: ProjectTone;
  scale?: number;
  bare?: boolean;
  className?: string;
};

type CoverVariables = CSSProperties & {
  "--icon-line": string;
  "--icon-bg": string;
  backgroundColor?: string;
};

const scenes = {
  web: WebIconScene,
  mobile: MobileIconScene,
  desktop: DesktopIconScene,
  ai: AiIconScene,
};

export default function ProjectCover({
  kind,
  tone,
  scale = 1.45,
  bare = false,
  className = "",
}: ProjectCoverProps) {
  const Scene = scenes[kind];
  const background = tone === "dark" ? "#0A0A0A" : "#E4E7E5";
  const variables: CoverVariables = {
    "--icon-line":
      tone === "dark" ? "rgba(255,255,255,.8)" : "rgba(10,10,10,.75)",
    "--icon-bg": background,
    ...(bare ? {} : { backgroundColor: background }),
  };

  return (
    <div
      className={`flex h-full w-full items-center justify-center [perspective:1100px] ${
        bare ? "" : "overflow-hidden rounded-2xl"
      } ${className}`}
      style={variables}
    >
      <div
        className="flex shrink-0 items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        <Scene />
      </div>
    </div>
  );
}
