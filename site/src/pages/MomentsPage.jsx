import { AnimatePresence, motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import beachImage from '../assets/home/beach.webp'
import beach3Image from '../assets/home/beach3.webp'
import plantImage from '../assets/home/plant.webp'
import toursImage from '../assets/home/residence/tours.webp'
import earlySummerImage from '../assets/moments/early-summer.webp'
import offersEventsImage from '../assets/moments/offers-events.webp'
import romanceImage from '../assets/moments/romance.webp'
import weekendEscapeImage from '../assets/moments/weekend-escape.webp'
import { SITE } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

const TAB = {
  offers: 'offers',
  costaBlanca: 'costa-blanca',
}

const easeSmooth = [0.4, 0, 0.2, 1]

const panelMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: easeSmooth },
}

const OFFERS_CARDS = [
  { key: 'offersCard1', image: earlySummerImage },
  { key: 'offersCard2', image: weekendEscapeImage },
  { key: 'offersCard3', image: romanceImage },
]

const COSTA_CARDS = [
  { key: 'costaCard1', image: beachImage },
  { key: 'costaCard2', image: toursImage },
  { key: 'costaCard3', image: beach3Image },
]

function TabButton({ id, label, selected, onSelect }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      id={`moments-tab-${id}`}
      onClick={() => onSelect(id)}
      className={
        selected
          ? 'relative z-10 min-h-[44px] min-w-0 flex-1 rounded-full bg-[#0a3f35] px-3 py-2.5 text-center font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.12em] text-white shadow-[0_8px_24px_rgba(10,63,53,0.22)] transition-colors sm:min-h-[48px] sm:px-8 sm:text-[12px] sm:tracking-[0.14em]'
          : 'min-h-[44px] min-w-0 flex-1 rounded-full px-3 py-2.5 text-center font-sans text-[10px] font-medium uppercase leading-snug tracking-[0.12em] text-[#6f6a65] transition-colors hover:text-[#171412] sm:min-h-[48px] sm:px-8 sm:text-[12px] sm:tracking-[0.14em]'
      }
    >
      {label}
    </button>
  )
}

function MomentCard({ image, imageAlt, tag, title, description, footnote, index }) {
  return (
    <motion.article
      className="group flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 + index * 0.08, ease: easeSmooth }}
    >
      <motion.div
        className="relative overflow-hidden rounded-sm bg-[#171412]/5"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
      >
        <motion.img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover sm:aspect-[3/4]"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#062c26]/55 via-transparent to-transparent opacity-80"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {tag}
        </span>
      </motion.div>

      <div className="flex flex-1 flex-col border-b border-[#171412]/10 pb-6 pt-5">
        <h3 className="font-cormorant text-[24px] font-normal leading-[1.15] text-[#171412] md:text-[26px]">
          {title}
        </h3>
        <p className="mt-3 flex-1 font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]">{description}</p>
        <p className="mt-5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#6e361b]/80">
          {footnote}
        </p>
      </div>
    </motion.article>
  )
}

