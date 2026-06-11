import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { roomImageClass, roomImageFrameClass } from "./roomImageStyles";

/** Image zoom on hover (same scale/timing as discovery cards, without vertical lift). */
const ROOM_IMAGE_HOVER = { scale: 1.05 };
const ROOM_IMAGE_HOVER_TRANSITION = { duration: 0.45, ease: "easeOut" };

function cx(...values) {
  return values.filter(Boolean).join(" ");
}

function FeatureIcon({ type }) {
  if (type === "units") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      >
        <path d="M4 20V9l8-5 8 5v11" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6M4 10h16" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "size") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      >
        <path
          d="M12 3.7 19.3 8v8L12 20.3 4.7 16V8L12 3.7Z"
          strokeLinejoin="round"
        />
        <path d="M4.7 8 12 12.4 19.3 8M12 12.4v8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "guests") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="8.6" cy="8.1" r="2.8" />
        <circle cx="15.9" cy="7.7" r="2.5" />
        <path
          d="M3.8 18.3a4.8 4.8 0 0 1 9.6 0M12.4 18.3a4.1 4.1 0 0 1 8.2 0"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <rect x="4" y="9.5" width="16" height="6.9" rx="1.2" />
      <path d="M6.1 9.5V7.6A2.6 2.6 0 0 1 8.7 5h6.6a2.6 2.6 0 0 1 2.6 2.6v1.9M4 13h16" />
    </svg>
  );
}

export default function RoomCategorySection({
  images = [],
  title,
  features = [],
  description,
  ctaLabel = "View Room",
  ctaTo = "/contacts",
  reverse = false,
  classNames = {},
}) {
  const safeImages = Array.isArray(images)
    ? images.filter((item) => item?.src)
    : [];
  /** Suites & rooms listing: first image only (no thumbnail strip / gallery). */
  const primaryImage = useMemo(() => safeImages[0] ?? null, [safeImages]);
  const reduceMotion = useReducedMotion();

  const easeSmooth = [0.4, 0, 0.2, 1];

  const imageColVariants = {
    hidden: { opacity: 0, x: reverse ? 28 : -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: easeSmooth },
    },
  };

  const contentColVariants = {
    hidden: { opacity: 0, x: reverse ? -22 : 22 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: easeSmooth,
        staggerChildren: 0.055,
        delayChildren: 0.06,
      },
    },
  };

  const lineReveal = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: easeSmooth },
    },
  };
  const visibleFeatures = features.filter(
    (feature) => feature?.icon !== "units",
  );

  return (
    <section
      className={cx(
        "flex w-full flex-col items-start gap-4 max-lg:bg-[#f9f5eb] max-lg:px-4 max-lg:py-4 lg:mx-auto lg:max-w-[1320px] lg:flex-row lg:items-center lg:gap-[87px] lg:bg-transparent lg:px-0 lg:py-0",
        reverse && "lg:flex-row-reverse",
        classNames.section,
      )}
    >
      <motion.div
        className={cx("relative shrink-0", classNames.imageWrapper)}
        variants={imageColVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -12% 0px" }}
      >
        {primaryImage ? (
          <Link
            to={ctaTo}
            aria-label={title}
            className="relative block overflow-hidden bg-white max-lg:shadow-none"
          >
            <motion.div
              className={cx(roomImageFrameClass, "bg-white", classNames.imageFrame)}
              whileHover={reduceMotion ? undefined : ROOM_IMAGE_HOVER}
              transition={{ scale: ROOM_IMAGE_HOVER_TRANSITION }}
            >
              <motion.img
                src={primaryImage.src}
                alt={primaryImage.alt ?? title}
                loading="lazy"
                decoding="async"
                className={cx(roomImageClass, classNames.image)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ opacity: { duration: 0.55, ease: easeSmooth } }}
              />
            </motion.div>
          </Link>
        ) : null}
      </motion.div>

      <motion.article
        className={cx(
          "flex w-full flex-col items-start gap-6 text-left max-lg:max-w-none lg:w-[524px] lg:shrink-0",
          classNames.content,
        )}
        variants={contentColVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -12% 0px" }}
      >
        <motion.div
          className="flex w-full flex-col items-start gap-4"
          variants={lineReveal}
        >
          <div className="flex w-full flex-col items-start gap-2">
            <h2
              className={cx(
                "w-full font-cormorant text-[32px] font-normal leading-[1.2] tracking-[0] text-[#141414] lg:text-[40px] lg:leading-[48px]",
                classNames.title,
              )}
            >
              <Link
                to={ctaTo}
                className="transition-opacity hover:opacity-75"
              >
                {title}
              </Link>
            </h2>

            <ul
              className={cx(
                "flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[13px] font-normal leading-[17px] tracking-[0] text-[#042D21] lg:text-[14px]",
                classNames.featuresList,
              )}
            >
              {visibleFeatures.map((feature) => (
                <li
                  key={feature.label}
                  className={cx(
                    "inline-flex items-end gap-1",
                    classNames.featureItem,
                  )}
                >
                  <FeatureIcon type={feature.icon} />
                  <span>{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <p
            className={cx(
              "w-full font-sans text-[15px] font-[250] leading-[1.2] tracking-[0] text-[rgba(13,13,13,0.88)] lg:text-[16px] lg:leading-[19px]",
              classNames.description,
            )}
          >
            {description}
          </p>
        </motion.div>

        <motion.div variants={lineReveal}>
          <Link
            to={ctaTo}
            className={cx(
              "inline-flex h-[43px] items-center justify-center bg-[#773A1B] px-3 font-sans text-[14px] font-normal leading-[19px] tracking-[0] text-white uppercase transition-colors hover:bg-[#6b341c] lg:text-[16px]",
              classNames.cta,
            )}
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </motion.article>
    </section>
  );
}
