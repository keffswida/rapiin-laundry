import { Link } from 'react-router-dom'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import { IconArrowUpRight, IconClock, IconStar, IconTruck } from '../ui/Icons'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* dekorasi latar: gradien lembut, bukan blob terpisah */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(52rem_36rem_at_18%_-10%,rgb(190_210_255/0.55),transparent_60%),radial-gradient(40rem_30rem_at_95%_30%,rgb(219_230_255/0.6),transparent_65%)]"
      />

      <div className="shell relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
        <Reveal>
          <h1 className="text-balance text-[clamp(2.9rem,8.5vw,5.25rem)] leading-[0.96] font-extrabold tracking-tight text-ink-950">
            Cucian beres.
            <br />
            Hidup lebih{' '}
            <span className="bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800 bg-clip-text text-transparent">
              santai.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-600 sm:text-lg">
            Dari keranjang penuh ke lemari rapi. Kami jemput, cuci, dan antar lagi — kamu tinggal
            tunggu di rumah.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/booking" className="btn-primary px-6 py-4 text-[15px]">
              Jadwal jemput sekarang
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/#harga" className="btn-outline px-6 py-4 text-[15px]">
              Lihat harga
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold text-ink-500">
            <li className="inline-flex items-center gap-2">
              <span className="tile h-7 w-7 rounded-lg">
                <IconTruck className="h-4 w-4" />
              </span>
              Antar-jemput gratis area tertentu
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="tile h-7 w-7 rounded-lg">
                <IconClock className="h-4 w-4" />
              </span>
              Reguler selesai 1–2 hari
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120} className="relative">
          <SmartImage
            src="/images/hero.jpg"
            alt="Seseorang membawa tumpukan pakaian bersih"
            eager
            className="aspect-[4/5] rounded-[2rem] shadow-float ring-8 ring-white sm:aspect-[4/3] lg:aspect-[4/5]"
            imgClassName="group-hover:scale-[1.04]"
          />

          <div className="pointer-events-none absolute inset-0">
            {/* kartu melayang: rating */}
            <div className="animate-float-y absolute top-6 -left-3 hidden items-center gap-2 rounded-2xl bg-white px-4 py-2.5 shadow-float sm:flex">
              <span className="flex gap-0.5 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <span className="num text-xs font-extrabold text-ink-900">4.9</span>
              <span className="text-xs text-ink-400">1.2rb ulasan</span>
            </div>

            <span className="absolute top-6 right-6 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-ink-800 shadow-card backdrop-blur">
              Bisa kiloan, satuan, atau setrika saja
            </span>

            <div className="absolute right-5 bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-float backdrop-blur sm:right-auto sm:max-w-sm">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
                <IconTruck className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-extrabold text-ink-900">
                  Cucian kamu, kami jemput
                </span>
                <span className="block text-xs text-ink-500">Pilih jadwal, sisanya kami urus.</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
