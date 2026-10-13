import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import SegmentedTabs from './SegmentedTabs'
import { WEEKLY_SERIES } from '../data/ringkasan'

export const COLOR_INCOME = '#2051e7'
export const COLOR_EXPENSE = '#dd9a4d'

function formatJuta(value) {
  return value.toFixed(1).replace('.', ',')
}

const axisTick = { fill: '#8892a6', fontSize: 11, fontWeight: 500 }

/**
 * Kartu bar chart pemasukan & pengeluaran (juta rupiah per minggu).
 * `series` kosong → render placeholder (aman untuk SSR/test).
 */
export default function ChartBarCard({
  title = 'Pemasukan & pengeluaran',
  subtitle = 'September 2026 · Dikelompokkan per minggu',
  legend = true,
  showExpense = true,
  data = WEEKLY_SERIES,
  dataKey = 'pemasukan',
  seriesLabel = 'Pemasukan',
  seriesTotal = 'Rp24.800.000',
  seriesColor = COLOR_INCOME,
  insight,
  className = '',
  tabs = 'static',
  activeTab,
  onTabChange,
  xInterval = 0,
}) {
  const canRender = data.length > 0 && typeof window !== 'undefined'

  return (
    <section className={`adm-card p-4 sm:p-5 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">{title}</h2>
          <p className="mt-0.5 text-xs text-ink-400">{subtitle}</p>
        </div>
        {tabs === 'static' && <SegmentedTabs />}
        {Array.isArray(tabs) && (
          <SegmentedTabs items={tabs} value={activeTab} onChange={onTabChange} />
        )}
      </div>

      {legend && (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ background: seriesColor }}
            />
            {seriesLabel} <span className="num font-semibold text-ink-900">{seriesTotal}</span>
          </span>
          {showExpense && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-600">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ background: COLOR_EXPENSE }}
              />
              Pengeluaran <span className="num font-semibold text-ink-900">Rp10.400.000</span>
            </span>
          )}
          <span className="ml-auto hidden text-xs text-ink-400 sm:inline">Dalam juta rupiah</span>
        </div>
      )}

      <div
        className="mt-2 h-[240px] w-full"
        role="img"
        aria-label={`Grafik ${seriesLabel.toLowerCase()} per minggu pada September 2026`}
      >
        {canRender ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 16, right: 4, left: -10, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke="#eceef2" />
              <XAxis
                dataKey="period"
                tick={axisTick}
                tickLine={false}
                axisLine={{ stroke: '#eceef2' }}
                interval={xInterval}
              />
              <YAxis
                tick={axisTick}
                tickLine={false}
                axisLine={false}
                domain={[0, 'auto']}
                width={36}
                tickFormatter={(v) => v.toFixed(1).replace('.', ',')}
              />
              <Tooltip
                cursor={{ fill: 'rgba(29,78,216,0.05)' }}
                formatter={(value, name) => [
                  `Rp${formatJuta(value)} juta`,
                  name === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran',
                ]}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #d5d9e2',
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />
              <Bar dataKey={dataKey} fill={seriesColor} radius={[4, 4, 0, 0]} maxBarSize={40}>
                <LabelList
                  dataKey={dataKey}
                  position="top"
                  formatter={formatJuta}
                  style={{ fill: seriesColor, fontSize: 11, fontWeight: 600 }}
                />
              </Bar>
              {showExpense && (
                <Bar dataKey="pengeluaran" fill={COLOR_EXPENSE} radius={[4, 4, 0, 0]} maxBarSize={40}>
                  <LabelList
                    dataKey="pengeluaran"
                    position="top"
                    formatter={formatJuta}
                    style={{ fill: '#b97e3b', fontSize: 11, fontWeight: 600 }}
                  />
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-md bg-ink-50" />
        )}
      </div>

      {insight && (
        <p className="mt-2 flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 text-xs font-medium text-brand-800">
          <span
            aria-hidden="true"
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white"
          >
            ↑
          </span>
          {insight}
        </p>
      )}
    </section>
  )
}
