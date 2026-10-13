/**
 * Mock data halaman Pelanggan — 286 baris deterministik, sesuai angka Figma.
 * 218 aktif (72 baru + 146 kembali) + 68 nonaktif.
 */

const PREFIX = ['0812', '0813', '0821', '0822', '0856', '0857', '0811', '0838']

const DEPAN = [
  'Adi', 'Bella', 'Candra', 'Dewi', 'Erik', 'Farah', 'Galih', 'Hana', 'Ilham', 'Jihan',
  'Krisna', 'Lia', 'Miko', 'Nanda', 'Oscar', 'Putri', 'Qori', 'Rendi', 'Sari', 'Tio',
  'Ucup', 'Vera', 'Wawan', 'Yuni', 'Zaki',
]
const BELAKANG = [
  'Wijaya', 'Saputra', 'Lestari', 'Pratama', 'Ramadhan', 'Anggraini', 'Nugroho', 'Permata',
  'Hidayat', 'Kusuma', 'Setiawan', 'Melati', 'Prasetyo', 'Handayani', 'Maulana',
]

const MONTHS = { Sep: 9, Agu: 8, Jul: 7 }

function ts(date) {
  // "30 Sep 2026" -> angka urut
  const [d, m, y] = date.split(' ')
  return Number(y) * 10000 + (MONTHS[m] ?? 0) * 100 + Number(d)
}

function maskPhone(code, i) {
  return `${PREFIX[i % PREFIX.length]}-••••-${code.slice(-4)}`
}

/** 10 baris persis Figma. */
const HEAD = [
  { code: 'PL-0218', name: 'Nadia Putri', phonePrefix: '0812', orders: 3, spend: 270000, lastOrder: '30 Sep 2026', status: 'baru' },
  { code: 'PL-0042', name: 'Budi Santoso', phonePrefix: '0813', orders: 18, spend: 1152000, lastOrder: '30 Sep 2026', status: 'kembali' },
  { code: 'PL-0107', name: 'Sinta Rahma', phonePrefix: '0857', orders: 9, spend: 840000, lastOrder: '29 Sep 2026', status: 'kembali' },
  { code: 'PL-0184', name: 'Dimas Saputra', phonePrefix: '0821', orders: 1, spend: 40000, lastOrder: '29 Sep 2026', status: 'baru' },
  { code: 'PL-0061', name: 'Rani Wulandari', phonePrefix: '0812', orders: 12, spend: 510000, lastOrder: '29 Sep 2026', status: 'kembali' },
  { code: 'PL-0155', name: 'Fajar Nugroho', phonePrefix: '0856', orders: 5, spend: 360000, lastOrder: '29 Sep 2026', status: 'kembali' },
  { code: 'PL-0093', name: 'Maya Lestari', phonePrefix: '0813', orders: 8, spend: 560000, lastOrder: '28 Sep 2026', status: 'kembali' },
  { code: 'PL-0196', name: 'Rizky Maulana', phonePrefix: '0822', orders: 2, spend: 104000, lastOrder: '28 Sep 2026', status: 'baru' },
  { code: 'PL-0026', name: 'Intan Permata', phonePrefix: '0857', orders: 24, spend: 1920000, lastOrder: '28 Sep 2026', status: 'kembali' },
  { code: 'PL-0132', name: 'Agus Setiawan', phonePrefix: '0812', orders: 7, spend: 420000, lastOrder: '28 Sep 2026', status: 'kembali' },
]

const HEAD_CODES = new Set(HEAD.map((h) => h.code))

const SEP_DAYS = [27, 26, 25, 24, 23, 22, 21, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 5, 4, 3, 2, 1]
const OLD_DAYS = [
  { d: 30, m: 'Agu', y: 2026 }, { d: 25, m: 'Agu', y: 2026 }, { d: 18, m: 'Agu', y: 2026 },
  { d: 9, m: 'Agu', y: 2026 }, { d: 2, m: 'Agu', y: 2026 }, { d: 27, m: 'Jul', y: 2026 },
  { d: 15, m: 'Jul', y: 2026 }, { d: 6, m: 'Jul', y: 2026 },
]

function tailCodes() {
  const out = []
  for (let n = 1; n <= 320 && out.length < 276; n += 1) {
    const code = `PL-${String(n).padStart(4, '0')}`
    if (!HEAD_CODES.has(code)) out.push(code)
  }
  return out
}

function makeTail() {
  const codes = tailCodes()
  const rows = []
  // Urutan: 69 baru aktif, 139 kembali aktif, 68 nonaktif
  const plan = [
    ...Array.from({ length: 69 }, () => 'baru'),
    ...Array.from({ length: 139 }, () => 'kembali'),
    ...Array.from({ length: 68 }, () => 'nonaktif'),
  ]
  for (let i = 0; i < 276; i += 1) {
    const code = codes[i]
    const status = plan[i]
    const name = `${DEPAN[i % DEPAN.length]} ${BELAKANG[(i * 3) % BELAKANG.length]}`
    const orders = status === 'nonaktif' ? 1 + ((i * 5) % 12) : 1 + ((i * 7) % 24)
    const spend = orders * (15000 + (i % 5) * 5000)
    const lastOrder =
      status === 'nonaktif'
        ? (({ d, m, y }) => `${d} ${m} ${y}`)(OLD_DAYS[i % OLD_DAYS.length])
        : `${SEP_DAYS[i % SEP_DAYS.length]} Sep 2026`
    rows.push({
      code,
      name,
      phone: maskPhone(code, i),
      orders,
      spend,
      lastOrder,
      lastTs: ts(lastOrder),
      status,
      active: status !== 'nonaktif',
    })
  }
  return rows
}

export const CUSTOMERS = [
  ...HEAD.map((h) => ({
    ...h,
    phone: maskPhone(h.code, PREFIX.indexOf(h.phonePrefix)),
    lastTs: ts(h.lastOrder),
    active: true,
  })),
  ...makeTail(),
]

export function countBy(field, value) {
  return CUSTOMERS.filter((c) => c[field] === value).length
}

export const COUNTS = {
  total: CUSTOMERS.length,
  aktif: countBy('active', true),
  baru: CUSTOMERS.filter((c) => c.active && c.status === 'baru').length,
  kembali: CUSTOMERS.filter((c) => c.active && c.status === 'kembali').length,
  nonaktif: countBy('active', false),
}

export function formatRp(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`
}

export function formatDec(value, digits = 2) {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

export const STATUS_LABEL = {
  baru: 'Baru',
  kembali: 'Kembali',
  nonaktif: 'Nonaktif',
}
