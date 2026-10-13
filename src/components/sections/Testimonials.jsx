import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import { IconQuote, IconStar } from '../ui/Icons'

const OTHERS = [
  {
    text: 'Paling suka karena dijemput. Jadwal jadi lebih tertata, bukan urusan cucian.',
    name: 'Dewi P.',
  },
  { text: 'Datang tinggal pakai. Chat-nya jelas dan nggak ribet.', name: 'Nadia S.' },
  { text: 'Setrikaannya rapi, bahanku yang tipis pun aman.', name: 'Bagas T.' },
]

function Stars({ className = 'h-4 w-4' }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} className={`${className} fill-current`} />
      ))}
    </span>
  )
}

export default function Testimonials() {
  return (
    <section id="testimoni" className="scroll-mt-24 bg-surface py-16 sm:py-24">
      <div className="shell grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <SectionHead eyebrow="Testimoni" title="Cucian rapi, hati ikut tenang." />

          <Reveal>
            <figure className="card relative mt-10 overflow-hidden p-7 sm:p-9">
              <IconQuote
                aria-hidden="true"
                className="absolute -top-4 -right-4 h-28 w-28 rotate-180 text-brand-100"
              />
              <blockquote className="relative text-xl leading-snug font-extrabold tracking-tight text-ink-900 sm:text-2xl">
                “Pulang kerja udah capek, masih lihat tumpukan baju. Sekarang tinggal chat Rapi-In.
                Rasanya satu urusan hidup langsung beres.”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-sm font-extrabold text-white">
                  RW
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-ink-900">Rina W.</span>
                  <span className="block text-xs text-ink-500">Pelanggan sejak 2023</span>
                </span>
                <span className="ml-auto flex items-center gap-2" aria-label="5 dari 5">
                  <Stars />
                  <span className="num text-xs font-extrabold text-ink-900">5.0</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ul className="flex flex-col gap-5 lg:pt-24">
          {OTHERS.map((other, index) => (
            <Reveal
              as="li"
              key={other.name}
              delay={index * 90}
              className="card card-hover p-6"
            >
              <p className="text-sm leading-relaxed text-ink-700">{other.text}</p>
              <p className="mt-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-xs font-extrabold text-brand-700">
                  {other.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <span className="text-sm font-extrabold text-ink-900">{other.name}</span>
                <span className="ml-auto flex items-center gap-1.5">
                  <Stars className="h-3.5 w-3.5" />
                  <span className="sr-only">5 dari 5</span>
                </span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
