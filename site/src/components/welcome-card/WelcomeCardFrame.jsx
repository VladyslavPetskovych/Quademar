import { useEffect, useState } from 'react'
import './welcome-card.css'

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap'

/** The A5 sheet (148×210mm) in CSS px — the size every rule in welcome-card.css is drawn against. */
const SHEET_WIDTH_PX = (148 * 96) / 25.4
const SHEET_HEIGHT_PX = (210 * 96) / 25.4

/** Load Jost + Playfair Display once, only on the routes that use the card. */
function useCardFonts() {
  useEffect(() => {
    if (document.querySelector('link[data-welcome-card-fonts]')) return
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://fonts.gstatic.com'
    preconnect.crossOrigin = ''
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_HREF
    link.dataset.welcomeCardFonts = 'true'
    document.head.append(preconnect, link)
  }, [])
}

/**
 * Scale the fixed-mm sheet to the largest size that still fits the viewport whole, growing it
 * past 1:1 on big screens as readily as it shrinks it on phones. Uniform, so the card keeps the
 * exact proportions of the print original — one axis fills the viewport and the other is padded
 * by the stage, which is why the stage is painted in the card's own cream rather than a
 * contrasting colour: the padding reads as part of the sheet instead of a border around it.
 */
const fitScale = () =>
  typeof window === 'undefined'
    ? 1
    : Math.min(window.innerWidth / SHEET_WIDTH_PX, window.innerHeight / SHEET_HEIGHT_PX)

function useFitScale() {
  // Seeded rather than defaulted to 1, so the card never paints at the wrong size first.
  const [scale, setScale] = useState(fitScale)

  useEffect(() => {
    const fit = () => setScale(fitScale)
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return scale
}

/** Keep these print-oriented info sheets out of the index. */
function useNoIndex(title) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.title = prevTitle
      meta.remove()
    }
  }, [title])
}

/** Dark stage + centred A5 sheet, matching the standalone welcome-card HTML. */
export default function WelcomeCardFrame({ title, children }) {
  useCardFonts()
  useNoIndex(title)
  const scale = useFitScale()

  return (
    <div className="wc" style={{ '--wc-scale': scale }}>
      <div className="wc-wrap">{children}</div>
    </div>
  )
}
