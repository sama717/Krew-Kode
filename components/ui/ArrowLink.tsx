import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type ArrowLinkProps = {
  children: ReactNode;
  href: string;
  tone: "onDark" | "theme";
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 rtl:-scale-x-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path
        d="M4 12h15m-6-6 6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ArrowLink({ children, href, tone }: ArrowLinkProps) {
  const color = tone === "onDark" ? "text-white decoration-white" : "text-fg";

  return (
    <Link
      className={`inline-flex items-center gap-2 text-[17px] font-bold underline decoration-current underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${color}`}
      href={href}
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}
