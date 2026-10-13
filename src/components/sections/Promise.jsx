import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import SmartImage from '../ui/SmartImage'
import { IconShield } from '../ui/Icons'

const ITEMS = [
  {
    title: 'Cucianmu tetap milikmu.',
    desc: 'Tiap pesanan diberi label dan dipisah. Nggak ada cucian nyasar ke keranjang orang lain.',
  },
  {
    title: 'Bahan beda, cara rawat beda.',
    desc: 'Katun dicuci beda dengan sutra. Kami ikuti label perawatan yang ada di bajumu.',
  },
  {
    title: 'Kamu selalu tahu kabarnya.',
    desc: 'Dijemput, dicuci, siap antar — dikabarin tiap tahap lewat WhatsApp.',
  },
]

export default function Promise() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="shell">
        <Reveal className="grid overflow-hidden rounded-[2rem] bg-brand-700 text-white shadow-glow lg:grid-cols-2">
          <SmartImage
            src="/images/promise.jpg"
            alt="Deretan mesin cuci di ruang laundry"
            className="aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]"
            imgClassName="saturate-[0.9]"
          >
            <div className="absolute bottom-5 left-5 right-5 max-w-xs rounded-2xl bg-white p-4 shadow-float">
              <p className="text-sm font-extrabold text-ink-900">
                Bukan cuma bersih. Harus terasa dirawat.
              </p>
            </div>
          </SmartImage>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <SectionHead
              eyebrow="Kenapa kami"
              title={
                <>
                  Tenang, cucianmu
                  <br />
                  di tangan yang pas.
                </>
              }
              tone="dark"
            />

            <ul className="mt-8 flex flex-col gap-6">
              {ITEMS.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={120 + index * 80}
                  className="flex gap-4"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                    <IconShield className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-extrabold text-white">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-white/75">
                      {item.desc}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
