import { createFileRoute } from '@tanstack/react-router'
import { allJobs, allEducations } from 'content-collections'
import { GraduationCap, Mail, MapPin } from 'lucide-react'
import { Github, Linkedin } from '../components/BrandIcons'
import { chronologicalEntries, formatDate } from '../lib/chronology'
import { pageMeta, research, site, skills } from '../lib/site'

export const Route = createFileRoute('/resume')({
  component: Resume,
  head: () =>
    pageMeta(
      'Experience',
      'Software engineering experience at Google Cloud, Microsoft Azure, Cherokee, and MIT STRESS.',
    ),
})

const monthYear = (value: string) => formatDate(value).replace(/ \d+,/, '')

function Resume() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[18rem_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {site.fullName}
        </h1>
        <p className="mt-1 text-muted-foreground">{site.role} · MIT ’27</p>
        <ul className="mt-6 space-y-3 font-mono text-xs text-secondary-foreground">
          <li className="flex items-center gap-2">
            <MapPin size={14} aria-hidden="true" className="text-signal" />{' '}
            {site.location}
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 hover:text-signal"
            >
              <Mail size={14} aria-hidden="true" className="text-signal" />{' '}
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-signal"
            >
              <Github size={14} aria-hidden="true" className="text-signal" />{' '}
              github.com/Elvis0121
            </a>
          </li>
          <li>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-signal"
            >
              <Linkedin size={14} aria-hidden="true" className="text-signal" />{' '}
              in/elvis-chipiro
            </a>
          </li>
        </ul>
        <div className="mt-8 space-y-4">
          {skills.map((group) => (
            <div key={group.group}>
              <h2 className="eyebrow mb-2">{group.group}</h2>
              <p className="text-sm leading-relaxed text-secondary-foreground">
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </aside>

      <div className="min-w-0 space-y-16">
        <section>
          <p className="eyebrow mb-3">
            <span className="text-signal">~/</span>experience
          </p>
          <h2 className="mb-8 font-display text-4xl font-semibold tracking-tight">
            Work experience
          </h2>
          {allJobs.length ? (
            <ol className="relative space-y-6 border-l border-border pl-6">
              {chronologicalEntries(allJobs).map((job) => (
                <li
                  key={job._meta.path}
                  id={job._meta.path}
                  className="relative scroll-mt-24"
                >
                  <span className="absolute -left-[29px] top-7 size-2.5 rounded-full border-2 border-background bg-signal ring-1 ring-signal/40" />
                  <article className="panel p-6">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="font-display text-2xl font-semibold">
                          {job.company}
                          {job.team && (
                            <span className="text-muted-foreground">
                              {' '}
                              · {job.team}
                            </span>
                          )}
                        </h3>
                        <p className="mt-1 text-sm text-secondary-foreground">
                          {job.jobTitle}
                          {job.location ? ` · ${job.location}` : ''}
                        </p>
                      </div>
                      <p className="shrink-0 font-mono text-xs text-muted-foreground">
                        <time dateTime={job.startDate}>
                          {monthYear(job.startDate)}
                        </time>{' '}
                        –{' '}
                        {job.endDate ? (
                          <time dateTime={job.endDate}>
                            {monthYear(job.endDate)}
                          </time>
                        ) : (
                          'Present'
                        )}
                      </p>
                    </div>
                    {job.metrics.length > 0 && (
                      <dl className="mt-5 flex flex-wrap gap-3">
                        {job.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="flex flex-col rounded-lg border border-border bg-background/50 px-3 py-2"
                          >
                            <dt className="order-2 font-mono text-[10px] text-muted-foreground">
                              {metric.label}
                            </dt>
                            <dd className="font-display text-lg font-semibold text-signal">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <div
                      className="prose-console mt-4"
                      dangerouslySetInnerHTML={{ __html: job.html }}
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <p>No experience added yet.</p>
          )}
        </section>

        <section>
          <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight">
            Education
          </h2>
          {chronologicalEntries(allEducations).map((entry) => (
            <article key={entry._meta.path} className="panel flex gap-4 p-6">
              <GraduationCap
                size={22}
                aria-hidden="true"
                className="mt-1 shrink-0 text-signal"
              />
              <div>
                <h3 className="font-display text-xl font-semibold">
                  {entry.school}
                </h3>
                <p className="mt-1 text-sm text-secondary-foreground">
                  {entry.summary}
                </p>
                <div
                  className="prose-console mt-2"
                  dangerouslySetInnerHTML={{ __html: entry.html }}
                />
              </div>
            </article>
          ))}
        </section>

        <section>
          <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight">
            Research
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {research.map((item) => (
              <li key={item.title} className="panel p-5">
                <p className="eyebrow mb-3 text-signal">{item.area}</p>
                <p className="font-medium leading-snug">{item.title}</p>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                  {item.people}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
