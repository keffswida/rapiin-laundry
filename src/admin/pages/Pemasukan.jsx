import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import KpiCard from '../components/KpiCard'
import PeriodPicker from '../components/PeriodPicker'
import StatusBadge from '../components/StatusBadge'
import ChartBarCard from '../components/ChartBarCard'
import ProgressRow from '../components/ProgressRow'
import { IconChevronDown, IconChevronRight, IconSearch } from '../../components/ui/Icons'
import {
  AVG_PENERIMAAN,
  LUNAS_COUNT,
  METHODS,
  METHOD_LABEL,
  PIUTANG,
  ROWS,
  SERVICE_OPTIONS,
  TOTAL_PENERIMAAN,
  TREND,
  TREND_TABS,
  formatPct,
  formatRp,
  highestWeek,
  sumAmounts,
} from '../data/pemasukan'
import { COUNTS as ORDER_COUNTS, piutang } from '../data/pesanan'

const METODE_OPTIONS = [
  { value: 'semua', label: 'Semua metode' },
  { value: 'qris', label: 'QRIS' },
  { value: 'tunai', label: 'Tunai' },
  { value: 'transfer', label: 'Transfer bank' },
]

const STATUS_OPTIONS = [
  { value: 'lunas', label: 'Lunas' },
  { value: 'semua', label: 'Semua status' },
]

const PAGE_SIZE_OPTIONS = [10, 25, 50]

function PageButton({ children, disabled, active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={`h-8 min-w-8 rounded-md border px-2 text-xs font-medium transition ${
        active
          ? 'border-brand-700 bg-brand-700 text-white'
          : disabled
            ? 'cursor-default border-ink-100 text-ink-300'
            : 'border-ink-200 text-ink-600 hover:border-brand-300 hover:text-brand-700'
      }`}
    >
      {children}
    </button>
  )
}

