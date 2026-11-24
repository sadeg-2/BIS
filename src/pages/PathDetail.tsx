import { useState } from 'react'
import { paths, tier, courseByN, AI_MODES, pathWeeks, aiShare, meta, familyOf } from '../lib'
import { AiBadge, AiStrip, AiLegend, ScoreDots } from '../components/ui'
import { IconStack, PATH_ICONS } from '../components/visual'
import type { AiMode } from '../types'

const GATE: Record<string, string> = {
  'الأساس العام': 'اختبار عملي فردي، والنجاح 70%',
  'أساس المجال': 'مشروع صغير يناقش شفهياً',
  'التخصص: المتوسط': 'مشروع متكامل مع مراجعة',
  'التخصص: المتقدم': 'اختبار عملي في زمن محدد',
  'الجاهزية والتخرج': 'ملف أعمال ومقابلة تجريبية',
}
const AI_TEXT: Record<AiMode, string> = {
  0: 'دون AI.',
  1: 'معلّم فقط: شرح الأخطاء والمفاهيم. يكتب الطالب عمله بنفسه، واختبار المرحلة دون AI.',
  2: 'مساعد: مراجعة الكود، وتوليد الاختبارات، وتشخيص الأخطاء بعد أن يكتب الطالب الحل.',
  3: 'شريك: توليد أجزاء من العمل بإشراف الطالب، مع الإفصاح وفهم كل سطر واختباره.',
}
const TONES = ['lv0', 'lv1', 'lv2', 'lv3', 'lv4']
const SHARED: Record<string, string> = { 'الأساس العام': 'مشترك مع كل المسارات', 'أساس المجال': 'مشترك مع طلاب المجال' }

