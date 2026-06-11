import { motion } from 'framer-motion'
import { HOME_SCROLL_EASE } from './homeMotion'

export default function HomeDiscoveryCard({
  image,
  imageAlt,
  title,
  description,
  className = '',
  imageClassName = '',
  titleClassName = '',
}) {
  return (
    <motion.article
      className={`flex flex-col ${className}`}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: HOME_SCROLL_EASE },
        },
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="overflow-hidden">
        <motion.img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className={`h-[320px] w-full object-cover md:h-[360px] lg:h-[484.547px] ${imageClassName}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
      <h4 className={`mt-4 font-sans text-[22px] font-medium tracking-[0.01em] text-[#1b1917] uppercase ${titleClassName}`}>
        {title}
      </h4>
      <p className="mt-2 max-w-[360px] font-sans text-[16px] font-light leading-normal text-[#56524f]">{description}</p>
    </motion.article>
  )
}
