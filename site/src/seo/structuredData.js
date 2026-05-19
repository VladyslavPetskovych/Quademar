/**
 * JSON-LD for the homepage HTML shell (crawlers). SPA route graphs live in `structuredDataRoutes.js`.
 */

import { SEO_OG_IMAGE } from '../config/site.js'

const MAPS_QUERY = 'Puerto Rico, 11, 03140 Guardamar del Segura, Spain'

/** Approximate coordinates for the hotel address (Guardamar del Segura). */
const HOTEL_GEO = { latitude: 38.0893, longitude: -0.6545 }

export function buildIndexJsonLdGraph({ origin, contact, seo }) {
  const hotelId = `${origin}/#hotel`
  const websiteId = `${origin}/#website`
  const ogImage = `${origin}${SEO_OG_IMAGE.path}`
  const logoUrl = `${origin}/logo.png`
  const homeUrl = `${origin}/`

  const hasMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: homeUrl,
        name: contact.hotelName,
        description: seo.description,
        inLanguage: ['en-GB', 'es-ES'],
        publisher: { '@id': hotelId },
      },
      {
        '@type': 'Hotel',
        '@id': hotelId,
        name: contact.hotelName,
        description: seo.description,
        url: homeUrl,
        image: [ogImage, logoUrl],
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
          width: 512,
          height: 512,
        },
        telephone: contact.phoneHref.replace(/^tel:/i, ''),
        email: contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Puerto Rico, 11',
          addressLocality: 'Guardamar del Segura',
          postalCode: '03140',
          addressRegion: 'Alicante',
          addressCountry: 'ES',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: HOTEL_GEO.latitude,
          longitude: HOTEL_GEO.longitude,
        },
        hasMap,
        numberOfRooms: 48,
        priceRange: '€€',
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Spa', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
        ],
        sameAs: [contact.instagramHref],
      },
    ],
  }
}
