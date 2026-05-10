import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SITE } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

const TAB = {
  offers: 'offers',
  costaBlanca: 'costa-blanca',
}

const btnBase =
  'min-h-[48px] px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] transition-colors sm:min-w-[160px] sm:text-[13px]'

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
          ? `${btnBase} bg-[#0a3f35] text-white`
          : `${btnBase} bg-transparent text-[#6f6a65] hover:bg-[#171412]/5 hover:text-[#171412]`
      }
    >
      {label}
    </button>
  )
}

export default function MomentsPage() {
  const [tab, setTab] = useState(TAB.offers)
  const { tf } = useLanguage()

  return (
    <section className="relative -mt-16 bg-[#f9f7f2] pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto max-w-[860px] px-6 text-center md:px-8">
        <h1 className="font-cormorant text-[40px] font-normal leading-none tracking-[0] text-[#171412] md:text-[48px] lg:text-[52px]">
          {tf('moments.titleInHeart', { name: SITE.name })}
        </h1>
        <p className="mx-auto mt-6 max-w-[760px] font-sans text-[16px] font-[250] leading-relaxed tracking-[0] text-[#57524e] md:mt-8">
          {tf('moments.intro', { fullName: SITE.fullName })}
        </p>

        <div
          className="mt-10 flex flex-col items-stretch justify-center gap-2 sm:mt-12 sm:inline-flex sm:flex-row sm:items-center sm:gap-0"
          role="tablist"
          aria-label={tf('moments.tablistAria')}
        >
          <TabButton id={TAB.offers} label={tf('moments.tabOffers')} selected={tab === TAB.offers} onSelect={setTab} />
          <span
            className="hidden shrink-0 select-none px-1 font-sans text-[11px] font-medium uppercase tracking-[0.35em] text-[#c4bfb7] sm:inline sm:self-center sm:px-2"
            aria-hidden="true"
          >
            ////
          </span>
          <TabButton id={TAB.costaBlanca} label={tf('moments.tabCosta')} selected={tab === TAB.costaBlanca} onSelect={setTab} />
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[960px] border-t border-[#171412]/10 px-6 pt-12 md:mt-16 md:px-8 md:pt-14">
        <AnimatePresence mode="wait">
          {tab === TAB.offers ? (
            <motion.div
              key="offers"
              role="tabpanel"
              aria-labelledby="moments-tab-offers"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className="font-cormorant text-[28px] font-normal leading-none text-[#171412] md:text-[32px]">
                {tf('moments.offersTitle')}
              </h2>
              <p className="mx-auto mt-5 max-w-[640px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
                {tf('moments.offersLead')}
              </p>
              <ul className="mx-auto mt-8 max-w-[520px] space-y-3 text-left font-sans text-[15px] font-[250] leading-relaxed text-[#4f4a45]">
                <li className="border-b border-[#171412]/10 pb-3">{tf('moments.offersLi1')}</li>
                <li className="border-b border-[#171412]/10 pb-3">{tf('moments.offersLi2')}</li>
                <li>{tf('moments.offersLi3')}</li>
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="costa-blanca"
              role="tabpanel"
              aria-labelledby="moments-tab-costa-blanca"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className="font-cormorant text-[28px] font-normal leading-none text-[#171412] md:text-[32px]">
                {tf('moments.costaTitle')}
              </h2>
              <p className="mx-auto mt-5 max-w-[640px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
                {tf('moments.costaLead')}
              </p>
              <ul className="mx-auto mt-8 max-w-[520px] space-y-3 text-left font-sans text-[15px] font-[250] leading-relaxed text-[#4f4a45]">
                <li className="border-b border-[#171412]/10 pb-3">{tf('moments.costaLi1')}</li>
                <li className="border-b border-[#171412]/10 pb-3">{tf('moments.costaLi2')}</li>
                <li>{tf('moments.costaLi3')}</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
