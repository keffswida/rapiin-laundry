import { Link } from 'react-router-dom'
import { PRICING } from '../../lib/pricing'
import { formatCurrency } from '../../lib/format'
import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import { IconCheck, IconClock } from '../ui/Icons'

const CARDS = [
  {
    key: 'reguler',
    service: 'kiloan',
    pack: 'reguler',
    featured: false,
    name: 'Reguler',
    desc: 'Semua bajumu, besok sudah rapi.',
    eta: '1–2 hari',
    cta: 'Pilih reguler',
    features: ['Cuci bersih & higienis', 'Pewangi tahan lama', 'Lipat & kemas rapi'],
  },
  {
    key: 'ekspres',
    service: 'kiloan',
    pack: 'ekspres',
    featured: true,
    name: 'Ekspres',
    desc: 'Tenggat mepet? Kami bantu kebut-kebutan.',
    eta: '12 jam',
    cta: 'Pilih ekspres',
    features: ['Prioritas antrean', 'Selesai dalam 12 jam', 'Antar-jemput tetap gratis'],
  },
  {
    key: 'item',
    service: 'satuan',
    pack: 'item',
    featured: false,
    name: 'Satuan',
    desc: 'Perlu perhatian khusus per potong.',
    eta: '2–3 hari',
    cta: 'Pilih satuan',
    features: ['Perawatan sesuai bahan', 'Dikeringkan tanpa mesin', 'Dikemas per potong'],
  },
]

export default function Pricing() {
  return (
    <section id="harga" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Harga"
            title="Rapi bajunya. Jelas harganya."
            desc="Pilih paket sesuai keluwesanmu. Semua harga sudah termasuk antar-jemput."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CARDS.map((card, index) => {
            const tier = PRICING[card.service][card.pack]
            const featured = card.featured
            const dark = featured

            return (
              <Reveal key={card.key} delay={index * 90}>
                <div
                  className={`relative flex h-full flex-col rounded-[2rem] p-7 transition duration-300 sm:p-8 ${
                    dark
                      ? 'bg-brand-700 text-white shadow-glow lg:-mt-4 lg:mb-4'
                      : 'border border-ink-200 bg-white shadow-card hover:-translate-y-1 hover:border-brand-300 hover:shadow-float'
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3.5 left-7 rounded-full bg-ink-900 px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-white uppercase">
                      Paling populer
                    </span>
                  )}

                  <h3 className={`text-lg font-extrabold ${dark ? 'text-white' : 'text-ink-900'}`}>
                    {card.name}
                  </h3>
                  <p className={`mt-1 text-sm ${dark ? 'text-white/80' : 'text-ink-500'}`}>
                    {card.desc}
                  </p>

                  <p className="mt-6 flex items-end gap-1.5">
                    <span
                      className={`num text-4xl font-extrabold tracking-tight ${
                        dark ? 'text-white' : 'text-ink-900'
                      }`}
                    >
                      {formatCurrency(tier.price)}
                    </span>
                    <span
                      className={`pb-1 text-sm font-bold ${dark ? 'text-white/70' : 'text-ink-400'}`}
                    >
                      {tier.unit === 'kg' ? '/kg' : '/item'}
                    </span>
                  </p>

                  <p
                    className={`mt-4 inline-flex items-center gap-2 self-start rounded-xl px-3 py-2 text-xs font-bold ${
                      dark ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-800'
                    }`}
                  >
                    <IconClock className="h-4 w-4" />
                    Selesai: {card.eta}
                  </p>

                  <p
                    className={`mt-6 text-[11px] font-extrabold tracking-[0.14em] uppercase ${
                      dark ? 'text-white/60' : 'text-ink-400'
                    }`}
                  >
                    Termasuk:
                  </p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {card.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <span
                          className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                            dark ? 'bg-white text-brand-700' : 'bg-brand-100 text-brand-700'
                          }`}
                        >
                          <IconCheck className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <span className={dark ? 'text-white/90' : 'text-ink-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/booking?service=${card.service}&pack=${card.pack}`}
                    className={`mt-8 w-full ${dark ? 'btn-light' : 'btn-primary'} py-3.5`}
                  >
                    {card.cta}
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-1.5 text-xs text-ink-500 sm:flex-row sm:justify-between">
          <p className="max-w-2xl">
            Sudah termasuk antar-jemput area tertentu. Minimal 1 kg untuk kiloan, minimal 1 potong
            untuk satuan.
          </p>
          <p>Harga berlaku untuk wilayah Jakarta Selatan. Luar area? Chat dulu ya.</p>
        </div>
      </div>
    </section>
  )
}