/** Halaman Pemasukan — penerimaan lunas + tren + metode (mock). */
export default function Pemasukan() {
  const [q, setQ] = useState('')
  const [layanan, setLayanan] = useState('semua')
  const [metode, setMetode] = useState('semua')
  const [status, setStatus] = useState('lunas')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [tab, setTab] = useState('Minggu')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return ROWS.filter((r) => {
      if (layanan !== 'semua' && r.service !== layanan) return false
      if (metode !== 'semua' && r.method !== metode) return false
      if (needle) {
        const hay = `${r.customer} ${r.ref} ${r.inv}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [q, layanan, metode])

  const totalRows = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalRows / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const rows = filtered.slice(start, start + perPage)
  const filteredTotal = sumAmounts(filtered)

  const resetPage = () => setPage(1)

  const resetFilters = () => {
    setQ('')
    setLayanan('semua')
    setMetode('semua')
    setStatus('lunas')
    resetPage()
  }

  const top = highestWeek()
  const topPct = (top.pemasukan / 24.8) * 100
  const insight = `Penerimaan tertinggi: ${top.period} · Rp${new Intl.NumberFormat('id-ID').format(
    Math.round(top.pemasukan * 1000000),
  )} (${formatPct(topPct)} dari total).`

  const pageNumbers = useMemo(() => {
    const nums = []
    const push = (n) => nums.push(n)
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) push(i)
      return nums
    }
    push(1)
    if (safePage > 3) push('…')
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i += 1) push(i)
    if (safePage < totalPages - 2) push('…')
    push(totalPages)
    return nums
  }, [safePage, totalPages])

  return (
    <div className="flex w-full flex-col gap-5">
      <PageHeader
        title="Pemasukan"
        desc="Pantau pembayaran yang diterima dan tagihan yang masih tertunda."
        actions={
          <>
            <PeriodPicker />
            <button type="button" className="adm-btn-primary">
              <span aria-hidden="true" className="text-base leading-none">+</span>
              Catat pembayaran
            </button>
          </>
        }
      />

      <section aria-label="Ringkasan pemasukan" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard
          label="Pemasukan diterima"
          value={formatRp(TOTAL_PENERIMAAN)}
          hint="Pembayaran lunas · basis kas"
          icon="income"
          highlight
          active
          onClick={resetFilters}
        />
        <KpiCard
          label="Tagihan belum lunas"
          value={formatRp(PIUTANG.sum)}
          hint={`${PIUTANG.count} pesanan · belum menjadi pemasukan`}
          icon="clock"
          to="/admin/pesanan"
        />
        <KpiCard
          label="Pesanan lunas"
          value={`${LUNAS_COUNT} pesanan`}
          hint={`Dari ${ORDER_COUNTS.total} pesanan September`}
          icon="check"
        />
        <KpiCard
          label="Rata-rata penerimaan"
          value={formatRp(AVG_PENERIMAAN)}
          hint={`${formatRp(TOTAL_PENERIMAAN)} ÷ ${LUNAS_COUNT} pesanan lunas`}
          icon="wallet"
        />
      </section>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <ChartBarCard
          className="xl:col-span-2"
          title="Tren pemasukan"
          subtitle={`September 2026 · Dikelompokkan per ${tab.toLowerCase()}`}
          showExpense={false}
          data={TREND[tab]}
          seriesTotal={formatRp(TOTAL_PENERIMAAN)}
          insight={insight}
          tabs={TREND_TABS}
          activeTab={tab}
          onTabChange={setTab}
          xInterval={tab === 'Hari' ? 2 : 0}
        />

        <section className="adm-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">Metode pembayaran</h2>
          <p className="mt-0.5 text-xs text-ink-400">
            Komposisi pembayaran yang sudah diterima
          </p>
          <p className="num mt-3 text-2xl font-semibold tracking-tight text-ink-900">
            {formatRp(TOTAL_PENERIMAAN)}
          </p>
          <div className="mt-4 flex flex-col gap-4">
            {METHODS.map((m) => (
              <ProgressRow
                key={m.id}
                label={`${m.label} · ${formatPct(m.pct)}`}
                right={formatRp(m.amount)}
                percent={m.pct}
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
            <span>
              Piutang {formatRp(piutang().sum)} tidak masuk grafik atau total penerimaan.
            </span>
          </p>
        </section>
      </div>

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink-900">Riwayat penerimaan</h2>
            <p className="mt-0.5 text-xs text-ink-400">
              Tanggal mengacu pada pembayaran diterima, bukan tanggal pesanan dibuat.
            </p>
          </div>
          <button type="button" className="adm-btn-outline">
            Ekspor transaksi
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-56 flex-1">
            <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                resetPage()
              }}
              placeholder="Cari pelanggan atau referensi pesanan"
              aria-label="Cari pelanggan atau referensi pesanan"
              className="adm-input pl-9"
            />
          </div>
          <select
            value={layanan}
            onChange={(e) => {
              setLayanan(e.target.value)
              resetPage()
            }}
            aria-label="Filter layanan"
            className="adm-select"
          >
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={metode}
            onChange={(e) => {
              setMetode(e.target.value)
              resetPage()
            }}
            aria-label="Filter metode pembayaran"
            className="adm-select"
          >
            {METODE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              resetPage()
            }}
            aria-label="Filter status pembayaran"
            className="adm-select ml-auto"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 overflow-hidden rounded-md border border-ink-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-400">
                  <th scope="col" className="px-2.5 py-2">Tanggal diterima</th>
                  <th scope="col" className="px-2.5 py-2">Sumber / pelanggan</th>
                  <th scope="col" className="px-2.5 py-2">Referensi pesanan</th>
                  <th scope="col" className="px-2.5 py-2">Metode bayar</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Jumlah</th>
                  <th scope="col" className="px-2.5 py-2">Status</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-10 text-center text-sm text-ink-400">
                      Tidak ada penerimaan yang cocok dengan pencarian atau filter.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.ref} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                    <td className="num px-2.5 py-2.5 text-[13px] text-ink-700">{r.date}</td>
                    <td className="px-2.5 py-2.5">
                      <p className="text-[13px] font-medium text-ink-900">{r.service}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400">{r.customer}</p>
                    </td>
                    <td className="px-2.5 py-2.5">
                      <span className="text-[13px] font-semibold text-brand-700">{r.ref}</span>
                      <span className="mt-0.5 block text-[11px] text-ink-400">Nota {r.inv}</span>
                    </td>
                    <td className="px-2.5 py-2.5 text-[13px] text-ink-700">{METHOD_LABEL[r.method]}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] font-medium text-ink-900">
                      {formatRp(r.amount)}
                    </td>
                    <td className="px-2.5 py-2.5">
                      <StatusBadge status="Lunas" />
                    </td>
                    <td className="px-2.5 py-2.5 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900"
                      >
                        Nota
                        <IconChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-ink-100 bg-ink-50/70">
                  <td colSpan={4} className="px-2.5 py-2.5 text-[13px] font-semibold text-ink-900">
                    Total periode terpilih
                  </td>
                  <td className="num px-2.5 py-2.5 text-right text-[13px] font-semibold text-ink-900">
                    {formatRp(filteredTotal)}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="text-xs text-ink-500">
            Menampilkan {totalRows === 0 ? 0 : start + 1}–{Math.min(start + perPage, totalRows)}{' '}
            dari {totalRows} penerimaan lunas
          </p>
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-ink-500">
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value))
                  resetPage()
                }}
                aria-label="Transaksi per halaman"
                className="adm-select h-8 text-xs"
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n} / halaman</option>
                ))}
              </select>
            </label>
            <nav aria-label="Navigasi halaman" className="flex items-center gap-1">
              <PageButton
                disabled={safePage === 1}
                onClick={() => setPage(safePage - 1)}
                label="Halaman sebelumnya"
              >
                <IconChevronDown className="h-3.5 w-3.5 rotate-90" />
              </PageButton>
              {pageNumbers.map((n, i) =>
                n === '…' ? (
                  <span key={`gap-${i}`} className="px-1 text-xs text-ink-400">…</span>
                ) : (
                  <PageButton key={n} active={n === safePage} onClick={() => setPage(n)} label={`Halaman ${n}`}>
                    {n}
                  </PageButton>
                ),
              )}
              <PageButton
                disabled={safePage === totalPages}
                onClick={() => setPage(safePage + 1)}
                label="Halaman berikutnya"
              >
                <IconChevronDown className="h-3.5 w-3.5 -rotate-90" />
              </PageButton>
            </nav>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-1 text-xs text-ink-500">
        <p>
          Total tagihan pesanan September {formatRp(TOTAL_PENERIMAAN + PIUTANG.sum)} = penerimaan
          lunas {formatRp(TOTAL_PENERIMAAN)} + piutang {formatRp(PIUTANG.sum)}. Contoh periode ini
          tidak memiliki pembayaran sebagian.
        </p>
        <p>Basis kas · Pemasukan diterima dan pengeluaran dibayar pada periode terpilih.</p>
      </div>
    </div>
  )
}
