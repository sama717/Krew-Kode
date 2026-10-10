import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";

type LogoProps = {
  variant: "mono" | "color" | "letters" | "chevron";
  label?: string;
  height?: number;
  className?: string;
  style?: CSSProperties & {
    "--logo-accent"?: string;
    "--logo-chevron"?: string;
  };
};

const logoSource = readFileSync(
  join(process.cwd(), "public", "krewkode.svg"),
  "utf8",
);

const logoPaths = Array.from(
  logoSource.matchAll(/<path\b([^>]*?)\/>/g),
  ([, attributes]) => {
    const pathData = attributes.match(/\bd="([^"]+)"/)?.[1];

    if (!pathData) {
      throw new Error("A Krew Kode logo path is missing its path data.");
    }

    return pathData;
  },
);

if (logoPaths.length !== 2) {
  throw new Error("Expected two paths in public/krewkode.svg.");
}

export default function Logo({
  variant,
  label,
  height = 48,
  className,
  style,
}: LogoProps) {
  return (
    <svg
      aria-hidden={variant === "chevron" || variant === "letters" || undefined}
      aria-label={variant === "mono" || variant === "color" ? label : undefined}
      className={className}
      height={height}
      role={variant === "mono" || variant === "color" ? "img" : undefined}
      style={{ width: "auto", ...style }}
      viewBox="0 0 620 395"
      xmlns="http://www.w3.org/2000/svg"
    >
      {(variant === "mono" || variant === "color" || variant === "letters") && (
        <path d={logoPaths[0]} fill="currentColor" fillRule="evenodd" />
      )}
      {(variant === "mono" || variant === "color" || variant === "chevron") && (
        <path
          d={logoPaths[1]}
          fill={
            variant === "color"
              ? "var(--logo-accent, currentColor)"
              : variant === "chevron"
                ? "var(--logo-chevron, #059669)"
                : "currentColor"
          }
          fillRule="evenodd"
        />
      )}
    </svg>
  );
}
