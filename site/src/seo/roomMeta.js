/**
 * Search-focused copy and facts per room (EN + ES).
 * Used by `resolvePageSeo`, JSON-LD, and build-time HTML prerender.
 * Detail URLs: `/suites-rooms/{id}`.
 */
export const ROOM_SEO_META = {
  presidential: {
    schemaType: 'Suite',
    capacity: 4,
    areaM2: 40,
    quantity: 4,
    en: {
      title: 'Presidential Suite with Sea Views — Hotel Guardamar',
      description:
        'Book the Presidential Suite at Hotel Guardamar, Guardamar del Segura — private terrace hydromassage tub, sea views, up to 4 guests, 40 m², luxury bathroom on the Costa Blanca.',
      keywords:
        'Presidential suite Guardamar, sea view suite Costa Blanca, hydromassage suite Alicante, Hotel Guardamar presidential, luxury suite Guardamar del Segura',
    },
    es: {
      title: 'Suite Presidencial con vistas al mar — Hotel Guardamar',
      description:
        'Reserve la Suite Presidencial en Hotel Guardamar, Guardamar del Segura — terraza con bañera de hidromasaje privada, vistas al mar, hasta 4 huéspedes, 40 m², baño de lujo en la Costa Blanca.',
      keywords:
        'suite presidencial Guardamar, suite vistas al mar Costa Blanca, hidromasaje suite Alicante, Hotel Guardamar presidencial, suite lujo Guardamar del Segura',
    },
  },
  family: {
    schemaType: 'Suite',
    capacity: 4,
    areaM2: 20,
    quantity: 4,
    en: {
      title: 'Family Suite — Hotel Guardamar | Guardamar del Segura',
      description:
        'Spacious Family Suite at Hotel Guardamar for up to 4 guests — connecting comfort, Mediterranean décor, premium amenities, and easy access to pool and dining in Guardamar del Segura.',
      keywords:
        'family suite Guardamar, family hotel room Costa Blanca, Hotel Guardamar family suite, rooms for families Alicante, Guardamar del Segura family stay',
    },
    es: {
      title: 'Suite Familiar — Hotel Guardamar | Guardamar del Segura',
      description:
        'Amplia Suite Familiar en Hotel Guardamar para hasta 4 huéspedes — confort comunicado, decoración mediterránea, amenities premium y acceso a piscina y restaurante en Guardamar del Segura.',
      keywords:
        'suite familiar Guardamar, habitación familiar Costa Blanca, Hotel Guardamar suite familiar, alojamiento familias Alicante, estancia familiar Guardamar del Segura',
    },
  },
  junior: {
    schemaType: 'Suite',
    capacity: 3,
    areaM2: 20,
    quantity: 4,
    en: {
      title: 'Junior Suite with Partial Sea View — Hotel Guardamar',
      description:
        'Junior Suite at Hotel Guardamar with partial Mediterranean views — refined décor, balcony, double bed, premium Lalique amenities, and calm Costa Blanca comfort in Guardamar del Segura.',
      keywords:
        'junior suite Guardamar, partial sea view room Costa Blanca, Hotel Guardamar junior suite, balcony suite Alicante, Guardamar del Segura junior suite',
    },
    es: {
      title: 'Junior Suite con vistas parciales al mar — Hotel Guardamar',
      description:
        'Junior Suite en Hotel Guardamar con vistas parciales al Mediterráneo — decoración refinada, balcón, cama doble, amenities Lalique y confort Costa Blanca en Guardamar del Segura.',
      keywords:
        'junior suite Guardamar, habitación vistas parciales mar Costa Blanca, Hotel Guardamar junior suite, suite balcón Alicante, junior suite Guardamar del Segura',
    },
  },
  'standard-view-double': {
    schemaType: 'HotelRoom',
    capacity: 2,
    areaM2: 18,
    quantity: 31,
    en: {
      title: 'Standard Room with Sea View — Hotel Guardamar',
      description:
        'Standard room with sea view at Hotel Guardamar, Guardamar del Segura — comfortable double bed, Mediterranean style, premium bathroom, and direct Costa Blanca atmosphere near the beach.',
      keywords:
        'sea view room Guardamar, standard room Costa Blanca, Hotel Guardamar sea view, double room Alicante, Guardamar del Segura hotel room',
    },
    es: {
      title: 'Habitación estándar con vistas al mar — Hotel Guardamar',
      description:
        'Habitación estándar con vistas al mar en Hotel Guardamar, Guardamar del Segura — cama doble confortable, estilo mediterráneo, baño premium y ambiente Costa Blanca cerca de la playa.',
      keywords:
        'habitación vistas al mar Guardamar, habitación estándar Costa Blanca, Hotel Guardamar vistas mar, doble Alicante, habitación Guardamar del Segura',
    },
  },
  'standard-partial-double': {
    schemaType: 'HotelRoom',
    capacity: 2,
    areaM2: 15,
    quantity: 5,
    en: {
      title: 'Standard Room with Partial Sea View — Hotel Guardamar',
      description:
        'Relaxed standard room with partial sea views at Hotel Guardamar — double bed, refined comfort, Lalique amenities, and a calm base in Guardamar del Segura on the Costa Blanca.',
      keywords:
        'partial sea view room Guardamar, standard double Costa Blanca, Hotel Guardamar partial view, affordable room Alicante, Guardamar del Segura accommodation',
    },
    es: {
      title: 'Habitación estándar con vistas parciales — Hotel Guardamar',
      description:
        'Habitación estándar con vistas parciales al mar en Hotel Guardamar — cama doble, confort refinado, amenities Lalique y una base tranquila en Guardamar del Segura, Costa Blanca.',
      keywords:
        'habitación vistas parciales Guardamar, doble estándar Costa Blanca, Hotel Guardamar vistas parciales, habitación Alicante, alojamiento Guardamar del Segura',
    },
  },
}

export const SUITE_ROOM_SLUGS = Object.keys(ROOM_SEO_META)

export function getRoomSeoMeta(slug) {
  return ROOM_SEO_META[slug] ?? null
}

export function getRoomSeoCopy(slug, locale) {
  const meta = getRoomSeoMeta(slug)
  if (!meta) return null
  return meta[locale === 'es' ? 'es' : 'en'] ?? meta.en
}
