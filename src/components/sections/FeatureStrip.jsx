import Reveal from '../ui/Reveal'
import { IconClock, IconSparkle, IconTag, IconTruck } from '../ui/Icons'

const ICONS = [IconTruck, IconClock, IconSparkle, IconTag]

const ITEMS = [
  { title: 'Jemput & antar', desc: 'Gratis untuk area tertentu' },
  { title: 'Jadwal fleksibel', desc: 'Pilih jam, kami ikuti' },
  { title: 'Bersih sampai wangi', desc: 'Deterjen lembut, bilas dua kali' },
  { title: 'Harga nggak neko-neko', desc: 'Tanpa biaya tersembunyi' },
]

export default function FeatureStrip() {
  return (
    <section className="bg-brand-700 text-white">
      <div className="shell grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {ITEMS.map((item, index) => {
          const Icon = ICONS[index] ?? IconTag
          return (
            <Reveal
              key={item.title}
              delay={index * 70}
              className={`flex items-start gap-3 lg:px-6 ${
                index > 0 ? 'lg:border-l lg:border-white/20' : ''
              }`}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 transition duration-300 group-hover:bg-white/25">
                <Icon className="h-4.5 w-4.5 text-white" />
              </span>
              <span>
                <span className="block text-sm font-extrabold">{item.title}</span>
                <span className="block text-xs text-white/70">{item.desc}</span>
              </span>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
