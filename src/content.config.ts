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

/**
 * Selected work. `order` is manual rather than chronological: these are picked
 * to lead with the strongest story, not the most recent one.
 */
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.string(),
    order: z.number().int().positive(),
    stack: z.array(z.string()).nonempty(),
    highlights: z.array(z.string()).default([]),
    /** Opts this card into an inline diagram. */
    diagram: z.enum(["attribution", "social-core"]).optional(),
  }),
});

/**
 * Recommendations. The body is the quote, verbatim: these are other people's
 * words and should not be edited or trimmed.
 */
const recommendations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recommendations" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    linkedin: z.string().url(),
    /** Key into src/config/images.ts. */
    photo: z.enum(["luis", "joao"]),
    order: z.number().int().positive(),
  }),
});

export const collections = { experience, projects, recommendations };
