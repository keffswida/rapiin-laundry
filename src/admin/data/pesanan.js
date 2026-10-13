/**
 * Mock data halaman Pesanan — 320 baris, deterministik, sesuai angka Figma.
 * Integrasi pesanan asli (lib/orders.js) menyusul di fase berikutnya.
 */

const SERVICES = [
  { label: 'Laundry kiloan', unit: 'kg', price: 8000 },
  { label: 'Laundry express', unit: 'kg', price: 15000 },
  { label: 'Setrika saja', unit: 'kg', price: 5000 },
  { label: 'Bedcover', unit: 'item', price: 60000 },
  { label: 'Cuci sepatu', unit: 'item', price: 35000 },
]

const NAMA = [
  'Agus Setiawan', 'Budi Hartono', 'Citra Dewi', 'Dian Permata', 'Eko Prasetyo',
  'Fitri Handayani', 'Galih Ramadhan', 'Hesti Wulandari', 'Irfan Maulana', 'Joko Susilo',
  'Kartika Sari', 'Lukman Hakim', 'Maya Putri', 'Nanda Saputra', 'Oki Wijaya',
  'Putri Anggraini', 'Rizky Nugraha', 'Sari Melati', 'Taufik Hidayat', 'Umi Kalsum',
  'Vino Bastian', 'Wahyu Setiawan', 'Xena Prameswari', 'Yoga Permana', 'Zahra Aulia',
]

const MONTH = 'Sep 2026'
const DAYS = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 18, 17, 16, 15, 14, 13]
const TIMES = ['09.15', '08.40', '16.20', '15.10', '13.45', '11.30', '17.00', '14.25', '10.15', '09.30']

function makeRow(id, i, overrides = {}) {
  const svc = SERVICES[i % SERVICES.length]
  const amount = svc.unit === 'kg' ? 3 + (i % 8) : 1 + (i % 3)
  const total = amount * svc.price
  return {
    id: `RI-0${9320 - id}`,
    date: `${DAYS[i % DAYS.length]} ${MONTH}`,
    time: TIMES[i % TIMES.length],
    customer: NAMA[i % NAMA.length],
    customerCode: `PL-${String((i * 37) % 220 + 1).padStart(4, '0')}`,
    service: svc.label,
    amount,
    unit: svc.unit,
    total,
    payment: 'lunas',
    status: 'selesai',
    ...overrides,
  }
}

