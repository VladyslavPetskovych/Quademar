/**
 * One-time (re-runnable) optimizer: converts raster photos under src/assets to WebP,
 * capping the long edge at MAX_EDGE (browsers never need the 4–6K originals).
 * Alpha images keep transparency. Originals are replaced — recover via git if needed.
 *
 *   node scripts/optimize-images.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const MAX_EDGE = 2048
const QUALITY = 80
const QUALITY_ALPHA = 85

/** Background texture — allowed to be much smaller/softer than photos. */
const TEXTURES = new Set(['src/assets/footer/footer_texture.jpg'])

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p)
  }
  return out
}

let before = 0
let after = 0
for (const file of walk('src/assets')) {
  const rel = file.split(path.sep).join('/')
  const meta = await sharp(file).metadata()
  const isTexture = TEXTURES.has(rel)
  const outPath = file.replace(/\.(png|jpe?g)$/i, '.webp')

  let pipeline = sharp(file).rotate()
  const cap = isTexture ? 1920 : MAX_EDGE
  if (Math.max(meta.width, meta.height) > cap) {
    pipeline = pipeline.resize(cap, cap, { fit: 'inside', withoutEnlargement: true })
  }
  pipeline = pipeline.webp({
    quality: isTexture ? 64 : meta.hasAlpha ? QUALITY_ALPHA : QUALITY,
    effort: 6,
    smartSubsample: true,
  })

  await pipeline.toFile(outPath)
  const inSize = fs.statSync(file).size
  const outSize = fs.statSync(outPath).size
  before += inSize
  after += outSize
  fs.unlinkSync(file)
  console.log(
    `${rel} ${(inSize / 1024).toFixed(0)}KB -> ${path.basename(outPath)} ${(outSize / 1024).toFixed(0)}KB`,
  )
}

console.log(
  `\nTotal: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`,
)
