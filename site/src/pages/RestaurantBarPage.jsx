import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import aristoLogo from '../assets/logo/aristo-restaurant.webp'
import restaurant1 from '../assets/restaurant/restaurant-1.webp'
import restaurant2 from '../assets/restaurant/restaurant-2.webp'
import bar1 from '../assets/restaurant/bar-1.webp'
import bar2 from '../assets/restaurant/bar-2.webp'
import { CONTACT } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

const easeSmooth = [0.4, 0, 0.2, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: Number(custom) * 0.08, ease: easeSmooth },
  }),
}

const FACT_IDS = ['breakfast', 'restaurant', 'bar', 'reservations']

/**
 * Diptych: two equal panels side by side, same height, thin gutter — no overlap and
 * no offsets. Panels are 3:4, which is also how `restaurant-1/2.webp` are exported,
 * so those two render with no crop at all. The second photo is mirrored to sit next
 * to the copy in both the normal and reversed block.
 */
function FeatureImages({ mainSrc, mainAlt, secondSrc, secondAlt, reverse, panelAspect = 'aspect-[3/4]' }) {
  const panelClass = 'overflow-hidden rounded-sm bg-[#171412]/5 shadow-[0_28px_70px_-40px_rgba(23,20,18,0.55)]'
  const imgClass = `${panelAspect} w-full object-cover`

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <motion.div
        className={`${panelClass} ${reverse ? 'order-2' : 'order-1'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: easeSmooth }}
      >
        <img src={mainSrc} alt={mainAlt} loading="lazy" decoding="async" className={imgClass} />
      </motion.div>
      <motion.div
        className={`${panelClass} ${reverse ? 'order-1' : 'order-2'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.12, ease: easeSmooth }}
      >
        <img src={secondSrc} alt={secondAlt} loading="lazy" decoding="async" className={imgClass} />
      </motion.div>
    </div>
  )
}

/** Alternating image + copy block (restaurant / bar). */
function Feature({ reverse, tag, title, body, imageProps, action }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className={reverse ? 'lg:order-2' : ''}>
        <FeatureImages {...imageProps} reverse={reverse} />
      </div>
      <motion.div
        className={reverse ? 'lg:order-1' : ''}
        initial={{ opacity: 0, x: reverse ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: easeSmooth }}
      >
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
          {tag}
        </p>
        <h2 className="mt-4 font-cormorant text-[34px] font-normal leading-[1.08] text-[#171412] md:text-[42px]">
          {title}
        </h2>
        <div className="mt-6 space-y-4">
          {body.map((paragraph, i) => (
            <p key={i} className="font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
              {paragraph}
            </p>
          ))}
        </div>
        {action}
      </motion.div>
    </div>
  )
}

export default function RestaurantBarPage() {
  const { t } = useLanguage()

  return (
    <section className="relative -mt-16 overflow-hidden bg-[#f3eee6] pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="relative mx-auto max-w-[1180px] px-6 md:px-8">
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
          <span className="text-[#171412]">{t('restaurant.breadcrumb')}</span>
        </motion.nav>

        {/* Hero */}
        <motion.header
          className="mx-auto mt-10 max-w-[720px] text-center md:mt-12"
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={aristoLogo}
            alt={t('restaurant.logoAlt')}
            className="mx-auto h-auto w-[220px] md:w-[280px]"
            width="300"
            height="110"
            variants={fadeUp}
            custom={1}
          />
          <motion.p
            className="mt-8 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]"
            variants={fadeUp}
            custom={2}
          >
            {t('restaurant.eyebrow')}
          </motion.p>
          <motion.h1
            className="mt-4 font-cormorant text-[clamp(2.25rem,5vw,3.25rem)] font-normal leading-[1.05] tracking-[0.01em] text-[#171412]"
            variants={fadeUp}
            custom={3}
          >
            {t('restaurant.title')}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-[620px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]"
            variants={fadeUp}
            custom={4}
          >
            {t('restaurant.intro')}
          </motion.p>
          <motion.div
            className="mx-auto mt-8 h-px w-16 bg-[#171412]/15"
            aria-hidden="true"
            variants={fadeUp}
            custom={5}
          />
        </motion.header>

        {/* Restaurant */}
        <div className="mt-20 md:mt-28">
          <Feature
            tag={t('restaurant.restaurantTag')}
            title={t('restaurant.restaurantTitle')}
            body={[t('restaurant.restaurantBody1'), t('restaurant.restaurantBody2')]}
            imageProps={{
              mainSrc: restaurant1,
              mainAlt: t('restaurant.restaurantImageAlt'),
              secondSrc: restaurant2,
              secondAlt: t('restaurant.restaurantInsetAlt'),
            }}
            action={
              <Link
                to="/menu"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a3f35] px-7 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(10,63,53,0.22)] transition-colors hover:bg-[#0c4a3e]"
              >
                {t('restaurant.menuCta')}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            }
          />
        </div>

        {/* Bar */}
        <div className="mt-28 md:mt-36">
          <Feature
            reverse
            tag={t('restaurant.barTag')}
            title={t('restaurant.barTitle')}
            body={[t('restaurant.barBody1'), t('restaurant.barBody2')]}
            imageProps={{
              mainSrc: bar1,
              mainAlt: t('restaurant.barImageAlt'),
              secondSrc: bar2,
              secondAlt: t('restaurant.barInsetAlt'),
            }}
          />
        </div>

        {/* Hours & reservations */}
        <motion.div
          className="mt-28 rounded-sm border border-[#171412]/10 bg-[#faf7f0] px-6 py-12 md:mt-36 md:px-14 md:py-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: easeSmooth }}
        >
          <div className="text-center">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
              {t('restaurant.hoursEyebrow')}
            </p>
            <h2 className="mt-4 font-cormorant text-[32px] font-normal leading-[1.1] text-[#171412] md:text-[38px]">
              {t('restaurant.hoursTitle')}
            </h2>
          </div>

          <dl className="mx-auto mt-10 grid max-w-[760px] gap-x-10 gap-y-8 sm:grid-cols-2">
            {FACT_IDS.map((id) => (
              <div key={id} className="border-t border-[#171412]/10 pt-4">
                <dt className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#171412]/55">
                  {t(`restaurant.facts.${id}.label`)}
                </dt>
                <dd className="mt-1.5 font-cormorant text-[21px] leading-snug text-[#171412] md:text-[22px]">
                  {t(`restaurant.facts.${id}.value`)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="max-w-[520px] font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]">
              {t('restaurant.reserveBody')}
            </p>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#6e361b]/45 px-7 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-[#6e361b] transition-colors hover:bg-[#6e361b] hover:text-white"
            >
              {t('restaurant.reserveCta')}
              <span aria-hidden="true">{CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
