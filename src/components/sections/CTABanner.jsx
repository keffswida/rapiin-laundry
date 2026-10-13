import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import SmartImage from '../ui/SmartImage'
import { IconArrowUpRight, IconClock } from '../ui/Icons'

export default function CTABanner() {
  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="shell">
        <Reveal className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-brand-700 p-7 text-white shadow-glow sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <div className="text-center lg:mx-auto lg:max-w-lg lg:text-left">
            <h2 className="text-balance text-3xl leading-[1.05] font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Pakaian kotor? Serahin
              <br />
              ke kami.
            </h2>
            <p className="mt-4 text-sm text-white/80 sm:text-base">
              Bersih, wangi, rapi. Kamu tinggal santai.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link to="/booking" className="btn-light px-6 py-4 text-[15px]">
                Jadwal jemput sekarang
                <IconArrowUpRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/70">
                <IconClock className="h-4 w-4" />
                Pickup 06.00–21.00, setiap hari
              </span>
            </div>
          </div>

          <SmartImage
            src="/images/basket.jpg"
            alt="Tumpukan pakaian bersih"
            className="group aspect-[16/10] rounded-[1.5rem] lg:aspect-[4/3]"
            imgClassName="group-hover:scale-[1.05]"
          />
        </Reveal>
      </div>
    </section>
  )
}
