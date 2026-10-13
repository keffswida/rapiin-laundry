import { useLocation } from 'react-router-dom'
import { IconBell, IconChevronRight, IconMenu, IconStore } from '../../components/ui/Icons'

const TITLES = {
  '/admin': 'Ringkasan',
  '/admin/pesanan': 'Pesanan',
  '/admin/pelanggan': 'Pelanggan',
  '/admin/layanan': 'Layanan & harga',
  '/admin/pemasukan': 'Pemasukan',
  '/admin/pengeluaran': 'Pengeluaran',
  '/admin/laporan': 'Laporan',
  '/admin/pengaturan': 'Pengaturan',
}

/** Topbar: hamburger (mobile), breadcrumb, badge mode ilustrasi, bell, avatar. */
export default function Topbar({ onOpenMenu }) {
  const { pathname } = useLocation()
  const title = TITLES[pathname] ?? 'Halaman'

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-ink-100 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Buka menu navigasi"
        className="rounded-md p-1.5 text-ink-600 transition hover:bg-ink-50 lg:hidden"
      >
        <IconMenu className="h-4.5 w-4.5" />
      </button>

      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-50 text-brand-600 lg:hidden">
        <IconStore className="h-4 w-4" />
      </span>

      <nav aria-label="Breadcrumb" className="hidden items-center gap-1.5 text-sm sm:flex">
        <span className="font-normal text-ink-400">Panel admin</span>
        <IconChevronRight className="h-3 w-3 text-ink-300" />
        <span className="font-medium text-ink-900">{title}</span>
      </nav>
      <p className="truncate text-sm font-medium text-ink-900 sm:hidden">{title}</p>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden rounded border border-ink-200 px-2 py-0.5 text-[10px] font-medium tracking-wide text-ink-500 uppercase md:inline">
          Mode ilustrasi
        </span>
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative rounded-md p-1.5 text-ink-500 transition hover:bg-ink-50 hover:text-ink-800"
        >
          <IconBell className="h-4.5 w-4.5" />
          <span
            aria-hidden="true"
            className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-brand-600"
          />
        </button>
        <span aria-hidden="true" className="hidden h-6 w-px bg-ink-100 sm:block" />
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-[11px] font-medium text-white">
            AP
          </span>
          <div className="hidden leading-tight md:block">
            <p className="text-xs font-medium text-ink-900">Andi Pratama</p>
            <p className="text-[11px] text-ink-400">Pemilik usaha</p>
          </div>
        </div>
      </div>
    </header>
  )
}
