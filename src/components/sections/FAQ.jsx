import Accordion from '../ui/Accordion'
import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import { IconWhatsapp } from '../ui/Icons'

const WHATSAPP =
  'https://wa.me/6281200000000?text=Halo%20Rapi-In%20Laundry%2C%20saya%20mau%20tanya'

const ITEMS = [
  {
    id: 'f1',
    q: 'Bagaimana cara pesan jadwal jemput?',
    a: 'Isi form jadwal di website, pilih tanggal dan jam, lalu konfirmasi. Kami balas lewat WhatsApp maksimal 15 menit pada jam operasional.',
  },
  {
    id: 'f2',
    q: 'Berapa minimal pesan dan biaya jemput-pantar?',
    a: 'Minimal 1 kg untuk kiloan dan 1 potong untuk satuan. Antar-jemput gratis untuk area tertentu; di luar area kena biaya Rp 10.000 per perjalanan.',
  },
  {
    id: 'f3',
    q: 'Cucian selesai berapa lama?',
    a: 'Reguler 1–2 hari, ekspres 12 jam sejak cucian masuk, satuan 2–3 hari tergantung bahan dan jenis perawatannya.',
  },
  {
    id: 'f4',
    q: 'Apakah pakaian saya dicampur dengan pelanggan lain?',
    a: 'Tidak. Tiap pesanan dicuci terpisah dan diberi label, jadi cucianmu tidak pernah nyampur dengan pesanan orang lain.',
  },
  {
    id: 'f5',
    q: 'Bisa minta tanpa pewangi atau pewangi khusus?',
    a: 'Bisa. Tulis di kolom catatan saat pesan, misalnya “tanpa pewangi” atau merek pewangi favoritmu. Kami ikuti.',
  },
  {
    id: 'f6',
    q: 'Area mana saja yang bisa dijemput?',
    a: 'Jakarta Selatan dan sekitarnya. Masukkan alamat di form jadwal — kalau masih di luar jangkauan, kami kabari sebelum tim berangkat.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <div className="shell grid gap-10 lg:gap-14">
        <Reveal className="flex flex-col items-center">
          <SectionHead
            eyebrow="FAQ"
            title="Masih ada yang bikin penasaran?"
            desc="Tanya apa saja soal jemput, cuci, dan bayar. Kami jawab tanpa bertele-tele."
          />
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary mt-8 px-6 py-4"
          >
            <IconWhatsapp className="h-5 w-5" />
            Tanya via WhatsApp
          </a>
        </Reveal>

        <Reveal delay={100} className="mx-auto w-full max-w-3xl">
          <Accordion
            idPrefix="faq"
            defaultOpen="f1"
            items={ITEMS.map((item) => ({
              id: item.id,
              title: item.q,
              content: item.a,
            }))}
            className="flex flex-col gap-3"
            itemClassName={(_item, open) =>
              open
                ? 'rounded-[1.5rem] bg-brand-700 px-5 shadow-glow transition-colors duration-300'
                : 'rounded-[1.5rem] bg-white px-5 ring-1 ring-ink-200 transition-shadow duration-300 hover:shadow-card'
            }
            buttonClassName={(_item, open) => (open ? 'text-white' : 'text-ink-900')}
            iconClassName={(_item, open) => (open ? 'text-white' : 'text-brand-700')}
            panelClassName={(_item, open) =>
              `pt-0 pb-5 text-sm leading-relaxed transition-colors duration-300 ${
                open ? 'text-white/80' : 'text-ink-600'
              }`
            }
          />
        </Reveal>
      </div>
    </section>
  )
}
