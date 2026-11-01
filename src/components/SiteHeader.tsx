import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Command } from 'lucide-react'
import { site } from '../lib/site'
import { CommandPalette } from './CommandPalette'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-sm font-medium tracking-tight"
          >
            <span className="relative flex size-2">
              <span className="anomaly-ring absolute inline-flex size-2 rounded-full bg-signal" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            <span>
              {site.name.toLowerCase().replace(' ', '.')}
              <span className="caret text-signal">_</span>
            </span>
          </Link>
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-x-1 gap-y-2"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === '/' }}
                activeProps={{ className: 'text-signal bg-signal/10' }}
                inactiveProps={{
                  className: 'text-muted-foreground hover:text-foreground',
                }}
                className="rounded-full px-3 py-1.5 text-sm transition focus-visible:outline-2 focus-visible:outline-signal"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="ml-2 hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition hover:border-signal/50 hover:text-signal sm:inline-flex"
              aria-label="Open command palette"
            >
              <Command aria-hidden="true" size={12} />K
            </button>
          </nav>
        </div>
      </header>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}
