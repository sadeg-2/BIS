import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { paths, courses, tier, AI_MODES, POLICIES, CAT_COLORS, pathWeeks, meta } from '../lib'
import { ROLES, GROWTH, ETF_JOBS, WAVES, KPIS, SOURCES, type SourceId } from '../data/market'
import { WORKSHOPS, IDEAS } from '../data/workshops'
import { Bars, AiStrip, ScoreDots, AiLegend } from '../components/ui'
import { CoreMap } from './Paths'
import { StudyScene, LogoMarquee, IconStack, PATH_ICONS } from '../components/visual'
import { general } from '../lib'

interface SlideProps {
  kicker?: string
  title: string
  children: ReactNode
  src?: SourceId[]
}

const S = ({ kicker, title, children, src }: SlideProps) => (
  <div className="slide-in">
    {kicker && <div className="kicker">{kicker}</div>}
    <h1>{title}</h1>
    <div className="slide-body">{children}</div>
    {src && <div className="slide-src">المصدر: {src.map(s => SOURCES[s].name).join(' · ')}</div>}
  </div>
)

function slides() {
  const fs = paths[0]
  const cats = Object.keys(CAT_COLORS).map(k => [k, courses.filter(c => c.cat === k).length]).filter(r => r[1])
  return [
    <div className="slide-in title-slide" key="t">
      <div className="title-top">
        <img src="./bis-logo.png" alt="شعار المدرسة البريطانية الدولية – غزة" className="title-logo" />
        <div>
          <div className="kicker">العرض التقديمي · المدرسة البريطانية الدولية – غزة</div>
          <div className="muted sm" dir="ltr">British International School, Gaza · American High School Track</div>
        </div>
      </div>
      <div className="slide-hero">
        <h1 className="mega">البرنامج التقني للمدرسة<br /><span className="grad">مبني على أرقام سوق العمل</span></h1>
        <StudyScene />
      </div>
      <div className="kpis">
        <div><b>{paths.length}</b><span>مساراً مهنياً</span></div>
        <div><b>{courses.length}</b><span>مادة مستقلة</span></div>
        <div><b>{WORKSHOPS.length}</b><span>ورشات AI ومشاريع</span></div>
        <div><b>24</b><span>شهراً للإطلاق الكامل</span></div>
      </div>
      <div className="presenter">إعداد: <b>المهندس صادق مجدي عاشور</b> · {new Date().getFullYear()}</div>
    </div>,
    <S key="p" kicker="المشكلة" title="الخريجون كثيرون، والخبرة العملية قليلة" src={['pcbs', 'trade', 'pt']}>
      <div className="big-stats">
        <div><b>38.3%</b><span>بطالة الخريجين بعمر 19–29 في الضفة، الربع الثاني 2026</span></div>
        <div><b>2,500+</b><span>خريج تقنية سنوياً، مقابل 9,558 عاملاً في القطاع كله</span></div>
        <div><b>24.7%</b><span>فقط من خريجي التقنية خلال عقد في وظيفة رسمية بالقطاع</span></div>
        <div><b>31.8%</b><span>من الكفاءات يعملون عبر منصات العمل الحر</span></div>
      </div>
      <p className="slide-take">الحل ليس منهجاً نظرياً إضافياً، بل خبرة قابلة للإثبات وقابلة للبيع عن بُعد.</p>
    </S>,
    <S key="r" kicker="حجم السوق" title="Full Stack وBackend يمثلان 41.2% من المطورين" src={['so25']}>
      <Bars rows={ROLES.slice(0, 9).map(([l, v]) => [l, v, `${v}%`])} highlight={2} />
    </S>,
    <S key="g" kicker="النمو حتى 2035" title="البيانات والأمن والبرمجيات تنمو، والبرمجة التقليدية تتراجع" src={['bls']}>
      <Bars rows={GROWTH.filter((_, i) => i !== 1 && i !== 3).map(([l, v]) => [l, v, `${v > 0 ? '+' : ''}${v}%`])} />
    </S>,
    <S key="e" kicker="الفرصة الفلسطينية" title="في الإعلانات المرتبطة بفلسطين: المحللون ومديرو المشاريع قبل المبرمجين" src={['etf']}>
      <Bars rows={ETF_JOBS} highlight={3} />
      <p className="slide-take">في 56,697 إعلاناً مرتبطاً بفلسطين: محلل الأعمال ومحلل الأنظمة معاً 2,197 إعلاناً، أكثر من ضعف مطور البرمجيات.</p>
    </S>,
    <S key="k" kicker="قاعدة الاختيار" title="أربعة مؤشرات تحدد ترتيب المسارات الأربعة عشر">
      <div className="rank">
        {paths.map((p, i) => (
          <div key={p.id} className={`rank-row ${p.wave === 1 ? 'w1' : ''}`}>
            <span className="rank-n">{i + 1}</span>
            <span dir="ltr" className="rank-name">{p.en}</span>
            <ScoreDots score={p.score} />
            <span className="rank-s">{p.score.total}/8</span>
          </div>
        ))}
      </div>
    </S>,
    <S key="m" kicker="بنية البرنامج" title="أساس مشترك يدرسه الطلاب معاً، ثم تخصص يختاره كل طالب">
      <CoreMap compact />
      <div className="big-stats three">
        <div><b>{general.weeks}</b><span>أسابيع في الأساس العام لكل الطلاب</span></div>
        <div><b>{meta.pathHpw}</b><span>ساعات تدريب أسبوعياً على جلستين</span></div>
        <div><b>{courses.reduce((a, c) => a + c.hours, 0).toLocaleString('en-US')}</b><span>ساعة في 44 مادة مستقلة</span></div>
      </div>
    </S>,
    <S key="w" kicker="التوصية" title="الموجة الأولى: خمسة مسارات وأربع مواد">
      <div className="grid-cards present-cards">
        {paths.filter(p => p.wave === 1).map(p => (
          <div key={p.id} className="card path-card">
            <div className="pc-top"><IconStack ids={PATH_ICONS[p.id]} size={26} /><span className="tag">{p.score.total}/8 · {tier(p.score.total)}</span></div>
            <h3 dir="ltr">{p.en}</h3>
            <div className="ar-name">{p.ar}</div>
            <div className="pc-meta"><span>{p.weeks} أسبوعاً</span><span>{p.hours} ساعة</span></div>
          </div>
        ))}
        <div className="card path-card alt">
          <h3>المواد المستقلة</h3>
          <div className="ar-name">Python · SQL · DSA · Technical English</div>
        </div>
      </div>
    </S>,
    <S key="s" kicker="نموذج مسار" title={`${fs.ar}: ${fs.weeks} أسبوعاً من الأساس حتى مشروع حقيقي`}>
      <div className="level-bar">
        {fs.levels.map((l, k) => {
          const n = l.modules.reduce((a, m) => a + m.weeks.length, 0)
          return <div key={k} className={`lv lv${k}`} style={{ flex: n }}><b>{l.name}</b><span>{n} أسابيع</span></div>
        })}
        <div className="lv lvc" style={{ flex: fs.capstone.length }}><b>Capstone</b><span>{fs.capstone.length} أسابيع</span></div>
      </div>
      <h3 className="slide-sub">استخدام AI أسبوعاً بأسبوع</h3>
      <AiStrip weeks={pathWeeks(fs)} big />
      <AiLegend />
      <p className="slide-take">مشروع التخرج: {fs.capstoneText}.</p>
    </S>,
    <S key="c" kicker="الباب الثالث" title={`${courses.length} مادة مستقلة بخطط أسبوعية كاملة`}>
      <div className="cat-grid">
        {cats.map(([k, n]) => <div key={k} className="cat-tile" style={{ '--c': CAT_COLORS[k] }}><b>{n}</b><span>{k}</span></div>)}
      </div>
      <LogoMarquee />
      <p className="slide-take">{courses.reduce((a, c) => a + c.hours, 0).toLocaleString('en-US')} ساعة تدريب. لكل مادة مخرجات، ومختبرات، وأربعة واجبات، ومشروع، وامتحانان، ومراجع جامعية.</p>
    </S>,
    <S key="a" kicker="لمسة الذكاء الاصطناعي" title="الطالب يتقن المهارة أولاً، ثم يستخدم AI ليعمل أسرع" src={['so26', 'ai']}>
      <div className="modes-row">
        {AI_MODES.map(m => <div key={m.id} className="mode-card" style={{ '--c': m.color }}><div className="mode-n">{m.id}</div><h3>{m.name}</h3><p>{m.desc}</p></div>)}
      </div>
      <div className="policy-mini">
        {Object.entries(POLICIES).map(([k, p]) => <div key={k}><b>{p.name}:</b> {p.plan}</div>)}
      </div>
    </S>,
    <S key="ws" kicker="ورشات قصيرة" title="من استخدام AI إلى تحويل الفكرة لمشروع قائم">
      <div className="ws-grid present-ws">
        {WORKSHOPS.slice(0, 3).map(w => (
          <div key={w.id} className="ws-card on">
            <div className="ws-top"><span className="ws-hours">{w.hours} ساعات</span></div>
            <h3>{w.title}</h3>
            <div className="muted sm">{w.output}</div>
          </div>
        ))}
      </div>
      <h3 className="slide-sub">أمثلة من بنك الأفكار</h3>
      <div className="idea-chips">{IDEAS.slice(0, 6).map(i => <span key={i.title}>{i.title}</span>)}</div>
    </S>,
    <S key="l" kicker="التنفيذ" title="الإطلاق على ثلاث موجات خلال 24 شهراً">
      <div className="timeline">
        {WAVES.map(w => (
          <div key={w.name} className="tl-item">
            <div className="tl-dot" />
            <div className="tl-months">الأشهر {w.months}</div>
            <h3>{w.name}</h3>
            <p>{w.wave ? paths.filter(p => p.wave === w.wave).map(p => p.ar).join('، ') : w.items}</p>
            <div className="tl-gate">{w.gate}</div>
          </div>
        ))}
      </div>
    </S>,
    <S key="d" kicker="الخطوات التالية" title="ثلاثة قرارات لبدء التنفيذ">
      <div className="decisions">
        <div><span>1</span>اعتماد الأساس المشترك والموجة الأولى: خمسة مسارات وأربع مواد مستقلة وورشتا AI.</div>
        <div><span>2</span>اختيار المدربين ومراجعة المناهج من مختصين قبل التدريس.</div>
        <div><span>3</span>تحديد جهات شريكة تقدم مشاريع التخرج لطلاب الدفعة الأولى.</div>
      </div>
      <div className="kpi-row">{KPIS.map(([k, v]) => <div key={k}><b dir="ltr">{v}</b><span>{k}</span></div>)}</div>
    </S>,
  ]
}

