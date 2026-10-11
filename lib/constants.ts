export const CONTACT_MODE: "form" | "redirect" = "form";
export const CONTACT_REDIRECT_URL =
  process.env.NEXT_PUBLIC_CONTACT_REDIRECT_URL ?? "";

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "contact", href: "/contact" },
] as const;

export const NAV_CTA = {
  key: "cta",
  href: "/contact",
} as const;

export const SITE = {
  name: "Site name",
  // TODO: Replace these contact placeholders with the production destinations.
  email: "hello@krewkode.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
};
