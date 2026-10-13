import { Link } from 'react-router-dom'
import { IconArrow } from '../components/ui/Icons'

const PAGES = {
  privacy: {
    title: 'Kebijakan privasi',
    body: [
      'Terakhir diperbarui: 9 Oktober 2026.',
      'Rapi-In Laundry hanya mengumpulkan data yang dibutuhkan untuk menjalankan pesanan: nama, nomor WhatsApp, alamat jemput, detail cucian, dan catatan pesanan.',
      'Data disimpan di browser kamu untuk menampilkan kode pesanan. Kami tidak menjual, menyewakan, atau membagikan data kamu ke pihak ketiga, kecuali diwajibkan hukum.',
      'Nomor WhatsApp hanya dipakai untuk konfirmasi jadwal, update status cucian, dan penyelesaian pesanan. Minta penghapusan data kapan saja lewat halo@rapiinlaundry.id.',
      'Situs ini tidak memakai cookie iklan.',
    ],
  },
  terms: {
    title: 'Syarat layanan',
    body: [
      'Terakhir diperbarui: 9 Oktober 2026.',
      'Pemesanan dianggap sah setelah kami mengonfirmasi jadwal lewat WhatsApp. Estimasi harga bersifat perkiraan; berat akhir ditimbang di tempat dan selisihnya dikonfirmasi sebelum cucian dikerjakan.',
      'Minimal pesanan 1 kg untuk kiloan dan 1 potong untuk satuan. Pembayaran dilakukan saat cucian diantar, tunai atau transfer.',
      'Kerusakan atau kehilangan akibat kelalaian kami diganti maksimal 10 kali biaya cuci item tersebut, sesuai perawatan yang dipilih.',
      'Jadwal jemput bisa diubah atau dibatalkan maksimal 2 jam sebelum jam jemput tanpa biaya. Di luar itu, hubungi kami segera.',
      'Harga dapat berubah sewaktu-waktu dengan pemberitahuan di halaman ini.',
    ],
  },
}

export default function Legal({ kind }) {
  const content = PAGES[kind]

  if (!content) return null

  return (
    <section className="bg-surface py-14 sm:py-20">
      <div className="shell max-w-3xl">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-bold text-ink-500 transition hover:text-brand-700"
        >
          <IconArrow className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Kembali ke beranda
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {content.title}
        </h1>

        <div className="card mt-8 flex flex-col gap-4 p-6 sm:p-9">
          {content.body.map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-ink-700 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
