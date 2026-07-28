import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import openingPoster from '../assets/opening/opening-poster.webp'
import { useLanguage } from '../i18n/LanguageContext'

const easeOut = [0.22, 1, 0.36, 1]

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

/** Floating home-page badge that opens the grand-opening poster. */
export default function OpeningInvitation() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  /** Warm the poster before the click so the modal opens on an already-decoded image. */
  const prefetch = useCallback(() => {
    const img = new Image()
    img.src = openingPoster
  }, [])

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        aria-label={t('opening.badgeAria')}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut, delay: 1.1 }}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0a3f35] py-2.5 pl-3.5 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_14px_34px_-12px_rgba(10,63,53,0.75)] transition-colors hover:bg-[#0c4c40] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:text-[12px]"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e0b872] opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e0b872]" />
        </span>
        {t('opening.badge')}
      </motion.button>

      <OpeningPosterModal open={open} onClose={close} />
    </>
  )
}

function OpeningPosterModal({ open, onClose }) {
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
          key="opening-poster"
          role="dialog"
          aria-modal="true"
          aria-label={t('opening.title')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: easeOut }}
          className="fixed inset-0 z-[10050] isolate"
        >
          <button
            type="button"
            aria-label={t('opening.close')}
            onClick={onClose}
            className="absolute inset-0 z-0 h-full w-full cursor-default border-0 bg-[#0c1f1c]/72 backdrop-blur-md"
          />

          <div className="pointer-events-none relative z-10 flex h-full items-center justify-center px-0 md:px-4">
            {/* Width comes from the 790×1125 poster ratio so the frame hugs the image: it fills
                95% of the viewport height, then falls back to the width that is available —
                on phones that width is the binding limit, so the poster runs edge to edge. */}
            <motion.img
              src={openingPoster}
              alt={t('opening.alt')}
              width={790}
              height={1125}
              decoding="async"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.42, ease: easeOut }}
              className="pointer-events-auto h-auto w-[min(100%,calc(95dvh*790/1125))] shadow-[0_30px_90px_rgba(0,0,0,0.5)] md:rounded-lg md:ring-1 md:ring-white/12"
            />
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('opening.close')}
            className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:right-6 md:h-12 md:w-12"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalRoot,
  )
}
