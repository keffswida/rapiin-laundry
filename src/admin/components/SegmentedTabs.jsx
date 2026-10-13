import { useState } from 'react'

/** Segmented control (Hari/Minggu/Bulan/Tahun). `value`+`onChange` = controlled. */
export default function SegmentedTabs({ items = ['Hari', 'Minggu', 'Bulan', 'Tahun'], initial = 'Minggu', value, onChange }) {
  const [inner, setInner] = useState(initial)
  const active = value ?? inner

  const select = (item) => {
    setInner(item)
    onChange?.(item)
  }

  return (
    <div
      role="tablist"
      aria-label="Pengelompokan periode"
      className="inline-flex items-center gap-0.5 rounded-md border border-ink-200 bg-ink-50 p-0.5"
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          role="tab"
          aria-selected={active === item}
          onClick={() => select(item)}
          className={`h-7 rounded px-2.5 text-xs font-medium transition ${
            active === item
              ? 'bg-brand-700 text-white'
              : 'text-ink-500 hover:text-ink-800'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
