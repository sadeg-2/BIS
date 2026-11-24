import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Market from './pages/Market'
import Paths from './pages/Paths'
import PathDetail from './pages/PathDetail'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import AiPage from './pages/AiPage'
import Method from './pages/Method'
import Present from './pages/Present'
import Workshops from './pages/Workshops'

const YEAR = new Date().getFullYear()

const NAV = [
  ['', 'الرئيسية'],
  ['market', 'سوق العمل'],
  ['paths', 'المسارات المهنية'],
  ['courses', 'المواد المستقلة'],
  ['workshops', 'الورشات'],
  ['ai', 'AI في التعلم'],
  ['method', 'المنهجية والمصادر'],
]

const readRoute = () => window.location.hash.replace(/^#\/?/, '').split('/')

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light' } catch { return 'light' }
  })
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    const onResize = () => { if (window.innerWidth > 1180) setMenu(false) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const on = () => { setRoute(readRoute()); setMenu(false); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])

  const [page, id] = route
  if (page === 'present') return <Present key={id || 0} start={Number(id) || 0} />

  let view
  if (page === 'market') view = <Market />
  else if (page === 'paths' && id) view = <PathDetail id={id} />
  else if (page === 'paths') view = <Paths />
  else if (page === 'courses' && id) view = <CourseDetail n={Number(id)} />
  else if (page === 'courses') view = <Courses />
  else if (page === 'ai') view = <AiPage />
  else if (page === 'workshops') view = <Workshops />
  else if (page === 'method') view = <Method />
  else view = <Home />

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''} ${menu ? 'menu-open' : ''}`}>
        <div className="hdr">
          <a href="#/" className="hdr-brand">
            <img src="./bis-logo.png" alt="شعار المدرسة البريطانية الدولية – غزة" />
            <span>
              <b>البرنامج التقني</b>
              <small>المدرسة البريطانية الدولية – غزة</small>
            </span>
          </a>
          <nav className="hdr-nav" aria-label="القائمة الرئيسية">
            {NAV.map(([k, label]) => (
              <a key={k} href={`#/${k}`} className={(page || '') === k ? 'active' : ''}>{label}</a>
            ))}
          </nav>
          <div className="hdr-actions">
            <button className="hdr-icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="تبديل الوضع الليلي">
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <a href="#/present" className="hdr-cta"><span aria-hidden="true">▶</span><span className="hdr-cta-label">العرض التقديمي</span></a>
            <button className="hdr-icon hdr-burger" onClick={() => setMenu(!menu)} aria-label="القائمة" aria-expanded={menu}>
              <i /><i /><i />
            </button>
          </div>
        </div>
        <nav className="hdr-drawer" aria-label="القائمة">
          {NAV.map(([k, label]) => (
            <a key={k} href={`#/${k}`} className={(page || '') === k ? 'active' : ''}>{label}</a>
          ))}
        </nav>
      </header>
      {menu && <div className="hdr-backdrop" onClick={() => setMenu(false)} />}
      <main className="main">{view}</main>
      <footer className="footer">
        <div className="footer-in">
          <div className="footer-brand">
            <img src="./bis-logo.png" alt="" />
            <div>
              <b>المدرسة البريطانية الدولية – غزة</b>
              <span dir="ltr">British International School, Gaza · American High School Track</span>
            </div>
          </div>
          <div className="footer-author">
            <span>إعداد وتصميم</span>
            <b>المهندس صادق مجدي عاشور</b>
            <span>© {YEAR} جميع الحقوق محفوظة</span>
          </div>
          <nav className="footer-links">
            <a href="#/paths">المسارات</a>
            <a href="#/courses">المواد</a>
            <a href="#/workshops">الورشات</a>
            <a href="#/method">المنهجية والمصادر</a>
          </nav>
        </div>
      </footer>
    </>
  )
}
