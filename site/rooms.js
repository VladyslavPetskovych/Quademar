import { suiteSrc } from './src/lib/suiteImages.js'

// `suiteSrc()` maps a source photo to its optimized display-sized WebP (see
// scripts/optimize-suite-images.mjs). The originals under src/assets/suites/ are never shipped.

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
        src: suiteSrc('presidential/501A0809.JPG'),
        alt: 'Presidential Suite bedroom with terracotta velvet bed, tropical palm mural, twin rattan pendants and green Guardamar runner',
      },
      {
        src: suiteSrc('presidential/501A0833.JPG'),
        alt: 'Presidential Suite double bed centred beneath the arched alcove with twin rattan pendants and palm mural',
      },
      {
        src: suiteSrc('presidential/501A0836.JPG'),
        alt: 'Presidential Suite wide view with white louvered wardrobe, terracotta bed and Guardamar branded runner',
      },
      {
        src: suiteSrc('presidential/501A0823.JPG'),
        alt: 'Presidential Suite bedroom from the side with cream louvered wardrobe, palm-print walls and terracotta bed',
      },
      {
        src: suiteSrc('presidential/501A0830.JPG'),
        alt: 'Presidential Suite terracotta headboard within the plaster arch with green velvet pillows and woven pendant',
      },
      {
        src: suiteSrc('presidential/501A0797.JPG'),
        alt: 'Presidential Suite lounge with green velvet sofa bed, patterned rug and French doors to the terrace',
      },
      {
        src: suiteSrc('presidential/501A0840.JPG'),
        alt: 'Presidential Suite bedside detail with woven rattan pendant, cane nightstand and green Guardamar pillow',
      },
      {
        src: suiteSrc('presidential/501A0844.JPG'),
        alt: 'Presidential Suite warm detail of the woven rattan pendant light beside the terracotta bed',
      },
      {
        src: suiteSrc('presidential/501A0845.JPG'),
        alt: 'Gold Guardamar Hotel & Spa logo embroidered on the Presidential Suite white bed linen',
      },
      {
        src: suiteSrc('presidential/501A0827.JPG'),
        alt: 'Presidential Suite dressing corridor with louvered wardrobe, round mirror, vanity and red pouf',
      },
      {
        src: suiteSrc('presidential/501A0842.JPG'),
        alt: 'Presidential Suite round rope mirror above a wooden vanity with Buddha figure and palm mural',
      },
      {
        src: suiteSrc('presidential/501A0849.JPG'),
        alt: 'Presidential Suite private hydromassage bathtub filled with water against a pebble-stone wall',
      },
      {
        src: suiteSrc('presidential/501A0848.JPG'),
        alt: 'Etched Guardamar Hotel & Spa glass panel beside the Presidential Suite hydromassage bathtub',
      },
      {
        src: suiteSrc('presidential/501A0764.JPG'),
        alt: 'Presidential Suite bathroom double vanity with two backlit round mirrors, green fluted tiles and twin vessel sinks',
      },
      {
        src: suiteSrc('presidential/501A0785.JPG'),
        alt: 'Presidential Suite bathroom with vessel sinks, backlit round mirror, green tiles and wall-hung toilet',
      },
      {
        src: suiteSrc('presidential/501A0773.JPG'),
        alt: 'Presidential Suite freestanding bathtub against the walnut-panelled wall with black fixtures',
      },
      {
        src: suiteSrc('presidential/501A0772.JPG'),
        alt: 'Presidential Suite bathroom with freestanding bathtub, walnut wall and black rain shower',
      },
      {
        src: suiteSrc('presidential/501A0776.JPG'),
        alt: 'Presidential Suite freestanding bathtub beside the glass walk-in shower and heated towel rail',
      },
      {
        src: suiteSrc('presidential/501A0779.JPG'),
        alt: 'Guardamar branded bathrobe hanging beside the Presidential Suite freestanding bathtub',
      },
      {
        src: suiteSrc('presidential/501A0782.JPG'),
        alt: 'Presidential Suite bathroom with wall-hung toilet, walk-in shower and freestanding bathtub',
      },
      {
        src: suiteSrc('presidential/501A0801.JPG'),
        alt: 'Presidential Suite entrance hall with mirrored wardrobe and room 401 sign opening to the lounge',
      },
      {
        src: suiteSrc('presidential/501A0808.JPG'),
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
        src: suiteSrc('family/501A0720.JPG'),
        alt: 'Family Suite bedroom with terracotta channel-tufted bed, green Guardamar runner, sofa bed and balcony doors',
      },
      {
        src: suiteSrc('family/501A0715.JPG'),
        alt: 'Family Suite double bed with green pillows, white louvered wardrobe and woven pendant light',
      },
      {
        src: suiteSrc('family/501A0656.JPG'),
        alt: 'Green velvet Guardamar Hotel & Spa pillows on the Family Suite bed',
      },
      {
        src: suiteSrc('family/501A0762.JPG'),
        alt: 'Family Suite sofa bed seen from the double bed with green Guardamar runner',
      },
      {
        src: suiteSrc('family/501A0710.JPG'),
        alt: 'Family Suite sofa bed with desk corner, orange pouf and full-length curtains',
      },
      {
        src: suiteSrc('family/501A0736.JPG'),
        alt: 'Family Suite louvered wardrobe and round console with fresh roses beside the bed',
      },
      {
        src: suiteSrc('family/501A0759.JPG'),
        alt: 'Family Suite open wardrobe with folded towels, spare linen and hangers',
      },
      {
        src: suiteSrc('family/501A0760.JPG'),
        alt: 'Family Suite entrance with white louvered wardrobe, roses and candles on the console',
      },
      {
        src: suiteSrc('family/501A0718.JPG'),
        alt: 'Family Suite bedroom with terracotta bed, warm pendant light and window with sheer curtains',
      },
      {
        src: suiteSrc('family/501A0701.JPG'),
        alt: 'Family Suite wide view with wall-mounted TV, double bed, sofa bed and balcony',
      },
      {
        src: suiteSrc('family/501A0634.JPG'),
        alt: 'Family Suite private balcony with woven chairs and Mediterranean sea view',
      },
      {
        src: suiteSrc('family/501A0739.JPG'),
        alt: 'Family Suite balcony overlooking the rooftops of Guardamar and the sea',
      },
      {
        src: suiteSrc('family/501A0744.JPG'),
        alt: 'Family Suite balcony with bistro table, woven chairs and glass doors',
      },
      {
        src: suiteSrc('family/501A0728.JPG'),
        alt: 'Family Suite bathroom with terracotta wall, round mirror, vessel sink, glass shower and wall-hung toilet',
      },
      {
        src: suiteSrc('family/501A0732.JPG'),
        alt: 'Family Suite bathroom vanity with backlit round mirror, vessel sink and terracotta wall',
      },
      {
        src: suiteSrc('family/501A0754.JPG'),
        alt: 'Family Suite vanity with hairdryer, magnifying mirror and Guardamar towel beside the sink',
      },
      {
        src: suiteSrc('family/501A0748.JPG'),
        alt: 'Family Suite vessel sink with tall black faucet, Lalique soap and amenities basket',
      },
      {
        src: suiteSrc('family/501A0751.JPG'),
        alt: 'Close-up of the Family Suite vessel sink and Lalique amenities against terracotta tiles',
      },
      {
        src: suiteSrc('family/501A0750.JPG'),
        alt: 'Family Suite backlit mirror above the vanity with Lalique soap and amenities basket',
      },
      {
        src: suiteSrc('family/501A0747.JPG'),
        alt: 'Folded Guardamar branded towels and hairdryer on the Family Suite vanity',
      },
      {
        src: suiteSrc('family/501A0745.JPG'),
        alt: 'Family Suite walk-in shower with terracotta tiles, black thermostat and Lalique amenities',
      },
      {
        src: suiteSrc('family/501A0753.JPG'),
        alt: 'Black shower fixtures and Lalique dispensers on the terracotta tiles of the Family Suite shower',
      },
      {
        src: suiteSrc('family/501A0752.JPG'),
        alt: 'Family Suite black rain shower head under warm LED ceiling lighting',
      },
      {
        src: suiteSrc('family/501A0735.JPG'),
        alt: 'Family Suite bathroom with heated towel rail and two Guardamar bathrobes',
      },
      {
        src: suiteSrc('family/501A0746.JPG'),
        alt: 'Guardamar Hotel & Spa branded bathrobe hanging beside the heated towel rail in the Family Suite',
      },
      {
        src: suiteSrc('family/501A0694.JPG'),
        alt: 'Family Suite vessel sink with folded Guardamar towels beneath a backlit mirror and green tiles',
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
        src: suiteSrc('junior/501A0604.JPG'),
        alt: 'Junior Suite bedroom with terracotta channel-tufted double and single beds, green Guardamar runner, arched alcove and balcony window',
      },
      {
        src: suiteSrc('junior/501A0601.JPG'),
        alt: 'Junior Suite bedroom with terracotta beds, green accent pillows, wall-mounted TV and arched headboard niche',
      },
      {
        src: suiteSrc('junior/501A0609R.JPG'),
        alt: 'Junior Suite beds beneath the arched alcove with branded bathrobe, gold Guardamar logo and green pillows',
      },
      {
        src: suiteSrc('junior/501A0613.JPG'),
        alt: 'Junior Suite seen from the entrance with terracotta beds, louvered wardrobe and wall-mounted TV',
      },
      {
        src: suiteSrc('junior/501A0618.JPG'),
        alt: 'Junior Suite wooden desk and dressing corner with kettle, orange pouf and wall-mounted TV',
      },
      {
        src: suiteSrc('junior/501A0655.JPG'),
        alt: 'Junior Suite tea station with kettle and a warm woven pendant light beside the walnut wall',
      },
      {
        src: suiteSrc('junior/501A0631.JPG'),
        alt: 'Junior Suite balcony with a wide Mediterranean sea view over the beach and Guardamar',
      },
      {
        src: suiteSrc('junior/501A0597.JPG'),
        alt: 'Junior Suite balcony with woven chairs, sliding glass doors and sea view over the town',
      },
      {
        src: suiteSrc('junior/501A0623R.JPG'),
        alt: 'Junior Suite bathroom with copper-toned tiles, backlit round mirror, vessel sink, glass shower and wall-hung toilet',
      },
      {
        src: suiteSrc('junior/501A0630.JPG'),
        alt: 'Junior Suite bathroom with walk-in glass shower, copper tiles, backlit round mirror and vessel sink vanity',
      },
      {
        src: suiteSrc('junior/501A0653.JPG'),
        alt: 'Junior Suite backlit round mirror reflecting the bathroom beside the copper-tiled shower',
      },
      {
        src: suiteSrc('junior/501A0650.JPG'),
        alt: 'Close-up of the Junior Suite white vessel sink with a tall matte-black faucet and folded branded towels',
      },
      {
        src: suiteSrc('junior/501A0646.JPG'),
        alt: 'Junior Suite walk-in shower detail with copper tiles, black fixtures and premium Lalique amenities',
      },
      {
        src: suiteSrc('junior/501A0647.JPG'),
        alt: 'Junior Suite bathroom with wall-hung toilet, black fixtures and heated towel rail',
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
        src: suiteSrc('standard-view-double/501A0670.JPG'),
        alt: 'Standard room with view bedroom with terracotta bed, green Guardamar pillows, woven pendants and balcony doors to the sea',
      },
      {
        src: suiteSrc('standard-view-double/501A0678.JPG'),
        alt: 'Standard room with view double bed from the foot with gold Guardamar logo, green runner and roses on the nightstand',
      },
      {
        src: suiteSrc('standard-view-double/501A0661.JPG'),
        alt: 'Standard room with view bed beneath the plaster arch beside an open louvered wardrobe',
      },
      {
        src: suiteSrc('standard-view-double/501A0677.JPG'),
        alt: 'Green velvet Guardamar Hotel & Spa pillows on the Standard room with view bed',
      },
      {
        src: suiteSrc('standard-view-double/501A0675.JPG'),
        alt: 'Standard room with view bedside with fresh roses, terracotta headboard and woven pendant light',
      },
      {
        src: suiteSrc('standard-view-double/501A0573.JPG'),
        alt: 'Green Guardamar pillow on the Standard room with view bed beneath a woven pendant light',
      },
      {
        src: suiteSrc('standard-view-double/501A0654.JPG'),
        alt: 'Guardamar Hotel & Spa branded bathrobe laid on the Standard room with view bed',
      },
      {
        src: suiteSrc('standard-view-double/501A0633.JPG'),
        alt: 'Standard room with view balcony with a wide Mediterranean sea view over the beach',
      },
      {
        src: suiteSrc('standard-view-double/501A0679.JPG'),
        alt: 'Sea view over the Guardamar rooftops from the Standard room with view balcony',
      },
      {
        src: suiteSrc('standard-view-double/501A0680.JPG'),
        alt: 'Standard room with view balcony with bistro table, chair and Mediterranean sea view',
      },
      {
        src: suiteSrc('standard-view-double/501A0567.JPG'),
        alt: 'Standard room with view balcony with the sea between neighbouring buildings',
      },
      {
        src: suiteSrc('standard-view-double/501A0571.JPG'),
        alt: 'Standard room with view balcony with woven chair and a glimpse of the sea',
      },
      {
        src: suiteSrc('standard-view-double/501A0569.JPG'),
        alt: 'Standard room with view balcony with woven chairs overlooking the hotel terraces',
      },
      {
        src: suiteSrc('standard-view-double/501A0570.JPG'),
        alt: 'Standard room with view balcony overlooking the town and palm trees',
      },
      {
        src: suiteSrc('standard-view-double/501A0596.JPG'),
        alt: 'Standard room with view open wardrobe with bathrobe, hangers, spare linen and in-room safe',
      },
      {
        src: suiteSrc('standard-view-double/501A0595.JPG'),
        alt: 'In-room safe inside the louvered wardrobe of the Standard room with view',
      },
      {
        src: suiteSrc('standard-view-double/501A0689.JPG'),
        alt: 'Standard room with view bathroom with green bamboo tiles, backlit round mirror, vessel sink and rain shower',
      },
      {
        src: suiteSrc('standard-view-double/501A0692.JPG'),
        alt: 'Standard room with view bathroom vanity with backlit round mirror and green tiles seen from the bedroom',
      },
      {
        src: suiteSrc('standard-view-double/501A0587.JPG'),
        alt: 'Standard room with view vessel sink with black faucet and Lalique soap against backlit green tiles',
      },
      {
        src: suiteSrc('standard-view-double/501A0593.JPG'),
        alt: 'Folded Guardamar branded towels and hairdryer beside the vessel sink in the Standard room with view',
      },
      {
        src: suiteSrc('standard-view-double/501A0586.JPG'),
        alt: 'Rolled Guardamar towel in a woven basket against the green tiles of the Standard room with view bathroom',
      },
      {
        src: suiteSrc('standard-view-double/501A0681.JPG'),
        alt: 'Standard room with view bathroom with heated towel rail, Guardamar bathrobe and magnifying mirror',
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
        src: suiteSrc('standard-partial-double/501A0534.JPG'),
        alt: 'Standard room partial view with two terracotta twin beds, green Guardamar runners, woven pendants and window',
      },
      {
        src: suiteSrc('standard-partial-double/501A0547.JPG'),
        alt: 'Standard room partial view twin beds with green Guardamar pillows, roses and full-length curtains',
      },
      {
        src: suiteSrc('standard-partial-double/501A0537.JPG'),
        alt: 'Standard room partial view desk with LED mirror, kettle, orange pouf and twin beds',
      },
      {
        src: suiteSrc('standard-partial-double/501A0577.JPG'),
        alt: 'Standard room partial view twin beds side by side under tasselled woven pendants',
      },
      {
        src: suiteSrc('standard-partial-double/501A0538.JPG'),
        alt: 'Standard room partial view twin beds with wall-mounted TV and white louvered wardrobe',
      },
      {
        src: suiteSrc('standard-partial-double/501A0594.JPG'),
        alt: 'Standard room partial view bedside with roses, terracotta headboards and woven pendant light',
      },
      {
        src: suiteSrc('standard-partial-double/501A0584.JPG'),
        alt: 'Standard room partial view twin beds with green Guardamar pillows and fresh roses on the nightstand',
      },
      {
        src: suiteSrc('standard-partial-double/501A0574.JPG'),
        alt: 'Green velvet Guardamar Hotel & Spa pillow on the Standard room partial view bed',
      },
      {
        src: suiteSrc('standard-partial-double/501A0575.JPG'),
        alt: 'Standard room partial view single bed with terracotta headboard, green pillow and woven pendant',
      },
      {
        src: suiteSrc('standard-partial-double/501A0576.JPG'),
        alt: 'Standard room partial view bed with green Guardamar pillow beneath a tasselled pendant light',
      },
      {
        src: suiteSrc('standard-partial-double/501A0632.JPG'),
        alt: 'Standard room partial view private balcony with two woven chairs beside the glass doors',
      },
      {
        src: suiteSrc('standard-partial-double/501A0554.JPG'),
        alt: 'Standard room partial view bathroom seen from the bedroom with green tiles and glass shower',
      },
      {
        src: suiteSrc('standard-partial-double/501A0555.JPG'),
        alt: 'Standard room partial view bathroom with backlit round mirror, vessel sink and green-tiled glass shower',
      },
      {
        src: suiteSrc('standard-partial-double/501A0561.JPG'),
        alt: 'Standard room partial view vanity with backlit round mirror, vessel sink and green-tiled rain shower',
      },
      {
        src: suiteSrc('standard-partial-double/501A0565o.JPG'),
        alt: 'Standard room partial view bathroom vanity with backlit mirror, hairdryer and folded towels',
      },
      {
        src: suiteSrc('standard-partial-double/501A0560.JPG'),
        alt: 'Standard room partial view bathroom with wall-hung toilet and green-tiled glass shower',
      },
      {
        src: suiteSrc('standard-partial-double/501A0588.JPG'),
        alt: 'Magnifying mirror and hairdryer beside the backlit mirror and green tiles in the Standard room partial view bathroom',
      },
      {
        src: suiteSrc('standard-partial-double/501A0589.JPG'),
        alt: 'Standard room partial view bathroom wall with magnifying mirror, hairdryer and green tiles',
      },
      {
        src: suiteSrc('standard-partial-double/501A0592.JPG'),
        alt: 'Standard room partial view rain shower with green bamboo tiles and Lalique amenities',
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
