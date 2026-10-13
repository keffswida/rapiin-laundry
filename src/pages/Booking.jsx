import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { estimate, isService, packagesFor, unitOf } from '../lib/pricing'
import { submitOrder } from '../lib/orders'
import { maxDateISO, todayISO, validateBooking } from '../lib/validation'
import { formatCurrency, formatDate, formatNumber } from '../lib/format'
import { Field, ErrorSummary } from '../components/ui/Field'
import { IconArrow, IconCalendar, IconClock, IconCheck } from '../components/ui/Icons'

const EMPTY = {
  name: '',
  phone: '',
  address: '',
  service: 'kiloan',
  pack: 'reguler',
  amount: '',
  date: '',
  time: '',
  notes: '',
  honeypot: '',
}

const SLOTS = ['06.00', '08.00', '10.00', '12.00', '14.00', '16.00', '18.00', '20.00']

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

const ERROR_MESSAGES = {
  required: 'Wajib diisi.',
  name_min: 'Nama minimal 2 huruf.',
  name_max: 'Nama terlalu panjang (maks 80 karakter).',
  name_invalid: 'Nama tidak boleh berisi angka saja.',
  phone_invalid: 'Nomor tidak valid. Pakai format 08xx atau +628xx.',
  address_min: 'Alamat minimal 10 karakter.',
  address_long: 'Alamat maksimal 200 karakter.',
  weight_invalid: 'Masukkan angka berat yang benar.',
  weight_min: 'Minimal {min} kg.',
  weight_max: 'Maksimal {max} kg.',
  qty_invalid: 'Masukkan jumlah item yang benar (bilangan bulat).',
  qty_min: 'Minimal {min} item.',
  qty_max: 'Maksimal {max} item.',
  amount_step: 'Berat kelipatan 0,5 kg.',
  date_invalid: 'Tanggal tidak valid.',
  date_past: 'Tanggal sudah lewat. Pilih hari ini atau sesudahnya.',
  date_far: 'Maksimal {max} hari ke depan.',
  time_required: 'Pilih jam jemput.',
  time_closed: 'Di luar jam operasional (06.00–21.00).',
  time_past: 'Jam itu sudah lewat. Pilih jadwal berikutnya.',
  package_mismatch: 'Paket tidak cocok dengan jenis layanan. Pilih paket lain.',
  note_long: 'Catatan maksimal 500 karakter.',
}

function messageFor(err) {
  const template = ERROR_MESSAGES[err.code] ?? ERROR_MESSAGES.required
  if (!err.vars) return template
  return Object.entries(err.vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  )
}

/** Ambil prefill dari query string; nilai tidak valid diabaikan. */
function initialForm(searchParams) {
  const form = { ...EMPTY }
  const service = searchParams.get('service')
  const pack = searchParams.get('pack')

  if (isService(service)) {
    form.service = service
    form.pack = packagesFor(service)[0]
  }

  if (pack && packagesFor(form.service).includes(pack)) {
    form.pack = pack
  }

  return form
}

