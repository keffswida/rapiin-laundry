/** Judul halaman + subjudul + aksi kanan. */
export default function PageHeader({ title, desc, actions }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ink-900">{title}</h1>
        {desc && <p className="mt-1 max-w-2xl text-sm text-ink-500">{desc}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
