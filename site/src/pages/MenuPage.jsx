import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CONTACT } from '../config/site'
import { useDailyMenu } from '../hooks/useDailyMenu'
import { useLanguage } from '../i18n/LanguageContext'
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

const INCLUDE_LABEL = 'Include'

/** Pick the localized string from a bilingual `{ en, es }` value (or pass a plain string through). */
function pick(value, locale) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[locale] || value.en || value.es || ''
}

function MenuSection({ title, items, number }) {
  return (
    <motion.article className="flex flex-col" variants={fadeUp} custom={number}>
      <div className="flex items-baseline gap-2.5 border-b border-[#171412]/12 pb-2">
        <span className="font-cormorant text-[15px] font-normal leading-none text-[#6e361b]/60">
          {String(number + 1).padStart(2, '0')}
        </span>
        <h2 className="font-cormorant text-[22px] font-normal leading-tight text-[#171412] md:text-[24px]">
          {title}
        </h2>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="font-sans text-[15px] font-[250] leading-snug text-[#57524e] md:text-[15.5px]"
          >
            {item}
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
      includeLabel: INCLUDE_LABEL,
    })
  }

  return (
    <section className="relative bg-[#f3eee6] px-6 pb-16 pt-6 md:px-8 md:pb-20 md:pt-8">
      <div className="mx-auto max-w-[900px]">
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

        {/* Centered header — the menu date, straight from the sheet */}
        <motion.div
          className="mt-8 text-center md:mt-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-[#6e361b]">
            {t('menu.breadcrumb')}
          </p>
          <h1 className="mt-2.5 font-cormorant text-[clamp(2.25rem,5vw,3rem)] font-normal leading-[1.05] tracking-[0.01em] text-[#171412]">
            {dateLabel}
          </h1>
          <div className="mx-auto mt-5 h-px w-12 bg-[#6e361b]/70" aria-hidden="true" />
        </motion.div>

        {/* Loading / empty / error — never show placeholder dishes */}
        {status !== 'ready' && (
          <p className="mt-8 text-center font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
            {status === 'loading' ? t('menu.loading') : t('menu.unavailable')}
          </p>
        )}

        {status === 'ready' && (
          <>
            {/* Menu card */}
            <motion.div
              className="mt-9 rounded-sm border border-[#171412]/12 bg-[#faf6ef]/70 px-6 py-8 md:mt-11 md:px-12 md:py-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              custom={0}
            >
              <div className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
                {sections.map((section, i) => (
                  <MenuSection
                    key={section.key}
                    number={i}
                    title={pick(section.title, locale)}
                    items={section.items.map((item) => pick(item, locale))}
                  />
                ))}
              </div>

              {(includedLabels.length > 0 || priceLabel) && (
                <div className="mt-8 flex flex-col gap-4 border-t border-[#171412]/12 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  {includedLabels.length > 0 && (
                    <div>
                      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#6e361b]">
                        {INCLUDE_LABEL}
                      </p>
                      <p className="mt-1.5 font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]">
                        {includedLabels.join(' · ')}
                      </p>
                    </div>
                  )}
                  {priceLabel && (
                    <p className="font-cormorant text-[30px] font-normal leading-none text-[#171412] md:text-[34px]">
                      {priceLabel}
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Download-as-PDF */}
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 rounded-sm border border-[#6e361b]/40 px-5 py-2.5 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-[#6e361b] transition-colors hover:bg-[#6e361b] hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
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
