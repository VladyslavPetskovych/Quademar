import WelcomeCardFrame from '../components/welcome-card/WelcomeCardFrame'
import WelcomeCardLogo from '../components/welcome-card/WelcomeCardLogo'
import { PhoneIcon } from '../components/welcome-card/icons'

/** Welcome card, sheet 1 — telephony, hours, Wi-Fi and legal/safety info. */
export default function InfoPage1() {
  return (
    <WelcomeCardFrame title="Guardamar Hotel & Spa — Guest Information (1/2)">
      <div className="sheet p1">
        {/* HEADER */}
        <div className="hd">
          <WelcomeCardLogo />
          <div className="logo">GUARDAMAR</div>
          <div className="sub">HOTEL &amp; SPA</div>
          <div className="hd-rule" />
        </div>

        {/* TELEPHONY / HOURS */}
        <div className="row two">
          <div className="card">
            <div className="ct">
              TELEPHONY <span className="es">· TELEFONÍA</span>
            </div>
            <div className="tel">
              <div className="ic">
                <PhoneIcon />
              </div>
              <div>
                <div className="num">100</div>
                <div className="lbl">
                  Reception <span className="es">· Recepción</span>
                </div>
              </div>
            </div>
            <div className="tel">
              <div className="ic">
                <PhoneIcon />
              </div>
              <div>
                <div className="num">500</div>
                <div className="lbl">Bar</div>
              </div>
            </div>
            <div className="note">
              Dial the number from your room phone.{' '}
              <span className="es">Marque el número desde el teléfono de su habitación.</span>
            </div>
            <div className="tel-sep">
              <div className="subct">
                EMERGENCY NUMBERS{' '}
                <span className="es" style={{ fontStyle: 'normal', opacity: 0.75, fontWeight: 400 }}>
                  · EMERGENCIAS
                </span>
              </div>
              <div className="tel-pair">
                <div className="tel">
                  <div className="ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="num">112</div>
                    <div className="lbl">
                      Police <span className="es">· Policía</span>
                    </div>
                  </div>
                </div>
                <div className="tel">
                  <div className="ic">
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
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </div>
                  <div>
                    <div className="num">061</div>
                    <div className="lbl">
                      Ambulance <span className="es">· Ambulancia</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="ct">
              HOURS &amp; SERVICES <span className="es">· HORARIOS</span>
            </div>
            <div className="hrow">
              <svg
                viewBox="0 0 28 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="20" cy="5" r="2.6" fill="currentColor" stroke="none" />
                <path d="M3 11l6-3 5 3 4-2 4 2.5" />
                <path d="M2 17q3-2.5 5.5 0t5.5 0 5.5 0 5.5 0" />
              </svg>
              <span className="nm">
                Swimming Pool <span className="es">Piscina</span>
              </span>
              <span className="tm">9:00 – 21:00</span>
            </div>
            <div className="hrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 3v6a3 3 0 0 0 6 0V3" />
                <path d="M7 9v12" />
                <path d="M18 3c-2 0-3 2.4-3 5.4S16 13 18 13" />
                <path d="M18 3v18" />
              </svg>
              <span className="nm">
                Restaurant <span className="es">Restaurante</span>
              </span>
              <span className="tm">14:00 – 17:00</span>
            </div>
            <div className="hrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 4h14l-7 8z" />
                <path d="M12 12v8" />
                <path d="M8 20h8" />
                <path d="M7.6 7h8.8" />
              </svg>
              <span className="nm">Bar</span>
              <span className="tm">8:00 – 00:00</span>
            </div>
            <div className="hrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
                <path d="M6 2v2M10 2v2M14 2v2" />
              </svg>
              <span className="nm">
                Breakfast <span className="es">Desayuno</span>
              </span>
              <span className="tm">8:00 – 11:00</span>
            </div>
            <div className="qh">
              Please respect quiet hours from 22:00 to 8:00.
              <br />
              Respete el horario de silencio de 22:00 a 8:00.
            </div>
          </div>
        </div>

        {/* WI-FI & GUEST INFO BAND */}
        <div className="band">
          <div className="bt">
            WI-FI &amp; GUEST INFORMATION <span className="es">· INFORMACIÓN PARA HUÉSPEDES</span>
          </div>
          <div className="wifi-grid">
            <div className="wifi-item">
              <div className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 8.8a15 15 0 0 1 20 0" />
                  <path d="M5 12.4a10 10 0 0 1 14 0" />
                  <path d="M8.5 15.9a5 5 0 0 1 7 0" />
                  <circle cx="12" cy="19.4" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <div className="k">
                  Wi-Fi Network <span className="es">· Red</span>
                </div>
                <div className="v">Hotel-guest</div>
                <div className="k" style={{ marginTop: 4 }}>
                  Password <span className="es">· Contraseña</span>
                </div>
                <div className="v">12341234</div>
              </div>
            </div>
            <div className="wifi-item">
              <div className="ic">
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
                  <path d="M12 7v5l3.5 2" />
                </svg>
              </div>
              <div>
                <div className="k">
                  Check{'‑'}in / Check{'‑'}out <span className="es">· Entrada / Salida</span>
                </div>
                <div className="v sm">15:00 – 11:00</div>
              </div>
            </div>
            <div className="wifi-item">
              <div className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 18h17" />
                  <path d="M5 18a7 7 0 0 1 14 0" />
                  <path d="M12 6.2V4.4" />
                  <circle cx="12" cy="3.4" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div>
                <div className="k">
                  24-Hour Reception <span className="es">· Recepción 24 h</span>
                </div>
                <div className="v sm">
                  Front desk &amp; concierge{' '}
                  <span className="es" style={{ fontWeight: 400 }}>
                    · Conserjería
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEGAL & SAFETY */}
        <div className="band">
          <div className="bt">
            LEGAL &amp; SAFETY INFORMATION <span className="es">· INFORMACIÓN LEGAL Y DE SEGURIDAD</span>
          </div>
          <div className="legal-grid">
            <div className="li">
              <div className="lic">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="13" />
                  <line x1="7" y1="7" x2="25" y2="25" />
                  <rect x="8" y="18" width="12" height="4" rx="1" />
                  <path d="M23 15v3M26 15v3" />
                </svg>
              </div>
              <div className="lih">
                NO SMOKING
                <br />
                NO FUMAR
              </div>
              <div className="lid">
                Smoking is not allowed in indoor areas.
                <span className="es">No está permitido fumar en el interior.</span>
              </div>
            </div>
            <div className="li">
              <div className="lic">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="11" y="11" width="10" height="15" rx="3" />
                  <path d="M13 11V9a3 3 0 0 1 6 0v2" />
                  <path d="M19 7h4M23 7v3l-3 1.5" />
                </svg>
              </div>
              <div className="lih">
                FIRE SAFETY
                <br />
                INCENDIOS
              </div>
              <div className="lid">
                In case of fire, use the nearest exit.
                <span className="es">En caso de incendio, use la salida más cercana.</span>
              </div>
            </div>
            <div className="li">
              <div className="lic">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="13" />
                  <path d="M16 10v12M10 16h12" />
                </svg>
              </div>
              <div className="lih">
                HEALTH &amp; SAFETY
                <br />
                SALUD
              </div>
              <div className="lid">
                Inform reception of any health conditions.
                <span className="es">Informe en recepción de cualquier problema de salud.</span>
              </div>
            </div>
            <div className="li">
              <div className="lic">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="9" width="24" height="15" rx="3" />
                  <line x1="4" y1="14" x2="28" y2="14" />
                  <line x1="8" y1="20" x2="15" y2="20" />
                </svg>
              </div>
              <div className="lih">
                VALUABLES
                <br />
                OBJETOS DE VALOR
              </div>
              <div className="lid">
                Use the in-room safe — ask reception for the key.
                <span className="es">Utilice la caja fuerte; pida la llave en recepción.</span>
              </div>
            </div>
            <div className="li">
              <div className="lic">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 12h4l6-5v18l-6-5H6z" />
                  <line x1="21" y1="12" x2="27" y2="20" />
                  <line x1="27" y1="12" x2="21" y2="20" />
                </svg>
              </div>
              <div className="lih">
                QUIET HOURS
                <br />
                SILENCIO
              </div>
              <div className="lid">
                Please keep noise to a minimum.
                <span className="es">Mantenga el ruido al mínimo.</span>
              </div>
            </div>
            <div className="li">
              <div className="lic">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="5" y="8" width="22" height="7" rx="2.5" />
                  <rect x="5" y="17" width="22" height="7" rx="2.5" />
                  <path d="M11 8v7" />
                  <path d="M11 17v7" />
                </svg>
              </div>
              <div className="lih">
                TOWELS
                <br />
                TOALLAS
              </div>
              <div className="lid">
                Room towels are not for the beach or pool — reception provides pool towels.
                <span className="es">
                  Las toallas de la habitación no son para la playa ni la piscina; en recepción le darán toallas de
                  piscina.
                </span>
              </div>
            </div>
          </div>
          <div className="emer">
            In case of emergency, dial <b>100</b> (Reception) or <b>112</b>.
            <span className="es">
              En caso de emergencia, marque <b>100</b> (Recepción) o <b>112</b>.
            </span>
          </div>
        </div>
      </div>
    </WelcomeCardFrame>
  )
}
