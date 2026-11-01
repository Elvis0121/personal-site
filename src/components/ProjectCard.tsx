import type { allProjects } from 'content-collections'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { Github } from './BrandIcons'
import { formatDate } from '../lib/chronology'

type Project = (typeof allProjects)[number]

/** Pipeline stages drawn in each card's header, keyed by content filename. */
const pipelines: Record<string, string[]> = {
  velovlm: ['screenshot', 'perceive', 'diagnose', 'remediate', 'open PR'],
  companion: ['calendar', 'schedule', 'present', 'sentiment', 'feedback'],
}

function Pipeline({ stages }: { stages: string[] }) {
  return (
    <div className="relative flex items-center justify-between gap-1 overflow-hidden border-b border-border bg-background/60 px-5 py-8">
      <div
        aria-hidden="true"
        className="grid-texture absolute inset-0 opacity-60"
      />
      {stages.map((stage, i) => (
        <div key={stage} className="relative flex flex-1 items-center">
          <div className="flex flex-col items-center gap-2">
            <span
              className={`flex size-9 items-center justify-center rounded-lg border font-mono text-[11px] ${
                i === stages.length - 1
                  ? 'border-signal bg-signal text-black'
                  : 'border-border bg-card text-signal'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground">
              {stage}
            </span>
          </div>
          {i < stages.length - 1 && (
            <span className="mx-1 mb-5 h-px flex-1 bg-gradient-to-r from-signal/60 to-signal/10" />
          )}
        </div>
      ))}
    </div>
  )
}

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project
  compact?: boolean
}) {
  const stages = pipelines[project._meta.path]

  return (
    <article
      id={project._meta.path}
      className="panel group min-w-0 scroll-mt-24 overflow-hidden transition hover:border-signal/40"
    >
      {stages && <Pipeline stages={stages} />}
      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
          {project.event && <span className="text-flare">{project.event}</span>}
          {project.date && (
            <span>{formatDate(project.date).replace(/ \d+,/, '')}</span>
          )}
        </div>
        <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
        <p className="mt-2 text-secondary-foreground">{project.description}</p>
        {project.outcome && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/5 px-3 py-1 font-mono text-xs text-signal">
            <Trophy size={12} aria-hidden="true" />
            {project.outcome}
          </p>
        )}
        {!compact && (
          <div
            className="prose-console mt-4"
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        {(project.github || project.liveUrl) && (
          <div className="mt-5 flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                <Github size={14} aria-hidden="true" /> source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                live demo <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
