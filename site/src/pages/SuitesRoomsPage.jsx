import { useMemo } from "react";
import { motion } from "framer-motion";
import plantImage from "../assets/home/plant.png";
import HomeDiscoverySection from "../components/sections/HomeDiscoverySection";
import { ROOM_CATEGORIES } from "../../rooms";
import RoomCategorySection from "../components/sections/RoomCategorySection";
import { useLanguage } from "../i18n/LanguageContext";
import { localizeRoom } from "../i18n/localizeRoom";

/** Calm deceleration — no overshoot (avoids “jiggly” end-of-motion). */
const easeSmooth = [0.4, 0, 0.2, 1];

const headerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 2, ease: easeSmooth } },
};

export default function SuitesRoomsPage() {
  const { locale, t } = useLanguage();
  const categories = useMemo(
    () => ROOM_CATEGORIES.map((c) => localizeRoom(c, locale)),
    [locale],
  );

  return (
    <>
      <section className="relative overflow-x-clip bg-[#f3eee6] -mt-16 pb-20 pt-24 md:pb-24 md:pt-32">
        <div className="relative mx-auto w-full max-w-[1320px] px-4 md:px-0">
          <img
            src={plantImage}
            alt=""
            aria-hidden="true"
            role="presentation"
            className="pointer-events-none absolute top-[45px] left-[1210px] z-[2] hidden h-[318px] w-[318px] -scale-x-100 object-cover object-center opacity-22 lg:block"
          />

          <motion.nav
            className="relative z-[1] font-sans text-[14px] font-[250] leading-none tracking-[0] text-left uppercase text-[#6f6a65]"
            variants={headerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={headerItem}>
              {t("breadcrumb.home")}
            </motion.span>
            <motion.span
              variants={headerItem}
              className="px-2.5 text-[#9a948e]"
            >
              /
            </motion.span>
            <motion.span variants={headerItem}>
              {t("breadcrumb.suitesRooms")}
            </motion.span>
          </motion.nav>

          <motion.div
            className="mx-auto mt-14 max-w-[860px] text-center md:mt-16"
            variants={headerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
          >
            <motion.h1
              className="font-cormorant text-[58px] font-normal leading-none tracking-[0] text-[#171412]"
              variants={headerItem}
            >
              {t("roomsCommon.suitesTitle")}
            </motion.h1>
            <motion.p
              className="mx-auto mt-6 max-w-[760px] font-sans text-[16px] font-[250] leading-none tracking-[0] text-center text-[#57524e]"
              variants={headerItem}
            >
              {t("roomsCommon.suitesLead")}
            </motion.p>
          </motion.div>

          <motion.div
            className="relative z-[1] mx-auto mt-10 flex w-full flex-col items-stretch gap-8 md:mt-14 xl:mt-16"
            variants={headerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
          >
            {categories.map((category) => (
              <RoomCategorySection
                key={category.id}
                images={category.images}
                title={category.title}
                features={category.features}
                description={category.description}
                ctaLabel={category.ctaLabel}
                ctaTo={category.ctaTo}
                reverse={Boolean(category.reverse)}
                classNames={category.classNames}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <HomeDiscoverySection />
    </>
  );
}
