import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HOME_PRIMARY_CTA_CLASS } from '../components/sections/homeSectionCta'
import { useLanguage } from '../i18n/LanguageContext'

const ComingSoonModalContext = createContext(null)

export function ComingSoonModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openComingSoonModal = useCallback(() => setOpen(true), [])
  const closeComingSoonModal = useCallback(() => setOpen(false), [])

  return (
    <ComingSoonModalContext.Provider value={{ openComingSoonModal, closeComingSoonModal }}>
      {children}
      <ComingSoonModalDialog open={open} onClose={closeComingSoonModal} />
    </ComingSoonModalContext.Provider>
  )
}

export function useComingSoonModal() {
  const ctx = useContext(ComingSoonModalContext)
  if (!ctx) {
    throw new Error('useComingSoonModal must be used within ComingSoonModalProvider')
  }
  return ctx
}

function ComingSoonModalDialog({ open, onClose }) {
  const titleId = useId()
  const closeBtnRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            role="presentation"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[10050] bg-[#0c1f1c]/58 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[10051] w-[min(calc(100vw-1.75rem),440px)] max-h-[min(90vh,520px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[#171412]/12 bg-[#f7f4ec] px-7 py-9 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:px-10 md:py-11"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#171412]/18 text-[#171412] transition-colors hover:bg-[#171412]/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3f35]/35 md:right-5 md:top-5"
              aria-label={t('comingSoon.close')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mx-auto max-w-[340px] text-center">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0a3f35]/85">
                {t('comingSoon.eyebrow')}
              </p>
              <h2 id={titleId} className="mt-3 font-cormorant text-[1.65rem] font-normal leading-[1.15] text-[#171412] md:text-[2rem]">
                {t('comingSoon.title')}
              </h2>
              <p className="mt-5 font-sans text-[15px] font-[250] leading-[1.55] text-[#57524e] md:text-[16px]">
                {t('comingSoon.body')}
                <Link to="/contacts" className="font-medium text-[#171412] underline-offset-2 hover:underline" onClick={onClose}>
                  {t('comingSoon.bodyContacts')}
                </Link>
                {t('comingSoon.bodySuffix')}
              </p>
              <p className="mt-4 font-sans text-[13px] font-light leading-relaxed text-[#7a756f]">
                {t('comingSoon.thanks')}
              </p>
              <button type="button" onClick={onClose} className={`mt-9 ${HOME_PRIMARY_CTA_CLASS}`}>
                {t('comingSoon.cta')}
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
