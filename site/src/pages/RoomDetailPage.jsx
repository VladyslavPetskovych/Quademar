import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import plantImage from '../assets/home/plant.png'
import RoomGalleryLightbox from '../components/RoomGalleryLightbox'
import HomeDiscoverySection from '../components/sections/HomeDiscoverySection'
import RoomDetailsSection from '../components/sections/RoomDetailsSection'
import { roomHeroFrameClass, roomHeroImageClass, roomImageClass, roomImageFrameClass } from '../components/sections/roomImageStyles'
import { useLanguage } from '../i18n/LanguageContext'
import { localizeRoom } from '../i18n/localizeRoom'
import { getRoomBySlug } from '../../rooms'

const easeSmooth = [0.4, 0, 0.2, 1]

function ChevronLeft({ className, strokeWidth = 1.4 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M14 6 8 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ className, strokeWidth = 1.4 }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function RoomDetailPage() {
  const { roomSlug } = useParams()
  const room = roomSlug ? getRoomBySlug(roomSlug) : null
  const { locale, t } = useLanguage()
  const localizedRoom = useMemo(() => (room ? localizeRoom(room, locale) : null), [room, locale])

  const images = useMemo(() => {
    const imgs = localizedRoom?.images?.filter((img) => img?.src) ?? []
    const seen = new Set()
    return imgs.filter((img) => {
      if (seen.has(img.src)) return false
      seen.add(img.src)
      return true
    })
  }, [localizedRoom?.images])

  const [slideIndex, setSlideIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    setSlideIndex(0)
    setLightboxOpen(false)
  }, [roomSlug])

  const total = images.length
  const safeIndex = ((slideIndex % total) + total) % total

  useEffect(() => {
    if (total <= 1) return
    const preload = (index) => {
      const src = images[index]?.src
      if (!src) return
      const img = new Image()
      img.src = src
    }
    preload((safeIndex + 1) % total)
    preload((safeIndex - 1 + total) % total)
  }, [images, safeIndex, total])

  if (!room || !localizedRoom) {
    return <Navigate to="/suites-rooms" replace />
  }

  if (!images.length) {
    return <Navigate to="/suites-rooms" replace />
  }

  const heroImage = images[0]
  const introBody = localizedRoom.galleryNarrative?.body ?? localizedRoom.description

  const slide = images[safeIndex]
  const goPrev = () => setSlideIndex((i) => (i - 1 + total) % total)
  const goNext = () => setSlideIndex((i) => (i + 1) % total)
  const showControls = total > 1

  return (
    <motion.div className="bg-[#FAF3E8]">
      <motion.div
        className={roomHeroFrameClass}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: easeSmooth }}
      >
        <motion.img
          src={heroImage.src}
          alt={heroImage.alt ?? localizedRoom.title}
          className={roomHeroImageClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: easeSmooth }}
        />
      </motion.div>

      <section className="relative overflow-hidden bg-[#FAF3E8] px-5 pb-10 pt-[60px] md:px-[60px] md:pb-10">
        <img
          src={plantImage}
          alt=""
          aria-hidden="true"
          role="presentation"
          className="pointer-events-none absolute right-[-28px] top-24 hidden w-[220px] -scale-x-100 opacity-22 lg:block"
        />

        <motion.div
          className="relative mx-auto flex w-full max-w-[1320px] flex-col items-center isolate gap-4 p-0 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeSmooth }}
        >
          <h1 className="w-full max-w-[800px] font-cormorant text-[clamp(2.25rem,5vw,3.625rem)] font-normal leading-[1.2] text-[#141414] lg:leading-[70px]">
            {localizedRoom.title}
          </h1>
          <p className="w-full max-w-[800px] font-sans text-[15px] font-[250] leading-[1.2] tracking-[0] text-[rgba(13,13,13,0.88)] md:text-[16px] md:leading-[19px]">
            {introBody}
          </p>
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <Link
              to="/contacts"
              className="inline-flex h-[43px] min-w-[158px] items-center justify-center bg-[#773A1B] px-3 font-sans text-[14px] font-normal leading-[19px] tracking-[0] text-white uppercase transition-colors hover:bg-[#6b341c] md:text-[16px]"
            >
              {t('roomsCommon.bookThisRoom')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-11 flex w-full max-w-[1320px] flex-col items-center gap-3 px-0 md:mt-11"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: easeSmooth }}
        >
          <motion.div className="relative w-full max-w-[1092px]">
            <motion.div className="flex justify-center">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={t('roomsCommon.openGallery')}
                className={`${roomImageFrameClass} group w-full max-w-[1092px] cursor-zoom-in bg-[#FAF3E8] text-left lg:h-[661px] lg:w-[1092px] lg:max-w-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#773A1B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF3E8]`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={`${roomSlug}-${safeIndex}`}
                      src={slide.src}
                      alt={slide.alt ?? localizedRoom.title}
                      className={`${roomImageClass} absolute inset-0 transition-[transform,filter] duration-500 group-hover:scale-[1.02] group-hover:brightness-[1.02]`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeSmooth }}
                    />
                  </AnimatePresence>
                </div>
                <span
                  className="pointer-events-none absolute inset-0 z-[1] bg-[#141414]/0 transition-colors duration-300 group-hover:bg-[#141414]/6"
                  aria-hidden="true"
                />
              </button>
            </motion.div>

            {showControls ? (
              <motion.div className="mt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label={t('roomsCommon.carouselPrev')}
                  className="flex h-5 w-5 items-center justify-center text-[rgba(13,13,13,0.88)] transition-colors hover:text-[#141414]"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.2} />
                </button>
                <span className="font-sans text-[16px] font-normal leading-[19px] tabular-nums text-[rgba(13,13,13,0.88)]">
                  {String(safeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label={t('roomsCommon.carouselNext')}
                  className="flex h-5 w-5 items-center justify-center text-[rgba(13,13,13,0.88)] transition-colors hover:text-[#141414]"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.2} />
                </button>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>

        {localizedRoom.detailSection ? (
          <motion.div
            className="mt-6 md:mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, ease: easeSmooth }}
          >
            <RoomDetailsSection
              detailSection={localizedRoom.detailSection}
              detailsHeading={t('roomsCommon.detailsHeading')}
            />
          </motion.div>
        ) : null}
      </section>

      <RoomGalleryLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        index={safeIndex}
        onIndexChange={setSlideIndex}
        title={localizedRoom.title}
        imageKeyPrefix={roomSlug}
        labels={{
          dialog: t('roomsCommon.lightboxLabel'),
          close: t('roomsCommon.lightboxClose'),
          prev: t('roomsCommon.carouselPrev'),
          next: t('roomsCommon.carouselNext'),
        }}
      />

      <HomeDiscoverySection variant="room" />
    </motion.div>
  )
}
