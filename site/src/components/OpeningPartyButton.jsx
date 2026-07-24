import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HOME_PRIMARY_CTA_CLASS } from './sections/homeSectionCta'
import { useLanguage } from '../i18n/LanguageContext'
import adEn from '../assets/home/ads/english.png'
import adEs from '../assets/home/ads/spanish.png'

const EASE = [0.22, 1, 0.36, 1]

/** Auto-open on every second website visit. Module-scoped so it runs once per page load
 *  (also guards against React StrictMode's double-mount in dev). */
const VISIT_KEY = 'guardamar.jazzNightVisits'
let visitCounted = false

function shouldAutoOpen() {
  if (visitCounted) return false
  visitCounted = true
  try {
    const count = (parseInt(localStorage.getItem(VISIT_KEY) || '0', 10) || 0) + 1
    localStorage.setItem(VISIT_KEY, String(count))
    return count % 2 === 0 // every 2nd open: visits 2, 4, 6…
  } catch {
    return false
  }
}

const panelV = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.24, ease: EASE } },
}

/**
 * Floating badge (bottom-left) + Jazz Night poster modal. Shows the English or Spanish
 * poster based on the chosen language. Auto-opens on every second visit; rendered on home only.
 */
export default function OpeningPartyButton() {
  const { t, locale } = useLanguage()
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef(null)

  const poster = locale === 'es' ? adEs : adEn
  const monthShort = locale === 'es' ? 'Jl' : 'Jul'

  // Auto-open every second website visit.
  useEffect(() => {
    if (shouldAutoOpen()) setOpen(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Floating badge — circular date chip */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('openingParty.ariaOpen')}
        aria-haspopup="dialog"
        initial={{ opacity: 0, y: 24, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
        whileHover={{ y: -2, scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-[10040] flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#0a3f35] text-white shadow-[0_14px_34px_-10px_rgba(10,63,53,0.7)] ring-1 ring-white/10 transition-colors hover:bg-[#0c4b3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:h-[60px] md:w-[60px]"
      >
        <span className="absolute inset-0 rounded-full bg-[#0a3f35]/40 motion-safe:animate-ping" aria-hidden="true" />
        <span className="relative font-sans text-[8px] font-semibold uppercase tracking-[0.16em] text-[#e9c98a]">
          {monthShort}
        </span>
        <span className="relative font-cormorant text-[22px] font-normal leading-none text-white md:text-[24px]">
          25
        </span>
      </motion.button>

      {/* Modal — poster image with controls beneath it */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              role="presentation"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="fixed inset-0 z-[10050] bg-[#0c1f1c]/65 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t('openingParty.imageAlt')}
              variants={panelV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed left-1/2 top-1/2 z-[10051] flex max-h-[94dvh] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={poster}
                alt={t('openingParty.imageAlt')}
                className="block h-auto max-h-[72dvh] w-auto max-w-full rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              />

              {/* Controls — outside the image */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
                className="mt-5 flex w-full items-center justify-center gap-3"
              >
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  {t('openingParty.close')}
                </button>
                <Link
                  to="/contacts"
                  onClick={() => setOpen(false)}
                  className={`${HOME_PRIMARY_CTA_CLASS} rounded-full py-3`}
                >
                  {t('openingParty.cta')}
                </Link>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
