import { useEffect, useRef, useState } from 'react'

/** Reduced-motion atau tanpa IntersectionObserver → reveal dilewati. Aman untuk SSR. */
function canObserve() {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return false
  try {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/**
 * Reveal on scroll: fade + slide halus, opsional stagger via `delay`.
 * Safety:
 * - default terlihat; class tersembunyi hanya aktif bila html.js-reveal diset runtime
 *   (lihat main.jsx) → tanpa JS konten tetap tampil;
 * - prefers-reduced-motion atau tanpa IntersectionObserver → langsung tampil.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [observe] = useState(canObserve)
  const [intersected, setIntersected] = useState(false)
  const visible = !observe || intersected

  useEffect(() => {
    const node = ref.current
    if (!observe || !node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIntersected(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [observe])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
