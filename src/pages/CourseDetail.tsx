import { courses, courseByN, paths, AI_MODES, POLICIES, aiShare } from '../lib'
import { Cat, AiBadge, AiStrip, AiLegend } from '../components/ui'
import { Tech, courseIcon } from '../components/visual'
import type { AiMode } from '../types'

export default function CourseDetail({ n }: { n: number }) {
  const c = courseByN(n)
  if (!c) return <div className="empty">لم يُعثر على المادة. <a href="#/courses">العودة للمواد</a></div>
  const pol = POLICIES[c.ai.policy]
  const share = aiShare(c.weeks)
  const lec = Math.ceil(c.hpw / 2)
  const used = paths.filter(p => p.courses.includes(c.n))
  const prev = courses[c.n - 2], next = courses[c.n]
  const firstOf = (mode: AiMode) => c.weeks.findIndex(w => w.ai === mode) + 1
  return (
    <>
      <a href="#/courses" className="back">→ كل المواد</a>
      <section className="detail-hero">
        <div>
          <div className="kicker"><Tech id={courseIcon(c.n)} size={40} /><span className="num">{c.n}</span> <Cat name={c.cat} /> · {c.level}</div>
          <h1 dir="ltr" className="ltr-title">{c.en}</h1>
          <div className="ar-name big">{c.ar}</div>
          <p className="lead">{c.desc}</p>
        </div>
        <div className="detail-side">
          <div className="facts">
            <div><b>{c.weeks.length}</b><span>أسبوعاً</span></div>
            <div><b>{c.hours}</b><span>ساعة</span></div>
            <div><b>{lec}+{c.hpw - lec}</b><span>شرح ومختبر أسبوعياً</span></div>
          </div>
          <div className="market-box"><b>أهميتها في السوق</b><p>{c.market}</p></div>
        </div>
      </section>

      <section className="section ai-section">
        <div className="sec-head">
          <h2>الذكاء الاصطناعي في هذه المادة</h2>
          <span className="tag">{pol.name}</span>
        </div>
        <div className="two">
          <div>
            <h3>مجالات التطبيق</h3>
            <ul className="uses">{c.ai.uses.map(u => <li key={u}>{u}</li>)}</ul>
            <div className="keep"><b>يبقى دون AI:</b> {c.ai.keep}</div>
          </div>
          <div>
            <h3>متى يستخدمه الطالب؟</h3>
            <p>{pol.plan}</p>
            <AiStrip weeks={c.weeks} big />
            <div className="phase-list">
              {([1, 2, 3] as AiMode[]).filter(m => share[m] > 0).map(m => (
                <div key={m} className="phase" style={{ '--c': AI_MODES[m].color }}>
                  <AiBadge mode={m} /> من الأسبوع {firstOf(m)} · {Math.round(share[m] * c.weeks.length)} أسابيع
                  <div className="muted sm">{AI_MODES[m].desc}</div>
                </div>
              ))}
              <div className="phase" style={{ '--c': AI_MODES[0].color }}><AiBadge mode={0} /> امتحانا منتصف الفصل والنهائي</div>
            </div>
            <p className="muted sm"><b>لماذا؟</b> {pol.why}</p>
          </div>
        </div>
      </section>

      <section className="section two">
        <div className="panel">
          <h3>مخرجات التعلم</h3>
          <ol className="outcomes">{c.outcomes.map(o => <li key={o}>{o}</li>)}</ol>
          <dl className="kv">
            <dt>المتطلبات السابقة</dt>
            <dd>{c.pre.split(/(\d+)/).map((s, i) => (/^\d+$/.test(s) && courseByN(+s) ? <a key={i} href={`#/courses/${s}`}>{s}</a> : s))}</dd>
            <dt>المشروع</dt><dd>{c.project}</dd>
          </dl>
        </div>
        <div className="panel">
          <h3>المراجع</h3>
          <dl className="kv">
            <dt>الكتاب الأساسي</dt><dd dir="ltr">{c.book}</dd>
            <dt>للمستوى المتقدم</dt><dd dir="ltr">{c.advanced}</dd>
            <dt>مادة مفتوحة</dt><dd><a href={c.open.url} target="_blank" rel="noreferrer" dir="ltr">{c.open.name}</a></dd>
          </dl>
          {used.length > 0 && (
            <>
              <h3 style={{ marginTop: 16 }}>تدعم المسارات</h3>
              <div className="chips">{used.map(p => <a key={p.id} href={`#/paths/${p.id}`} className="chip" dir="ltr">{p.en}</a>)}</div>
            </>
          )}
        </div>
      </section>

      <section className="section">
        <div className="sec-head"><h2>الخطة الأسبوعية</h2><AiLegend /></div>
        <div className="table-wrap">
          <table className="weeks">
            <thead><tr><th>الأسبوع</th><th>الموضوع</th><th>المختبر أو التقييم</th><th>استخدام AI</th></tr></thead>
            <tbody>
              {c.weeks.map((w, i) => (
                <tr key={i} className={w.exam ? 'exam' : ''}>
                  <td className="wk">{i + 1}</td><td className="t-topic" dir="auto">{w.topic}</td><td className="t-lab" dir="auto">{w.lab}</td><td className="t-ai"><AiBadge mode={w.ai} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted sm">التقييم: واجبات 20% · مختبرات 10% · منتصف الفصل 20% · مشروع 20% · نهائي 30%. النجاح 60% في المجموع و50% في النهائي.</p>
      </section>

      <nav className="pager">
        {prev ? <a href={`#/courses/${prev.n}`}>→ <span dir="ltr">{prev.en}</span></a> : <span />}
        {next ? <a href={`#/courses/${next.n}`}><span dir="ltr">{next.en}</span> ←</a> : <span />}
      </nav>
    </>
  )
}
