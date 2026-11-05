/**
 * Writes an `index.html` under `dist/` for every public route, with that page's real content
 * rendered into `<div id="root">` plus its own title, description, canonical, social image, and
 * JSON-LD. Crawlers and AI assistants that don't run JavaScript read the page as visitors see it.
 *
 * Renders with the SSR bundle from `vite build --ssr src/entry-server.jsx --outDir dist-ssr`
 * (see `npm run build`); head values come from the same `resolvePageSeo` the app uses.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'
import { SITE_ORIGIN_DEFAULT } from '../src/config/site.js'

// Production React: no dev-only warnings, faster render.
process.env.NODE_ENV = 'production'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteRoot = join(__dirname, '..')
const distDir = join(siteRoot, 'dist')
const env = loadEnv('production', siteRoot, '')
const origin = (env.VITE_SITE_ORIGIN || SITE_ORIGIN_DEFAULT).replace(/\/+$/, '')

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`, 'i')
  return html.replace(re, `$1${escapeHtml(value)}$2`)
}

function replaceTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
}

function replaceCanonical(html, href) {
  return html.replace(
    /(<link rel="canonical" href=")[^"]*(")/i,
    `$1${escapeHtml(href)}$2`,
  )
}

function injectRouteJsonLd(html, jsonLd) {
  const script = `<script id="guardamar-seo-jsonld" type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
  const withoutRoute = html.replace(
    /\s*<script id="guardamar-seo-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    '',
  )
  return withoutRoute.replace('</head>', `\n    ${script}\n  </head>`)
}

function patchHtml(html, { title, description, keywords, canonical, ogImage, ogImageAlt, jsonLd }) {
  let out = replaceTitle(html, title)
  out = replaceMeta(out, 'name', 'description', description)
  out = replaceMeta(out, 'name', 'keywords', keywords)
  out = replaceMeta(out, 'name', 'twitter:title', title)
  out = replaceMeta(out, 'name', 'twitter:description', description)
  out = replaceMeta(out, 'property', 'og:title', title)
  out = replaceMeta(out, 'property', 'og:description', description)
  out = replaceMeta(out, 'property', 'og:url', canonical)
  if (ogImage) {
    out = replaceMeta(out, 'property', 'og:image', ogImage)
    out = replaceMeta(out, 'name', 'twitter:image', ogImage)
  }
  if (ogImageAlt) out = replaceMeta(out, 'property', 'og:image:alt', ogImageAlt)
  out = replaceCanonical(out, canonical)
  if (jsonLd) out = injectRouteJsonLd(out, jsonLd)
  return out
}

function writeRouteHtml(relativeDir, html) {
  const dir = join(distDir, relativeDir)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html, 'utf8')
}

const { renderPage, pageHead, PUBLIC_ROUTES } = await import(
  pathToFileURL(join(siteRoot, 'dist-ssr/entry-server.js')).href
)

const ROOT_EMPTY = '<div id="root"></div>'
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8')
if (!baseHtml.includes(ROOT_EMPTY)) throw new Error(`dist/index.html has no ${ROOT_EMPTY}`)

// Every public route gets its own file — including `/moments`: its sub-routes create
// `dist/moments/`, and without an index.html there nginx would answer `/moments` with 403.
for (const path of PUBLIC_ROUTES) {
  const body = await renderPage(path)
  const html = patchHtml(baseHtml, pageHead(path, origin)).replace(ROOT_EMPTY, `<div id="root">${body}</div>`)
  writeRouteHtml(path === '/' ? '' : path.slice(1), html)
}

console.log(`Prerendered ${PUBLIC_ROUTES.length} routes with content and SEO head (origin=${origin})`)
