import aristoLogoUrl from '../assets/logo/royal_green/aristo.webp'
import scriptFontUrl from '../assets/fonts/pinyon-script/PinyonScript-Regular.woff2?url'
import { oliveBranchSvg } from './menuDecor'

/**
 * Build a single-page A4 version of the daily menu, styled like the framed print menu
 * (Aristo logo, script course headings, olive-branch corners, dotted dividers) and open
 * the browser's print dialog — from which the user can "Save as PDF".
 *
 * The logo and script font are fetched once and inlined as data URIs so the print
 * document is fully self-contained and renders reliably (no network/font race). All
 * strings are expected already localized. `sections` is `[{ title, items[] }]`.
 */
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c])

let logoPromise
let fontPromise

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

const getLogo = () => (logoPromise ??= toDataUrl(aristoLogoUrl))
const getFont = () => (fontPromise ??= toDataUrl(scriptFontUrl, 'font/woff2'))

export async function printMenu({ hotelName, dateLabel, sections = [], included = [], priceLabel, orLabel = 'o' }) {
  // Inline the logo + script font (best-effort — the PDF still works without them).
  let logoData = ''
  let fontData = ''
  try {
    ;[logoData, fontData] = await Promise.all([getLogo().catch(() => ''), getFont().catch(() => '')])
  } catch {
    /* fall back to plain type below */
  }

  const branch = oliveBranchSvg({ color: '#84907a', opacity: 0.5 })

  const coursesHtml = sections
    .filter((s) => s.items.length > 0)
    .map((s) => {
      const dishes = s.items
        .map((it, i) => `${i > 0 ? `<div class="or">${esc(orLabel)}</div>` : ''}<div class="dish">${esc(it)}</div>`)
        .join('')
      return `<div class="course"><h2>${esc(s.title)}</h2>${dishes}</div>`
    })
    .join('<div class="dot"></div>')

  const footLines = [...included.map(esc), priceLabel ? esc(priceLabel) : '']
    .filter(Boolean)
    .map((l) => `<div>${l}</div>`)
    .join('')
  const footHtml = footLines ? `<div class="dot"></div><div class="foot">${footLines}</div>` : ''

  const titleFont = fontData ? "'Pinyon Script', cursive" : 'Georgia, serif'

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
    <title>${esc(hotelName)} — ${esc(dateLabel)}</title>
    <style>
      @page { size: A4 portrait; margin: 0; }
      ${fontData ? `@font-face{font-family:'Pinyon Script';src:url(${fontData}) format('woff2');font-weight:400;font-style:normal;}` : ''}
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body { font-family: Georgia, 'Times New Roman', serif; color: #171412;
             -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { position: relative; overflow: hidden; width: 210mm; min-height: 297mm; margin: 0 auto;
              padding: 20mm 22mm 18mm; background: #faf7f0; display: flex; flex-direction: column; }
      .branch { position: absolute; width: 54mm; }
      .branch.tl { top: -7mm; left: -9mm; transform: rotate(128deg); }
      .branch.br { bottom: -7mm; right: -9mm; transform: rotate(-52deg); }
      .bracket { position: absolute; width: 12mm; height: 12mm; }
      .bracket.bl { bottom: 11mm; left: 11mm; border-left: 1px solid rgba(110,54,27,.32); border-bottom: 1px solid rgba(110,54,27,.32); }
      .bracket.tr { top: 11mm; right: 11mm; border-right: 1px solid rgba(110,54,27,.32); border-top: 1px solid rgba(110,54,27,.32); }
      .content { position: relative; z-index: 1; flex: 1 1 auto; display: flex; flex-direction: column; }
      .logo { text-align: center; }
      .logo img { height: 24mm; width: auto; }
      .date { text-align: center; text-transform: uppercase; letter-spacing: .14em; font-size: 26px;
              margin: 13px 0 0; color: #171412; }
      .body { flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center; padding: 10mm 0; }
      .course { text-align: center; }
      .course h2 { font-family: ${titleFont}; font-style: ${fontData ? 'normal' : 'italic'}; font-weight: 400;
                   color: #9a8d80; font-size: 38px; line-height: 1.1; margin: 0 0 6px; }
      .dish { font-size: 15px; color: #33302c; line-height: 1.55; }
      .or { font-style: italic; font-size: 13px; color: #9a938c; margin: 2px 0; }
      .dot { height: 3px; max-width: 280px; margin: 20px auto;
             background-image: radial-gradient(circle, rgba(23,20,18,.32) 1.3px, transparent 1.6px);
             background-size: 9px 3px; background-repeat: repeat-x; background-position: center; }
      .foot { text-align: center; font-size: 16px; color: #33302c; line-height: 1.6; }
    </style></head>
    <body><div class="page">
      <div class="branch tl">${branch}</div>
      <div class="branch br">${branch}</div>
      <span class="bracket bl"></span>
      <span class="bracket tr"></span>
      <div class="content">
        ${logoData ? `<div class="logo"><img src="${logoData}" alt=""></div>` : ''}
        <div class="date">${esc(dateLabel)}</div>
        <div class="body">${coursesHtml}</div>
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

  const fontsReady = win.document.fonts ? win.document.fonts.ready : Promise.resolve()
  fontsReady.then(() => setTimeout(printOnce, 80))
  setTimeout(printOnce, 1500) // fallback if fonts.ready never resolves
  setTimeout(cleanup, 60000) // safety net if onafterprint never fires
}
