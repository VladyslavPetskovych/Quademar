import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { NOCHEVIEJA_RESERVATION } from '../config/site'
import nocheviejaPoster from '../assets/nochevieja/nochevieja-2026-poster.webp'
import navidadPoster from '../assets/nochevieja/navidad-2026-poster.webp'
import anoNuevoPoster from '../assets/nochevieja/ano-nuevo-2027-poster.webp'
import { useLanguage } from '../i18n/LanguageContext'

const easeOut = [0.22, 1, 0.36, 1]

/**
 * Slide frame size — the tallest poster's ratio. Shorter posters (Año Nuevo is 3:4)
 * sit centred inside it at their own ratio, so the Reserve button never jumps.
 */
const POSTER_W = 1024
const POSTER_H = 1535

/** Vertical space kept under the poster for the dots + Reserve button (and breathing room). */
const RESERVE_ROOM = '7.75rem'

/** Swipe distance (px) or flick speed (px/s) that turns the slide. */
const SWIPE_DISTANCE = 60
const SWIPE_VELOCITY = 400

/**
 * Slides of the poster modal, left to right in date order. Each one drops out after
 * `endsAt` (local time). `event` is what the reservation e-mail says the request is for.
 */
const SLIDES = [
  {
    key: 'navidad',
    src: navidadPoster,
    width: 1024,
    height: 1534,
    altKey: 'nochevieja.navidadAlt',
    leadKey: 'nochevieja.formLeadNavidad',
    event: 'Comida de Navidad · Restaurante Aristo · 25/12/2026',
    subject: 'Reserva Comida de Navidad 2026',
    endsAt: new Date(2026, 11, 26, 0, 0, 0),
  },
  {
    key: 'nochevieja',
    src: nocheviejaPoster,
    width: 1024,
    height: 1535,
    altKey: 'nochevieja.alt',
    leadKey: 'nochevieja.formLead',
    event: 'Nochevieja 2026 · Restaurante Aristo · 31/12/2026',
    subject: 'Reserva Nochevieja 2026',
    endsAt: new Date(2027, 0, 1, 3, 0, 0),
  },
  {
    key: 'ano-nuevo',
    src: anoNuevoPoster,
    width: 1024,
    height: 1362,
    altKey: 'nochevieja.anoNuevoAlt',
    leadKey: 'nochevieja.formLeadAnoNuevo',
    event: 'Comida de Año Nuevo · Restaurante Aristo · 01/01/2027',
    subject: 'Reserva Comida de Año Nuevo 2027',
    endsAt: new Date(2027, 0, 2, 0, 0, 0),
  },
]

/** The badge and auto-open stop once the last event on the slides is over. */
const EVENT_ENDS_AT = new Date(Math.max(...SLIDES.map((s) => s.endsAt.getTime())))

const liveSlides = () => SLIDES.filter((s) => Date.now() < s.endsAt.getTime())

function Chevron({ className, dir }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={dir === 'left' ? 'M15 18 9 12l6-6' : 'm9 18 6-6-6-6'} />
    </svg>
  )
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
}

/** Loose phone check: +, digits, spaces, dots, dashes, brackets — and 6–15 actual digits. */
const PHONE_RE = /^\+?[\d\s().-]+$/
const isPhone = (v) => {
  const digits = v.replace(/\D/g, '').length
  return PHONE_RE.test(v) && digits >= 6 && digits <= 15
}

/**
 * Open the poster by itself at most once per browser session, after the splash has cleared —
 * and only in AUTO_OPEN_CHANCE of sessions (0.5 = every other visitor, 1 = always).
 */
const AUTO_OPEN = true
const AUTO_OPEN_CHANCE = 0.5
const AUTO_OPEN_DELAY_MS = 2600
const AUTO_OPEN_SESSION_KEY = 'guardamar.nochevieja2026.seen'

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

