import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import boardwalkDunes from '../assets/moments/guardamarPhotos/boardwalk-dunes.webp'
import townSkyline from '../assets/moments/guardamarPhotos/town-skyline.webp'
import pinadaSea from '../assets/moments/guardamarPhotos/pinada-sea.webp'
import lighthouseJetty from '../assets/moments/guardamarPhotos/lighthouse-jetty.webp'
import langostinoNyora from '../assets/moments/guardamarPhotos/langostino-nyora.webp'
import laFonteta from '../assets/moments/guardamarPhotos/la-fonteta.webp'
import castillo from '../assets/moments/guardamarPhotos/castillo.webp'
import ducksVideo from '../assets/moments/guardamarPhotos/reina-sofia-ducks.mp4'
import motherDuck from '../assets/moments/guardamarPhotos/reina-sofia-mother-duck.webp'
import ducklings from '../assets/moments/guardamarPhotos/reina-sofia-ducklings.webp'
import plantImage from '../assets/home/plant.webp'
import { BOOKING_URL } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'

const easeSmooth = [0.4, 0, 0.2, 1]

/** Google Maps → Parque Reina Sofía, Guardamar del Segura (shared by both locales). */
const REINA_SOFIA_MAP = 'https://maps.app.goo.gl/W2XDC6dWHQvfkQa67'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: easeSmooth },
}

/**
 * Destination guide for Guardamar del Segura, linked from the Moments → Costa Blanca panel.
 * Long-form content is co-located here (rather than the shared i18n UI strings) and keyed by
 * locale; photos and the Reina Sofía duck video live in src/assets/moments/guardamarPhotos.
 */
