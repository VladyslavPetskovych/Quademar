import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { messages } from './messages'

export const LOCALE_STORAGE_KEY = 'guardamar.locale'

function getByPath(obj, path) {
  if (!obj || !path) return undefined
  let cur = obj
  for (const part of path.split('.')) {
    cur = cur?.[part]
    if (cur === undefined) return undefined
  }
  return cur
}

function readStoredLocale() {
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (v === 'en' || v === 'es') return v
  } catch {
    /* ignore */
  }
  return null
}

function initialLocale() {
  const stored = typeof localStorage !== 'undefined' ? readStoredLocale() : null
  if (stored) return stored
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) return 'es'
  return 'en'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale)

  const setLocale = useCallback((next) => {
    if (next !== 'en' && next !== 'es') return
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === 'es' ? 'en' : 'es'
      try {
        localStorage.setItem(LOCALE_STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const t = useCallback(
    (key) => {
      const localized = getByPath(messages[locale], key)
      if (localized !== undefined && localized !== null && localized !== '') return localized
      const enFallback = getByPath(messages.en, key)
      if (enFallback !== undefined && enFallback !== null && enFallback !== '') return enFallback
      return key
    },
    [locale],
  )

  const tf = useCallback(
    (key, vars = {}) => {
      let s = t(key)
      for (const [k, v] of Object.entries(vars)) {
        s = s.split(`{{${k}}}`).join(String(v))
      }
      return s
    },
    [t],
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      tf,
    }),
    [locale, setLocale, toggleLocale, t, tf],
  )

  useEffect(() => {
    document.documentElement.lang = locale === 'es' ? 'es' : 'en'
  }, [locale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
