import { useState } from 'react'

/**
 * <img> dengan fallback bila src gagal dimuat (offline / 404):
 * tile gradien brand + label, bukan ikon pecah.
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  eager = false,
  children,
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-brand-100 ${className}`}>
      {failed || !src ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-600 via-brand-500 to-brand-800 text-white/90"
        >
          <span className="px-6 text-center text-sm font-semibold">Gambar tidak tersedia</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition duration-500 ${imgClassName}`}
        />
      )}
      {children}
    </div>
  )
}
