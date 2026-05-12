/**
 * Guardamar Hotel & Spa — Site configuration
 * Reference location: Guardamar del Segura, Costa Blanca
 */

/**
 * Landing-only deploy: Home, Contacts, and Moments stay navigable; other routes remain in the
 * bundle but direct URLs redirect to `/` and header/menu/footer links are inactive.
 * Set to `false` when publishing the full site.
 * `npm run build` regenerates `public/sitemap.xml` from this flag (see `scripts/generate-sitemap.mjs`).
 */
export const LANDING_ONLY_NAV = true

/** Paths users may open when `LANDING_ONLY_NAV` is on (leading slash, no trailing slash). */
const LANDING_ALLOWED = new Set(['/', '/contacts', '/moments'])

/** Whether `pathname` may render (otherwise caller should redirect to `/`). */
export function isPathAllowedInLandingMode(pathname) {
  if (!LANDING_ONLY_NAV) return true
  const p = pathname.replace(/\/+$/, '') || '/'
  return LANDING_ALLOWED.has(p)
}

/** Canonical live site (HTTPS, no trailing slash). Override with `VITE_SITE_ORIGIN` if needed. */
export const SITE_ORIGIN_DEFAULT = 'https://guardamarhotelspa.com'

export const SITE = {
  name: 'Guardamar',
  fullName: 'Guardamar',
  tagline: 'HOTEL',
  location: 'Guardamar del Segura',
  country: 'Spain',
  region: 'Costa Blanca',
}

/** Browser `<title>`, meta, and social cards — mirrored in `index.html` for crawlers. */
export const SEO = {
  title: 'Hotel Guardamar — Mediterranean sanctuary on Costa Blanca',
  description:
    'Boutique hotel & spa in Guardamar del Segura, Alicante — your Mediterranean sanctuary on Costa Blanca. Elegant suites, spa, dining, and authentic Spanish hospitality.',
  keywords:
    'Hotel Guardamar, Guardamar del Segura, Costa Blanca, Alicante, Spain, boutique hotel, spa hotel, suites, Mediterranean hotel, hotel Alicante',
}

export const NAV_LINKS = [
  { id: 'about', path: '/' },
  { id: 'suites-rooms', path: '/suites-rooms' },
  { id: 'restaurant-bar', path: '/restaurant-bar' },
  { id: 'spa', path: '/spa' },
  { id: 'moments', path: '/moments' },
  { id: 'contacts', path: '/contacts' },
]

export const HERO = {
  subtitle: 'Guardamar — 4 star hotel on the Costa Blanca.',
  kicker: 'Experience the light, sea breeze, and calm rhythm of Guardamar del Segura.',
}

/** Hotel Guardamar — official contact. */
export const CONTACT = {
  hotelName: 'Hotel Guardamar',
  addressLines: ['Puerto Rico, 11 - 03140 Guardamar del Segura Alicante ESPAÑA'],
  phoneDisplay: '+34 965 729 650',
  phoneHref: 'tel:+34965729650',
  email: 'info@hotelguardamar.com',
  emailHref: 'mailto:info@hotelguardamar.com',
  instagramHref: 'https://www.instagram.com/hotelguardamar/',
}
