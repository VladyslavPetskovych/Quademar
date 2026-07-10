import { suiteSrc } from './src/lib/suiteImages.js'

// Optimized display-sized WebP URLs (see scripts/optimize-suite-images.mjs). The full-
// resolution originals stay on disk under src/assets/suites/ but are never shipped.
const presidentialPhoto1 = suiteSrc('presidential/501A0809.JPG')
const presidentialPhoto2 = suiteSrc('presidential/501A0823.JPG')
const presidentialPhoto3 = suiteSrc('presidential/501A0827.JPG')
const presidentialPhoto4 = suiteSrc('presidential/501A0830.JPG')
const presidentialPhoto5 = suiteSrc('presidential/501A0833.JPG')
const presidentialPhoto6 = suiteSrc('presidential/501A0836.JPG')
const presidentialPhoto7 = suiteSrc('presidential/501A0840.JPG')
const presidentialPhoto8 = suiteSrc('presidential/501A0842.JPG')
const presidentialPhoto9 = suiteSrc('presidential/501A0844.JPG')
const presidentialPhoto10 = suiteSrc('presidential/501A0845.JPG')
const presidentialPhoto11 = suiteSrc('presidential/501A0848.JPG')
const presidentialPhoto12 = suiteSrc('presidential/501A0849.JPG')
const presidentialPhoto13 = suiteSrc('presidential/501A0764.JPG')
const presidentialPhoto14 = suiteSrc('presidential/501A0772.JPG')
const presidentialPhoto15 = suiteSrc('presidential/501A0773.JPG')
const presidentialPhoto16 = suiteSrc('presidential/501A0776.JPG')
const presidentialPhoto17 = suiteSrc('presidential/501A0779.JPG')
const presidentialPhoto18 = suiteSrc('presidential/501A0782.JPG')
const presidentialPhoto19 = suiteSrc('presidential/501A0785.JPG')
const presidentialPhoto20 = suiteSrc('presidential/501A0797.JPG')
const presidentialPhoto21 = suiteSrc('presidential/501A0801.JPG')
const presidentialPhoto22 = suiteSrc('presidential/501A0808.JPG')
const familyBedroomWide = suiteSrc('family/bedroom-wide-orange-headboard.webp')
const familyBedroomCentered = suiteSrc('family/bedroom-centered-branded-bed.webp')
const familyBedNightstandRoses = suiteSrc('family/bed-nightstand-white-roses.webp')
const familyBedGreenPillows = suiteSrc('family/bed-green-pillows-detail.webp')
const familyBedCaneNightstand = suiteSrc('family/bed-cane-nightstand-detail.webp')
const familyBedGreenBrandedPillow = suiteSrc('family/bed-green-branded-pillow.webp')
const familyBedLinenDetail = suiteSrc('family/bed-guardamar-linen-detail.webp')
const familyBedroomTvVanity = suiteSrc('family/bedroom-tv-vanity-corner.webp')
const familyBalconySeaView = suiteSrc('family/balcony-chairs-sea-view.webp')
const familyBathroomShower = suiteSrc('family/bathroom-shower-terracotta.webp')
const familyBathroomMirror = suiteSrc('family/bathroom-vanity-mirror.webp')
const familyBathroomSink = suiteSrc('family/bathroom-sink-detail.webp')
const familyBathroomAmenities = suiteSrc('family/bathroom-lalique-amenities.webp')
const familyBathroomTowel = suiteSrc('family/bathroom-branded-towel.webp')
const familyBathroomBathrobes = suiteSrc('family/bathroom-branded-bathrobes.webp')
const juniorPhoto1 = suiteSrc('junior-partial-view/501A0604.JPG')
const juniorPhoto2 = suiteSrc('junior-partial-view/501A0601.JPG')
const juniorPhoto3 = suiteSrc('junior-partial-view/501A0609R.JPG')
const juniorPhoto4 = suiteSrc('junior-partial-view/501A0613.JPG')
const juniorPhoto5 = suiteSrc('junior-partial-view/501A0618.JPG')
const juniorPhoto6 = suiteSrc('junior-partial-view/501A0655.JPG')
const juniorPhoto7 = suiteSrc('junior-partial-view/501A0654.JPG')
const juniorPhoto8 = suiteSrc('junior-partial-view/501A0631.JPG')
const juniorPhoto9 = suiteSrc('junior-partial-view/501A0633.JPG')
const juniorPhoto10 = suiteSrc('junior-partial-view/501A0634.JPG')
const juniorPhoto11 = suiteSrc('junior-partial-view/501A0632.JPG')
const juniorPhoto12 = suiteSrc('junior-partial-view/501A0623R.JPG')
const juniorPhoto13 = suiteSrc('junior-partial-view/501A0630.JPG')
const juniorPhoto14 = suiteSrc('junior-partial-view/501A0650.JPG')
const juniorPhoto15 = suiteSrc('junior-partial-view/501A0653.JPG')
const juniorPhoto16 = suiteSrc('junior-partial-view/501A0646.JPG')
const juniorPhoto17 = suiteSrc('junior-partial-view/501A0647.JPG')
const standardViewPhoto1 = suiteSrc('standard-view-double/bedroom-wide-yellow-bed.jpg')
const standardViewPhoto2 = suiteSrc('standard-view-double/bedroom-yellow-bed-tv-wardrobe.jpg')
const standardViewPhoto3 = suiteSrc('standard-view-double/bedroom-centered-twin-pendants.jpg')
const standardViewPhoto4 = suiteSrc('standard-view-double/bedroom-desk-dressing-corner.jpg')
const standardViewPhoto5 = suiteSrc('standard-view-double/branded-towel-detail.jpg')
const standardViewPhoto6 = suiteSrc('standard-view-double/bathroom-green-tiles-shower.jpg')

