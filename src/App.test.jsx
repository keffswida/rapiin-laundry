import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import AdminRoutes from './admin/routes'

function renderRoute(path, { state } = {}) {
  return renderToString(
    <MemoryRouter initialEntries={[{ pathname: path, state }]}>
      <App />
    </MemoryRouter>,
  )
}

function renderAdmin(path) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <AdminRoutes />
    </MemoryRouter>,
  )
}

const SAMPLE_ORDER = {
  code: 'RP-261009-TEST',
  createdAt: new Date().toISOString(),
  name: 'Sari Rahmawati',
  phone: '+6281234567890',
  phoneRaw: '081234567890',
  address: 'Jl. Melati Raya No. 12',
  service: 'kiloan',
  pack: 'reguler',
  amount: 4,
  unit: 'kg',
  price: 8000,
  total: 32000,
  date: '2026-10-10',
  time: '10.00',
  notes: 'Tanpa pewangi',
  persisted: true,
}

describe('App — render semua rute', () => {
  it('beranda', () => {
    const html = renderRoute('/')
    expect(html).toContain('Cucian beres')
    expect(html).toContain('Rapi-In')
    expect(html).toContain('id="layanan"')
    expect(html).toContain('id="harga"')
    expect(html).toContain('id="faq"')
    expect(html).toContain('Empat langkah')
  })

  it('halaman booking + form lengkap', () => {
    const html = renderRoute('/booking')
    expect(html).toContain('Jadwalkan jemput')
    expect(html).toContain('id="bk-name"')
    expect(html).toContain('id="bk-phone"')
    expect(html).toContain('id="bk-address"')
    expect(html).toContain('id="bk-amount"')
    expect(html).toContain('Ringkasan pesanan')
    expect(html).toContain('honeypot')
  })

  it('booking dengan query prefill tidak meledak', () => {
    expect(() => renderRoute('/booking?service=satuan&pack=item')).not.toThrow()
    expect(() => renderRoute('/booking?service=absurd&pack=ngawur')).not.toThrow()
  })

  it('sukses: state order dipakai', () => {
    const html = renderRoute('/berhasil/RP-261009-TEST', { state: { order: SAMPLE_ORDER } })
    expect(html).toContain('Jadwal terkirim!')
    expect(html).toContain('RP-261009-TEST')
    expect(html).toContain('Sari Rahmawati')
    expect(html).toContain('Rp 32.000')
  })

  it('sukses: kode tak dikenal -> pesan tidak ditemukan', () => {
    const html = renderRoute('/berhasil/RP-000000-XXXX')
    expect(html).toContain('Kode pesanan tidak ditemukan')
  })

  it('404', () => {
    const html = renderRoute('/halaman-ngawur')
    expect(html).toContain('Halaman tidak ketemu')
    expect(html).toContain('404')
  })

  it('halaman legal', () => {
    expect(renderRoute('/privasi')).toContain('Kebijakan privasi')
    expect(renderRoute('/syarat')).toContain('Syarat layanan')
  })
})

