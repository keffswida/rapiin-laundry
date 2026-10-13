import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { IconClose } from '../components/ui/Icons'
import { clearAuthenticated, isAuthenticated } from './auth'

/** Guard: belum login → redirect /admin/login. */
export function AdminGate() {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}

/** Shell admin: sidebar (drawer di mobile) + topbar + footer bar ilustrasi. */
export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="min-h-screen bg-surface">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Lewati ke konten
      </a>

      {/* Sidebar permanen ≥lg */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-ink-100 lg:block">
        <Sidebar />
      </aside>

      {/* Drawer mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-ink-950/50"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi admin"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-xl"
          >
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-3 z-10 rounded-lg p-2 text-ink-500 hover:bg-ink-50"
            >
              <IconClose />
            </button>
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <Topbar onOpenMenu={() => setMenuOpen(true)} />
        <main id="konten" className="px-4 py-5 sm:px-6">
          <Outlet />
        </main>
        <footer className="flex flex-col gap-1 border-t border-ink-100 px-4 py-3 text-xs font-medium text-ink-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Basis kas · 1.248 transaksi dicatat pada periode ini</span>
          <span className="text-ink-300">Data ilustrasi untuk desain · Bukan data aktual</span>
        </footer>
      </div>

      <button
        type="button"
        onClick={() => {
          clearAuthenticated()
          navigate('/admin/login')
        }}
        className="sr-only"
      >
        Keluar dari panel admin
      </button>
    </div>
  )
}
