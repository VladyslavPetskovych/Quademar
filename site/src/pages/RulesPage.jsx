import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImage from '../assets/home/hero.png'
import { CONTACT } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

const easeSmooth = [0.4, 0, 0.2, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: Number(custom) * 0.06, ease: easeSmooth },
  }),
}

const inView = { once: true, amount: 0.2 }

/** Quick-fact chips shown at the top — keyed under `rules.facts`. */
const FACT_IDS = ['checkIn', 'checkOut', 'quiet', 'reception']

/** Ordered rule sections — each maps to `rules.sections.<id>` with `title` + `items[]`. */
const SECTION_IDS = [
  'checkInOut',
  'booking',
  'payment',
  'quietConduct',
  'smoking',
  'pets',
  'children',
  'poolSpa',
  'dining',
  'safety',
]

function FactChip({ label, value, index }) {
  return (
    <motion.div
      className="flex flex-col rounded-sm border border-[#171412]/10 bg-[#faf6ef]/80 px-5 py-4 backdrop-blur-sm"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      custom={index}
    >
      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#6e361b]">
        {label}
      </span>
      <span className="mt-2 font-cormorant text-[26px] font-normal leading-none text-[#171412] md:text-[28px]">
        {value}
      </span>
    </motion.div>
  )
}

function RuleSection({ number, title, items, index }) {
  return (
    <motion.article
      className="flex flex-col border-t border-[#171412]/10 pt-8"
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
      <ul className="mt-5 space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3.5">
            <span
              className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#6e361b]/70"
              aria-hidden="true"
            />
            <span className="font-sans text-[15px] font-[250] leading-relaxed text-[#57524e] md:text-[16px]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

export default function RulesPage() {
  const { t, tf } = useLanguage()

  return (
    <section className="relative -mt-16 bg-[#f3eee6]">
      {/* Hero — the page's single photo */}
      <div className="relative min-h-[clamp(340px,52vh,520px)] w-full overflow-hidden">
        <img
          src={heroImage}
          alt={t('rules.heroImageAlt')}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#062c26] via-[#062c26]/80 to-[#062c26]/45"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[1120px] flex-col justify-end px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
          <motion.nav
            className="font-sans text-[12px] font-[250] uppercase tracking-[0.12em] text-[#f3eee6]/70"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Link to="/" className="transition-colors hover:text-white">
              {t('breadcrumb.home')}
            </Link>
            <span className="px-2 text-white/45">/</span>
            <span className="text-white">{t('rules.breadcrumb')}</span>
          </motion.nav>
          <motion.p
            className="mt-6 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#f3eee6]/80"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {t('rules.eyebrow')}
          </motion.p>
          <motion.h1
            className="mt-3 font-cormorant text-[clamp(2.5rem,6vw,3.75rem)] font-normal leading-[1.02] tracking-[0.01em] text-[#f3eee6]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {t('rules.title')}
          </motion.h1>
          <motion.div
            className="mt-6 h-px w-16 bg-[#f3eee6]/60"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1120px] px-6 pb-20 pt-12 md:px-8 md:pb-28 md:pt-16">
        <motion.p
          className="max-w-[760px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e] md:text-[17px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          custom={0}
        >
          {t('rules.intro')}
        </motion.p>

        {/* Quick facts */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {FACT_IDS.map((id, i) => (
            <FactChip
              key={id}
              index={i}
              label={t(`rules.facts.${id}.label`)}
              value={t(`rules.facts.${id}.value`)}
            />
          ))}
        </div>

        {/* Rule sections */}
        <div className="mt-16 grid gap-x-14 gap-y-12 md:mt-20 md:grid-cols-2 md:gap-y-14">
          {SECTION_IDS.map((id, i) => (
            <RuleSection
              key={id}
              index={i}
              number={String(i + 1).padStart(2, '0')}
              title={t(`rules.sections.${id}.title`)}
              items={t(`rules.sections.${id}.items`)}
            />
          ))}
        </div>

        {/* Closing note + contact */}
        <motion.div
          className="mt-16 rounded-sm border border-[#171412]/10 bg-[#faf6ef]/70 px-6 py-8 text-center md:mt-20 md:px-12 md:py-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          custom={0}
        >
          <p className="mx-auto max-w-[640px] font-sans text-[15px] font-[250] leading-relaxed text-[#57524e] md:text-[16px]">
            {t('rules.closing')}
          </p>
          <Link
            to="/contacts"
            className="mt-7 inline-flex items-center justify-center bg-[#6e361b] px-10 py-3.5 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#5d2c15]"
          >
            {t('rules.contactCta')}
          </Link>
          <p className="mt-7 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#9a948e]">
            {tf('rules.updated', { hotel: CONTACT.hotelName })}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