const GUIDE = {
  es: {
    back: 'Momentos · Costa Blanca',
    eyebrow: 'Costa Blanca · Alicante',
    title: 'Guardamar del Segura',
    lead:
      'Situado al sur de la Comunitat Valenciana y de la Costa Blanca, a tan solo 25 kilómetros del Aeropuerto Internacional de Alicante-Elche, Guardamar del Segura combina tradición mediterránea, naturaleza y un modelo turístico sostenible que lo diferencia dentro del litoral alicantino.',
    lead2:
      'Aproximadamente el 80 % del término municipal cuenta con algún tipo de protección ambiental, lo que ha permitido conservar dunas, pinares y zonas húmedas únicas en el Mediterráneo español. Playa, patrimonio histórico y espacios naturales en un mismo destino: por eso se ha consolidado como uno de los enclaves más singulares del sur de la Costa Blanca.',
    heroAlt:
      'Pasarela de madera serpenteando entre las dunas de Guardamar hacia el mar Mediterráneo al atardecer',
    stats: [
      { value: '≈80 %', label: 'del territorio protegido' },
      { value: '800 ha', label: 'de bosque dunar' },
      { value: '11 km', label: 'de playas' },
      { value: '5', label: 'Banderas Azules' },
    ],
    blocks: [
      {
        key: 'entorno',
        kicker: 'Entorno natural',
        title: 'Entorno natural de Guardamar',
        image: townSkyline,
        imageSide: 'right',
        imageAlt:
          'Vista costera de Guardamar con casas blancas y el campanario del pueblo entre pinares y playa',
        paragraphs: [
          'Cerca del 80 % del territorio municipal, a orillas del mar, está protegido: dunas, pinares y zonas húmedas únicas en el Mediterráneo español. A ello se suman los cabezos, pequeñas elevaciones con vistas al río, la huerta y el mar.',
        ],
      },
      {
        key: 'pinada',
        kicker: 'La Pinada',
        title: 'La Pinada de Guardamar',
        image: pinadaSea,
        imageSide: 'left',
        imageAlt: 'Mar en calma y orilla arenosa vistos entre los pinos de la Pinada de Guardamar',
        paragraphs: [
          'El bosque dunar más espectacular del Mediterráneo español: 800 hectáreas plantadas a finales del siglo XIX para frenar el avance de las dunas. Hoy es un corredor natural de playas, parques y senderos, ideal para caminar o ir en bicicleta.',
        ],
      },
      {
        key: 'rio',
        kicker: 'Río Segura',
        title: 'Desembocadura del río Segura',
        image: lighthouseJetty,
        imageSide: 'right',
        imageAlt: 'Faro rojo sobre el espigón de la desembocadura del río Segura frente al Mediterráneo',
        paragraphs: [
          'La desembocadura, conocida como La Gola, es refugio de aves acuáticas y especies migratorias. Su puerto pesquero, las salinas vecinas y la huerta de acequias medievales completan un mosaico de ecosistemas único.',
        ],
      },
      {
        key: 'gastronomia',
        kicker: 'Gastronomía',
        title: 'Gastronomía de Guardamar',
        image: langostinoNyora,
        imageSide: 'left',
        imageAlt: 'Langostinos de Guardamar con ñoras secas y un fondo de salsa en un plato',
        paragraphs: [
          'Producto fresco y de proximidad: el langostino de Guardamar, el arroz a banda, el caldero y la ñora. Su gran cita es la Setmana Gastronòmica de la Nyora i el Llagostí, cada junio desde 2005.',
        ],
      },
      {
        key: 'arqueologia',
        kicker: 'Historia',
        title: 'La Fonteta y la Rábita Califal',
        image: laFonteta,
        imageSide: 'right',
        imageAlt: 'Restos arqueológicos de La Fonteta sobre la arena junto al litoral de Guardamar',
        paragraphs: [
          'Fenicios y andalusíes dejaron su huella: el yacimiento de La Fonteta y la Rábita Califal, un enclave islámico junto al litoral, revelan la importancia estratégica de Guardamar a lo largo de los siglos.',
        ],
      },
      {
        key: 'castillo',
        kicker: 'Patrimonio',
        title: 'El Castillo de Guardamar',
        image: castillo,
        imageSide: 'left',
        imageAlt: 'Vista aérea del recinto amurallado del Castillo de Guardamar sobre el pueblo y el mar',
        paragraphs: [
          'En lo alto del pueblo, el Castillo ofrece vistas del río, la huerta y el mar. Aunque no se conserva entero, sigue siendo el mirador desde el que se lee la historia de la localidad.',
        ],
      },
    ],
    beaches: {
      kicker: 'Litoral',
      title: 'Las mejores playas de la provincia',
      paragraph:
        'Más de 11 kilómetros de litoral entre zonas urbanas y tramos naturales rodeados de dunas y vegetación autóctona. Entre las más conocidas, la Platja Centre, La Roqueta o El Montcaio, con largos paseos junto al mar durante todo el año.',
      flagTitle: '¿Qué es la Bandera Azul?',
      flagBody:
        'Es un distintivo internacional que concede cada año la Fundación para la Educación Ambiental (FEE) a las playas que cumplen exigentes criterios de calidad del agua, seguridad, servicios y gestión ambiental. Guardamar luce 5 Banderas Azules en 6 playas —la de Camp-Ortigues es compartida—, garantía de un mar limpio y una arena cuidada.',
      flagAlt: 'Bandera Azul ondeando, distintivo de calidad de las playas',
      flagStat: 'Banderas Azules',
      flagStatSub: 'en 6 playas',
    },
    park: {
      kicker: 'En familia',
      title: 'Parque Reina Sofía',
      lead:
        'A pocos minutos del hotel, el Parque Reina Sofía es un remanso verde alrededor de un gran lago habitado por patos y sus crías. Un paseo sombreado entre pinos, ideal para ir en familia y descubrir la fauna del parque.',
      videoAlt: 'Patos nadando en el lago del Parque Reina Sofía de Guardamar',
      photo1Alt: 'Pata con sus patitos a la orilla del lago del Parque Reina Sofía',
      photo2Alt: 'Patitos recién nacidos nadando juntos en el lago del parque',
      mapLabel: 'Ver en el mapa',
    },
    doing: {
      kicker: 'Planes',
      title: 'Qué hacer en Guardamar',
      intro:
        'Guardamar ofrece propuestas para todo tipo de viajeros, desde el turismo activo hasta las escapadas familiares o las estancias para relajarse. Playa y naturaleza pueden combinarse en el mismo día.',
      activities: [
        'Senderismo por la pinada',
        'Rutas en bicicleta',
        'Actividades acuáticas',
        'Paseos a caballo',
        'Excursiones guiadas',
        'Puerto deportivo Marina de las Dunas',
      ],
      agendaTitle: 'Agenda cultural',
      agenda:
        'Guardamar mantiene vivo su vínculo con el Mediterráneo a través de una amplia agenda cultural: cine, teatro, música en vivo, exposiciones de arte, literatura y actividades infantiles forman parte de un programa que se renueva cada mes.',
    },
    ctaTitle: 'Su base para descubrir Guardamar',
    ctaBody:
      'Playa, pinada y patrimonio a un paso del hotel. Reserve su estancia y viva la Costa Blanca a su ritmo.',
    ctaBook: 'Reservar estancia',
    ctaBack: 'Volver a Momentos',
  },
  en: {
    back: 'Moments · Costa Blanca',
    eyebrow: 'Costa Blanca · Alicante',
    title: 'Guardamar del Segura',
    lead:
      'Set in the south of the Valencian Community and the Costa Blanca, just 25 kilometres from Alicante-Elche International Airport, Guardamar del Segura blends Mediterranean tradition, nature, and a sustainable approach to tourism that sets it apart along the Alicante coast.',
    lead2:
      'Around 80% of the municipality is under some form of environmental protection, preserving dunes, pine forests, and wetlands that are unique to the Spanish Mediterranean. Beach, heritage, and wild landscapes in a single destination — which is why it has become one of the most distinctive spots on the southern Costa Blanca.',
    heroAlt:
      'Wooden boardwalk winding through the dunes of Guardamar towards the Mediterranean Sea at sunset',
    stats: [
      { value: '≈80%', label: 'of land protected' },
      { value: '800 ha', label: 'of dune forest' },
      { value: '11 km', label: 'of beaches' },
      { value: '5', label: 'Blue Flags' },
    ],
    blocks: [
      {
        key: 'entorno',
        kicker: 'Natural setting',
        title: 'The natural setting of Guardamar',
        image: townSkyline,
        imageSide: 'right',
        imageAlt:
          'Coastal view of Guardamar with white houses and the town bell tower among pine woods and beach',
        paragraphs: [
          'Close to 80% of the coastal municipality is protected — dunes, pine forests, and wetlands unique to the Spanish Mediterranean. Adding to it are the cabezos, small rises with sweeping views over the river, the gardens, and the sea.',
        ],
      },
      {
        key: 'pinada',
        kicker: 'The pine forest',
        title: 'The Pinada of Guardamar',
        image: pinadaSea,
        imageSide: 'left',
        imageAlt: 'Calm sea and sandy shore seen through the pines of the Guardamar Pinada',
        paragraphs: [
          'The most spectacular dune forest on the Spanish Mediterranean — 800 hectares planted in the late 19th century to hold back the dunes. Today it is a natural corridor of beaches, parks, and trails, perfect on foot or by bike.',
        ],
      },
      {
        key: 'rio',
        kicker: 'Segura river',
        title: 'The mouth of the Segura river',
        image: lighthouseJetty,
        imageSide: 'right',
        imageAlt: 'Red lighthouse on the jetty at the mouth of the Segura river facing the Mediterranean',
        paragraphs: [
          'Its mouth, known as La Gola, shelters waterbirds and migratory species. The fishing port, the neighbouring salt lagoons, and gardens fed by medieval channels round out a rich mosaic of ecosystems.',
        ],
      },
      {
        key: 'gastronomia',
        kicker: 'Gastronomy',
        title: 'The gastronomy of Guardamar',
        image: langostinoNyora,
        imageSide: 'left',
        imageAlt: 'Guardamar prawns with dried ñora peppers and a rich sauce on a plate',
        paragraphs: [
          'Fresh, local produce: the Guardamar prawn, arroz a banda, caldero, and the ñora pepper. Its big date is the Setmana Gastronòmica de la Nyora i el Llagostí, held every June since 2005.',
        ],
      },
      {
        key: 'arqueologia',
        kicker: 'History',
        title: 'La Fonteta and the Caliphal Rábita',
        image: laFonteta,
        imageSide: 'right',
        imageAlt: 'Archaeological remains of La Fonteta on the sand beside the Guardamar coastline',
        paragraphs: [
          'Phoenicians and Andalusis left their mark: the La Fonteta site and the Caliphal Rábita, an Islamic enclave by the shore, reveal Guardamar’s strategic role across the centuries.',
        ],
      },
      {
        key: 'castillo',
        kicker: 'Heritage',
        title: 'The Castle of Guardamar',
        image: castillo,
        imageSide: 'left',
        imageAlt: 'Aerial view of the walled enclosure of Guardamar Castle above the town and the sea',
        paragraphs: [
          'High above the town, the Castle opens up views of the river, the gardens, and the sea. Though not fully preserved, it remains the vantage point from which the town’s history unfolds.',
        ],
      },
    ],
    beaches: {
      kicker: 'Coastline',
      title: 'The finest beaches in the province',
      paragraph:
        'Over 11 kilometres of coast, from lively urban stretches to wild sands backed by dunes and native vegetation. Among the favourites: Platja Centre, La Roqueta, and El Montcaio — long seaside walks all year round.',
      flagTitle: 'What is the Blue Flag?',
      flagBody:
        'An international award granted each year by the Foundation for Environmental Education (FEE) to beaches that meet demanding standards of water quality, safety, services, and environmental management. Guardamar flies 5 Blue Flags across 6 beaches (Camp-Ortigues is shared) — a guarantee of clean sea and well-kept sand.',
      flagAlt: 'A Blue Flag flying, the mark of beach quality',
      flagStat: 'Blue Flags',
      flagStatSub: 'across 6 beaches',
    },
    park: {
      kicker: 'For families',
      title: 'Reina Sofía Park',
      lead:
        'A few minutes from the hotel, Reina Sofía Park is a green retreat around a large lake home to ducks and their ducklings. A shaded stroll among the pines — perfect for families and for meeting the park’s wildlife.',
      videoAlt: 'Ducks swimming on the lake of Reina Sofía Park in Guardamar',
      photo1Alt: 'Mother duck with her ducklings at the edge of the Reina Sofía Park lake',
      photo2Alt: 'Newly hatched ducklings swimming together on the park lake',
      mapLabel: 'View on the map',
    },
    doing: {
      kicker: 'Things to do',
      title: 'What to do in Guardamar',
      intro:
        'Guardamar has something for every kind of traveller, from active tourism to family getaways and restful stays. Beach and nature can easily be combined in a single day.',
      activities: [
        'Hiking through the pinada',
        'Cycling routes',
        'Water activities',
        'Horse riding',
        'Guided excursions',
        'Marina de las Dunas yacht harbour',
      ],
      agendaTitle: 'Cultural calendar',
      agenda:
        'Guardamar keeps its bond with the Mediterranean alive through a full cultural calendar: cinema, theatre, live music, art exhibitions, literature, and children’s activities are all part of a programme that refreshes every month.',
    },
    ctaTitle: 'Your base for discovering Guardamar',
    ctaBody:
      'Beach, pine forest, and heritage a step from the hotel. Book your stay and take in the Costa Blanca at your own pace.',
    ctaBook: 'Book your stay',
    ctaBack: 'Back to Moments',
  },
}

