import { Link } from 'react-router-dom'
import { IconArrow, IconInstagram, IconMail, IconPin, IconWhatsapp } from '../ui/Icons'
import Brand from './Brand'
import Reveal from '../ui/Reveal'

const WHATSAPP = 'https://wa.me/6281200000000?text=Halo%20Rapi-In%20Laundry'
const INSTAGRAM = 'https://instagram.com/rapiinlaundry'
const MAIL = 'mailto:halo@rapiinlaundry.id'
const MAPS = 'https://maps.google.com/?q=Jakarta+Selatan'

const SECTION_LINKS = [
  { label: 'Layanan', hash: 'layanan' },
  { label: 'Harga', hash: 'harga' },
  { label: 'Cara kerja', hash: 'cara-kerja' },
  { label: 'Testimoni', hash: 'testimoni' },
  { label: 'FAQ', hash: 'faq' },
]

const SERVICE_LINKS = [
  { label: 'Laundry kiloan', service: 'kiloan' },
  { label: 'Laundry satuan', service: 'satuan' },
  { label: 'Setrika saja', service: 'setrika' },
]

const CONTACT_LINKS = [
  { label: 'WhatsApp', href: WHATSAPP, Icon: IconWhatsapp, external: true },
  { label: 'Instagram', href: INSTAGRAM, Icon: IconInstagram, external: true },
  { label: 'Email', href: MAIL, Icon: IconMail, external: false },
  { label: 'Lokasi', href: MAPS, Icon: IconPin, external: true },
]

const linkClass =
  'group/lk inline-flex items-center gap-1.5 text-sm text-ink-600 transition hover:text-brand-700'

function ColumnTitle({ children }) {
  return (
    <h3 className="text-xs font-extrabold tracking-[0.16em] text-ink-900 uppercase">
      {children}
    </h3>
  )
}

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="shell pt-16 pb-10">
        <Reveal className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link to="/" aria-label="Rapi-In Laundry" className="group inline-block">
              <Brand />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              Tempat andal buat cucian rumah. Biar bajumu, kami urus. Kamu santai.
            </p>
            <p className="mt-3 text-xs font-semibold text-ink-400">
              Buka setiap hari 06.00–21.00
            </p>
            <button
              type="button"
              onClick={toTop}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-xs font-bold text-ink-600 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
            >
              <IconArrow className="h-3.5 w-3.5 -rotate-90" />
              Kembali ke atas
            </button>
          </div>

          <nav aria-label="Ringkas">
            <ColumnTitle>Ringkas</ColumnTitle>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SECTION_LINKS.map((item) => (
                <li key={item.hash}>
                  <Link to={`/#${item.hash}`} className={linkClass}>
                    <span className="transition-transform duration-300 group-hover/lk:translate-x-0.5">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Layanan">
            <ColumnTitle>Layanan</ColumnTitle>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICE_LINKS.map((item) => (
                <li key={item.service}>
                  <Link to={`/booking?service=${item.service}`} className={linkClass}>
                    <span className="transition-transform duration-300 group-hover/lk:translate-x-0.5">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Masih ragu?">
            <ColumnTitle>Masih ragu?</ColumnTitle>
            <ul className="mt-4 flex flex-col gap-2.5">
              {CONTACT_LINKS.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer noopener' : undefined}
                    className={linkClass}
                  >
                    <Icon className="h-4 w-4 text-ink-400 transition group-hover/lk:text-brand-600" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <div
          aria-label="Media sosial"
          className="mt-10 mb-2 flex items-center gap-3 border-t border-ink-100 pt-8"
        >
          {[
            { label: 'WhatsApp', href: WHATSAPP, Icon: IconWhatsapp },
            { label: 'Instagram', href: INSTAGRAM, Icon: IconInstagram },
            { label: 'Email', href: MAIL, Icon: IconMail },
          ].map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer noopener"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
            >
              <span className="sr-only">{label}</span>
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-ink-100">
        <div className="shell flex flex-col items-start justify-between gap-3 py-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© 2026 Rapi-In Laundry. Cucian beres, hidup santai.</p>
          <p className="flex gap-5">
            <Link to="/privasi" className="transition hover:text-brand-700">
              Kebijakan privasi
            </Link>
            <Link to="/syarat" className="transition hover:text-brand-700">
              Syarat layanan
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
