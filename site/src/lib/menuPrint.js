import aristoLogoUrl from '../assets/logo/aristo-restaurant.png'
import caslonRegularUrl from '../assets/fonts/big-caslon/fonnts.com-Big_Caslon_CC.woff2?url'
import caslonItalicUrl from '../assets/fonts/big-caslon/fonnts.com-Big_Caslon_CC_Italic.woff2?url'
import caslonBoldUrl from '../assets/fonts/big-caslon/fonnts.com-Big_Caslon_CC_Bold.woff2?url'
import scriptFontUrl from '../assets/fonts/pinyon-script/PinyonScript-Regular.woff2?url'
import { oliveBranchSvg, oliveSprigSvg } from './menuDecor'

/**
 * Build a single-page A4 version of the daily menu — a faithful copy of the web menu
 * card (Aristo logo, Big Caslon dishes, Pinyon script headings, detailed olive-branch
 * corners, sprig dividers, inner frame) — and open the browser's print dialog, from
 * which the user can "Save as PDF".
 *
 * The logo (PNG, for reliable print rendering) and all fonts are fetched once and
 * inlined as data URIs so the print document is fully self-contained. Printing waits
 * for the fonts AND the logo image to load, so the logo never prints blank. The page
 * is a fixed A4 with `overflow:hidden`, so a daily menu always fits on one page. All
 * strings are expected already localized. `sections` is `[{ title, items[] }]`.
 */
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c])

async function toDataUrl(url, mime) {
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  const blob = mime ? new Blob([buf], { type: mime }) : await res.blob()
  return await new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(fr.result)
    fr.onerror = reject
    fr.readAsDataURL(blob)
  })
}

// Fetch each asset at most once across print calls.
const cache = new Map()
const once = (url, mime) => {
  if (!cache.has(url)) cache.set(url, toDataUrl(url, mime).catch(() => ''))
  return cache.get(url)
}

