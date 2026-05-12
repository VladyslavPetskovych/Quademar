import heroImage from '../../assets/home/hero.png'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_INTRO_SECTION_ID, scrollToHomeIntro } from './homeSectionCta'
import { HOME_SCROLL_EASE } from './homeMotion'

/** Hand-tuned placement so rating stars feel natural vs the serif headline. */
const HERO_STAR_STYLE = [
  { rotate: '-7deg', y: '-0.02em', scale: 1.04 },
  { rotate: '6deg', y: '0.03em', scale: 0.95 },
  { rotate: '-5deg', y: '-0.02em', scale: 1 },
  { rotate: '7deg', y: '0.02em', scale: 0.96 },
]

function HeroRatingStars() {
  return (
    <span
      className="mt-3 inline-flex flex-row items-center justify-center gap-[0.06em] font-sans not-italic leading-none tracking-[0.02em] sm:mt-4 md:mt-5"
      aria-hidden="true"
    >
      {HERO_STAR_STYLE.map((s, i) => (
        <span
          key={i}
          className="inline-block bg-linear-to-br from-amber-50 via-amber-200 to-amber-600 bg-clip-text text-[0.48em] text-transparent sm:text-[0.46em] md:text-[0.44em] filter-[drop-shadow(0_1px_6px_rgba(251,191,36,0.45))]"
          style={{
            transform: `rotate(${s.rotate}) translateY(${s.y}) scale(${s.scale})`,
          }}
        >
          ★
        </span>
      ))}
    </span>
  )
}

export default function HomeHero() {
  const { t } = useLanguage()
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()
  const [isNarrowViewport, setIsNarrowViewport] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const apply = () => setIsNarrowViewport(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const goToIntro = () => {
    const target = `#${HOME_INTRO_SECTION_ID}`
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.15 })
    } else {
      scrollToHomeIntro()
    }
  }

  const lightMotion = reduceMotion || isNarrowViewport
  const imageScaleTransition = lightMotion
    ? { duration: 0 }
    : { duration: 1.8, ease: HOME_SCROLL_EASE }

  return (
    <section className="relative isolate min-h-dvh w-full overflow-hidden bg-stone-900 max-md:min-h-[min(78dvh,640px)] md:min-h-screen">
      <motion.img
        src={heroImage}
        alt={t('home.hero.imageAlt')}
        decoding="async"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center max-md:object-[center_30%]"
        initial={{ scale: lightMotion ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={imageScaleTransition}
      />
      <div className="absolute inset-0 bg-black/72" />

      <motion.div
        className="absolute z-10 left-1/2 w-full max-w-[1400px] -translate-x-1/2 px-4 text-center top-1/2 -translate-y-1/2 max-md:top-[max(5.5rem,calc(env(safe-area-inset-top,0px)+4.75rem))] max-md:translate-y-0 md:top-1/2 md:-translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: lightMotion ? 0.35 : 0.9, ease: HOME_SCROLL_EASE }}
      >
        <motion.h1
          className="mx-auto flex max-w-88 flex-col items-center sm:max-w-160 lg:max-w-none font-cormorant text-white font-bold leading-[1.05] text-[40px] sm:text-[3.3rem] md:text-[4.1rem] lg:text-[74px] [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]"
          initial={{ y: lightMotion ? 0 : 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: lightMotion ? 0.35 : 0.9, delay: lightMotion ? 0 : 0.2, ease: HOME_SCROLL_EASE }}
          aria-label={t('home.hero.h1Aria')}
        >
          <span className="block text-balance">{t('home.hero.h1Title')}</span>
          <HeroRatingStars />
        </motion.h1>
        <motion.p
          className="mx-auto mt-3 max-w-84 sm:max-w-140 text-white/90 font-sans text-[18px] sm:text-[1.4rem] md:text-[31px] font-normal leading-[1.15] [text-shadow:0_3px_18px_rgba(0,0,0,0.5)]"
          initial={{ y: lightMotion ? 0 : 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: lightMotion ? 0.35 : 0.9, delay: lightMotion ? 0.05 : 0.35, ease: HOME_SCROLL_EASE }}
        >
          {t('home.hero.lead')}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-10 flex -translate-x-1/2 justify-center px-4 max-md:bottom-6 md:bottom-8 lg:bottom-10"
        initial={{ opacity: 0, y: lightMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: lightMotion ? 0.35 : 0.8, delay: lightMotion ? 0.1 : 0.6, ease: HOME_SCROLL_EASE }}
      >
        <button
          type="button"
          onClick={goToIntro}
          className="group inline-flex flex-col items-center text-white/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
          aria-label={t('home.hero.learnMoreAria')}
        >
          <span className="font-sans font-light text-[1.12rem]">{t('home.hero.learnMore')}</span>
          <motion.span
            className="mt-3 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[0.5px] border-white/35 transition-colors group-hover:border-white/50 md:h-[116px] md:w-[116px]"
            initial={{ opacity: 0, y: lightMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: lightMotion ? 0.25 : 0.55, delay: lightMotion ? 0 : 0.72, ease: HOME_SCROLL_EASE }}
            aria-hidden="true"
          >
            <motion.span
              className="flex h-full w-full items-center justify-center"
              animate={lightMotion ? undefined : { y: [0, 7, 0] }}
              transition={
                lightMotion ? undefined : { repeat: Infinity, duration: 2.3, ease: 'easeInOut' }
              }
            >
              <svg viewBox="0 0 20 20" className="h-9 w-9 md:h-10 md:w-10" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M10 3v13" />
                <path d="M5.5 12.5L10 17l4.5-4.5" />
              </svg>
            </motion.span>
          </motion.span>
        </button>
      </motion.div>
    </section>
  )
}
