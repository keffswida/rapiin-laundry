import { NavLink } from 'react-router-dom'
import {
  IconBag,
  IconChevronDown,
  IconGrid,
  IconHelp,
  IconLogout,
  IconReceipt,
  IconSettings,
  IconStore,
  IconTrend,
  IconUsers,
  IconWallet,
  LogoMark,
} from '../../components/ui/Icons'
import { clearAuthenticated } from '../auth'

const NAV = [
  { to: '/admin', label: 'Ringkasan', icon: IconGrid, end: true },
  { to: '/admin/pesanan', label: 'Pesanan', icon: IconBag, badge: '12' },
  { to: '/admin/pelanggan', label: 'Pelanggan', icon: IconUsers },
  { to: '/admin/layanan', label: 'Layanan & harga', icon: IconTrend },
  { to: '/admin/pemasukan', label: 'Pemasukan', icon: IconWallet },
  { to: '/admin/pengeluaran', label: 'Pengeluaran', icon: IconReceipt },
  { to: '/admin/laporan', label: 'Laporan', icon: IconTrend },
]

/**
 * Isi sidebar (logo, switcher outlet, nav, bantuan, keluar).
 * `onNavigate` dipanggil setelah klik link — dipakai drawer mobile.
 */
export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-14 items-center gap-2.5 border-b border-ink-100 px-4">
        <LogoMark className="h-7 w-7 rounded-md" />
        <div className="leading-tight">
          <p className="text-[13px] font-semibold text-ink-900">Rapi-In</p>
          <p className="text-[11px] text-ink-400">Panel admin</p>
        </div>
      </div>

      <button
        type="button"
        className="mx-3 mt-3 flex items-center gap-2 rounded-md border border-ink-200 px-2.5 py-2 text-left transition hover:border-brand-300"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-brand-600 text-white">
          <IconStore className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-xs font-medium text-ink-800">Outlet Utama</span>
          <span className="block text-[11px] text-ink-400">Jl. Melati No.12</span>
        </span>
        <IconChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-400" />
      </button>

      <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4" aria-label="Navigasi admin">
        <ul className="flex flex-col gap-0.5">
          {NAV.map(({ to, label, icon: Icon, end, badge }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {badge && (
                  <span className="num ml-auto rounded bg-brand-600 px-1.5 py-px text-[11px] font-medium text-white">
                    {badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <p className="mt-5 px-2.5 text-[11px] font-medium tracking-wide text-ink-400 uppercase">
          Pengaturan
        </p>
        <ul className="mt-1 flex flex-col gap-0.5">
          <li>
            <NavLink
              to="/admin/pengaturan"
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`
              }
            >
              <IconSettings className="h-4 w-4 shrink-0" />
              Pengaturan
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="border-t border-ink-100 p-3">
        <div className="rounded-md bg-brand-50 p-3">
          <IconHelp className="h-4 w-4 text-brand-600" />
          <p className="mt-1.5 text-xs font-semibold text-brand-900">Butuh bantuan?</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-brand-800/80">
            Hubungi tim dukungan Rapi-In untuk kendala operasional outlet.
          </p>
          <a href="#" className="mt-1.5 inline-block text-[11px] font-medium text-brand-700 underline">
            Hubungi dukungan →
          </a>
        </div>
        <NavLink
          to="/admin/login"
          onClick={() => {
            clearAuthenticated()
            onNavigate?.()
          }}
          className="mt-2 flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium text-ink-600 transition hover:bg-ink-50 hover:text-ink-900"
        >
          <IconLogout className="h-4 w-4" />
          Keluar
        </NavLink>
      </div>
    </div>
  )
}
