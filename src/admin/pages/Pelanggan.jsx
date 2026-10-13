import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import KpiCard from '../components/KpiCard'
import PeriodPicker from '../components/PeriodPicker'
import StatusBadge from '../components/StatusBadge'
import ProgressRow from '../components/ProgressRow'
import { IconChevronDown, IconChevronRight, IconSearch } from '../../components/ui/Icons'
import {
  COUNTS,
  CUSTOMERS,
  STATUS_LABEL,
  formatDec,
  formatRp,
} from '../data/pelanggan'
import { COUNTS as ORDER_COUNTS } from '../data/pesanan'

const ACTIVITY_OPTIONS = [
  { value: 'aktif', label: 'Aktif pada September' },
  { value: 'semua', label: 'Semua pelanggan' },
  { value: 'nonaktif', label: 'Tidak aktif' },
]

const STATUS_OPTIONS = [
  { value: 'semua', label: 'Semua pelanggan' },
  { value: 'baru', label: 'Baru' },
  { value: 'kembali', label: 'Kembali' },
]

const PAGE_SIZE_OPTIONS = [10, 25, 50]

const ORDERS_PER_ACTIVE = ORDER_COUNTS.total / COUNTS.aktif
const REPEAT_PCT = (COUNTS.kembali / COUNTS.aktif) * 100

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

