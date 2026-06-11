/** Shared room / suite image frame — 673×430 (Figma). */
export const ROOM_IMAGE_WIDTH = 673
export const ROOM_IMAGE_HEIGHT = 430

/** Fixed frame; scales down on narrow viewports while keeping aspect ratio. */
export const roomImageFrameClass =
  'relative aspect-[673/430] w-full max-w-[673px] shrink-0 overflow-hidden bg-white lg:h-[430px] lg:w-[673px] lg:aspect-auto'

/** Image fill inside the frame (GPU layer reduces blur during hover transforms). */
export const roomImageClass =
  'block h-full w-full object-cover object-center [transform:translateZ(0)] [backface-visibility:hidden]'

/** Room detail page hero — 1440×677 full bleed (Figma desktop). */
export const roomHeroFrameClass =
  'relative isolate w-full overflow-hidden bg-[#FAF3E8] aspect-[1440/677] max-lg:min-h-[min(52vw,280px)] lg:aspect-auto lg:h-[677px]'

export const roomHeroImageClass =
  'absolute inset-0 block h-full w-full object-cover object-center [transform:translateZ(0)] [backface-visibility:hidden]'

/**
 * Inline style that paints an image's tiny blur placeholder as the frame background,
 * so a soft preview shows instantly while the full WebP streams in ("blur-up").
 * Pass the result of `suiteMeta(src)`; returns `undefined` when no placeholder exists.
 */
export function blurBackgroundStyle(meta) {
  if (!meta?.placeholder) return undefined
  return {
    backgroundImage: `url("${meta.placeholder}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}
