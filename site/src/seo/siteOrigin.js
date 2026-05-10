import { SITE_ORIGIN_DEFAULT } from '../config/site'

/** Production site origin without trailing slash. Env wins; production builds fall back to `SITE_ORIGIN_DEFAULT`. */
export function getSiteOrigin() {
  const raw = import.meta.env?.VITE_SITE_ORIGIN
  const trimmed = typeof raw === 'string' ? raw.replace(/\/+$/, '') : ''
  if (trimmed) return trimmed
  if (import.meta.env.PROD) return SITE_ORIGIN_DEFAULT
  return ''
}

/** Absolute URL for a path (leading slash). Falls back to pathname-only if origin unset (build preview). */
export function absoluteUrl(pathname = '/') {
  const origin = getSiteOrigin()
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (typeof window !== 'undefined') {
    const base = origin || window.location.origin
    return `${base}${path === '//' ? '/' : path}`
  }
  if (origin) return `${origin}${path}`
  return path
}
