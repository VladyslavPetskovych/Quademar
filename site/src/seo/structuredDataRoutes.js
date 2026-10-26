/**
 * Route-specific JSON-LD for suites listing and room detail pages.
 */

import { BOOKING_URL } from '../config/site.js'
import {
  getRoomSeoCopy,
  getRoomSeoMeta,
  roomOgImagePath,
  SUITE_ROOM_SLUGS,
} from './roomMeta.js'

const LISTING_DESC_MAX = 155

function hotelRef(origin) {
  return { '@id': `${origin}/#hotel` }
}

function shorten(text, max = LISTING_DESC_MAX) {
  const s = (text || '').replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > max * 0.55 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`
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

function roomBedDetails(meta) {
  const beds = Array.isArray(meta?.beds) ? meta.beds : []
  if (!beds.length) return undefined
  return beds.map((b) => ({
    '@type': 'BedDetails',
    typeOfBed: b.type,
    numberOfBeds: b.count ?? 1,
  }))
}

function roomAmenityFeatures(meta) {
  const list = Array.isArray(meta?.amenities) ? meta.amenities : []
  if (!list.length) return undefined
  return list.map((name) => ({
    '@type': 'LocationFeatureSpecification',
    name,
    value: true,
  }))
}

/** ReserveAction wiring the room to the booking engine. */
function roomReserveAction({ roomUrl, roomTitle }) {
  return {
    '@type': 'ReserveAction',
    name: `Book the ${roomTitle}`,
    target: {
      '@type': 'EntryPoint',
      urlTemplate: BOOKING_URL,
      inLanguage: ['en', 'es'],
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    result: {
      '@type': 'LodgingReservation',
      name: `${roomTitle} reservation`,
    },
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
    bed: meta ? roomBedDetails(meta) : undefined,
    amenityFeature: meta ? roomAmenityFeatures(meta) : undefined,
    numberOfRooms: meta?.quantity ?? 1,
    potentialAction: roomReserveAction({ roomUrl, roomTitle }),
  }
}

/** ItemList of all bookable room types on `/suites-rooms`. */
export function buildSuitesListingJsonLd({ origin, locale = 'en' }) {
  const listingUrl = `${origin}/suites-rooms`
  const lang = locale === 'es' ? 'es' : 'en'

  const itemListElement = SUITE_ROOM_SLUGS.map((slug, index) => {
    const meta = getRoomSeoMeta(slug)
    const seo = getRoomSeoCopy(slug, lang)
    const name = seo?.title?.split(' — ')[0] ?? slug
    const roomUrl = `${origin}/suites-rooms/${slug}`
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': meta?.schemaType ?? 'HotelRoom',
        '@id': `${roomUrl}#room`,
        name,
        description: shorten(seo?.description),
        url: roomUrl,
        image: `${origin}${roomOgImagePath(slug)}`,
      },
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Suites & Rooms at Hotel Guardamar',
    description:
      'All suite and room categories at Hotel Guardamar in Guardamar del Segura, Costa Blanca.',
    url: listingUrl,
    numberOfItems: itemListElement.length,
    itemListElement,
  }
}

/** BreadcrumbList + WebPage for the golf escape page (Home › Moments › Golf). */
function buildGolfJsonLd({ origin, locale, title, description, ogImageUrl }) {
  const url = `${origin}/moments/golf`
  const es = locale === 'es'
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: es ? 'Inicio' : 'Home', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: es ? 'Momentos' : 'Moments', item: `${origin}/moments` },
          { '@type': 'ListItem', position: 3, name: 'Golf', item: url },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: es ? 'es' : 'en',
        isPartOf: { '@id': `${origin}/#website` },
        about: hotelRef(origin),
        breadcrumb: { '@id': `${url}#breadcrumb` },
        primaryImageOfPage: ogImageUrl ? { '@type': 'ImageObject', url: ogImageUrl } : undefined,
      },
    ],
  }
}

/** JSON-LD graph(s) for the current SPA route (suites listing, room detail, or golf). */
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
          primaryImageOfPage: ogImageUrl ? { '@type': 'ImageObject', url: ogImageUrl } : undefined,
        },
      ],
    }
  }

  if (path === '/moments/golf') {
    return buildGolfJsonLd({ origin, locale, title, description, ogImageUrl })
  }

  if (path.startsWith('/suites-rooms/')) {
    const slug = path.slice('/suites-rooms/'.length).split('/')[0]
    if (!slug || !getRoomSeoMeta(slug)) return null

    const roomTitle = title.split(' — ')[0] || title
    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildRoomBreadcrumbJsonLd({ origin, roomTitle, roomPath: path }),
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
          primaryImageOfPage: ogImageUrl ? { '@type': 'ImageObject', url: ogImageUrl } : undefined,
        },
      ],
    }
  }

  return null
}
