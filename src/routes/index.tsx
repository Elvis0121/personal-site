import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ArrowRight, ArrowUpRight, FlaskConical, Mail } from 'lucide-react'
import { AnomalyField } from '../components/AnomalyField'
import { Github, Linkedin } from '../components/BrandIcons'
import { TraceTimeline } from '../components/TraceTimeline'
import { ProjectCard } from '../components/ProjectCard'
import {
  pageMeta,
  research,
  signals,
  site,
  skills,
} from '../lib/site'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
  head: () => pageMeta('Software Engineer', site.description),
})

function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string
  title: string
  kicker: string
}) {
  return (
    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow mb-2">
          <span className="text-signal">{index}</span> / {kicker}
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
    </div>
  )
}

function PortfolioHome() {
  const projects = [...allProjects].sort((a, b) =>
    (b.date ?? '').localeCompare(a.date ?? ''),
  )

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-x-0 top-0 h-[720px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]"
      />

      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
        <div className="rise">
          <div className="mb-8 flex items-center gap-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1.5 font-mono text-xs text-signal">
              <span className="size-1.5 rounded-full bg-signal" />
              {site.status}
            </p>
          </div>
          <h1 className="font-display text-6xl font-bold leading-[0.92] tracking-tighter sm:text-7xl lg:text-8xl">
            Elvis
            <br />
            Chipiro<span className="text-signal">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
            {site.summary}
          </p>
          <p className="mt-6 font-mono text-sm text-muted-foreground">
            <span className="text-signal">$</span> whoami{' '}
            <span className="text-foreground">
              → MIT CS ’27 · ex-Google Cloud · ex-Azure Core
            </span>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/projects" className="btn-primary">
              See what I’ve shipped <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              <Mail size={16} aria-hidden="true" /> Get in touch
            </Link>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="btn-ghost !px-3"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="btn-ghost !px-3"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="rise" style={{ animationDelay: '120ms' }}>
          <AnomalyField />
        </div>
      </section>

      <section
        aria-labelledby="signals"
        className="relative border-y border-border bg-card/40"
      >
        <h2 id="signals" className="sr-only">
          Impact metrics
        </h2>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-border md:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {signals.map((signal) => (
            <div key={signal.label} className="flex flex-col px-5 py-7">
              <dt className="order-2 mt-1 text-sm text-secondary-foreground">
                {signal.label}
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {signal.source}
                </span>
              </dt>
              <dd className="font-display text-3xl font-semibold tracking-tight text-signal">
                {signal.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="experience"
        className="mx-auto max-w-6xl px-5 py-24"
      >
        <div id="experience">
          <SectionHeading
            index="01"
            kicker="experience"
            title="Four internships, one through-line: reliability."
          />
        </div>
        <TraceTimeline />
      </section>

      <section
        aria-labelledby="projects-heading"
        className="mx-auto max-w-6xl px-5 pb-24"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div id="projects-heading">
            <p className="eyebrow mb-2">
              <span className="text-signal">02</span> / projects
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Built under hackathon pressure.
            </h2>
          </div>
          <Link to="/projects" className="link-arrow">
            all projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project._meta.path} project={project} compact />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 lg:grid-cols-2">
        <div className="panel p-6 sm:p-8">
          <p className="eyebrow mb-2">
            <span className="text-signal">03</span> / research
          </p>
          <h2 className="mb-6 font-display text-2xl font-semibold">
            MIT research
          </h2>
          <ul className="space-y-5">
            {research.map((item) => (
              <li key={item.title} className="flex gap-4">
                <FlaskConical
                  size={18}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-signal"
                />
                <div>
                  <p className="font-medium leading-snug">{item.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {item.area} · {item.people}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel p-6 sm:p-8">
          <p className="eyebrow mb-2">
            <span className="text-signal">04</span> / stack
          </p>
          <h2 className="mb-6 font-display text-2xl font-semibold">
            Tools I reach for
          </h2>
          <div className="space-y-5">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-background/50 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition hover:border-signal/50 hover:text-signal"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="panel relative overflow-hidden px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(198_242_94/0.12),transparent_65%)]"
          />
          <p className="eyebrow relative mb-4">incident status: open</p>
          <h2 className="relative mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Got a hard problem in AI, data, or infra?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-secondary-foreground">
            I’m looking for full-time SWE roles starting 2027. Let’s talk.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Send a message <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="btn-ghost font-mono text-sm"
            >
              {site.email} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
