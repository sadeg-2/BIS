import { courses, AI_MODES, POLICIES } from '../lib'
import { AI_USE } from '../data/market'
import { PageHead, Stat, AiStrip } from '../components/ui'
import type { AiPolicy } from '../types'

const RULES = [
  'الإفصاح: يذكر الطالب في كل تسليم أين استخدم AI وكيف تحقق من مخرجاته.',
  'الفهم قبل التسليم: يُسأل الطالب شفهياً عن أي سطر سلّمه، ومن لا يشرحه لا يحصل على علامته.',
  'التحقق: كل كود مولّد يمر باختبارات يكتبها الطالب أو يراجعها.',
  'الخصوصية: لا تُرسل بيانات الجهات الحقيقية أو بيانات شخصية إلى أدوات AI دون موافقة.',
  'الامتحانات واختبارات المستويات والمناقشة النهائية دون AI.',
]

export default function AiPage() {
  const byPolicy = (Object.keys(POLICIES) as AiPolicy[]).map(k => ({ k, ...POLICIES[k], list: courses.filter(c => c.ai.policy === k) }))
  return (
    <>
      <PageHead
        kicker="لمسة مضافة"
        title="الذكاء الاصطناعي في التعلم"
        lead="القاعدة: الطالب يتقن المهارة بنفسه أولاً، ثم يستخدم AI ليتعلم أسرع، ثم ليعمل أسرع. لكل أسبوع في كل مادة ومسار وضع محدد من أربعة أوضاع."
      />
      <section className="section">
        <div className="grid4">{AI_USE.map(s => <Stat key={s.label} {...s} />)}</div>
        <p className="callout">
          السوق يستخدم AI بكثافة، لكن الوظائف المبتدئة تتقلص. الخريج المطلوب هو من يتقن الأساس ويستخدم AI بإشراف وتحقق، وليس من يعتمد عليه دون فهم.
        </p>
      </section>

      <section className="section">
        <h2>الأوضاع الأربعة</h2>
        <div className="grid4">
          {AI_MODES.map(m => (
            <div key={m.id} className="mode-card" style={{ '--c': m.color }}>
              <div className="mode-n">{m.id}</div>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>متى يُستخدم في كل نوع من المواد؟</h2>
        <div className="policy-list">
          {byPolicy.map(p => (
            <div key={p.k} className="panel policy">
              <div className="policy-h">
                <h3>{p.name}</h3>
                <span className="muted sm">{p.list.length} مادة</span>
              </div>
              <p><b>الخطة:</b> {p.plan}</p>
              <p className="muted"><b>السبب:</b> {p.why}</p>
              <div className="policy-courses">
                {p.list.map(c => (
                  <a key={c.n} href={`#/courses/${c.n}`} className="pc-row">
                    <span className="num">{c.n}</span>
                    <span dir="ltr" className="pc-name">{c.en}</span>
                    <AiStrip weeks={c.weeks} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section two">
        <div className="panel">
          <h3>في المسارات المهنية</h3>
          <ol className="outcomes">
            <li><b>التأسيسي والمبتدئ:</b> معلّم فقط.</li>
            <li><b>المتوسط:</b> مساعد للمراجعة والاختبار والتشخيص.</li>
            <li><b>المتقدم والاحترافي:</b> شريك، مع وحدة مخصصة للتطوير بوكلاء البرمجة.</li>
            <li><b>مشروع التخرج:</b> شريك مع إفصاح كامل، والمناقشة دون AI.</li>
          </ol>
        </div>
        <div className="panel">
          <h3>قواعد ثابتة في كل المواد</h3>
          <ul className="uses">{RULES.map(r => <li key={r}>{r}</li>)}</ul>
        </div>
      </section>
      <p className="muted sm">هذه السياسة توصية تربوية من معدّ التقرير، مبنية على الأرقام أعلاه وعلى مبدأ إتقان المهارة قبل أتمتتها. يُنصح بتجربتها مع الدفعة الأولى وتعديلها.</p>
    </>
  )
}
