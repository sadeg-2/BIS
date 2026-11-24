// Converts the curriculum sources in data-src/ into src/data/curriculum.json.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..')
const src = f => fs.readFileSync(path.join(root, 'data-src', f), 'utf8').replace(/\r/g, '')
const PATHS = createRequire(import.meta.url)(path.join(root, 'data-src', 'paths.cjs'))

// Weekly contact hours. Paths: two 3-hour sessions. Courses: scaled down from the Word report.
const PATH_HPW = 6
const courseHpw = old => (old >= 8 ? 4 : old <= 3 ? 2 : 3)

// AI modes: 0 none, 1 tutor, 2 assistant, 3 partner
const SCHEDULES = {
  build: [[0.4, 1], [0.8, 2], [1, 3]],
  core: [[0.85, 1], [1, 2]],
  theory: [[1, 1]],
  systems: [[0.5, 1], [1, 2]],
  applied: [[0.2, 1], [0.6, 2], [1, 3]],
  ai: [[0.3, 2], [1, 3]],
}
const modeAt = (policy, i, n) => SCHEDULES[policy].find(([f]) => (i + 0.5) / n <= f)[1]

const AI = {}
for (const l of src('ai.txt').split('\n')) {
  if (!l.trim() || l.startsWith('#')) continue
  const [n, policy, uses, keep] = l.split('|')
  if (!SCHEDULES[policy]) throw new Error('policy ' + policy)
  AI[+n] = { policy, uses: uses.split(';'), keep }
}

const MOD = {}
for (const l of src('modules.txt').trim().split('\n')) {
  const [id, name, t, out] = l.split('|')
  MOD[id] = { id, name, topics: t.split(';'), out }
}

// ---------- standalone courses ----------
const courses = (src('courses1.txt').trim() + '\n\n' + src('courses2.txt').trim()).split(/\n\s*\n/).map((b, i) => {
  const L = b.split('\n'), [en, ar, cat, level, h, pre] = L[0].slice(2).split('|')
  const c = { n: i + 1, en, ar, cat, level, hpw: courseHpw(+h), pre }
  for (const l of L.slice(1)) c[l[0]] = l.slice(3)
  const topics = c.W.split(';').map(x => x.split('~'))
  const ai = AI[c.n]
  if (!ai) throw new Error('no AI plan for course ' + c.n)
  const mid = Math.ceil(topics.length / 2), weeks = []
  topics.forEach(([topic, lab], j) => {
    if (j === mid) weeks.push({ topic: 'امتحان منتصف الفصل', lab: 'مراجعة وامتحان 60 دقيقة', exam: true, ai: 0 })
    weeks.push({ topic, lab, ai: modeAt(ai.policy, j, topics.length) })
  })
  weeks.push({ topic: 'الامتحان النهائي', lab: 'تسليم المشروع وامتحان 90 دقيقة', exam: true, ai: 0 })
  const [uname, url] = c.U.split('|')
  return {
    n: c.n, en, ar, cat, level, pre, hpw: c.hpw, weeks, hours: weeks.length * c.hpw,
    desc: c.D, market: c.M, outcomes: c.O.split(';'), project: c.P, book: c.B, advanced: c.A,
    open: { name: uname, url }, ai,
  }
})

// ---------- shared cores ----------
// General core: modules every student takes together, whatever the path.
const GENERAL = ['eng', 'tools']
const CAREER = 'career'
// Families: paths that share a second core. Chosen from module overlap across the 14 paths.
const FAMILIES = [
  { id: 'software', ar: 'مجال البرمجيات', core: ['sql', 'test', 'docker'], paths: ['Full Stack Developer', 'Backend Developer (.NET)', 'Frontend Developer', 'Mobile Developer (Flutter)'] },
  { id: 'data', ar: 'مجال البيانات والذكاء الاصطناعي', core: ['py', 'sql'], paths: ['AI Applications and Agents Engineer', 'AI Automation Engineer', 'Data Analyst and BI', 'Data Scientist and ML Engineer', 'Data Engineer'] },
  { id: 'business', ar: 'مجال الأعمال والتحليل', core: ['office', 'process', 'req', 'agile', 'story'], paths: ['IT Project Manager', 'Systems and Business Analyst'] },
  { id: 'infra', ar: 'مجال البنية التحتية والأمن', core: ['net', 'linux', 'py', 'cloud'], paths: ['DevOps and Cloud Engineer', 'Cybersecurity and SOC Analyst'] },
  { id: 'pro', ar: 'مسار احترافي لأصحاب الخبرة', core: [], paths: ['Software Architect'] },
]
const STAGES = [
  { name: 'الأساس العام', en: 'Common Core', ai: 1, shared: 'all' },
  { name: 'أساس المجال', en: 'Family Core', ai: 1, shared: 'family' },
  { name: 'التخصص: المتوسط', en: 'Specialization I', ai: 2 },
  { name: 'التخصص: المتقدم', en: 'Specialization II', ai: 3 },
  { name: 'الجاهزية والتخرج', en: 'Career & Capstone', ai: 3 },
]

