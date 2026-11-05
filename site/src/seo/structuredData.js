/**
 * JSON-LD for the homepage HTML shell (crawlers). SPA route graphs live in `structuredDataRoutes.js`.
 */

import { BOOKING_URL, SEO_OG_IMAGE } from '../config/site.js'
import en from '../i18n/en.js'

const MAPS_QUERY = 'Puerto Rico, 11, 03140 Guardamar del Segura, Spain'

/** Approximate coordinates for the hotel address (Guardamar del Segura). */
const HOTEL_GEO = { latitude: 38.0893, longitude: -0.6545 }

/** "Daily · 8:00 – 00:00" → ['08:00', '00:00'] — hours are read from the site copy, not duplicated. */
function hoursIn(text) {
  return (text.match(/\d{1,2}:\d{2}/g) || []).map((h) => h.padStart(5, '0'))
}

const EVERY_DAY = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/** Opening hours for a "08:00 – 11:00"-style fact; `daily` only when the copy says so. */
function openingHours(name, value) {
  const [opens, closes] = hoursIn(value)
  if (!opens || !closes) return null
  return {
    '@type': 'OpeningHoursSpecification',
    name,
    opens,
    closes,
    ...(/daily/i.test(value) ? { dayOfWeek: EVERY_DAY } : {}),
  }
}

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Puerto Rico, 11',
  addressLocality: 'Guardamar del Segura',
  postalCode: '03140',
  addressRegion: 'Alicante',
  addressCountry: 'ES',
}

const amenity = (name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })

export function buildIndexJsonLdGraph({ origin, contact, seo }) {
  const hotelId = `${origin}/#hotel`
  const websiteId = `${origin}/#website`
  const ogImage = `${origin}${SEO_OG_IMAGE.path}`
  const logoUrl = `${origin}/logo.png`
  const homeUrl = `${origin}/`

  const restaurantId = `${origin}/restaurant-bar#restaurant`
  const dining = en.restaurant.facts
  const [checkinTime] = hoursIn(en.rules.facts.checkIn.value)
  const [checkoutTime] = hoursIn(en.rules.facts.checkOut.value)

  // The Google Maps place link identifies the hotel's Business Profile; the search URL is a fallback.
  const hasMap =
    contact.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`

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
        address: ADDRESS,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: HOTEL_GEO.latitude,
          longitude: HOTEL_GEO.longitude,
        },
        hasMap,
        numberOfRooms: 48,
        priceRange: '€€',
        checkinTime,
        checkoutTime,
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Credit card, Debit card',
        availableLanguage: ['English', 'Spanish'],
        amenityFeature: [
          amenity('Spa'),
          amenity('Heated swimming pool'),
          amenity('Restaurant'),
          amenity('Bar and terrace'),
          amenity('Breakfast'),
          amenity('Free WiFi'),
          amenity('24-hour reception'),
          amenity('Sea-view rooms'),
          amenity('Private balconies'),
          amenity('Luggage storage'),
          amenity('Electric vehicle charging (paid)'),
          amenity('Golf packages'),
        ],
        containsPlace: { '@id': restaurantId },
        potentialAction: {
          '@type': 'ReserveAction',
          target: { '@type': 'EntryPoint', urlTemplate: BOOKING_URL },
          result: { '@type': 'LodgingReservation', name: `Stay at ${contact.hotelName}` },
        },
        sameAs: [contact.instagramHref, contact.facebookHref].filter(Boolean),
      },
      {
        '@type': 'Restaurant',
        '@id': restaurantId,
        name: en.restaurant.title,
        description: en.restaurant.intro,
        url: `${origin}/restaurant-bar`,
        menu: `${origin}/menu`,
        servesCuisine: ['Mediterranean', 'Spanish'],
        acceptsReservations: true,
        telephone: contact.phoneHref.replace(/^tel:/i, ''),
        address: ADDRESS,
        containedInPlace: { '@id': hotelId },
        openingHoursSpecification: [
          openingHours(dining.breakfast.label, dining.breakfast.value),
          openingHours(dining.restaurant.label, dining.restaurant.value),
          openingHours(dining.bar.label, dining.bar.value),
        ].filter(Boolean),
      },
    ],
  }
}
