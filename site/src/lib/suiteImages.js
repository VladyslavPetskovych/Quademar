import MANIFEST from '../generated/suiteImages.js'

/**
 * Optimized suite imagery (see scripts/optimize-suite-images.mjs).
 * `MANIFEST` is keyed by the source-relative path, e.g. `presidential/IMG_0543.JPG`.
 */
const BY_SRC = new Map(Object.values(MANIFEST).map((entry) => [entry.src, entry]))

/** Optimized WebP URL for a source path; falls back to the key if the manifest is stale. */
export function suiteSrc(key) {
  const entry = MANIFEST[key]
  if (!entry) {
    if (import.meta.env?.DEV) {
      console.warn(`[suiteImages] no optimized entry for "${key}" — run npm run optimize-images`)
    }
    return key
  }
  return entry.src
}

/** Blur placeholder + intrinsic dimensions for an optimized src (or null if unknown). */
export function suiteMeta(src) {
  return BY_SRC.get(src) ?? null
}
