import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

/** Image zoom on hover (same scale/timing as discovery cards, without vertical lift). */
const ROOM_IMAGE_HOVER = { scale: 1.05 }
const ROOM_IMAGE_HOVER_TRANSITION = { duration: 0.45, ease: 'easeOut' }

function cx(...values) {
  return values.filter(Boolean).join(' ')
}

function FeatureIcon({ type }) {
  if (type === 'units') {
    return (
      <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20V9l8-5 8 5v11" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6M4 10h16" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'size') {
    return (
      <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3.7 19.3 8v8L12 20.3 4.7 16V8L12 3.7Z" strokeLinejoin="round" />
        <path d="M4.7 8 12 12.4 19.3 8M12 12.4v8" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === 'guests') {
    return (
      <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="8.6" cy="8.1" r="2.8" />
        <circle cx="15.9" cy="7.7" r="2.5" />
        <path d="M3.8 18.3a4.8 4.8 0 0 1 9.6 0M12.4 18.3a4.1 4.1 0 0 1 8.2 0" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="9.5" width="16" height="6.9" rx="1.2" />
      <path d="M6.1 9.5V7.6A2.6 2.6 0 0 1 8.7 5h6.6a2.6 2.6 0 0 1 2.6 2.6v1.9M4 13h16" />
    </svg>
  )
}

export default function RoomCategorySection({
  images = [],
  title,
  features = [],
  description,
  ctaLabel = 'View Room',
  ctaTo = '/contacts',
  reverse = false,
  classNames = {},
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { tf } = useLanguage()
  const safeImages = Array.isArray(images) ? images.filter((item) => item?.src) : []
  const lastIndex = Math.max(0, safeImages.length - 1)
  const displayIndex = Math.min(activeIndex, lastIndex)
  const active = safeImages[displayIndex]
  const reduceMotion = useReducedMotion()

  const easeSmooth = [0.4, 0, 0.2, 1]

  const imageColVariants = {
    hidden: { opacity: 0, x: reverse ? 28 : -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: easeSmooth },
    },
  }

  const contentColVariants = {
    hidden: { opacity: 0, x: reverse ? -22 : 22 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: easeSmooth,
        staggerChildren: 0.055,
        delayChildren: 0.06,
      },
    },
  }

  const lineReveal = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeSmooth } },
  }
  const visibleFeatures = features.filter((feature) => feature?.icon !== 'units')

  return (
    <section
      className={cx(
        'grid items-start gap-4 max-lg:bg-[#f9f5eb] max-lg:px-4 max-lg:py-4 lg:items-center lg:gap-20 lg:bg-transparent lg:px-0 lg:py-0',
        'lg:grid-cols-[673px_1fr]',
        reverse && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1',
        classNames.section,
      )}
    >
      <motion.div
        className={cx('relative', classNames.imageWrapper)}
        variants={imageColVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -12% 0px' }}
      >
        {active ? (
          <div className="flex flex-col">
            <div className="relative overflow-hidden shadow-[0_8px_32px_-8px_rgba(23,20,18,0.12)] max-lg:shadow-none">
              <div className="overflow-hidden">
                <AnimatePresence initial={false} mode="sync">
                  <motion.img
                    key={active.src}
                    src={active.src}
                    alt={active.alt ?? ''}
                    className={cx(
                      'h-[min(52vw,280px)] w-full object-cover sm:h-[min(48vw,320px)] lg:h-[429px] lg:w-[673px]',
                      classNames.image,
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={reduceMotion ? undefined : ROOM_IMAGE_HOVER}
                    transition={{
                      opacity: { duration: 0.55, ease: easeSmooth },
                      scale: ROOM_IMAGE_HOVER_TRANSITION,
                    }}
                  />
                </AnimatePresence>
              </div>
            </div>
            {safeImages.length > 1 ? (
              <div
                className={cx(
                  'mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-3',
                  classNames.thumbnails,
                )}
                role="tablist"
                aria-label={`${title} photos`}
              >
                {safeImages.map((img, index) => (
                  <button
                    key={`${img.src}-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={index === displayIndex}
                    onClick={() => setActiveIndex(index)}
                    className={cx(
                      'relative h-16 w-24 shrink-0 overflow-hidden border-2 transition-[border-color,box-shadow,opacity] duration-300 ease-out hover:z-1 hover:shadow-md',
                      index === displayIndex
                        ? 'border-[#6e361b] shadow-sm'
                        : 'border-transparent opacity-75 hover:border-[#6e361b]/35 hover:opacity-100',
                    )}
                  >
                    <div className="h-full w-full overflow-hidden">
                      <motion.img
                        src={img.src}
                        alt={
                          img.alt
                            ? `${img.alt} (${tf('roomsCommon.thumbnailLabel')})`
                            : tf('roomsCommon.thumbnailAlt', { title, n: index + 1 })
                        }
                        className="h-full w-full object-cover"
                        whileHover={reduceMotion ? undefined : ROOM_IMAGE_HOVER}
                        transition={ROOM_IMAGE_HOVER_TRANSITION}
                      />
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </motion.div>

      <motion.article
        className={cx('w-full max-w-[560px] text-left max-lg:max-w-none', classNames.content)}
        variants={contentColVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -12% 0px' }}
      >
        <motion.h2
          className={cx(
            'font-cormorant text-[32px] font-normal leading-[1.05] tracking-[0] text-[#171412] lg:text-[40px] lg:leading-none',
            classNames.title,
          )}
          variants={lineReveal}
        >
          {title}
        </motion.h2>

        <motion.ul
          className={cx(
            'mt-2.5 flex flex-wrap items-center gap-x-3.5 gap-y-1 font-sans text-[13px] font-normal leading-none tracking-[0] text-[#0a3f35] lg:mt-5 lg:gap-x-5 lg:gap-y-2 lg:text-[14px]',
            classNames.featuresList,
          )}
          variants={lineReveal}
        >
          {visibleFeatures.map((feature) => (
            <li key={feature.label} className={cx('inline-flex items-center gap-1.5', classNames.featureItem)}>
              <FeatureIcon type={feature.icon} />
              <span>{feature.label}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p
          className={cx(
            'mt-3 max-w-[540px] font-sans text-[15px] font-[250] leading-relaxed tracking-[0] text-[#57524e] lg:mt-6 lg:text-[16px] lg:leading-normal lg:text-[#4f4a45]',
            classNames.description,
          )}
          variants={lineReveal}
        >
          {description}
        </motion.p>

        <motion.div variants={lineReveal}>
          <Link
            to={ctaTo}
            className={cx(
              'mt-4 inline-flex h-11 items-center bg-[#7a3e22] px-4 font-sans text-[13px] font-medium tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#6b341c] lg:mt-8 lg:h-12 lg:text-[14px] lg:tracking-[0.04em]',
              classNames.cta,
            )}
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </motion.article>
    </section>
  )
}
