// Shapes of the generated curriculum data (src/data/curriculum.json).

export type AiMode = 0 | 1 | 2 | 3
export type AiPolicy = 'build' | 'core' | 'theory' | 'systems' | 'applied' | 'ai'

export interface Week {
  week?: number
  topic: string
  lab?: string
  out?: string
  exam?: boolean
  ai: AiMode
}

export interface Module {
  id: string
  name: string
  out: string
  weeks: Week[]
}

export interface Level {
  name: string
  en: string
  ai: AiMode
  shared?: 'all' | 'family'
  modules: Module[]
}

export interface Score {
  s: number
  o: number
  g: number
  l: number
  total: number
}

export interface PathStats {
  so: number | null
  open: number | null
  growth: number | null
  local: number
  map: string
}

export interface Path {
  id: string
  en: string
  ar: string
  score: Score
  wave: 1 | 2 | 3
  family: string
  weeks: number
  hours: number
  before: { weeks: number; hours: number }
  sharedWeeks: number
  ownWeeks: number
  evidence: string
  jobs: string
  audience: string
  pre: string
  skills: string[]
  levels: Level[]
  capstone: Week[]
  capstoneText: string
  courses: number[]
  alt: Record<string, string> | null
  stats: PathStats
}

export interface Course {
  n: number
  en: string
  ar: string
  cat: string
  level: string
  pre: string
  hpw: number
  weeks: Week[]
  hours: number
  desc: string
  market: string
  outcomes: string[]
  project: string
  book: string
  advanced: string
  open: { name: string; url: string }
  ai: { policy: AiPolicy; uses: string[]; keep: string }
}

export interface CoreModule {
  id: string
  name: string
  weeks: number
}

export interface Family {
  id: string
  ar: string
  core: CoreModule[]
  weeks: number
  paths: string[]
}

export interface Excluded {
  en: string
  ar: string
  so: number | null
  open: number | null
  growth: number | null
  alt: string
  score: number
}

export interface Meta {
  pathHpw: number
  loadBefore: number
  loadAfter: number
  hoursBefore: number
  hoursAfter: number
  courseHoursBefore: number
}

export interface Curriculum {
  meta: Meta
  general: { modules: CoreModule[]; weeks: number }
  families: Family[]
  paths: Path[]
  courses: Course[]
  excluded: Excluded[]
}
