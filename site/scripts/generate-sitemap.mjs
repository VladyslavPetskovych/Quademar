import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { LANDING_ONLY_NAV, SITE_ORIGIN_DEFAULT } from '../src/config/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteRoot = join(__dirname, '..')
const publicDir = join(siteRoot, 'public')

const env = loadEnv('production', siteRoot, '')
const origin = (env.VITE_SITE_ORIGIN || SITE_ORIGIN_DEFAULT).replace(/\/+$/, '')

/** All public SPA routes (used when `LANDING_ONLY_NAV` is false). */
const FULL_PATHS = [
  '/',
  '/contacts',
  '/suites-rooms',
  '/suites-rooms/presidential',
  '/suites-rooms/family',
  '/suites-rooms/junior',
  '/suites-rooms/standard-view-double',
  '/suites-rooms/standard-partial-double',
  '/restaurant-bar',
  '/spa',
  '/moments',
  '/moments/guardamar',
  '/rules',
  '/terms',
  '/privacy',
]

const LANDING_PATHS = FULL_PATHS.filter(
  (path) =>
    path === '/' ||
    path === '/contacts' ||
    path.startsWith('/moments') ||
    path === '/rules' ||
    path === '/terms' ||
    path === '/privacy' ||
    path.startsWith('/suites-rooms'),
)

const paths = LANDING_ONLY_NAV ? LANDING_PATHS : FULL_PATHS
const lastmod = new Date().toISOString().slice(0, 10)

function priority(path) {
  if (path === '/') return '1'
  if (path === '/suites-rooms') return '0.95'
  if (path === '/contacts') return '0.85'
  if (path.startsWith('/suites-rooms/')) return '0.75'
  return '0.82'
}

function changefreq(path) {
  if (path === '/' || path === '/suites-rooms' || path === '/moments') return 'weekly'
  return 'monthly'
}

function loc(path) {
  if (path === '/') return `${origin}/`
  return `${origin}${path}`
}

const body = paths
  .map(
    (p) => `  <url>
    <loc>${loc(p)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq(p)}</changefreq>
    <priority>${priority(p)}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

writeFileSync(join(publicDir, 'sitemap.xml'), xml)
console.log(
  `Wrote public/sitemap.xml (${paths.length} URLs, LANDING_ONLY_NAV=${LANDING_ONLY_NAV}, origin=${origin})`,
)
