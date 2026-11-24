import { useState } from 'react'
import { WORKSHOPS, IDEAS, WORKSHOP_PLAN } from '../data/workshops'
import { PageHead } from '../components/ui'

const hrs = (h: number): string => (h === 2 ? 'ساعتان' : h === 1 ? 'ساعة' : h <= 10 ? `${h} ساعات` : `${h} ساعة`)
const LEVEL_TONE: Record<string, string> = { 'مبتدئ': 'lvl-b', 'متوسط': 'lvl-m', 'متقدم': 'lvl-a' }

export default function Workshops() {
  const [open, setOpen] = useState(WORKSHOPS[1].id)
  const total = WORKSHOPS.reduce((a, w) => a + w.hours, 0)
  return (
    <>
      <PageHead
        kicker="ورشات قصيرة ومركزة"
        title="ورشات الذكاء الاصطناعي والمشاريع"
        lead={`${WORKSHOPS.length} ورشات عملية بمجموع ${total} ساعة. تُقدَّم داخل المسارات أو منفصلة لطلاب المدرسة ومعلميها، وكل ورشة تنتهي بمخرج يأخذه المشارك معه.`}
      />

      <section className="section">
        <div className="ws-grid">
          {WORKSHOPS.map((w, i) => (
            <button key={w.id} className={`ws-card ${open === w.id ? 'on' : ''}`} onClick={() => setOpen(w.id)} style={{ animationDelay: `${i * 50}ms` }}>
              <div className="ws-top"><span className="ws-hours">{hrs(w.hours)}</span><span className="muted sm">{w.sessions === 2 ? 'جلستان' : w.sessions > 2 ? `${w.sessions} جلسات` : 'جلسة واحدة'}</span></div>
              <h3>{w.title}</h3>
              <div className="muted sm" dir="ltr">{w.en}</div>
            </button>
          ))}
        </div>
        {WORKSHOPS.filter(w => w.id === open).map(w => (
          <div key={w.id} className="panel ws-detail">
            <div className="ws-head">
              <div>
                <h2>{w.title}</h2>
                <p className="lead">{w.goal}</p>
              </div>
              <div className="facts">
                <div><b>{w.hours}</b><span>ساعات</span></div>
                <div><b>{w.sessions}</b><span>{w.sessions === 2 ? 'جلستان' : w.sessions > 2 ? 'جلسات' : 'جلسة'}</span></div>
              </div>
            </div>
            <div className="two">
              <div>
                <h3>المحاور</h3>
                <ol className="outcomes">{w.agenda.map(a => <li key={a}>{a}</li>)}</ol>
              </div>
              <div>
                <dl className="kv">
                  <dt>الفئة</dt><dd>{w.audience}</dd>
                  <dt>التوقيت</dt><dd>{w.when}</dd>
                  <dt>المخرج</dt><dd><b>{w.output}</b></dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>أين تقع الورشات خلال المسار؟</h2>
        <div className="ws-plan">
          {WORKSHOP_PLAN.map(([when, what], i) => (
            <div key={when} className="ws-step"><span>{i + 1}</span><b>{when}</b><p>{what}</p></div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sec-head">
          <h2>بنك أفكار المشاريع</h2>
          <span className="muted sm">لورشة «من الفكرة إلى مشروع قائم» ولمشاريع التخرج والهاكاثون</span>
        </div>
        <div className="grid-cards">
          {IDEAS.map((idea, i) => (
            <div key={idea.title} className="card idea" style={{ animationDelay: `${i * 30}ms` }}>
              <div className="pc-top"><span className={`tag ${LEVEL_TONE[idea.level]}`}>{idea.level}</span><span className="muted sm" dir="ltr">{idea.path}</span></div>
              <h3>{idea.title}</h3>
              <p className="muted">{idea.desc}</p>
              <div className="idea-ai"><b>دور AI:</b> {idea.ai}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
