import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import courseSunset from '../assets/moments/golf/course-sunset.webp'
import courseAerial from '../assets/moments/golf/course-aerial.webp'
import clubsFairway from '../assets/moments/golf/clubs-fairway.webp'
import teeSunset from '../assets/moments/golf/tee-sunset.webp'
import bagBalls from '../assets/moments/golf/bag-balls.webp'
import teeBall from '../assets/moments/golf/tee-ball.webp'
import spaImage from '../assets/home/discover/spa.webp'
import beachImage from '../assets/home/beach.webp'
import plantImage from '../assets/home/plant.webp'
import { GOLF_ENQUIRY } from '../config/site'
import { useGolfEnquiry } from '../hooks/useGolfEnquiry'
import { useLanguage } from '../i18n/LanguageContext'

const easeSmooth = [0.4, 0, 0.2, 1]

const ENQUIRY_ID = 'golf-enquiry'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: easeSmooth },
}

const fieldClass =
  'w-full border-0 border-b border-[#171412]/18 bg-transparent px-0 py-3 font-sans text-[16px] font-[250] text-[#171412] placeholder:text-[#9a948e] outline-none transition-colors focus:border-[#6e361b] focus:ring-0'

const labelClass = 'font-sans text-[11px] font-medium uppercase tracking-widest text-[#6f6a65]'

const dateLabelClass = 'mt-2 block font-sans text-[12px] font-[250] text-[#9a948e]'

/**
 * Golf escape offer, linked from Moments → Offers and events. Like the Guardamar guide, the
 * long-form copy is co-located here and keyed by locale; photos live in src/assets/moments/golf.
 * The enquiry form at the bottom emails the hotel via GOLF_ENQUIRY (config/site).
 */
