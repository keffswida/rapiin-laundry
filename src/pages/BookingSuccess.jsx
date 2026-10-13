import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getOrder } from '../lib/orders'
import { formatCurrency, formatDate, formatNumber } from '../lib/format'
import { IconCheck, IconCopy, IconHome } from '../components/ui/Icons'

const SERVICE_LABELS = {
  kiloan: 'Laundry kiloan',
  satuan: 'Laundry satuan',
  setrika: 'Setrika saja',
}

const PACK_LABELS = {
  reguler: 'Reguler',
  ekspres: 'Ekspres',
  item: 'Satuan',
  'item-ekspres': 'Satuan ekspres',
}

export default function BookingSuccess() {
  const location = useLocation()
  const { code } = useParams()
  const [copied, setCopied] = useState(false)
  const codeRef = useRef(null)

  // State navigasi lebih dulu, storage sebagai cadangan (mis. buka ulang tab).
  const order = location.state?.order ?? (code ? getOrder(code) : null)

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyCode = async () => {
    const value = order?.code ?? ''
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard diblokir: sorot teks agar mudah disalin manual
      codeRef.current?.select()
      codeRef.current?.setSelectionRange(0, 999)
    }
  }

  if (!order) {
    return (
      <section className="min-h-[70vh] bg-surface py-20">
        <div className="shell max-w-lg">
          <div className="card p-8 text-center">
            <p className="text-sm font-extrabold tracking-[0.16em] text-brand-700 uppercase">
              Kode pesanan
            </p>
            <p className="mt-4 text-2xl font-extrabold text-ink-900">
              Kode pesanan tidak ditemukan.
            </p>
            <p className="mt-2 text-sm text-ink-600">Coba pesan jadwal baru.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/booking" className="btn-primary">
                Jadwalkan jemput
              </Link>
              <Link to="/" className="btn-outline">
                Ke beranda
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const unitLabel =
    order.unit === 'kg'
      ? `${formatNumber(order.amount)} kg`
      : `${formatNumber(order.amount)} item`

  const rows = [
    { label: 'Layanan', value: SERVICE_LABELS[order.service] ?? order.service },
    { label: 'Paket', value: PACK_LABELS[order.pack] ?? order.pack },
    { label: 'Perkiraan', value: unitLabel },
    { label: 'Tanggal jemput', value: formatDate(order.date) },
    { label: 'Jam jemput', value: order.time },
    { label: 'Nama lengkap', value: order.name },
    { label: 'Nomor WhatsApp', value: order.phone || order.phoneRaw },
    { label: 'Alamat jemput', value: order.address },
  ]

  return (
    <section className="min-h-[70vh] bg-surface py-12 sm:py-16">
      <div className="shell max-w-3xl">
        <div className="card overflow-hidden">
          <div className="bg-brand-700 px-6 py-8 text-white sm:px-9">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <IconCheck className="h-6 w-6" strokeWidth={2.5} />
            </span>
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Jadwal terkirim!
            </h1>
            <p className="mt-2 text-sm text-white/80">
              Kami konfirmasi lewat WhatsApp. Simpan kode ini:
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-white/10 p-4">
              <span className="text-xs font-bold tracking-[0.14em] text-white/70 uppercase">
                Kode pesanan
              </span>
              <code
                ref={codeRef}
                onClick={() => {
                  const node = codeRef.current
                  if (!node) return
                  const range = document.createRange()
                  range.selectNodeContents(node)
                  const selection = window.getSelection()
                  selection?.removeAllRanges()
                  selection?.addRange(range)
                }}
                className="min-w-[9ch] flex-1 cursor-pointer bg-transparent text-xl font-extrabold tracking-widest text-white select-all focus:outline-none"
              >
                {order.code}
              </code>
              <button type="button" onClick={copyCode} className="btn-light px-4 py-2.5 text-xs">
                {copied ? (
                  <>
                    <IconCheck className="h-4 w-4" /> Tersalin!
                  </>
                ) : (
                  <>
                    <IconCopy className="h-4 w-4" /> Salin kode
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="px-6 py-7 sm:px-9">
            <h2 className="text-sm font-extrabold tracking-[0.14em] text-ink-900 uppercase">
              Detail pesanan
            </h2>

            <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {rows.map((row) => (
                <div key={row.label} className="border-b border-ink-100 pb-3">
                  <dt className="text-xs text-ink-500">{row.label}</dt>
                  <dd className="num mt-0.5 text-sm font-bold break-words text-ink-900">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {order.notes && (
              <p className="mt-4 rounded-xl bg-ink-50 px-4 py-3 text-sm text-ink-600">
                <span className="font-bold text-ink-800">Catatan (opsional):</span> {order.notes}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-brand-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-bold text-brand-900">Estimasi total</span>
              <span className="num text-2xl font-extrabold tracking-tight text-brand-800">
                {formatCurrency(order.total)}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/booking" className="btn-primary">
                Pesan lagi
              </Link>
              <Link to="/" className="btn-outline">
                <IconHome className="h-4 w-4" />
                Ke beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
