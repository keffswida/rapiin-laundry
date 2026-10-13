/** Baris info biru muda (pola sama dengan landing). */
export default function InfoBanner({ children, className = '' }) {
  return (
    <p
      className={`flex items-start gap-2 rounded-md bg-brand-50 px-3 py-2 text-xs font-medium text-brand-800 ${className}`}
    >
      <span
        aria-hidden="true"
        className="mt-px inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[9px] font-semibold text-white"
      >
        i
      </span>
      <span>{children}</span>
    </p>
  )
}
