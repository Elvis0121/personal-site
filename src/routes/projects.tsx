import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ProjectCard } from '../components/ProjectCard'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/projects')({
  component: Projects,
  head: () =>
    pageMeta(
      'Projects',
      'Multi-agent copilots and award-winning hackathon builds by Elvis Chipiro.',
    ),
})

function Projects() {
  const projects = [...allProjects].sort((a, b) =>
    (b.date ?? '').localeCompare(a.date ?? ''),
  )

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow mb-3">
        <span className="text-signal">~/</span>projects
      </p>
      <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
        Projects<span className="text-signal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-secondary-foreground">
        Agentic systems and prototypes shipped on tight deadlines, from a
        five-agent incident copilot to a hackathon-winning hybrid-work
        assistant.
      </p>
      {projects.length ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project._meta.path} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-12">No projects published yet.</p>
      )}
    </div>
  )
}
