import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Booking from './pages/Booking'
import BookingSuccess from './pages/BookingSuccess'
import NotFound from './pages/NotFound'
import Legal from './pages/Legal'

/** Admin di-chunk terpisah (recharts tidak ikut bundle landing). */
const AdminRoutes = lazy(() => import('./admin/routes'))

/** Scroll: hash -> target, selain itu ke atas. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const target = document.getElementById(hash.slice(1))
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo(0, 0)
      }, 50)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}

const BRAND = 'Rapi-In Laundry'

const TITLES = {
  '/': `${BRAND} — Cucian beres, hidup santai`,
  '/booking': `Jadwalkan jemput — ${BRAND}`,
  '/privasi': `Kebijakan privasi — ${BRAND}`,
  '/syarat': `Syarat layanan — ${BRAND}`,
  '/admin/login': `Masuk admin — ${BRAND}`,
  '/admin': `Ringkasan — Panel admin ${BRAND}`,
}

function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const success = `${BRAND} — Jadwal terkirim!`
    document.title = pathname.startsWith('/berhasil')
      ? success
      : (TITLES[pathname] ?? `Halaman tidak ketemu — ${BRAND}`)
  }, [pathname])

  return null
}

export default function App() {
  const { pathname } = useLocation()

  if (pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={null}>
        <AdminRoutes />
        <ScrollManager />
        <RouteMeta />
      </Suspense>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten
      </a>

      <Header />

      <main id="konten" className="flex-1">
        <div key={pathname} className="animate-fade-up">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/berhasil/:code?" element={<BookingSuccess />} />
            <Route path="/privasi" element={<Legal kind="privacy" />} />
            <Route path="/syarat" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      <Footer />
      <ScrollManager />
      <RouteMeta />
    </div>
  )
}
