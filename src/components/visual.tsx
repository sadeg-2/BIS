import type { ReactElement } from 'react'
import { LOGOS } from '../logos'

// Simple line glyphs for skills that have no product logo.
const G: Record<string, ReactElement> = {
  ai: <><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M18 15l.8 2.2 2.2.8-2.2.8L18 21l-.8-2.2-2.2-.8 2.2-.8z" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></>,
  network: <><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M12 7.5v4M12 11.5L6.5 17M12 11.5l5.5 5.5" /></>,
  graph: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="8" r="2.5" /><circle cx="9" cy="18" r="2.5" /><path d="M8.3 7l7.4.8M7 8.3l1.5 7.3M16.5 10l-5.5 6.5" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></>,
  sigma: <><path d="M18 5H6l6 7-6 7h12" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  flow: <><rect x="3" y="4" width="7" height="5" rx="1.5" /><rect x="14" y="15" width="7" height="5" rx="1.5" /><path d="M6.5 9v4a2 2 0 002 2H14" /><path d="M12 13l2 2-2 2" /></>,
  people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.5c3 0 5.5 2.2 5.5 5.5" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  book: <><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z" /><path d="M4 19a2 2 0 012-2h13" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M12 15h5" /></>,
  bulb: <><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z" /></>,
  rocket: <><path d="M14 4c3.5 0 6 2.5 6 6-2 3-5 5.5-8 7l-5-5c1.5-3 4-6 7-8z" /><circle cx="14.5" cy="9.5" r="1.5" /><path d="M7 12l-3 1 3 4 4 3 1-3" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
}

interface TechProps {
  id: string
  size?: number
  title?: string
}

/** A technology logo, or a line glyph when the skill has no logo. */
export function Tech({ id, size = 34, title }: TechProps) {
  if (LOGOS[id]) return <img className="tech" src={LOGOS[id]} alt={title || id} title={title || id} width={size} height={size} />
  return (
    <span className="tech glyph" style={{ width: size, height: size }} title={title || id}>
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{G[id] || G.bulb}</svg>
    </span>
  )
}

export const PATH_ICONS: Record<string, string[]> = {
  'full-stack-developer': ['react', 'nodejs', 'typescript', 'postgresql'],
  'backend-developer-net': ['csharp', 'dotnetcore', 'postgresql', 'docker'],
  'ai-applications-and-agents-engineer': ['ai', 'python', 'fastapi', 'docker'],
  'data-analyst-and-bi': ['chart', 'microsoftsqlserver', 'python', 'pandas'],
  'it-project-manager': ['people', 'jira', 'trello', 'target'],
  'ai-automation-engineer': ['flow', 'ai', 'python', 'github'],
  'systems-and-business-analyst': ['doc', 'figma', 'jira', 'postgresql'],
  'data-scientist-and-ml-engineer': ['python', 'scikitlearn', 'pytorch', 'jupyter'],
  'mobile-developer-flutter': ['flutter', 'dart', 'firebase', 'figma'],
  'software-architect': ['layers', 'kubernetes', 'aws', 'docker'],
  'devops-and-cloud-engineer': ['docker', 'kubernetes', 'terraform', 'linux'],
  'cybersecurity-and-soc-analyst': ['shield', 'linux', 'bash', 'network'],
  'frontend-developer': ['html5', 'css3', 'react', 'nextjs'],
  'data-engineer': ['apachespark', 'apacheairflow', 'apachekafka', 'postgresql'],
}

const COURSE_ICONS = [
  'python', 'python', 'java', 'c', 'cplusplus', 'layers', 'graph', 'graph', 'graph', 'graph',
  'postgresql', 'postgresql', 'linux', 'network', 'chip', 'sigma', 'numpy', 'chart', 'git', 'playwright',
  'html5', 'network', 'chip', 'terminal', 'opengl', 'sigma', 'shield', 'lock', 'ai', 'scikitlearn',
  'pytorch', 'ai', 'aws', 'layers', 'postgresql', 'pandas', 'ai', 'figma', 'bash', 'book',
  'typescript', 'chart', 'jira', 'globe',
]
export const courseIcon = (n: number): string => COURSE_ICONS[n - 1] || 'book'

export function IconStack({ ids, size = 30 }: { ids: string[]; size?: number }) {
  return <div className="icon-stack">{ids.map(id => <Tech key={id} id={id} size={size} />)}</div>
}

const MARQUEE = ['python', 'javascript', 'typescript', 'react', 'nodejs', 'csharp', 'java', 'postgresql', 'docker', 'kubernetes', 'git', 'linux', 'flutter', 'pandas', 'pytorch', 'scikitlearn', 'fastapi', 'nextjs', 'figma', 'terraform', 'aws', 'jupyter', 'html5', 'css3']

/**
 * Endless logo carousel. The list is rendered twice and the track slides by exactly one copy,
 * so a logo that leaves one edge re-enters from the other with no gap.
 */
