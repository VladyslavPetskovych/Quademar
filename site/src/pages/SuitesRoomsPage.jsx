import { useMemo } from 'react'
import { motion } from 'framer-motion'
import plantImage from '../assets/home/plant.png'
import HomeDiscoverySection from '../components/sections/HomeDiscoverySection'
import { ROOM_CATEGORIES } from '../../rooms'
import RoomCategorySection from '../components/sections/RoomCategorySection'
import { useLanguage } from '../i18n/LanguageContext'
import { localizeRoom } from '../i18n/localizeRoom'

/** Calm deceleration — no overshoot (avoids “jiggly” end-of-motion). */
const easeSmooth = [0.4, 0, 0.2, 1]

const headerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
}

const headerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 2, ease: easeSmooth } },
}

export default function SuitesRoomsPage() {
  const { locale, t } = useLanguage()
  const categories = useMemo(() => ROOM_CATEGORIES.map((c) => localizeRoom(c, locale)), [locale])

  return (
    <>
    <section className="relative overflow-hidden bg-[#f3eee6] -mt-16 pb-20 pt-10 md:pb-24 md:pt-24">
      <img
        src={plantImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-28px] top-[168px] hidden w-[220px] opacity-22 lg:block"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 md:px-6">
        <motion.nav
          className="font-sans text-[14px] font-[250] leading-none tracking-[0] text-left uppercase text-[#6f6a65]"
          variants={headerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={headerItem}>{t('breadcrumb.home')}</motion.span>
          <motion.span variants={headerItem} className="px-2.5 text-[#9a948e]">
            /
          </motion.span>
          <motion.span variants={headerItem}>{t('breadcrumb.suitesRooms')}</motion.span>
        </motion.nav>

        <motion.div
          className="mx-auto mt-14 max-w-[860px] text-center md:mt-16"
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35, margin: '0px 0px -8% 0px' }}
        >
          <motion.h1
            className="font-cormorant text-[58px] font-normal leading-none tracking-[0] text-[#171412]"
            variants={headerItem}
          >
            {t('roomsCommon.suitesTitle')}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-[760px] font-sans text-[16px] font-[250] leading-none tracking-[0] text-center text-[#57524e]"
            variants={headerItem}
          >
            {t('roomsCommon.suitesLead')}
          </motion.p>
        </motion.div>

        <div className="mt-10 space-y-5 max-lg:space-y-4 md:mt-14 md:space-y-12 xl:mt-16 xl:space-y-20">
          {categories.map((category) => (
            <RoomCategorySection
              key={category.id}
              images={category.images}
              title={category.title}
              features={category.features}
              description={category.description}
              ctaLabel={category.ctaLabel}
              ctaTo={category.ctaTo}
              reverse={Boolean(category.reverse)}
              classNames={category.classNames}
            />
          ))}
        </div>
      </div>
    </section>
    <HomeDiscoverySection />
    </>
  )
}
