import raw from './data/curriculum.json'
import type { AiMode, AiPolicy, Course, Curriculum, Family, Path, Week } from './types'

const data = raw as unknown as Curriculum
export const { meta, general, families, paths, courses, excluded } = data

export const familyOf = (p: Path): Family => {
  const f = families.find(x => x.id === p.family)
  if (!f) throw new Error(`Unknown family ${p.family}`)
  return f
}

export interface AiModeInfo {
  id: AiMode
  name: string
  short: string
  color: string
  desc: string
}

export const AI_MODES: AiModeInfo[] = [
  { id: 0, name: 'بدون AI', short: 'بدون', color: 'var(--ai0)', desc: 'الامتحانات وما يجب أن يتقنه الطالب بنفسه.' },
  { id: 1, name: 'معلّم', short: 'معلّم', color: 'var(--ai1)', desc: 'يشرح ويطرح أسئلة ويولّد تمارين، ولا يكتب الحل.' },
  { id: 2, name: 'مساعد', short: 'مساعد', color: 'var(--ai2)', desc: 'يراجع ويقترح ويولّد اختبارات بعد أن يكتب الطالب عمله.' },
  { id: 3, name: 'شريك', short: 'شريك', color: 'var(--ai3)', desc: 'يولّد الكود والمحتوى بإشراف الطالب، مع الإفصاح والاختبار والقدرة على شرح كل سطر.' },
]

export interface PolicyInfo {
  name: string
  plan: string
  why: string
}

export const POLICIES: Record<AiPolicy, PolicyInfo> = {
  build: { name: 'مواد البرمجة', plan: 'معلّم في أول 40% من الفصل، ثم مساعد، ثم شريك في مرحلة المشروع.', why: 'يتعلم الطالب كتابة الكود وقراءته قبل أن يفوّض كتابته.' },
  core: { name: 'هياكل البيانات والخوارزميات', plan: 'معلّم طوال الفصل تقريباً، ومساعد في آخر 15% فقط.', why: 'مقابلات التوظيف تختبر هذه المهارة دون أي أداة.' },
  theory: { name: 'المواد الرياضية والنظرية', plan: 'معلّم طوال الفصل.', why: 'الهدف هو الإثبات والفهم، وليس الوصول إلى إجابة.' },
  systems: { name: 'مواد الأنظمة', plan: 'معلّم في النصف الأول، ثم مساعد للتشخيص والتحليل.', why: 'فهم ما يحدث تحت الأدوات شرط قبل استخدامها.' },
  applied: { name: 'المواد التطبيقية والمهنية', plan: 'معلّم في أول 20%، ثم مساعد، ثم شريك في آخر 40%.', why: 'هكذا يعمل الخريج فعلاً في السوق، بشرط التحقق والمراجعة.' },
  ai: { name: 'مواد الذكاء الاصطناعي', plan: 'مساعد في أول 30%، ثم شريك، لأن الأداة جزء من المادة نفسها.', why: 'الطالب يتعلم بناء أنظمة AI وتقييمها، فيستخدمها من البداية.' },
}

export const CAT_COLORS: Record<string, string> = {
  'النواة البرمجية': '#2563eb', 'الخوارزميات والرياضيات': '#7c3aed', 'البيانات': '#0891b2', 'الأنظمة والشبكات': '#0d9488',
  'هندسة البرمجيات': '#4f46e5', 'الأمن': '#dc2626', 'الذكاء الاصطناعي': '#c026d3', 'التخصصات': '#ea580c', 'المهارات المهنية': '#ca8a04',
}

export const tier = (t: number): string => (t >= 6 ? 'عالية جداً' : t >= 4 ? 'عالية' : t >= 2 ? 'متوسطة' : 'لا مسار مستقل')
export const fmt = (n: number | null | undefined): string => (n == null ? '—' : Number(n).toLocaleString('en-US'))
export const courseByN = (n: number): Course | undefined => courses.find(c => c.n === n)
export const pathWeeks = (p: Path): Week[] => [...p.levels.flatMap(l => l.modules.flatMap(m => m.weeks)), ...p.capstone]
export const aiShare = (weeks: Week[]): number[] => AI_MODES.map(m => weeks.filter(w => w.ai === m.id).length / weeks.length)
