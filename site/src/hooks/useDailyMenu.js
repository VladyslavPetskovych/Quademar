import { useEffect, useState } from 'react'
import { MENU_SHEET_CSV_URL } from '../config/site'
import { parseMenuCsv } from '../lib/menuSheet'

/**
 * Fetch the daily menu from the public Google Sheet (CSV) at runtime and parse it.
 * The sheet is the single source of truth — there is no placeholder data, so the page only
 * ever shows lines that exist in the file. Google serves the CSV with `no-store`, so every
 * visit reads the current sheet (the load is on Google, not our server).
 *
 * Returns `{ menu, status }`:
 *   status 'loading' → request in flight
 *          'ready'   → menu has at least one course (render it)
 *          'empty'   → sheet reachable but has no menu rows
 *          'error'   → sheet could not be read
 */
export function useDailyMenu() {
  const [menu, setMenu] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const res = await fetch(MENU_SHEET_CSV_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const parsed = parseMenuCsv(await res.text())
        if (parsed && parsed.sections.length > 0) {
          setMenu(parsed)
          setStatus('ready')
        } else {
          setMenu(null)
          setStatus('empty')
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Daily menu: could not read the sheet —', err.message)
          setStatus('error')
        }
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return { menu, status }
}