const score = p => {
  const s = p.so == null ? 0 : p.so >= 10 ? 2 : p.so >= 2 ? 1 : 0
  const o = p.open == null ? 0 : p.open >= 50 ? 2 : p.open >= 10 ? 1 : 0
  const g = p.g == null ? 0 : p.g >= 15 ? 2 : p.g > 5.7 ? 1 : 0
  return { s, o, g, l: p.local, total: s + o + g + p.local }
}
const CAPSTONE = [['تحديد المشكلة والنطاق مع الجهة المستفيدة', 'وثيقة نطاق معتمدة'], ['التصميم والنموذج الأولي', 'مراجعة تصميم'], ['التنفيذ', 'نسخة قابلة للعرض'], ['الاختبار والتسليم والمناقشة', 'مشروع منشور وملف أعمال']]
const weeksOf = ids => ids.reduce((a, id) => a + MOD[id].topics.length, 0)

const paths = PATHS.map(p => {
  const fam = FAMILIES.find(f => f.paths.includes(p.en))
  if (!fam) throw new Error('no family for ' + p.en)
  const shared = new Set([...GENERAL, ...fam.core, CAREER])
  // keep each remaining module in its original level, then fold levels 1-3 into stage 3 and 4-5 into stage 4
  const spec = [[], []]
  p.lv.forEach((l, k) => l.split(' ').forEach(id => {
    if (!MOD[id]) throw new Error('module ' + id)
    if (!shared.has(id)) spec[k <= 2 ? 0 : 1].push(id)
  }))
  if (!spec[0].length) spec[0] = spec[1].splice(0, Math.ceil(spec[1].length / 2))
  const groups = [GENERAL, fam.core, spec[0], spec[1], [CAREER]]
  let week = 0
  const levels = groups.map((ids, k) => ({
    ...STAGES[k],
    modules: ids.map(id => ({
      id, name: MOD[id].name, out: MOD[id].out,
      weeks: MOD[id].topics.map(topic => ({ week: ++week, topic, ai: id === 'aidev' || id === 'evals' ? 3 : STAGES[k].ai })),
    })),
  })).filter(l => l.modules.length)
  const capstone = CAPSTONE.map(([topic, out]) => ({ week: ++week, topic, out, ai: 3 }))
  const before = weeksOf(p.lv.join(' ').split(' ')) + 6
  const wave = score(p).total >= 5 ? 1 : score(p).total === 4 && p.en !== 'Software Architect' ? 2 : 3
  return {
    id: p.en.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, ''),
    en: p.en.replace(/ \(([^)]+)\)$/, ' - $1'), ar: p.ar, score: score(p), wave,
    family: fam.id, weeks: week, hours: week * PATH_HPW, before: { weeks: before, hours: before * 14 },
    sharedWeeks: weeksOf([...GENERAL, ...fam.core, CAREER]), ownWeeks: weeksOf([...spec[0], ...spec[1]]) + capstone.length,
    evidence: p.ev, jobs: p.jobs, audience: p.who, pre: p.pre, skills: p.skills.split(';'),
    levels, capstone, capstoneText: p.cap, courses: p.courses.split(' ').map(Number), alt: p.alt || null,
    stats: { so: p.so, open: p.open, growth: p.g, local: p.local, map: p.map },
  }
}).sort((a, b) => b.score.total - a.score.total)

const families = FAMILIES.map(f => ({ id: f.id, ar: f.ar, core: f.core.map(id => ({ id, name: MOD[id].name, weeks: MOD[id].topics.length })), weeks: weeksOf(f.core), paths: paths.filter(p => p.family === f.id).map(p => p.id) }))
const general = { modules: [...GENERAL, CAREER].map(id => ({ id, name: MOD[id].name, weeks: MOD[id].topics.length })), weeks: weeksOf([...GENERAL, CAREER]) }

// Teaching load: weeks an instructor must deliver if every path ran one cohort.
const loadBefore = paths.reduce((a, p) => a + p.before.weeks, 0)
const loadAfter = general.weeks + families.reduce((a, f) => a + f.weeks, 0) + paths.reduce((a, p) => a + p.ownWeeks, 0)
const meta = {
  pathHpw: PATH_HPW, loadBefore, loadAfter,
  hoursBefore: paths.reduce((a, p) => a + p.before.hours, 0), hoursAfter: paths.reduce((a, p) => a + p.hours, 0),
  courseHoursBefore: (src('courses1.txt') + '\n\n' + src('courses2.txt')).split(/\n\s*\n/).filter(b => b.trim()).reduce((a, b) => {
    const L = b.trim().split('\n'); return a + (+L[0].split('|')[4]) * (L.find(l => l.startsWith('W:')).split(';').length + 2)
  }, 0),
}

const excluded = PATHS.excluded.map(p => ({ en: p.en, ar: p.ar, so: p.so, open: p.open, growth: p.g, alt: p.alt, score: score(p).total }))

fs.writeFileSync(path.join(root, 'src', 'data', 'curriculum.json'), JSON.stringify({ meta, general, families, paths, courses, excluded }, null, 1))
console.log(`data: ${paths.length} paths, ${courses.length} courses`, JSON.stringify(meta))
for (const p of paths) console.log(p.family.padEnd(9), p.en.padEnd(38), `${p.before.weeks}w/${p.before.hours}h -> ${p.weeks}w/${p.hours}h`, p.levels.map(l => l.modules.length).join('-'))
