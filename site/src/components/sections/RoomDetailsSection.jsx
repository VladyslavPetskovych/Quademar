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

const rowReveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: easeSmooth } },
}

const rowsBlock = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

const iconClass = 'h-6 w-6 shrink-0 text-[#141414]'

function IconBed() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="10" width="16" height="8" rx="1.2" />
      <path d="M4 13h16M8 10V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
    </svg>
  )
}

function IconSize() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3.7 19.3 8v8L12 20.3 4.7 16V8L12 3.7Z" strokeLinejoin="round" />
      <path d="M4.7 8 12 12.4 19.3 8M12 12.4v8" strokeLinejoin="round" />
    </svg>
  )
}

function IconView() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function IconGuests() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4098 4C18.3498 4 19.9098 5.57 19.9098 7.5C19.9098 9.39 18.4098 10.93 16.5398 11C16.4598 10.99 16.3698 10.99 16.2798 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16021 14.56C1.74021 16.18 1.74021 18.82 4.16021 20.43C6.91021 22.27 11.4202 22.27 14.1702 20.43C16.5902 18.81 16.5902 16.17 14.1702 14.56C11.4302 12.73 6.92021 12.73 4.16021 14.56Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconBathroom() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 18h12M7 14V9a2 2 0 0 1 2-2h1.5M17 14V9a2 2 0 0 0-2-2h-1.5" strokeLinecap="round" />
      <path d="M5 10h2M17 10h2M8 18v2M16 18v2" strokeLinecap="round" />
      <path d="M9 14h6l-1 4H10l-1-4Z" strokeLinejoin="round" />
    </svg>
  )
}

function IconFeatures() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22V12M12 10V2M4.2 7.8l2.1 2.1M17.7 14.1l2.1 2.1M2 12h4M18 12h4M4.2 16.2l2.1-2.1M17.7 9.9l2.1-2.1" strokeLinecap="round" />
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

function pairRows(left, right) {
  const max = Math.max(left.length, right.length)
  return Array.from({ length: max }, (_, i) => [left[i] ?? null, right[i] ?? null])
}

function DetailCell({ row, bordered }) {
  if (!row) {
    return <div className="hidden w-full lg:block lg:w-[421px]" aria-hidden="true" />
  }

  const Icon = ICONS[row.icon] ?? IconFeatures

  return (
    <div
      className={`flex w-full flex-col items-start gap-2 lg:w-[421px] ${
        bordered ? 'border-b border-[rgba(13,13,13,0.88)] pb-4' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon />
        <h4 className="font-sans text-[16px] font-medium leading-[19px] uppercase text-[#141414]">
          {row.label}
        </h4>
      </div>
      {row.text ? (
        <p className="font-sans text-[16px] font-[250] leading-[19px] text-[rgba(13,13,13,0.88)]">
          {row.text}
        </p>
      ) : null}
      {row.lines?.length ? (
        <div className="font-sans text-[16px] font-[250] leading-[19px] text-[rgba(13,13,13,0.88)]">
          {row.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      {row.bullets?.length ? (
        <div className="font-sans text-[16px] font-[250] leading-[19px] text-[rgba(13,13,13,0.88)]">
          {row.bullets.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      ) : null}
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
  const rowPairs = pairRows(leftRows, rightRows)

  return (
    <motion.div
      className="bg-[#FAF3E8]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: easeSmooth }}
    >
      <motion.div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-11 bg-[#FAF3E8] px-5 pb-10 pt-4 md:px-[60px] md:pb-[60px] md:pt-6 lg:px-0">
        <motion.div
          className="mx-auto flex w-full max-w-[880px] flex-col items-center gap-4 px-4 py-6 md:px-10 md:py-8"
          variants={headerBlock}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h2
            className="w-full text-center font-cormorant text-[32px] font-normal leading-[38px] tracking-[0] text-[#141414] lg:text-[40px] lg:leading-[48px]"
            variants={headerLine}
          >
            {headline}
          </motion.h2>
          <motion.p
            className="max-w-[800px] whitespace-pre-line text-center font-sans text-[16px] font-[250] leading-[19px] tracking-[0] text-[rgba(13,13,13,0.88)]"
            variants={headerLine}
          >
            {intro}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex w-full flex-col items-center gap-4 p-0"
          variants={headerBlock}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            className="w-full text-center font-cormorant text-[28px] font-normal leading-[34px] tracking-[0] text-[#141414] lg:text-[32px] lg:leading-[38px]"
            variants={headerLine}
          >
            {detailsHeading}
          </motion.h3>

          <motion.div
            className="flex w-full max-w-[1022px] flex-col items-start gap-4"
            variants={rowsBlock}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -6% 0px' }}
          >
            {rowPairs.map(([leftRow, rightRow], i) => {
              const isLast = i === rowPairs.length - 1
              return (
                <motion.div
                  key={`detail-row-${i}`}
                  className={`flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-[180px] ${
                    i > 0 ? 'pt-8' : ''
                  }`}
                  variants={rowReveal}
                >
                  <DetailCell row={leftRow} bordered={!isLast} />
                  <DetailCell row={rightRow} bordered={!isLast} />
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
