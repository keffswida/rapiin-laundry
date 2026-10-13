import { Link } from 'react-router-dom'

/** Placeholder rute admin yang belum dibuat. */
export default function AdminPlaceholder({ title }) {
  return (
    <div className="adm-card mx-auto w-full max-w-3xl p-8 text-center sm:p-10">
      <p className="text-[11px] font-medium tracking-widest text-ink-400 uppercase">
        Fase berikutnya
      </p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight text-ink-900">
        {title} belum tersedia
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
        Halaman ini akan dibangun setelah tampilan Ringkasan disetujui. Struktur shell dan
        komponen dashboard sudah siap.
      </p>
      <Link
        to="/admin"
        className="adm-btn-primary mt-6 inline-flex"
      >
        ← Kembali ke Ringkasan
      </Link>
    </div>
  )
}
