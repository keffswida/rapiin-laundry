const STYLES = {
  lunas: 'bg-emerald-50 text-emerald-700',
  dibayar: 'bg-emerald-50 text-emerald-700',
  'belum-lunas': 'bg-amber-50 text-amber-700',
  baru: 'bg-brand-50 text-brand-700',
  diproses: 'bg-blue-100 text-blue-700',
  'siap-diambil': 'bg-violet-100 text-violet-700',
  selesai: 'bg-emerald-100 text-emerald-800',
  aktif: 'bg-emerald-50 text-emerald-700',
  kembali: 'bg-emerald-50 text-emerald-700',
  nonaktif: 'bg-ink-100 text-ink-500',
}

/** Badge status — teks selalu terbaca, bukan warna saja. */
export default function StatusBadge({ status, className = '' }) {
  const key = String(status).toLowerCase().replaceAll(' ', '-')
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${
        STYLES[key] ?? 'bg-ink-100 text-ink-600'
      } ${className}`}
    >
      {status}
    </span>
  )
}
