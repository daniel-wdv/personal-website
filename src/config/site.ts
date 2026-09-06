import type { IconName } from "../components/Icon.astro";

/**
 * Single source of truth for site-wide content that isn't long-form enough to
 * live in a content collection. Edit here rather than in components.
 */
export const site = {
  name: "Daniel Carvalho",
  role: "Fullstack Engineer",
  email: "danielcarvalho.wd@gmail.com",
  description:
    "Fullstack engineer with over 7 years of experience building web platforms, mobile apps and backend systems.",
  links: [
    { label: "GitHub", href: "https://github.com/daniel-wdv", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/daniel-carvalho-wd",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:danielcarvalho.wd@gmail.com",
      icon: "mail",
    },
  ],
} as const satisfies {
  links: readonly { label: string; href: string; icon: IconName }[];
  [key: string]: unknown;
};
