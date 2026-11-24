import { PageHead } from '../components/ui'
import { SOURCES, LIMITS, KPIS } from '../data/market'

const SURVEY = [
  'كم موظفاً تقنياً لديكم في كل مسار من المسارات الأربعة عشر؟',
  'كم تتوقعون أن توظفوا في كل مسار خلال 12 شهراً؟ وكم منهم دون خبرة؟',
  'ما أول ثلاث مهارات تنقص المتقدمين؟',
  'ما التقنيات المستخدمة لديكم في Backend وFrontend والبيانات؟',
  'ما نطاق راتب المبتدئ في كل مسار؟',
  'هل تشترطون شهادة احترافية أم يكفي المشروع والاختبار العملي؟',
  'هل تقدمون مشروع تخرج أو تستضيفون متدرباً؟',
]

export default function Method() {
  return (
    <>
      <PageHead kicker="الشفافية" title="المنهجية والمصادر" lead="الأرقام تدعم ترتيب الأولويات، ولا تضمن توظيف خريج مسار معين." />
      <section className="section two">
        <div className="panel">
          <h3>حدود البحث</h3>
          <ul className="uses">{LIMITS.map(l => <li key={l}>{l}</li>)}</ul>
        </div>
        <div className="panel">
          <h3>مؤشرات القياس المقترحة</h3>
          <table><tbody>{KPIS.map(([k, v]) => <tr key={k}><td>{k}</td><td><b dir="ltr">{v}</b></td></tr>)}</tbody></table>
        </div>
      </section>
      <section className="section two">
        <div className="panel">
          <h3>أسئلة اختيارية لجهات العمل</h3>
          <p className="muted sm">ليست شرطاً للإطلاق. يمكن طرحها على الجهات الشريكة لاحقاً لتحسين المناهج.</p>
          <ol className="outcomes">{SURVEY.map(s => <li key={s}>{s}</li>)}</ol>
        </div>
        <div className="panel">
          <h3>المصادر</h3>
          <ul className="sources">
            {Object.values(SOURCES).map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer" dir="ltr">{s.name}</a></li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
