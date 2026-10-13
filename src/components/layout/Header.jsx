import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconArrowUpRight, IconClose, IconMenu } from '../ui/Icons'
import Brand from './Brand'

const NAV = [
  { label: 'Layanan', hash: 'layanan' },
  { label: 'Harga', hash: 'harga' },
  { label: 'Cara kerja', hash: 'cara-kerja' },
  { label: 'Testimoni', hash: 'testimoni' },
  { label: 'FAQ', hash: 'faq' },
]

function useBodyLock(active) {
  useEffect(() => {
    if (!active) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [active])
}

export default function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const wasOpen = useRef(false)

  useBodyLock(open)

  // Tutup menu saat pindah halaman (penyesuaian state saat render)
  const locationKey = `${location.pathname}${location.hash}`
  const [prevLocationKey, setPrevLocationKey] = useState(locationKey)
  if (prevLocationKey !== locationKey) {
    setPrevLocationKey(locationKey)
    if (open) setOpen(false)
  }

  // Header: garis + bayangan muncul setelah scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Penanda section aktif (hanya relevan di beranda)
  useEffect(() => {
    const nodes = NAV.map((item) => document.getElementById(item.hash)).filter(Boolean)
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [location.pathname])

  // ESC menutup + fokus kembali ke tombol
  useEffect(() => {
    if (!open) return undefined
    wasOpen.current = true
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a, button')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open && wasOpen.current) {
      wasOpen.current = false
      toggleRef.current?.focus()
    }
  }, [open])

  // Jebak Tab di dalam panel menu
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'border-b border-ink-100 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.45)]' : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-4">
          <Link to="/" aria-label="Rapi-In Laundry" className="group shrink-0">
            <Brand />
          </Link>

          <nav aria-label="Utama" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const isActive = active === item.hash && location.pathname === '/'
              return (
                <Link
                  key={item.hash}
                  to={`/#${item.hash}`}
                  className={`group/nav relative rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                    isActive ? 'text-brand-700' : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0.5 left-3.5 right-3.5 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/booking"
              className="btn-primary hidden px-5 py-3 text-[13px] sm:inline-flex"
            >
              Jadwal jemput sekarang
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-800 transition hover:border-brand-300 hover:text-brand-700 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
              <span className="relative block h-6 w-6">
                <IconMenu
                  className={`absolute inset-0 h-6 w-6 transition duration-300 ${
                    open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
                <IconClose
                  className={`absolute inset-0 h-6 w-6 transition duration-300 ${
                    open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-white px-5 pt-5 pb-8 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Brand />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200"
            >
              <span className="sr-only">Tutup menu</span>
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Menu" className="mt-10 flex flex-col gap-1">
            {NAV.map((item, index) => (
              <Link
                key={item.hash}
                to={`/#${item.hash}`}
                style={{ animationDelay: `${60 + index * 45}ms` }}
                className="animate-fade-up rounded-xl px-2 py-3 text-2xl font-extrabold tracking-tight text-ink-900 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4">
            <p className="text-xs font-semibold text-ink-400">
              Buka setiap hari 06.00–21.00
            </p>
            <Link to="/booking" className="btn-primary w-full py-4 text-base">
              Jadwal jemput sekarang
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
