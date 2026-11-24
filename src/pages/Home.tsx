import { paths, courses, AI_MODES, meta } from '../lib'
import { HEADLINES, WAVES } from '../data/market'
import { WORKSHOPS } from '../data/workshops'
import { Stat, AiLegend } from '../components/ui'
import { StudyScene, LogoMarquee, Tech } from '../components/visual'
import { CoreMap, PathCard } from './Paths'

const VALUES = [
  { icon: 'target', title: 'مبني على سوق العمل', text: 'كل مسار اختير بأربعة مؤشرات معلنة المصدر: حجم الطلب، وفرص العمل، والنمو، والطلب في المنطقة.' },
  { icon: 'rocket', title: 'مشاريع حقيقية', text: 'كل طالب يتخرج بمشروع منشور لجهة حقيقية وملف أعمال يثبت مهارته أمام أي جهة توظيف.' },
  { icon: 'ai', title: 'الذكاء الاصطناعي بذكاء', text: 'يتعلم الطالب الأساس بنفسه أولاً، ثم يستخدم AI معلّماً ومساعداً وشريكاً في المشاريع.' },
  { icon: 'people', title: 'أساس مشترك', text: 'أساس واحد يدرسه الطلاب معاً، ثم يتفرع كل طالب إلى المسار الذي يناسب اهتمامه.' },
]

export default function Home() {
  const wave1 = paths.filter(p => p.wave === 1)
  const courseHours = courses.reduce((a, c) => a + c.hours, 0)
  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-grid">
          <div>
            <div className="hero-badge"><img src="./bis-logo.png" alt="" />المدرسة البريطانية الدولية – غزة</div>
            <h1>مسارات تقنية مبنية على <span className="grad">أرقام سوق العمل</span>، وليس على الشهادات فقط</h1>
            <p className="lead">
              14 مساراً مهنياً، و44 مادة مستقلة، و{WORKSHOPS.length} ورشات في الذكاء الاصطناعي وريادة المشاريع. خطة أسبوعية واضحة، ومشروع حقيقي في نهاية كل مسار.
            </p>
            <div className="hero-actions">
              <a href="#/present" className="btn primary">▶ ابدأ العرض التقديمي</a>
              <a href="#/paths" className="btn ghost">استكشف المسارات</a>
            </div>
          </div>
          <StudyScene />
        </div>
        <div className="kpis">
          <div><b>{paths.length}</b><span>مساراً مهنياً في 4 مجالات</span></div>
          <div><b>{courses.length}</b><span>مادة مستقلة · {courseHours.toLocaleString('en-US')} ساعة</span></div>
          <div><b>{WORKSHOPS.length}</b><span>ورشات AI وريادة مشاريع</span></div>
          <div><b>{meta.pathHpw}</b><span>ساعات تدريب أسبوعياً في المسار</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>تقنيات يتعلمها طلابنا</h2>
          <p>الأدوات نفسها التي تستخدمها الشركات اليوم، من لغات البرمجة إلى السحابة والذكاء الاصطناعي.</p>
        </div>
        <LogoMarquee />
      </section>

      <section className="section">
        <div className="values">
          {VALUES.map(v => (
            <div key={v.title} className="value">
              <Tech id={v.icon} size={52} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>ما الذي تقوله الأرقام؟</h2>
          <p>أرقام من مصادر دولية ومحلية، ولكل رقم رابط مصدره.</p>
        </div>
        <div className="grid4">{HEADLINES.map(h => <Stat key={h.label} {...h} />)}</div>
      </section>

      <section className="section">
        <div className="sec-head">
          <h2>الموجة الأولى: خمسة مسارات للإطلاق</h2>
          <a href="#/paths" className="link">كل المسارات ←</a>
        </div>
        <div className="grid-cards">{wave1.map((p, i) => <PathCard key={p.id} p={p} i={i} detail={false} />)}</div>
      </section>

      <section className="section">
        <div className="sec-head">
          <h2>أساس مشترك ثم تخصص</h2>
          <a href="#/paths" className="link">تفاصيل البنية ←</a>
        </div>
        <CoreMap compact />
      </section>

      <section className="section">
        <div className="sec-head">
          <h2>ورشات الذكاء الاصطناعي والمشاريع</h2>
          <a href="#/workshops" className="link">كل الورشات وبنك الأفكار ←</a>
        </div>
        <div className="ws-grid">
          {WORKSHOPS.slice(0, 4).map(w => (
            <a key={w.id} href="#/workshops" className="ws-card">
              <div className="ws-top"><span className="ws-hours">{w.hours} س</span></div>
              <h3>{w.title}</h3>
              <div className="muted sm">{w.output}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>الذكاء الاصطناعي داخل كل مادة</h2>
          <p className="muted">
            لكل أسبوع في كل مادة ومسار وضع محدد لاستخدام AI: يبدأ الطالب بإتقان المهارة بنفسه، ثم يستخدم AI معلّماً، ثم مساعداً، ثم شريكاً في مرحلة المشاريع. والامتحانات دون AI.
          </p>
          <AiLegend />
          <a href="#/ai" className="btn ghost" style={{ marginTop: 16 }}>تفاصيل سياسة AI</a>
        </div>
        <div className="mode-stack">
          {AI_MODES.map(m => (
            <div key={m.id} className="mode" style={{ '--c': m.color }}>
              <b>{m.name}</b><span>{m.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>خطة الإطلاق خلال 24 شهراً</h2>
        <div className="timeline">
          {WAVES.map(w => (
            <div key={w.name} className="tl-item">
              <div className="tl-dot" />
              <div className="tl-months">الأشهر {w.months}</div>
              <h3>{w.name}</h3>
              <p>{w.wave ? paths.filter(p => p.wave === w.wave).map(p => p.ar).join('، ') : w.items}{w.extra ? `، ${w.extra}` : ''}</p>
              <div className="tl-gate">شرط الانتقال: {w.gate}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <h2>جاهزون لإطلاق الدفعة الأولى</h2>
          <p>خمسة مسارات، وأربع مواد، وورشتا AI، بخطة أسبوعية جاهزة للتدريس.</p>
        </div>
        <a href="#/present" className="btn">▶ شاهد العرض الكامل</a>
      </section>
    </>
  )
}
