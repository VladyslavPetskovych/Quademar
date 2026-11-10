import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import nocheviejaPoster from '../assets/nochevieja/nochevieja-2026-poster.webp'
import { useLanguage } from '../i18n/LanguageContext'

const easeOut = [0.22, 1, 0.36, 1]

/** Poster pixel size — keeps the frame hugging the image at every viewport. */
const POSTER_W = 1024
const POSTER_H = 1535

/** The badge and auto-open stop once the party is over (local time, 1 Jan 2027 03:00). */
const EVENT_ENDS_AT = new Date(2027, 0, 1, 3, 0, 0)

/** Open the poster by itself once per browser session, after the splash has cleared. */
const AUTO_OPEN = true
const AUTO_OPEN_DELAY_MS = 2600
const AUTO_OPEN_SESSION_KEY = 'guardamar.nochevieja2026.seen'

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

/** Warm the poster so the modal opens on an already-decoded image. */
function prefetchPoster() {
  const img = new Image()
  img.src = nocheviejaPoster
}

/** Floating home-page badge that opens the Nochevieja 2026 menu poster. */
export default function NewYearEveInvitation() {
  const { t } = useLanguage()
  // Decided after mount so the prerendered HTML never depends on the build date.
  const [live, setLive] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    setLive(Date.now() < EVENT_ENDS_AT.getTime())
  }, [])

  useEffect(() => {
    if (!live || !AUTO_OPEN) return
    try {
      if (sessionStorage.getItem(AUTO_OPEN_SESSION_KEY)) return
    } catch {
      /* storage blocked — fall through and just open once */
    }

    let timer
    const schedule = () => {
      prefetchPoster()
      timer = window.setTimeout(() => {
        setOpen(true)
        try {
          sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, '1')
        } catch {
          /* ignore */
        }
      }, AUTO_OPEN_DELAY_MS)
    }

    // The splash holds until `load`, then fades — wait for it so the poster never opens beneath it.
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      window.removeEventListener('load', schedule)
      window.clearTimeout(timer)
    }
  }, [live])

  if (!live) return null

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={prefetchPoster}
        onFocus={prefetchPoster}
        aria-label={t('nochevieja.badgeAria')}
        aria-haspopup="dialog"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut, delay: 1.1 }}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0a3f35] py-2.5 pl-3.5 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_-12px_rgba(10,63,53,0.75)] transition-colors hover:bg-[#0c4c40] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:text-[12px]"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e0b872] opacity-70 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e0b872]" />
        </span>
        {t('nochevieja.badge')}
      </motion.button>

      <NewYearEvePosterModal open={open} onClose={close} />
    </>
  )
}

function NewYearEvePosterModal({ open, onClose }) {
  const { t } = useLanguage()
  const closeRef = useRef(null)
  const [portalRoot, setPortalRoot] = useState(null)

  useEffect(() => {
    setPortalRoot(document.body)
  }, [])

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
    closeRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!portalRoot) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="nochevieja-poster"
          role="dialog"
          aria-modal="true"
          aria-label={t('nochevieja.title')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: easeOut }}
          className="fixed inset-0 z-[10050] isolate"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label={t('nochevieja.close')}
            onClick={onClose}
            className="absolute inset-0 z-0 h-full w-full cursor-default border-0 bg-[#0c1f1c]/72 backdrop-blur-md"
          />

          <div className="pointer-events-none relative z-10 flex h-full items-center justify-center">
            {/* The poster fills the screen height; on narrow phones width becomes the limit instead. */}
            <motion.img
              src={nocheviejaPoster}
              alt={t('nochevieja.alt')}
              width={POSTER_W}
              height={POSTER_H}
              decoding="async"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.42, ease: easeOut }}
              style={{ width: `min(100%, calc(var(--app-vh, 1vh) * 100 * ${POSTER_W} / ${POSTER_H}))` }}
              className="pointer-events-auto h-auto max-h-[calc(var(--app-vh,1vh)*100)] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.5)]"
            />
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('nochevieja.close')}
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#0c1f1c]/45 text-white backdrop-blur-md transition-colors hover:bg-[#0c1f1c]/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:right-6 md:h-12 md:w-12"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalRoot,
  )
}
