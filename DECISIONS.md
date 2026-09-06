# Personal Website — Decisions & Plan

Brainstorm output, 2026-09-06. Everything below is decided unless marked **OPEN**.

---

## 1. Purpose

Job-hunting asset. The `Website` link is already on CVs going out, so this needs to be live
and good. A recruiter or hiring manager reads the CV, clicks through, and spends **60–90
seconds**. That is the entire brief.

Consequences:
- Ship a simple site fast > ship a great site in three weeks.
- No feature exists unless it helps that 90-second visit.
- Must be excellent on mobile — links get opened on phones.

---

## 2. Structure

**Single page, anchor-scroll nav. No multi-page routing in v1.**

Sections, in order:

1. **Hero** — name, "Fullstack Engineer", one-liner from the CV summary, links to
   GitHub / LinkedIn / CV PDF / email. Everything above the fold.
2. **About** — 3–4 sentences, first person, same voice as the CV summary.
3. **Selected Work** — 4 projects (see §6).
4. **Experience** — timeline tree (see §7), condensed. Detail lives in the CV.
5. **Recommendations** — Luis and João quotes, photos, LinkedIn links. This is also where
   the full letters live, so they don't need to be attached separately to applications.
6. **Interests** — outside-of-work section. Includes a photo with the dog.
7. **Contact** — email, plain text. No form.

Project detail pages: structure the content model so they're possible later, but **do not
build them for v1**.

---

## 3. Tech stack

| Decision | Choice | Reasoning |
|---|---|---|
| Framework | **Astro** | Content-first, zero JS by default, type-safe content collections. React components can be dropped in for interactive bits, so existing knowledge transfers. |
| Styling | **Tailwind** | Already known, fast to iterate, no separate CSS files to maintain. |
| Animation | **CSS only** — `animation-timeline: view()` + IntersectionObserver fallback | Framer Motion would add ~50kb for things CSS does natively. |
| CMS | **None** | Markdown in the repo. No accounts, no API keys, no free tier that can change. |
| Language | TypeScript | |

Next.js was considered and rejected: no auth, no data fetching, no interactivity — shipping
a React runtime to render static text. "Astro because the site is content-first and doesn't
need a client runtime" is also a better interview answer than reaching for Next.js by reflex.

---

## 4. Content model

```
src/content/
  projects/
    social-core.md
    influence-attribution.md
    catalog-ai.md
    content-quality-pipeline.md
  experience/
    bloop.md
    impresa.md
    issho.md
    pluricosmetica.md
    wecreateyou.md
```

Frontmatter + Markdown per entry. Astro Content Collections validate the frontmatter schema
at build time, so a broken entry fails the build instead of shipping.

Adding a project = adding one file. Editing content = editing Markdown, `git push`, auto-rebuild.

Suggested project frontmatter:
```yaml
title: string
summary: string          # one line, shown on the card
role: string             # what I personally did
stack: string[]          # tags
year: string
highlights: string[]     # 2-4 bullets
```

---

## 5. Hosting

**Cloudflare Pages.** Free tier, unlimited bandwidth, global CDN, free SSL, deploy on git push,
no cold starts. **Fallback: Vercel** if anything doesn't work.

**Domain is not free** — ~€12–15/year (e.g. `danielcarvalho.dev`). Can launch on the free
`*.pages.dev` subdomain, but a real domain is worth it given the link goes on CVs.

---

## 6. Selected Work — the four projects

More technical depth than the CV allows, but **same confidentiality rule as the CV: describe
the systems, never Bloop's internal product names.**

1. **In-house replacement for a third-party social SaaS** — persistence + transactional outbox
   layer, versioned cross-service event contracts package, contract tests, PostgreSQL
   provisioning, and the technical design docs the team implemented against. Cost-reduction driver.
2. **Purchase attribution system** — the flagship full-stack story. Spans mobile app, web,
   middleware, message bus, two backend services, and the infrastructure. Best example of
   working across every layer.
3. **AI catalog cleaning** — product data standardisation at catalog scale with per-category
   rules, batch processing and real-time webhook updates. Corroborated by João's letter.
4. **AI content-quality pipeline** — sole author. LLM-as-judge scoring every user post for
   engagement and purchase potential; multimodal, rate-limited, deployed as a scheduled
   serverless function.

---

## 7. Visual direction

**Base:**
- Dark-first, one accent colour — reuse the **teal from the CV** so the documents feel like a set.
- Clean sans for body + **monospace for labels, tags and dates** (reads "engineer" without
  terminal-theme cliché).
- Generous whitespace, narrow measure (~65–70 characters).
- Mobile first, genuinely.
- Motion: restrained. Always honour `prefers-reduced-motion`.

**Signature components** — the "wow" without the performance cost:

1. **Career timeline tree** — vertical spine, one node per role, first to last with dates.
   *The twist:* the tech stack tags **evolve as you scroll** — PHP/jQuery/WordPress →
   Vue/Three.js → Python/Django/ETL → React Native/.NET/Azure. Turns a date list into a
   seven-year growth story.
2. **Animated architecture diagram** — inline SVG for the attribution system: mobile → web →
   middleware → message bus → services → database, with a dot travelling the path on a loop.
   High visual impact, and it *is* the proof of distributed-systems work. Pure SVG + CSS.
3. **Scroll-driven stack layers** — five bands (Mobile, Web, API, Services, Infrastructure)
   lighting up on scroll. Visualises the actual differentiator: full vertical coverage.
4. **Animated "400+" counter** in the recommendations section. One line of work, big payoff.

**Explicitly avoided:** terminal/CLI easter egg (on every dev portfolio), floating skills
constellation (usually looks worse than a plain list), heavy 3D.

---

## 8. Out of scope for v1

Blog (**decided: never**). Contact form. Light/dark toggle. Analytics dashboard. Three.js
scenes. i18n. Project detail pages. Every one of these is a way to not ship.

---

## 9. Build order

1. Astro + Tailwind scaffold, deploy an empty page to Cloudflare Pages **on day one** — get
   the pipeline working before there's anything to break.
2. Hero + About + Contact. Site is now genuinely usable.
3. Content collections + Experience timeline (static version, no scroll effects yet).
4. Selected Work cards.
5. Recommendations + Interests.
6. *Then* the signature components — timeline stack evolution, architecture SVG, stack layers,
   counter. These are polish; the site should be shippable before they exist.
7. Domain, favicon, OG image, Lighthouse pass.

---

## 10. OPEN questions

- **Domain name** — `danielcarvalho.dev`? Check availability.
- **Photos needed** — headshot (can reuse the CV one), dog photo, and confirm Luis/João are
  happy for their photos to appear on a public site (they already appear on the CV, but that
  goes to a smaller audience).
- **Interests copy** — what to actually say beyond the dog. Keep it short and real.
- **CV PDF on the site** — link the 2-page or the 3-page version? Probably 3-page, since the
  recommendations are on the site anyway.
