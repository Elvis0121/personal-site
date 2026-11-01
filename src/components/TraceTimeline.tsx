import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { allJobs, allProjects } from 'content-collections'
import { ArrowRight } from 'lucide-react'
import { chronologicalEntries } from '../lib/chronology'

const RANGE_START = Date.UTC(2024, 8, 1)
const RANGE_END = Date.UTC(2026, 9, 1)
const SPAN_COLORS = ['#c6f25e', '#6fd6c4', '#b7a6ff', '#f4d35e']

const toTime = (value: string) => new Date(`${value}T00:00:00Z`).getTime()
const percent = (time: number) =>
  ((time - RANGE_START) / (RANGE_END - RANGE_START)) * 100

const ticks = [
  '2024-09-01',
  '2025-01-01',
  '2025-05-01',
  '2025-09-01',
  '2026-01-01',
  '2026-05-01',
  '2026-09-01',
]
const monthLabel = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))

function durationLabel(start: string, end?: string) {
  const months = Math.round(
    ((end ? toTime(end) : RANGE_END) - toTime(start)) /
      (1000 * 60 * 60 * 24 * 30.44),
  )
  return `${months} mo`
}

export function TraceTimeline() {
  const jobs = chronologicalEntries(allJobs)
  const [selected, setSelected] = useState(jobs[0]?._meta.path)
  const job = jobs.find((entry) => entry._meta.path === selected) ?? jobs[0]
  if (!job) return <p>No experience added yet.</p>

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[11px] text-muted-foreground">
        <span>trace_id: career · {jobs.length} spans</span>
        <span className="hidden sm:inline">click a span to inspect</span>
      </div>

      <div className="px-5 pb-2 pt-5">
        <div className="grid grid-cols-[7.5rem_1fr] gap-x-4 sm:grid-cols-[10rem_1fr]">
          <div />
          <div className="relative mb-3 h-4 font-mono text-[10px] text-muted-foreground">
            {ticks.map((tick, i) => (
              <span
                key={tick}
                className={`absolute -translate-x-1/2 ${i % 2 ? 'hidden sm:block' : ''}`}
                style={{ left: `${percent(toTime(tick))}%` }}
              >
                {monthLabel(tick)}
              </span>
            ))}
          </div>

          {jobs.map((entry, i) => {
            const left = percent(toTime(entry.startDate))
            const right = percent(
              entry.endDate ? toTime(entry.endDate) : RANGE_END,
            )
            const active = entry._meta.path === job._meta.path
            const color = SPAN_COLORS[i % SPAN_COLORS.length]
            return (
              <div key={entry._meta.path} className="contents">
                <button
                  type="button"
                  onClick={() => setSelected(entry._meta.path)}
                  aria-pressed={active}
                  className={`truncate py-2 text-left text-sm transition ${
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="font-medium">{entry.company}</span>
                  {entry.team && (
                    <span className="ml-1 hidden font-mono text-[11px] text-muted-foreground sm:inline">
                      /{entry.team.split(' ')[0].toLowerCase()}
                    </span>
                  )}
                </button>
                <div className="relative my-1.5 h-7 border-l border-border">
                  {ticks.map((tick) => (
                    <span
                      key={tick}
                      className="absolute inset-y-0 w-px bg-border"
                      style={{ left: `${percent(toTime(tick))}%` }}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelected(entry._meta.path)}
                    aria-label={`${entry.company}: ${entry.jobTitle}`}
                    className="absolute inset-y-0 flex items-center rounded-md px-2 font-mono text-[10px] font-medium text-black transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(right - left, 3)}%`,
                      background: color,
                      opacity: active ? 1 : 0.45,
                      boxShadow: active ? `0 0 24px ${color}55` : 'none',
                    }}
                  >
                    <span className="hidden truncate md:inline">
                      {durationLabel(entry.startDate, entry.endDate)}
                    </span>
                  </button>
                </div>
              </div>
            )
          })}

          <div className="py-2 font-mono text-[11px] text-muted-foreground">
            hackathons
          </div>
          <div className="relative my-1.5 h-7 border-l border-border">
            {allProjects
              .filter((project) => project.date)
              .map((project) => (
                <Link
                  key={project._meta.path}
                  to="/projects"
                  hash={project._meta.path}
                  title={`${project.title} · ${project.event}`}
                  className="group absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${percent(toTime(project.date!))}%` }}
                >
                  <span className="block size-3 rotate-45 border border-flare bg-flare/30 transition group-hover:bg-flare" />
                  <span className="sr-only">{project.title}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div
        key={job._meta.path}
        className="rise grid gap-6 border-t border-border bg-background/40 p-5 md:grid-cols-[1fr_auto]"
      >
        <div>
          <p className="eyebrow mb-2">
            {job.location} · {monthLabel(job.startDate)} –{' '}
            {job.endDate ? monthLabel(job.endDate) : 'now'}
          </p>
          <h3 className="font-display text-2xl font-semibold">
            {job.company}
            {job.team && (
              <span className="text-muted-foreground"> · {job.team}</span>
            )}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{job.jobTitle}</p>
          <p className="mt-4 max-w-2xl text-secondary-foreground">
            {job.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link to="/resume" hash={job._meta.path} className="link-arrow mt-5">
            full span details <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        {job.metrics.length > 0 && (
          <dl className="grid min-w-52 content-start gap-3">
            {job.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border bg-card px-4 py-3"
              >
                <dt className="font-mono text-[11px] text-muted-foreground">
                  {metric.label}
                </dt>
                <dd className="font-display text-2xl font-semibold text-signal">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}