/** Halaman Pelanggan — buku pelanggan + filter/search/sort/pagination (mock). */
export default function Pelanggan() {
  const [q, setQ] = useState('')
  const [activity, setActivity] = useState('aktif')
  const [status, setStatus] = useState('semua')
  const [sort, setSort] = useState('terbaru')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let rows = CUSTOMERS.filter((c) => {
      if (activity === 'aktif' && !c.active) return false
      if (activity === 'nonaktif' && c.active) return false
      if (status !== 'semua' && c.status !== status) return false
      if (needle) {
        const hay = `${c.name} ${c.code} ${c.phone}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
    if (sort === 'terlama') rows = [...rows].sort((a, b) => a.lastTs - b.lastTs)
    else rows = [...rows].sort((a, b) => b.lastTs - a.lastTs)
    return rows
  }, [q, activity, status, sort])

  const totalRows = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalRows / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const rows = filtered.slice(start, start + perPage)

  const resetPage = () => setPage(1)

  const listLabel = activity === 'aktif' ? 'pelanggan aktif' : 'pelanggan'

  const kpis = [
    {
      id: 'terdaftar',
      label: 'Pelanggan terdaftar',
      value: String(COUNTS.total),
      hint: 'Seluruh pelanggan di buku usaha',
      icon: 'customers',
      target: { activity: 'semua', status: 'semua' },
    },
    {
      id: 'aktif',
      label: 'Aktif pada September',
      value: String(COUNTS.aktif),
      hint: 'Pelanggan unik · bukan pesanan',
      icon: 'customers',
      target: { activity: 'aktif', status: 'semua' },
    },
    {
      id: 'baru',
      label: 'Pelanggan baru',
      value: String(COUNTS.baru),
      hint: 'Pesanan pertama pada September',
      icon: 'userPlus',
      target: { activity: 'aktif', status: 'baru' },
    },
    {
      id: 'kembali',
      label: 'Pelanggan kembali',
      value: String(COUNTS.kembali),
      hint: 'Pernah memesan sebelum September',
      icon: 'refresh',
      target: { activity: 'aktif', status: 'kembali' },
    },
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
        title="Pelanggan"
        desc="Kenali pelanggan dan pantau riwayat penggunaan layanan."
        actions={
          <>
            <PeriodPicker />
            <button type="button" className="adm-btn-primary">
              <span aria-hidden="true" className="text-base leading-none">+</span>
              Tambah pelanggan
            </button>
          </>
        }
      />

      <section aria-label="Statistik pelanggan" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard
            key={k.id}
            label={k.label}
            value={k.value}
            hint={k.hint}
            icon={k.icon}
            active={activity === k.target.activity && status === k.target.status}
            onClick={() => {
              setActivity(k.target.activity)
              setStatus(k.target.status)
              resetPage()
            }}
          />
        ))}
      </section>

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink-900">Buku pelanggan</h2>
            <p className="mt-0.5 text-xs text-ink-400">
              Belanja kumulatif dan jumlah pesanan dihitung sejak pelanggan terdaftar, termasuk
              tagihan belum lunas.
            </p>
          </div>
          <button type="button" className="adm-btn-outline">
            Ekspor pelanggan
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
              placeholder="Cari nama, ID atau nomor kontak"
              aria-label="Cari nama, ID atau nomor kontak"
              className="adm-input pl-9"
            />
          </div>
          <select
            value={activity}
            onChange={(e) => {
              setActivity(e.target.value)
              resetPage()
            }}
            aria-label="Filter aktivitas"
            className="adm-select"
          >
            {ACTIVITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              resetPage()
            }}
            aria-label="Filter status pelanggan"
            className="adm-select"
          >
            {STATUS_OPTIONS.map((o) => (
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
            <option value="terbaru">Pesanan terbaru</option>
            <option value="terlama">Pesanan terlama</option>
          </select>
        </div>

        <div className="mt-3 overflow-hidden rounded-md border border-ink-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-400">
                  <th scope="col" className="px-2.5 py-2">Pelanggan / ID</th>
                  <th scope="col" className="px-2.5 py-2">Kontak</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Pesanan</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Belanja kumulatif</th>
                  <th scope="col" className="px-2.5 py-2">Pesanan terakhir</th>
                  <th scope="col" className="px-2.5 py-2">Status</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-10 text-center text-sm text-ink-400">
                      Tidak ada pelanggan yang cocok dengan pencarian atau filter.
                    </td>
                  </tr>
                )}
                {rows.map((c) => (
                  <tr key={c.code} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                    <td className="px-2.5 py-2">
                      <p className="text-[13px] font-medium text-ink-900">{c.name}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400">{c.code}</p>
                    </td>
                    <td className="px-2.5 py-2">
                      <p className="num text-[13px] text-ink-700">{c.phone}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400">Nomor disamarkan</p>
                    </td>
                    <td className="num px-2.5 py-2 text-right text-[13px] font-medium text-ink-900">
                      {c.orders}
                    </td>
                    <td className="num px-2.5 py-2 text-right text-[13px] font-medium text-ink-900">
                      {formatRp(c.spend)}
                    </td>
                    <td className="num px-2.5 py-2 text-[13px] text-ink-700">{c.lastOrder}</td>
                    <td className="px-2.5 py-2">
                      <StatusBadge status={STATUS_LABEL[c.status]} />
                    </td>
                    <td className="px-2.5 py-2 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900"
                      >
                        Profil
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
            dari {totalRows} {listLabel}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-ink-500">
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value))
                  resetPage()
                }}
                aria-label="Pelanggan per halaman"
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
        <section className="adm-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">Penggunaan bulan ini</h2>
          <p className="mt-0.5 text-xs text-ink-400">
            Satu pelanggan dapat membuat lebih dari satu pesanan.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="num text-2xl font-semibold tracking-tight text-ink-900">
                {formatDec(ORDERS_PER_ACTIVE)}
              </p>
              <p className="mt-1 text-xs text-ink-400">
                {ORDER_COUNTS.total} pesanan ÷ {COUNTS.aktif} pelanggan
              </p>
            </div>
            <div>
              <p className="num text-2xl font-semibold tracking-tight text-ink-900">
                {formatDec(REPEAT_PCT, 1)}%
              </p>
              <p className="mt-1 text-xs text-ink-400">
                {COUNTS.kembali} dari {COUNTS.aktif} pelanggan aktif
              </p>
            </div>
          </div>
        </section>

        <section className="adm-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">
            Komposit pelanggan aktif
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            <ProgressRow
              label="Pelanggan kembali"
              right={`${COUNTS.kembali} pelanggan · ${formatDec(REPEAT_PCT, 1)}%`}
              percent={REPEAT_PCT}
            />
            <ProgressRow
              label="Pelanggan baru"
              right={`${COUNTS.baru} pelanggan · ${formatDec(100 - REPEAT_PCT, 1)}%`}
              percent={100 - REPEAT_PCT}
            />
          </div>
        </section>
      </div>

      <p className="text-xs text-ink-500">
        Seluruh nama bersifat fiktif dan nomor kontak disamarkan. Status Baru/Kembali mengikuti
        periode terpilih, bukan jumlah pesanan sepanjang waktu.
      </p>
    </div>
  )
}
