import plantImage from '../../assets/home/plant.webp'
import windowImage from '../../assets/home/discover/window.webp'
import spaImage from '../../assets/home/discover/spa.webp'
import nightImage from '../../assets/home/discover/night.webp'
import { motion } from 'framer-motion'
import HomeDiscoveryCard from './HomeDiscoveryCard'
import { useLanguage } from '../../i18n/LanguageContext'
import { HOME_SCROLL_EASE, HOME_SECTION_VIEWPORT } from './homeMotion'

const DISCOVERY_META = [
  {
    key: 'card1',
    image: windowImage,
    className: 'lg:w-[421px]',
    imageClassName: 'lg:h-[485px]',
  },
  {
    key: 'card2',
    image: spaImage,
    className: 'lg:w-[421px] lg:-translate-y-16',
    imageClassName: 'lg:h-[485px]',
    titleClassName: 'text-[16px] font-medium leading-none tracking-normal uppercase',
  },
  {
    key: 'card3',
    image: nightImage,
    className: 'lg:w-[421px]',
    imageClassName: 'lg:h-[485px]',
  },
]

export default function HomeDiscoverySection({ variant = 'default' }) {
  const { t } = useLanguage()

  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, delay, ease: HOME_SCROLL_EASE },
    }),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
      },
    },
  }

  return (
    <motion.section
      className={
        variant === 'room'
          ? 'relative overflow-hidden bg-[#FAF3E8] py-12 md:py-5'
          : 'relative overflow-hidden bg-[#f3eee6] py-12 md:py-5'
      }
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={HOME_SECTION_VIEWPORT}
      transition={{ duration: 0.8, ease: HOME_SCROLL_EASE }}
    >
      <motion.img
        src={plantImage}
        alt=""
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute right-[-60px] top-[-48px] hidden w-[420px] -scale-x-100 opacity-15 lg:block"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.88, ease: HOME_SCROLL_EASE }}
      />

      <motion.div className="mx-auto max-w-[1440px] px-4 md:px-6">
        <motion.div
          className="mx-auto max-w-[860px] text-center"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.82, ease: HOME_SCROLL_EASE }}
        >
          <motion.h2
            className="mb-5 text-center font-cormorant text-[40px] font-normal leading-none tracking-normal text-[#181614]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.08}
            viewport={{ once: true, amount: 0.7 }}
          >
            {t('home.discovery.h2')}
          </motion.h2>
          <motion.p
            className="m-5 mx-auto mb-32 max-w-[820px] text-center font-sans text-[16px] font-[250] leading-none tracking-normal text-[#56524f]"
            variants={textReveal}
            initial="hidden"
            whileInView="visible"
            custom={0.2}
            viewport={{ once: true, amount: 0.6 }}
          >
            {t('home.discovery.lead')}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid items-start gap-8 md:grid-cols-3 md:gap-6 lg:grid-cols-[421px_421px_422px] lg:justify-center lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {DISCOVERY_META.map((card, index) => {
            const mobileAlignmentClass =
              index % 2 === 1
                ? 'w-[86%] justify-self-end self-end md:w-auto md:justify-self-auto md:self-auto'
                : 'w-[86%] justify-self-start self-start md:w-auto md:justify-self-auto md:self-auto'

            const prefix = `home.discovery.${card.key}`
            return (
              <HomeDiscoveryCard
                key={card.key}
                image={card.image}
                imageAlt={t(`${prefix}Alt`)}
                title={t(`${prefix}Title`)}
                description={t(`${prefix}Body`)}
                className={`${mobileAlignmentClass} ${card.className}`}
                imageClassName={card.imageClassName}
                titleClassName={card.titleClassName}
              />
            )
          })}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
