/** Mock data halaman Ringkasan — angka ilustrasi sesuai design Figma. */

export const KPIS = [
  {
    id: 'pemasukan',
    label: 'Total pemasukan',
    value: 'Rp24.800.000',
    hint: 'Pembayaran diterima',
    icon: 'income',
    to: '/admin/pemasukan',
  },
  {
    id: 'pengeluaran',
    label: 'Total pengeluaran',
    value: 'Rp10.400.000',
    hint: 'Biaya operasional dibayar',
    icon: 'expense',
    to: '/admin/pengeluaran',
  },
  {
    id: 'laba',
    label: 'Laba bersih',
    value: 'Rp14.400.000',
    hint: 'Margin laba 58,1%',
    icon: 'trend',
    highlight: true,
    // Tanpa rute — cukup cursor pointer (permintaan user).
  },
  {
    id: 'pesanan',
    label: 'Total pesanan',
    value: '320',
    hint: '308 selesai · 12 diproses',
    icon: 'orders',
    to: '/admin/pesanan',
  },
  {
    id: 'pelanggan',
    label: 'Pelanggan unik',
    value: '218',
    hint: '72 baru · 146 kembali',
    icon: 'customers',
    to: '/admin/pelanggan',
  },
]

/** Juta rupiah per minggu. Label pendek — bulan di subtitle chart. */
export const WEEKLY_SERIES = [
  { period: '1–7', pemasukan: 5.2, pengeluaran: 2.1 },
  { period: '8–14', pemasukan: 5.6, pengeluaran: 2.3 },
  { period: '15–21', pemasukan: 5.1, pengeluaran: 2.0 },
  { period: '22–28', pemasukan: 6.4, pengeluaran: 2.8 },
  { period: '29–30', pemasukan: 2.5, pengeluaran: 1.2 },
]

export const EXPENSE_BREAKDOWN = [
  { id: 'gaji', label: 'Gaji karyawan', amount: 'Rp4.800.000', percent: 46.2, color: '#c98a4a' },
  { id: 'deterjen', label: 'Deterjen & bahan', amount: 'Rp2.600.000', percent: 25.0, color: '#e0a062' },
  { id: 'listrik', label: 'Listrik & air', amount: 'Rp1.800.000', percent: 17.3, color: '#efc294' },
  { id: 'transport', label: 'Transportasi', amount: 'Rp800.000', percent: 7.7, color: '#f5dcbd' },
  { id: 'lainnya', label: 'Lainnya', amount: 'Rp400.000', percent: 3.8, color: '#d9d9e2' },
]

export const POPULAR_SERVICES = [
  { id: 'kiloan', label: 'Laundry kiloan', count: 180, percent: 56.3 },
  { id: 'ekspres', label: 'Laundry ekspres', count: 80, percent: 25.0 },
  { id: 'satuan', label: 'Laundry satuan', count: 40, percent: 12.5 },
  { id: 'setrika', label: 'Setrika saja', count: 20, percent: 6.2 },
]

export const LATEST_TRANSACTIONS = [
  {
    id: 't1',
    date: '30 Sep 2026',
    title: 'Nadia Putri',
    ref: 'RI-09320 · Laundry ekspres',
    type: 'income',
    amount: 'Rp90.000',
    status: 'Lunas',
  },
  {
    id: 't2',
    date: '30 Sep 2026',
    title: 'Pembelian deterjen',
    ref: 'EX-09028 · Deterjen & bahan',
    type: 'expense',
    amount: 'Rp260.000',
    status: 'Dibayar',
  },
  {
    id: 't3',
    date: '30 Sep 2026',
    title: 'Budi Santoso',
    ref: 'RI-09319 · Laundry kiloan',
    type: 'income',
    amount: 'Rp64.000',
    status: 'Lunas',
  },
  {
    id: 't4',
    date: '29 Sep 2026',
    title: 'Sinta Rahma',
    ref: 'RI-09318 · Laundry satuan',
    type: 'income',
    amount: 'Rp120.000',
    status: 'Lunas',
  },
  {
    id: 't5',
    date: '29 Sep 2026',
    title: 'Tagihan listrik & air',
    ref: 'EX-09027 · Listrik & air',
    type: 'expense',
    amount: 'Rp450.000',
    status: 'Dibayar',
  },
]

export const CHART_INSIGHT = 'Pemasukan tertinggi: 22–28 Sep · Rp6.400.000'
export const EXPENSE_TOTAL = 'Rp10.400.000'
export const EXPENSE_RATIO = '41,9% dari pemasukan'
export const EXPENSE_NOTE = 'Gaji karyawan menjadi komponen biaya terbesar.'
export const SERVICES_NOTE =
  '218 pelanggan unik. Satu pelanggan dapat membuat beberapa pesanan.'
export const TRANSACTIONS_NOTE = 'Menampilkan 5 transaksi terakhir · Seluruh nominal dalam rupiah'
