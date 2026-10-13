/**
 * Mock data halaman Layanan & Harga — 8 baris persis Figma.
 * Katalog statis; pesanan memakai harga pada saat pesanan dibuat.
 */

export const SERVICES_CATALOG = [
  {
    id: 'kiloan',
    name: 'Laundry kiloan',
    desc: 'Cuci, kering, setrika dan kemas rapi.',
    jenis: 'kiloan',
    satuan: 'per kg',
    price: 8000,
    eta: '3 hari',
    active: true,
  },
  {
    id: 'express',
    name: 'Laundry express',
    desc: 'Layanan prioritas cuci, kering dan setrika.',
    jenis: 'kiloan',
    satuan: 'per kg',
    price: 15000,
    eta: '24 jam',
    active: true,
  },
  {
    id: 'setrika',
    name: 'Setrika saja',
    desc: 'Setrika pakaian bersih, lipat dan kemas.',
    jenis: 'kiloan',
    satuan: 'per kg',
    price: 5000,
    eta: '2 hari',
    active: true,
  },
  {
    id: 'bedcover',
    name: 'Bedcover',
    desc: 'Cuci bedcover ukuran single hingga king.',
    jenis: 'satuan',
    satuan: 'per item',
    price: 60000,
    eta: '4 hari',
    active: true,
  },
  {
    id: 'sepatu',
    name: 'Cuci sepatu',
    desc: 'Pembersihan sepatu dan pengeringan aman.',
    jenis: 'satuan',
    satuan: 'per item',
    price: 35000,
    eta: '3 hari',
    active: true,
  },
  {
    id: 'jaket',
    name: 'Jaket',
    desc: 'Cuci jaket non-kulit dengan perawatan khusus.',
    jenis: 'satuan',
    satuan: 'per item',
    price: 25000,
    eta: '3 hari',
    active: true,
  },
  {
    id: 'karpet',
    name: 'Karpet kecil',
    desc: 'Cuci karpet berukuran maksimal 1 × 2 meter.',
    jenis: 'satuan',
    satuan: 'per item',
    price: 80000,
    eta: '5 hari',
    active: true,
  },
  {
    id: 'gorden',
    name: 'Gorden',
    desc: 'Pencucian gorden per panel, tanpa pemasangan.',
    jenis: 'satuan',
    satuan: 'per item',
    price: 30000,
    eta: '4 hari',
    active: false,
  },
]

export const COUNTS = {
  total: SERVICES_CATALOG.length,
  aktif: SERVICES_CATALOG.filter((s) => s.active).length,
  nonaktif: SERVICES_CATALOG.filter((s) => !s.active).length,
  kiloan: SERVICES_CATALOG.filter((s) => s.jenis === 'kiloan' && s.active).length,
  satuan: SERVICES_CATALOG.filter((s) => s.jenis === 'satuan' && s.active).length,
}

/** Populer pada data mock (bukan turunan ORDERS — ORDERS tidak sebar 180/320). */
export const POPULAR = {
  id: 'kiloan',
  name: 'Laundry kiloan',
  orders: 180,
}

export function formatRp(value) {
  return `Rp${new Intl.NumberFormat('id-ID').format(value)}`
}

export const JENIS_LABEL = {
  kiloan: 'Kiloan',
  satuan: 'Satuan',
}
