import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/home/hero.png'
import { CONTACT } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

const easeSmooth = [0.4, 0, 0.2, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: Number(custom) * 0.07, ease: easeSmooth },
  }),
}

const inView = { once: true, amount: 0.25 }

const fieldClass =
  'w-full border-0 border-b border-[#171412]/18 bg-transparent px-0 py-3 font-sans text-[16px] font-[250] text-[#171412] placeholder:text-[#9a948e] outline-none transition-colors focus:border-[#6e361b] focus:ring-0'

const CONTACT_STAR_MARKERS = [
  { rotate: '-7deg', y: '-1px', scale: 1.04 },
  { rotate: '5deg', y: '2px', scale: 0.96 },
  { rotate: '-4deg', y: '-1px', scale: 1 },
  { rotate: '6deg', y: '2px', scale: 0.97 },
]

function ContactRatingStars() {
  return (
    <span className="inline-flex shrink-0 items-center gap-[3px] leading-none" aria-hidden="true">
      {CONTACT_STAR_MARKERS.map((s, i) => (
        <span
          key={i}
          className="inline-block bg-linear-to-br from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-[15px] text-transparent filter-[drop-shadow(0_1px_4px_rgba(251,191,36,0.35))] sm:text-[16px]"
          style={{
            transform: `rotate(${s.rotate}) translateY(${s.y}) scale(${s.scale})`,
          }}
        >
          ★
        </span>
      ))}
    </span>
  )
}

export default function ContactsPage() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="relative -mt-16 min-h-[calc(100dvh-140px)] bg-[#f3eee6] md:min-h-[calc(100dvh-160px)]">
      <div className="grid min-h-[inherit] lg:grid-cols-2">
        {/* Panel A — imagery + contact on brand dark green */}
        <div className="relative min-h-[min(52vh,420px)] lg:min-h-[calc(100dvh-140px)]">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-[#062c26] via-[#062c26]/82 to-[#062c26]/55"
            aria-hidden="true"
          />
          <div className="relative z-10 flex min-h-[inherit] flex-col justify-end px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
            <div>
              <motion.p
                className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#f3eee6]/70"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                custom={0}
              >
                {t('contacts.kicker')}
              </motion.p>
              <motion.h1
                className="mt-3 font-cormorant text-[clamp(2.75rem,6vw,4rem)] font-normal leading-[0.95] tracking-[0.02em] text-[#f3eee6]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                custom={1}
              >
                {CONTACT.hotelName}
              </motion.h1>
              <motion.div
                className="mt-6 max-w-md rounded-sm border border-white/18 bg-white/6 px-4 py-3.5 backdrop-blur-[2px]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                custom={2}
              >
                <div className="flex gap-3.5">
                  <ContactRatingStars />
                  <p className="font-sans text-[14px] font-[250] leading-snug text-[#f3eee6]/92 sm:text-[15px]">
                    {t('contacts.hotelRatingInfo')}
                  </p>
                </div>
              </motion.div>
              <motion.address
                className="mt-8 not-italic font-sans text-[15px] font-[250] leading-relaxed text-[#f3eee6]/88"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                custom={3}
              >
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </motion.address>
              <motion.div
                className="mt-10 space-y-4 border-t border-white/15 pt-10 font-sans text-[17px] font-[250] text-[#f3eee6]"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                custom={4}
              >
                <a href={CONTACT.phoneHref} className="block transition-opacity hover:opacity-80">
                  {CONTACT.phoneDisplay}
                </a>
                <a href={CONTACT.emailHref} className="block break-all transition-opacity hover:opacity-80">
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('aria.instagramHotel')}
                  className="mt-5 inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
                >
                  <svg
                    className="h-5 w-5 shrink-0 text-[#f3eee6]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    aria-hidden="true"
                  >
                    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="font-sans text-[17px] font-[250]">@hotelguardamar</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Panel B — form on cream */}
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
          <div>
            <motion.nav
              className="font-sans text-[12px] font-[250] uppercase tracking-[0.12em] text-[#6f6a65]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              custom={0}
            >
              <Link to="/" className="transition-colors hover:text-[#171412]">
                {t('breadcrumb.home')}
              </Link>
              <span className="px-2 text-[#9a948e]">/</span>
              <span className="text-[#171412]">{t('contacts.breadcrumbContact')}</span>
            </motion.nav>

            <motion.h2
              className="mt-10 font-cormorant text-[clamp(2rem,4vw,2.75rem)] font-normal leading-none text-[#171412]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              custom={1}
            >
              {t('contacts.h2')}
            </motion.h2>
            <motion.div
              className="mt-4 h-px w-12 bg-[#6e361b]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              custom={2}
            />
            <motion.p
              className="mt-6 max-w-md font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              custom={2}
            >
              {t('contacts.intro')}
            </motion.p>

            <motion.div
              className="mt-10 max-w-md"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              custom={3}
            >
              {sent ? (
                <p className="font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]">
                  {t('contacts.thankYou')}
                </p>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="c-name" className="font-sans text-[11px] font-medium uppercase tracking-widest text-[#6f6a65]">
                      {t('contacts.labelName')}
                    </label>
                    <input id="c-name" name="name" type="text" autoComplete="name" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="font-sans text-[11px] font-medium uppercase tracking-widest text-[#6f6a65]">
                      {t('contacts.labelEmail')}
                    </label>
                    <input id="c-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="font-sans text-[11px] font-medium uppercase tracking-widest text-[#6f6a65]">
                      {t('contacts.labelMessage')}
                    </label>
                    <textarea id="c-msg" name="message" rows={4} required className={`${fieldClass} resize-y min-h-[100px]`} />
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full bg-[#6e361b] py-3.5 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#5d2c15] sm:w-auto sm:min-w-[200px] sm:px-10"
                  >
                    {t('contacts.send')}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
