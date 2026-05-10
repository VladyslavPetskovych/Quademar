import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import beachImage from '../../assets/home/beach.png'
import plantImage from '../../assets/home/plant.png'
import CircleArrowButton from '../ui/CircleArrowButton'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_PRIMARY_CTA_CLASS } from './homeSectionCta'
import { HOME_SCROLL_EASE, HOME_SECTION_VIEWPORT } from './homeMotion'

export default function HomeIntroSection() {
  const { t } = useLanguage()
  const textReveal = {
    hidden: { opacity: 0, y: 22 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay, ease: HOME_SCROLL_EASE },
    }),
  }

  return (
    <motion.section
      id="home-intro"
      className="relative scroll-mt-[120px] overflow-hidden bg-[#f3eee6] py-16 md:scroll-mt-[152px] md:py-22"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={HOME_SECTION_VIEWPORT}
      transition={{ duration: 0.78, ease: HOME_SCROLL_EASE }}
    >
      <motion.img
        src={plantImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-80px] top-[120px] hidden w-[310px] opacity-28 lg:block -scale-x-100"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 0.28, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.82, ease: HOME_SCROLL_EASE }}
      />

      <div className="mx-auto max-w-[1440px] px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-[920px] text-left md:text-center"
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.82, ease: HOME_SCROLL_EASE }}
        >
          <motion.h2
            className="font-cormorant text-[32px] leading-none text-[#171412] md:text-[64px]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.1}
            viewport={{ once: true, amount: 0.6 }}
          >
            {t('home.intro.h2')}
          </motion.h2>
          <motion.p
            className="mx-auto mt-5 max-w-[760px] font-sans text-[16px] font-[250] leading-none text-[#595552] md:text-[18px]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.24}
            viewport={{ once: true, amount: 0.55 }}
          >
            {t('home.intro.p1')}
          </motion.p>
        </motion.div>

        <div className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-10 xl:gap-14">
          <motion.div
            className="order-2 relative aspect-[16/10] overflow-hidden md:h-[360px] md:aspect-auto lg:order-1 lg:h-[420px] lg:w-full lg:justify-self-start xl:h-[461px] xl:w-[673px]"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.88, ease: HOME_SCROLL_EASE }}
          >
            <motion.img
              src={beachImage}
              alt={t('home.intro.beachAlt')}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
            <CircleArrowButton className="absolute right-4 top-1/2 -translate-y-1/2" label={t('aria.nextSlide')} />
          </motion.div>

          <motion.div
            className="order-1 max-w-[560px] md:max-w-none lg:order-2 lg:pt-3 xl:max-w-[560px]"
            initial={{ x: 36, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.88, ease: HOME_SCROLL_EASE, delay: 0.1 }}
          >
            <motion.h3
              className="font-cormorant text-[32px] leading-none text-[#171412] md:text-[40px]"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              custom={0.1}
              viewport={{ once: true, amount: 0.7 }}
            >
              {t('home.intro.h3')}
            </motion.h3>
            <motion.p
              className="mt-6 font-sans text-[16px] font-[250] leading-none text-[#595552]"
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              custom={0.24}
              viewport={{ once: true, amount: 0.65 }}
            >
              {t('home.intro.p2')}
            </motion.p>
            <motion.div
              variants={textReveal}
              initial="hidden"
              whileInView="visible"
              custom={0.36}
              viewport={{ once: true, amount: 0.7 }}
            >
              <Link to="/" className={`mt-8 ${HOME_PRIMARY_CTA_CLASS}`}>
                {t('home.intro.readMore')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
