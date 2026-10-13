import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import KpiCard from '../components/KpiCard'
import PeriodPicker from '../components/PeriodPicker'
import ChartBarCard, { COLOR_EXPENSE } from '../components/ChartBarCard'
import ProgressRow from '../components/ProgressRow'
import { IconChevronDown, IconLink, IconSearch } from '../../components/ui/Icons'
import {
  CATEGORIES,
  CATEGORY_LABEL,
  CATEGORY_OPTIONS,
  EXPENSES,
  EXPENSE_COUNT,
  METODE_OPTIONS,
  METHOD_LABEL,
  RASIO_BIAYA,
  TOTAL_PENGELUARAN,
  TREND,
  TREND_TABS,
  formatPct,
  formatRp,
  highestWeek,
  sumAmounts,
} from '../data/pengeluaran'
import { TOTAL_PENERIMAAN } from '../data/pemasukan'

const STATUS_OPTIONS = [
  { value: 'terbaru', label: 'Tanggal terbaru' },
  { value: 'terlama', label: 'Tanggal terlama' },
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

/** Halaman Pengeluaran — buku biaya + tren + alokasi (mock). */
export default function Pengeluaran() {
  const [q, setQ] = useState('')
  const [kategori, setKategori] = useState('semua')
  const [metode, setMetode] = useState('semua')
  const [sort, setSort] = useState('terbaru')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [tab, setTab] = useState('Minggu')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let rows = EXPENSES.filter((r) => {
      if (kategori !== 'semua' && r.category !== kategori) return false
      if (metode !== 'semua' && r.method !== metode) return false
      if (needle) {
        const hay = `${r.desc} ${r.ref}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    if (sort === 'terlama') rows = [...rows].reverse()
    return rows
  }, [q, kategori, metode, sort])

  const totalRows = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalRows / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const rows = filtered.slice(start, start + perPage)
  const filteredTotal = sumAmounts(filtered)

  const resetPage = () => setPage(1)

  const resetFilters = () => {
    setQ('')
    setKategori('semua')
    setMetode('semua')
    setSort('terbaru')
    resetPage()
  }

  const top = highestWeek()
  const topPct = (top.pengeluaran / 10.4) * 100
  const insight = `Pengeluaran tertinggi: ${top.period} · Rp${new Intl.NumberFormat('id-ID').format(
    Math.round(top.pengeluaran * 1000000),
  )} (${formatPct(topPct)} dari total). Gaji dicatat per minggu.`

  const gaji = CATEGORIES[0]

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
        title="Pengeluaran"
        desc="Catat biaya operasional dan kendalikan alokasi pengeluaran usaha."
        actions={
          <>
            <PeriodPicker />
            <button type="button" className="adm-btn-primary">
              <span aria-hidden="true" className="text-base leading-none">+</span>
              Tambah pengeluaran
            </button>
          </>
        }
      />

      <section aria-label="Ringkasan pengeluaran" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KpiCard
          label="Total pengeluaran"
          value={formatRp(TOTAL_PENGELUARAN)}
          hint={`${EXPENSE_COUNT} transaksi dibayar · basis kas`}
          icon="expense"
          active={kategori === 'semua' && metode === 'semua' && q.trim() === ''}
          onClick={resetFilters}
        />
        <KpiCard
          label="Biaya terbesar"
          value={formatRp(gaji.amount)}
          hint={`${gaji.label} · ${formatPct(gaji.pct)} dari total`}
          icon="customers"
          active={kategori === 'gaji'}
          onClick={() => {
            setKategori('gaji')
            setMetode('semua')
            setQ('')
            resetPage()
          }}
        />
        <KpiCard
          label="Rasio biaya"
          value={`${formatPct(RASIO_BIAYA)}`}
          hint={`Dari pemasukan ${formatRp(TOTAL_PENERIMAAN)}`}
          icon="clock"
        />
        <KpiCard
          label="Bukti pengeluaran"
          value={`${EXPENSE_COUNT} dari ${EXPENSE_COUNT}`}
          hint="Semua transaksi memiliki bukti"
          icon="link"
        />
      </section>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <ChartBarCard
          className="xl:col-span-2"
          title="Tren pengeluaran"
          subtitle={`September 2026 · Dikelompokkan per ${tab.toLowerCase()}`}
          showExpense={false}
          data={TREND[tab]}
          dataKey="pengeluaran"
          seriesLabel="Pengeluaran"
          seriesTotal={formatRp(TOTAL_PENGELUARAN)}
          seriesColor={COLOR_EXPENSE}
          insight={insight}
          tabs={TREND_TABS}
          activeTab={tab}
          onTabChange={setTab}
          xInterval={tab === 'Hari' ? 2 : 0}
        />

        <section className="adm-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">Alokasi biaya</h2>
          <p className="mt-0.5 text-xs text-ink-400">5 kategori · September 2026</p>
          <div className="mt-4 flex flex-col gap-3.5">
            {CATEGORIES.map((c) => (
              <ProgressRow
                key={c.id}
                label={`${c.label} · ${formatPct(c.pct)}`}
                right={formatRp(c.amount)}
                percent={c.pct}
              />
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2.5 rounded-md bg-ink-50 px-3 py-2 text-xs font-medium text-ink-500">
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink-300 text-[10px] font-semibold text-white"
            >
              i
            </span>
            <span>Perawatan mesin termasuk kategori Lainnya pada ringkasan usaha.</span>
          </p>
        </section>
      </div>

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink-900">Buku pengeluaran</h2>
            <p className="mt-0.5 text-xs text-ink-400">
              Biaya dicatat pada tanggal pembayaran · Semua nominal dalam rupiah.
            </p>
          </div>
          <button type="button" className="adm-btn-outline">
            Ekspor biaya
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
              placeholder="Cari keterangan atau referensi pengeluaran"
              aria-label="Cari keterangan atau referensi pengeluaran"
              className="adm-input pl-9"
            />
          </div>
          <select
            value={kategori}
            onChange={(e) => {
              setKategori(e.target.value)
              resetPage()
            }}
            aria-label="Filter kategori"
            className="adm-select"
          >
            {CATEGORY_OPTIONS.map((o) => (
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
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              resetPage()
            }}
            aria-label="Urutan tanggal"
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
                  <th scope="col" className="px-2.5 py-2">Tanggal / referensi</th>
                  <th scope="col" className="px-2.5 py-2">Keterangan</th>
                  <th scope="col" className="px-2.5 py-2">Kategori</th>
                  <th scope="col" className="px-2.5 py-2">Metode bayar</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Jumlah</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Bukti</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-10 text-center text-sm text-ink-400">
                      Tidak ada pengeluaran yang cocok dengan pencarian atau filter.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.ref} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                    <td className="px-2.5 py-2.5">
                      <p className="num text-[13px] font-medium text-ink-900">{r.date}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400">{r.ref}</p>
                    </td>
                    <td className="px-2.5 py-2.5 text-[13px] font-medium text-ink-900">{r.desc}</td>
                    <td className="px-2.5 py-2.5 text-[13px] text-ink-700">{CATEGORY_LABEL[r.category]}</td>
                    <td className="px-2.5 py-2.5 text-[13px] text-ink-700">{METHOD_LABEL[r.method]}</td>
                    <td className="num px-2.5 py-2.5 text-right text-[13px] font-medium text-ink-900">
                      {formatRp(r.amount)}
                    </td>
                    <td className="px-2.5 py-2.5 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900"
                      >
                        Lihat bukti
                        <IconLink className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-ink-100 bg-ink-50/70">
                  <td colSpan={3} className="px-2.5 py-2.5 text-[13px] font-semibold text-ink-900">
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
            dari {totalRows} pengeluaran
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
          Total periode mencakup {EXPENSE_COUNT} pengeluaran, termasuk transaksi di halaman
          berikutnya. Bukti contoh dapat dilihat melalui tautan pada setiap baris.
        </p>
        <p>Basis kas · Pemasukan diterima dan pengeluaran dibayar pada periode terpilih.</p>
      </div>
    </div>
  )
}
