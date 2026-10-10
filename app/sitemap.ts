import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://krewkode.com";
  const paths = ["/", "/about", "/services", "/work", "/contact"];

  return paths.flatMap((path) => {
    const urlFor = (locale: "en" | "ar") => {
      const localizedPath =
        locale === "en" ? path : `/ar${path === "/" ? "" : path}`;

      return new URL(localizedPath, baseUrl).toString();
    };

    return [
      {
        url: urlFor("en"),
        alternates: {
          languages: {
            en: urlFor("en"),
            ar: urlFor("ar"),
          },
        },
      },
      {
        url: urlFor("ar"),
        alternates: {
          languages: {
            en: urlFor("en"),
            ar: urlFor("ar"),
          },
        },
      },
    ];
  });
}
