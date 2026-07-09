/**
 * Parse the daily-menu Google Sheet (fetched as CSV) into a bilingual menu object.
 *
 * Sheet layout (first tab, one header row — the site requests it with `headers=1`):
 *
 *   Section  | Type            | Selection | Item
 *   Header   | Date            |           | 09 July              ← the date (free text)
 *   Share    | To share        | 1         | Tropical salad       ← a course, one row per dish
 *   Starter  | First course    | 1         | Tomato soup
 *   Starter  | First course    | 1         | Julienne
 *   Main     | Main course     | 1         | Bolognese pasta
 *   Dessert  | Dessert         |           | Assorted desserts
 *   Included | Beverage        |           | 1 drink included     ← shown under "Included"
 *   Price    | Menu Price      |           | 18,00 € VAT incl.    ← shown as the price (free text)
 *
 *   • Section  — the stable row kind: Header/Date, Share, Starter, Main, Dessert, Included, Price
 *                (case-insensitive; anything unrecognised is treated as its own course).
 *   • Type     — the heading shown for a course (e.g. "Primer plato"). Ignored for Header/Included/Price.
 *   • Selection— how many dishes the guest picks from that course (blank = 1).
 *   • Item     — the guest-facing text (dish, date, included line, price string).
 *
 * Bilingual: add language columns to show different text per site language, e.g.
 *   `Item EN` / `Item ES`  and  `Type EN` / `Type ES`.
 * When a language column is missing, that language falls back to the plain `Item` / `Type`
 * column (so a Spanish-only sheet still works — English shows the same text). Nothing is ever
 * invented: only values present in the sheet are shown.
 *
 * Produces: { date:{en,es}, sections:[{ key, selection, title:{en,es}, items:[{en,es}] }],
 *             included:[{en,es}], price:{en,es}|null }
 */

/** Section-cell value → internal kind. */
const SECTION_KIND = {
  header: 'date',
  date: 'date',
  share: 'sharing',
  sharing: 'sharing',
  compartir: 'sharing',
  paracompartir: 'sharing',
  starter: 'starter',
  starters: 'starter',
  entrante: 'starter',
  entrantes: 'starter',
  primerplato: 'starter',
  first: 'starter',
  main: 'main',
  mains: 'main',
  principal: 'main',
  platoprincipal: 'main',
  second: 'main',
  dessert: 'dessert',
  desserts: 'dessert',
  postre: 'dessert',
  postres: 'dessert',
  included: 'included',
  include: 'included',
  incluido: 'included',
  beverage: 'included',
  price: 'price',
  precio: 'price',
}

const trim = (s) => (s == null ? '' : String(s).trim())
/** Normalise a token: lowercase, drop everything but a–z/0–9. */
const norm = (s) => trim(s).toLowerCase().replace(/[^a-z0-9]/g, '')
const has = (v) => Boolean(v && (v.en || v.es))

/** RFC-4180-ish CSV parser: handles quoted fields, escaped quotes, and CRLF/LF. */
export function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        field += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (c !== '\r') {
      field += c
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

export function buildMenu(rows) {
  const headerIdx = rows.findIndex((r) =>
    r.some((c) => ['section', 'item', 'selection'].includes(norm(c))),
  )
  if (headerIdx === -1) return null

  const header = rows[headerIdx].map(norm)
  const find = (...names) => {
    for (const n of names) {
      const i = header.indexOf(n)
      if (i !== -1) return i
    }
    return -1
  }
  const col = {
    section: find('section'),
    selection: find('selection'),
    type: find('type', 'title'),
    typeEn: find('typeen', 'titleen'),
    typeEs: find('typees', 'titlees'),
    item: find('item'),
    itemEn: find('itemen'),
    itemEs: find('itemes'),
  }
  const cell = (r, i) => (i >= 0 && i < r.length ? trim(r[i]) : '')

  /** Localized value for a field: prefer the language-specific column, else the base column. */
  const loc = (r, baseIdx, enIdx, esIdx) => {
    const base = cell(r, baseIdx)
    const en = (enIdx >= 0 && cell(r, enIdx)) || base
    const es = (esIdx >= 0 && cell(r, esIdx)) || base
    return { en, es }
  }

  const menu = { date: { en: '', es: '' }, sections: [], included: [], price: null }
  const byKind = new Map()

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i]
    const sectionKey = norm(cell(r, col.section))
    if (!sectionKey) continue

    const kind = SECTION_KIND[sectionKey] || sectionKey
    const item = loc(r, col.item, col.itemEn, col.itemEs)

    if (kind === 'date') {
      if (has(item)) menu.date = item
    } else if (kind === 'included') {
      if (has(item)) menu.included.push(item)
    } else if (kind === 'price') {
      if (has(item)) menu.price = item
    } else {
      let section = byKind.get(kind)
      if (!section) {
        const title = loc(r, col.type, col.typeEn, col.typeEs)
        section = { key: kind, selection: 1, title, items: [] }
        byKind.set(kind, section)
        menu.sections.push(section)
      }
      const sel = Number(cell(r, col.selection))
      if (Number.isFinite(sel) && sel > 0) section.selection = sel
      if (has(item)) section.items.push(item)
    }
  }

  menu.sections = menu.sections.filter((s) => s.items.length > 0)
  return menu
}

/** Convenience: CSV text → menu object (or null). */
export function parseMenuCsv(text) {
  return buildMenu(parseCsv(text))
}