function FeatureBlock({ block, index }) {
  if (!block.image) {
    return (
      <motion.article className="mx-auto max-w-[820px] text-center" {...reveal}>
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
          {block.kicker}
        </p>
        <h2 className="mt-4 font-cormorant text-[30px] font-normal leading-[1.1] text-[#171412] md:text-[38px]">
          {block.title}
        </h2>
        <div className="mx-auto mt-5 h-px w-16 bg-[#171412]/15" aria-hidden="true" />
        {block.paragraphs.map((p, i) => (
          <p key={i} className="mx-auto mt-5 max-w-[680px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
            {p}
          </p>
        ))}
      </motion.article>
    )
  }

  const imageLeft = block.imageSide === 'left'
  return (
    <motion.article
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
      {...reveal}
    >
      <div className={`relative overflow-hidden rounded-sm ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.img
          src={block.image}
          alt={block.imageAlt}
          loading={index < 1 ? 'eager' : 'lazy'}
          decoding="async"
          className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-[#062c26]/25 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className={`flex flex-col ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
          {block.kicker}
        </p>
        <h2 className="mt-4 font-cormorant text-[30px] font-normal leading-[1.1] text-[#171412] md:text-[38px]">
          {block.title}
        </h2>
        <div className="mt-5 h-px w-16 bg-[#171412]/15" aria-hidden="true" />
        {block.paragraphs.map((p, i) => (
          <p key={i} className="mt-5 font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
            {p}
          </p>
        ))}
      </div>
    </motion.article>
  )
}

function ReinaSofiaPark({ park }) {
  return (
    <motion.article
      {...reveal}
      className="overflow-hidden rounded-[14px] border border-[#0a3f35]/12 bg-linear-to-br from-[#0a3f35]/[0.06] via-transparent to-[#6e361b]/[0.04] shadow-[0_28px_70px_-42px_rgba(10,63,53,0.5)]"
    >
      <div className="grid lg:grid-cols-[1.55fr_1fr]">
        {/* Video hero */}
        <div className="relative min-h-[260px] overflow-hidden bg-[#0a3f35]/5 sm:min-h-[340px] lg:min-h-0">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={ducksVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={park.videoAlt}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#062c26]/45 via-transparent to-transparent"
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-[#0a3f35]/85 px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {park.kicker}
          </span>
        </div>

        {/* Copy + duck photos */}
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div>
            <h2 className="font-cormorant text-[26px] font-normal leading-[1.1] text-[#171412] md:text-[32px]">
              {park.title}
            </h2>
            <div className="mt-4 h-px w-12 bg-[#171412]/15" aria-hidden="true" />
            <p className="mt-4 font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]">
              {park.lead}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#0a3f35]/5">
              <img
                src={motherDuck}
                alt={park.photo1Alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#0a3f35]/5">
              <img
                src={ducklings}
                alt={park.photo2Alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          <a
            href={REINA_SOFIA_MAP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-[#0a3f35]/30 px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[#0a3f35] transition-colors hover:bg-[#0a3f35] hover:text-white"
          >
            <PinIcon />
            {park.mapLabel}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-6-5.686-6-10a6 6 0 0 1 12 0c0 4.314-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  )
}

function BlueFlagIcon({ className, title }) {
  return (
    <svg viewBox="0 0 72 72" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      {/* pole */}
      <rect x="15" y="7" width="3" height="58" rx="1.5" fill="#b8b0a2" />
      {/* waving flag */}
      <path
        d="M18 11c11-4 22 4 34 0.5v23C40 38 29 30 18 34V11Z"
        fill="#1f74b8"
      />
      {/* white emblem roundel */}
      <circle cx="36.5" cy="22.5" r="7.5" fill="#ffffff" />
      {/* stylised waves inside the roundel */}
      <path
        d="M31.5 21.4c1.15-1.35 2.4-1.35 3.5 0 1.15 1.35 2.4 1.35 3.5 0"
        fill="none"
        stroke="#1f74b8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M31.5 24.4c1.15-1.35 2.4-1.35 3.5 0 1.15 1.35 2.4 1.35 3.5 0"
        fill="none"
        stroke="#1f74b8"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BeachesBlock({ beaches }) {
  return (
    <motion.article {...reveal}>
      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
        {beaches.kicker}
      </p>
      <h2 className="mt-3 font-cormorant text-[27px] font-normal leading-[1.1] text-[#171412] md:text-[32px]">
        {beaches.title}
      </h2>
      <div className="mt-4 h-px w-12 bg-[#171412]/15" aria-hidden="true" />
      <p className="mt-4 max-w-[820px] font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]">
        {beaches.paragraph}
      </p>

      <div className="relative mt-8 overflow-hidden rounded-[14px] bg-linear-to-br from-[#0c3a5c] via-[#1f74b8] to-[#3f95d0] px-6 py-8 shadow-[0_26px_64px_-32px_rgba(18,58,90,0.75)] md:px-10 md:py-10">
        {/* decorative waves */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-[0.16]"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 34 Q 50 14 100 34 T 200 34 T 300 34 T 400 34" stroke="#fff" strokeWidth="2" />
          <path d="M0 48 Q 50 28 100 48 T 200 48 T 300 48 T 400 48" stroke="#fff" strokeWidth="2" />
        </svg>

        <div className="relative flex flex-col items-center gap-7 text-center md:flex-row md:items-center md:gap-10 md:text-left">
          <div className="shrink-0 rounded-full bg-white p-5 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.4)]">
            <BlueFlagIcon
              title={beaches.flagAlt}
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </div>
          <div className="max-w-[720px]">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <span className="font-cormorant text-[54px] font-normal leading-none text-white md:text-[64px]">
                5
              </span>
              <span className="flex flex-col text-left">
                <span className="font-sans text-[13px] font-medium uppercase tracking-[0.18em] text-white">
                  {beaches.flagStat}
                </span>
                <span className="font-sans text-[12px] font-[250] tracking-[0.06em] text-white/70">
                  {beaches.flagStatSub}
                </span>
              </span>
            </div>
            <h3 className="mt-5 font-cormorant text-[22px] font-normal leading-tight text-white md:text-[26px]">
              {beaches.flagTitle}
            </h3>
            <p className="mt-2 font-sans text-[15px] font-[250] leading-relaxed text-white/85">
              {beaches.flagBody}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function GuardamarPage() {
  const { locale } = useLanguage()
  const c = GUIDE[locale] ?? GUIDE.en

  return (
    <section className="relative -mt-16 overflow-hidden bg-[#f3eee6] pb-24 pt-24 md:pb-32 md:pt-32">
      <motion.img
        src={plantImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-24 hidden w-[min(380px,32vw)] opacity-[0.10] lg:block"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 0.9, ease: easeSmooth }}
      />

      <div className="relative mx-auto max-w-[1330px] px-6 md:px-8">
        <motion.header
          className="mx-auto max-w-[860px] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeSmooth }}
        >
          
          <Link
            to="/moments?tab=costa-blanca"
            className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b] transition-colors hover:text-[#171412]"
          >
            ← {c.back}
          </Link>
          <h1 className="mt-5 font-cormorant text-[clamp(2.5rem,6vw,3.75rem)] font-normal leading-[1.02] tracking-[0.01em] text-[#171412]">
            {c.title}
          </h1>
          <p className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
            {c.eyebrow}
          </p>
          <p className="mx-auto mt-6 max-w-[760px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e] md:mt-8">
            {c.lead}
          </p>
          <p className="mx-auto mt-4 max-w-[760px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
            {c.lead2}
          </p>
        </motion.header>

        <motion.div
          className="relative mt-12 overflow-hidden rounded-sm md:mt-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: easeSmooth }}
        >
          <img
            src={boardwalkDunes}
            alt={c.heroAlt}
            fetchPriority="high"
            decoding="async"
            className="aspect-[16/10] w-full object-cover sm:aspect-[16/8] lg:aspect-[16/7]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#062c26]/45 via-transparent to-transparent"
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-6 border-y border-[#171412]/10 py-8 md:mt-14 md:grid-cols-4 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {c.stats.map((s) => (
            <motion.div
              key={s.label}
              className="text-center"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: easeSmooth }}
            >
              <div className="font-cormorant text-[34px] font-normal leading-none text-[#0a3f35] md:text-[40px]">
                {s.value}
              </div>
              <div className="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#6f6a65]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col gap-10 md:mt-14 md:gap-12">
          <ReinaSofiaPark park={c.park} />
          <BeachesBlock beaches={c.beaches} />
        </div>

        <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-24">
          {c.blocks.map((block, index) => (
            <FeatureBlock key={block.key} block={block} index={index} />
          ))}
        </div>

        <motion.article className="mx-auto mt-16 max-w-[900px] md:mt-24" {...reveal}>
          <div className="text-center">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#6e361b]">
              {c.doing.kicker}
            </p>
            <h2 className="mt-4 font-cormorant text-[30px] font-normal leading-[1.1] text-[#171412] md:text-[38px]">
              {c.doing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">
              {c.doing.intro}
            </p>
          </div>
          <ul className="mx-auto mt-8 grid max-w-[720px] gap-x-8 gap-y-3 sm:grid-cols-2">
            {c.doing.activities.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 border-b border-[#171412]/10 pb-3 font-sans text-[15px] font-[250] text-[#3f3a35]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6e361b]" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 max-w-[680px] rounded-sm bg-[#0a3f35]/[0.04] p-6 text-center md:p-8">
            <h3 className="font-cormorant text-[22px] font-normal text-[#171412] md:text-[24px]">
              {c.doing.agendaTitle}
            </h3>
            <p className="mt-3 font-sans text-[15px] font-[250] leading-relaxed text-[#57524e]">
              {c.doing.agenda}
            </p>
          </div>
        </motion.article>

        <motion.div
          className="relative mt-16 overflow-hidden rounded-sm bg-[#0a3f35] px-6 py-12 text-center md:mt-24 md:px-12 md:py-16"
          {...reveal}
        >
          <h2 className="font-cormorant text-[30px] font-normal leading-[1.1] text-white md:text-[38px]">
            {c.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-sans text-[16px] font-[250] leading-relaxed text-white/80">
            {c.ctaBody}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] rounded-full bg-white px-8 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-[#0a3f35] transition-colors hover:bg-[#f3eee6]"
            >
              {c.ctaBook}
            </a>
            <Link
              to="/moments?tab=costa-blanca"
              className="min-h-[48px] rounded-full border border-white/30 px-8 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
            >
              {c.ctaBack}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
