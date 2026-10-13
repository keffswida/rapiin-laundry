import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconEye, IconPin, LogoMark } from '../../components/ui/Icons'
import { setAuthenticated } from '../auth'

/** Halaman login admin — split: foto kiri, form kanan. */
export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      setError('Masukkan email dan kata sandi untuk melanjutkan.')
      return
    }
    setError('')
    setAuthenticated()
    navigate('/admin', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Panel kiri: foto */}
      <div className="relative hidden w-1/2 overflow-hidden bg-brand-950 lg:block">
        <img
          src="/images/promise.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/25 to-brand-950/10"
        />
        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9 rounded-lg" />
            <div className="leading-tight">
              <p className="text-sm font-semibold">Rapi-In Laundry</p>
              <p className="text-xs text-white/60">Panel admin outlet</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-base font-medium text-white/90">
            “Cucian beres, hidup santai.”
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-white/55">
            <IconPin className="h-3.5 w-3.5" />
            Outlet Utama · Jl. Melati No.12
          </p>
        </div>
      </div>

      {/* Panel kanan: form */}
      <div className="flex w-full flex-col justify-between px-6 py-8 sm:px-12 lg:w-1/2 lg:px-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 lg:hidden">
            <LogoMark className="h-8 w-8 rounded-md" />
            <p className="text-sm font-semibold text-ink-900">Rapi-In Laundry</p>
          </div>
          <a
            href="/"
            className="ml-auto text-xs font-medium text-ink-500 transition hover:text-brand-700"
          >
            ← Kembali ke situs
          </a>
        </div>

        <main id="konten" className="mx-auto w-full max-w-sm py-10">
          <h1 className="text-xl font-semibold tracking-tight text-ink-900">Masuk ke akunmu</h1>
          <p className="mt-1 text-sm text-ink-500">
            Kelola outlet Rapi-In Laundry dari satu tempat.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? 'login-error' : undefined}
                placeholder="andi@rapiin.id"
                className="adm-input mt-1.5"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-ink-800">
                  Kata sandi
                </label>
                <a href="#" className="text-xs font-medium text-brand-700 hover:underline">
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'login-error' : undefined}
                  placeholder="••••••••"
                  className="adm-input pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-ink-400 transition hover:text-ink-700"
                >
                  <IconEye className="h-4 w-4" />
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-ink-300 accent-[#1d4ed8]"
              />
              Ingat saya
            </label>

            {error && (
              <p
                id="login-error"
                role="alert"
                className="rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
              >
                {error}
              </p>
            )}

            <button type="submit" className="adm-btn-primary mt-1 h-10 w-full">
              Masuk
            </button>

            <p className="text-center text-xs text-ink-400">
              Belum punya akses?{' '}
              <a href="#" className="font-medium text-brand-700 hover:underline">
                Hubungi dukungan
              </a>
            </p>
          </form>
        </main>

        <footer className="flex flex-col gap-1 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Rapi-In Laundry. Seluruh hak dilindungi.</p>
          <p className="text-ink-300">Pratinjau desain · Autentikasi tidak aktif</p>
        </footer>
      </div>
    </div>
  )
}
