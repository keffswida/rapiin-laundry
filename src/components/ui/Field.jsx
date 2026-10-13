import { useId } from 'react'

/** Label + kontrol + hint/error. Pesan error punya id untuk aria-describedby. */
export function Field({ label, htmlFor, hint, error, children, className = '' }) {
  const autoId = useId()
  const baseId = htmlFor ?? autoId
  const hintId = hint && !error ? `${baseId}-hint` : undefined
  const errorId = error ? `${baseId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={className}>
      {htmlFor ? (
        <label className="field-label" htmlFor={htmlFor}>
          {label}
        </label>
      ) : (
        <span className="field-label" id={`${baseId}-label`}>
          {label}
        </span>
      )}

      {typeof children === 'function'
        ? children({
            describedBy,
            invalid: Boolean(error),
            labelId: htmlFor ? undefined : `${baseId}-label`,
          })
        : children}

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-ink-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export function ErrorSummary({ id, message }) {
  if (!message) return null
  return (
    <div
      id={id}
      role="alert"
      tabIndex={-1}
      className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 focus:outline-none"
    >
      {message}
    </div>
  )
}