/** Warm the posters so the modal (and the next slide) open on already-decoded images. */
function prefetchPoster() {
  for (const s of SLIDES) {
    const img = new Image()
    img.src = s.src
  }
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
      // Roll once per session; a losing roll is remembered too, so the home page doesn't re-roll.
      if (Math.random() >= AUTO_OPEN_CHANCE) {
        sessionStorage.setItem(AUTO_OPEN_SESSION_KEY, 'skipped')
        return
      }
    } catch {
      /* storage blocked — just roll for this page view */
      if (Math.random() >= AUTO_OPEN_CHANCE) return
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
  const [view, setView] = useState('poster')
  const [slides, setSlides] = useState(SLIDES)
  // [index, direction] — direction tells the slide which side to enter from.
  const [[index, dir], setSlide] = useState([0, 0])
  const slide = slides[Math.min(index, slides.length - 1)]
  const many = slides.length > 1

  const go = useCallback(
    (step) => setSlide(([i]) => [(i + step + slides.length) % slides.length, step]),
    [slides.length],
  )

  useEffect(() => {
    setPortalRoot(document.body)
  }, [])

  // Every opening starts on the first poster, not on last time's form.
  useEffect(() => {
    if (!open) return
    setView('poster')
    // Open on the Nochevieja poster (Navidad sits to its left); once it is over, on the first live one.
    const live = liveSlides()
    setSlides(live)
    setSlide([Math.max(0, live.findIndex((s) => s.key === 'nochevieja')), 0])
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (view === 'poster' && many && e.key === 'ArrowRight') go(1)
      else if (view === 'poster' && many && e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, view, many, go])

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

          <div className="pointer-events-none relative z-10 flex h-full items-center justify-center px-4">
            <AnimatePresence mode="wait" initial={false}>
              {view === 'poster' ? (
                <motion.div
                  key="poster"
                  initial={{ opacity: 0, scale: 0.95, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.42, ease: easeOut }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="relative flex items-center">
                    {many && (
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label={t('nochevieja.prev')}
                        className="pointer-events-auto absolute -left-16 hidden h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#0c1f1c]/45 text-white backdrop-blur-md transition-colors hover:bg-[#0c1f1c]/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:flex"
                      >
                        <Chevron dir="left" className="h-5 w-5" />
                      </button>
                    )}

                    {/* The poster fills the height left over by the button; on narrow phones width is the limit. */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        width: `min(calc(100vw - 2rem), calc((var(--app-vh, 1vh) * 100 - ${RESERVE_ROOM}) * ${POSTER_W} / ${POSTER_H}))`,
                        aspectRatio: `${POSTER_W} / ${POSTER_H}`,
                      }}
                    >
                      <AnimatePresence initial={false} custom={dir}>
                        <motion.img
                          key={slide.key}
                          src={slide.src}
                          alt={t(slide.altKey)}
                          width={slide.width}
                          height={slide.height}
                          decoding="async"
                          draggable={false}
                          custom={dir}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: easeOut }}
                          drag={many ? 'x' : false}
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.6}
                          onDragEnd={(_, { offset, velocity }) => {
                            if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) go(1)
                            else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) go(-1)
                          }}
                          style={{ touchAction: 'pan-y', aspectRatio: `${slide.width} / ${slide.height}` }}
                          className={`pointer-events-auto absolute inset-0 m-auto h-auto max-h-full w-full select-none shadow-[0_30px_90px_rgba(0,0,0,0.5)] ${many ? 'cursor-grab active:cursor-grabbing' : ''}`}
                        />
                      </AnimatePresence>
                    </div>

                    {many && (
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label={t('nochevieja.next')}
                        className="pointer-events-auto absolute -right-16 hidden h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[#0c1f1c]/45 text-white backdrop-blur-md transition-colors hover:bg-[#0c1f1c]/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:flex"
                      >
                        <Chevron dir="right" className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {many && (
                    <div className="pointer-events-auto flex items-center gap-1">
                      {slides.map((s, i) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => setSlide(([cur]) => [i, i > cur ? 1 : -1])}
                          aria-label={`${i + 1} / ${slides.length}`}
                          aria-current={s.key === slide.key ? 'true' : undefined}
                          className="flex h-6 w-6 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                        >
                          <span
                            className={`block h-2 rounded-full transition-all ${s.key === slide.key ? 'w-5 bg-[#e0b872]' : 'w-2 bg-white/45'}`}
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setView('form')}
                    className="pointer-events-auto inline-flex min-h-[48px] items-center rounded-full bg-[#e0b872] px-10 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-[#0c1f1c] shadow-[0_14px_34px_-12px_rgba(224,184,114,0.6)] transition-colors hover:bg-[#ecc98a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {t('nochevieja.reserve')}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.36, ease: easeOut }}
                  className="pointer-events-auto max-h-[calc(var(--app-vh,1vh)*100-2rem)] w-full max-w-[440px] overflow-y-auto border border-[#e0b872]/35 bg-[#0c2a24] px-6 py-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:px-9 sm:py-10"
                >
                  <ReservationForm slide={slide} onBack={() => setView('poster')} onDone={onClose} />
                </motion.div>
              )}
            </AnimatePresence>
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

const inputClass =
  'mt-2 w-full border-0 border-b border-white/30 bg-transparent px-0 pb-2 pt-1 font-sans text-[16px] font-light text-white placeholder:text-white/35 focus:border-[#e0b872] focus:outline-none focus:ring-0'
const labelClass = 'font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/65'

/** Name + phone request, emailed to the hotel through FormSubmit (see NOCHEVIEJA_RESERVATION). */
function ReservationForm({ slide, onBack, onDone }) {
  const { t, locale } = useLanguage()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorKey, setErrorKey] = useState(null)
  const nameRef = useRef(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  function fail(key) {
    setStatus('error')
    setErrorKey(key)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return

    const cleanName = name.trim()
    const cleanPhone = phone.trim()
    if (!cleanName || !cleanPhone) return fail('required')
    if (!isPhone(cleanPhone)) return fail('phone')
    if (!consent) return fail('consent')
    // Bots fill every input, including the hidden honeypot — pretend success.
    if (honey) return setStatus('success')

    setStatus('loading')
    setErrorKey(null)
    try {
      const res = await fetch(NOCHEVIEJA_RESERVATION.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `${slide.subject} — ${cleanName}`,
          _template: 'table',
          _cc: NOCHEVIEJA_RESERVATION.cc,
          Nombre: cleanName,
          Teléfono: cleanPhone,
          Evento: slide.event,
          Idioma: locale === 'es' ? 'Español' : 'English',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || res.statusText)
      setStatus('success')
    } catch (err) {
      console.warn('Nochevieja reservation failed:', err)
      fail('failed')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center" aria-live="polite">
        <h2 className="font-cormorant text-[30px] font-normal leading-tight text-[#e0b872]">{t('nochevieja.formTitle')}</h2>
        <p className="mt-5 font-sans text-[15px] font-light leading-relaxed text-white/85">{t('nochevieja.success')}</p>
        <button
          type="button"
          onClick={onDone}
          className="mt-8 inline-flex min-h-[46px] items-center rounded-full border border-[#e0b872]/60 px-8 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-[#e0b872] transition-colors hover:bg-[#e0b872] hover:text-[#0c1f1c] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          {t('nochevieja.close')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate lang={locale}>
      <button
        type="button"
        onClick={onBack}
        className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#e0b872] transition-colors hover:text-white focus:outline-none focus-visible:underline"
      >
        ← {t('nochevieja.back')}
      </button>
      <h2 className="mt-5 font-cormorant text-[32px] font-normal leading-tight text-white">{t('nochevieja.formTitle')}</h2>
      <p className="mt-3 font-sans text-[14px] font-light leading-relaxed text-white/70">{t(slide.leadKey)}</p>

      <div className="mt-7 space-y-6">
        <div>
          <label htmlFor="nye-name" className={labelClass}>
            {t('nochevieja.name')} *
          </label>
          <input
            ref={nameRef}
            id="nye-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="nye-phone" className={labelClass}>
            {t('nochevieja.phone')} *
          </label>
          <input
            id="nye-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+34 600 000 000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, filled by bots. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <label className="mt-6 flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-[14px] w-[14px] shrink-0 rounded-sm accent-[#e0b872]"
        />
        <span className="font-sans text-[12px] font-light leading-[1.5] text-white/65">
          {t('nochevieja.consent')}{' '}
          <Link to="/privacy" className="underline underline-offset-2 transition-colors hover:text-white">
            {t('nochevieja.consentLink')}
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#e0b872] px-8 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-[#0c1f1c] transition-colors hover:bg-[#ecc98a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? t('nochevieja.sending') : t('nochevieja.submit')}
      </button>

      <p aria-live="polite" className="mt-4 min-h-[18px] font-sans text-[13px] font-light leading-relaxed text-[#f0a58a]">
        {status === 'error' && (
          <>
            {t(`nochevieja.errors.${errorKey}`)}
            {errorKey === 'failed' && (
              <>
                {' '}
                <a href={`mailto:${NOCHEVIEJA_RESERVATION.email}`} className="underline underline-offset-2">
                  {NOCHEVIEJA_RESERVATION.email}
                </a>
                .
              </>
            )}
          </>
        )}
      </p>
    </form>
  )
}
