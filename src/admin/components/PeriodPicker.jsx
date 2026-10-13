import { IconCalendar, IconChevronDown } from '../../components/ui/Icons'

/** Pemilih periode — tampilan saja (tabel statis sesuai figma). */
export default function PeriodPicker({ label = '1–30 September 2026' }) {
  return (
    <button
      type="button"
      className="adm-btn-outline"
    >
      <IconCalendar className="h-4 w-4 text-ink-400" />
      {label}
      <IconChevronDown className="h-3.5 w-3.5 text-ink-400" />
    </button>
  )
}
