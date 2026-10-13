const AUTH_KEY = 'rapiin.admin'

/**
 * Bypass: aktif otomatis di dev server (import.meta.env.DEV).
 * Preview/prod bisa diaktifkan lewat VITE_ADMIN_BYPASS=1 (mis. di .env.local).
 * Auth tidak dihapus — gate tetap jalan saat bypass mati.
 */
export const ADMIN_BYPASS =
  import.meta.env.DEV || import.meta.env.VITE_ADMIN_BYPASS === '1'

export function isAuthenticated() {
  if (ADMIN_BYPASS) return true
  return typeof window !== 'undefined' && window.localStorage.getItem(AUTH_KEY) === '1'
}

export function setAuthenticated() {
  window.localStorage.setItem(AUTH_KEY, '1')
}

export function clearAuthenticated() {
  window.localStorage.removeItem(AUTH_KEY)
}
