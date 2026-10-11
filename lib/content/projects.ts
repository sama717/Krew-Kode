export type ProjectKind = "web" | "mobile" | "desktop" | "ai";
export type ProjectTone = "dark" | "light";
export type ServiceId = "design" | "web" | "mobile" | "desktop" | "ai";

export type Project = {
  slug: string;
  number: string;
  kind: ProjectKind;
  tone: ProjectTone;
  year: "2026";
  services: ServiceId[];
};

export const projects: Project[] = [
  {
    slug: "lumen",
    number: "01",
    kind: "web",
    tone: "dark",
    year: "2026",
    services: ["web", "design"],
  },
  {
    slug: "kite",
    number: "02",
    kind: "mobile",
    tone: "light",
    year: "2026",
    services: ["mobile", "design"],
  },
  {
    slug: "forge",
    number: "03",
    kind: "desktop",
    tone: "dark",
    year: "2026",
    services: ["desktop", "design"],
  },
  {
    slug: "sage",
    number: "04",
    kind: "ai",
    tone: "light",
    year: "2026",
    services: ["ai", "web"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1 + projects.length) % projects.length];
}
