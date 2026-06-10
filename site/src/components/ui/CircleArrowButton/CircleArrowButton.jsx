import { motion } from 'framer-motion'

export default function CircleArrowButton({ className = '', label = 'Next', onClick }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#171412] shadow-[0_5px_14px_rgba(0,0,0,0.18)] ${className}`}
      whileHover={{ scale: 1.08, rotate: 6 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        whileHover={{ x: 2 }}
      >
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </motion.button>
  )
}
