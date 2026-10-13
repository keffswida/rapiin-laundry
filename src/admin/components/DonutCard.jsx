import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { EXPENSE_BREAKDOWN, EXPENSE_NOTE, EXPENSE_RATIO, EXPENSE_TOTAL } from '../data/ringkasan'

/** Donut rincian pengeluaran — daftar kategori di kanan/bawah. */
export default function DonutCard({ data = EXPENSE_BREAKDOWN, className = '' }) {
  const canRender = data.length > 0 && typeof window !== 'undefined'

  return (
    <section className={`adm-card p-4 sm:p-5 ${className}`}>
      <h2 className="text-sm font-semibold tracking-tight text-ink-900">Rincian pengeluaran</h2>
      <p className="mt-0.5 text-xs text-ink-400">Alokasi biaya · September 2026</p>

      <div className="mt-4 flex items-center gap-5">
        <div
          className="relative h-32 w-32 shrink-0"
          role="img"
          aria-label={`Donut total biaya ${EXPENSE_TOTAL}, komposisi per kategori`}
        >
          {canRender ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="percent"
                  nameKey="label"
                  innerRadius={48}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {data.map((row) => (
                    <Cell key={row.id} fill={row.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${String(value).replace('.', ',')}%`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full rounded-full bg-ink-100" />
          )}
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="num text-sm font-semibold text-ink-900">100%</span>
            <span className="text-[10px] text-ink-400">total biaya</span>
          </span>
        </div>

        <div>
          <p className="text-xs font-medium text-ink-400">Total pengeluaran</p>
          <p className="num mt-0.5 text-lg font-semibold tracking-tight text-ink-900">
            {EXPENSE_TOTAL}
          </p>
          <p className="mt-0.5 text-xs text-ink-400">{EXPENSE_RATIO}</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {data.map((row) => (
          <li key={row.id} className="flex items-center gap-2.5 text-[13px]">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: row.color }}
            />
            <span className="font-medium text-ink-700">{row.label}</span>
            <span className="num ml-auto font-medium text-ink-900">{row.amount}</span>
            <span className="num w-11 text-right text-xs text-ink-400">
              {row.percent.toFixed(1).replace('.', ',')}%
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-md bg-ink-50 px-3 py-2 text-xs text-ink-500">{EXPENSE_NOTE}</p>
    </section>
  )
}
