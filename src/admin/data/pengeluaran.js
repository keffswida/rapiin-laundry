/**
 * Mock data halaman Pengeluaran — 22 baris, angka figma, Σ Rp10.400.000.
 * Kategori alokasi konsisten Ringkasan (perawatan → Lainnya di donut).
 */

export const TOTAL_PENGELUARAN = 10400000
export const EXPENSE_COUNT = 22
export const RASIO_BIAYA = 41.9

export const CATEGORIES = [
  { id: 'gaji', label: 'Gaji karyawan', amount: 4800000, pct: 46.2 },
  { id: 'detergen', label: 'Detergen & bahan', amount: 2600000, pct: 25.0 },
  { id: 'listrik', label: 'Listrik & air', amount: 1800000, pct: 17.3 },
  { id: 'transport', label: 'Transportasi', amount: 800000, pct: 7.7 },
  { id: 'perawatan', label: 'Perawatan mesin', amount: 400000, pct: 3.8 },
]

export const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]))

export const CATEGORY_OPTIONS = [
  { value: 'semua', label: 'Semua kategori' },
  ...CATEGORIES.map((c) => ({ value: c.id, label: c.label })),
]

export const METODE_OPTIONS = [
  { value: 'semua', label: 'Semua metode' },
  { value: 'transfer', label: 'Transfer bank' },
  { value: 'tunai', label: 'Tunai' },
  { value: 'qris', label: 'QRIS' },
]

export const METHOD_LABEL = {
  transfer: 'Transfer bank',
  tunai: 'Tunai',
  qris: 'QRIS',
}

/** Hari: 30 bar deterministik, Σ 10,4 juta. */
function makeDaily() {
  const weights = Array.from({ length: 30 }, (_, i) => 0.4 + ((i * 13) % 9) / 10)
  const sum = weights.reduce((a, b) => a + b, 0)
  const values = weights.map((w) => Math.round((w / sum) * 104) / 10)
  const drift = Math.round((104 - values.reduce((a, b) => a + b, 0)) * 10) / 10
  values[values.length - 1] = Math.round((values[values.length - 1] + drift) * 10) / 10
  return values.map((v, i) => ({ period: `${i + 1} Sep`, pengeluaran: v }))
}

const MINGGU = [
  { period: '1–7 Sep', pengeluaran: 2.1 },
  { period: '8–14 Sep', pengeluaran: 2.3 },
  { period: '15–21 Sep', pengeluaran: 2.0 },
  { period: '22–28 Sep', pengeluaran: 2.8 },
  { period: '29–30 Sep', pengeluaran: 1.2 },
]

const BULAN = [{ period: 'Sep', pengeluaran: 10.4 }]

const BULAN_TAHUN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const TAHUN = BULAN_TAHUN.map((m) => ({ period: m, pengeluaran: m === 'Sep' ? 10.4 : 0 }))

export const TREND = {
  Hari: makeDaily(),
  Minggu: MINGGU,
  Bulan: BULAN,
  Tahun: TAHUN,
}

export const TREND_TABS = ['Hari', 'Minggu', 'Bulan', 'Tahun']

/** 10 baris persis Figma (EX-09300 … EX-09291). */
const HEAD = [
  { date: '30 Sep 2026', ref: 'EX-09300', desc: 'Servis pengering · tahap akhir', category: 'perawatan', method: 'transfer', amount: 200000 },
  { date: '30 Sep 2026', ref: 'EX-09299', desc: 'Pengisian air operasional', category: 'listrik', method: 'tunai', amount: 190000 },
  { date: '30 Sep 2026', ref: 'EX-09298', desc: 'Pembelian detergen', category: 'detergen', method: 'qris', amount: 260000 },
  { date: '29 Sep 2026', ref: 'EX-09297', desc: 'Tagihan listrik & air', category: 'listrik', method: 'transfer', amount: 450000 },
  { date: '29 Sep 2026', ref: 'EX-09296', desc: 'Bensin antar-jemput cucian', category: 'transport', method: 'tunai', amount: 100000 },
  { date: '28 Sep 2026', ref: 'EX-09295', desc: 'Gaji staf · minggu ke-4', category: 'gaji', method: 'transfer', amount: 1200000 },
  { date: '27 Sep 2026', ref: 'EX-09294', desc: 'Detergen, pewangi dan kemasan', category: 'detergen', method: 'transfer', amount: 740000 },
  { date: '26 Sep 2026', ref: 'EX-09293', desc: 'Listrik & air · minggu ke-4', category: 'listrik', method: 'transfer', amount: 360000 },
  { date: '25 Sep 2026', ref: 'EX-09292', desc: 'Biaya antar-jemput mingguan', category: 'transport', method: 'tunai', amount: 300000 },
  { date: '24 Sep 2026', ref: 'EX-09291', desc: 'Pemeriksaan mesin pengering', category: 'perawatan', method: 'transfer', amount: 200000 },
]

/** Tail 12 baris: per kategori melengkapi alokasi figma (Σ Rp6.400.000). */
const TAIL = [
  { date: '23 Sep 2026', ref: 'EX-09290', desc: 'Gaji staf · minggu ke-3', category: 'gaji', method: 'transfer', amount: 1200000 },
  { date: '21 Sep 2026', ref: 'EX-09289', desc: 'Detergen konsentrat 20 liter', category: 'detergen', method: 'transfer', amount: 800000 },
  { date: '19 Sep 2026', ref: 'EX-09288', desc: 'Tagihan listrik pekan ketiga', category: 'listrik', method: 'transfer', amount: 450000 },
  { date: '17 Sep 2026', ref: 'EX-09287', desc: 'Ongkos antar wilayah', category: 'transport', method: 'tunai', amount: 200000 },
  { date: '16 Sep 2026', ref: 'EX-09286', desc: 'Gaji staf · minggu ke-2', category: 'gaji', method: 'transfer', amount: 1200000 },
  { date: '14 Sep 2026', ref: 'EX-09285', desc: 'Pewangi dan plastik kemas', category: 'detergen', method: 'qris', amount: 500000 },
  { date: '12 Sep 2026', ref: 'EX-09284', desc: 'Perbaikan pipa air', category: 'listrik', method: 'tunai', amount: 250000 },
  { date: '10 Sep 2026', ref: 'EX-09283', desc: 'Servis motor antar-jemput', category: 'transport', method: 'tunai', amount: 120000 },
  { date: '9 Sep 2026', ref: 'EX-09282', desc: 'Gaji staf · minggu ke-1', category: 'gaji', method: 'transfer', amount: 1200000 },
  { date: '7 Sep 2026', ref: 'EX-09281', desc: 'Karung detergen satuan', category: 'detergen', method: 'tunai', amount: 300000 },
  { date: '5 Sep 2026', ref: 'EX-09280', desc: 'Isi ulang galon operasional', category: 'listrik', method: 'tunai', amount: 100000 },
  { date: '3 Sep 2026', ref: 'EX-09279', desc: 'Bensin antar-jemput awal bulan', category: 'transport', method: 'qris', amount: 80000 },
]

export const EXPENSES = [...HEAD, ...TAIL]

export function sumAmounts(rows) {
  return rows.reduce((s, r) => s + r.amount, 0)
}

export function highestWeek() {
  return MINGGU.reduce((best, w) => (w.pengeluaran > best.pengeluaran ? w : best), MINGGU[0])
}

export function formatRp(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`
}

export function formatPct(value) {
  return `${value.toFixed(1).replace('.', ',')}%`
}
