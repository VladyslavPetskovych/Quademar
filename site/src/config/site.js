/**
 * Guardamar Hotel & Spa — Site configuration
 * Reference location: Guardamar del Segura, Costa Blanca
 */

/**
 * Landing-only deploy: Home, Contacts, Moments, and Suites & Rooms (listing + room pages)
 * stay navigable; other routes remain in the bundle but redirect to `/` and locked nav links
 * open the coming-soon pattern. Set to `false` when publishing the full site.
 * `npm run build` regenerates `public/sitemap.xml` from this flag (see `scripts/generate-sitemap.mjs`).
 */
export const LANDING_ONLY_NAV = true

/** Exact paths allowed in landing mode (no trailing slash). */
const LANDING_ALLOWED = new Set(['/', '/contacts', '/moments', '/rules', '/terms', '/privacy', '/suites-rooms'])

/** Nav link ids that stay real links in landing mode (matches `NAV_LINKS` ids). */
export const LANDING_UNLOCKED_NAV_IDS = new Set(['about', 'contacts', 'moments', 'rules', 'terms', 'privacy', 'suites-rooms'])

/** Whether `pathname` may render (otherwise caller should redirect to `/`). */
export function isPathAllowedInLandingMode(pathname) {
  if (!LANDING_ONLY_NAV) return true
  const p = pathname.replace(/\/+$/, '') || '/'
  if (LANDING_ALLOWED.has(p)) return true
  if (p.startsWith('/suites-rooms/')) return true
  return false
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
    'Four-star boutique hotel and spa in Guardamar del Segura, Alicante. Sea-near suites, garden dining, and a calm Costa Blanca base between Alicante and the Mediterranean — book your stay.',
  keywords:
    'Hotel Guardamar, Guardamar del Segura, Costa Blanca, Alicante, Spain, boutique hotel, spa hotel, suites, Mediterranean hotel, hotel Alicante',
}

/**
 * Open Graph / Twitter SERP preview image (`public/og-image.png`).
 * If you replace the file, update `width` / `height` to match its pixel dimensions.
 */
export const SEO_OG_IMAGE = {
  path: '/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Balcony view from Hotel Guardamar over Guardamar del Segura and the Mediterranean on the Costa Blanca.',
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

/** RoomCloud booking engine — Guardamar hotel (hotel id 22638). */
export const BOOKING_URL =
  'https://booking.roomcloud.net/be/se2/hotel.jsp?hotel=22638'

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
