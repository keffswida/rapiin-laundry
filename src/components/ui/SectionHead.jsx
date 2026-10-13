/** Eyebrow "— LABEL" + judul center + deskripsi opsional. tone="dark" untuk latar biru. */
export default function SectionHead({ eyebrow, title, desc, tone = 'light', className = '' }) {
  const dark = tone === 'dark'

  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && <p className={`eyebrow justify-center ${dark ? 'text-brand-200' : 'text-brand-700'}`}>{eyebrow}</p>}
      <h2
        className={`mt-4 text-balance text-3xl leading-[1.05] font-extrabold tracking-tight sm:text-4xl lg:text-[2.9rem] ${
          dark ? 'text-white' : 'text-ink-950'
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`mx-auto mt-5 max-w-xl text-sm leading-relaxed sm:text-base ${
            dark ? 'text-white/75' : 'text-ink-600'
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  )
}
