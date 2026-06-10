import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import spring1Image from '../../assets/home/spring1.jpg'
import spring2Image from '../../assets/home/spring2.jpg'
import spring3Image from '../../assets/home/spring3.jpg'
import CircleArrowButton from '../ui/CircleArrowButton'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_PRIMARY_CTA_CLASS } from './homeSectionCta'
import { HOME_SCROLL_EASE, HOME_SECTION_VIEWPORT } from './homeMotion'

export default function HomeSpringSection() {
  const { t, tf } = useLanguage()
  const slides = [
    { src: spring3Image, alt: t('home.spring.spring3Alt') },
    { src: spring1Image, alt: t('home.spring.spring1Alt') },
    { src: spring2Image, alt: t('home.spring.spring2Alt') },
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
      className="bg-[#f3eee6] py-6 md:py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={HOME_SECTION_VIEWPORT}
      transition={{ duration: 0.76, ease: HOME_SCROLL_EASE }}
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 md:grid-cols-2 md:px-6 lg:gap-14">
        <motion.div
          className="max-w-[560px]"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.82, ease: HOME_SCROLL_EASE }}
        >
          <motion.h3
            className="font-cormorant text-[40px] leading-[1.06] text-[#171412]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.08}
            viewport={{ once: true, amount: 0.7 }}
          >
            {t('home.spring.h3')}
          </motion.h3>
          <motion.p
            className="mt-6 text-[16px] leading-[1.5] text-[#595552]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.18}
            viewport={{ once: true, amount: 0.62 }}
          >
            {t('home.spring.p1')}
          </motion.p>
          <motion.p
            className="mt-2 text-[16px] leading-[1.5] text-[#595552]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.28}
            viewport={{ once: true, amount: 0.62 }}
          >
            {t('home.spring.p2')}
          </motion.p>
          <motion.p
            className="mt-2 text-[16px] leading-[1.5] text-[#595552]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.38}
            viewport={{ once: true, amount: 0.6 }}
          >
            {t('home.spring.p3')}
          </motion.p>

          <motion.div
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.48}
            viewport={{ once: true, amount: 0.7 }}
          >
            <Link to="/moments" className={`mt-8 ${HOME_PRIMARY_CTA_CLASS}`}>
              {t('home.spring.readMore')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative aspect-[16/10] overflow-hidden md:h-[340px] md:aspect-auto lg:h-[400px] lg:w-full lg:justify-self-end xl:h-[461px] xl:w-[673px]"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.88, ease: HOME_SCROLL_EASE }}
        >
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
        </motion.div>
      </div>
    </motion.section>
  )
}
