# Rapi-In Laundry

Website laundry **Rapi-In Laundry**: landing page lengkap + halaman booking jadwal jemput. Teks Indonesia hardcode (tanpa i18n).

## Stack

- [Vite](https://vite.dev) 8 + React 19 + React Router 7
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Vitest (unit + smoke test render SSR)
- oxlint

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build produksi ke dist/
npm run preview    # jalankan hasil build
npm run lint       # oxlint
npm test           # vitest run
```

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
```

## Rute

| Path | Halaman |
| --- | --- |
| `/` | Beranda (11 section sesuai desain referensi) |
| `/booking` | Form jadwal jemput, dukung prefill `?service=kiloan&pack=ekspres` |
| `/berhasil/:code` | Konfirmasi pesanan (baca `location.state` lalu localStorage) |
| `/privasi`, `/syarat` | Halaman legal |
| `*` | 404 |

## Perilaku & edge case yang ditangani

- **Validasi booking**: nomor HP (`08xx`/`628xx`/`+62`, dinormalisasi), alamat 10–200 karakter, berat 1–100 kg kelipatan 0,5, item bulat 1–50, tanggal hari ini–14 hari ke depan, hanya slot jam 06.00–20.00 dan tidak boleh sudah lewat, paket otomatis menyesuaikan layanan, catatan maks 500 karakter.
- **Anti-bot**: honeypot diabaikan, submit tetap "berhasil" tapi tidak disimpan.
- **Submit**: guard double-click, 10% gagal tersimulasi + deteksi offline → kotak retry, kode pesanan `RP-YYMMDD-XXXX` anti-tabrakan antar tab.
- **Storage diblokir/kosong**: semua akses `localStorage` dibungkus `try/catch`, aplikasi tetap jalan.
- **Gambar gagal load**: `SmartImage` menampilkan placeholder, bukan ikon rusak.
- **Animasi subtil**: reveal on scroll (`Reveal` + `IntersectionObserver`), expand akordeon halus, micro-hover. Semua mati saat `prefers-reduced-motion`; tanpa JS konten tetap tampil.
- **Aksesibilitas**: satu `h1`, skip link, `aria-expanded`/`aria-controls` accordion, dialog menu mobile dengan focus trap + ESC, `aria-invalid` + `role="alert"` untuk error, `prefers-reduced-motion`.
- **Responsif**: 320px–2560px, tanpa scroll horizontal, nav berubah jadi menu mobile.

## Testing

- `src/lib/*.test.js` — harga, validasi, normalisasi telepon/tanggal.
- `src/App.test.jsx` — smoke render semua rute via `react-dom/server`.
