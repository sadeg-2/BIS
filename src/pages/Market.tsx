import { PageHead, Bars, Src } from '../components/ui'
import { PALESTINE, ROLES, GROWTH, ETF_JOBS, ETF_SKILLS, TECH, AI_SKILLS, SCORING } from '../data/market'
import { paths, excluded, fmt } from '../lib'

export default function Market() {
  return (
    <>
      <PageHead
        kicker="الأدلة"
        title="أرقام سوق العمل"
        lead="لكل رقم مصدره ونطاقه. لا توجد إحصائية منشورة لحصة كل تخصص داخل فلسطين، لذلك نجمع أربعة مؤشرات بديلة ونصرّح بحدود كل منها."
      />

      <section className="section">
        <h2>السوق الفلسطيني</h2>
        <div className="grid4">
          {PALESTINE.map(r => (
            <div key={r.k} className="stat small">
              <div className="stat-v" dir="ltr">{r.v}</div>
              <div className="stat-l">{r.k}</div>
              <div className="stat-n">{r.note}</div>
              <Src id={r.src} />
            </div>
          ))}
        </div>
        <p className="callout">
          عدد خريجي التقنية كبير مقارنة بحجم القطاع، والنقص الحقيقي في الخبرة العملية. لذلك ينتهي كل مسار بمشروع لجهة حقيقية وملف أعمال.
        </p>
      </section>

      <section className="section two">
        <div className="panel">
          <h3>حصة كل دور بين المطورين</h3>
          <p className="muted sm">النسبة من 43,560 مشاركاً · <Src id="so25" /></p>
          <Bars rows={ROLES.map(([l, v]) => [l, v, `${v}%`])} />
        </div>
        <div className="panel">
          <h3>النمو المتوقع للتوظيف حتى 2035</h3>
          <p className="muted sm">متوسط مهن الحاسوب 5.7% · <Src id="bls" /></p>
          <Bars rows={GROWTH.map(([l, v]) => [l, v, `${v > 0 ? '+' : ''}${v}%`])} />
        </div>
      </section>

      <section className="section two">
        <div className="panel">
          <h3>الإعلانات المرتبطة بفلسطين حسب المهنة</h3>
          <p className="muted sm">56,697 إعلاناً بين 2019 و2025 · <Src id="etf" /></p>
          <Bars rows={ETF_JOBS} />
        </div>
        <div className="panel">
          <h3>المهارات المطلوبة في العينة نفسها</h3>
          <p className="muted sm">عدد الإعلانات التي تذكر المهارة · <Src id="etf" /></p>
          <Bars rows={ETF_SKILLS} />
        </div>
      </section>

      <section className="section two">
        <div className="panel">
          <h3>التقنيات الأكثر استخداماً</h3>
          <p className="muted sm">نسبة المستخدمين 2026 · <Src id="so26" /></p>
          <Bars rows={TECH.map(([l, v]) => [l, v, `${v}%`])} />
        </div>
        <div className="panel">
          <h3>مهارات الذكاء الاصطناعي الصاعدة</h3>
          <p className="muted sm">إعلانات أمريكية 2025 والنمو عن 2024 · <Src id="ai" /></p>
          <Bars rows={AI_SKILLS.map(([l, v, g]) => [l, v, `${fmt(v)} (${g})`])} highlight={4} />
        </div>
      </section>

      <section className="section">
        <h2>قاعدة اختيار المسارات</h2>
        <p className="muted">أربعة مؤشرات، لكل منها 0–2 نقطة. 6–8 أولوية عالية جداً، 4–5 عالية، 2–3 متوسطة، و0–1 لا يُطرح مساراً مستقلاً.</p>
        <div className="table-wrap">
          <table className="stack">
            <thead><tr><th>المؤشر</th><th>نقطتان</th><th>نقطة</th><th>صفر</th></tr></thead>
            <tbody>{SCORING.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i} data-label={['المؤشر', 'نقطتان', 'نقطة', 'صفر'][i]}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="table-wrap">
          <table className="stack">
            <thead><tr><th>المسار</th><th>الحصة</th><th>الفرص السنوية</th><th>النمو</th><th>محلي</th><th>المجموع</th><th>مهنة القياس</th></tr></thead>
            <tbody>
              {paths.map(p => (
                <tr key={p.id}>
                  <td data-label="المسار"><a href={`#/paths/${p.id}`} dir="ltr">{p.en}</a></td>
                  <td data-label="الحصة" dir="ltr">{p.stats.so == null ? '—' : `${p.stats.so}%`} ({p.score.s})</td>
                  <td data-label="الفرص السنوية" dir="ltr">{fmt(p.stats.open == null ? null : p.stats.open * 1000)} ({p.score.o})</td>
                  <td data-label="النمو" dir="ltr">{p.stats.growth}% ({p.score.g})</td>
                  <td data-label="محلي">{p.score.l}</td>
                  <td data-label="المجموع"><b>{p.score.total}</b></td>
                  <td data-label="مهنة القياس" dir="ltr" className="sm">{p.stats.map}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="muted sm">لا يفصل BLS بين تخصصات البرمجة، فتشترك عدة مسارات في رقم Software developers، وهذا يرفع درجات Mobile وAI وArchitect.</p>
        <h3>مجالات لم تصل إلى حد المسار المستقل</h3>
        <div className="chips-list">
          {excluded.map(e => (
            <div key={e.en} className="mini">
              <b>{e.ar}</b> <span className="muted sm">({e.score} من 8)</span>
              <div className="sm muted">{e.alt}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