export default function Present({ start }: { start: number }) {
  const all = slides()
  const [i, setI] = useState(Math.min(start, all.length - 1))
  const go = useCallback((d: number) => setI(x => Math.max(0, Math.min(all.length - 1, x + d))), [all.length])
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); go(1) }
      else if (['ArrowRight', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); go(-1) }
      else if (e.key === 'Escape') window.location.hash = '#/'
      else if (e.key === 'Home') setI(0)
      else if (e.key === 'End') setI(all.length - 1)
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [go, all.length])
  useEffect(() => { history.replaceState(null, '', `#/present/${i}`) }, [i])
  const full = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())
  return (
    <div className="present">
      <div className="present-bar">
        <a href="#/" className="icon-btn" title="خروج (Esc)">✕</a>
        <div className="progress"><i style={{ width: `${((i + 1) / all.length) * 100}%` }} /></div>
        <span className="muted sm" dir="ltr">{i + 1} / {all.length}</span>
        <button className="icon-btn" onClick={full} title="ملء الشاشة">⛶</button>
      </div>
      <div className="slide" key={i}>{all[i]}</div>
      <div className="present-nav">
        <button className="btn ghost" onClick={() => go(-1)} disabled={i === 0}>→ السابق</button>
        <div className="dots">{all.map((_, k) => <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`شريحة ${k + 1}`} />)}</div>
        <button className="btn primary" onClick={() => go(1)} disabled={i === all.length - 1}>التالي ←</button>
      </div>
    </div>
  )
}
