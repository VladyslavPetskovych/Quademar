import { motion } from 'framer-motion'
import RoomDetailIcon from '../icons/RoomDetailIcon'

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

function pairRows(left, right) {
  const max = Math.max(left.length, right.length)
  return Array.from({ length: max }, (_, i) => [left[i] ?? null, right[i] ?? null])
}

function DetailCell({ row, bordered }) {
  if (!row) {
    return <motion.div className="hidden w-full lg:block lg:w-[421px]" aria-hidden="true" />
  }

  return (
    <motion.div
      className={`flex w-full flex-col items-start gap-2 lg:w-[421px] ${
        bordered ? 'border-b border-[rgba(13,13,13,0.88)] pb-4' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <RoomDetailIcon type={row.icon} />
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
        <motion.div className="font-sans text-[16px] font-[250] leading-[19px] text-[rgba(13,13,13,0.88)]">
          {row.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>
      ) : null}
      {row.bullets?.length ? (
        <motion.div className="font-sans text-[16px] font-[250] leading-[19px] text-[rgba(13,13,13,0.88)]">
          {row.bullets.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </motion.div>
      ) : null}
    </motion.div>
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
