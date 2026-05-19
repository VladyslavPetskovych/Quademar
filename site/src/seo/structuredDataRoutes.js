/**
 * Route-specific JSON-LD for suites listing and room detail pages.
 */

import { getRoomSeoCopy, getRoomSeoMeta, SUITE_ROOM_SLUGS } from './roomMeta.js'

function hotelRef(origin) {
  return { '@id': `${origin}/#hotel` }
}

function roomOccupancy(meta) {
  const n = meta?.capacity
  if (!Number.isFinite(n) || n < 1) return undefined
  return {
    '@type': 'QuantitativeValue',
    maxValue: n,
    unitCode: 'C62',
  }
}

function roomFloorSize(meta) {
  const m2 = meta?.areaM2
  if (!m2) return undefined
  return {
    '@type': 'QuantitativeValue',
    value: m2,
    unitCode: 'MTK',
    unitText: 'm²',
  }
}

/** BreadcrumbList for a room detail page. */
export function buildRoomBreadcrumbJsonLd({ origin, roomTitle, roomPath }) {
  const home = `${origin}/`
  const listing = `${origin}/suites-rooms`
  const roomUrl = `${origin}${roomPath}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: home },
      { '@type': 'ListItem', position: 2, name: 'Suites & Rooms', item: listing },
      { '@type': 'ListItem', position: 3, name: roomTitle, item: roomUrl },
    ],
  }
}

/** HotelRoom / Suite entity for a single accommodation page. */
export function buildRoomDetailJsonLd({ origin, slug, roomTitle, description, imageUrl }) {
  const meta = getRoomSeoMeta(slug)
  const roomUrl = `${origin}/suites-rooms/${slug}`
  const roomId = `${roomUrl}#room`

  return {
    '@context': 'https://schema.org',
    '@type': meta?.schemaType ?? 'HotelRoom',
    '@id': roomId,
    name: roomTitle,
    description,
    url: roomUrl,
    image: imageUrl ? [imageUrl] : undefined,
    containedInPlace: hotelRef(origin),
    occupancy: meta ? roomOccupancy(meta) : undefined,
    floorSize: meta ? roomFloorSize(meta) : undefined,
    numberOfRooms: meta?.quantity ?? 1,
  }
}

/** ItemList of all bookable room types on `/suites-rooms`. */
export function buildSuitesListingJsonLd({ origin, locale = 'en' }) {
  const listingUrl = `${origin}/suites-rooms`
  const lang = locale === 'es' ? 'es' : 'en'

  const itemListElement = SUITE_ROOM_SLUGS.map((slug, index) => {
    const seo = getRoomSeoCopy(slug, lang)
    const name = seo?.title?.split(' — ')[0] ?? slug
    return {
      '@type': 'ListItem',
      position: index + 1,
      name,
      url: `${origin}/suites-rooms/${slug}`,
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Suites & Rooms at Hotel Guardamar',
    url: listingUrl,
    numberOfItems: itemListElement.length,
    itemListElement,
  }
}

/** JSON-LD graph(s) for the current SPA route (suites listing or room detail). */
export function buildRouteJsonLd({ origin, pathname, locale, title, description, ogImageUrl }) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/suites-rooms') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildSuitesListingJsonLd({ origin, locale }),
        {
          '@type': 'WebPage',
          '@id': `${origin}/suites-rooms#webpage`,
          url: `${origin}/suites-rooms`,
          name: title,
          description,
          isPartOf: { '@id': `${origin}/#website` },
          about: hotelRef(origin),
        },
      ],
    }
  }

  if (path.startsWith('/suites-rooms/')) {
    const slug = path.slice('/suites-rooms/'.length).split('/')[0]
    if (!slug || !getRoomSeoMeta(slug)) return null

    const roomTitle = title.split(' — ')[0] || title
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildRoomBreadcrumbJsonLd({ origin, roomTitle, path }),
        buildRoomDetailJsonLd({
          origin,
          slug,
          roomTitle,
          description,
          imageUrl: ogImageUrl,
        }),
        {
          '@type': 'WebPage',
          '@id': `${origin}${path}#webpage`,
          url: `${origin}${path}`,
          name: title,
          description,
          isPartOf: { '@id': `${origin}/#website` },
          about: { '@id': `${origin}/suites-rooms/${slug}#room` },
        },
      ],
    }
  }

  return null
}
