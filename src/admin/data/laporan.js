/**
 * Mock data halaman Laporan — rekap figma, derive dari TREND pemasukan & pengeluaran.
 */
import { TREND as TREND_IN, TOTAL_PENERIMAAN, PIUTANG } from './pemasukan'
import { TREND as TREND_OUT, TOTAL_PENGELUARAN } from './pengeluaran'
import { COUNTS as ORDER_COUNTS } from './pesanan'
import { COUNTS as CUSTOMER_COUNTS } from './pelanggan'

export const LABA_BERSIH = TOTAL_PENERIMAAN - TOTAL_PENGELUARAN
export const MARGIN = (LABA_BERSIH / TOTAL_PENERIMAAN) * 100
export { TOTAL_PENERIMAAN, TOTAL_PENGELUARAN }

export const JENIS_OPTIONS = [
  { value: 'keuangan-operasional', label: 'Keuangan & operasional' },
  { value: 'keuangan', label: 'Keuangan saja' },
  { value: 'operasional', label: 'Operasional saja' },
]

export const GROUP_TABS = ['Hari', 'Minggu', 'Bulan', 'Tahun']

/** Minggu figma exact. */
const MINGGU_ROWS = [
  { period: '1–7 Sep 2026', income: 5200000, expense: 2100000, orders: 66, unik: 60 },
  { period: '8–14 Sep 2026', income: 5600000, expense: 2300000, orders: 72, unik: 64 },
  { period: '15–21 Sep 2026', income: 5100000, expense: 2000000, orders: 64, unik: 58 },
  { period: '22–28 Sep 2026', income: 6400000, expense: 2800000, orders: 82, unik: 72 },
  { period: '29–30 Sep 2026', income: 2500000, expense: 1200000, orders: 36, unik: 33 },
]

/** Distribusi 320 pesanan proporsional terhadap pemasukan, Σ persis 320. */
function distributeOrders(incomes) {
  const totalIncome = incomes.reduce((a, b) => a + b, 0)
  const raw = incomes.map((v) => (v / totalIncome) * ORDER_COUNTS.total)
  const orders = raw.map((v) => Math.floor(v))
  let rest = ORDER_COUNTS.total - orders.reduce((a, b) => a + b, 0)
  const byFrac = raw
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac)
  for (let k = 0; rest > 0; k += 1, rest -= 1) orders[byFrac[k % byFrac.length].i] += 1
  return orders
}

function buildHari() {
  const income = TREND_IN.Hari.map((d) => Math.round(d.pemasukan * 1000000))
  const expense = TREND_OUT.Hari.map((d) => Math.round(d.pengeluaran * 1000000))
  const orders = distributeOrders(income)
  return TREND_IN.Hari.map((d, i) => ({
    period: `${d.period} 2026`,
    income: income[i],
    expense: expense[i],
    orders: orders[i],
    unik: 12 + ((i * 7) % 28),
  }))
}

const BULAN_ROWS = [
  {
    period: 'Sep 2026',
    income: TOTAL_PENERIMAAN,
    expense: TOTAL_PENGELUARAN,
    orders: ORDER_COUNTS.total,
    unik: CUSTOMER_COUNTS.aktif,
  },
]

function buildTahun() {
  const nama = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  return nama.map((m) =>
    m === 'Sep'
      ? { ...BULAN_ROWS[0], period: `${m} 2026` }
      : { period: `${m} 2026`, income: 0, expense: 0, orders: 0, unik: 0 },
  )
}

export function buildRows(tab) {
  if (tab === 'Hari') return buildHari()
  if (tab === 'Bulan') return BULAN_ROWS
  if (tab === 'Tahun') return buildTahun()
  return MINGGU_ROWS
}

/** Data chart dual-series dari TREND pemasukan & pengeluaran. */
export function mergedSeries(tab) {
  const inc = TREND_IN[tab]
  const exp = TREND_OUT[tab]
  return inc.map((d, i) => ({
    period: d.period,
    pemasukan: d.pemasukan,
    pengeluaran: exp[i]?.pengeluaran ?? 0,
  }))
}

export const TOTAL_ROW = {
  period: 'Total September',
  income: TOTAL_PENERIMAAN,
  expense: TOTAL_PENGELUARAN,
  orders: ORDER_COUNTS.total,
  unik: CUSTOMER_COUNTS.aktif,
}

export const SERVICE_USAGE = [
  { label: 'Laundry kiloan', count: 180, pct: 56.3 },
  { label: 'Laundry express', count: 80, pct: 25.0 },
  { label: 'Laundry satuan', count: 40, pct: 12.5 },
  { label: 'Setrika saja', count: 20, pct: 6.2 },
]

export const USAGE_BANNER = `${CUSTOMER_COUNTS.kembali} pelanggan kembali (${((CUSTOMER_COUNTS.kembali / CUSTOMER_COUNTS.aktif) * 100).toFixed(1).replace('.', ',')}%). Rata-rata ${(ORDER_COUNTS.total / CUSTOMER_COUNTS.aktif).toFixed(2).replace('.', ',').replace(/,?0+$/, '')} pesanan per pelanggan aktif.`

export const EXPORTS = [
  {
    kind: 'PDF',
    title: 'Laporan keuangan & operasional · September 2026',
    meta: '30 Sep 2026 · 18.05 · Andi Pratama',
    status: 'Selesai',
  },
  {
    kind: 'XLSX',
    title: 'Rincian transaksi · September 2026',
    meta: '30 Sep 2026 · 18.02 · Andi Pratama',
    status: 'Selesai',
  },
]

export const PIUTANG_SUM = PIUTANG.sum

export function formatRp(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`
}

export function formatPct(value) {
  return `${value.toFixed(1).replace('.', ',')}%`
}

export function labaOf(row) {
  return row.income - row.expense
}

export function marginOf(row) {
  return row.income === 0 ? 0 : (labaOf(row) / row.income) * 100
}
