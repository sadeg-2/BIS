import type { CSSProperties, ReactNode } from 'react'
import { AI_MODES, CAT_COLORS, fmt } from '../lib'
import { SOURCES, type SourceId } from '../data/market'
import type { AiMode, Score, Week } from '../types'

type Vars = CSSProperties & Record<`--${string}`, string>

export function Src({ id }: { id: SourceId }) {
  const s = SOURCES[id]
  return <a className="src" href={s.url} target="_blank" rel="noreferrer">{s.name}</a>
}

interface PageHeadProps {
  kicker?: string
  title: string
  lead?: string
  children?: ReactNode
}

export function PageHead({ kicker, title, lead, children }: PageHeadProps) {
  return (
    <section className="page-head">
      {kicker && <div className="kicker">{kicker}</div>}
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </section>
  )
}

interface StatProps {
  value: string
  label: string
  src?: SourceId
  tone?: string
}

export function Stat({ value, label, src, tone }: StatProps) {
  return (
    <div className={`stat ${tone || ''}`}>
      <div className="stat-v" dir="ltr">{value}</div>
      <div className="stat-l">{label}</div>
      {src && <Src id={src} />}
    </div>
  )
}

/** One bar: label, value, and an optional display string. */
export type BarRow = [label: string, value: number, display?: string]

interface BarsProps {
  rows: BarRow[]
  unit?: string
  highlight?: number
  signed?: boolean
}

export function Bars({ rows, unit = '', highlight = 3, signed = false }: BarsProps) {
  const max = Math.max(...rows.map(r => Math.abs(r[1])))
  return (
    <div className="bars">
      {rows.map(([label, v, disp], i) => (
        <div className="bar-row" key={label}>
          <div className="bar-label" dir="ltr">{label}</div>
          <div className="bar-track">
            <div
              className={`bar-fill ${v < 0 ? 'neg' : i < highlight ? 'hi' : ''}`}
              style={{ width: `${(Math.abs(v) / max) * 100}%`, animationDelay: `${i * 40}ms` }}
            />
          </div>
          <div className="bar-v" dir="ltr">{disp ?? `${signed && v > 0 ? '+' : ''}${fmt(v)}${unit}`}</div>
        </div>
      ))}
    </div>
  )
}

export function AiBadge({ mode }: { mode: AiMode }) {
  const m = AI_MODES[mode]
  const style: Vars = { '--c': m.color }
  return <span className="ai-badge" style={style}>{m.short}</span>
}

/** A strip of weeks coloured by AI mode. */
export function AiStrip({ weeks, big }: { weeks: Week[]; big?: boolean }) {
  return (
    <div className={`ai-strip ${big ? 'big' : ''}`}>
      {weeks.map((w, i) => (
        <span key={i} style={{ background: AI_MODES[w.ai].color }} title={`الأسبوع ${i + 1}: ${w.topic} · ${AI_MODES[w.ai].name}`} />
      ))}
    </div>
  )
}

export function AiLegend() {
  return (
    <div className="ai-legend">
      {AI_MODES.map(m => (
        <span key={m.id}><i style={{ background: m.color }} />{m.name}</span>
      ))}
    </div>
  )
}

export function Cat({ name }: { name: string }) {
  const style: Vars = { '--c': CAT_COLORS[name] || '#64748b' }
  return <span className="cat" style={style}>{name}</span>
}

export function ScoreDots({ score }: { score: Score }) {
  const parts: [string, number][] = [['الحصة', score.s], ['الفرص', score.o], ['النمو', score.g], ['محلي', score.l]]
  return (
    <div className="score-dots">
      {parts.map(([k, v]) => (
        <div key={k} className="sd">
          <span className="sd-k">{k}</span>
          <span className="sd-d">{[0, 1].map(i => <i key={i} className={i < v ? 'on' : ''} />)}</span>
        </div>
      ))}
    </div>
  )
}

/** Inline style that sets CSS custom properties (e.g. --c) with type checking. */
export const cssVars = (vars: Record<`--${string}`, string>): Vars => vars
