# Agent notes — Elvis Chipiro portfolio

A personal SWE portfolio built with TanStack Start, React 19, Tailwind v4, and Content Collections, deployed on Netlify. It is a single-theme dark design with an "observability console" aesthetic: lime `signal` accent (#c6f25e), orange `flare` accent for anomalies, Bricolage Grotesque for display text, and JetBrains Mono for mono text (both from Google Fonts in `__root.tsx`).

## Layout

- `content/{jobs,projects,education}/*.md`: Markdown content with Zod schemas in `src/lib/content.ts` and collections in `content-collections.ts`. Jobs have an optional `team` and a `metrics` array (`{value,label}`). Projects have optional `event`, `date`, and `outcome`. The blog was removed. `blogSchema` and the slug helpers stay in `content.ts` only because `content.test.ts` covers them.
- `src/lib/site.ts`: identity, links, home `signals`, `research`, `skills`, `pageMeta()`, and `cdnImage()` (Netlify Image CDN URL helper; use it for all local images).
- `src/components/AnomalyField.tsx`: hero scatter plot with real client-side DBSCAN. Points come from a seeded PRNG and are rounded so SSR and hydration match. Do not use `Math.random()`.
- `src/components/TraceTimeline.tsx`: experience rendered as a trace waterfall over a fixed date range (`RANGE_START`/`RANGE_END`). Extend the range when adding newer roles. Avoid `Date.now()` in render (hydration).
- `src/components/ProjectCard.tsx`: shared project card. The `pipelines` map, keyed by content filename, draws each card's header diagram.
- `src/components/CommandPalette.tsx`: ⌘K palette. It is rendered as a sibling of the sticky header, because the header's `backdrop-filter` would trap `position: fixed` children.
- `src/components/BrandIcons.tsx`: GitHub and LinkedIn SVGs (lucide-react v1 has no brand icons).
- Routes: `/`, `/projects`, `/resume` (labelled "Experience"), `/contact`.

## Conventions

- Theme tokens live in `src/styles.css` (`:root` + `@theme inline`). Shared component classes: `.panel`, `.eyebrow`, `.btn-primary`, `.btn-ghost`, `.link-arrow`, `.prose-console` (for rendered Markdown).
- Contact form: keep the field names in sync with `public/contact.html` (Netlify Forms registration). The labels and button text are asserted by `ContactForm.test.tsx`.
- Respect `prefers-reduced-motion`. The animations (`.rise`, `.caret`, `.anomaly-ring`) are disabled there.
