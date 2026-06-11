import presidentialBedroomWide from './src/assets/suites/presidential/bedroom-wide-rattan-pendants.webp'
import presidentialBedroomCentered from './src/assets/suites/presidential/bedroom-centered-green-accents.webp'
import presidentialBedroomVanityCorner from './src/assets/suites/presidential/bedroom-vanity-nook-corner.webp'
import presidentialClosetVanity from './src/assets/suites/presidential/closet-vanity-dressing-area.webp'
import presidentialBalconyView from './src/assets/suites/presidential/bedroom-balcony-hydromassage-view.webp'
import presidentialBedGreenPillows from './src/assets/suites/presidential/bed-green-pillows-branding.webp'
import presidentialBedNightstand from './src/assets/suites/presidential/bed-nightstand-buddha-rattan-light.webp'
import presidentialBedroomLedAccent from './src/assets/suites/presidential/bedroom-led-accent-palm-arch.webp'
import presidentialBedroomRattanDetail from './src/assets/suites/presidential/bedroom-rattan-pendants-detail.webp'
import presidentialBathroomVanity from './src/assets/suites/presidential/bathroom-double-vanity-mirrors.webp'
import presidentialBathroomTubTowel from './src/assets/suites/presidential/bathroom-freestanding-tub-towel.webp'
import presidentialBathroomTubRoses from './src/assets/suites/presidential/bathroom-freestanding-tub-roses.webp'
import presidentialBathroomShower from './src/assets/suites/presidential/bathroom-walk-in-shower.webp'
import presidentialBathroomToilet from './src/assets/suites/presidential/bathroom-toilet-area.webp'
import presidentialBathroomWetRoom from './src/assets/suites/presidential/bathroom-wet-room-glass.webp'
import presidentialBathroomVanityTowel from './src/assets/suites/presidential/bathroom-vanity-towel-ring.webp'
import familyBedroomWide from './src/assets/suites/family/bedroom-wide-orange-headboard.webp'
import familyBedroomCentered from './src/assets/suites/family/bedroom-centered-branded-bed.webp'
import familyBedNightstandRoses from './src/assets/suites/family/bed-nightstand-white-roses.webp'
import familyBedGreenPillows from './src/assets/suites/family/bed-green-pillows-detail.webp'
import familyBedCaneNightstand from './src/assets/suites/family/bed-cane-nightstand-detail.webp'
import familyBedGreenBrandedPillow from './src/assets/suites/family/bed-green-branded-pillow.webp'
import familyBedLinenDetail from './src/assets/suites/family/bed-guardamar-linen-detail.webp'
import familyBedroomTvVanity from './src/assets/suites/family/bedroom-tv-vanity-corner.webp'
import familyBalconySeaView from './src/assets/suites/family/balcony-chairs-sea-view.webp'
import familyBathroomShower from './src/assets/suites/family/bathroom-shower-terracotta.webp'
import familyBathroomMirror from './src/assets/suites/family/bathroom-vanity-mirror.webp'
import familyBathroomSink from './src/assets/suites/family/bathroom-sink-detail.webp'
import familyBathroomAmenities from './src/assets/suites/family/bathroom-lalique-amenities.webp'
import familyBathroomTowel from './src/assets/suites/family/bathroom-branded-towel.webp'
import familyBathroomBathrobes from './src/assets/suites/family/bathroom-branded-bathrobes.webp'
import juniorRoomFromEntrance from './src/assets/suites/junior-partial-view/room-from-entrance.webp'
import juniorBedroomWide from './src/assets/suites/junior-partial-view/bedroom-wide-rattan-lights.webp'
import juniorBalconyDoorOpen from './src/assets/suites/junior-partial-view/balcony-door-open-sea-view.webp'
import juniorBalconyChairs from './src/assets/suites/junior-partial-view/balcony-chairs-partial-sea-view.webp'
import juniorClosetBalcony from './src/assets/suites/junior-partial-view/closet-balcony-partial-sea-view.webp'
import juniorBedroomFull from './src/assets/suites/junior-partial-view/bedroom-full-rattan-pendants.webp'
import juniorBedWide from './src/assets/suites/junior-partial-view/bed-wide-orange-headboard.webp'
import juniorBedSeashellArt from './src/assets/suites/junior-partial-view/bed-seashell-wall-art.webp'
import juniorBedShellCloseUp from './src/assets/suites/junior-partial-view/bed-shell-art-close-up.webp'
import juniorBedGreenPillows from './src/assets/suites/junior-partial-view/bed-green-pillows-detail.webp'
import juniorBedNightstandLight from './src/assets/suites/junior-partial-view/bed-nightstand-rattan-light.webp'
import juniorBedNightstandGlasses from './src/assets/suites/junior-partial-view/bed-nightstand-wine-glasses.webp'
import juniorWallTv from './src/assets/suites/junior-partial-view/wall-mounted-tv.webp'
import juniorClosetSeaView from './src/assets/suites/junior-partial-view/closet-balcony-sea-view.webp'
import juniorEntranceHallway from './src/assets/suites/junior-partial-view/entrance-hallway.webp'
import standardViewShower from './src/assets/suites/standard-view-double/bathroom-shower-green-tiles.webp'
import standardViewTowelsStacked from './src/assets/suites/standard-view-double/branded-towels-stacked.webp'
import standardViewVanity from './src/assets/suites/standard-view-double/bathroom-vanity-mirror-hairdryer.webp'
import standardViewTowelsShower from './src/assets/suites/standard-view-double/branded-towels-shower.webp'
import standardViewHairdryer from './src/assets/suites/standard-view-double/wall-mounted-hairdryer.webp'

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
        src: presidentialBedroomWide,
        alt: 'Presidential suite bedroom with terracotta headboard, green accents, and woven rattan pendant lights',
      },
      {
        src: presidentialBedroomCentered,
        alt: 'Presidential suite bed with Guardamar branding, palm tree wallpaper, and cane-front nightstands',
      },
      {
        src: presidentialBedroomVanityCorner,
        alt: 'Presidential suite bedroom with terracotta headboard, vanity nook, and palm tree mural',
      },
      {
        src: presidentialClosetVanity,
        alt: 'Presidential suite dressing area with louvered wardrobe, vanity desk, and palm tree wallpaper',
      },
      {
        src: presidentialBalconyView,
        alt: 'Presidential suite bedroom view toward balcony with private hydromassage tub beyond sheer curtains',
      },
      {
        src: presidentialBedGreenPillows,
        alt: 'Presidential suite bed close-up with green velvet pillows, Guardamar embroidery, and tropical palm wallpaper',
      },
      {
        src: presidentialBedNightstand,
        alt: 'Presidential suite bedside with cane-front nightstand, Buddha figurine, and woven rattan pendant light',
      },
      {
        src: presidentialBedroomLedAccent,
        alt: 'Presidential suite bedroom with arched alcove, palm wallpaper, LED accent lighting, and rattan pendants',
      },
      {
        src: presidentialBedroomRattanDetail,
        alt: 'Presidential suite bed with woven rattan pendant lights, palm tree mural, and Buddha nightstand',
      },
      {
        src: presidentialBathroomVanity,
        alt: 'Presidential suite bathroom with double vanity, backlit round mirrors, and olive fluted tile wall',
      },
      {
        src: presidentialBathroomTubRoses,
        alt: 'Presidential suite bathroom with freestanding tub, wood-paneled wall, and rose petals on the floor',
      },
      {
        src: presidentialBathroomTubTowel,
        alt: 'Presidential suite freestanding bathtub with rose petals, fairy lights, and Guardamar branded towel',
      },
      {
        src: presidentialBathroomShower,
        alt: 'Presidential suite walk-in rain shower with matte black fixtures and beige stone tiles',
      },
      {
        src: presidentialBathroomToilet,
        alt: 'Presidential suite bathroom with wall-hung toilet, backlit mirror, and beige stone finishes',
      },
      {
        src: presidentialBathroomWetRoom,
        alt: 'Presidential suite glass wet room with freestanding tub, rain shower, and rose petals',
      },
      {
        src: presidentialBathroomVanityTowel,
        alt: 'Presidential suite double vanity with backlit mirrors and Guardamar hand towel',
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
        src: juniorRoomFromEntrance,
        alt: 'Junior Suite bedroom viewed from the entrance hallway with balcony and natural light',
      },
      {
        src: juniorBedroomWide,
        alt: 'Junior Suite bedroom with terracotta headboard, green accents and woven rattan pendant lights',
      },
      {
        src: juniorBalconyDoorOpen,
        alt: 'Junior Suite balcony doors open to a private terrace with partial sea views',
      },
      {
        src: juniorBalconyChairs,
        alt: 'Junior Suite private balcony with woven chairs, table and partial Mediterranean sea view',
      },
      {
        src: juniorClosetBalcony,
        alt: 'Junior Suite with louvered closet and balcony overlooking the sea',
      },
      {
        src: juniorBedroomFull,
        alt: 'Junior Suite full bedroom view with Guardamar branded linens and coastal décor',
      },
      {
        src: juniorBedWide,
        alt: 'Junior Suite double bed with orange upholstered headboard and seashell wall art',
      },
      {
        src: juniorBedSeashellArt,
        alt: 'Junior Suite bed with green velvet pillows and framed seashell artwork above the headboard',
      },
      {
        src: juniorBedShellCloseUp,
        alt: 'Close-up of the Junior Suite bed with Guardamar embroidered green accent pillows',
      },
      {
        src: juniorBedGreenPillows,
        alt: 'Junior Suite bedding detail with green runner and branded velvet accent pillows',
      },
      {
        src: juniorBedNightstandLight,
        alt: 'Junior Suite bedside area with woven rattan pendant light and cane-front nightstand',
      },
      {
        src: juniorBedNightstandGlasses,
        alt: 'Junior Suite nightstand with wine glasses beneath a fringed rattan pendant lamp',
      },
      {
        src: juniorWallTv,
        alt: 'Junior Suite wall-mounted flat-screen TV above the bed with green runner linens',
      },
      {
        src: juniorClosetSeaView,
        alt: 'Junior Suite closet and open balcony door with bright sea views',
      },
      {
        src: juniorEntranceHallway,
        alt: 'Junior Suite private entrance hallway with warm textured walls and wood flooring',
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
        src: juniorRoomFromEntrance,
        alt: 'Standard room partial view bedroom seen from the entrance hallway with balcony light',
      },
      {
        src: juniorBedroomWide,
        alt: 'Standard room partial view with terracotta headboard, green accents and rattan pendant lights',
      },
      {
        src: juniorBalconyDoorOpen,
        alt: 'Standard room partial view balcony doors open to a terrace with partial sea views',
      },
      {
        src: juniorBalconyChairs,
        alt: 'Standard room partial view private balcony with woven chairs and partial Mediterranean sea view',
      },
      {
        src: juniorClosetBalcony,
        alt: 'Standard room partial view with louvered closet and balcony overlooking the sea',
      },
      {
        src: juniorBedroomFull,
        alt: 'Standard room partial view full bedroom with Guardamar branded linens and coastal décor',
      },
      {
        src: juniorBedWide,
        alt: 'Standard room partial view double bed with orange upholstered headboard and seashell wall art',
      },
      {
        src: juniorBedSeashellArt,
        alt: 'Standard room partial view bed with green velvet pillows and framed seashell artwork',
      },
      {
        src: juniorBedShellCloseUp,
        alt: 'Close-up of the Standard room partial view bed with Guardamar embroidered green accent pillows',
      },
      {
        src: juniorBedGreenPillows,
        alt: 'Standard room partial view bedding detail with green runner and branded velvet accent pillows',
      },
      {
        src: juniorBedNightstandLight,
        alt: 'Standard room partial view bedside area with woven rattan pendant light and cane-front nightstand',
      },
      {
        src: juniorBedNightstandGlasses,
        alt: 'Standard room partial view nightstand with wine glasses beneath a fringed rattan pendant lamp',
      },
      {
        src: juniorWallTv,
        alt: 'Standard room partial view wall-mounted flat-screen TV above the bed with green runner linens',
      },
      {
        src: juniorClosetSeaView,
        alt: 'Standard room partial view closet and open balcony door with bright sea views',
      },
      {
        src: juniorEntranceHallway,
        alt: 'Standard room partial view private entrance hallway with warm textured walls and wood flooring',
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
