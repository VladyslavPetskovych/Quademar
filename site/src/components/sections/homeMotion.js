/**
 * Shared motion tuning for the landing page — pairs with Lenis smooth scroll.
 */

/** Smooth deceleration for scroll-triggered fades / slides */
export const HOME_SCROLL_EASE = [0.22, 1, 0.36, 1]

/**
 * Section wrappers: start reveals slightly before the block fully enters view
 * so the page feels continuous while scrolling.
 */
export const HOME_SECTION_VIEWPORT = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -12% 0px',
}
