"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Suspense, type ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  tone?: "blend" | "theme";
  className?: string;
  onClick?: () => void;
};

function ActiveNavLink({
  href,
  children,
  tone = "blend",
  className,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  const toneClasses =
    tone === "blend"
      ? isActive
        ? "text-white font-bold"
        : "text-white/65 font-medium hover:text-white"
      : isActive
        ? "text-fg font-bold"
        : "text-muted font-medium hover:text-fg";

  return (
    <Link
      className={`relative inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${toneClasses} ${isActive ? "after:absolute after:inset-x-0 after:bottom-1 after:h-0.5 after:bg-current after:content-['']" : ""} ${className ?? ""}`}
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default function NavLink(props: NavLinkProps) {
  const tone = props.tone ?? "blend";
  const fallbackTone =
    tone === "blend"
      ? "text-white/65 font-medium hover:text-white"
      : "text-muted font-medium hover:text-fg";

  return (
    <Suspense
      fallback={
        <Link
          className={`relative inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${fallbackTone} ${props.className ?? ""}`}
          href={props.href}
          onClick={props.onClick}
        >
          {props.children}
        </Link>
      }
    >
      <ActiveNavLink {...props} />
    </Suspense>
  );
}
