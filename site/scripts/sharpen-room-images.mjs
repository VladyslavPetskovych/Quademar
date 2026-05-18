/**
 * Mild sharpen for suite photos (no resize). PNG stays lossless; use on high-res sources.
 * Pasted chat images are often ~768–1024px — sharpening cannot add detail, only boost edges.
 *
 *   node scripts/sharpen-room-images.mjs
 *   node scripts/sharpen-room-images.mjs src/assets/suites/presidential
 */
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const defaultDir = path.join(__dirname, '../src/assets/suites/presidential')
const targetDir = path.resolve(process.argv[2] ?? defaultDir)

const files = (await fs.readdir(targetDir)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))

if (!files.length) {
  console.error(`No images in ${targetDir}`)
  process.exit(1)
}

for (const file of files) {
  const input = path.join(targetDir, file)
  const tmp = `${input}.tmp`
  const pipeline = sharp(input).rotate()

  if (/\.png$/i.test(file)) {
    await pipeline
      .sharpen({ sigma: 0.55, m1: 0.45, m2: 0.35, x1: 2, y2: 10, y3: 20 })
      .png({ compressionLevel: 9, effort: 10, palette: false })
      .toFile(tmp)
  } else if (/\.jpe?g$/i.test(file)) {
    await pipeline
      .sharpen({ sigma: 0.85, m1: 0.6, m2: 0.4, x1: 2, y2: 10, y3: 20 })
      .jpeg({ quality: 98, mozjpeg: true })
      .toFile(tmp)
  } else {
    await pipeline
      .sharpen({ sigma: 0.85, m1: 0.6, m2: 0.4, x1: 2, y2: 10, y3: 20 })
      .webp({ lossless: true })
      .toFile(tmp)
  }

  await fs.rename(tmp, input)
  const { width, height } = await sharp(input).metadata()
  const { size } = await fs.stat(input)
  console.log(`${file} → ${width}×${height}, ${Math.round(size / 1024)} KB`)
}

console.log(`Done: ${files.length} image(s) in ${targetDir}`)
