import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImage from '../assets/home/hero.webp'
import { CONTACT } from '../config/site'
import { useNewsletterSubscribe } from '../hooks/useNewsletterSubscribe'
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

export default function ContactsPage() {
  const { t } = useLanguage()
  const { email, setEmail, consent, setConsent, status, errorKey, handleSubmit } = useNewsletterSubscribe()

  return (
    <section className="relative -mt-16 min-h-[calc(100dvh-140px)] bg-[#f3eee6] md:min-h-[calc(100dvh-160px)]">
      <div className="grid min-h-[inherit] lg:grid-cols-2">
        {/* Panel A — imagery + contact on brand dark green */}
        <div className="relative min-h-[min(52vh,420px)] lg:min-h-[calc(100dvh-140px)]">
          <img
            src={heroImage}
            alt={t('contacts.heroImageAlt')}
            className="absolute inset-0 h-full w-full object-cover"
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
              <motion.address
                className="mt-8 not-italic font-sans text-[15px] font-[250] leading-relaxed text-[#f3eee6]/88"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                custom={2}
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
                custom={3}
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
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="c-email" className="font-sans text-[11px] font-medium uppercase tracking-widest text-[#6f6a65]">
                    {t('contacts.labelEmail')}
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.emailPlaceholder')}
                    className={fieldClass}
                  />
                </div>
                <label className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-[14px] w-[14px] shrink-0 rounded-sm border border-[#171412]/30 accent-[#6e361b]"
                  />
                  <span className="font-sans text-[12px] font-[250] leading-[1.5] text-[#57524e]">{t('footer.newsletterLegal')}</span>
                </label>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 w-full bg-[#6e361b] py-3.5 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#5d2c15] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px] sm:px-10"
                >
                  {status === 'loading' ? t('footer.newsletterSending') : t('contacts.send')}
                </button>
                <p aria-live="polite" className="min-h-[18px] font-sans text-[13px] font-[250] leading-relaxed">
                  {status === 'success' && <span className="text-[#57524e]">{t('footer.newsletterSuccess')}</span>}
                  {status === 'error' && <span className="text-[#9a3b1e]">{t(errorKey || 'footer.newsletterError')}</span>}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Location map */}
      <div className="bg-[#062c26]">
        <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
          <motion.div
            className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            custom={0}
          >
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#f3eee6]/70">
                {t('contacts.mapTitle')}
              </p>
              <h2 className="mt-3 font-cormorant text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-none text-[#f3eee6]">
                {CONTACT.addressLines[0]}
              </h2>
            </div>
            <a
              href={CONTACT.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-[#f3eee6]/80 underline-offset-4 transition-colors hover:text-[#f3eee6] hover:underline"
            >
              {t('contacts.getDirections')} →
            </a>
          </motion.div>

          <motion.div
            className="mt-7 overflow-hidden rounded-sm border border-white/15"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            custom={1}
          >
            <iframe
              src={CONTACT.mapEmbedSrc}
              title={t('contacts.mapEmbedTitle')}
              className="block h-80 w-full sm:h-105"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
