import PageHeader from '../components/PageHeader'
import KpiCard from '../components/KpiCard'
import PeriodPicker from '../components/PeriodPicker'
import ExportButton from '../components/ExportButton'
import ChartBarCard from '../components/ChartBarCard'
import DonutCard from '../components/DonutCard'
import ProgressRow from '../components/ProgressRow'
import TableSimple from '../components/TableSimple'
import StatusBadge from '../components/StatusBadge'
import { IconArrowUpRight, IconArrowDownLeft } from '../../components/ui/Icons'
import {
  CHART_INSIGHT,
  KPIS,
  LATEST_TRANSACTIONS,
  POPULAR_SERVICES,
  SERVICES_NOTE,
  TRANSACTIONS_NOTE,
  WEEKLY_SERIES,
} from '../data/ringkasan'

const COLUMNS = [
  { key: 'tanggal', label: 'Tanggal' },
  { key: 'transaksi', label: 'Transaksi' },
  { key: 'jenis', label: 'Jenis' },
  { key: 'jumlah', label: 'Jumlah', align: 'right' },
  { key: 'status', label: 'Status', align: 'right' },
]

/** Halaman Ringkasan usaha (dashboard pemilik). */
export default function Ringkasan() {
  const weeklyTotals = WEEKLY_SERIES.reduce(
    (acc, row) => ({
      pemasukan: acc.pemasukan + row.pemasukan,
      pengeluaran: acc.pengeluaran + row.pengeluaran,
    }),
    { pemasukan: 0, pengeluaran: 0 },
  )

  return (
    <div className="flex w-full flex-col gap-5">
      <PageHeader
        title="Ringkasan usaha"
        desc="Selamat datang kembali, Andi. Berikut ringkasan outlet untuk periode yang dipilih."
        actions={
          <>
            <PeriodPicker />
            <ExportButton label="Ekspor laporan" formats={['PDF', 'Excel']} />
          </>
        }
      />

      <section aria-label="Metrik utama" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <ChartBarCard
          className="xl:col-span-3"
          data={WEEKLY_SERIES}
          insight={CHART_INSIGHT}
        />
        <DonutCard className="xl:col-span-2" />
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        <section className="adm-card flex flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-ink-900">
                Layanan terpopuler
              </h2>
              <p className="mt-0.5 text-xs text-ink-400">Jumlah pesanan per jenis layanan</p>
            </div>
            <a
              href="#"
              className="shrink-0 text-xs font-medium text-brand-700 transition hover:text-brand-900"
            >
              Kelola layanan →
            </a>
          </div>

          <div className="mt-4 flex flex-1 flex-col justify-between gap-3.5">
            {POPULAR_SERVICES.map((row, i) => (
              <ProgressRow
                key={row.id}
                label={row.label}
                right={`${row.count} pesanan · ${row.percent.toFixed(1).replace('.', ',')}%`}
                percent={row.percent}
                tone={i === 3 ? 'amber' : 'brand'}
              />
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-400">{SERVICES_NOTE}</p>
        </section>

        <section className="adm-card p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold tracking-tight text-ink-900">
                Transaksi terbaru
              </h2>
              <p className="mt-0.5 text-xs text-ink-400">{TRANSACTIONS_NOTE}</p>
            </div>
            <a
              href="#"
              className="shrink-0 text-xs font-medium text-brand-700 transition hover:text-brand-900"
            >
              Lihat semua →
            </a>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border border-ink-100">
            <TableSimple columns={COLUMNS} minWidth="min-w-[520px]">
              {LATEST_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                  <td className="px-2.5 py-2 text-xs whitespace-nowrap text-ink-500">
                    {tx.date}
                  </td>
                  <td className="px-2.5 py-2">
                    <p className="text-[13px] font-medium text-ink-900">{tx.title}</p>
                    <p className="mt-0.5 text-[11px] text-ink-400">{tx.ref}</p>
                  </td>
                  <td className="px-2.5 py-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        tx.type === 'income' ? 'text-emerald-600' : 'text-[#b97e3b]'
                      }`}
                    >
                      {tx.type === 'income' ? (
                        <IconArrowDownLeft className="h-3 w-3" />
                      ) : (
                        <IconArrowUpRight className="h-3 w-3" />
                      )}
                      {tx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                    </span>
                  </td>
                  <td className="num px-2.5 py-2 text-right font-medium whitespace-nowrap text-ink-900">
                    {tx.amount}
                  </td>
                  <td className="px-2.5 py-2 text-right">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </TableSimple>
          </div>

          <p className="mt-3 text-xs text-ink-400">
            Pemasukan periode berjalan Rp{weeklyTotals.pemasukan.toFixed(1).replace('.', ',')} juta
            · Pengeluaran Rp{weeklyTotals.pengeluaran.toFixed(1).replace('.', ',')} juta
          </p>
        </section>
      </div>
    </div>
  )
}