describe('App — rute admin', () => {
  it('/admin/login menampilkan form', () => {
    const html = renderAdmin('/admin/login')
    expect(html).toContain('Masuk ke akunmu')
    expect(html).toContain('id="email"')
    expect(html).toContain('id="password"')
    expect(html).toContain('Pratinjau desain · Autentikasi tidak aktif')
  })

  it('/admin tanpa sesi: dev bypass aktif (vitest DEV) -> Ringkasan langsung', () => {
    // import.meta.env.DEV = true di vitest -> ADMIN_BYPASS aktif -> tanpa login.
    const html = renderAdmin('/admin')
    expect(html).toContain('Ringkasan usaha')
    expect(html).toContain('Bukan data aktual')
    expect(html).not.toContain('Masuk ke akunmu')
    expect(() => renderAdmin('/admin')).not.toThrow()
  })

  it('rute admin tidak menampilkan shell landing', () => {
    const html = renderAdmin('/admin/login')
    expect(html).not.toContain('id="layanan"')
    expect(html).not.toContain('id="harga"')
  })

  it('lazy AdminRoutes di App tidak crash saat SSR (fallback via Suspense)', () => {
    // renderToString tidak resolve lazy — cukup pastikan tidak melempar error.
    expect(() => renderRoute('/admin/login')).not.toThrow()
    expect(() => renderRoute('/admin')).not.toThrow()
  })

  it('/admin/pesanan: tabel + KPI + toolbar render', () => {
    const html = renderAdmin('/admin/pesanan')
    expect(html).toContain('Daftar pesanan')
    expect(html).toContain('Tambah pesanan')
    expect(html).toContain('RI-09320')
    expect(html).toContain('Nadia Putri')
    expect(html).toContain('Siap diambil')
    // SSR menyisipkan komentar HTML di antara teks — assert per bagian
    expect(html).toContain('Belum lunas:')
    expect(html).toContain('Rp480.000')
    expect(html).toContain('piutang. Tidak termasuk')
    expect(html).toContain('pesanan dalam periode terpilih')
    expect(html).toContain('Cari ID pesanan atau nama pelanggan')
  })

  it('/admin/pelanggan: buku pelanggan + KPI + stat bawah render', () => {
    const html = renderAdmin('/admin/pelanggan')
    expect(html).toContain('Buku pelanggan')
    expect(html).toContain('Tambah pelanggan')
    expect(html).toContain('Nadia Putri')
    expect(html).toContain('PL-0218')
    expect(html).toContain('0812-••••-0218')
    expect(html).toContain('Nomor disamarkan')
    expect(html).toContain('Rp270.000')
    expect(html).toContain('Kembali')
    expect(html).toContain('Penggunaan bulan ini')
    expect(html).toContain('Komposit pelanggan aktif')
    expect(html).toContain('pelanggan aktif')
    expect(html).toContain('Cari nama, ID atau nomor kontak')
  })

  it('/admin/layanan: katalog + KPI + kartu bawah render', () => {
    const html = renderAdmin('/admin/layanan')
    expect(html).toContain('Katalog layanan')
    expect(html).toContain('Tambah layanan')
    expect(html).toContain('Laundry kiloan')
    expect(html).toContain('Rp8.000')
    expect(html).toContain('Ubah harga')
    expect(html).toContain('Nonaktif')
    expect(html).toContain('Harga dalam rupiah')
    expect(html).toContain('Aturan pesanan kiloan')
    expect(html).toContain('Perubahan harga')
    expect(html).toContain('Seluruh data ditampilkan')
    expect(html).toContain('Cari nama layanan')
  })

  it('/admin/pemasukan: KPI + riwayat + metode render', () => {
    const html = renderAdmin('/admin/pemasukan')
    expect(html).toContain('Riwayat penerimaan')
    expect(html).toContain('Catat pembayaran')
    expect(html).toContain('Rp24.800.000')
    expect(html).toContain('Rp480.000')
    expect(html).toContain('RI-09320')
    expect(html).toContain('INV-09320')
    expect(html).toContain('Metode pembayaran')
    expect(html).toContain('QRIS')
    expect(html).toContain('Transfer bank')
    expect(html).toContain('Total periode terpilih')
    expect(html).toContain('Cari pelanggan atau referensi pesanan')
    expect(html).toContain('Dikelompokkan per ')
    expect(html).toContain('Minggu')
  })

  it('/admin/pengeluaran: KPI + buku + alokasi render', () => {
    const html = renderAdmin('/admin/pengeluaran')
    expect(html).toContain('Buku pengeluaran')
    expect(html).toContain('Tambah pengeluaran')
    expect(html).toContain('Rp10.400.000')
    expect(html).toContain('EX-09300')
    expect(html).toContain('Servis pengering')
    expect(html).toContain('Alokasi biaya')
    expect(html).toContain('Gaji karyawan')
    expect(html).toContain('Lihat bukti')
    expect(html).toContain('Total periode terpilih')
    expect(html).toContain('41,9%')
    expect(html).toContain('Cari keterangan atau referensi pengeluaran')
  })

  it('/admin/laporan: KPI + pratinjau + riwayat ekspor render', () => {
    const html = renderAdmin('/admin/laporan')
    expect(html).toContain('Pratinjau laporan')
    expect(html).toContain('Rp14.400.000')
    expect(html).toContain('Margin laba 58,1%')
    expect(html).toContain('1–7 Sep 2026')
    expect(html).toContain('Rp5.200.000')
    expect(html).toContain('Total September')
    expect(html).toContain('Penggunaan layanan')
    expect(html).toContain('Riwayat ekspor')
    expect(html).toContain('Ekspor Excel')
    expect(html).toContain('Tampilkan laporan')
    expect(html).toContain('Kelompokkan berdasarkan')
  })

  it('/admin/pengaturan: form profil + footer pristine render', () => {
    const html = renderAdmin('/admin/pengaturan')
    expect(html).toContain('Profil usaha')
    expect(html).toContain('Jam operasional')
    expect(html).toContain('amp; satuan')
    expect(html).toContain('Notifikasi operasional')
    expect(html).toContain('Tampilan contoh · Belum ada perubahan')
    expect(html).toContain('Simpan perubahan')
    expect(html).toContain('Rapi-In Laundry')
    expect(html).toContain('0812-••••-0000')
    expect(html).toContain('Akun &amp; tim')
  })
})
