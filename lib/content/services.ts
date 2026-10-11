import type { ComponentType } from "react";
import { AiIconScene } from "@/components/services/icons/AiIcon";
import { DesignIconScene } from "@/components/services/icons/DesignIcon";
import { DesktopIconScene } from "@/components/services/icons/DesktopIcon";
import { MobileIconScene } from "@/components/services/icons/MobileIcon";
import { WebIconScene } from "@/components/services/icons/WebIcon";
import { projects, type Project, type ServiceId } from "@/lib/content/projects";

export const serviceIds = [
  "design",
  "web",
  "mobile",
  "desktop",
  "ai",
] as const satisfies readonly ServiceId[];

export type Service = {
  id: ServiceId;
  IconScene: ComponentType;
};

export const services: Service[] = [
  { id: "design", IconScene: DesignIconScene },
  { id: "web", IconScene: WebIconScene },
  { id: "mobile", IconScene: MobileIconScene },
  { id: "desktop", IconScene: DesktopIconScene },
  { id: "ai", IconScene: AiIconScene },
];

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getRelatedProjects(id: ServiceId): Project[] {
  return projects.filter((project) => project.services.includes(id));
}