/** 10 baris persis Figma + 5 baris aktif sisanya (3 baru, 6 diproses, 3 siap diambil). */
const HEAD = [
  makeRow(0, 0, { customer: 'Nadia Putri', customerCode: 'PL-0218', service: 'Laundry express', amount: 6, total: 90000, status: 'siap-diambil', date: `30 ${MONTH}` }),
  makeRow(1, 1, { customer: 'Budi Santoso', customerCode: 'PL-0042', service: 'Laundry kiloan', amount: 8, total: 64000, status: 'diproses', date: `30 ${MONTH}` }),
  makeRow(2, 2, { customer: 'Sinta Rahma', customerCode: 'PL-0107', service: 'Bedcover', amount: 2, unit: 'item', total: 120000, status: 'selesai', date: `29 ${MONTH}` }),
  makeRow(3, 3, { customer: 'Dimas Saputra', customerCode: 'PL-0184', service: 'Laundry kiloan', amount: 5, total: 40000, status: 'baru', payment: 'belum-lunas', date: `29 ${MONTH}` }),
  makeRow(4, 4, { customer: 'Rani Wulandari', customerCode: 'PL-0061', service: 'Setrika saja', amount: 6, total: 30000, status: 'siap-diambil', payment: 'belum-lunas', date: `29 ${MONTH}` }),
  makeRow(5, 5, { customer: 'Fajar Nugroho', customerCode: 'PL-0155', service: 'Laundry express', amount: 4, total: 60000, status: 'diproses', date: `29 ${MONTH}` }),
  makeRow(6, 6, { customer: 'Maya Lestari', customerCode: 'PL-0093', service: 'Cuci sepatu', amount: 2, unit: 'item', total: 70000, status: 'selesai', date: `28 ${MONTH}` }),
  makeRow(7, 7, { customer: 'Rizky Maulana', customerCode: 'PL-0196', service: 'Laundry kiloan', amount: 7, total: 56000, status: 'baru', payment: 'belum-lunas', date: `28 ${MONTH}` }),
  makeRow(8, 8, { customer: 'Intan Permata', customerCode: 'PL-0026', service: 'Laundry kiloan', amount: 10, total: 80000, status: 'selesai', date: `28 ${MONTH}` }),
  makeRow(9, 9, { customer: 'Agus Setiawan', customerCode: 'PL-0132', service: 'Bedcover', amount: 1, unit: 'item', total: 60000, status: 'diproses', payment: 'belum-lunas', date: `28 ${MONTH}` }),
  // Sisa aktif (12 aktif = 3 baru + 6 diproses + 3 siap diambil)
  makeRow(10, 10, { customer: 'Wahyu Nugroho', customerCode: 'PL-0088', service: 'Laundry kiloan', amount: 10, total: 80000, status: 'baru', payment: 'belum-lunas', date: `27 ${MONTH}` }),
  makeRow(11, 11, { customer: 'Lestari Dewi', customerCode: 'PL-0142', service: 'Laundry express', amount: 4, total: 60000, status: 'diproses', date: `27 ${MONTH}` }),
  makeRow(12, 12, { customer: 'Rangga Pratama', customerCode: 'PL-0173', service: 'Laundry kiloan', amount: 6, total: 48000, status: 'diproses', date: `27 ${MONTH}` }),
  makeRow(13, 13, { customer: 'Vina Oktaviani', customerCode: 'PL-0059', service: 'Setrika saja', amount: 5, total: 25000, status: 'diproses', date: `27 ${MONTH}` }),
  makeRow(14, 14, { customer: 'Hendra Gunawan', customerCode: 'PL-0119', service: 'Bedcover', amount: 1, unit: 'item', total: 60000, status: 'siap-diambil', date: `26 ${MONTH}` }),
]

/** Selesai 305 baris (09305 … 09001); 3 di antaranya belum lunas (piutang total Rp480.000). */
const TAIL_UNPAID = { 0: 90000, 2: 60000, 304: 64000 }

function makeTail() {
  const rows = []
  for (let k = 0; k < 305; k += 1) {
    const id = 15 + k // offset global
    const total = TAIL_UNPAID[k]
    const row = makeRow(id, id)
    if (total) {
      // Samakan total dengan nilai piutang yang ditetapkan
      const svc = row.unit === 'kg'
        ? SERVICES.find((s) => s.price * Math.round(total / s.price) === total && s.unit === 'kg')
        : SERVICES.find((s) => s.price * Math.round(total / s.price) === total && s.unit === 'item')
      const use = svc ?? SERVICES[0]
      const amount = Math.round(total / use.price)
      row.service = use.label
      row.amount = amount
      row.unit = use.unit
      row.total = amount * use.price
      row.payment = 'belum-lunas'
    }
    rows.push(row)
  }
  return rows
}

/** 320 baris, terbaru (ID terbesar) di atas. */
export const ORDERS = [...HEAD, ...makeTail()]

export function countBy(field, value) {
  return ORDERS.filter((o) => o[field] === value).length
}

export const COUNTS = {
  total: ORDERS.length,
  baru: countBy('status', 'baru'),
  diproses: countBy('status', 'diproses'),
  siap: countBy('status', 'siap-diambil'),
  selesai: countBy('status', 'selesai'),
}

export function piutang() {
  const unpaid = ORDERS.filter((o) => o.payment === 'belum-lunas')
  return { count: unpaid.length, sum: unpaid.reduce((s, o) => s + o.total, 0) }
}

export function formatRp(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`
}

export const STATUS_LABEL = {
  baru: 'Baru',
  diproses: 'Diproses',
  'siap-diambil': 'Siap diambil',
  selesai: 'Selesai',
}

export const PAYMENT_LABEL = {
  lunas: 'Lunas',
  'belum-lunas': 'Belum lunas',
}
