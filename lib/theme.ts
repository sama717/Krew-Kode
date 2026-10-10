export const THEME_KEY = "theme";

export type Theme = "light" | "dark";

export function getCairoDefaultTheme(): Theme {
  const hour = parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Cairo",
      hour: "2-digit",
      hourCycle: "h23",
    }).format(new Date()),
    10,
  );

  return hour >= 18 || hour < 6 ? "dark" : "light";
}

export const THEME_INIT_SCRIPT = `try {
  var t = localStorage.getItem("${THEME_KEY}");
  if (t !== "light" && t !== "dark") {
    var h = parseInt(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Cairo",
      hour: "2-digit",
      hourCycle: "h23"
    }).format(new Date()), 10);
    t = (h >= 18 || h < 6) ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", t);
} catch (error) {
  document.documentElement.setAttribute("data-theme", "dark");
}`;
