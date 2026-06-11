/**
 * Generates stable 1200×630 social/OG images for the suites listing and each room
 * into `public/og/`, so crawlers and link previews get a unique, cacheable image per
 * room page (the SPA + prerender reference these via `roomOgImagePath` / `SUITES_OG_IMAGE_PATH`).
 *
 *   node scripts/generate-og-images.mjs
 *
 * Runs in `npm run build` before `vite build` so the output is copied into `dist/`.
 * Dimensions must match `SEO_OG_IMAGE` (1200×630) declared in `src/config/site.js`.
 */
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteRoot = join(__dirname, '..')
const assetsDir = join(siteRoot, 'src/assets/suites')
const outDir = join(siteRoot, 'public/og')
const roomsOutDir = join(outDir, 'rooms')

const OG_WIDTH = 1200
const OG_HEIGHT = 630

/** Representative source photo per room (relative to `src/assets/suites`). */
const ROOM_SOURCES = {
  presidential: 'presidential/bedroom-wide-rattan-pendants.webp',
  family: 'family/bedroom-wide-orange-headboard.webp',
  junior: 'junior-partial-view/bedroom-wide-rattan-lights.webp',
  'standard-view-double': 'standard-view-double/bathroom-shower-green-tiles.webp',
  'standard-partial-double': 'junior-partial-view/bedroom-wide-rattan-lights.webp',
}

/** Hero image for the `/suites-rooms` listing card. */
const SUITES_SOURCE = 'presidential/bedroom-wide-rattan-pendants.webp'

async function writeOg(sourceRel, outPath) {
  const input = join(assetsDir, sourceRel)
  await sharp(input)
    .rotate()
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(outPath)
}

mkdirSync(roomsOutDir, { recursive: true })

await writeOg(SUITES_SOURCE, join(outDir, 'suites-rooms.jpg'))

let count = 0
for (const [slug, sourceRel] of Object.entries(ROOM_SOURCES)) {
  await writeOg(sourceRel, join(roomsOutDir, `${slug}.jpg`))
  count += 1
}

console.log(`Generated OG images: 1 listing + ${count} rooms → public/og (${OG_WIDTH}×${OG_HEIGHT})`)
