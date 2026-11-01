import { Mail } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { site } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getUTCFullYear()} {site.fullName} · built in{' '}
          {site.location}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="hover:text-signal"
            aria-label="Email"
          >
            <Mail size={16} aria-hidden="true" />
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal"
            aria-label="GitHub"
          >
            <Github size={16} aria-hidden="true" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <span className="hidden sm:inline">press ⌘K to navigate</span>
        </div>
      </div>
    </footer>
  )
}
