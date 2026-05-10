import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import comfortImage from '../../assets/home/residence/comfort.png'
import toursImage from '../../assets/home/residence/tours.png'
import relaxImage from '../../assets/home/residence/relax.png'
import beachImage from '../../assets/home/residence/beach.png'
import HomeResidenceCard from './HomeResidenceCard'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_SCROLL_EASE, HOME_SECTION_VIEWPORT } from './homeMotion'

const RESIDENCE_META = [
  { id: 'comfort', image: comfortImage, imageClassName: 'brightness-[0.85]' },
  { id: 'tours', image: toursImage },
  { id: 'relax', image: relaxImage },
  { id: 'beach', image: beachImage },
]

const FALLBACK_CARD_STEP = 403

export default function HomeResidenceSection() {
  const { t } = useLanguage()

  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, delay, ease: HOME_SCROLL_EASE },
    }),
  }

  const sliderRef = useRef(null)
  const loopCards = useMemo(() => [...RESIDENCE_META, ...RESIDENCE_META, ...RESIDENCE_META], [])

  const getCardStep = () => {
    if (!sliderRef.current) return FALLBACK_CARD_STEP
    const track = sliderRef.current.firstElementChild
    const card = track?.firstElementChild
    if (!track || !card) return FALLBACK_CARD_STEP

    const trackStyle = window.getComputedStyle(track)
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0')
    return card.getBoundingClientRect().width + gap
  }

  const getLoopWidth = () => RESIDENCE_META.length * getCardStep()

  const handleSlide = (direction) => {
    if (!sliderRef.current) return
    const step = getCardStep()
    sliderRef.current.scrollBy({
      left: direction * step,
      behavior: 'smooth',
    })
  }

  const normalizeScrollPosition = () => {
    if (!sliderRef.current) return
    const current = sliderRef.current.scrollLeft
    const loopWidth = getLoopWidth()

    if (current < loopWidth * 0.5) {
      sliderRef.current.scrollLeft = current + loopWidth
    } else if (current > loopWidth * 1.5) {
      sliderRef.current.scrollLeft = current - loopWidth
    }
  }

  useEffect(() => {
    if (!sliderRef.current) return
    const syncLoopStart = () => {
      if (!sliderRef.current) return
      sliderRef.current.scrollLeft = getLoopWidth()
    }

    syncLoopStart()
    window.addEventListener('resize', syncLoopStart)
    return () => window.removeEventListener('resize', syncLoopStart)
  }, [])

  return (
    <motion.section
      className="overflow-hidden bg-[#f3eee6] py-6 md:py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={HOME_SECTION_VIEWPORT}
      transition={{ duration: 0.8, ease: HOME_SCROLL_EASE }}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-6">
        <div className="relative">
          <motion.div
            className="max-w-[760px] text-left md:mx-auto md:text-center"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.82, ease: HOME_SCROLL_EASE }}
          >
            <motion.h2
              className="max-w-[320px] font-cormorant text-[40px] font-normal leading-[0.9] tracking-normal text-[#181614] md:max-w-none md:text-[40px] md:leading-none md:text-center"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              custom={0.08}
              viewport={{ once: true, amount: 0.75 }}
            >
              {t('home.residence.h2')}
            </motion.h2>
            <motion.p
              className="mt-6 max-w-[360px] font-sans text-[16px] font-[250] leading-none tracking-normal text-[#56524f] md:mx-auto md:mt-4 md:max-w-[700px] md:text-center"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              custom={0.2}
              viewport={{ once: true, amount: 0.7 }}
            >
              {t('home.residence.lead')}
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center justify-end gap-2.5 lg:hidden"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, ease: HOME_SCROLL_EASE }}
          >
            <button
              type="button"
              aria-label={t('aria.prevSlide')}
              onClick={() => handleSlide(-1)}
              className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#18342f]/40 text-[#18342f]"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t('aria.nextSlide')}
              onClick={() => handleSlide(1)}
              className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#18342f]/40 text-[#18342f]"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex"
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, ease: HOME_SCROLL_EASE }}
          >
            <button
              type="button"
              aria-label={t('aria.prevSlide')}
              onClick={() => handleSlide(-1)}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#18342f]/30 text-[#18342f]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t('aria.nextSlide')}
              onClick={() => handleSlide(1)}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#18342f]/30 text-[#18342f]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </div>

        <motion.div
          ref={sliderRef}
          onScroll={normalizeScrollPosition}
          className="mt-8 -mr-4 overflow-x-auto overflow-y-hidden scroll-smooth md:mt-12 md:mr-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.82, ease: HOME_SCROLL_EASE }}
        >
          <div className="flex min-w-max gap-2.5 pr-4 md:pr-2.5">
            {loopCards.map((card, index) => (
              <HomeResidenceCard
                key={`${card.id}-${index}`}
                image={card.image}
                imageAlt={t(`home.residence.${card.id}Alt`)}
                title={t(`home.residence.${card.id}`)}
                imageClassName={card.imageClassName}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
