# Rapi-In Laundry

Website laundry **Rapi-In Laundry**: landing page lengkap, halaman booking jadwal jemput, dan dashboard admin mock. Teks Indonesia hardcode (tanpa i18n).

## Stack

- [Vite](https://vite.dev) 8 + React 19 + React Router 7
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Recharts (chart dashboard)
- Vitest (unit + smoke test render SSR)
- oxlint

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173 — /admin langsung masuk (bypass auth saat dev)
npm run build      # build produksi ke dist/
npm run preview    # jalankan hasil build — /admin/login perlu login mock
npm run lint       # oxlint
npm test           # vitest run
```

Login mock di mode preview/prod: email `andi@rapiin.id`, sandi `rahasia`. Override bypass: `VITE_ADMIN_BYPASS=1`.

## Struktur

```
src/
  lib/
    pricing.js    tabel harga + estimasi (batas berat/item, kelipatan 0,5 kg)
    validation.js validasi form booking (telepon, alamat, tanggal, jam, honeypot)
    orders.js     kode pesanan + penyimpanan localStorage + submit tersimulasi
    format.js     format Indonesia (mata uang/tanggal/angka)
  components/
    layout/       Header (nav + menu mobile), Footer, Brand
    sections/     Hero, FeatureStrip, Services, Pricing, HowItWorks,
                  Promise, Testimonials, FAQ, CTABanner
    ui/           Accordion, Field, SmartImage (fallback gambar), SectionHead,
                  Reveal (animasi reveal on scroll), Icons
  pages/          Home, Booking, BookingSuccess, Legal, NotFound
  admin/
    auth.js       guard + bypass dev
    AdminLayout.jsx  shell (Sidebar, Topbar, AdminGate)
    routes.jsx    rute admin, lazy per halaman
    components/   KpiCard, ChartBarCard, DonutCard, ProgressRow, TableSimple,
                  StatusBadge, PeriodPicker, ExportButton, SegmentedTabs,
                  PageHeader, InfoBanner, Toggle
    data/         mock data per halaman (angka konsisten lintas halaman)
    pages/        Login + 9 halaman dashboard
```

## Rute

| Path | Halaman |
| --- | --- |
| `/` | Beranda (11 section sesuai desain referensi) |
| `/booking` | Form jadwal jemput, dukung prefill `?service=kiloan&pack=ekspres` |
| `/berhasil/:code` | Konfirmasi pesanan (baca `location.state` lalu localStorage) |
| `/privasi`, `/syarat` | Halaman legal |
| `*` | 404 |

### Admin (`/admin/*`)

| Path | Halaman |
| --- | --- |
| `/admin/login` | Login mock |
| `/admin` | Ringkasan — KPI, tren pemasukan, donut pengeluaran |
| `/admin/pesanan` | Pesanan — tabel 320 baris, filter status/pembayaran/cari |
| `/admin/pelanggan` | Pelanggan — 286 data, filter aktivitas/loyalitas |
| `/admin/layanan` | Layanan & harga — katalog + aturan |
| `/admin/pemasukan` | Pemasukan — tren, metode bayar, riwayat, ekspor |
| `/admin/pengeluaran` | Pengeluaran — alokasi biaya, sort, tanda terima |
| `/admin/laporan` | Laporan — laba bersih, grouping Hari/Minggu/Bulan/Tahun |
| `/admin/pengaturan` | Pengaturan — profil usaha, jam operasional, preferensi |

Semua data mock (ilustrasi, bukan data aktual). Aksi ekspor/nota/tambah = no-op. Interaktif: filter, sort, pagination, tab, form dirty/saved.

## Perilaku & edge case yang ditangani

- **Validasi booking**: nomor HP (`08xx`/`628xx`/`+62`, dinormalisasi), alamat 10–200 karakter, berat 1–100 kg kelipatan 0,5, item bulat 1–50, tanggal hari ini–14 hari ke depan, hanya slot jam 06.00–20.00 dan tidak boleh sudah lewat, paket otomatis menyesuaikan layanan, catatan maks 500 karakter.
- **Anti-bot**: honeypot diabaikan, submit tetap "berhasil" tapi tidak disimpan.
- **Submit**: guard double-click, 10% gagal tersimulasi + deteksi offline → kotak retry, kode pesanan `RP-YYMMDD-XXXX` anti-tabrakan antar tab.
- **Storage diblokir/kosong**: semua akses `localStorage` dibungkus `try/catch`, aplikasi tetap jalan.
- **Gambar gagal load**: `SmartImage` menampilkan placeholder, bukan ikon rusak.
- **Animasi subtil**: reveal on scroll (`Reveal` + `IntersectionObserver`), expand akordeon halus, micro-hover. Semua mati saat `prefers-reduced-motion`; tanpa JS konten tetap tampil.
- **Aksesibilitas**: satu `h1`, skip link, `aria-expanded`/`aria-controls` accordion, dialog menu mobile dengan focus trap + ESC, `aria-invalid` + `role="alert"` untuk error, `prefers-reduced-motion`. Admin: `aria-current` nav aktif, `aria-pressed` KPI filter, `role="switch"` toggle, label form.
- **Responsif**: 320px–2560px, tanpa scroll horizontal, nav berubah jadi menu mobile. Admin: tabel overflow-x scroll di layar kecil.

## Testing

- `src/lib/*.test.js` — harga, validasi, normalisasi telepon/tanggal.
- `src/App.test.jsx` — smoke render semua rute (landing + 9 halaman admin) via `react-dom/server`.
