import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import { IconArrow, IconCalendar, IconHome, IconMachine, IconTruck } from '../ui/Icons'

const ICONS = [IconCalendar, IconTruck, IconMachine, IconHome]

const STEPS = [
  {
    title: 'Pesan & pilih jadwal',
    desc: 'Isi form, tentukan jam jemput yang enak buat kamu.',
  },
  {
    title: 'Kami jemput',
    desc: 'Tim datang, cucian ditimbang di tempat, bukti dikirim ke chat.',
  },
  {
    title: 'Kami rawat',
    desc: 'Dicuci, dikeringkan, dilipat. Bahan halus dipisah, nggak dicampur.',
  },
  {
    title: 'Rapi sampai rumah',
    desc: 'Diantar balik sesuai jadwal. Ada yang kurang? Kami perbaiki.',
  },
]

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="shell">
        <Reveal className="flex flex-col items-center gap-6">
          <SectionHead eyebrow="Cara kerja" title="Empat langkah. Tanpa ribet." />
          <Link to="/booking" className="btn-outline px-5 py-3 text-sm">
            Mulai dari jadwal
            <IconArrow className="h-4 w-4" />
          </Link>
        </Reveal>

        <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {/* garis penghubung antar langkah (desktop) */}
          <span
            aria-hidden="true"
            className="absolute top-9 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 lg:block"
          />

          {STEPS.map((step, index) => {
            const Icon = ICONS[index] ?? IconCalendar
            return (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 90}
                className={`relative lg:px-6 ${index > 0 ? 'lg:border-l lg:border-ink-200' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <span className="grad-num text-5xl font-extrabold tracking-tight">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-5 text-base font-extrabold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.desc}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
