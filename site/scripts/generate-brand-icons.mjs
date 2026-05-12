/**
 * Builds favicons, PWA icons, and favicon.svg from public/brand/logo-mark-source.png.
 * SERP / Open Graph preview uses the hand-maintained asset `public/og-image.png` (see `SEO_OG_IMAGE` in `src/config/site.js`).
 * Used for SEO / meta / bookmarks only — in-app header & menu use SVG wordmarks from src/assets.
 *
 * Run: npm run generate-icons
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const brandDir = path.join(root, 'public', 'brand')
const publicDir = path.join(root, 'public')

const SOURCE = path.join(brandDir, 'logo-mark-source.png')
const DISPLAY_GREEN = '#264d43'

function avgRgb(samples) {
  let r = 0
  let g = 0
  let b = 0
  for (const s of samples) {
    r += s.r
    g += s.g
    b += s.b
  }
  const n = samples.length || 1
  return { r: Math.round(r / n), g: Math.round(g / n), b: Math.round(b / n) }
}

async function sampleCornerRgb(imgPath, x, y) {
  const { data } = await sharp(imgPath).extract({ left: x, top: y, width: 1, height: 1 }).raw().toBuffer({
    resolveWithObject: true,
  })
  return { r: data[0], g: data[1], b: data[2] }
}

async function detectBackgroundRgb(imgPath) {
  const meta = await sharp(imgPath).metadata()
  const w = meta.width || 320
  const h = meta.height || 320
  const inset = 2
  const corners = await Promise.all([
    sampleCornerRgb(imgPath, inset, inset),
    sampleCornerRgb(imgPath, Math.max(0, w - 1 - inset), inset),
    sampleCornerRgb(imgPath, inset, Math.max(0, h - 1 - inset)),
    sampleCornerRgb(imgPath, Math.max(0, w - 1 - inset), Math.max(0, h - 1 - inset)),
  ])
  return avgRgb(corners)
}

async function chromakeyApproxGreen(inputPath, outputPath, rgb, tolerance = 52) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const dr = r - rgb.r
    const dg = g - rgb.g
    const db = b - rgb.b
    const dist = Math.sqrt(dr * dr + dg * dg + db * db)
    if (dist <= tolerance) data[i + 3] = 0
  }
  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toFile(outputPath)
}

async function compositeOnSquare(transparentPath, size, outPath, bgHex) {
  const inner = Math.round(size * 0.62)
  const buf = await sharp(transparentPath).resize(inner, inner, { fit: 'inside' }).png().toBuffer()
  await sharp({
    create: { width: size, height: size, channels: 3, background: bgHex },
  })
    .composite([{ input: buf, gravity: 'center' }])
    .png()
    .toFile(outPath)
}

async function writeDataSvgFromSquarePng(squarePngPath, outSvgPath) {
  const b64 = fs.readFileSync(squarePngPath).toString('base64')
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" role="img" aria-label="Guardamar">
  <image width="32" height="32" href="data:image/png;base64,${b64}" preserveAspectRatio="xMidYMid meet"/>
</svg>`
  fs.writeFileSync(outSvgPath, svg, 'utf8')
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('Missing source:', SOURCE)
    process.exit(1)
  }

  fs.mkdirSync(brandDir, { recursive: true })

  const bgRgb = await detectBackgroundRgb(SOURCE)
  console.log('Detected logo background RGB:', bgRgb)

  const transparentPath = path.join(brandDir, 'logo-mark-transparent.png')
  await chromakeyApproxGreen(SOURCE, transparentPath, bgRgb)

  await sharp(SOURCE).resize({ height: 160 }).png().toFile(path.join(brandDir, 'logo-mark-green-bg.png'))

  const sizes = [
    ['favicon-16.png', 16],
    ['favicon-32.png', 32],
    ['apple-touch-icon.png', 180],
    ['android-chrome-192x192.png', 192],
    ['android-chrome-512x512.png', 512],
  ]

  for (const [name, dim] of sizes) {
    await compositeOnSquare(transparentPath, dim, path.join(publicDir, name), DISPLAY_GREEN)
  }

  const fav16 = path.join(publicDir, 'favicon-16.png')
  const fav32 = path.join(publicDir, 'favicon-32.png')
  const icoBuf = await pngToIco([fav16, fav32])
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf)

  await writeDataSvgFromSquarePng(fav32, path.join(publicDir, 'favicon.svg'))

  const splashSrc = path.join(publicDir, 'splash-brand.png')
  const splashLogoTransparent = path.join(publicDir, 'splash-logo-transparent.png')
  if (fs.existsSync(splashSrc)) {
    const splashBgRgb = await detectBackgroundRgb(splashSrc)
    console.log('Splash artwork background RGB:', splashBgRgb)
    await chromakeyApproxGreen(splashSrc, splashLogoTransparent, splashBgRgb, 64)
    console.log('Wrote splash logo (transparent):', splashLogoTransparent)
  }

  console.log('Brand assets generated in public/ and public/brand/')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
