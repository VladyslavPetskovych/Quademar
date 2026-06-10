import { useState } from 'react'
import beach3Image from '../../assets/home/beach3.png'
import aristo1Image from '../../assets/home/aristo1.jpg'
import aristo2Image from '../../assets/home/aristo2.jpg'
import aristoStamp from '../../assets/logo/royal_green/aristo.png'
import { AnimatePresence, motion } from 'framer-motion'
import CircleArrowButton from '../ui/CircleArrowButton'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_PRIMARY_CTA_CLASS } from './homeSectionCta'
import { HOME_SCROLL_EASE, HOME_SECTION_VIEWPORT } from './homeMotion'

export default function HomeJardinSection() {
  const { t, tf } = useLanguage()
  const slides = [
    { src: aristo1Image, alt: t('home.jardin.aristo1Alt') },
    { src: beach3Image, alt: t('home.jardin.imageAlt') },
    { src: aristo2Image, alt: t('home.jardin.aristo2Alt') },
  ]
  const [slide, setSlide] = useState(0)
  const nextSlide = () => setSlide((i) => (i + 1) % slides.length)
  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, delay, ease: HOME_SCROLL_EASE },
    }),
  }

  return (
    <motion.section
      className="bg-[#f3eee6] py-5 md:py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={HOME_SECTION_VIEWPORT}
      transition={{ duration: 0.76, ease: HOME_SCROLL_EASE }}
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 md:grid-cols-2 md:px-6 lg:gap-14">
        <motion.div
          className="order-2 flex h-[520px] w-full flex-col gap-2.5 px-0 py-2.5 sm:h-[640px] md:order-1 md:h-[420px] lg:h-[560px] lg:w-full lg:justify-self-start xl:h-[801px] xl:w-[673px]"
          initial={{ x: -36, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.88, ease: HOME_SCROLL_EASE }}
        >
          <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.img
                key={slide}
                src={slides[slide].src}
                alt={slides[slide].alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: HOME_SCROLL_EASE }}
              />
            </AnimatePresence>
            <CircleArrowButton
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
              label={t('aria.nextSlide')}
            />
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={tf('aria.goToSlide', { n: i + 1 })}
                  aria-current={i === slide}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? 'w-6 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="order-1 max-w-[560px] md:order-2 md:max-w-none lg:pt-1 xl:max-w-[560px]"
          initial={{ x: 36, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.88, ease: HOME_SCROLL_EASE, delay: 0.1 }}
        >
          <motion.img
            src={aristoStamp}
            alt={t('home.jardin.stampAlt')}
            className="mb-4 -ml-10 h-32 w-auto self-start"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, rotate: -1.5 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
          <motion.h3
            className="mt-6 font-cormorant text-[40px] leading-[1.06] text-[#171412]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.12}
            viewport={{ once: true, amount: 0.7 }}
          >
            {t('home.jardin.h3')}
          </motion.h3>
          <motion.p
            className="mt-6 text-[16px] leading-[1.5] text-[#595552]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.22}
            viewport={{ once: true, amount: 0.62 }}
          >
            {t('home.jardin.p1')}
          </motion.p>
          <motion.p
            className="mt-3 text-[16px] leading-[1.5] text-[#595552]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.32}
            viewport={{ once: true, amount: 0.62 }}
          >
            {t('home.jardin.p2')}
          </motion.p>
          <motion.p
            className="mt-3 text-[16px] leading-[1.5] text-[#595552]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.42}
            viewport={{ once: true, amount: 0.62 }}
          >
            {t('home.jardin.p3')}
          </motion.p>

          <motion.button
            type="button"
            className={`mt-8 ${HOME_PRIMARY_CTA_CLASS}`}
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.52}
            viewport={{ once: true, amount: 0.72 }}
          >
            {t('home.jardin.cta')}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
