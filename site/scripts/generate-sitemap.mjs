import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { isPathAllowedInLandingMode, SITE_ORIGIN_DEFAULT } from '../src/config/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteRoot = join(__dirname, '..')
const publicDir = join(siteRoot, 'public')

const env = loadEnv('production', siteRoot, '')
const origin = (env.VITE_SITE_ORIGIN || SITE_ORIGIN_DEFAULT).replace(/\/+$/, '')

/** All public SPA routes; filtered below by landing mode. */
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
  '/menu',
  '/spa',
  '/moments',
  '/moments/guardamar',
  '/moments/golf',
  '/rules',
  '/terms',
  '/privacy',
]

// Same check the router uses, so the sitemap lists exactly the pages that render
// (pages locked in landing mode redirect to `/` and are left out).
const paths = FULL_PATHS.filter(isPathAllowedInLandingMode)
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
  `Wrote public/sitemap.xml (${paths.length} URLs, origin=${origin})`,
)
