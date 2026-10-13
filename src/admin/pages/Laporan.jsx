import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import KpiCard from '../components/KpiCard'
import PeriodPicker from '../components/PeriodPicker'
import SegmentedTabs from '../components/SegmentedTabs'
import ChartBarCard from '../components/ChartBarCard'
import ProgressRow from '../components/ProgressRow'
import { IconChevronRight, IconDownload, IconRefresh } from '../../components/ui/Icons'
import {
  EXPORTS,
  GROUP_TABS,
  JENIS_OPTIONS,
  LABA_BERSIH,
  MARGIN,
  PIUTANG_SUM,
  SERVICE_USAGE,
  TOTAL_PENERIMAAN,
  TOTAL_PENGELUARAN,
  TOTAL_ROW,
  USAGE_BANNER,
  buildRows,
  formatPct,
  formatRp,
  labaOf,
  marginOf,
  mergedSeries,
} from '../data/laporan'
import { COUNTS as ORDER_COUNTS } from '../data/pesanan'
import { COUNTS as CUSTOMER_COUNTS } from '../data/pelanggan'

/** Halaman Laporan — rekap keuangan & operasional + ekspor (mock). */
export default function Laporan() {
  const [jenis, setJenis] = useState('keuangan-operasional')
  const [tab, setTab] = useState('Minggu')

  const rows = useMemo(() => buildRows(tab), [tab])
  const series = useMemo(() => mergedSeries(tab), [tab])
  const jenisLabel = JENIS_OPTIONS.find((j) => j.value === jenis)?.label ?? ''

  return (
    <div className="flex w-full flex-col gap-5">
      <PageHeader
        title="Laporan"
        desc="Tinjau kinerja keuangan dan penggunaan layanan, lalu ekspor laporan."
        actions={
          <>
            <button type="button" className="adm-btn-outline">
              <IconDownload className="h-4 w-4 text-ink-400" />
              Ekspor PDF
            </button>
            <button type="button" className="adm-btn-primary">
              <IconDownload className="h-4 w-4 text-white/70" />
              Ekspor Excel
            </button>
          </>
        }
      />

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-500">Jenis laporan</span>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              aria-label="Jenis laporan"
              className="adm-select w-64"
            >
              {JENIS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-500">Rentang tanggal</span>
            <PeriodPicker />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-500">Kelompokkan berdasarkan</span>
            <SegmentedTabs items={GROUP_TABS} value={tab} onChange={setTab} />
          </div>
          <button type="button" className="adm-btn-primary ml-auto">
            <IconRefresh className="h-4 w-4 text-white/70" />
            Tampilkan laporan
          </button>
        </div>
      </section>

      <section aria-label="Ringkasan laporan" className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        <KpiCard
          label="Pemasukan"
          value={formatRp(TOTAL_PENERIMAAN)}
          hint="Pembayaran diterima"
          icon="income"
        />
        <KpiCard
          label="Pengeluaran"
          value={formatRp(TOTAL_PENGELUARAN)}
          hint="Biaya operasional dibayar"
          icon="expense"
        />
        <KpiCard
          label="Laba bersih"
          value={formatRp(LABA_BERSIH)}
          hint={`Margin laba ${formatPct(MARGIN)}`}
          icon="trend"
          highlight
        />
        <KpiCard
          label="Total pesanan"
          value={String(ORDER_COUNTS.total)}
          hint={`${ORDER_COUNTS.selesai} selesai · ${ORDER_COUNTS.baru + ORDER_COUNTS.diproses + ORDER_COUNTS.siap} aktif`}
          icon="orders"
        />
        <KpiCard
          label="Pelanggan unik"
          value={String(CUSTOMER_COUNTS.aktif)}
          hint={`${CUSTOMER_COUNTS.baru} baru · ${CUSTOMER_COUNTS.kembali} kembali`}
          icon="customers"
        />
      </section>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <ChartBarCard
          className="xl:col-span-2"
          title="Pemasukan & pengeluaran"
          subtitle={`Perbandingan antarperiode ${tab.toLowerCase()} · September 2026`}
          showExpense
          data={series}
          seriesTotal={formatRp(TOTAL_PENERIMAAN)}
          insight={`Pemasukan melebihi pengeluaran di setiap minggu. Laba bersih periode: ${formatRp(LABA_BERSIH)}.`}
          tabs={null}
        />

        <section className="adm-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">Penggunaan layanan</h2>
          <p className="mt-0.5 text-xs text-ink-400">
            {ORDER_COUNTS.total} pesanan · {CUSTOMER_COUNTS.aktif} pelanggan unik
          </p>
          <div className="mt-4 flex flex-col gap-3.5">
            {SERVICE_USAGE.map((s) => (
              <ProgressRow
                key={s.label}
                label={s.label}
                right={`${s.count} · ${formatPct(s.pct)}`}
                percent={s.pct}
              />
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2.5 rounded-md bg-brand-50 px-3 py-2 text-xs font-medium text-brand-800">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white"
            >
              i
            </span>
            <span>{USAGE_BANNER}</span>
          </p>
        </section>
      </div>

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink-900">
              Pratinjau laporan {tab.toLowerCase()}
            </h2>
            <p className="mt-0.5 text-xs text-ink-400">
              Laporan {jenisLabel.toLowerCase()} · Outlet utama · 1–30 September 2026
            </p>
          </div>
          <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-brand-700">
            Basis kas
          </span>
        </div>

        <div className="mt-3 overflow-hidden rounded-md border border-ink-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-400">
                  <th scope="col" className="px-2.5 py-2">Periode</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Pemasukan</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Pengeluaran</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Laba bersih</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Pesanan</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Pelanggan unik</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Margin</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.period} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                    <td className="px-2.5 py-2.5 text-[13px] font-medium text-ink-900">{r.period}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] text-ink-700">{formatRp(r.income)}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] text-ink-700">{formatRp(r.expense)}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">{formatRp(labaOf(r))}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] text-ink-700">{r.orders}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] text-ink-700">{r.unik}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] text-ink-700">{formatPct(marginOf(r))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-ink-100 bg-ink-50/70">
                  <td className="px-2.5 py-2.5 text-[13px] font-semibold text-ink-900">{TOTAL_ROW.period}</td>
                  <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">{formatRp(TOTAL_ROW.income)}</td>
                  <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">{formatRp(TOTAL_ROW.expense)}</td>
                  <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">{formatRp(LABA_BERSIH)}</td>
                  <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">{TOTAL_ROW.orders}</td>
                  <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">{TOTAL_ROW.unik}*</td>
                  <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">{formatPct(MARGIN)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            {rows.length} periode {tab.toLowerCase()} + total bulanan
          </p>
          <p className="text-xs text-ink-400">Seluruh data ditampilkan</p>
        </div>
      </section>

      <p className="flex items-start gap-2.5 rounded-lg bg-brand-50 px-4 py-3 text-xs font-medium text-brand-900">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white"
        >
          i
        </span>
        <span>
          *{CUSTOMER_COUNTS.aktif} pelanggan unik dihitung ulang untuk seluruh bulan, bukan
          dijumlahkan antar minggu. Piutang {formatRp(PIUTANG_SUM)} tidak termasuk pemasukan atau
          laba bersih basis kas.
        </span>
      </p>

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink-900">Riwayat ekspor</h2>
            <p className="mt-0.5 text-xs text-ink-400">Contoh file laporan yang pernah dibuat</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900"
          >
            Lihat semua
            <IconChevronRight className="h-3 w-3" />
          </button>
        </div>
        <ul className="mt-3 divide-y divide-ink-50">
          {EXPORTS.map((e) => (
            <li key={e.kind + e.title} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
              <span className="inline-flex items-center rounded-md bg-ink-100 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-ink-600">
                {e.kind}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-ink-900">{e.title}</p>
                <p className="mt-0.5 text-[11px] text-ink-400">{e.meta}</p>
              </div>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-emerald-700">
                {e.status}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900"
              >
                Unduh ulang
                <IconDownload className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-ink-500">
        Basis kas · Pemasukan diterima dan pengeluaran dibayar pada periode terpilih.
      </p>
    </div>
  )
}
