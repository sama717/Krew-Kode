export const principles = [
  "design-first",
  "built-to-last",
  "clear-from-day-one",
] as const;

type AboutSlideId =
  | "sketching"
  | "wireframing"
  | "building-ui"
  | "writing-code"
  | "shipping";

type AboutSlide = {
  id: AboutSlideId;
  label: AboutSlideId;
  width: number;
  height: number;
  video?: string;
};

export const slides: readonly AboutSlide[] = [
  { id: "sketching", label: "sketching", width: 380, height: 460 },
  { id: "wireframing", label: "wireframing", width: 300, height: 340 },
  { id: "building-ui", label: "building-ui", width: 440, height: 400 },
  { id: "writing-code", label: "writing-code", width: 300, height: 460 },
  { id: "shipping", label: "shipping", width: 360, height: 340 },
];
