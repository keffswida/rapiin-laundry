/**
 * Mock data halaman Pengaturan — isian figma.
 */

export const PROFILE_INITIAL = {
  namaUsaha: 'Rapi-In Laundry',
  namaOutlet: 'Outlet utama',
  whatsapp: '0812-••••-0000',
  email: 'rapiin.laundry@example.com',
  alamat: 'Jalan Contoh No. 12, Bandung, Jawa Barat',
  kota: 'Bandung',
  kodePos: '40100',
}

export const PROFILE_HINTS = {
  whatsapp: 'Nomor contoh, bukan kontak pelanggan.',
  alamat: 'Alamat ilustrasi untuk desain.',
}

export const HOURS_INITIAL = [
  { id: 'weekday', label: 'Senin–Jumat', status: 'Buka', from: '08:00', to: '20:00' },
  { id: 'sabtu', label: 'Sabtu', status: 'Buka', from: '08:00', to: '18:00' },
  { id: 'minggu', label: 'Minggu', status: 'Buka', from: '09:00', to: '16:00' },
]

export const HOURS_OUTSIDE = {
  label: 'Terima pesanan di luar jam buka',
  desc: 'Izinkan staf mencatat pesanan setelah jam operasional.',
}

export const REGIONAL_INITIAL = { mataUang: 'IDR', zona: 'WIB', satuan: 'kg' }

export const REGIONAL_OPTS = {
  mataUang: [
    { value: 'IDR', label: 'IDR — Rupiah (Rp)' },
    { value: 'USD', label: 'USD — US Dollar ($)' },
  ],
  zona: [
    { value: 'WIB', label: 'Asia/Jakarta (WIB, UTC+7)' },
    { value: 'WITA', label: 'Asia/Makassar (WITA, UTC+8)' },
    { value: 'WIT', label: 'Asia/Jayapura (WIT, UTC+9)' },
  ],
  satuan: [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'pcs', label: 'Potong (pcs)' },
  ],
}

export const NOTA_INITIAL = {
  prefiksPesanan: 'RI-',
  prefiksNota: 'INV-',
  pesan: 'Terima kasih! Cucian rapi, hari lebih nyaman.',
  estimasiSelesai: true,
}

export const NOTIF_INITIAL = {
  siapDiambil: true,
  ringkasanHarian: true,
}

export const FOOTER_FIGMA =
  'Mockup statis · Isian, skakel dan tombol penyimpanan adalah contoh tampilan. Akun & tim, Keamanan dan Integrasi merupakan navigasi ke bagian lain.'

export const SETTINGS_TABS = [
  { id: 'umum', label: 'Umum', icon: 'store' },
  { id: 'tim', label: 'Akun & tim', icon: 'users' },
  { id: 'keamanan', label: 'Keamanan', icon: 'shield' },
  { id: 'integrasi', label: 'Integrasi', icon: 'plug' },
]