export async function printMenu({ hotelName, dateLabel, sections = [], included = [], priceLabel, orLabel = 'o' }) {
  // Inline the logo + fonts (best-effort — the PDF still works with system fallbacks).
  const [logoData, caslon, caslonI, caslonB, pinyon] = await Promise.all([
    once(aristoLogoUrl, 'image/png'),
    once(caslonRegularUrl, 'font/woff2'),
    once(caslonItalicUrl, 'font/woff2'),
    once(caslonBoldUrl, 'font/woff2'),
    once(scriptFontUrl, 'font/woff2'),
  ])

  const branch = oliveBranchSvg({ color: '#7f8d6f', opacity: 0.5 })
  const sprig = oliveSprigSvg({ color: '#7f8d6f', opacity: 0.9 })
  const divider = `<div class="div"><span class="rule"></span><span class="sprig">${sprig}</span><span class="rule"></span></div>`

  const coursesHtml = sections
    .filter((s) => s.items.length > 0)
    .map((s) => {
      const dishes = s.items
        .map((it, i) => `${i > 0 ? `<div class="or">${esc(orLabel)}</div>` : ''}<div class="dish">${esc(it)}</div>`)
        .join('')
      return `<div class="course"><h2>${esc(s.title)}</h2>${dishes}</div>`
    })
    .join(divider)

  const incHtml = included.map(esc).map((l) => `<div>${l}</div>`).join('')
  const priceHtml = priceLabel ? `<div class="price">${esc(priceLabel)}</div>` : ''
  const footHtml = incHtml || priceHtml ? `${divider}<div class="foot">${incHtml}${priceHtml}</div>` : ''

  // Big Caslon (body) + Pinyon (headings) — mirrors the web menu exactly, with graceful fallbacks.
  const bcSerif = caslon ? "'Big Caslon CC', Georgia, serif" : 'Georgia, serif'
  const scriptFont = pinyon ? "'Pinyon Script', cursive" : 'Georgia, serif'
  const fontFaces =
    (caslon ? `@font-face{font-family:'Big Caslon CC';src:url(${caslon}) format('woff2');font-weight:400;font-style:normal;}` : '') +
    (caslonI ? `@font-face{font-family:'Big Caslon CC';src:url(${caslonI}) format('woff2');font-weight:400;font-style:italic;}` : '') +
    (caslonB ? `@font-face{font-family:'Big Caslon CC';src:url(${caslonB}) format('woff2');font-weight:700;font-style:normal;}` : '') +
    (pinyon ? `@font-face{font-family:'Pinyon Script';src:url(${pinyon}) format('woff2');font-weight:400;font-style:normal;}` : '')

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
    <title>${esc(hotelName)} — ${esc(dateLabel)}</title>
    <style>
      @page { size: A4 portrait; margin: 0; }
      ${fontFaces}
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      /* Fixed A4 page → a daily menu always prints on exactly one sheet. Spacing is
         kept compact so the included/price footer always fits without clipping. */
      .page { position: relative; overflow: hidden; width: 210mm; height: 297mm; margin: 0 auto;
              background: #faf7f0; padding: 13mm 22mm; display: flex; flex-direction: column; }
      .br { position: absolute; width: 54mm; pointer-events: none; }
      .br.tl { top: -8mm; left: -10mm; transform: rotate(128deg); }
      .br.br2 { bottom: -8mm; right: -10mm; transform: rotate(-52deg); }
      .frame { position: absolute; inset: 9mm; border: 1px solid rgba(110,54,27,.15); }
      .acc { position: absolute; width: 10mm; height: 10mm; pointer-events: none; }
      .acc.bl { bottom: 11mm; left: 11mm; border-left: 1px solid rgba(110,54,27,.35); border-bottom: 1px solid rgba(110,54,27,.35); }
      .acc.tr { top: 11mm; right: 11mm; border-right: 1px solid rgba(110,54,27,.35); border-top: 1px solid rgba(110,54,27,.35); }
      .content { position: relative; z-index: 1; flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center; }
      .logo { display: block; margin: 0 auto; width: 64mm; height: auto; }
      .date { text-align: center; font-family: ${bcSerif}; font-size: 25px; text-transform: uppercase;
              letter-spacing: .16em; color: #171412; margin-top: 11px; }
      .flourish { width: 13mm; margin: 7px auto 0; }
      .flourish svg, .sprig svg { display: block; width: 100%; height: auto; }
      .courses { max-width: 118mm; margin: 15px auto 0; display: flex; flex-direction: column; }
      .course { text-align: center; }
      .course h2 { font-family: ${scriptFont}; font-weight: 400; font-style: ${pinyon ? 'normal' : 'italic'};
                   font-size: 35px; line-height: 1.06; color: #8f8274; }
      .dish { font-family: ${bcSerif}; font-size: 18px; line-height: 1.42; color: #2b2622; margin-top: 5px; }
      .or { font-family: ${bcSerif}; font-style: italic; font-size: 12.5px; color: #a1988d; margin: 2px 0; }
      .div { display: flex; align-items: center; justify-content: center; gap: 12px; max-width: 78mm; margin: 12px auto; }
      .div .rule { flex: 1; height: 3px;
             background-image: radial-gradient(circle, rgba(110,54,27,.34) 1.3px, transparent 1.6px);
             background-size: 9px 3px; background-repeat: repeat-x; background-position: center; }
      .div .sprig { width: 32px; flex: 0 0 auto; }
      .foot { text-align: center; font-family: ${bcSerif}; font-size: 15px; line-height: 1.5; color: #33302c; margin-top: 12px; }
      .price { font-family: ${bcSerif}; font-weight: 700; font-size: 19.5px; color: #6e361b; margin-top: 5px; letter-spacing: .02em; }
    </style></head>
    <body><div class="page">
      <span class="br tl">${branch}</span>
      <span class="br br2">${branch}</span>
      <span class="frame"></span>
      <span class="acc bl"></span>
      <span class="acc tr"></span>
      <div class="content">
        ${logoData ? `<img class="logo" src="${logoData}" alt="">` : ''}
        <div class="date">${esc(dateLabel)}</div>
        <div class="flourish">${sprig}</div>
        <div class="courses">${coursesHtml}</div>
        ${footHtml}
      </div>
    </div></body></html>`

  const iframe = document.createElement('iframe')
  iframe.setAttribute('aria-hidden', 'true')
  Object.assign(iframe.style, {
    position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0', visibility: 'hidden',
  })
  document.body.appendChild(iframe)

  let cleaned = false
  const cleanup = () => {
    if (cleaned) return
    cleaned = true
    try {
      document.body.removeChild(iframe)
    } catch {
      /* already gone */
    }
  }

  const win = iframe.contentWindow
  const doc = win.document
  doc.open()
  doc.write(html)
  doc.close()

  win.onafterprint = cleanup

  let printed = false
  const printOnce = () => {
    if (printed) return
    printed = true
    try {
      win.focus()
      win.print()
    } catch {
      cleanup()
    }
  }

  // Wait for fonts AND the logo image to be ready, so nothing prints blank.
  const fontsReady = doc.fonts ? doc.fonts.ready : Promise.resolve()
  const imagesReady = Promise.all(
    Array.from(doc.images).map((img) =>
      img.complete ? Promise.resolve() : new Promise((r) => { img.onload = img.onerror = r }),
    ),
  )
  Promise.all([fontsReady, imagesReady]).then(() => setTimeout(printOnce, 80))
  setTimeout(printOnce, 2500) // fallback if a resource never settles
  setTimeout(cleanup, 60000) // safety net if onafterprint never fires
}
