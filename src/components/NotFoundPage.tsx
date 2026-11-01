import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 font-mono">
      <p className="text-sm text-flare">ERROR 404 · route_not_found</p>
      <h1 className="mt-3 font-display text-5xl font-bold tracking-tight">
        This span never started.
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link to="/" className="btn-primary mt-8 font-sans">
        Back to home
      </Link>
    </div>
  )
}
