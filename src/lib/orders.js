/**
 * Penyimpanan pesanan (localStorage) + submit tersimulasi.
 * Semua akses storage dibungkus try/catch: storage diblokir bukan crash.
 */
import { normalizePhone } from './validation'

const STORAGE_KEY = 'rapiin.orders'
const MAX_ORDERS = 20

function storageAvailable() {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage)
  } catch {
    return false
  }
}

export function listOrders() {
  if (!storageAvailable()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeOrders(list) {
  if (!storageAvailable()) return false
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ORDERS)))
    return true
  } catch {
    return false
  }
}

export function getOrder(code) {
  if (!code) return null
  const wanted = String(code).trim().toUpperCase()
  return listOrders().find((o) => o.code === wanted) ?? null
}

function pad(n) {
  return String(n).padStart(2, '0')
}

/** RP-YYMMDD-XXXX; suffix dicek ulang biar tab lain nggak tabrakan. */
export function generateCode(at = new Date(), existing = null) {
  const taken = new Set((existing ?? listOrders()).map((o) => o.code))
  const stamp = `${String(at.getFullYear()).slice(2)}${pad(at.getMonth() + 1)}${pad(at.getDate())}`
  for (let i = 0; i < 50; i += 1) {
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, 'X')
    const code = `RP-${stamp}-${suffix}`
    if (!taken.has(code)) return code
  }
  return `RP-${stamp}-${Date.now().toString(36).toUpperCase().slice(-4)}`
}

export function createOrder(form, { total, price, unit, now = new Date() } = {}) {
  const code = generateCode(now)
  return {
    code,
    createdAt: now.toISOString(),
    name: String(form.name ?? '').trim(),
    phone: normalizePhone(form.phone),
    phoneRaw: String(form.phone ?? '').trim(),
    address: String(form.address ?? '').trim(),
    service: String(form.service ?? ''),
    pack: String(form.pack ?? ''),
    amount: Number(form.amount),
    unit: unit ?? 'kg',
    price: Number(price ?? 0),
    total: Number(total ?? 0),
    date: String(form.date ?? ''),
    time: String(form.time ?? ''),
    notes: String(form.notes ?? '').trim(),
    persisted: false,
  }
}

export function saveOrder(order) {
  if (!order?.code) return false
  const list = listOrders().filter((o) => o.code !== order.code)
  list.unshift(order)
  return writeOrders(list)
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function online() {
  if (typeof navigator === 'undefined') return true
  return navigator.onLine !== false
}

/**
 * Submit booking. Melempar {code: 'offline'|'fail'} bila gagal.
 * Peluang gagal 10% disengaja untuk menguji jalur retry.
 */
export async function submitOrder(form, meta = {}) {
  if (!online()) {
    await delay(250)
    throw { code: 'offline' }
  }

  await delay(600 + Math.random() * 600)

  if (Math.random() < 0.1) {
    throw { code: 'fail' }
  }

  const order = createOrder(form, meta)
  order.persisted = meta.skipPersist ? false : saveOrder(order)
  return order
}
