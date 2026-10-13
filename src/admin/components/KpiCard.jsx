import { Link } from 'react-router-dom'
import {
  IconArrowUpRight,
  IconBag,
  IconTrend,
  IconUsers,
  IconArrowDownLeft,
  IconUserPlus,
  IconRefresh,
  IconShirt,
  IconPause,
  IconStar,
  IconCheckCircle,
  IconWallet,
  IconClock,
  IconLink,
} from '../../components/ui/Icons'

const ICONS = {
  income: IconArrowDownLeft,
  expense: IconArrowUpRight,
  trend: IconTrend,
  orders: IconBag,
  customers: IconUsers,
  userPlus: IconUserPlus,
  refresh: IconRefresh,
  shirt: IconShirt,
  pause: IconPause,
  star: IconStar,
  check: IconCheckCircle,
  wallet: IconWallet,
  clock: IconClock,
  link: IconLink,
}

/**
 * Kartu KPI. `highlight` = kartu biru solid (angka & teks putih).
 * Mode: `onClick` → tombol (filter), `to` → link rute, selain itu div statis.
 * Semua mode `cursor-pointer`.
 */
export default function KpiCard({ label, value, hint, icon, highlight = false, to, onClick, active = false }) {
  const Icon = ICONS[icon] ?? IconTrend

  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className={`text-xs font-medium ${highlight ? 'text-white/80' : 'text-ink-500'}`}>
          {label}
        </p>
        <Icon
          className={`h-4 w-4 shrink-0 ${highlight ? 'text-white/70' : 'text-ink-300'}`}
          strokeWidth={2}
        />
      </div>
      <p
        className={`num mt-1.5 text-xl font-semibold tracking-tight ${
          highlight ? 'text-white' : 'text-ink-900'
        }`}
      >
        {value}
      </p>
      <p className={`mt-1 text-xs ${highlight ? 'text-white/70' : 'text-ink-400'}`}>{hint}</p>
    </>
  )

  const baseClass = `block cursor-pointer rounded-lg border p-4 text-left transition ${
    highlight
      ? 'border-brand-700 bg-brand-700 text-white hover:border-brand-800 hover:bg-brand-800'
      : active
        ? 'border-brand-400 bg-brand-50 text-ink-900'
        : 'border-ink-200 bg-white text-ink-900 hover:border-brand-400'
  }`

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`w-full ${baseClass}`}
      >
        {body}
      </button>
    )
  }

  if (to) {
    return (
      <Link to={to} className={baseClass} aria-label={`${label} — lihat menu ${label}`}>
        {body}
      </Link>
    )
  }

  return <div className={baseClass}>{body}</div>
}
