# Elvis Chipiro — Software Engineer Portfolio

The personal site of Elvis Tawananyasha Chipiro, an MIT Computer Science student (Class of 2027) with software engineering internships at Google Cloud, Microsoft Azure Core, Cherokee, and MIT STRESS.

The site has an "observability console" look that fits the work it describes: triage agents, telemetry pipelines, and anomaly detection.

- **Home**: hero with a live, tunable DBSCAN anomaly field, a strip of headline impact metrics, an interactive career "trace waterfall", featured projects, research, and skills.
- **Projects** (`/projects`): VeloVLM and Companion, each with a pipeline diagram.
- **Experience** (`/resume`): the full résumé, including work history, education, and research.
- **Contact** (`/contact`): a contact form handled by Netlify Forms.
- **⌘K / Ctrl+K command palette**: jump between pages, copy the email address, or open GitHub and LinkedIn.

## Tech

TanStack Start (React 19) · Tailwind CSS v4 · Content Collections (Markdown + Zod) · Netlify Forms · Netlify Image CDN · Netlify hosting.

## Editing content

- `content/jobs/*.md`: one file per role. Frontmatter holds dates, tags, and headline `metrics`; the body holds the bullet points.
- `content/projects/*.md`: projects (`event`, `date`, `outcome`, tags, optional `github`/`liveUrl`).
- `content/education/*.md`: education.
- `src/lib/site.ts`: name, contact links, hiring status, home-page metrics, research, and skills.

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev
```

Contact form submissions only process on a deployed Netlify site.
