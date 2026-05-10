import presidentialImage from './src/assets/suites/presidential.png'
import familyImage from './src/assets/suites/family.png'
import juniorImage from './src/assets/suites/junior.png'
import doubleImage from './src/assets/suites/double.png'

/**
 * Suite / room listings in page order. Alternating layout: `reverse: false` = photo left,
 * `reverse: true` = photo right (large screens).
 * Each `images` item: `{ src, alt }`.
 */
export const ROOM_CATEGORIES = [
  {
    id: 'presidential',
    reverse: false,
    images: [{ src: presidentialImage, alt: 'Presidential Suite bedroom interior' }],
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
      'Spacious and elegant suite with a double bed, lounge sofa, jacuzzi, and both bathtub and shower. Includes two private balconies and is ideal for premium stays in Guardamar.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/presidential',
    classNames: {},
    detailSection: {
      headline: 'Presidential comfort in Guardamar',
      intro:
        'A premium suite category designed for guests who want generous space, privacy, and elevated comfort on the Costa Blanca coast.',
      left: [
        {
          label: 'Available units',
          icon: 'features',
          text: '4 suites',
        },
        {
          label: 'Capacity',
          icon: 'guests',
          text: 'Up to 4 guests',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '40 m²',
        },
      ],
      right: [
        {
          label: 'Sleeping setup',
          icon: 'bed',
          text: 'Double bed + sofa bed',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Bathtub and shower',
        },
        {
          label: 'Highlights',
          icon: 'features',
          bullets: [
            'Private jacuzzi',
            'Two balconies',
            'Living zone with sofa',
          ],
        },
      ],
    },
  },
  {
    id: 'family',
    reverse: true,
    images: [{ src: familyImage, alt: 'Family Suite bright bedroom with wooden bench and large window' }],
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
      'Well-balanced suite for families or small groups, featuring a double bed plus sofa bed and a private shower bathroom.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/family',
    classNames: {},
    detailSection: {
      headline: 'Family-friendly and practical',
      intro:
        'Comfortable layout for families and companions who want an efficient, stylish base near Guardamar beaches and town center.',
      left: [
        {
          label: 'Available units',
          icon: 'features',
          text: '4 suites',
        },
        {
          label: 'Capacity',
          icon: 'guests',
          text: 'Up to 4 guests',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '20 m²',
        },
      ],
      right: [
        {
          label: 'Sleeping setup',
          icon: 'bed',
          text: 'Double bed + sofa bed',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Shower',
        },
        {
          label: 'Highlights',
          icon: 'features',
          bullets: [
            'Family-oriented setup',
            'Extra sofa sleeping place',
            'Functional bathroom layout',
          ],
        },
      ],
    },
  },
  {
    id: 'junior',
    reverse: false,
    images: [{ src: juniorImage, alt: 'Junior Suite modern bedroom with lounge chairs and woven pendant' }],
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
      'Elegant suite with a double bed plus armchair and private shower bathroom. A refined option for couples or small groups.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/junior',
    classNames: {},
    detailSection: {
      headline: 'Compact suite with style',
      intro:
        'A contemporary category that balances comfort and smart use of space for relaxed holidays in Guardamar.',
      left: [
        {
          label: 'Available units',
          icon: 'features',
          text: '4 suites',
        },
        {
          label: 'Capacity',
          icon: 'guests',
          text: 'Up to 3 guests',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '20 m²',
        },
      ],
      right: [
        {
          label: 'Sleeping setup',
          icon: 'bed',
          text: 'Double bed + armchair',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Shower',
        },
        {
          label: 'Highlights',
          icon: 'features',
          bullets: [
            'Modern compact layout',
            'Easy-care bathroom',
            'Comfortable lounge touch',
          ],
        },
      ],
    },
  },
  {
    id: 'standard-view-double',
    reverse: true,
    images: [{ src: doubleImage, alt: 'Standard room with view and one double bed' }],
    title: 'Double with View',
    quantity: 31,
    capacity: 2,
    areaM2: 18,
    features: [
      { label: '31 units', icon: 'units' },
      { label: '2 guests', icon: 'guests' },
      { label: '18 m²', icon: 'size' },
    ],
    description:
      'Most requested room category with exterior views. Includes one double bed (160x200) and a private shower bathroom.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/standard-view-double',
    classNames: {},
    detailSection: {
      headline: 'Standard room with open view',
      intro:
        'A bright and practical standard room for couples who prefer a single large bed and easy access to all hotel facilities.',
      left: [
        {
          label: 'Available units',
          icon: 'features',
          text: '31 rooms',
        },
        {
          label: 'Capacity',
          icon: 'guests',
          text: 'Up to 2 guests',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '18 m²',
        },
      ],
      right: [
        {
          label: 'Sleeping setup',
          icon: 'bed',
          text: 'One double bed (160x200)',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Shower',
        },
        {
          label: 'Highlights',
          icon: 'features',
          bullets: [
            'Exterior view category',
            'Efficient layout',
            'Ideal for couples',
          ],
        },
      ],
    },
  },
  {
    id: 'standard-partial-double',
    reverse: false,
    images: [{ src: doubleImage, alt: 'Standard room with partial view and one double bed' }],
    title: 'Double with partial View',
    quantity: 5,
    capacity: 2,
    areaM2: 15,
    features: [
      { label: '5 units', icon: 'units' },
      { label: '2 guests', icon: 'guests' },
      { label: '15 m²', icon: 'size' },
    ],
    description:
      'Compact room with one double bed and partial view. Includes a practical bathroom with shower.',
    ctaLabel: 'View Room',
    ctaTo: '/suites-rooms/standard-partial-double',
    classNames: {},
    detailSection: {
      headline: 'Compact double with partial view',
      intro:
        'A smart category for guests who value location and comfort with a smaller footprint.',
      left: [
        {
          label: 'Available units',
          icon: 'features',
          text: '5 rooms',
        },
        {
          label: 'Capacity',
          icon: 'guests',
          text: 'Up to 2 guests',
        },
        {
          label: 'Size',
          icon: 'size',
          text: '15 m²',
        },
      ],
      right: [
        {
          label: 'Sleeping setup',
          icon: 'bed',
          text: 'One double bed',
        },
        {
          label: 'Bathroom',
          icon: 'bathroom',
          text: 'Shower',
        },
        {
          label: 'Highlights',
          icon: 'features',
          bullets: [
            'Partial view category',
            'Efficient room plan',
            'Ideal for short city-beach stays',
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
