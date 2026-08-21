import WelcomeCardFrame from '../components/welcome-card/WelcomeCardFrame'
import { PhoneIcon } from '../components/welcome-card/icons'

/** Google Maps place embed for the hotel, as supplied by Maps' own "Share → Embed" panel. */
const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.1836827200996!2d-0.6506599660299663!3d38.083347012621005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63ac42ae68e605%3A0xbacb47f962402f3a!2sHotel%20Guardamar!5e0!3m2!1sen!2ses!4v1787316032013!5m2!1sen!2ses'

/** Welcome card, sheet 2 — navigation map, contact details and closing note. */
export default function InfoPage2() {
  return (
    <WelcomeCardFrame title="Guardamar Hotel & Spa — Guest Information (2/2)">
      <div className="sheet">
        {/* NAVIGATION MAP (full width, enlarged) */}
        <div className="card map-card" style={{ marginTop: 0 }}>
          <div className="ct">
            NAVIGATION MAP <span className="es">· MAPA DE NAVEGACIÓN</span>
          </div>
          {/* Live Google Maps embed of the hotel, with the My Maps still behind it as the print
              fallback — iframes print blank. The QR below points at the separate My Maps map,
              which carries the custom points of interest this place pin does not. */}
          <div className="map wide big">
            <iframe
              className="mapembed"
              src={MAP_EMBED_SRC}
              title="Map of Hotel Guardamar & Spa"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <img
              className="mapbg"
              src="/info/map-screenshot.png"
              alt="Map showing Hotel Guardamar & Spa location and nearby points of interest"
            />
          </div>
          <div className="cap">
            <div className="txt">
              Scan the QR code to view the hotel map and find your way around easily.{' '}
              <span className="es">Escanee el código QR para ver el mapa del hotel y orientarse fácilmente.</span>
            </div>
            <img className="qr big" src="/info/qr-code.png" alt="QR code linking to the hotel navigation map" />
          </div>
          <div className="hosp">
            <svg className="hosp-ic" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="11" fill="#E14B4B" />
              <path d="M12 6.5v11M6.5 12h11" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
            <div className="hosp-txt">
              <b>Hospital</b> — nearest medical facility in case of emergency · Tel. <b>+34 965 290 285</b>
              <br />
              <span className="es">Centro médico más cercano en caso de emergencia · Tel. +34 965 290 285</span>
            </div>
          </div>
        </div>

        {/* ROW 3: CONTACT / COMFORT */}
        <div className="row two">
          <div className="card">
            <div className="ct">
              CONTACT US <span className="es">· CONTACTO</span>
            </div>
            <div className="ci">
              <PhoneIcon />
              +34 965 729 650
            </div>
            <div className="ci">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              Puerto Rico, 11 · 03140 Guardamar del Segura, Alicante, España
            </div>
            <div className="ci">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              info@hotelguardamar.com
            </div>
            <div className="ci">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <ellipse cx="12" cy="12" rx="4" ry="9" />
              </svg>
              guardamarhotelspa.com
            </div>
            <div className="ci">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @hotelguardamar
            </div>
          </div>

          <div className="card comfort">
            <div className="ct">YOUR COMFORT, OUR PRIORITY</div>
            <div className="cline" />
            <p>
              Our team is here to make your stay exceptional. If there is anything you need, please don&apos;t hesitate
              to contact us.
            </p>
            <p className="es">
              Nuestro equipo está aquí para hacer que su estancia sea excepcional. Si necesita algo, no dude en
              contactarnos.
            </p>
            <div className="enjoy">
              ENJOY YOUR STAY!<span className="es">¡DISFRUTE DE SU ESTANCIA!</span>
            </div>
          </div>
        </div>

        <div className="foot">
          THANK YOU FOR CHOOSING GUARDAMAR HOTEL &amp; SPA
          <span className="es">GRACIAS POR ELEGIR GUARDAMAR HOTEL &amp; SPA</span>
        </div>
      </div>
    </WelcomeCardFrame>
  )
}
