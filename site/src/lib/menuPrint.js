import logoSvg from '../assets/logo/dark/Guardamar_Vertical logotype.svg?raw'

/**
 * Build a clean, single-page A4 version of the daily menu and open the browser's
 * print dialog (from which the user can "Save as PDF"). Rendered into a hidden
 * iframe so it never disturbs the page, and self-contained (inline CSS + inline
 * logo SVG, system serif) so it prints reliably without waiting on network/fonts.
 *
 * The page is laid out to fill an A4 sheet exactly: logo at the top, the menu
 * vertically centred, the included/price line and hotel name pinned to the bottom.
 *
 * All strings are expected already localized. `sections` is `[{ title, items[] }]`.
 */
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c])

export function printMenu({ hotelName, dateLabel, sections = [], included = [], priceLabel, includeLabel }) {
  const sectionsHtml = sections
    .filter((s) => s.items.length > 0)
    .map(
      (s) => `<div class="sec">
        <h2>${esc(s.title)}</h2>
        <ul>${s.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
      </div>`,
    )
    .join('')

  const includedHtml = included.length
    ? `<div class="inc"><span class="lbl">${esc(includeLabel)}</span>${esc(included.join(' · '))}</div>`
    : ''
  const priceHtml = priceLabel ? `<div class="price">${esc(priceLabel)}</div>` : ''
  const footHtml = includedHtml || priceHtml ? `<div class="foot">${includedHtml}${priceHtml}</div>` : ''

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
    <title>${esc(hotelName)} — ${esc(dateLabel)}</title>
    <style>
      @page { size: A4 portrait; margin: 0; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body { font-family: Georgia, 'Times New Roman', serif; color: #171412;
             -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .page { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 20mm 22mm 16mm;
              display: flex; flex-direction: column; }
      .logo { text-align: center; }
      .logo svg { width: 62mm; height: auto; display: inline-block; }
      .logo svg path { fill: #171412; }
      .head { text-align: center; margin-top: 11mm; }
      .eyebrow { font-family: Arial, Helvetica, sans-serif; text-transform: uppercase;
                 letter-spacing: .3em; font-size: 10px; font-weight: 700; color: #6e361b; }
      .date { font-weight: 400; font-size: 34px; margin: 10px 0 0; letter-spacing: .3px; }
      .rule { width: 52px; height: 1px; background: #6e361b; margin: 15px auto 0; }
      .body { flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center;
              padding: 12mm 0; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 36px; row-gap: 22px; }
      .sec { break-inside: avoid; }
      .sec h2 { font-size: 19px; font-weight: 400; margin: 0 0 7px; padding-bottom: 6px;
                border-bottom: 1px solid rgba(23,20,18,.16); }
      .sec ul { list-style: none; margin: 0; padding: 0; }
      .sec li { font-family: Arial, Helvetica, sans-serif; font-weight: 300; font-size: 14px;
                color: #4a4642; line-height: 1.6; }
      .foot { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px;
              padding-top: 15px; border-top: 1px solid rgba(23,20,18,.16); }
      .inc { font-family: Arial, Helvetica, sans-serif; font-size: 12.5px; color: #4a4642; }
      .inc .lbl { display: block; text-transform: uppercase; letter-spacing: .18em; font-size: 9px;
                  font-weight: 700; color: #6e361b; margin-bottom: 3px; }
      .price { font-size: 25px; white-space: nowrap; }
      .brand { text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 9px;
               letter-spacing: .24em; text-transform: uppercase; color: #9a948e; margin-top: 9mm; }
    </style></head>
    <body><div class="page">
      <div class="logo">${logoSvg}</div>
      <div class="head">
        <div class="eyebrow">${esc(hotelName)}</div>
        <div class="date">${esc(dateLabel)}</div>
        <div class="rule"></div>
      </div>
      <div class="body"><div class="grid">${sectionsHtml}</div></div>
      ${footHtml}
      <div class="brand">${esc(hotelName)}</div>
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
  // Let the iframe lay out, then print. (Content is self-contained, so a short tick is enough.)
  setTimeout(() => {
    try {
      win.focus()
      win.print()
    } catch {
      cleanup()
    }
  }, 200)
  // Safety net if `onafterprint` never fires (some browsers).
  setTimeout(cleanup, 60000)
}
