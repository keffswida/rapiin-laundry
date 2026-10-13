import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import KpiCard from '../components/KpiCard'
import PeriodPicker from '../components/PeriodPicker'
import StatusBadge from '../components/StatusBadge'
import { IconChevronDown, IconChevronRight, IconSearch } from '../../components/ui/Icons'
import {
  COUNTS,
  ORDERS,
  PAYMENT_LABEL,
  STATUS_LABEL,
  formatRp,
  piutang,
} from '../data/pesanan'

const STATUS_OPTIONS = [
  { value: 'semua', label: 'Semua status laundry' },
  { value: 'baru', label: 'Baru' },
  { value: 'diproses', label: 'Diproses' },
  { value: 'siap-diambil', label: 'Siap diambil' },
  { value: 'selesai', label: 'Selesai' },
]

const PAYMENT_OPTIONS = [
  { value: 'semua', label: 'Semua pembayaran' },
  { value: 'lunas', label: 'Lunas' },
  { value: 'belum-lunas', label: 'Belum lunas' },
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

/** Halaman Pesanan — daftar + filter/search/sort/pagination (mock). */
export default function Pesanan() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('semua')
  const [payment, setPayment] = useState('semua')
  const [sort, setSort] = useState('terbaru')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let rows = ORDERS.filter((o) => {
      if (status !== 'semua' && o.status !== status) return false
      if (payment !== 'semua' && o.payment !== payment) return false
      if (needle) {
        const hay = `${o.id} ${o.customer}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    if (sort === 'terlama') rows = [...rows].reverse()
    return rows
  }, [q, status, payment, sort])

  const totalRows = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalRows / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const rows = filtered.slice(start, start + perPage)

  const resetPage = () => setPage(1)
  const hutang = piutang()
  const activeCount = COUNTS.baru + COUNTS.diproses + COUNTS.siap

  const kpis = [
    { id: 'total', label: 'Total pesanan', value: String(COUNTS.total), hint: '1–30 September 2026', target: 'semua' },
    { id: 'baru', label: 'Baru', value: String(COUNTS.baru), hint: 'Menunggu mulai diproses', target: 'baru' },
    { id: 'diproses', label: 'Diproses', value: String(COUNTS.diproses), hint: 'Dicuci, dikeringkan atau disetrika', target: 'diproses' },
    { id: 'siap', label: 'Siap diambil', value: String(COUNTS.siap), hint: 'Menunggu pengambilan', target: 'siap-diambil' },
    { id: 'selesai', label: 'Selesai', value: String(COUNTS.selesai), hint: 'Sudah diambil pelanggan', target: 'selesai' },
  ]

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
        title="Pesanan"
        desc="Kelola pesanan masuk hingga cucian kembali ke pelanggan."
        actions={
          <>
            <PeriodPicker />
            <button type="button" className="adm-btn-primary">
              <span aria-hidden="true" className="text-base leading-none">+</span>
              Tambah pesanan
            </button>
          </>
        }
      />

      <section aria-label="Status pesanan" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {kpis.map((k) => (
          <KpiCard
            key={k.id}
            label={k.label}
            value={k.value}
            hint={k.hint}
            icon="orders"
            active={status === k.target}
            onClick={() => {
              setStatus(k.target)
              resetPage()
            }}
          />
        ))}
      </section>

      <p className="flex items-start gap-2.5 rounded-lg bg-brand-50 px-4 py-3 text-sm font-medium text-brand-900">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white"
        >
          i
        </span>
        <span>
          {activeCount} pesanan aktif = {COUNTS.baru} baru + {COUNTS.diproses} diproses +{' '}
          {COUNTS.siap} siap diambil. Status laundry terpisah dari status pembayaran.
        </span>
      </p>

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink-900">Daftar pesanan</h2>
            <p className="mt-0.5 text-xs text-ink-400">
              {COUNTS.total} pesanan dalam periode terpilih · Urutkan dari yang terbaru
            </p>
          </div>
          <button type="button" className="adm-btn-outline">
            Ekspor data
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
              placeholder="Cari ID pesanan atau nama pelanggan"
              aria-label="Cari ID pesanan atau nama pelanggan"
              className="adm-input pl-9"
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              resetPage()
            }}
            aria-label="Filter status laundry"
            className="adm-select"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={payment}
            onChange={(e) => {
              setPayment(e.target.value)
              resetPage()
            }}
            aria-label="Filter pembayaran"
            className="adm-select"
          >
            {PAYMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              resetPage()
            }}
            aria-label="Urutan"
            className="adm-select ml-auto"
          >
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
          </select>
        </div>

        <div className="mt-3 overflow-hidden rounded-md border border-ink-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-400">
                  <th scope="col" className="px-2.5 py-2">ID / tanggal masuk</th>
                  <th scope="col" className="px-2.5 py-2">Pelanggan</th>
                  <th scope="col" className="px-2.5 py-2">Layanan</th>
                  <th scope="col" className="px-2.5 py-2">Jumlah</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Total</th>
                  <th scope="col" className="px-2.5 py-2">Pembayaran</th>
                  <th scope="col" className="px-2.5 py-2">Status laundry</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-sm text-ink-400">
                      Tidak ada pesanan yang cocok dengan pencarian atau filter.
                    </td>
                  </tr>
                )}
                {rows.map((o) => (
                  <tr key={o.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                    <td className="px-2.5 py-2">
                      <span className="text-[13px] font-semibold text-brand-700">{o.id}</span>
                      <span className="mt-0.5 block text-[11px] text-ink-400">
                        {o.date} · {o.time}
                      </span>
                    </td>
                    <td className="px-2.5 py-2">
                      <p className="text-[13px] font-medium text-ink-900">{o.customer}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400">{o.customerCode}</p>
                    </td>
                    <td className="px-2.5 py-2 text-[13px] text-ink-700">{o.service}</td>
                    <td className="num px-2.5 py-2 text-[13px] text-ink-700">
                      {o.amount} {o.unit}
                    </td>
                    <td className="num px-2.5 py-2 text-right text-[13px] font-medium text-ink-900">
                      {formatRp(o.total)}
                    </td>
                    <td className="px-2.5 py-2">
                      <StatusBadge status={PAYMENT_LABEL[o.payment]} />
                    </td>
                    <td className="px-2.5 py-2">
                      <StatusBadge status={STATUS_LABEL[o.status]} />
                    </td>
                    <td className="px-2.5 py-2 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900"
                      >
                        Detail
                        <IconChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="text-xs text-ink-500">
            Menampilkan {totalRows === 0 ? 0 : start + 1}–{Math.min(start + perPage, totalRows)}{' '}
            dari {totalRows} pesanan
          </p>
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-ink-500">
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value))
                  resetPage()
                }}
                aria-label="Pesanan per halaman"
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

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <p className="flex items-start gap-2.5 rounded-lg bg-brand-50 px-4 py-3 text-xs font-medium text-brand-900">
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-semibold text-white"
          >
            i
          </span>
          <span>
            Belum lunas: {hutang.count} pesanan · {formatRp(hutang.sum)} piutang. Tidak termasuk
            pemasukan diterima.
          </span>
        </p>
        <p className="flex items-start justify-end gap-2.5 rounded-lg bg-ink-50 px-4 py-3 text-xs font-medium text-ink-500">
          <span>Pilih Detail untuk melihat nota, jadwal selesai dan riwayat status.</span>
        </p>
      </div>
    </div>
  )
}