const GOLF = {
  es: {
    back: 'Momentos · Ofertas y eventos',
    eyebrow: 'Golf · Costa Blanca',
    title: 'Tu escapada de golf en la Costa Blanca',
    lead:
      'En Hotel Guardamar hemos creado una experiencia pensada para quienes quieren combinar su pasión por el golf con el placer de vivir el Mediterráneo.',
    lead2:
      'Un hotel renovado, junto al mar, desde donde descubrir algunos de los mejores campos de golf de la Costa Blanca.',
    ctaEnquire: 'Solicitar propuesta',
    heroAlt: 'Campo de golf de la Costa Blanca al atardecer, con un búnker en primer plano y montañas al fondo',
    blocks: [
      {
        key: 'location',
        kicker: '01 · Ubicación',
        title: 'Ubicación perfecta',
        text: 'A pocos minutos de la playa y con una ubicación estratégica para acceder fácilmente a los campos de golf más destacados de la Costa Blanca.',
        image: courseAerial,
        imageAlt: 'Vista aérea de un campo de golf con lagos, búnkeres y un green en isla entre pinos',
      },
      {
        key: 'tailored',
        kicker: '02 · A su medida',
        title: 'Golf a su medida',
        text: 'Diseñamos propuestas flexibles adaptadas a cada grupo y cada jugador, combinando alojamiento, desayuno, green fees, transfers y experiencias de golf según sus necesidades.',
        tags: ['Alojamiento', 'Desayuno', 'Green fees', 'Transfers', 'Experiencias de golf'],
        image: clubsFairway,
        imageAlt: 'Bolsa con palos de golf sobre el green y un jugador al fondo',
      },
      {
        key: 'wellbeing',
        kicker: '03 · Bienestar',
        title: 'Relax y bienestar',
        text: 'Después de una jornada en el campo, disfrute de nuestra piscina, SPA, gastronomía y del ambiente tranquilo de Guardamar. Todo lo necesario para recuperar fuerzas y disfrutar de su estancia.',
        image: spaImage,
        imageAlt: 'Zona de spa de Hotel Guardamar con luz cálida y ambiente relajado',
      },
      {
        key: 'more',
        kicker: '04 · Mediterráneo',
        title: 'Mucho más que golf',
        text: 'Descubra una experiencia mediterránea completa con playa, gastronomía, naturaleza, bienestar y la posibilidad de organizar excursiones y actividades durante su estancia.',
        image: beachImage,
        imageAlt: 'Playa de arena y mar Mediterráneo cerca de Guardamar',
      },
    ],
    gallery: [
      { image: teeSunset, alt: 'Mano con guante colocando una bola sobre el tee al atardecer' },
      { image: bagBalls, alt: 'Bolsa de golf con palos y bolas sobre el césped' },
      { image: teeBall, alt: 'Jugador colocando la bola en el tee junto a un hierro' },
    ],
    form: {
      kicker: 'Propuesta personalizada',
      title: 'Diseñemos su escapada de golf',
      body: 'Cuéntenos cuándo desea venir y cómo le gusta jugar. Nuestro equipo le enviará una propuesta a medida con alojamiento, green fees y transfers.',
      directLabel: 'O escríbanos directamente',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono',
      dates: 'Fechas previstas',
      arrival: 'Llegada',
      departure: 'Salida',
      message: 'Peticiones y comentarios',
      messagePlaceholder: 'Número de jugadores, hándicap, campos que le interesan…',
      consent: 'Acepto que Hotel Guardamar utilice mis datos para responder a esta solicitud, según la',
      consentLink: 'Política de privacidad',
      submit: 'Enviar solicitud',
      sending: 'Enviando…',
      success: 'Gracias. Hemos recibido su solicitud y le responderemos muy pronto.',
      errors: {
        required: 'Indique su nombre y su email.',
        invalidEmail: 'Introduzca un email válido.',
        dates: 'La fecha de salida debe ser posterior a la de llegada.',
        consent: 'Acepte la política de privacidad para continuar.',
        failed: 'No hemos podido enviar su solicitud. Inténtelo de nuevo o escríbanos a',
      },
      emailSubject: 'Solicitud escapada de golf',
    },
    ctaBack: 'Volver a Momentos',
  },
  en: {
    back: 'Moments · Offers and events',
    eyebrow: 'Golf · Costa Blanca',
    title: 'Your golf escape on the Costa Blanca',
    lead:
      'At Hotel Guardamar we have created an experience for those who want to combine their passion for golf with the pleasure of Mediterranean living.',
    lead2:
      'A renovated hotel by the sea, from which to discover some of the finest golf courses on the Costa Blanca.',
    ctaEnquire: 'Request a proposal',
    heroAlt: 'Costa Blanca golf course at sunset, with a bunker in the foreground and mountains beyond',
    blocks: [
      {
        key: 'location',
        kicker: '01 · Location',
        title: 'The perfect location',
        text: 'Just minutes from the beach, with a strategic location for easy access to the most outstanding golf courses on the Costa Blanca.',
        image: courseAerial,
        imageAlt: 'Aerial view of a golf course with lakes, bunkers, and an island green among pines',
      },
      {
        key: 'tailored',
        kicker: '02 · Tailored',
        title: 'Golf, your way',
        text: 'We design flexible proposals tailored to every group and every player, combining accommodation, breakfast, green fees, transfers, and golf experiences to suit your needs.',
        tags: ['Accommodation', 'Breakfast', 'Green fees', 'Transfers', 'Golf experiences'],
        image: clubsFairway,
        imageAlt: 'Golf bag with clubs on the green and a player in the background',
      },
      {
        key: 'wellbeing',
        kicker: '03 · Wellbeing',
        title: 'Relax and unwind',
        text: 'After a day on the course, enjoy our pool, spa, cuisine, and the tranquil atmosphere of Guardamar. Everything you need to recharge and enjoy your stay.',
        image: spaImage,
        imageAlt: 'Spa area at Hotel Guardamar with warm light and a relaxed atmosphere',
      },
      {
        key: 'more',
        kicker: '04 · Mediterranean',
        title: 'Much more than golf',
        text: 'Discover a complete Mediterranean experience — beach, gastronomy, nature, and wellbeing — with excursions and activities that can be arranged during your stay.',
        image: beachImage,
        imageAlt: 'Sandy beach and Mediterranean Sea near Guardamar',
      },
    ],
    gallery: [
      { image: teeSunset, alt: 'Gloved hand placing a ball on the tee at sunset' },
      { image: bagBalls, alt: 'Golf bag with clubs and balls on the grass' },
      { image: teeBall, alt: 'Player placing a ball on the tee beside an iron' },
    ],
    form: {
      kicker: 'Tailored proposal',
      title: 'Let us plan your golf escape',
      body: 'Tell us when you would like to come and how you like to play. Our team will send you a tailored proposal with accommodation, green fees, and transfers.',
      directLabel: 'Or write to us directly',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      dates: 'Planned dates',
      arrival: 'Arrival',
      departure: 'Departure',
      message: 'Requests and comments',
      messagePlaceholder: 'Number of players, handicap, courses you are interested in…',
      consent: 'I agree that Hotel Guardamar may use my details to reply to this request, as described in the',
      consentLink: 'Privacy Policy',
      submit: 'Send request',
      sending: 'Sending…',
      success: 'Thank you. We have received your request and will be in touch very soon.',
      errors: {
        required: 'Please enter your name and email.',
        invalidEmail: 'Please enter a valid email address.',
        dates: 'The departure date must be after the arrival date.',
        consent: 'Please accept the privacy policy to continue.',
        failed: 'We could not send your request. Please try again or write to us at',
      },
      emailSubject: 'Golf escape enquiry',
    },
    ctaBack: 'Back to Moments',
  },
}

