import presidentialBathroomTub from './src/assets/suites/presidential/bathroom-freestanding-tub.png'
import presidentialBathroomShower from './src/assets/suites/presidential/bathroom-walk-in-shower.png'
import presidentialTerraceSea from './src/assets/suites/presidential/terrace-hydromassage-sea-view.png'
import presidentialTerraceRelax from './src/assets/suites/presidential/terrace-hydromassage-relax.png'
import familyBathroomMirror from './src/assets/suites/family/bathroom-vanity-backlit-mirror.png'
import familyBathroomSink from './src/assets/suites/family/bathroom-vanity-sink.png'
import familyBathroomTowels from './src/assets/suites/family/bathroom-vanity-towels.png'
import familyBathroomDetail from './src/assets/suites/family/bathroom-vanity-detail.png'
import familyBathroomWide from './src/assets/suites/family/bathroom-vanity-wide.png'
import juniorBathroomMirror from './src/assets/suites/junior/bathroom-vanity-copper-mirror.png'
import juniorBathroomSink from './src/assets/suites/junior/bathroom-vanity-copper-sink.png'
import juniorBathroomTowels from './src/assets/suites/junior/bathroom-vanity-copper-towels.png'
import juniorBathroomWide from './src/assets/suites/junior/bathroom-vanity-copper-wide.png'
import standardViewShower from './src/assets/suites/standard-view-double/bathroom-shower-green-tiles.png'
import standardViewTowelsStacked from './src/assets/suites/standard-view-double/branded-towels-stacked.png'
import standardViewVanity from './src/assets/suites/standard-view-double/bathroom-vanity-mirror-hairdryer.png'
import standardViewTowelsShower from './src/assets/suites/standard-view-double/branded-towels-shower.png'
import standardViewHairdryer from './src/assets/suites/standard-view-double/wall-mounted-hairdryer.png'
import partialViewVanity from './src/assets/suites/standard-partial-double/bathroom-vanity-mirror.png'
import partialViewShower from './src/assets/suites/standard-partial-double/bathroom-shower-green-tiles.png'
import partialViewShowerWide from './src/assets/suites/standard-partial-double/bathroom-shower-wide.png'
import partialViewTowels from './src/assets/suites/standard-partial-double/branded-towels-shower.png'

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
        src: presidentialTerraceSea,
        alt: 'Presidential suite private terrace with hydromassage bathtub and Mediterranean sea view',
      },
      {
        src: presidentialTerraceRelax,
        alt: 'Presidential suite terrace hydromassage tub with champagne and roses',
      },
      {
        src: presidentialBathroomTub,
        alt: 'Presidential suite bathroom with freestanding bathtub and natural wood wall',
      },
      {
        src: presidentialBathroomShower,
        alt: 'Presidential suite walk-in rain shower with matte black fittings',
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
        src: familyBathroomMirror,
        alt: 'Family Suite bathroom with backlit circular mirror, vessel sink and terracotta wall',
      },
      {
        src: familyBathroomSink,
        alt: 'Family Suite bathroom vanity with white sink, black faucet and Guardamar branded towels',
      },
      {
        src: familyBathroomTowels,
        alt: 'Folded Guardamar Hotel & Spa towels on the Family Suite bathroom countertop',
      },
      {
        src: familyBathroomDetail,
        alt: 'Family Suite bathroom detail with warm terracotta tiles and premium fixtures',
      },
      {
        src: familyBathroomWide,
        alt: 'Family Suite bathroom wide view with backlit mirror and branded amenities',
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
        src: juniorBathroomMirror,
        alt: 'Junior Suite bathroom with backlit circular mirror, copper-toned tiles and vessel sink',
      },
      {
        src: juniorBathroomSink,
        alt: 'Junior Suite bathroom vanity with white sink, black faucet and Guardamar branded towels',
      },
      {
        src: juniorBathroomTowels,
        alt: 'Folded Guardamar Hotel & Spa towels on the Junior Suite bathroom countertop',
      },
      {
        src: juniorBathroomWide,
        alt: 'Junior Suite bathroom wide view with copper wall tiles and backlit mirror',
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
        src: standardViewShower,
        alt: 'Standard room with view bathroom with glass shower, green tiles and backlit mirror',
      },
      {
        src: standardViewTowelsStacked,
        alt: 'Guardamar Hotel & Spa branded towels in the Standard room with view bathroom',
      },
      {
        src: standardViewVanity,
        alt: 'Standard room with view bathroom vanity with backlit mirror and wall-mounted hairdryer',
      },
      {
        src: standardViewTowelsShower,
        alt: 'Folded Guardamar towels beside the shower in the Standard room with view',
      },
      {
        src: standardViewHairdryer,
        alt: 'Wall-mounted Valera hairdryer in the Standard room with view bathroom',
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
        src: partialViewVanity,
        alt: 'Standard room partial view bathroom with backlit mirror, vessel sink and wall-mounted hairdryer',
      },
      {
        src: partialViewShower,
        alt: 'Standard room partial view shower with green vertical tiles and matte black fixtures',
      },
      {
        src: partialViewShowerWide,
        alt: 'Standard room partial view bathroom wide view with glass shower and backlit mirror',
      },
      {
        src: partialViewTowels,
        alt: 'Guardamar Hotel & Spa branded towels beside the shower in the Standard room partial view',
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
