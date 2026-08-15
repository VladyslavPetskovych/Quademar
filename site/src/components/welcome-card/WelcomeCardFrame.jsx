import { useEffect, useState } from 'react'
import './welcome-card.css'

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap'

/** A5 sheet width (148mm) in CSS px, plus the 2×16px wrap padding. */
const SHEET_WIDTH_PX = (148 * 96) / 25.4 + 32

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

/** Shrink the fixed-mm sheet to fit narrow viewports without reflowing it. */
function useFitScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => setScale(Math.min(1, window.innerWidth / SHEET_WIDTH_PX))
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