function PillarBlock({ block, index }) {
  const imageLeft = index % 2 === 1
  return (
    <motion.article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14" {...reveal}>
      <div className={`relative overflow-hidden rounded-sm ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.img
          src={block.image}
          alt={block.imageAlt}
          loading="lazy"
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
        <p className="mt-5 font-sans text-[16px] font-[250] leading-relaxed text-[#57524e]">{block.text}</p>
        {block.tags && (
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {block.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[#0a3f35]/18 bg-white/60 px-4 py-1.5 font-sans text-[12px] font-[300] tracking-[0.04em] text-[#0a3f35]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  )
}

function EnquiryForm({ copy, locale }) {
  const { values, setField, consent, setConsent, honey, setHoney, status, errorKey, handleSubmit } = useGolfEnquiry({
    subject: copy.emailSubject,
  })
  const today = new Date().toISOString().slice(0, 10)

  const field = (name) => ({
    id: `golf-${name}`,
    name,
    value: values[name],
    onChange: (e) => setField(name, e.target.value),
    className: fieldClass,
  })

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate lang={locale}>
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label htmlFor="golf-name" className={labelClass}>
            {copy.name} *
          </label>
          <input {...field('name')} type="text" autoComplete="name" required />
        </div>
        <div>
          <label htmlFor="golf-email" className={labelClass}>
            {copy.email} *
          </label>
          <input {...field('email')} type="email" autoComplete="email" required />
        </div>
      </div>

      <div>
        <label htmlFor="golf-phone" className={labelClass}>
          {copy.phone}
        </label>
        <input {...field('phone')} type="tel" autoComplete="tel" />
      </div>

      <fieldset>
        <legend className={labelClass}>{copy.dates}</legend>
        <div className="mt-1 grid grid-cols-2 gap-x-6 sm:gap-x-8">
          <div>
            <label htmlFor="golf-arrival" className={dateLabelClass}>
              {copy.arrival}
            </label>
            <input {...field('arrival')} type="date" min={today} className={`${fieldClass} pt-1`} />
          </div>
          <div>
            <label htmlFor="golf-departure" className={dateLabelClass}>
              {copy.departure}
            </label>
            <input
              {...field('departure')}
              type="date"
              min={values.arrival || today}
              className={`${fieldClass} pt-1`}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="golf-message" className={labelClass}>
          {copy.message}
        </label>
        <textarea
          {...field('message')}
          rows={4}
          placeholder={copy.messagePlaceholder}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot — hidden from people, filled by bots. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-[14px] w-[14px] shrink-0 rounded-sm border border-[#171412]/30 accent-[#6e361b]"
        />
        <span className="font-sans text-[12px] font-[250] leading-[1.5] text-[#57524e]">
          {copy.consent}{' '}
          <Link to="/privacy" className="underline underline-offset-2 transition-colors hover:text-[#171412]">
            {copy.consentLink}
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 w-full bg-[#6e361b] py-3.5 font-sans text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#5d2c15] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[220px] sm:px-10"
      >
        {status === 'loading' ? copy.sending : copy.submit}
      </button>

      <p aria-live="polite" className="min-h-[18px] font-sans text-[13px] font-[250] leading-relaxed">
        {status === 'success' && <span className="text-[#0a3f35]">{copy.success}</span>}
        {status === 'error' && (
          <span className="text-[#9a3b1e]">
            {copy.errors[errorKey] ?? copy.errors.failed}
            {errorKey === 'failed' && (
              <>
                {' '}
                <a href={`mailto:${GOLF_ENQUIRY.email}`} className="underline underline-offset-2">
                  {GOLF_ENQUIRY.email}
                </a>
                .
              </>
            )}
          </span>
        )}
      </p>
    </form>
  )
}

export default function GolfPage() {
  const { locale } = useLanguage()
  const c = GOLF[locale] ?? GOLF.en

  return (
    <section className="relative -mt-16 overflow-hidden bg-[#f3eee6] pb-24 pt-24 md:pb-32 md:pt-32">
      <motion.img
        src={plantImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-24 hidden w-[min(380px,32vw)] -scale-x-100 opacity-[0.10] lg:block"
        initial={{ opacity: 0, x: 24 }}
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
            to="/moments"
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
          <a
            href={`#${ENQUIRY_ID}`}
            className="mt-9 inline-flex min-h-[48px] items-center rounded-full bg-[#0a3f35] px-8 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_rgba(10,63,53,0.22)] transition-colors hover:bg-[#062c26]"
          >
            {c.ctaEnquire}
          </a>
        </motion.header>

        <motion.div
          className="relative mt-12 overflow-hidden rounded-sm md:mt-14"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: easeSmooth }}
        >
          <img
            src={courseSunset}
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

        <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-24">
          {c.blocks.map((block, index) => (
            <PillarBlock key={block.key} block={block} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {c.gallery.map((photo) => (
            <motion.div
              key={photo.image}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-[#0a3f35]/5"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: easeSmooth }}
            >
              <img
                src={photo.image}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          id={ENQUIRY_ID}
          className="mt-16 scroll-mt-28 overflow-hidden rounded-sm md:mt-24 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          {...reveal}
        >
          <div className="relative bg-[#0a3f35] px-6 py-12 md:px-12 md:py-16">
            <img
              src={courseSunset}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="relative">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#f3eee6]/70">
                {c.form.kicker}
              </p>
              <h2 className="mt-4 font-cormorant text-[30px] font-normal leading-[1.1] text-white md:text-[38px]">
                {c.form.title}
              </h2>
              <div className="mt-5 h-px w-12 bg-white/30" aria-hidden="true" />
              <p className="mt-5 max-w-[440px] font-sans text-[16px] font-[250] leading-relaxed text-white/80">
                {c.form.body}
              </p>
              <div className="mt-10 border-t border-white/15 pt-8">
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#f3eee6]/60">
                  {c.form.directLabel}
                </p>
                <a
                  href={`mailto:${GOLF_ENQUIRY.email}`}
                  className="mt-3 inline-block break-all font-sans text-[17px] font-[250] text-[#f3eee6] transition-opacity hover:opacity-80"
                >
                  {GOLF_ENQUIRY.email}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-[#faf6ef] px-6 py-12 md:px-12 md:py-16">
            <EnquiryForm copy={c.form} locale={locale} />
          </div>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/moments"
            className="min-h-[48px] rounded-full border border-[#0a3f35]/30 px-8 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-[#0a3f35] transition-colors hover:bg-[#0a3f35] hover:text-white"
          >
            {c.ctaBack}
          </Link>
        </div>
      </div>
    </section>
  )
}
