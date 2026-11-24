import { useState } from 'react'
import { paths, tier, pathWeeks, general, families, meta } from '../lib'
import { PageHead, ScoreDots, AiStrip } from '../components/ui'
import { IconStack, PATH_ICONS } from '../components/visual'
import type { Path } from '../types'

const FILTERS: [number, string][] = [[0, 'الكل'], [1, 'الموجة الأولى'], [2, 'الموجة الثانية'], [3, 'الموجة الثالثة']]

export function CoreMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="core-map">
      <div className="core-general">
        <div className="core-label">الأساس العام · لكل الطلاب</div>
        <div className="core-mods">{general.modules.map(m => <span key={m.id}>{m.name} <i>{m.weeks} أسابيع</i></span>)}</div>
      </div>
      <div className="core-families">
        {families.map(f => (
          <div key={f.id} className={`core-family fam-${f.id}`}>
            <b>{f.ar}</b>
            {f.core.length > 0
              ? <div className="core-mods sm">{f.core.map(m => <span key={m.id}>{m.name}</span>)}</div>
              : <div className="muted sm">يبدأ التخصص مباشرة بعد الأساس العام</div>}
            {!compact && (
              <div className="fam-paths">
                {f.paths.map(id => {
                  const p = paths.find(x => x.id === id)
                  if (!p) return null
                  return <a key={id} href={`#/paths/${id}`} dir="ltr">{p.en}</a>
                })}
              </div>
            )}
            <div className="fam-w">{f.weeks ? `${f.weeks} أسابيع مشتركة` : 'لأصحاب الخبرة'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PathCard({ p, i = 0, detail = true }: { p: Path; i?: number; detail?: boolean }) {
  return (
    <a href={`#/paths/${p.id}`} className="card path-card" style={{ animationDelay: `${i * 40}ms` }}>
      <div className="pc-top">
        <IconStack ids={PATH_ICONS[p.id]} size={26} />
        <span className={`tag w${p.wave}`}>الموجة {p.wave}</span>
      </div>
      <h3 dir="ltr">{p.en}</h3>
      <div className="ar-name">{p.ar} · <span className="muted">{tier(p.score.total)}</span></div>
      {detail && <p className="pc-ev">{p.evidence}</p>}
      <ScoreDots score={p.score} />
      {detail && (
        <>
          <div className="split-bar" title="مشترك / تخصص"><i style={{ flex: p.sharedWeeks }} /><b style={{ flex: p.ownWeeks }} /></div>
          <div className="sm muted">{p.sharedWeeks} أسبوعاً مشتركاً + {p.ownWeeks} تخصص</div>
          <AiStrip weeks={pathWeeks(p)} />
        </>
      )}
      <div className="pc-meta"><span className="score-inline">{p.score.total}/8</span><span>{p.weeks} أسبوعاً</span><span>{p.hours} ساعة</span></div>
    </a>
  )
}

export default function Paths() {
  const [wave, setWave] = useState(0)
  const list = paths.filter(p => !wave || p.wave === wave)
  return (
    <>
      <PageHead
        kicker="الباب الثاني"
        title="المسارات المهنية"
        lead={`14 مساراً تتشارك أساساً عاماً، ثم أساساً خاصاً بكل مجال، فيدرس الطالب الأساس مع زملاء من تخصصات مختلفة ثم ينطلق إلى تخصصه. التدريب ${meta.pathHpw} ساعات أسبوعياً على جلستين، وكل مسار ينتهي بمشروع لجهة حقيقية.`}
      />

      <section className="section">
        <div className="sec-head">
          <h2>أساس مشترك ثم تخصص</h2>
          <div className="savings">
            <div><b>{general.weeks}</b><span>أسابيع مشتركة لكل الطلاب</span></div>
            <div><b>{families.filter(f => f.core.length).length}</b><span>مجالات لكل منها أساس خاص</span></div>
            <div><b>{meta.pathHpw}</b><span>ساعات تدريب أسبوعياً</span></div>
          </div>
        </div>
        <CoreMap />
        <p className="muted sm">
          الوحدات المشتركة هي الأكثر تكراراً بين المسارات: الإنجليزية والتواصل في المسارات الأربعة عشر، والجاهزية المهنية في 13، وأدوات المبرمج في 10، وSQL في 9.
        </p>
      </section>

      <section className="section">
        <div className="sec-head">
          <h2>المسارات</h2>
          <div className="seg">
            {FILTERS.map(([v, l]) => <button key={v} className={wave === v ? 'on' : ''} onClick={() => setWave(v)}>{l}</button>)}
          </div>
        </div>
        <div className="grid-cards">
          {list.map((p, i) => <PathCard key={p.id} p={p} i={i} />)}
        </div>
      </section>
    </>
  )
}
