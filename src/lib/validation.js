import { estimate, isPackageAvailable, isService, LIMITS } from './pricing'
import { toInputDate } from './format'

export const OPEN_HOUR = 6
export const CLOSE_HOUR = 21
export const MAX_DAYS_AHEAD = 14
/** Slot jam jemput (dalam jam). Sama dengan label di kamus `booking.slots`. */
export const SLOT_HOURS = [6, 8, 10, 12, 14, 16, 18, 20]

const PHONE_RE = /^\+628[1-9][0-9]{6,11}$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** 0812 3456 7890 / 62812-3456-7890 / +62 812 3456 7890 -> +6281234567890 */
export function normalizePhone(input) {
  const raw = String(input ?? '').trim()
  if (!raw) return ''
  const hasPlus = raw.startsWith('+')
  const digits = raw.replace(/\D/g, '')
  if (!digits) return hasPlus ? '+' : ''
  if (digits.startsWith('62')) return `+${digits}`
  if (digits.startsWith('0')) return `+62${digits.slice(1)}`
  if (digits.startsWith('8')) return `+62${digits}`
  return `+${digits}`
}

export function isValidPhone(input) {
  return PHONE_RE.test(normalizePhone(input))
}

/** '08.00' | '08:00' -> 8. Bukan slot valid -> null. */
export function slotHour(value) {
  const m = /^(\d{1,2})[.:](\d{2})$/.exec(String(value ?? '').trim())
  if (!m) return null
  const hour = Number(m[1])
  const minute = Number(m[2])
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null
  if (minute !== 0) return null
  return hour
}

export function parseDate(value) {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return null
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null
  return date
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/**
 * Validasi form booking.
 * @returns {{errors: Record<string, {code: string, vars?: object}>, valid: boolean, spam: boolean}}
 */
export function validateBooking(form, { now = new Date() } = {}) {
  const errors = {}
  const put = (field, code, vars) => {
    errors[field] = vars ? { code, vars } : { code }
  }

  const value = (key) => (form?.[key] == null ? '' : String(form[key]))
  const notes = value('notes').trim()

  // Nama
  const name = value('name').trim()
  if (!name) put('name', 'required')
  else if (name.length < 2) put('name', 'name_min')
  else if (name.length > 80) put('name', 'name_max')
  else if (/^\d+$/.test(name)) put('name', 'name_invalid')

  // Telepon
  const phone = value('phone').trim()
  if (!phone) put('phone', 'required')
  else if (!isValidPhone(phone)) put('phone', 'phone_invalid')

  // Alamat
  const address = value('address').trim()
  if (!address) put('address', 'required')
  else if (address.length < 10) put('address', 'address_min')
  else if (address.length > 200) put('address', 'address_long')

  // Layanan & paket
  const service = value('service')
  const pack = value('pack')
  if (!service) put('service', 'required')
  else if (!isService(service)) put('service', 'required')

  if (!pack) put('pack', 'required')
  else if (service && !isPackageAvailable(service, pack)) put('pack', 'package_mismatch')

  // Berat / jumlah item
  const amount = value('amount')
  if (!amount.trim()) {
    put('amount', 'required')
  } else {
    const result = estimate({ service, pack, amount })
    if (!result.ok && result.code !== 'required' && result.code !== 'package_mismatch') {
      put('amount', result.code, result.vars)
    } else if (!result.ok && result.code === 'package_mismatch') {
      put('pack', 'package_mismatch')
    }
  }

  // Tanggal
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const dateStr = value('date')
  let picked = null
  if (!dateStr) {
    put('date', 'required')
  } else {
    picked = parseDate(dateStr)
    if (!picked) {
      put('date', 'date_invalid')
    } else if (picked < today) {
      put('date', 'date_past')
    } else {
      const limit = new Date(today)
      limit.setDate(limit.getDate() + MAX_DAYS_AHEAD)
      if (picked > limit) put('date', 'date_far', { max: MAX_DAYS_AHEAD })
    }
  }

  // Jam
  const timeStr = value('time')
  if (!timeStr) {
    put('time', 'required')
  } else {
    const hour = slotHour(timeStr)
    if (hour == null || hour < OPEN_HOUR || hour >= CLOSE_HOUR) {
      put('time', 'time_closed')
    } else if (!SLOT_HOURS.includes(hour)) {
      put('time', 'time_closed')
    } else if (picked && sameDay(picked, now) && hour <= now.getHours()) {
      put('time', 'time_past')
    }
  }

  // Catatan
  if (notes.length > 500) put('notes', 'note_long')

  // Honeypot: bot mengisi -> dianggap sukses palsu oleh pemanggil
  const spam = value('honeypot').trim() !== ''

  return { errors, valid: Object.keys(errors).length === 0, spam }
}

export function validateAmountOnly(form) {
  return estimate({
    service: form?.service,
    pack: form?.pack,
    amount: form?.amount,
  })
}

export function limitsFor(service) {
  return LIMITS[service] ?? null
}

export const todayISO = () => toInputDate(new Date())
export const maxDateISO = () => {
  const d = new Date()
  d.setDate(d.getDate() + MAX_DAYS_AHEAD)
  return toInputDate(d)
}
