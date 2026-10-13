/** Baris label + progress + nilai kanan. */
export default function ProgressRow({ label, right, percent, tone = 'brand' }) {
  const fill = tone === 'amber' ? 'bg-[#dd9a4d]' : 'bg-brand-600'

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[13px]">
        <span className="font-medium text-ink-800">{label}</span>
        <span className="num text-xs text-ink-400">{right}</span>
      </div>
      <div
        role="img"
        aria-label={`${label}: ${right}`}
        className="mt-1.5 h-1.5 rounded-full bg-ink-100"
      >
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