export function LogoMarquee({ reverse = false }: { reverse?: boolean }) {
  const copy = (n: number) => MARQUEE.map(id => (
    <div key={`${n}-${id}`} className="mq-item" aria-hidden={n > 0}><Tech id={id} size={40} /></div>
  ))
  return (
    <div className="marquee" aria-label="تقنيات يتعلمها الطلاب">
      <div className={`mq-track ${reverse ? 'rev' : ''}`}>{copy(0)}{copy(1)}</div>
    </div>
  )
}

// Animated illustration: two students at laptops with floating code and technology badges.
export function StudyScene() {
  const float = (id: string, x: number, y: number, d: number, s = 44) => (
    <g className="float" style={{ animationDelay: `${d}s` }}>
      <rect x={x - 6} y={y - 6} width={s + 12} height={s + 12} rx="14" fill="#fff" stroke="var(--line)" />
      <image href={LOGOS[id]} x={x} y={y} width={s} height={s} />
    </g>
  )
  return (
    <svg className="study-scene" viewBox="0 0 540 440" role="img" aria-label="طالبان يتعلمان البرمجة والذكاء الاصطناعي">
      <defs>
        <linearGradient id="blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand)" stopOpacity=".16" />
          <stop offset="1" stopColor="var(--brand2)" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f2740" />
          <stop offset="1" stopColor="#123a5c" />
        </linearGradient>
      </defs>
      <path className="blob" d="M270 30c95 0 205 55 230 150 25 96-40 205-140 230S140 425 80 350 20 160 75 95 175 30 270 30z" fill="url(#blob)" />

      {/* desk */}
      <rect x="70" y="330" width="400" height="14" rx="7" fill="var(--brand)" opacity=".85" />
      <rect x="100" y="344" width="10" height="70" rx="4" fill="var(--brand)" opacity=".5" />
      <rect x="430" y="344" width="10" height="70" rx="4" fill="var(--brand)" opacity=".5" />

      {/* student 1 */}
      <g className="bob">
        <circle cx="165" cy="190" r="30" fill="#f2c9a5" />
        <path d="M135 186c0-22 14-36 32-36s30 13 30 30c-10-8-30-10-42-4-8 4-14 8-20 10z" fill="#2b2b33" />
        <path d="M110 330c0-60 25-100 55-100s55 40 55 100z" fill="var(--brand)" />
      </g>
      {/* laptop 1 */}
      <g>
        <rect x="150" y="248" width="120" height="80" rx="8" fill="url(#screen)" />
        <rect className="type t1" x="164" y="264" width="70" height="6" rx="3" fill="var(--brand2)" />
        <rect className="type t2" x="164" y="278" width="52" height="6" rx="3" fill="#5fb0e6" />
        <rect className="type t3" x="176" y="292" width="64" height="6" rx="3" fill="#c084fc" />
        <rect className="type t4" x="176" y="306" width="38" height="6" rx="3" fill="#94a3b8" />
        <path d="M140 328h140l-10 6H150z" fill="#9fb3c8" />
      </g>

      {/* student 2 */}
      <g className="bob b2">
        <circle cx="380" cy="186" r="30" fill="#e3b28c" />
        <path d="M348 184c-4-24 12-40 32-40 22 0 36 18 32 42-6-14-20-22-36-20-12 2-22 8-28 18z" fill="#5a3a22" />
        <path d="M350 188c-6 30-2 52 6 66l10-30z" fill="#5a3a22" />
        <path d="M325 330c0-60 25-100 55-100s55 40 55 100z" fill="var(--brand2)" />
      </g>
      {/* laptop 2 */}
      <g>
        <rect x="290" y="248" width="120" height="80" rx="8" fill="url(#screen)" />
        <text x="350" y="282" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--brand2)" fontFamily="monospace">{'</>'}</text>
        <rect className="type t2" x="306" y="296" width="88" height="6" rx="3" fill="#5fb0e6" />
        <rect className="type t4" x="306" y="310" width="54" height="6" rx="3" fill="#c084fc" />
        <path d="M280 328h140l-10 6H290z" fill="#9fb3c8" />
      </g>

      {/* floating badges */}
      {float('python', 60, 70, 0)}
      {float('react', 440, 62, 1.1)}
      {float('git', 34, 236, 2)}
      {float('docker', 466, 220, .6)}
      <g className="float" style={{ animationDelay: '1.6s' }}>
        <rect x="222" y="70" width="96" height="44" rx="22" fill="var(--card)" stroke="var(--line)" />
        <text x="270" y="99" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ai3)">✦ AI</text>
      </g>
      <g className="float" style={{ animationDelay: '.3s' }}>
        <rect x="236" y="148" width="70" height="36" rx="12" fill="var(--brand)" />
        <text x="271" y="172" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="monospace">{'{ }'}</text>
      </g>
      <circle className="spark" cx="128" cy="120" r="5" fill="var(--brand2)" />
      <circle className="spark s2" cx="420" cy="140" r="4" fill="var(--brand)" />
      <circle className="spark s3" cx="300" cy="40" r="3.5" fill="var(--ai3)" />
    </svg>
  )
}
