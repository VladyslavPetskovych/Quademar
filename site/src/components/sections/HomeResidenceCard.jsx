import { motion } from 'framer-motion'

export default function HomeResidenceCard({ image, imageAlt, title, imageClassName = '' }) {
  return (
    <motion.article
      className="relative aspect-393/646 w-[calc(100vw-56px)] max-w-[393px] shrink-0 overflow-hidden sm:w-[calc(100vw-84px)] md:w-[clamp(300px,42vw,360px)] lg:w-[393px]"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.img
        src={image}
        alt={imageAlt}
        loading="eager"
        decoding="async"
        className={`h-full w-full object-cover ${imageClassName}`.trim()}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
      <p className="absolute left-6 top-4 font-cormorant text-[40px] font-normal leading-none tracking-normal text-[#efe6d8]">
        {title}
      </p>
    </motion.article>
  )
}
