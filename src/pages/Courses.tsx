import { useMemo, useState } from 'react'
import { courses, CAT_COLORS, POLICIES } from '../lib'
import { PageHead, Cat, AiStrip } from '../components/ui'
import { Tech, courseIcon } from '../components/visual'

export default function Courses() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const cats = Object.keys(CAT_COLORS)
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return courses.filter(c => (!cat || c.cat === cat) && (!s || `${c.en} ${c.ar} ${c.desc}`.toLowerCase().includes(s)))
  }, [q, cat])
  return (
    <>
      <PageHead
        kicker="الباب الثالث"
        title="المواد المستقلة"
        lead="44 مادة تُباع منفصلة أو تدعم المسارات. لكل مادة مخرجات تعلم، وخطة أسبوعية بمختبر، وأربعة واجبات، ومشروع، وامتحانان، ومراجع، وخطة لاستخدام AI."
      >
        <div className="filters">
          <input className="search" placeholder="ابحث عن مادة…" value={q} onChange={e => setQ(e.target.value)} />
          <div className="seg wrap">
            <button className={!cat ? 'on' : ''} onClick={() => setCat('')}>الكل</button>
            {cats.map(c => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
          </div>
        </div>
      </PageHead>
      <p className="muted sm">{list.length} مادة</p>
      <div className="grid-cards">
        {list.map((c, i) => (
          <a key={c.n} href={`#/courses/${c.n}`} className="card course-card" style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
            <div className="cc-top"><span className="cc-icon"><Tech id={courseIcon(c.n)} size={34} /><span className="num">{c.n}</span></span><Cat name={c.cat} /></div>
            <h3 dir="ltr">{c.en}</h3>
            <div className="ar-name">{c.ar}</div>
            <p className="pc-ev">{c.market}</p>
            <AiStrip weeks={c.weeks} />
            <div className="pc-meta"><span>{c.weeks.length} أسبوعاً</span><span>{c.hours} ساعة</span><span>AI: {POLICIES[c.ai.policy].name}</span></div>
          </a>
        ))}
      </div>
    </>
  )
}
