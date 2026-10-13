/**
 * Mock data halaman Pemasukan — angka figma, konsisten piutang dari pesanan.js.
 * Total penerimaan lunas Rp24.800.000 · 312 baris · HEAD persis figma.
 */
import { piutang } from './pesanan'

export const TOTAL_PENERIMAAN = 24800000
export const LUNAS_COUNT = 312
export const AVG_PENERIMAAN = 79487

export const METHODS = [
  { id: 'qris', label: 'QRIS', amount: 12400000, pct: 50 },
  { id: 'transfer', label: 'Transfer bank', amount: 8060000, pct: 32.5 },
  { id: 'tunai', label: 'Tunai', amount: 4340000, pct: 17.5 },
]

export const METHOD_LABEL = Object.fromEntries(METHODS.map((m) => [m.id, m.label]))

/** Hari: 30 bar deterministik, Σ 24,8 juta. */
function makeDaily() {
  const weights = Array.from({ length: 30 }, (_, i) => 0.5 + ((i * 17) % 11) / 10)
  const sum = weights.reduce((a, b) => a + b, 0)
  const values = weights.map((w) => Math.round((w / sum) * 248) / 10)
  const drift = Math.round((248 - values.reduce((a, b) => a + b, 0)) * 10) / 10
  values[values.length - 1] = Math.round((values[values.length - 1] + drift) * 10) / 10
  return values.map((v, i) => ({ period: `${i + 1} Sep`, pemasukan: v }))
}

const MINGGU = [
  { period: '1–7 Sep', pemasukan: 5.2 },
  { period: '8–14 Sep', pemasukan: 5.6 },
  { period: '15–21 Sep', pemasukan: 5.1 },
  { period: '22–28 Sep', pemasukan: 6.4 },
  { period: '29–30 Sep', pemasukan: 2.5 },
]

const BULAN = [{ period: 'Sep', pemasukan: 24.8 }]

const BULAN_TAHUN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const TAHUN = BULAN_TAHUN.map((m) => ({ period: m, pemasukan: m === 'Sep' ? 24.8 : 0 }))

export const TREND = {
  Hari: makeDaily(),
  Minggu: MINGGU,
  Bulan: BULAN,
  Tahun: TAHUN,
}

export const TREND_TABS = ['Hari', 'Minggu', 'Bulan', 'Tahun']

/** 10 baris persis Figma. */
const HEAD = [
  { date: '30 Sep 2026', service: 'Laundry express', customer: 'Nadia Putri', ref: 'RI-09320', inv: 'INV-09320', method: 'qris', amount: 90000 },
  { date: '30 Sep 2026', service: 'Laundry kiloan', customer: 'Budi Santoso', ref: 'RI-09319', inv: 'INV-09319', method: 'tunai', amount: 64000 },
  { date: '29 Sep 2026', service: 'Bedcover', customer: 'Sinta Rahma', ref: 'RI-09318', inv: 'INV-09318', method: 'transfer', amount: 120000 },
  { date: '29 Sep 2026', service: 'Laundry express', customer: 'Fajar Nugroho', ref: 'RI-09315', inv: 'INV-09315', method: 'qris', amount: 60000 },
  { date: '28 Sep 2026', service: 'Cuci sepatu', customer: 'Maya Lestari', ref: 'RI-09314', inv: 'INV-09314', method: 'transfer', amount: 70000 },
  { date: '28 Sep 2026', service: 'Laundry kiloan', customer: 'Intan Permata', ref: 'RI-09312', inv: 'INV-09312', method: 'qris', amount: 80000 },
  { date: '27 Sep 2026', service: 'Laundry kiloan', customer: 'Laila Safitri', ref: 'RI-09310', inv: 'INV-09310', method: 'tunai', amount: 48000 },
  { date: '27 Sep 2026', service: 'Setrika saja', customer: 'Bayu Firmansyah', ref: 'RI-09309', inv: 'INV-09309', method: 'qris', amount: 25000 },
  { date: '26 Sep 2026', service: 'Laundry express', customer: 'Citra Anggraini', ref: 'RI-09308', inv: 'INV-09308', method: 'qris', amount: 45000 },
  { date: '26 Sep 2026', service: 'Jaket', customer: 'Yoga Prasetyo', ref: 'RI-09307', inv: 'INV-09307', method: 'tunai', amount: 25000 },
]

const TAIL_SERVICES = [
  { label: 'Laundry kiloan', price: 8000, unit: 'kg' },
  { label: 'Laundry express', price: 15000, unit: 'kg' },
  { label: 'Setrika saja', price: 5000, unit: 'kg' },
  { label: 'Bedcover', price: 60000, unit: 'item' },
  { label: 'Cuci sepatu', price: 35000, unit: 'item' },
  { label: 'Jaket', price: 25000, unit: 'item' },
  { label: 'Karpet kecil', price: 80000, unit: 'item' },
]

const TAIL_NAMA = [
  'Laila Safitri', 'Bayu Firmansyah', 'Citra Anggraini', 'Yoga Prasetyo', 'Wahyu Nugroho',
  'Lestari Dewi', 'Rangga Pratama', 'Vina Oktaviani', 'Hendra Gunawan', 'Putri Amelia',
  'Dian Kurnia', 'Arie Setiawan', 'Nia Ramadhani', 'Galih Saputro', 'Mira Andini',
]

const TAIL_DAYS = [25, 24, 23, 22, 21, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 5, 4, 3, 2, 1]
const METHOD_IDS = ['qris', 'tunai', 'transfer', 'qris', 'qris', 'tunai', 'transfer']

function makeTail() {
  const rows = []
  for (let i = 0; i < 302; i += 1) {
    const svc = TAIL_SERVICES[i % TAIL_SERVICES.length]
    const qty = svc.unit === 'kg' ? 3 + (i % 8) : 1 + (i % 3)
    const refNum = 9306 - i
    rows.push({
      date: `${TAIL_DAYS[i % TAIL_DAYS.length]} Sep 2026`,
      service: svc.label,
      customer: TAIL_NAMA[i % TAIL_NAMA.length],
      ref: `RI-0${refNum}`,
      inv: `INV-0${refNum}`,
      method: METHOD_IDS[i % METHOD_IDS.length],
      amount: qty * svc.price,
    })
  }
  // Force total = Rp24.800.000 (baris terakhir menyerap selisih)
  const sum = rows.reduce((s, r) => s + r.amount, 0) + HEAD.reduce((s, r) => s + r.amount, 0)
  rows[rows.length - 1].amount += TOTAL_PENERIMAAN - sum
  return rows
}

export const ROWS = [...HEAD, ...makeTail()]

export function sumAmounts(rows) {
  return rows.reduce((s, r) => s + r.amount, 0)
}

export function highestWeek() {
  return MINGGU.reduce((best, w) => (w.pemasukan > best.pemasukan ? w : best), MINGGU[0])
}

export const PIUTANG = piutang()

export function formatRp(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`
}

export function formatPct(value) {
  return `${value.toFixed(1).replace('.', ',')}%`
}

export const SERVICE_OPTIONS = [
  { value: 'semua', label: 'Semua layanan' },
  ...TAIL_SERVICES.map((s) => ({ value: s.label, label: s.label })),
]
