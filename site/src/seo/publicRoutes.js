/**
 * Every indexable route, in sitemap order. Shared by the sitemap, the build-time prerender, and
 * (via the same landing check) the router, so all three always agree on which pages exist.
 */
import { isPathAllowedInLandingMode } from '../config/site.js'
import { SUITE_ROOM_SLUGS } from './roomMeta.js'

export const ALL_ROUTES = [
  '/',
  '/contacts',
  '/suites-rooms',
  ...SUITE_ROOM_SLUGS.map((slug) => `/suites-rooms/${slug}`),
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

/** Routes that render in the current deploy (pages locked in landing mode redirect to `/`). */
export const PUBLIC_ROUTES = ALL_ROUTES.filter(isPathAllowedInLandingMode)