/**
 * Suite / room listings in page order. Alternating layout: `reverse: false` = photo left,
 * `reverse: true` = photo right (large screens).
 * Each `images` item: `{ src, alt }`.
 */
export const ROOM_CATEGORIES = [
  {
    id: 'presidential',
    reverse: false,
    images: [
      {
        src: presidentialPhoto1,
        alt: 'Presidential Suite bedroom with terracotta velvet bed, tropical palm mural, twin rattan pendants and green Guardamar runner',
      },
      {
        src: presidentialPhoto2,
        alt: 'Presidential Suite bedroom from the side with cream louvered wardrobe, palm-print walls and terracotta bed',
      },
      {
        src: presidentialPhoto3,
        alt: 'Presidential Suite dressing corridor with louvered wardrobe, round rope mirror, red pouf and Buddha figure',
      },
      {
        src: presidentialPhoto4,
        alt: 'Presidential Suite terracotta headboard within the plaster arch with green velvet pillows and teal runner',
      },
      {
        src: presidentialPhoto5,
        alt: 'Presidential Suite double bed centred beneath the arched alcove with twin rattan pendants and palm mural',
      },
      {
        src: presidentialPhoto6,
        alt: 'Presidential Suite wide view with white louvered wardrobe, terracotta bed and gold Guardamar branded runner',
      },
      {
        src: presidentialPhoto7,
        alt: 'Presidential Suite bedside detail with woven rattan pendant, cane nightstand and green Guardamar pillow',
      },
      {
        src: presidentialPhoto8,
        alt: 'Presidential Suite round rope mirror reflecting the rattan pendants above a wooden console with Buddha figure',
      },
      {
        src: presidentialPhoto9,
        alt: 'Presidential Suite warm detail of the woven rattan pendant light beside the terracotta bed',
      },
      {
        src: presidentialPhoto10,
        alt: 'Gold Guardamar Hotel & Spa logo embroidered on the Presidential Suite white bed linen',
      },
      {
        src: presidentialPhoto11,
        alt: 'Etched Guardamar Hotel & Spa glass panel with the spa bathtub beyond in the Presidential Suite',
      },
      {
        src: presidentialPhoto12,
        alt: 'Presidential Suite private hydromassage bathtub filled with water against a pebble-stone wall',
      },
      {
        src: presidentialPhoto13,
        alt: 'Presidential Suite bathroom double vanity with two backlit round mirrors, green fluted tiles and twin vessel sinks',
      },
      {
        src: presidentialPhoto14,
        alt: 'Presidential Suite bathroom with freestanding bathtub, walnut wall and black rain shower behind glass',
      },
      {
        src: presidentialPhoto15,
        alt: 'Presidential Suite bathroom wide view with freestanding bathtub, walk-in shower and heated towel rail',
      },
      {
        src: presidentialPhoto16,
        alt: 'Presidential Suite freestanding bathtub centred against the walnut wall with black fixtures',
      },
      {
        src: presidentialPhoto17,
        alt: 'Guardamar branded bathrobe hanging beside the Presidential Suite freestanding bathtub and walnut wall',
      },
      {
        src: presidentialPhoto18,
        alt: 'Presidential Suite bathroom with wall-hung toilet, walk-in shower and freestanding bathtub in a walnut niche',
      },
      {
        src: presidentialPhoto19,
        alt: 'Presidential Suite freestanding bathtub against the walnut wall with premium Lalique amenities',
      },
      {
        src: presidentialPhoto20,
        alt: 'Presidential Suite bathroom with twin vessel sinks, backlit round mirror, green tiles and wall-hung toilet',
      },
      {
        src: presidentialPhoto21,
        alt: 'Presidential Suite entrance hall with mirrored wardrobe and room 401 sign opening to the lounge',
      },
      {
        src: presidentialPhoto22,
        alt: 'Presidential Suite entrance hall with warm lighting, mirrored wall and room 401 sign',
      },
    ],
    title: 'Presidential Suite',
    quantity: 4,
    capacity: 4,
    areaM2: 40,
    features: [
      { label: '4 units', icon: 'units' },
      { label: '4 guests', icon: 'guests' },
      { label: '40 m²', icon: 'size' },
    ],
    description:
      'Our most exclusive suite for up to four guests: a spacious terrace with a private hydromassage bathtub and sea views, refined natural textures, double bed and sofa bed, and a luxurious bathroom with bathtub and walk-in shower.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/presidential',
    classNames: {},
    galleryNarrative: {
      headline: 'A place where the world stops for you',
      body:
        'Immerse yourself in an atmosphere of absolute tranquility, where every element of the interior whispers of harmony. Our Presidential Suite is a blend of natural textures, soft lighting, and refined Spanish style. Here, time slows down, allowing you to enjoy views of the Mediterranean Sea surrounded by comfort and natural materials. A place where luxury becomes second nature.',
    },
    detailSection: {
      headline: 'Our most exclusive suite',
      intro:
        'Our most exclusive suite, designed for up to 4 guests, offering exceptional comfort, privacy, and a breathtaking Mediterranean atmosphere. The spacious terrace features a private hydromassage bathtub, perfect for relaxing moments with stunning sea views.\n\nElegantly designed with refined natural textures and premium finishes, the suite includes one double bed along with a comfortable sofa bed. The luxurious bathroom features both a bathtub and a walk-in shower.\n\nGuests can enjoy premium Lalique amenities, branded bathrobes and slippers, minibar, tea station, in-room safe, and access to the heated pool and the hotel restaurant serving refined breakfasts and lunches.',
      left: [
        {
          label: 'Beds',
          icon: 'bed',
          text: 'Double bed and sofa bed',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '40 m²',
        },
        {
          label: 'View',
          icon: 'view',
          text: 'Private terrace with hydromassage tub and Mediterranean sea views',
        },
      ],
      right: [
        {
          label: 'Occupancy',
          icon: 'guests',
          text: 'Up to 4 guests',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Freestanding bathtub and walk-in shower',
        },
        {
          label: 'Features',
          icon: 'features',
          bullets: [
            'Premium Lalique amenities, bathrobes and slippers',
            'Minibar, tea station and in-room safe',
            'Heated pool and hotel restaurant access',
            'Refined natural textures and Spanish-style interiors',
          ],
        },
      ],
    },
  },
  {
    id: 'family',
    reverse: true,
    images: [
      {
        src: familyBedroomWide,
        alt: 'Family Suite bedroom with terracotta tufted headboard, green accent linens, sofa bed and balcony',
      },
      {
        src: familyBedroomCentered,
        alt: 'Family Suite double bed with Guardamar branding, green pillows, framed art and louvered wardrobe',
      },
      {
        src: familyBedNightstandRoses,
        alt: 'Family Suite bedside with terracotta headboard, cane-front nightstand and white roses',
      },
      {
        src: familyBedGreenPillows,
        alt: 'Family Suite bed detail with green velvet Guardamar pillows, armchair and rattan pendant light',
      },
      {
        src: familyBedCaneNightstand,
        alt: 'Family Suite bed corner with embroidered Guardamar pillow and cane-front rattan nightstand',
      },
      {
        src: familyBedGreenBrandedPillow,
        alt: 'Family Suite bedding close-up with green Guardamar Hotel & Spa embroidered accent pillow and runner',
      },
      {
        src: familyBedLinenDetail,
        alt: 'Close-up of Guardamar Hotel & Spa logo on the Family Suite white bed linen',
      },
      {
        src: familyBedroomTvVanity,
        alt: 'Family Suite with wall-mounted flat-screen TV, vanity desk corner and orange pouf',
      },
      {
        src: familyBalconySeaView,
        alt: 'Family Suite private balcony with woven chairs, table and Mediterranean sea view',
      },
      {
        src: familyBathroomShower,
        alt: 'Family Suite bathroom with glass corner shower, terracotta wall, round mirror and vessel sink',
      },
      {
        src: familyBathroomMirror,
        alt: 'Family Suite bathroom vanity with backlit round mirror, vessel sink and terracotta accent wall',
      },
      {
        src: familyBathroomSink,
        alt: 'Family Suite bathroom detail with white vessel sink, tall black faucet and terracotta tiles',
      },
      {
        src: familyBathroomAmenities,
        alt: 'Premium Lalique bath amenities on the terracotta tiled wall of the Family Suite bathroom',
      },
      {
        src: familyBathroomTowel,
        alt: 'Folded Guardamar Hotel & Spa branded towel beside the Family Suite vessel sink',
      },
      {
        src: familyBathroomBathrobes,
        alt: 'Two Guardamar Hotel & Spa branded bathrobes hanging in the Family Suite bathroom',
      },
    ],
    title: 'Family Suite',
    quantity: 4,
    capacity: 4,
    areaM2: 20,
    features: [
      { label: '4 units', icon: 'units' },
      { label: '4 guests', icon: 'guests' },
      { label: '20 m²', icon: 'size' },
    ],
    description:
      'Spacious and thoughtfully designed for up to 4 guests, featuring one double bed along with a comfortable sofa bed. Created for relaxing family stays, the suite combines generous space, natural Mediterranean textures, and elegant comfort.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/family',
    classNames: {},
    galleryNarrative: {
      body:
        'Spacious and thoughtfully designed for up to 4 guests, featuring one double bed along with a comfortable sofa bed. Created for relaxing family stays, the suite combines generous space, natural Mediterranean textures, and elegant comfort.',
    },
    detailSection: {
      headline: 'Spacious family comfort',
      intro:
        'Guests can enjoy a private balcony, premium Lalique amenities, branded bathrobes and slippers, minibar, tea station, and in-room safe. The suite also includes access to the heated pool and the hotel restaurant serving refined breakfasts and lunches.',
      left: [
        {
          label: 'Beds',
          icon: 'bed',
          text: 'Double bed and sofa bed',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '20 m²',
        },
        {
          label: 'View',
          icon: 'view',
          text: 'Private balcony',
        },
      ],
      right: [
        {
          label: 'Occupancy',
          icon: 'guests',
          text: 'Up to 4 guests',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Spacious bathroom with shower',
        },
        {
          label: 'Features',
          icon: 'features',
          bullets: [
            'Premium Lalique amenities',
            'Branded bathrobes and slippers',
            'Minibar, tea station and in-room safe',
            'Heated pool and hotel restaurant access',
          ],
        },
      ],
    },
  },
  {
    id: 'junior',
    reverse: false,
    images: [
      {
        src: juniorPhoto1,
        alt: 'Junior Suite bedroom with terracotta channel-tufted double and twin beds, green Guardamar runner, arched alcove and balcony window',
      },
      {
        src: juniorPhoto2,
        alt: 'Junior Suite bedroom with terracotta beds, green accent pillows, wall-mounted TV and arched headboard niche',
      },
      {
        src: juniorPhoto3,
        alt: 'Junior Suite beds centred beneath the arched alcove with gold Guardamar branded runner and green pillows',
      },
      {
        src: juniorPhoto4,
        alt: 'Junior Suite seen from the entrance with terracotta beds, louvered wardrobe and wall-mounted TV',
      },
      {
        src: juniorPhoto5,
        alt: 'Junior Suite wooden desk and dressing corner with kettle, orange pouf and wall-mounted TV',
      },
      {
        src: juniorPhoto6,
        alt: 'Junior Suite nightstand detail with kettle and a warm woven pendant light beside the walnut wall',
      },
      {
        src: juniorPhoto7,
        alt: 'Guardamar Hotel & Spa branded bathrobe laid on the Junior Suite bed with green runner',
      },
      {
        src: juniorPhoto8,
        alt: 'Junior Suite private balcony with Mediterranean sea and rooftop views over Guardamar',
      },
      {
        src: juniorPhoto9,
        alt: 'Junior Suite balcony with woven chairs and a wide Mediterranean sea view over the beach',
      },
      {
        src: juniorPhoto10,
        alt: 'Junior Suite balcony with woven chairs, side table and Mediterranean sea view',
      },
      {
        src: juniorPhoto11,
        alt: 'Junior Suite balcony with woven chairs beside the sheer-curtained French doors',
      },
      {
        src: juniorPhoto12,
        alt: 'Junior Suite bathroom with copper-toned tiles, backlit round mirror, vessel sink, glass shower and wall-hung toilet',
      },
      {
        src: juniorPhoto13,
        alt: 'Junior Suite bathroom with walk-in glass shower, copper tiles, backlit round mirror and vessel sink vanity',
      },
      {
        src: juniorPhoto14,
        alt: 'Close-up of the Junior Suite white vessel sink with a tall matte-black faucet and folded branded towels',
      },
      {
        src: juniorPhoto15,
        alt: 'Junior Suite backlit round mirror reflecting the copper-tiled walk-in shower',
      },
      {
        src: juniorPhoto16,
        alt: 'Junior Suite walk-in shower detail with copper tiles, black rain fixtures and premium Lalique amenities',
      },
      {
        src: juniorPhoto17,
        alt: 'Junior Suite bathroom with wall-hung toilet, black fixtures and glass shower partition',
      },
    ],
    title: 'Junior Suite',
    quantity: 4,
    capacity: 3,
    areaM2: 20,
    features: [
      { label: '4 units', icon: 'units' },
      { label: '3 guests', icon: 'guests' },
      { label: '20 m²', icon: 'size' },
    ],
    description:
      'Spacious and elegantly designed for up to 3 guests, featuring one double bed along with an elegant convertible armchair bed. With its larger layout, natural Mediterranean textures, and relaxing atmosphere, the suite offers the perfect balance of comfort and style.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/junior',
    classNames: {},
    galleryNarrative: {
      body:
        'Spacious and elegantly designed for up to 3 guests, featuring one double bed along with an elegant convertible armchair bed. With its larger layout, natural Mediterranean textures, and relaxing atmosphere, the suite offers the perfect balance of comfort and style.',
    },
    detailSection: {
      headline: 'Elegant junior comfort',
      intro:
        'Guests can enjoy a private balcony, premium Lalique amenities, branded bathrobes and slippers, minibar, tea station, and in-room safe. Access to the heated pool and the hotel restaurant serving refined breakfasts and lunches is also included.',
      left: [
        {
          label: 'Beds',
          icon: 'bed',
          text: 'Double bed and convertible armchair bed',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '20 m²',
        },
        {
          label: 'View',
          icon: 'view',
          text: 'Private balcony',
        },
      ],
      right: [
        {
          label: 'Occupancy',
          icon: 'guests',
          text: 'Up to 3 guests',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Spacious bathroom with shower',
        },
        {
          label: 'Features',
          icon: 'features',
          bullets: [
            'Premium Lalique amenities',
            'Branded bathrobes and slippers',
            'Minibar, tea station and in-room safe',
            'Heated pool and hotel restaurant access',
          ],
        },
      ],
    },
  },
  {
    id: 'standard-view-double',
    reverse: true,
    images: [
      {
        src: standardViewPhoto2,
        alt: 'Standard room with view bedroom with mustard-yellow bed, green accent pillow, wall-mounted TV and white louvered wardrobe',
      },
      {
        src: standardViewPhoto1,
        alt: 'Standard room with view bedroom with mustard-yellow upholstered bed, green Guardamar runner, wall-mounted TV and balcony window',
      },
      {
        src: standardViewPhoto3,
        alt: 'Standard room with view double bed with mustard-yellow base, green Guardamar pillows and twin woven rattan pendant lights',
      },
      {
        src: standardViewPhoto4,
        alt: 'Standard room with view dressing desk with mirror, fresh roses, yellow velvet pouf and rattan pendant beside the bed',
      },
      {
        src: standardViewPhoto5,
        alt: 'Folded Guardamar Hotel & Spa branded towels against the green-tiled wall of the Standard room with view bathroom',
      },
      {
        src: standardViewPhoto6,
        alt: 'Standard room with view bathroom with walk-in glass shower, backlit green tiles, round mirror and vessel sink',
      },
    ],
    title: 'Standard room with view',
    quantity: 31,
    capacity: 2,
    areaM2: 18,
    features: [
      { label: '31 units', icon: 'units' },
      { label: '2 guests', icon: 'guests' },
      { label: '18 m²', icon: 'size' },
    ],
    description:
      'Elegant and spacious suite for up to 2 guests, available with one double bed or two twin beds upon request. Featuring a private balcony with breathtaking sea views, premium Lalique amenities, branded bathrobes and slippers, minibar, tea station, and in-room safe.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/standard-view-double',
    classNames: {},
    galleryNarrative: {
      body:
        'Elegant and spacious suite for up to 2 guests, available with one double bed or two twin beds upon request. Featuring a private balcony with breathtaking sea views, premium Lalique amenities, branded bathrobes and slippers, minibar, tea station, and in-room safe.',
    },
    detailSection: {
      headline: 'Refined comfort with sea views',
      intro:
        'Designed with a refined Mediterranean aesthetic and calming natural textures, the suite offers an atmosphere of comfort and relaxation. Guests also enjoy access to the heated pool and the hotel restaurant serving refined breakfasts and lunches.',
      left: [
        {
          label: 'Beds',
          icon: 'bed',
          text: 'Double bed or twin beds on request',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '18 m²',
        },
        {
          label: 'View',
          icon: 'view',
          text: 'Private balcony with sea views',
        },
      ],
      right: [
        {
          label: 'Occupancy',
          icon: 'guests',
          text: 'Up to 2 guests',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Spacious bathroom with shower',
        },
        {
          label: 'Features',
          icon: 'features',
          bullets: [
            'Refined Mediterranean décor',
            'Premium Lalique amenities',
            'Branded bathrobes and slippers',
            'Minibar, tea station and in-room safe',
            'Heated pool and hotel restaurant access',
          ],
        },
      ],
    },
  },
  {
    id: 'standard-partial-double',
    reverse: false,
    images: [
      {
        src: standardViewPhoto3,
        alt: 'Standard room partial view double bed with mustard-yellow base, green Guardamar pillows and twin woven rattan pendant lights',
      },
      {
        src: standardViewPhoto4,
        alt: 'Standard room partial view dressing desk with mirror, fresh roses, yellow velvet pouf and rattan pendant beside the bed',
      },
      {
        src: standardViewPhoto2,
        alt: 'Standard room partial view bedroom with mustard-yellow bed, green accent pillow, wall-mounted TV and white louvered wardrobe',
      },
      {
        src: standardViewPhoto1,
        alt: 'Standard room partial view bedroom with mustard-yellow upholstered bed, green Guardamar runner, wall-mounted TV and window',
      },
      {
        src: standardViewPhoto6,
        alt: 'Standard room partial view bathroom with walk-in glass shower, backlit green tiles, round mirror and vessel sink',
      },
      {
        src: standardViewPhoto5,
        alt: 'Folded Guardamar Hotel & Spa branded towels against the green-tiled wall of the Standard room partial view bathroom',
      },
    ],
    title: 'Standard room partial view',
    quantity: 5,
    capacity: 2,
    areaM2: 15,
    features: [
      { label: '5 units', icon: 'units' },
      { label: '2 guests', icon: 'guests' },
      { label: '15 m²', icon: 'size' },
    ],
    description:
      'Elegant and relaxing room for up to 2 guests, available with one double bed or two twin beds upon request. Featuring a private balcony with partial sea views, premium Lalique amenities, branded bathrobes and slippers, minibar, tea station, and in-room safe.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/standard-partial-double',
    classNames: {},
    galleryNarrative: {
      body:
        'Elegant and relaxing room for up to 2 guests, available with one double bed or two twin beds upon request. Featuring a private balcony with partial sea views, premium Lalique amenities, branded bathrobes and slippers, minibar, tea station, and in-room safe.',
    },
    detailSection: {
      headline: 'Relaxed comfort with partial sea views',
      intro:
        'Inspired by Mediterranean calm and natural textures, the room offers access to the heated pool and the hotel restaurant serving refined breakfasts and lunches.',
      left: [
        {
          label: 'Beds',
          icon: 'bed',
          text: 'Double bed or twin beds on request',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '15 m²',
        },
        {
          label: 'View',
          icon: 'view',
          text: 'Private balcony with partial sea views',
        },
      ],
      right: [
        {
          label: 'Occupancy',
          icon: 'guests',
          text: 'Up to 2 guests',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Spacious bathroom with shower',
        },
        {
          label: 'Features',
          icon: 'features',
          bullets: [
            'Mediterranean-inspired décor',
            'Premium Lalique amenities',
            'Branded bathrobes and slippers',
            'Minibar, tea station and in-room safe',
            'Heated pool and hotel restaurant access',
          ],
        },
      ],
    },
  },
]

/** Detail URL segment matches `id` (e.g. `/suites-rooms/presidential`). */
export function getRoomBySlug(slug) {
  return ROOM_CATEGORIES.find((r) => r.id === slug) ?? null
}