export default function PathDetail({ id }: { id: string }) {
  const p = paths.find(x => x.id === id)
  const [open, setOpen] = useState(0)
  if (!p) return <div className="empty">لم يُعثر على المسار. <a href="#/paths">العودة للمسارات</a></div>
  const fam = familyOf(p)
  const weeks = pathWeeks(p)
  const share = aiShare(weeks)
  const h = meta.pathHpw
  const cap = p.levels.length
  return (
    <>
      <a href="#/paths" className="back">→ كل المسارات</a>
      <section className="detail-hero">
        <div>
          <div className="kicker">الموجة {p.wave} · أولوية {tier(p.score.total)} · {fam.ar}</div>
          <h1 dir="ltr" className="ltr-title">{p.en}</h1>
          <div className="ar-name big">{p.ar}</div>
          <p className="lead">{p.evidence}</p>
        </div>
        <div className="detail-side">
          <div className="big-score">{p.score.total}<small>/8</small></div>
          <ScoreDots score={p.score} />
          <div className="facts">
            <div><b>{p.weeks}</b><span>أسبوعاً</span></div>
            <div><b>{p.hours}</b><span>ساعة</span></div>
            <div><b>{h}</b><span>ساعات أسبوعياً</span></div>
          </div>
          <IconStack ids={PATH_ICONS[p.id]} size={34} />
          <div className="market-box">
            <b>توزيع المسار</b>
            <p>{p.sharedWeeks} أسبوعاً في الأساس المشترك مع طلاب مسارات أخرى، و{p.ownWeeks} أسبوعاً للتخصص ومشروع التخرج.</p>
          </div>
        </div>
      </section>

      <section className="section two">
        <div className="panel">
          <h3>لمن هذا المسار؟</h3>
          <dl className="kv">
            <dt>الوظائف</dt><dd dir="auto">{p.jobs}</dd>
            <dt>الفئة المستهدفة</dt><dd>{p.audience}</dd>
            <dt>المتطلبات السابقة</dt><dd>{p.pre}</dd>
          </dl>
        </div>
        <div className="panel">
          <h3>مهارات الخريج</h3>
          <div className="chips">{p.skills.map(s => <span key={s} className="chip">{s}</span>)}</div>
          <h3 style={{ marginTop: 18 }}>مشروع التخرج</h3>
          <p>{p.capstoneText}</p>
        </div>
      </section>

      <section className="section">
        <h2>بنية المسار</h2>
        <div className="level-bar">
          {p.levels.map((l, k) => {
            const n = l.modules.reduce((a, m) => a + m.weeks.length, 0)
            return (
              <button key={k} className={`lv ${TONES[k]} ${open === k ? 'on' : ''} ${SHARED[l.name] ? 'shared' : ''}`} style={{ flex: n }} onClick={() => setOpen(k)}>
                <b>{l.name}</b><span>{n} أسابيع{SHARED[l.name] ? ' · مشترك' : ''}</span>
              </button>
            )
          })}
          <button className={`lv lvc ${open === cap ? 'on' : ''}`} style={{ flex: p.capstone.length }} onClick={() => setOpen(cap)}>
            <b>مشروع التخرج</b><span>{p.capstone.length} أسابيع</span>
          </button>
        </div>
      </section>

      <section className="section">
        <div className="sec-head">
          <h2>الخطة الأسبوعية</h2>
          <AiLegend />
        </div>
        <div className="accordion">
          {p.levels.map((l, k) => {
            const n = l.modules.reduce((a, m) => a + m.weeks.length, 0)
            return (
              <div key={k} className={`acc ${open === k ? 'open' : ''}`}>
                <button className="acc-h" onClick={() => setOpen(open === k ? -1 : k)}>
                  <span className="acc-n">{k + 1}</span>
                  <span className="acc-t"><b>{l.name}</b> <span dir="ltr" className="muted">{l.en}</span>{SHARED[l.name] && <span className="shared-tag">{SHARED[l.name]}</span>}</span>
                  <span className="acc-m">{n * h} ساعة · {GATE[l.name]}</span>
                  <span className="acc-i">⌄</span>
                </button>
                {open === k && (
                  <div className="acc-b">
                    <div className="ai-note" style={{ '--c': AI_MODES[l.ai].color }}><AiBadge mode={l.ai} /> {AI_TEXT[l.ai]}</div>
                    <table className="weeks">
                      <thead><tr><th>الأسبوع</th><th>الوحدة</th><th>الموضوع</th><th>AI</th><th>المخرج</th></tr></thead>
                      <tbody>
                        {l.modules.flatMap(m => m.weeks.map((w, j) => (
                          <tr key={w.week}>
                            <td className="wk">{w.week}</td>
                            <td className="t-mod">{j === 0 ? <b>{m.name}</b> : ''}</td>
                            <td className="t-topic" dir="auto">{w.topic}</td>
                            <td className="t-ai"><AiBadge mode={w.ai} /></td>
                            <td className="muted t-lab">{j === m.weeks.length - 1 ? m.out : ''}</td>
                          </tr>
                        )))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })}
          <div className={`acc ${open === cap ? 'open' : ''}`}>
            <button className="acc-h" onClick={() => setOpen(open === cap ? -1 : cap)}>
              <span className="acc-n">★</span>
              <span className="acc-t"><b>مشروع التخرج</b> <span className="muted">Capstone</span></span>
              <span className="acc-m">{p.capstone.length * h} ساعة · مناقشة أمام لجنة من المدرسة والصناعة</span>
              <span className="acc-i">⌄</span>
            </button>
            {open === cap && (
              <div className="acc-b">
                <div className="ai-note" style={{ '--c': AI_MODES[3].color }}><AiBadge mode={3} /> شريك مع الإفصاح الكامل عن استخدام AI. المناقشة النهائية دون AI ويُسأل الطالب عن أي جزء من مشروعه.</div>
                <table className="weeks">
                  <thead><tr><th>الأسبوع</th><th>المرحلة</th><th>AI</th><th>المخرج</th></tr></thead>
                  <tbody>{p.capstone.map(w => <tr key={w.week}><td className="wk">{w.week}</td><td className="t-topic">{w.topic}</td><td className="t-ai"><AiBadge mode={w.ai} /></td><td className="muted t-lab">{w.out}</td></tr>)}</tbody>
                </table>
                <p className="muted sm">قبل هذه المرحلة يحضر الطالب ورشة «من الفكرة إلى مشروع قائم»، ويختار فكرته من <a href="#/workshops">بنك الأفكار</a> أو من جهة حقيقية.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section two">
        <div className="panel">
          <h3>الذكاء الاصطناعي عبر المسار</h3>
          <AiStrip weeks={weeks} big />
          <div className="share">
            {AI_MODES.map((m, i) => share[i] > 0 && (
              <div key={m.id}><i style={{ background: m.color }} /><b>{Math.round(share[i] * weeks.length)}</b> أسبوعاً {m.name}</div>
            ))}
          </div>
          <p className="muted sm">اختبارات المراحل والمناقشة النهائية دون AI في كل الأحوال.</p>
        </div>
        <div className="panel">
          <h3>مواد مساندة من الباب الثالث</h3>
          <div className="mini-list">
            {p.courses.map(n => {
              const c = courseByN(n)
              if (!c) return null
              return <a key={n} href={`#/courses/${n}`} className="mini-link"><span className="num">{n}</span><span dir="ltr">{c.en}</span><span className="muted">{c.ar}</span></a>
            })}
          </div>
        </div>
      </section>

      {p.alt && (
        <section className="section">
          <h2>تخصصات بديلة بالمدة نفسها</h2>
          <div className="grid3">
            {Object.entries(p.alt).map(([k, v]) => <div key={k} className="panel"><h3 dir="ltr">{k}</h3><p>{v}</p></div>)}
          </div>
        </section>
      )}
    </>
  )
}
