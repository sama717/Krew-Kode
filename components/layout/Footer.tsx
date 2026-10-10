import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer>
      {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
      {SITE.socials.map((social) => (
        <a key={social.href} href={social.href}>
          {social.label}
        </a>
      ))}
    </footer>
  );
}
