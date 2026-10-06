import { useId } from 'react'
import { cn } from '@/lib/cn'

/** Smooth line through points using a Catmull-Rom spline converted to cubic Béziers. */
function smoothPath(pts: Array<[number, number]>): string {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const t = 0.18
    const c1: [number, number] = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t]
    const c2: [number, number] = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`
  }
  return d
}

function scalePoints(data: number[], w: number, h: number, pad = 6): Array<[number, number]> {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  return data.map((v, i) => [
    +((i / (data.length - 1)) * w).toFixed(1),
    +(h - pad - ((v - min) / span) * (h - pad * 2)).toFixed(1),
  ])
}

interface AreaChartProps {
  data: number[]
  color?: string
  className?: string
  grid?: boolean
  /** Mark the final point with a dot. */
  endDot?: boolean
}

/** Fluid area chart that stretches to its container. */
export function AreaChart({ data, color = '#13966f', className, grid = true, endDot = true }: AreaChartProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const W = 300
  const H = 100
  const pts = scalePoints(data, W, H)
  const line = smoothPath(pts)
  const area = `${line} L${W},${H} L0,${H} Z`
  const last = pts[pts.length - 1]
  return (
    <div className={cn('relative', className)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {grid &&
          [0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#e6e3d8" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
          ))}
        <path d={area} fill={`url(#g${id})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {endDot && (
        <span
          className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: `${(last[0] / W) * 100}%`, top: `${(last[1] / H) * 100}%`, background: color }}
        />
      )}
    </div>
  )
}

/** Tiny line for KPI tiles. */
export function Spark({ data, color = '#13966f', className }: { data: number[]; color?: string; className?: string }) {
  const W = 80
  const H = 28
  const pts = scalePoints(data, W, H, 3)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn('h-7 w-20', className)} preserveAspectRatio="none" aria-hidden="true">
      <path d={smoothPath(pts)} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

interface BarsProps {
  data: number[]
  labels?: string[]
  color?: string
  muted?: string
  highlight?: number
  className?: string
}

/** Vertical bars with optional labels and one highlighted bar. */
export function Bars({ data, labels, color = '#13966f', muted = '#d2efe2', highlight, className }: BarsProps) {
  const max = Math.max(...data)
  return (
    <div className={cn('flex h-full items-end gap-[6%]', className)}>
      {data.map((v, i) => (
        <div key={i} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
          <div className="w-full rounded-t-[5px]" style={{ height: `${(v / max) * 100}%`, background: highlight === undefined || highlight === i ? color : muted }} />
          {labels && <span className="text-[10px] leading-none text-ink-3">{labels[i]}</span>}
        </div>
      ))}
    </div>
  )
}

export interface DonutSlice {
  label: string
  value: number
  color: string
}

/** Donut chart. Values are normalised to 100. */
export function Donut({ slices, size = 96, thickness = 5.2, center }: { slices: DonutSlice[]; size?: number; thickness?: number; center?: React.ReactNode }) {
  const total = slices.reduce((s, x) => s + x.value, 0)
  let acc = 0
  const R = 15.9155
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r={R} fill="none" stroke="#f1eee5" strokeWidth={thickness} />
        {slices.map((s) => {
          const frac = (s.value / total) * 100
          const el = (
            <circle
              key={s.label}
              cx="18"
              cy="18"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(frac - 1.2, 0.5)} ${100 - Math.max(frac - 1.2, 0.5)}`}
              strokeDashoffset={-acc}
              strokeLinecap="round"
            />
          )
          acc += frac
          return el
        })}
      </svg>
      {center && <div className="absolute inset-0 grid place-items-center text-center">{center}</div>}
    </div>
  )
}

/** Horizontal progress bar. */
export function Meter({ value, max = 100, color = '#13966f', className }: { value: number; max?: number; color?: string; className?: string }) {
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-paper-3', className)}>
      <div className="h-full rounded-full" style={{ width: `${Math.min(100, (value / max) * 100)}%`, background: color }} />
    </div>
  )
}
