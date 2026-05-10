import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import plantImage from '../assets/home/plant.png'
import HomeDiscoverySection from '../components/sections/HomeDiscoverySection'
import RoomDetailsSection from '../components/sections/RoomDetailsSection'
import { useLanguage } from '../i18n/LanguageContext'
import { localizeRoom } from '../i18n/localizeRoom'
import { getRoomBySlug } from '../../rooms'

const easeSmooth = [0.4, 0, 0.2, 1]

const introContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
}

const introItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: easeSmooth } },
}

const CAROUSEL_LEN = 3

function ChevronLeft({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M14 6 8 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function RoomDetailPage() {
  const { roomSlug } = useParams()
  const room = roomSlug ? getRoomBySlug(roomSlug) : null
  const { locale, t } = useLanguage()
  const localizedRoom = useMemo(() => (room ? localizeRoom(room, locale) : null), [room, locale])

  const carouselSlides = useMemo(() => {
    const imgs = localizedRoom?.images?.filter((img) => img?.src) ?? []
    if (!imgs.length) return []
    return Array.from({ length: CAROUSEL_LEN }, (_, i) => {
      const item = imgs[i % imgs.length]
      return {
        src: item.src,
        alt: item.alt ? `${item.alt} (${i + 1})` : `${localizedRoom?.title ?? t('roomsCommon.fallbackPhoto')} — ${i + 1}`,
      }
    })
  }, [localizedRoom?.images, localizedRoom?.title, t])

  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    setCarouselIndex(0)
  }, [roomSlug])

  if (!room || !localizedRoom) {
    return <Navigate to="/suites-rooms" replace />
  }

  const hero = localizedRoom.images?.[0]
  if (!hero?.src) {
    return <Navigate to="/suites-rooms" replace />
  }

  const total = Math.max(carouselSlides.length, 1)
  const goPrev = () => setCarouselIndex((i) => (i - 1 + total) % total)
  const goNext = () => setCarouselIndex((i) => (i + 1) % total)
  const slide = carouselSlides[carouselIndex] ?? { src: hero.src, alt: hero.alt ?? localizedRoom.title }

  return (
    <>
    <section className="relative -mt-16 bg-[#f3eee6] pb-6 pt-1 md:pb-4 md:pt-2">
      {/* Full-bleed hero */}
      <motion.div
        className="relative left-1/2 w-screen max-w-none -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: easeSmooth }}
      >
        <motion.img
          src={hero.src}
          alt={hero.alt ?? localizedRoom.title}
          className="h-[min(52vh,420px)] w-full object-cover sm:h-[min(58vh,520px)] lg:h-[min(70vh,720px)]"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.15, ease: easeSmooth }}
        />
      </motion.div>

      {/* Centered copy + CTA */}
      <div className="relative overflow-hidden">
        <motion.img
          src={plantImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-40px] right-[-48px] hidden w-[min(240px,42vw)] opacity-[0.14] lg:block"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 0.14, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: easeSmooth }}
        />

        <motion.div
          className="relative mx-auto max-w-[900px] px-6 pb-16 pt-14 text-center md:px-8 md:pb-20 md:pt-16 lg:pt-20"
          variants={introContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25, margin: '0px 0px -8% 0px' }}
        >
          <motion.h1
            className="font-cormorant text-[42px] font-normal leading-none tracking-[0] text-[#171412] md:text-[52px] lg:text-[58px]"
            variants={introItem}
          >
            {localizedRoom.title}
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-[720px] font-sans text-[16px] font-[250] leading-none tracking-[0] text-[#57524e] md:mt-10"
            variants={introItem}
          >
            {localizedRoom.description}
          </motion.p>

          <motion.div className="mt-10 md:mt-12" variants={introItem}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.25 }}>
              <Link
                to="/contacts"
                className="inline-flex items-center justify-center bg-[#6e361b] px-10 py-3.5 font-sans text-[16px] font-normal leading-none tracking-[0] text-white uppercase transition-colors hover:bg-[#5d2c15]"
              >
                {t('roomsCommon.bookThisRoom')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Room gallery carousel */}
      <motion.div
        className="relative mx-auto mt-4 max-w-[1440px] px-4 md:mt-8 md:px-6"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease: easeSmooth }}
      >
        <div className="relative aspect-[16/10] max-h-[min(72vh,760px)] min-h-[280px] w-full overflow-hidden bg-[#e8e2d9] sm:min-h-[360px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={carouselIndex}
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: easeSmooth }}
            />
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-4 flex items-center justify-end gap-5 md:mt-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.12, ease: easeSmooth }}
        >
          <motion.button
            type="button"
            onClick={goPrev}
            aria-label={t('roomsCommon.carouselPrev')}
            className="flex h-10 w-10 items-center justify-center text-[#171412] transition-colors hover:text-[#6e361b] md:h-11 md:w-11"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronLeft className="h-7 w-7 md:h-8 md:w-8" />
          </motion.button>
          <motion.span
            key={carouselIndex}
            className="min-w-[4.5rem] text-center font-sans text-[14px] font-[250] tabular-nums tracking-[0.02em] text-[#57524e] md:text-[15px]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: easeSmooth }}
          >
            {String(carouselIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </motion.span>
          <motion.button
            type="button"
            onClick={goNext}
            aria-label={t('roomsCommon.carouselNext')}
            className="flex h-10 w-10 items-center justify-center text-[#171412] transition-colors hover:text-[#6e361b] md:h-11 md:w-11"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <ChevronRight className="h-7 w-7 md:h-8 md:w-8" />
          </motion.button>
        </motion.div>
      </motion.div>

      {localizedRoom.detailSection ? (
        <RoomDetailsSection
          detailSection={localizedRoom.detailSection}
          detailsHeading={t('roomsCommon.detailsHeading')}
        />
      ) : null}
    </section>
    <HomeDiscoverySection />
    </>
  )
}
