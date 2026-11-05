/**
 * Build-time render entry (`vite build --ssr src/entry-server.jsx --outDir dist-ssr`), used by
 * scripts/prerender-seo-html.mjs to write each public route's real content into its HTML file.
 *
 * Most AI crawlers (ChatGPT, Claude, Perplexity) do not run JavaScript, so without this they see
 * an empty `<div id="root">`. The browser still mounts the app with `createRoot` (no hydration),
 * which replaces this markup — and on the server SplashGate renders its full-screen splash, so
 * visitors see the same splash they always did while the bundle loads.
 */
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { SEO_OG_IMAGE } from './config/site'
import { messages } from './i18n/messages'
import { resolvePageSeo } from './seo/resolvePageSeo'
import { buildRouteJsonLd } from './seo/structuredDataRoutes'

export { PUBLIC_ROUTES } from './seo/publicRoutes'

/** Prerendered pages are English, matching the default locale of a first visit. */
const LOCALE = 'en'

/** Same lookup as LanguageContext's `t` for one fixed locale (falls back to the key). */
function t(key) {
  let cur = messages[LOCALE]
  for (const part of key.split('.')) cur = cur?.[part]
  return cur ?? key
}

/** Renders `url` to HTML once every lazy route chunk has resolved. */
export function renderPage(url) {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString()
        done()
      },
      final(done) {
        resolve(html)
        done()
      },
    })

    const stream = renderToPipeableStream(<App Router={StaticRouter} routerProps={{ location: url }} />, {
      onAllReady() {
        stream.pipe(sink)
      },
      onShellError: reject,
      onError: reject,
    })
  })
}

/** `<head>` values for `url` — the same resolution MainLayout applies in the browser. */
export function pageHead(url, origin) {
  const { title, description, keywords, path, ogImagePath } = resolvePageSeo(url, LOCALE, t)
  const ogImage = ogImagePath ? `${origin}${ogImagePath}` : null
  return {
    title,
    description,
    keywords,
    canonical: `${origin}${path === '/' ? '/' : path}`,
    ogImage,
    ogImageAlt: ogImagePath ? title : SEO_OG_IMAGE.alt,
    jsonLd: buildRouteJsonLd({
      origin,
      pathname: path,
      locale: LOCALE,
      title,
      description,
      ogImageUrl: ogImage ?? `${origin}${SEO_OG_IMAGE.path}`,
    }),
  }
}
