/** Format Indonesia (id-ID) untuk mata uang, angka, dan tanggal. */

export function formatCurrency(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  const body = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(Math.round(n))
  return `Rp ${body}`
}

export function formatNumber(value) {
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(n)
}

/** date bisa berupa Date atau string YYYY-MM-DD / ISO. */
export function formatDate(date, opts) {
  let d
  if (date instanceof Date) {
    d = date
  } else if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    // String tanggal polos ditafsirkan sebagai tanggal lokal, bukan UTC
    const [y, m, day] = date.split('-').map(Number)
    d = new Date(y, m - 1, day)
  } else {
    d = new Date(date)
  }
  if (Number.isNaN(d.getTime())) return '—'
  const options = opts ?? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  return new Intl.DateTimeFormat('id-ID', options).format(d)
}

/** 'YYYY-MM-DD' lokal (bukan UTC) untuk input type="date". */
export function toInputDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
