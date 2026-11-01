import { useId, useMemo, useState } from 'react'

const WIDTH = 420
const HEIGHT = 300
const MIN_POINTS = 4
const CLUSTER_COLORS = ['#c6f25e', '#6fd6c4', '#b7a6ff', '#f4d35e', '#8fb8ff']

type Point = { x: number; y: number }

// Seeded PRNG so server and client render identical points.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generatePoints(): Point[] {
  const random = mulberry32(2027)
  const gaussian = () => {
    const u = 1 - random()
    const v = random()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  }
  const centers = [
    { x: 110, y: 90, s: 20, n: 34 },
    { x: 290, y: 80, s: 16, n: 26 },
    { x: 200, y: 200, s: 24, n: 40 },
    { x: 340, y: 220, s: 14, n: 20 },
  ]
  const points: Point[] = []
  for (const c of centers)
    for (let i = 0; i < c.n; i++)
      points.push({ x: c.x + gaussian() * c.s, y: c.y + gaussian() * c.s })
  for (let i = 0; i < 14; i++)
    points.push({
      x: 20 + random() * (WIDTH - 40),
      y: 20 + random() * (HEIGHT - 40),
    })
  // Round so every JS engine serializes identical coordinates.
  return points.map((p) => ({
    x: Math.round(p.x * 10) / 10,
    y: Math.round(p.y * 10) / 10,
  }))
}

/** Classic DBSCAN: returns a cluster id per point, or -1 for noise. */
function dbscan(points: Point[], eps: number, minPts: number) {
  const labels = new Array<number>(points.length).fill(-2)
  const neighbors = (i: number) =>
    points.flatMap((p, j) =>
      Math.hypot(p.x - points[i].x, p.y - points[i].y) <= eps ? [j] : [],
    )
  let cluster = 0
  for (let i = 0; i < points.length; i++) {
    if (labels[i] !== -2) continue
    const seeds = neighbors(i)
    if (seeds.length < minPts) {
      labels[i] = -1
      continue
    }
    labels[i] = cluster
    const queue = [...seeds]
    while (queue.length) {
      const j = queue.shift()!
      if (labels[j] === -1) labels[j] = cluster
      if (labels[j] !== -2) continue
      labels[j] = cluster
      const next = neighbors(j)
      if (next.length >= minPts) queue.push(...next)
    }
    cluster++
  }
  return { labels, clusters: cluster }
}

export function AnomalyField() {
  const sliderId = useId()
  const points = useMemo(generatePoints, [])
  const [eps, setEps] = useState(22)
  const { labels, clusters } = useMemo(
    () => dbscan(points, eps, MIN_POINTS),
    [points, eps],
  )
  const anomalies = labels.filter((label) => label === -1).length

  return (
    <figure className="panel relative overflow-hidden p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-flare" />
          telemetry.dbscan
        </span>
        <span>
          <span className="text-signal">{clusters}</span> clusters ·{' '}
          <span className="text-flare">{anomalies}</span> anomalies
        </span>
      </div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Scatter plot of ${points.length} telemetry points grouped by DBSCAN into ${clusters} clusters with ${anomalies} anomalies`}
        className="w-full rounded-xl bg-background/60"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={(i + 1) * 42}
            x2={(i + 1) * 42}
            y1={0}
            y2={HEIGHT}
            stroke="rgb(232 236 228 / 0.05)"
          />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`h${i}`}
            y1={(i + 1) * 42}
            y2={(i + 1) * 42}
            x1={0}
            x2={WIDTH}
            stroke="rgb(232 236 228 / 0.05)"
          />
        ))}
        {points.map((point, i) => {
          const label = labels[i]
          if (label === -1)
            return (
              <g key={i}>
                <circle
                  className="anomaly-ring"
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  fill="none"
                  stroke="#ff7a45"
                  style={{ animationDelay: `${(i % 7) * 0.3}s` }}
                />
                <circle cx={point.x} cy={point.y} r={3.5} fill="#ff7a45" />
              </g>
            )
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={2.6}
              fill={CLUSTER_COLORS[label % CLUSTER_COLORS.length]}
              opacity={0.85}
              style={{ transition: 'fill 300ms' }}
            />
          )
        })}
      </svg>
      <figcaption className="mt-4 space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <label htmlFor={sliderId}>
            ε (neighborhood radius) ={' '}
            <span className="text-foreground">{eps}</span>
          </label>
          <span>minPts = {MIN_POINTS}</span>
        </div>
        <input
          id={sliderId}
          type="range"
          min={8}
          max={40}
          value={eps}
          onChange={(event) => setEps(Number(event.target.value))}
          className="w-full accent-[#c6f25e]"
        />
        <p className="text-xs text-muted-foreground">
          A live demo of DBSCAN, the clustering algorithm I used for anomaly
          detection at Azure Core. Dense groups of points become clusters;
          isolated points are flagged as anomalies (orange). Drag ε to change
          how close points must be to count as neighbors.
        </p>
      </figcaption>
    </figure>
  )
}
