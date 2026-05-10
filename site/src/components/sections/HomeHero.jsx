import heroImage from '../../assets/home/hero.png'
import { motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_INTRO_SECTION_ID, scrollToHomeIntro } from './homeSectionCta'
import { HOME_SCROLL_EASE } from './homeMotion'

export default function HomeHero() {
  const { t } = useLanguage()
  const lenis = useLenis()

  const goToIntro = () => {
    const target = `#${HOME_INTRO_SECTION_ID}`
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.15 })
    } else {
      scrollToHomeIntro()
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-stone-900">
      <motion.img
        src={heroImage}
        alt={t('home.hero.imageAlt')}
        className="absolute inset-0 h-full w-full object-cover object-center"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: HOME_SCROLL_EASE }}
      />
      <div className="absolute inset-0 bg-black/72" />

      <motion.div
        className="absolute z-10 left-1/2 top-1/2 w-full max-w-[1400px] -translate-x-1/2 -translate-y-1/2 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: HOME_SCROLL_EASE }}
      >
        <motion.h1
          className="mx-auto max-w-88 sm:max-w-160 lg:max-w-none font-cormorant text-white font-bold leading-[1] text-[44px] sm:text-[3.3rem] md:text-[4.1rem] lg:text-[74px] [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: HOME_SCROLL_EASE }}
        >
          {t('home.hero.h1')}
        </motion.h1>
        <motion.p
          className="mx-auto mt-3 max-w-84 sm:max-w-140 text-white/90 font-sans text-[20px] sm:text-[1.4rem] md:text-[31px] font-normal leading-[1] [text-shadow:0_3px_18px_rgba(0,0,0,0.5)]"
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: HOME_SCROLL_EASE }}
        >
          {t('home.hero.lead')}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 md:bottom-10 left-1/2 z-10 flex -translate-x-1/2 justify-center px-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: HOME_SCROLL_EASE }}
      >
        <button
          type="button"
          onClick={goToIntro}
          className="group inline-flex flex-col items-center text-white/90 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
          aria-label={t('home.hero.learnMoreAria')}
        >
          <span className="font-sans font-light text-[1.12rem]">{t('home.hero.learnMore')}</span>
          <motion.span
            className="mt-3 flex h-[116px] w-[116px] items-center justify-center rounded-full border-[0.5px] border-white/35 transition-colors group-hover:border-white/50"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.72, ease: HOME_SCROLL_EASE }}
            aria-hidden="true"
          >
            <motion.span
              className="flex h-full w-full items-center justify-center"
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 20 20" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.6">
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
