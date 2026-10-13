import { Link } from 'react-router-dom'
import { IconArrow } from '../components/ui/Icons'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-surface py-16">
      <div className="shell max-w-xl text-center">
        <p className="grad-num text-7xl font-extrabold tracking-tight">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900">
          Halaman tidak ketemu
        </h1>
        <p className="mt-3 text-sm text-ink-600">
          Tautannya mungkin sudah pindah. Balik ke beranda aja.
        </p>
        <Link to="/" className="btn-primary mt-8 px-6 py-4">
          Ke beranda
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
