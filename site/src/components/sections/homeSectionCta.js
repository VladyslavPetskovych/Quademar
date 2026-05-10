/** Brown primary CTA — shared on home sections (Read more, Discover, Learn more). */
export const HOME_PRIMARY_CTA_CLASS =
  'inline-flex bg-[#6e361b] px-6 py-3 text-center font-sans text-[14px] font-normal leading-none tracking-[0.04em] text-white uppercase transition-colors hover:bg-[#5d2c15] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6e361b]/40'

/** First block below the hero — hero “Learn more” scroll target. */
export const HOME_INTRO_SECTION_ID = 'home-intro'

export function scrollToHomeIntro() {
  document.getElementById(HOME_INTRO_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
