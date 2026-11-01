import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Briefcase, Copy, FileText, Home, Mail, Search } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { site } from '../lib/site'

type Command = {
  id: string
  label: string
  hint: string
  icon: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' }>
  run: () => void
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const commands = useMemo<Command[]>(() => {
    const go = (to: '/' | '/projects' | '/resume' | '/contact') => () => {
      navigate({ to })
      onOpenChange(false)
    }
    const visit = (href: string) => () => {
      window.open(href, '_blank', 'noopener,noreferrer')
      onOpenChange(false)
    }
    return [
      { id: 'home', label: 'Home', hint: 'cd ~', icon: Home, run: go('/') },
      {
        id: 'work',
        label: 'Projects',
        hint: 'ls ./projects',
        icon: Briefcase,
        run: go('/projects'),
      },
      {
        id: 'resume',
        label: 'Experience & résumé',
        hint: 'cat resume.md',
        icon: FileText,
        run: go('/resume'),
      },
      {
        id: 'contact',
        label: 'Send a message',
        hint: 'mail elvis',
        icon: Mail,
        run: go('/contact'),
      },
      {
        id: 'copy',
        label: copied ? 'Email copied!' : `Copy email: ${site.email}`,
        hint: 'pbcopy',
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
          })
        },
      },
      {
        id: 'github',
        label: 'GitHub',
        hint: 'open ↗',
        icon: Github,
        run: visit(site.links.github),
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        hint: 'open ↗',
        icon: Linkedin,
        run: visit(site.links.linkedin),
      },
    ]
  }, [copied, navigate, onOpenChange])

  const results = commands.filter((command) =>
    `${command.label} ${command.hint}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  )

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="panel w-full max-w-lg overflow-hidden bg-popover shadow-2xl shadow-black/60 rise"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') onOpenChange(false)
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActive((i) => Math.min(i + 1, results.length - 1))
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActive((i) => Math.max(i - 1, 0))
          }
          if (event.key === 'Enter') results[active]?.run()
        }}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search
            aria-hidden="true"
            size={16}
            className="text-muted-foreground"
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            placeholder="Jump to a page or action…"
            aria-label="Search commands"
            className="h-12 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2" role="listbox">
          {results.length ? (
            results.map((command, index) => (
              <li
                key={command.id}
                role="option"
                aria-selected={index === active}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={command.run}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    index === active
                      ? 'bg-signal/10 text-signal'
                      : 'text-secondary-foreground'
                  }`}
                >
                  <command.icon aria-hidden="true" size={16} />
                  <span className="flex-1">{command.label}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {command.hint}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="px-3 py-6 text-center font-mono text-xs text-muted-foreground">
              command not found: {query}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
