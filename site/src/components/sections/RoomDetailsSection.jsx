import { motion } from 'framer-motion'

const easeSmooth = [0.4, 0, 0.2, 1]

const headerBlock = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

const headerLine = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: easeSmooth } },
}

const columnReveal = {
  hidden: (dir) => ({ opacity: 0, x: dir * 28 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: easeSmooth, staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const rowReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: easeSmooth } },
}

function IconBed() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#0a3f35]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="10" width="16" height="8" rx="1.2" />
      <path d="M4 13h16M8 10V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
    </svg>
  )
}

function IconSize() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#0a3f35]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3.7 19.3 8v8L12 20.3 4.7 16V8L12 3.7Z" strokeLinejoin="round" />
      <path d="M4.7 8 12 12.4 19.3 8M12 12.4v8" strokeLinejoin="round" />
    </svg>
  )
}

function IconView() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#0a3f35]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconGuests() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#0a3f35]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8.6" cy="8.1" r="2.8" />
      <circle cx="15.9" cy="7.7" r="2.5" />
      <path d="M3.8 18.3a4.8 4.8 0 0 1 9.6 0M12.4 18.3a4.1 4.1 0 0 1 8.2 0" strokeLinecap="round" />
    </svg>
  )
}

function IconBathroom() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#0a3f35]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 14h14l-1.2 6H6.2L5 14Z" strokeLinejoin="round" />
      <path d="M8 14V9a1 1 0 0 1 1-1h1.5a3 3 0 0 1 3 3v3M5 10h2" strokeLinecap="round" />
    </svg>
  )
}

function IconFeatures() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#0a3f35]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3v3M12 18v3M4.2 7.8l2.1 2.1M17.7 14.1l2.1 2.1M3 12h3M18 12h3M4.2 16.2l2.1-2.1M17.7 9.9l2.1-2.1" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}

const ICONS = {
  bed: IconBed,
  size: IconSize,
  view: IconView,
  guests: IconGuests,
  bathroom: IconBathroom,
  features: IconFeatures,
}

function DetailRow({ row }) {
  const Icon = ICONS[row.icon] ?? IconFeatures
  return (
    <div className="flex gap-4 py-7 first:pt-0 md:py-2">
      <motion.div className="pt-0.5" whileHover={{ scale: 1.06 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
        <Icon />
      </motion.div>
      <div className="min-w-0 flex-1">
        <h4 className="font-sans text-[11px] font-medium uppercase tracking-widest text-[#6f6a65]">{row.label}</h4>
        {row.text ? (
          <p className="mt-3 font-sans text-[15px] font-[250] leading-relaxed text-[#171412]">{row.text}</p>
        ) : null}
        {row.lines?.length ? (
          <div className="mt-3 space-y-1.5 font-sans text-[15px] font-[250] leading-relaxed text-[#171412]">
            {row.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : null}
        {row.bullets?.length ? (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 font-sans text-[15px] font-[250] leading-relaxed text-[#171412]">
            {row.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

/**
 * @param {{ headline: string, intro: string, left: Array<object>, right: Array<object> }} detailSection
 */
export default function RoomDetailsSection({ detailSection, detailsHeading = 'Details' }) {
  if (!detailSection?.headline) return null

  const { headline, intro, left = [], right = [] } = detailSection
  const withoutUnits = (rows) =>
    rows.filter((row) => {
      const lab = row?.label?.toLowerCase?.() ?? ''
      return row?.icon !== 'units' && lab !== 'available units' && lab !== 'unidades disponibles'
    })
  const leftRows = withoutUnits(left)
  const rightRows = withoutUnits(right)

  return (
    <motion.div
      className="border-t border-[#171412]/10 bg-[#f3eee6]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: easeSmooth }}
    >
      <div className="mx-auto max-w-[960px] px-6 py-7 md:px-8 md:py-5 lg:py-6">
        <motion.div
          className="text-center"
          variants={headerBlock}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h2
            className="font-cormorant text-[32px] font-normal leading-none tracking-[0] text-[#171412] md:text-[38px] lg:text-[40px]"
            variants={headerLine}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-[640px] font-sans text-[16px] font-[250] leading-relaxed tracking-[0] text-[#57524e] md:mt-8"
            variants={headerLine}
          >
            {intro}
          </motion.p>
          <motion.h3
            className="mt-14 font-cormorant text-[26px] font-normal leading-none tracking-[0] text-[#171412] md:mt-16 md:text-[28px]"
            variants={headerLine}
          >
            {detailsHeading}
          </motion.h3>
        </motion.div>

        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
          <motion.div
            className="divide-y divide-[#171412]/12"
            variants={columnReveal}
            custom={-1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -6% 0px' }}
          >
            {leftRows.map((row, i) => (
              <motion.div key={`${row.label}-${i}`} variants={rowReveal}>
                <DetailRow row={row} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="divide-y divide-[#171412]/12"
            variants={columnReveal}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -6% 0px' }}
          >
            {rightRows.map((row, i) => (
              <motion.div key={`${row.label}-${i}`} variants={rowReveal}>
                <DetailRow row={row} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
