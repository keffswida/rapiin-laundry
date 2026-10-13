import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import KpiCard from '../components/KpiCard'
import StatusBadge from '../components/StatusBadge'
import { IconChevronRight, IconSearch } from '../../components/ui/Icons'
import {
  COUNTS,
  JENIS_LABEL,
  POPULAR,
  SERVICES_CATALOG,
  formatRp,
} from '../data/layanan'
import { COUNTS as ORDER_COUNTS } from '../data/pesanan'

const JENIS_OPTIONS = [
  { value: 'semua', label: 'Semua jenis' },
  { value: 'kiloan', label: 'Kiloan' },
  { value: 'satuan', label: 'Satuan' },
]

const STATUS_OPTIONS = [
  { value: 'semua', label: 'Semua status' },
  { value: 'aktif', label: 'Aktif' },
  { value: 'nonaktif', label: 'Nonaktif' },
]

/** Halaman Layanan & Harga — katalog + filter/search (mock). */
export default function Layanan() {
  const [q, setQ] = useState('')
  const [jenis, setJenis] = useState('semua')
  const [status, setStatus] = useState('semua')

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return SERVICES_CATALOG.filter((s) => {
      if (jenis !== 'semua' && s.jenis !== jenis) return false
      if (status === 'aktif' && !s.active) return false
      if (status === 'nonaktif' && s.active) return false
      if (needle && !s.name.toLowerCase().includes(needle)) return false
      return true
    })
  }, [q, jenis, status])

  const popularActive =
    q.trim().toLowerCase() === POPULAR.name.toLowerCase() && jenis === 'semua' && status === 'semua'

  const kpis = [
    {
      id: 'aktif',
      label: 'Layanan aktif',
      value: `${COUNTS.aktif} layanan`,
      hint: `${COUNTS.kiloan} kiloan · ${COUNTS.satuan} satuan`,
      icon: 'shirt',
      active: status === 'aktif' && jenis === 'semua' && q.trim() === '',
      onClick: () => {
        setStatus('aktif')
        setJenis('semua')
        setQ('')
      },
    },
    {
      id: 'nonaktif',
      label: 'Layanan nonaktif',
      value: `${COUNTS.nonaktif} layanan`,
      hint: 'Tidak tersedia untuk pesanan baru',
      icon: 'pause',
      active: status === 'nonaktif' && jenis === 'semua' && q.trim() === '',
      onClick: () => {
        setStatus('nonaktif')
        setJenis('semua')
        setQ('')
      },
    },
    {
      id: 'populer',
      label: 'Layanan paling populer',
      value: POPULAR.name,
      hint: `${POPULAR.orders} dari ${ORDER_COUNTS.total} pesanan September`,
      icon: 'star',
      active: popularActive,
      onClick: () => {
        setQ(POPULAR.name)
        setJenis('semua')
        setStatus('semua')
      },
    },
  ]

  return (
    <div className="flex w-full flex-col gap-5">
      <PageHeader
        title="Layanan & Harga"
        desc="Atur katalog, harga dan waktu pengerjaan setiap layanan."
        actions={
          <button type="button" className="adm-btn-primary">
            <span aria-hidden="true" className="text-base leading-none">+</span>
            Tambah layanan
          </button>
        }
      />

      <section aria-label="Statistik layanan" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {kpis.map((k) => (
          <KpiCard
            key={k.id}
            label={k.label}
            value={k.value}
            hint={k.hint}
            icon={k.icon}
            active={k.active}
            onClick={k.onClick}
          />
        ))}
      </section>

      <section className="adm-card p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-ink-900">Katalog layanan</h2>
            <p className="mt-0.5 text-xs text-ink-400">
              Harga berlaku per satuan · Klik Ubah harga atau Kelola untuk penyesuaian.
            </p>
          </div>
          <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-brand-700">
            Harga dalam rupiah
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-56 flex-1">
            <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama layanan"
              aria-label="Cari nama layanan"
              className="adm-input pl-9"
            />
          </div>
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            aria-label="Filter jenis"
            className="adm-select"
          >
            {JENIS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter status layanan"
            className="adm-select"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 overflow-hidden rounded-md border border-ink-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs font-medium text-ink-400">
                  <th scope="col" className="px-2.5 py-2">Layanan / deskripsi</th>
                  <th scope="col" className="px-2.5 py-2">Jenis</th>
                  <th scope="col" className="px-2.5 py-2">Satuan</th>
                  <th scope="col" className="px-2.5 py-2">Harga</th>
                  <th scope="col" className="px-2.5 py-2">Estimasi selesai</th>
                  <th scope="col" className="px-2.5 py-2">Status</th>
                  <th scope="col" className="px-2.5 py-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-10 text-center text-sm text-ink-400">
                      Tidak ada layanan yang cocok dengan pencarian atau filter.
                    </td>
                  </tr>
                )}
                {rows.map((s) => (
                  <tr key={s.id} className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60">
                    <td className="px-2.5 py-2.5">
                      <p className="text-[13px] font-medium text-ink-900">{s.name}</p>
                      <p className="mt-0.5 text-[11px] text-ink-400">{s.desc}</p>
                    </td>
                    <td className="px-2.5 py-2.5 text-[13px] text-ink-700">{JENIS_LABEL[s.jenis]}</td>
                    <td className="px-2.5 py-2.5 text-[13px] text-ink-700">{s.satuan}</td>
                    <td className="px-2.5 py-2.5">
                      <span className="num text-[13px] font-semibold text-brand-700">
                        {formatRp(s.price)}
                      </span>
                      <button
                        type="button"
                        className="mt-0.5 block text-[11px] font-medium text-brand-700/80 hover:text-brand-900"
                      >
                        Ubah harga
                      </button>
                    </td>
                    <td className="num px-2.5 py-2.5 text-[13px] text-ink-700">{s.eta}</td>
                    <td className="px-2.5 py-2.5">
                      <StatusBadge status={s.active ? 'Aktif' : 'Nonaktif'} />
                    </td>
                    <td className="px-2.5 py-2.5 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900"
                      >
                        Kelola
                        <IconChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            Menampilkan {rows.length} dari {COUNTS.total} layanan
          </p>
          <p className="text-xs text-ink-400">Seluruh data ditampilkan</p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <section className="adm-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">Aturan pesanan kiloan</h2>
          <p className="mt-0.5 text-xs text-ink-400">Pedoman yang tampil saat staf membuat pesanan.</p>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-700">
            Minimum 3 kg per pesanan. Berat dicatat sesuai hasil timbangan, tanpa pembulatan.
            Layanan satuan dihitung per item.
          </p>
        </section>
        <section className="adm-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold tracking-tight text-ink-900">Perubahan harga</h2>
          <p className="mt-0.5 text-xs text-ink-400">
            Pesanan lama tetap menggunakan harga pada saat dibuat.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-ink-700">
            Harga baru hanya berlaku untuk pesanan baru. Menonaktifkan layanan tidak menghapus
            riwayat pesanan atau transaksi.
          </p>
        </section>
      </div>

      <p className="text-xs text-ink-500">
        Laundry satuan pada laporan mencakup Bedcover, Cuci sepatu, Jaket dan Karpet kecil. Semua
        harga di sini merupakan contoh untuk desain.
      </p>
    </div>
  )
}
