import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CONTACT } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

const easeSmooth = [0.4, 0, 0.2, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: Number(custom) * 0.05, ease: easeSmooth },
  }),
}

const inView = { once: true, amount: 0.15 }

/** Ordered sections — each maps to `terms.sections.<id>` with `title` + `body[]`. */
const SECTION_IDS = [
  'acceptance',
  'definitions',
  'reservations',
  'ratesPayment',
  'cancellation',
  'checkInOut',
  'conduct',
  'liability',
  'privacy',
  'intellectual',
  'forceMajeure',
  'law',
]

function sectionAnchor(id) {
  return `terms-${id}`
}

function TermsSection({ number, id, title, body, index }) {
  return (
    <motion.section
      id={sectionAnchor(id)}
      className="scroll-mt-28 border-t border-[#171412]/10 pt-9 md:scroll-mt-32"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      custom={index}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-cormorant text-[20px] font-normal leading-none text-[#6e361b]/70">
          {number}
        </span>
        <h2 className="font-cormorant text-[26px] font-normal leading-[1.1] text-[#171412] md:text-[30px]">
          {title}
        </h2>
      </div>
      <div className="mt-5 space-y-4">
        {body.map((paragraph, i) => (
          <p
            key={i}
            className="font-sans text-[15px] font-[250] leading-relaxed text-[#57524e] md:text-[16px]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </motion.section>
  )
}

export default function TermsPage() {
  const { t, tf } = useLanguage()

  return (
    <section className="relative -mt-16 overflow-hidden bg-[#f3eee6] pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="relative mx-auto max-w-[1120px] px-6 md:px-8">
        <motion.nav
          className="font-sans text-[12px] font-[250] uppercase tracking-[0.12em] text-[#6f6a65]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link to="/" className="transition-colors hover:text-[#171412]">
            {t('breadcrumb.home')}
          </Link>
          <span className="px-2 text-[#9a948e]">/</span>
          <span className="text-[#171412]">{t('terms.breadcrumb')}</span>
        </motion.nav>

        <motion.header className="mt-10 max-w-[760px]" initial="hidden" animate="visible">
          <motion.p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]"
            variants={fadeUp}
            custom={1}
          >
            {t('terms.eyebrow')}
          </motion.p>
          <motion.h1
            className="mt-4 font-cormorant text-[clamp(2.25rem,5.5vw,3.5rem)] font-normal leading-[1.03] tracking-[0.01em] text-[#171412]"
            variants={fadeUp}
            custom={2}
          >
            {t('terms.title')}
          </motion.h1>
          <motion.div className="mt-6 h-px w-16 bg-[#6e361b]" variants={fadeUp} custom={3} />
          <motion.p
            className="mt-7 font-sans text-[16px] font-[250] leading-relaxed text-[#57524e] md:text-[17px]"
            variants={fadeUp}
            custom={4}
          >
            {t('terms.intro')}
          </motion.p>
          <motion.p
            className="mt-6 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a948e]"
            variants={fadeUp}
            custom={5}
          >
            {t('terms.lastUpdated')}
          </motion.p>
        </motion.header>

        <div className="mt-14 grid gap-x-16 md:mt-16 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Table of contents (desktop) */}
          <motion.aside
            className="hidden lg:block"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={6}
          >
            <nav
              aria-label={t('terms.tocAria')}
              className="sticky top-28 border-l border-[#171412]/10 pl-5"
            >
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#6e361b]">
                {t('terms.tocTitle')}
              </p>
              <ol className="mt-4 space-y-2.5">
                {SECTION_IDS.map((id, i) => (
                  <li key={id}>
                    <a
                      href={`#${sectionAnchor(id)}`}
                      className="flex gap-2 font-sans text-[13px] font-[250] leading-snug text-[#57524e] transition-colors hover:text-[#171412]"
                    >
                      <span className="text-[#6e361b]/60">{String(i + 1).padStart(2, '0')}</span>
                      <span>{t(`terms.sections.${id}.title`)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </motion.aside>

          {/* Sections */}
          <div className="space-y-12">
            {SECTION_IDS.map((id, i) => (
              <TermsSection
                key={id}
                id={id}
                index={i}
                number={String(i + 1).padStart(2, '0')}
                title={t(`terms.sections.${id}.title`)}
                body={t(`terms.sections.${id}.body`)}
              />
            ))}

            {/* Contact / closing */}
            <motion.div
              className="rounded-sm border border-[#171412]/10 bg-[#faf6ef]/70 px-6 py-8 md:px-10 md:py-9"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              custom={0}
            >
              <p className="font-sans text-[15px] font-[250] leading-relaxed text-[#57524e] md:text-[16px]">
                {t('terms.contactIntro')}
              </p>
              <div className="mt-5 space-y-1.5 font-sans text-[15px] font-[250] text-[#171412]">
                <p className="font-cormorant text-[20px] leading-none text-[#171412]">
                  {CONTACT.hotelName}
                </p>
                {CONTACT.addressLines.map((line) => (
                  <p key={line} className="text-[#57524e]">
                    {line}
                  </p>
                ))}
                <a href={CONTACT.phoneHref} className="block pt-1 transition-opacity hover:opacity-70">
                  {CONTACT.phoneDisplay}
                </a>
                <a href={CONTACT.emailHref} className="block break-all transition-opacity hover:opacity-70">
                  {CONTACT.email}
                </a>
              </div>
              <p className="mt-6 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a948e]">
                {tf('terms.footnote', { hotel: CONTACT.hotelName })}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
