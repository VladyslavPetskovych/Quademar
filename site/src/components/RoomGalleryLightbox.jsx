import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { suiteMeta } from '../lib/suiteImages'
import { blurBackgroundStyle } from './sections/roomImageStyles'

const easeSmooth = [0.4, 0, 0.2, 1]
const fadeTransition = { duration: 0.5, ease: easeSmooth }

function ChevronLeft({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="M14 6 8 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

const navBtnClass =
  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[background-color,border-color,transform] hover:border-white/40 hover:bg-white/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-95 md:h-14 md:w-14'

/**
 * @param {{
 *   open: boolean,
 *   onClose: () => void,
 *   images: Array<{ src: string, alt?: string }>,
 *   index: number,
 *   onIndexChange: (index: number) => void,
 *   title: string,
 *   labels: { dialog: string, close: string, prev: string, next: string },
 *   imageKeyPrefix?: string,
 * }} props
 */
export default function RoomGalleryLightbox({
  open,
  onClose,
  images,
  index,
  onIndexChange,
  title,
  labels,
  imageKeyPrefix = 'lightbox',
}) {
  const closeRef = useRef(null)
  const [portalRoot, setPortalRoot] = useState(null)
  const total = images.length
  const safeIndex = total ? ((index % total) + total) % total : 0
  const slide = images[safeIndex]
  const slideMeta = slide ? suiteMeta(slide.src) : null
  const showNav = total > 1

  const goPrev = useCallback(() => {
    if (total <= 1) return
    onIndexChange((safeIndex - 1 + total) % total)
  }, [onIndexChange, safeIndex, total])

  const goNext = useCallback(() => {
    if (total <= 1) return
    onIndexChange((safeIndex + 1) % total)
  }, [onIndexChange, safeIndex, total])

  useEffect(() => {
    setPortalRoot(document.body)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, goPrev, goNext])

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

  useEffect(() => {
    if (!open || total <= 1) return
    const preload = (i) => {
      const src = images[i]?.src
      if (!src) return
      const img = new Image()
      img.src = src
    }
    preload((safeIndex + 1) % total)
    preload((safeIndex - 1 + total) % total)
  }, [open, images, safeIndex, total])

  if (!portalRoot) return null

  return createPortal(
    <AnimatePresence>
      {open && slide ? (
        <motion.div
          key="room-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: easeSmooth }}
          className="fixed inset-0 z-[10060] isolate"
        >
          <button
            type="button"
            aria-label={labels.close}
            className="absolute inset-0 z-0 h-full w-full cursor-default border-0 bg-[#0a0c0b]/94 backdrop-blur-xl"
            onClick={onClose}
          />

          <div className="pointer-events-none relative z-10 flex h-full min-h-0 flex-col px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] md:px-8">
            <motion.div
              className="pointer-events-auto flex shrink-0 items-center justify-between gap-4"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: easeSmooth, delay: 0.05 }}
            >
              <p className="font-cormorant text-[clamp(1.125rem,3vw,1.5rem)] font-normal leading-tight text-white/90">
                {title}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={labels.close}
                className={`${navBtnClass} h-11 w-11 md:h-12 md:w-12`}
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </motion.div>

            <motion.div
              className="relative flex min-h-0 flex-1 items-center justify-center py-4 md:py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.42, ease: easeSmooth, delay: 0.06 }}
            >
              <figure className="pointer-events-none relative mx-auto h-[min(78vh,900px)] w-full max-w-[min(1200px,96vw)] px-12 md:px-20">
                <motion.div
                  className="pointer-events-auto relative h-full w-full overflow-hidden rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                  style={blurBackgroundStyle(slideMeta)}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={`${imageKeyPrefix}-${safeIndex}`}
                      src={slide.src}
                      alt={slide.alt ?? title}
                      className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={fadeTransition}
                      draggable={false}
                    />
                  </AnimatePresence>
                </motion.div>

                {showNav ? (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      aria-label={labels.prev}
                      className={`${navBtnClass} pointer-events-auto absolute left-0 top-1/2 z-20 -translate-y-1/2 md:left-[-4.5rem]`}
                    >
                      <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      aria-label={labels.next}
                      className={`${navBtnClass} pointer-events-auto absolute right-0 top-1/2 z-20 -translate-y-1/2 md:right-[-4.5rem]`}
                    >
                      <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
                    </button>
                  </>
                ) : null}
              </figure>
            </motion.div>

            {showNav ? (
              <p
                className="shrink-0 text-center font-sans text-[15px] font-normal tabular-nums tracking-wide text-white/75"
                aria-live="polite"
              >
                {String(safeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalRoot,
  )
}
