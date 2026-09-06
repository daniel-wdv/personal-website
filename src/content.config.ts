import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * One Markdown file per role. Frontmatter carries the structured bits the
 * timeline renders; the body holds the summary prose.
 *
 * `start` / `end` are YYYY-MM. A null `end` means the role is current, which is
 * what drives the "Present" label and the sort order.
 */
const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    start: z.string().regex(/^\d{4}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}$/).nullable(),
    stack: z.array(z.string()).nonempty(),
    highlights: z.array(z.string()).default([]),
  }),
});

export const collections = { experience };
