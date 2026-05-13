import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useComingSoonModal } from '../../../context/ComingSoonModalContext'
import { CONTACT, LANDING_ONLY_NAV, LANDING_UNLOCKED_NAV_IDS, NAV_LINKS, SITE } from '../../../config/site'
import { useLanguage } from '../../../i18n/LanguageContext'
import { navLabelKey } from '../../../i18n/navLabels'
import logoDark from '../../../assets/logo/dark/Guardamar_logotype Vertical Version + Descriptor.svg'
import logoVerticalDark from '../../../assets/logo/dark/Guardamar_Vertical logotype.svg'

const STAGGER_MS = 45

const LEGAL_LINKS = [
  { labelKey: 'menu.legalTerms', href: '#' },
  { labelKey: 'menu.legalPrivacy', href: '#' },
  { labelKey: 'menu.legalCookies', href: '#' },
  { labelKey: 'menu.legalNotice', href: '#' },
]

function GlobeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  )
}

function ChevronDown({ className, open }) {
  return (
    <svg
      className={`${className} transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" strokeLinecap="round" />
    </svg>
  )
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z" strokeLinejoin="round" />
    </svg>
  )
}

export default function MenuOverlay({ isOpen, onClose }) {
  const [momentsOpen, setMomentsOpen] = useState(false)
  const { openComingSoonModal } = useComingSoonModal()
  const { locale, toggleLocale, t } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) setMomentsOpen(false)
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleLinkClick = () => onClose()

  const navLocked = (linkId) => LANDING_ONLY_NAV && !LANDING_UNLOCKED_NAV_IDS.has(linkId)

  const primaryClass =
    'block w-full py-4 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-[#171412] transition-colors active:bg-[#171412]/5 hover:text-[#0a3f35] max-lg:touch-manipulation lg:py-4 lg:text-[13px] lg:font-semibold'

  const primaryLockedClass = `${primaryClass} cursor-pointer text-left opacity-50 hover:opacity-90 hover:text-[#0a3f35] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3f35]/25`

  const subLinkClass =
    'block py-3 pl-1 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[#57524e] hover:text-[#171412] max-lg:touch-manipulation lg:py-2.5'

  const subLinkLockedClass = `${subLinkClass} w-full cursor-pointer text-left opacity-50 hover:opacity-88 hover:text-[#171412] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3f35]/25`

  return (
    <>
      {/* Backdrop — slightly stronger on small screens so drawer reads clearly */}
      <div
        className={`fixed inset-0 z-60 min-h-dvh bg-stone-900/50 backdrop-blur-xl transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-lg:bg-stone-900/55 max-lg:backdrop-blur-2xl lg:bg-stone-900/45 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer: full dynamic viewport height on mobile; ~92vw width; fixed width on lg */}
      <div
        className={`fixed left-0 top-0 z-70 flex min-h-0 w-[min(92vw,400px)] flex-col bg-[#f5f2e9] shadow-[8px_0_40px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-lg:h-dvh max-lg:max-h-dvh max-lg:max-w-[400px] lg:bottom-0 lg:top-0 lg:min-h-dvh lg:w-[min(32vw,440px)] lg:max-w-none lg:bg-[#f9f6f0] ${
          isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t('menu.dialogLabel')}
      >
        {/* Header: logo + close in circle */}
        <div
          className={`flex shrink-0 items-start justify-between gap-3 border-b border-[#171412]/12 pb-5 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pt-[max(1.25rem,env(safe-area-inset-top))] transition-opacity duration-500 md:px-8 md:pb-6 md:pt-8 lg:gap-4 lg:px-8 lg:pb-6 lg:pt-8 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: isOpen ? '80ms' : '0ms' }}
        >
          <Link to="/" onClick={handleLinkClick} className="min-w-0 pt-0.5">
            {/* Mobile ref: vertical mark + GUARDAMAR / HOTEL & SPA */}
            <img
              src={logoVerticalDark}
              alt={`${SITE.name} Hotel & Spa`}
              className="h-[68px] w-auto max-w-[min(200px,48vw)] object-contain object-left lg:hidden"
            />
            <img
              src={logoDark}
              alt={`${SITE.name} Hotel & Spa`}
              className="hidden h-[52px] w-auto max-w-[220px] object-contain object-left lg:block lg:h-[56px]"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#171412]/35 text-[#171412] transition-colors hover:bg-[#171412]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3f35]/30 lg:h-11 lg:w-11"
            aria-label={t('menu.closeMenu')}
          >
            <svg
              className="h-5 w-5 max-lg:h-[22px] max-lg:w-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col basis-0 overflow-y-auto overscroll-contain px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-1 max-lg:min-h-0 max-lg:touch-pan-y md:px-8 md:pb-12 lg:px-8">
          <nav className="pt-2" aria-label="Primary">
            <ul className="pb-1">
              {/* ABOUT US + language (reference) */}
              <li
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${100 + 0 * STAGGER_MS}ms` : '0ms' }}
              >
                <div className="flex items-center justify-between gap-3 py-4 lg:py-4">
                  <Link to="/" onClick={handleLinkClick} className={primaryClass}>
                    {t('menu.aboutLink')}
                  </Link>
                  <button
                    type="button"
                    onClick={toggleLocale}
                    className="flex shrink-0 items-center gap-1.5 text-[#171412] transition-colors hover:text-[#0a3f35]"
                    aria-label={t('aria.switchLanguage')}
                  >
                    <GlobeIcon className="h-4 w-4" />
                    <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.12em]">
                      {locale.toUpperCase()}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5" open={false} />
                  </button>
                </div>
              </li>

              {NAV_LINKS.filter((link) => link.id !== 'about').map((link, i) => {
                const delay = isOpen ? `${100 + (i + 1) * STAGGER_MS}ms` : '0ms'
                const locked = navLocked(link.id)
                if (link.id === 'moments') {
                  return (
                    <li
                      key={link.id}
                      className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                      }`}
                      style={{ transitionDelay: delay }}
                    >
                      <div>
                        <div className="flex items-stretch justify-between gap-2">
                          {locked ? (
                            <button
                              type="button"
                              className={`${primaryLockedClass} flex-1`}
                              onClick={openComingSoonModal}
                            >
                              {t(navLabelKey(link.id))}
                            </button>
                          ) : (
                            <Link to={link.path} onClick={handleLinkClick} className={`${primaryClass} flex-1`}>
                              {t(navLabelKey(link.id))}
                            </Link>
                          )}
                          <button
                            type="button"
                            className={`flex w-11 shrink-0 touch-manipulation items-center justify-center text-[#171412] transition-opacity hover:text-[#0a3f35] ${locked ? 'opacity-45 hover:opacity-90' : ''}`}
                            aria-expanded={locked ? false : momentsOpen}
                            aria-controls="menu-moments-sub"
                            onClick={() => (locked ? openComingSoonModal() : setMomentsOpen((o) => !o))}
                            aria-label={t('menu.momentsSubmenu')}
                          >
                            <ChevronDown className="h-4 w-4" open={momentsOpen} />
                          </button>
                        </div>
                        <ul
                          id="menu-moments-sub"
                          className={`overflow-hidden bg-[#f3efe8]/60 transition-all duration-300 ${
                            momentsOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <li>
                            {locked ? (
                              <button type="button" className={subLinkLockedClass} onClick={openComingSoonModal}>
                                {t('menu.offersEvents')}
                              </button>
                            ) : (
                              <Link to="/moments" onClick={handleLinkClick} className={subLinkClass}>
                                {t('menu.offersEvents')}
                              </Link>
                            )}
                          </li>
                          <li>
                            {locked ? (
                              <button type="button" className={subLinkLockedClass} onClick={openComingSoonModal}>
                                {t('menu.costaBlanca')}
                              </button>
                            ) : (
                              <Link to="/moments" onClick={handleLinkClick} className={subLinkClass}>
                                {t('menu.costaBlanca')}
                              </Link>
                            )}
                          </li>
                        </ul>
                      </div>
                    </li>
                  )
                }

                return (
                  <li
                    key={link.id}
                    className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                    }`}
                    style={{ transitionDelay: delay }}
                  >
                    {locked ? (
                      <button type="button" className={primaryLockedClass} onClick={openComingSoonModal}>
                        {t(navLabelKey(link.id))}
                      </button>
                    ) : (
                      <Link to={link.path} onClick={handleLinkClick} className={primaryClass}>
                        {t(navLabelKey(link.id))}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Secondary legal — extra top spacing on mobile (reference hierarchy) */}
          <nav className="mt-14 max-lg:mt-16 lg:mt-10" aria-label="Legal">
            <ul className="space-y-3 max-lg:space-y-3.5">
              {LEGAL_LINKS.map((item, i) => (
                <li
                  key={item.labelKey}
                  className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${220 + i * 40}ms` : '0ms',
                  }}
                >
                  <a
                    href={item.href}
                    className="font-sans text-[13px] font-light leading-snug text-[#171412] underline-offset-4 max-lg:py-0.5 max-lg:text-[14px] hover:underline lg:font-normal"
                    onClick={(e) => {
                      if (item.href === '#') e.preventDefault()
                      onClose()
                    }}
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div
            className={`mt-8 flex items-center gap-5 text-[#171412] transition-all duration-500 max-lg:mt-9 max-lg:gap-6 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '380ms' : '0ms' }}
          >
            <a
              href={CONTACT.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70"
              aria-label={t('footer.instagram')}
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70"
              aria-label={t('footer.facebook')}
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>

          {/* Contact block */}
          <address
            className={`mt-auto pt-10 font-sans not-italic transition-all duration-500 max-lg:pt-11 lg:pt-12 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '420ms' : '0ms' }}
          >
            <p className="text-[13px] font-light leading-relaxed text-[#57524e] max-lg:text-[14px]">
              <a href={CONTACT.phoneHref} className="block text-[#171412] hover:underline">
                {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.emailHref} className="mt-2 block text-[#171412] hover:underline">
                {CONTACT.email}
              </a>
              <span className="mt-3 block">
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </p>
          </address>
        </div>
      </div>
    </>
  )
}
