import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import aristoLogo from '../assets/logo/royal_green/aristo.webp'
import { CONTACT } from '../config/site'
import { useDailyMenu } from '../hooks/useDailyMenu'
import { useLanguage } from '../i18n/LanguageContext'
import { oliveBranchSvg } from '../lib/menuDecor'
import { printMenu } from '../lib/menuPrint'

const easeSmooth = [0.4, 0, 0.2, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: Number(custom) * 0.05, ease: easeSmooth },
  }),
}

const branchHtml = oliveBranchSvg({ color: '#7f8d6f', opacity: 0.55 })

/** Pick the localized string from a bilingual `{ en, es }` value (or pass a plain string through). */
function pick(value, locale) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[locale] || value.en || value.es || ''
}

function DottedDivider({ className = '' }) {
  return (
    <div
      className={`mx-auto h-[3px] w-full max-w-[280px] ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(23,20,18,0.32) 1.3px, transparent 1.6px)',
        backgroundSize: '9px 3px',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
      }}
      aria-hidden="true"
    />
  )
}

function MenuSection({ title, items, index, orLabel }) {
  return (
    <motion.article className="text-center" variants={fadeUp} custom={index}>
      <h2 className="font-script text-[34px] leading-[1.15] text-[#9a8d80] md:text-[40px]">{title}</h2>
      <ul className="mt-2">
        {items.map((item, i) => (
          <li key={i}>
            {i > 0 && (
              <div className="my-0.5 font-cormorant text-[15px] italic leading-tight text-[#9a938c]">
                {orLabel}
              </div>
            )}
            <div className="font-cormorant text-[18px] leading-relaxed text-[#33302c] md:text-[19px]">
              {item}
            </div>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function MenuPage() {
  const { t, locale } = useLanguage()
  const { menu, status } = useDailyMenu()

  const sections = menu?.sections ?? []
  const included = menu?.included ?? []
  const dateLabel = pick(menu?.date, locale)
  const priceLabel = pick(menu?.price, locale)
  const includedLabels = included.map((item) => pick(item, locale))
  const orLabel = t('menu.or')

  const handleDownloadPdf = () => {
    printMenu({
      hotelName: CONTACT.hotelName,
      dateLabel,
      sections: sections.map((s) => ({
        title: pick(s.title, locale),
        items: s.items.map((item) => pick(item, locale)),
      })),
      included: includedLabels,
      priceLabel,
      orLabel,
    })
  }

  return (
    <section className="relative bg-[#f3eee6] px-6 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8">
      <div className="mx-auto max-w-[640px]">
        {/* Breadcrumb */}
        <motion.nav
          className="font-sans text-[12px] font-[250] uppercase tracking-[0.12em] text-[#171412]/55"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link to="/" className="transition-colors hover:text-[#6e361b]">
            {t('breadcrumb.home')}
          </Link>
          <span className="px-2 text-[#171412]/35">/</span>
          <span className="text-[#171412]">{t('menu.breadcrumb')}</span>
        </motion.nav>

        {/* Loading / empty / error — never show placeholder dishes */}
        {status !== 'ready' && (
          <p className="mt-10 text-center font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
            {status === 'loading' ? t('menu.loading') : t('menu.unavailable')}
          </p>
        )}

        {status === 'ready' && (
          <>
            {/* Menu card, framed like the printed menu */}
            <motion.div
              className="relative mt-8 overflow-hidden rounded-sm border border-[#171412]/12 bg-[#faf7f0] px-6 py-10 md:mt-9 md:px-14 md:py-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              custom={0}
            >
              {/* Botanical corners */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-9 -top-7 w-36 rotate-[128deg] md:w-48"
                dangerouslySetInnerHTML={{ __html: branchHtml }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-7 -right-9 w-36 -rotate-[52deg] md:w-48"
                dangerouslySetInnerHTML={{ __html: branchHtml }}
              />
              {/* Corner brackets */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 left-4 h-9 w-9 border-b border-l border-[#6e361b]/30"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 h-9 w-9 border-r border-t border-[#6e361b]/30"
              />

              <div className="relative">
                {/* Logo */}
                <img
                  src={aristoLogo}
                  alt="Aristo"
                  className="mx-auto h-16 w-auto md:h-[76px]"
                  width="152"
                  height="152"
                />
                {/* Date */}
                <h1 className="mt-4 text-center font-cormorant text-[26px] font-normal uppercase leading-none tracking-[0.14em] text-[#171412] md:text-[30px]">
                  {dateLabel}
                </h1>

                {/* Courses */}
                <div className="mx-auto mt-8 flex max-w-[430px] flex-col">
                  {sections.map((section, i) => (
                    <Fragment key={section.key}>
                      {i > 0 && <DottedDivider className="my-6" />}
                      <MenuSection
                        index={i}
                        title={pick(section.title, locale)}
                        items={section.items.map((item) => pick(item, locale))}
                        orLabel={orLabel}
                      />
                    </Fragment>
                  ))}
                </div>

                {/* Included + price */}
                {(includedLabels.length > 0 || priceLabel) && (
                  <>
                    <DottedDivider className="mt-8" />
                    <div className="mt-6 text-center font-cormorant text-[16px] leading-relaxed text-[#33302c] md:text-[17px]">
                      {includedLabels.map((label, i) => (
                        <p key={i}>{label}</p>
                      ))}
                      {priceLabel && <p className="mt-0.5">{priceLabel}</p>}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Download-as-PDF */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-1.5 rounded-sm border border-[#6e361b]/40 px-3.5 py-1.5 font-sans text-[10.5px] font-medium uppercase tracking-[0.13em] text-[#6e361b] transition-colors hover:bg-[#6e361b] hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3v11m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
                </svg>
                {t('menu.downloadPdf')}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
