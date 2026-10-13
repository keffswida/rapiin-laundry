import Accordion from '../ui/Accordion'
import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import SmartImage from '../ui/SmartImage'

const ITEMS = [
  {
    id: 's1',
    title: 'Laundry kiloan',
    desc: 'Pakaian harian, seprai, handuk. Kami timbang, cuci, keringkan, lipat, dan setrika kalau kamu mau.',
    meta: 'Mulai Rp 8.000/kg',
  },
  {
    id: 's2',
    title: 'Laundry satuan',
    desc: 'Jas, gaun, coat, dan bahan halus. Perawatan disesuaikan jenis bahannya, bukan dicuci satu wadah.',
    meta: 'Mulai Rp 20.000/item',
  },
  {
    id: 's3',
    title: 'Setrika saja',
    desc: 'Sudah dicuci tapi belum sempat disetrika? Kami rapikan sampai rapi, wangi, dan siap pakai.',
    meta: 'Mulai Rp 5.000/kg',
  },
]

export default function Services() {
  return (
    <section id="layanan" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Layanan"
            title={
              <>
                Beda cucian,
                <br />
                sama-sama kami rawat.
              </>
            }
            desc="Dari harian sampai yang butuh perhatian khusus, selalu ada layanan yang pas. Pilih satu, sisanya kami yang urus."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SmartImage
              src="/images/services.jpg"
              alt="Petugas melipat pakaian bersih"
              className="group aspect-[4/3] rounded-[2rem] shadow-card"
              imgClassName="group-hover:scale-[1.05]"
            >
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-float backdrop-blur">
                <p className="text-sm font-extrabold text-ink-900">
                  Deterjen lembut. Bahan tetap terawat.
                </p>
                <p className="mt-0.5 text-xs text-ink-500">
                  Pisah cucian beda bahan, tanpa campur asal jadi.
                </p>
              </div>
            </SmartImage>
          </Reveal>

          <Reveal delay={100}>
            <Accordion
              idPrefix="services"
              defaultOpen="s1"
              items={ITEMS.map((item, index) => ({
                id: item.id,
                title: (
                  <span className="flex items-baseline gap-3">
                    <span className="num text-sm font-extrabold text-brand-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.title}
                  </span>
                ),
                content: (
                  <div>
                    <p className="text-sm leading-relaxed text-ink-600">{item.desc}</p>
                    <p className="mt-3 inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold text-brand-700">
                      {item.meta}
                    </p>
                  </div>
                ),
              }))}
              className="border-t border-ink-200"
              itemClassName={() => 'border-b border-ink-200'}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