function MomentsPanel({ tabId, featuredImage, featuredAlt, featuredImageClassName = '', title, lead, cards, tf, cardFootnote, ctaHref, ctaLabel }) {
  return (
    <motion.div
      key={tabId}
      role="tabpanel"
      aria-labelledby={`moments-tab-${tabId}`}
      {...panelMotion}
    >
      <motion.div
        className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        <div className="relative overflow-hidden rounded-sm">
          <img src={featuredImage} alt={featuredAlt} loading="lazy" decoding="async" className={`aspect-[16/11] w-full object-cover lg:aspect-auto lg:min-h-[380px] ${featuredImageClassName}`.trim()} />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-linear-to-tr from-[#062c26]/70 via-[#062c26]/20 to-transparent"
            aria-hidden="true"
          />
          <motion.div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:hidden">
            <h2 className="font-cormorant text-[32px] font-normal leading-none text-white">{title}</h2>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col justify-center text-center lg:text-left"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: easeSmooth }}
        >
          <h2 className="hidden font-cormorant text-[36px] font-normal leading-[1.05] text-[#171412] md:text-[40px] lg:block">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e] lg:mx-0">
            {lead}
          </p>
          <div className="mx-auto mt-8 hidden h-px w-16 bg-[#171412]/15 lg:mx-0 lg:block" aria-hidden="true" />
          {ctaHref && (
            <div className="mt-7 flex justify-center lg:mt-8 lg:justify-start">
              <Link
                to={ctaHref}
                className="group inline-flex items-center gap-2 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-[#0a3f35] transition-colors hover:text-[#6e361b]"
              >
                {ctaLabel}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
        initial="hidden"
        animate="visible"
      >
        {cards.map((card, index) => (
          <MomentCard
            key={card.key}
            index={index}
            image={card.image}
            imageAlt={tf(`moments.${card.key}Alt`)}
            tag={tf(`moments.${card.key}Tag`)}
            title={tf(`moments.${card.key}Title`)}
            description={tf(`moments.${card.key}Desc`)}
            footnote={cardFootnote}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function MomentsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { tf } = useLanguage()

  const tab = searchParams.get('tab') === TAB.costaBlanca ? TAB.costaBlanca : TAB.offers
  const selectTab = (next) =>
    setSearchParams(next === TAB.costaBlanca ? { tab: TAB.costaBlanca } : {}, { replace: true })

  const offersCards = OFFERS_CARDS.map((c) => ({ ...c }))
  const costaCards = COSTA_CARDS.map((c) => ({ ...c }))

  return (
    <section className="relative -mt-16 overflow-hidden bg-[#f3eee6] pb-20 pt-24 md:pb-28 md:pt-32">
      <motion.img
        src={plantImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-8 hidden w-[min(420px,38vw)] -scale-x-100 opacity-[0.12] lg:block"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 0.12, x: 0 }}
        transition={{ duration: 0.9, ease: easeSmooth }}
      />

      <div className="relative mx-auto max-w-[1180px] px-6 md:px-8">
        <motion.header
          className="mx-auto max-w-[860px] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeSmooth }}
        >
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
            {tf('moments.eyebrow')}
          </p>
          <h1 className="mt-4 font-cormorant text-[clamp(2.25rem,5vw,3.25rem)] font-normal leading-[1.05] tracking-[0.01em] text-[#171412]">
            {tf('moments.titleInHeart', { name: SITE.name })}
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e] md:mt-8">
            {tf('moments.intro', { fullName: SITE.fullName })}
          </p>

          <motion.div
            className="mx-auto mt-10 flex w-full max-w-[min(100%,520px)] items-center justify-center sm:mt-12 sm:max-w-none"
            role="tablist"
            aria-label={tf('moments.tablistAria')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: easeSmooth }}
          >
            <motion.div
              layout
              className="inline-flex w-full flex-row items-center gap-0 rounded-full border border-[#171412]/10 bg-[#faf6ef]/90 p-1 shadow-[0_12px_40px_rgba(23,20,18,0.06)] backdrop-blur-sm sm:w-auto sm:min-w-[min(100%,520px)]"
            >
              <TabButton
                id={TAB.offers}
                label={tf('moments.tabOffers')}
                selected={tab === TAB.offers}
                onSelect={selectTab}
              />
              <span
                className="shrink-0 select-none px-1 font-sans text-[10px] font-medium uppercase tracking-[0.35em] text-[#c4bfb7] sm:px-2"
                aria-hidden="true"
              >
                //
              </span>
              <TabButton
                id={TAB.costaBlanca}
                label={tf('moments.tabCosta')}
                selected={tab === TAB.costaBlanca}
                onSelect={selectTab}
              />
            </motion.div>
          </motion.div>
        </motion.header>

        <div className="mx-auto mt-14 max-w-[1120px] border-t border-[#171412]/10 pt-12 md:mt-16 md:pt-14">
          <AnimatePresence mode="wait">
            {tab === TAB.offers ? (
              <MomentsPanel
                tabId={TAB.offers}
                featuredImage={offersEventsImage}
                featuredAlt={tf('moments.offersFeaturedAlt')}
                featuredImageClassName="lg:max-h-[420px]"
                title={tf('moments.offersTitle')}
                lead={tf('moments.offersLead')}
                cards={offersCards}
                tf={tf}
                cardFootnote={tf('moments.panelNote')}
              />
            ) : (
              <MomentsPanel
                tabId={TAB.costaBlanca}
                featuredImage={beachImage}
                featuredAlt={tf('moments.costaFeaturedAlt')}
                title={tf('moments.costaTitle')}
                lead={tf('moments.costaLead')}
                cards={costaCards}
                tf={tf}
                cardFootnote={tf('moments.panelNote')}
                ctaHref="/moments/guardamar"
                ctaLabel={tf('moments.costaGuardamarCta')}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
