import beach2Image from '../../assets/home/beach2.png'
import { motion } from 'framer-motion'
import CircleArrowButton from '../ui/CircleArrowButton'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_PRIMARY_CTA_CLASS } from './homeSectionCta'
import { HOME_SCROLL_EASE, HOME_SECTION_VIEWPORT } from './homeMotion'

export default function HomeSpringSection() {
  const { t } = useLanguage()
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

          <motion.button
            type="button"
            className={`mt-8 ${HOME_PRIMARY_CTA_CLASS}`}
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.48}
            viewport={{ once: true, amount: 0.7 }}
          >
            {t('home.spring.readMore')}
          </motion.button>
        </motion.div>

        <motion.div
          className="relative aspect-[16/10] overflow-hidden md:h-[340px] md:aspect-auto lg:h-[400px] lg:w-full lg:justify-self-end xl:h-[461px] xl:w-[673px]"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.88, ease: HOME_SCROLL_EASE }}
        >
          <motion.img
            src={beach2Image}
            alt={t('home.spring.imageAlt')}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
          <CircleArrowButton className="absolute right-4 top-1/2 -translate-y-1/2" label={t('aria.nextSlide')} />
        </motion.div>
      </div>
    </motion.section>
  )
}
