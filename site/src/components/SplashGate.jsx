import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const MIN_SPLASH_MS = 1000
const EXIT_MS = 550

function SplashCircularLoader() {
  return (
    <div
      className="mt-11 flex h-[52px] w-[52px] items-center justify-center motion-reduce:opacity-80"
      aria-hidden="true"
    >
      <svg
        className="h-[52px] w-[52px] animate-spin text-[#e8dcc4] motion-reduce:animate-none [animation-duration:1.12s]"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="26" cy="26" r="22" stroke="currentColor" strokeOpacity="0.14" strokeWidth="2.5" />
        <circle
          cx="26"
          cy="26"
          r="22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="42 96"
        />
      </svg>
    </div>
  )
}

/**
 * Full-screen splash while the SPA boots and assets load in parallel.
 * Logo uses chromakeyed `/splash-logo-transparent.png` (see `npm run generate-icons`)
 * on a green gradient only — no flat bitmap background.
 */
export default function SplashGate({ children }) {
  const [phase, setPhase] = useState('splash') // splash | exit | done
  const { t } = useLanguage()

  useEffect(() => {
    if (phase !== 'splash') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  useEffect(() => {
    let cancelled = false

    const waitMin = () =>
      new Promise((resolve) => {
        const skipHold =
          typeof window !== 'undefined' &&
          window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        const ms = skipHold ? 0 : MIN_SPLASH_MS
        setTimeout(resolve, ms)
      })

    const waitLoad = () =>
      new Promise((resolve) => {
        if (document.readyState === 'complete') resolve()
        else window.addEventListener('load', () => resolve(), { once: true })
      })

    Promise.all([waitMin(), waitLoad()]).then(() => {
      if (!cancelled) setPhase('exit')
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => setPhase('done'), EXIT_MS)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <>
      {children}
      {phase !== 'done' ? (
        <div
          className={`fixed inset-0 z-9999 flex flex-col items-center justify-center transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150 motion-reduce:transition-opacity ${
            phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          aria-hidden={phase === 'exit'}
        >
          {/* Deep forest gradient — logo floats on transparency */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_115%_95%_at_50%_36%,#285246_0%,#163630_38%,#0a221e_72%,#051412_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.38)_100%)]"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-center px-6">
            <img
              src="/splash-logo-transparent.png"
              alt={t('splash.logoAlt')}
              decoding="async"
              fetchpriority="high"
              className="h-[min(220px,38vh)] w-auto max-w-[min(320px,88vw)] object-contain drop-shadow-[0_16px_56px_rgba(0,0,0,0.42)]"
            />
            <SplashCircularLoader />
          </div>
          <span className="sr-only">{t('splash.srLoading')}</span>
        </div>
      ) : null}
    </>
  )
}