export default function Booking() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [form, setForm] = useState(() => initialForm(searchParams))
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [dirty, setDirty] = useState(false)
  const summaryBoxRef = useRef(null)

  // Klik tautan layanan dari footer (mis. /booking?service=satuan) saat sudah
  // di halaman ini: terapkan selama user belum mengedit apa pun.
  const paramsKey = searchParams.toString()
  const [prevParamsKey, setPrevParamsKey] = useState(paramsKey)
  if (prevParamsKey !== paramsKey) {
    setPrevParamsKey(paramsKey)
    if (!dirty) setForm(initialForm(searchParams))
  }

  const packs = packagesFor(form.service)
  const unit = unitOf(form.service, form.pack) ?? 'kg'
  const calc = useMemo(
    () => estimate({ service: form.service, pack: form.pack, amount: form.amount }),
    [form.service, form.pack, form.amount],
  )

  const setField = (name, value) => {
    setDirty(true)
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'service') {
        const available = packagesFor(value)
        if (!available.includes(next.pack)) next.pack = available[0]
      }
      return next
    })
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
    setSubmitError(null)
  }

  const errorMessage = (field) => {
    const err = errors[field]
    if (!err) return undefined
    return messageFor(err)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return

    const result = validateBooking(form)
    if (!result.valid) {
      setErrors(result.errors)
      setSubmitError(null)
      requestAnimationFrame(() => summaryBoxRef.current?.focus())
      return
    }

    setErrors({})
    setSubmitError(null)
    setSubmitting(true)

    try {
      const order = await submitOrder(form, {
        total: calc.ok ? calc.total : 0,
        price: calc.ok ? calc.price : 0,
        unit,
        skipPersist: result.spam,
      })
      navigate(`/berhasil/${order.code}`, { state: { order }, replace: true })
    } catch (error) {
      setSubmitError(error?.code === 'offline' ? 'offline' : 'fail')
    } finally {
      setSubmitting(false)
    }
  }

  const errorCount = Object.keys(errors).length
  const amountLabel = unit === 'kg' ? 'Berat (kg)' : 'Jumlah item'
  const amountPlaceholder = unit === 'kg' ? 'Mis. 4' : 'Mis. 3'

  const amountText = calc.ok
    ? unit === 'kg'
      ? `${formatNumber(Number(form.amount))} kg`
      : `${formatNumber(Number(form.amount))} item`
    : '—'

  const summaryRows = [
    { label: 'Layanan', value: SERVICE_LABELS[form.service] ?? form.service },
    { label: 'Paket', value: PACK_LABELS[form.pack] ?? form.pack },
    { label: 'Perkiraan', value: amountText },
    { label: 'Tanggal jemput', value: form.date ? formatDate(form.date) : '—' },
    { label: 'Jam jemput', value: form.time || '—' },
  ]

  return (
    <section className="min-h-screen bg-surface py-12 sm:py-16">
      <div className="shell max-w-6xl">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-bold text-ink-500 transition hover:text-brand-700"
        >
          <IconArrow className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Kembali ke beranda
        </Link>

        <div className="mt-6 max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            Jadwalkan jemput
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
            Isi datanya, kami konfirmasi lewat WhatsApp dalam 15 menit.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <form onSubmit={handleSubmit} noValidate className="card relative p-6 sm:p-8">
            <ErrorSummary
              id="booking-errors"
              message={
                errorCount
                  ? `${errorCount} data perlu diperbaiki sebelum dikirim.`
                  : null
              }
            />

            {submitError && (
              <div
                role="alert"
                className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800"
              >
                <span>
                  {submitError === 'offline'
                    ? 'Koneksi bermasalah. Periksa jaringan lalu coba lagi.'
                    : 'Gagal mengirim jadwal. Coba lagi.'}
                </span>
                <span className="text-xs font-normal">Coba lagi →</span>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nama lengkap" htmlFor="bk-name" error={errorMessage('name')}>
                {({ describedBy, invalid }) => (
                  <input
                    id="bk-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={80}
                    className="field-input"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    placeholder="Mis. Sari Rahmawati"
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                  />
                )}
              </Field>

              <Field label="Nomor WhatsApp" htmlFor="bk-phone" error={errorMessage('phone')}>
                {({ describedBy, invalid }) => (
                  <input
                    id="bk-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={24}
                    className="field-input"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    placeholder="081234567890"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                  />
                )}
              </Field>

              <Field
                label="Alamat jemput"
                htmlFor="bk-address"
                hint="Patokan bikin kami cepat nyampe."
                error={errorMessage('address')}
                className="sm:col-span-2"
              >
                {({ describedBy, invalid }) => (
                  <textarea
                    id="bk-address"
                    name="address"
                    rows={3}
                    maxLength={200}
                    className="field-input resize-y"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    placeholder="Nama jalan, nomor rumah, patokan"
                    value={form.address}
                    onChange={(e) => setField('address', e.target.value)}
                  />
                )}
              </Field>

              <Field label="Jenis layanan" htmlFor="bk-service" error={errorMessage('service')}>
                {({ describedBy, invalid }) => (
                  <select
                    id="bk-service"
                    name="service"
                    className="field-input"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    value={form.service}
                    onChange={(e) => setField('service', e.target.value)}
                  >
                    {['kiloan', 'satuan', 'setrika'].map((code) => (
                      <option key={code} value={code}>
                        {SERVICE_LABELS[code]}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field
                label="Paket"
                htmlFor="bk-pack"
                hint="Paket menyesuaikan jenis layanan yang dipilih."
                error={errorMessage('pack')}
              >
                {({ describedBy, invalid }) => (
                  <select
                    id="bk-pack"
                    name="pack"
                    className="field-input"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    value={form.pack}
                    onChange={(e) => setField('pack', e.target.value)}
                  >
                    {packs.map((code) => (
                      <option key={code} value={code}>
                        {PACK_LABELS[code]}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field label={amountLabel} htmlFor="bk-amount" error={errorMessage('amount')}>
                {({ describedBy, invalid }) => (
                  <input
                    id="bk-amount"
                    name="amount"
                    type="text"
                    inputMode="decimal"
                    maxLength={8}
                    className="field-input"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    placeholder={amountPlaceholder}
                    value={form.amount}
                    onChange={(e) => setField('amount', e.target.value)}
                  />
                )}
              </Field>

              <Field label="Tanggal jemput" htmlFor="bk-date" error={errorMessage('date')}>
                {({ describedBy, invalid }) => (
                  <input
                    id="bk-date"
                    name="date"
                    type="date"
                    min={todayISO()}
                    max={maxDateISO()}
                    className="field-input"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    value={form.date}
                    onChange={(e) => setField('date', e.target.value)}
                  />
                )}
              </Field>

              <Field label="Jam jemput" error={errorMessage('time')} className="sm:col-span-2">
                {({ describedBy, invalid, labelId }) => (
                  <div
                    role="group"
                    aria-labelledby={labelId}
                    aria-describedby={describedBy}
                    className="flex flex-wrap gap-2"
                  >
                    {SLOTS.map((slot) => {
                      const active = form.time === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setField('time', slot)}
                          className={`num inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-sm font-bold transition ${
                            active
                              ? 'border-brand-700 bg-brand-700 text-white shadow-[0_10px_20px_-12px_rgba(29,78,216,0.9)]'
                              : 'border-ink-200 bg-white text-ink-700 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700'
                          } ${invalid && !form.time ? 'border-red-400' : ''}`}
                        >
                          <IconClock className="h-4 w-4" />
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                )}
              </Field>

              <Field
                label="Catatan (opsional)"
                htmlFor="bk-notes"
                error={errorMessage('notes')}
                className="sm:col-span-2"
              >
                {({ describedBy, invalid }) => (
                  <textarea
                    id="bk-notes"
                    name="notes"
                    rows={2}
                    maxLength={500}
                    className="field-input resize-y"
                    data-invalid={invalid}
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    placeholder="Mis. tanpa pewangi, pisahkan handuk"
                    value={form.notes}
                    onChange={(e) => setField('notes', e.target.value)}
                  />
                )}
              </Field>
            </div>

            {/* Honeypot: tidak terlihat oleh manusia, diisi bot */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="bk-hp">Jangan diisi</label>
              <input
                id="bk-hp"
                name="honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setField('honeypot', e.target.value)}
              />
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-500">Data hanya dipakai untuk keperluan jemput-antar.</p>
              <button type="submit" disabled={submitting} className="btn-primary px-7 py-4">
                {submitting ? 'Mengirim…' : 'Konfirmasi jadwal'}
                {!submitting && <IconArrow className="h-4 w-4" />}
              </button>
            </div>
          </form>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div ref={summaryBoxRef} tabIndex={-1} className="card p-6 focus:outline-none sm:p-7">
              <h2 className="text-sm font-extrabold tracking-[0.14em] text-ink-900 uppercase">
                Ringkasan pesanan
              </h2>

              <dl className="mt-5 flex flex-col gap-3">
                {summaryRows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm text-ink-500">{row.label}</dt>
                    <dd className="num text-right text-sm font-bold text-ink-900">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 rounded-2xl bg-brand-50 p-4">
                <p className="text-xs font-bold text-brand-800">Estimasi total</p>
                <p className="num mt-1 text-3xl font-extrabold tracking-tight text-brand-800">
                  {calc.ok ? formatCurrency(calc.total) : '—'}
                </p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-ink-500">
                {calc.ok
                  ? 'Perkiraan berdasarkan data yang kamu isi. Timbang ulang di tempat, selisihnya kami kabari dulu.'
                  : 'Isi form di kiri untuk melihat estimasi.'}
              </p>

              <ul className="mt-5 flex flex-col gap-2 border-t border-ink-100 pt-5 text-xs text-ink-600">
                <li className="flex items-center gap-2">
                  <IconCalendar className="h-4 w-4 text-brand-600" />
                  Reguler selesai 1–2 hari
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="h-4 w-4 text-brand-600" strokeWidth={2.5} />
                  Antar-jemput gratis area tertentu
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
