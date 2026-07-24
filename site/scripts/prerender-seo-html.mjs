/**
 * Writes route-specific `index.html` files under `dist/` so crawlers and link previews
 * receive unique title, description, canonical, social image, and JSON-LD before the SPA hydrates.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { SITE_ORIGIN_DEFAULT } from '../src/config/site.js'
import en from '../src/i18n/en.js'
import {
  ROOM_SEO_META,
  roomOgImagePath,
  SUITE_ROOM_SLUGS,
  SUITES_OG_IMAGE_PATH,
} from '../src/seo/roomMeta.js'
import { buildRouteJsonLd } from '../src/seo/structuredDataRoutes.js'

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

const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8')

const suitesCanonical = `${origin}/suites-rooms`
const suitesOgImage = `${origin}${SUITES_OG_IMAGE_PATH}`
const suitesHtml = patchHtml(baseHtml, {
  title: en.seo.titleSuites,
  description: en.seo.descriptionSuites,
  keywords: en.seo.keywordsSuites,
  canonical: suitesCanonical,
  ogImage: suitesOgImage,
  ogImageAlt: en.seo.titleSuites,
  jsonLd: buildRouteJsonLd({
    origin,
    pathname: '/suites-rooms',
    locale: 'en',
    title: en.seo.titleSuites,
    description: en.seo.descriptionSuites,
    ogImageUrl: suitesOgImage,
  }),
})

writeRouteHtml('suites-rooms', suitesHtml)

// Guardamar destination guide (linked from Moments → Costa Blanca).
writeRouteHtml(
  'moments/guardamar',
  patchHtml(baseHtml, {
    title: en.seo.titleGuardamar,
    description: en.seo.descriptionGuardamar,
    keywords: en.seo.keywordsGuardamar,
    canonical: `${origin}/moments/guardamar`,
  }),
)

for (const slug of SUITE_ROOM_SLUGS) {
  const copy = ROOM_SEO_META[slug]?.en
  if (!copy) continue
  const path = `/suites-rooms/${slug}`
  const canonical = `${origin}${path}`
  const ogImage = `${origin}${roomOgImagePath(slug)}`
  const jsonLd = buildRouteJsonLd({
    origin,
    pathname: path,
    locale: 'en',
    title: copy.title,
    description: copy.description,
    ogImageUrl: ogImage,
  })

  writeRouteHtml(`suites-rooms/${slug}`, patchHtml(baseHtml, {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    canonical,
    ogImage,
    ogImageAlt: copy.title,
    jsonLd,
  }))
}

console.log(
  `Prerendered SEO HTML for /suites-rooms and ${SUITE_ROOM_SLUGS.length} room pages (origin=${origin})`,
)
