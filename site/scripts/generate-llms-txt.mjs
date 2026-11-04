/**
 * Writes `dist/llms.txt` and `dist/llms-full.txt` — plain-Markdown summaries of the hotel for AI
 * assistants (ChatGPT, Claude, Perplexity, Gemini…), following https://llmstxt.org.
 *
 * Most AI crawlers do not run JavaScript, so the SPA's content is invisible to them; these files
 * give them the facts directly. Everything is read from the site's own data (config, i18n, room
 * meta), so the files stay in sync with the pages. Runs at the end of `npm run build`, after
 * `vite build` has created `dist/` — the output is a build artifact, never committed.
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import {
  BOOKING_URL,
  CONTACT,
  GOLF_ENQUIRY,
  isPathAllowedInLandingMode,
  SITE_ORIGIN_DEFAULT,
} from '../src/config/site.js'
import en from '../src/i18n/en.js'
import { ROOM_SEO_META } from '../src/seo/roomMeta.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteRoot = join(__dirname, '..')
const distDir = join(siteRoot, 'dist')

const env = loadEnv('production', siteRoot, '')
const origin = (env.VITE_SITE_ORIGIN || SITE_ORIGIN_DEFAULT).replace(/\/+$/, '')
const url = (path) => `${origin}${path}`

/** Room title without the " — Hotel Guardamar" SEO suffix. */
const roomName = (meta) => meta.en.title.split(' — ')[0]

const rooms = Object.entries(ROOM_SEO_META)
const roomTotal = rooms.reduce((sum, [, meta]) => sum + (meta.quantity || 0), 0)

const facts = en.restaurant.facts
const stay = en.rules.facts

/** Public pages, in reading order. Pages locked in landing mode are left out. */
const PAGES = [
  { path: '/', name: 'Home', desc: en.seo.description },
  { path: '/suites-rooms', name: 'Suites & Rooms', desc: en.seo.descriptionSuites },
  ...rooms.map(([slug, meta]) => ({
    path: `/suites-rooms/${slug}`,
    name: roomName(meta),
    desc: meta.en.description,
  })),
  { path: '/restaurant-bar', name: 'Aristo Restaurant & Bar', desc: en.seo.descriptionRestaurant },
  { path: '/menu', name: 'Menu of the day', desc: en.seo.descriptionMenu },
  { path: '/spa', name: 'Spa', desc: en.seo.descriptionSpa },
  { path: '/moments', name: 'Moments — offers and events', desc: en.seo.descriptionMoments },
  { path: '/moments/golf', name: 'Golf escape on the Costa Blanca', desc: en.seo.descriptionGolf },
  { path: '/moments/guardamar', name: 'Guardamar del Segura destination guide', desc: en.seo.descriptionGuardamar },
  { path: '/contacts', name: 'Contacts', desc: en.seo.descriptionContacts },
  { path: '/rules', name: 'Hotel rules', desc: en.seo.descriptionRules },
  { path: '/terms', name: 'Terms & conditions', desc: en.seo.descriptionTerms },
  { path: '/privacy', name: 'Privacy policy', desc: en.seo.descriptionPrivacy },
].filter((p) => isPathAllowedInLandingMode(p.path))

const pageLinks = (filter) =>
  PAGES.filter(filter)
    .map((p) => `- [${p.name}](${url(p.path)}): ${p.desc}`)
    .join('\n')

const isOptional = (p) => ['/terms', '/privacy'].includes(p.path)

const header = `# ${CONTACT.hotelName}

> ${en.seo.description}

${CONTACT.hotelName} is a renovated boutique hotel in Guardamar del Segura (Alicante, Spain), on the southern Costa Blanca, about 25 km from Alicante-Elche airport. It has ${roomTotal} rooms and suites, many with sea views, the Aristo restaurant and bar, a pool and spa, and is a base for beach holidays and golf breaks. The website is available in English and Spanish.

- Address: ${CONTACT.addressLines.join(', ')}
- Phone: ${CONTACT.phoneDisplay}
- Email: ${CONTACT.email}
- Book online: ${BOOKING_URL}
- Instagram: ${CONTACT.instagramHref}`

const llmsTxt = `${header}

## Pages

${pageLinks((p) => !isOptional(p))}

## Optional

${pageLinks(isOptional)}
- [Full details for AI assistants](${url('/llms-full.txt')}): rooms, dining hours, hotel rules, and offers in one file.
`

const roomSection = rooms
  .map(([slug, meta]) => {
    const beds = meta.beds.map((b) => `${b.count} × ${b.type.toLowerCase()}`).join(', ')
    return `### ${roomName(meta)}

${meta.en.description}

- Rooms of this type: ${meta.quantity}
- Size: ${meta.areaM2} m²
- Guests: up to ${meta.capacity}
- Beds: ${beds}
- View: ${meta.view}
- Amenities: ${meta.amenities.join(', ')}
- Page: ${url(`/suites-rooms/${slug}`)}`
  })
  .join('\n\n')

const rulesSection = Object.values(en.rules.sections)
  .map((section) => `### ${section.title}\n\n${section.items.map((item) => `- ${item}`).join('\n')}`)
  .join('\n\n')

const llmsFullTxt = `${header}

## Stay at a glance

- ${stay.checkIn.label}: ${stay.checkIn.value}
- ${stay.checkOut.label}: ${stay.checkOut.value}
- ${stay.reception.label}: ${stay.reception.value}
- ${stay.quiet.label}: ${stay.quiet.value}
- ${facts.breakfast.label}: ${facts.breakfast.value}
- ${facts.restaurant.label}: ${facts.restaurant.value}
- ${facts.bar.label}: ${facts.bar.value}
- ${facts.reservations.label}: ${facts.reservations.value}

## Suites & rooms

${en.roomsCommon.suitesLead}

${roomSection}

## Dining — ${en.restaurant.title}

${en.restaurant.intro}

${en.restaurant.restaurantBody1}

${en.restaurant.restaurantBody2}

${en.restaurant.barBody1}

${en.restaurant.barBody2}

Today's menu: ${url('/menu')}

## Golf escape on the Costa Blanca

${en.moments.golfDesc}

Golf proposals are tailored to each group and player — accommodation, breakfast, green fees, transfers, and golf experiences. Request one through the form at ${url('/moments/golf')} or by email at ${GOLF_ENQUIRY.email}.

## Guardamar del Segura

${en.seo.descriptionGuardamar}

Destination guide: ${url('/moments/guardamar')}

## Hotel rules

${en.rules.intro}

${rulesSection}

## Pages

${pageLinks(() => true)}
`

writeFileSync(join(distDir, 'llms.txt'), llmsTxt, 'utf8')
writeFileSync(join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf8')
console.log(`Wrote dist/llms.txt and dist/llms-full.txt (${PAGES.length} pages, origin=${origin})`)
