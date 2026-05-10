import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import BurgerButton from '../../ui/BurgerButton'
import MenuOverlay from '../MenuOverlay'
import { useComingSoonModal } from '../../../context/ComingSoonModalContext'
import { LANDING_ONLY_NAV, NAV_LINKS } from '../../../config/site'
import { useLanguage } from '../../../i18n/LanguageContext'
import { navLabelKey } from '../../../i18n/navLabels'
import logoWhite from '../../../assets/logo/white/Guardamar_logotype Vertical Version + Descriptor_header.svg'
import logoDark from '../../../assets/logo/dark/Guardamar_logotype Vertical Version + Descriptor.svg'

export default function Header({ isOverVideo = true }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openComingSoonModal } = useComingSoonModal()
  const { locale, toggleLocale, t } = useLanguage()

  const navLocked = (linkId) => LANDING_ONLY_NAV && linkId !== 'about' && linkId !== 'contacts'

  const navLabel = (linkId, shortRestaurant = false) =>
    shortRestaurant && linkId === 'restaurant-bar' ? t('nav.restaurantShort') : t(navLabelKey(linkId))

  const navColor = isOverVideo ? 'text-white' : 'text-[#252422]'
  const lockedBtnExtra =
    'cursor-pointer border-0 bg-transparent p-0 opacity-55 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a3f35]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

  const navItemClass = (isActive, extra = '') =>
    `py-1 font-sans text-[14px] font-normal leading-none text-center whitespace-nowrap transition-colors hover:opacity-85 ${navColor} ${isActive ? 'opacity-90' : ''} ${extra}`.trim()

  const navItemClassMd = (isActive, extra = '') =>
    `py-1 font-sans text-[13px] font-normal leading-none text-center whitespace-nowrap transition-colors hover:opacity-85 ${navColor} ${isActive ? 'opacity-90' : ''} ${extra}`.trim()

  const navItemClassLg = (isActive, extra = '') =>
    `font-sans text-[0.80rem] md:text-[0.82rem] font-light tracking-[0.04em] transition-colors hover:opacity-85 ${navColor} ${isActive ? 'opacity-90' : ''} ${extra}`.trim()

  const mobileNavLinks = NAV_LINKS.filter((link) =>
    ['suites-rooms', 'restaurant-bar', 'contacts'].includes(link.id),
  )
  /** “About” stays in menu drawer / footer; not shown in the header strip. */
  const headerNavLinks = NAV_LINKS.filter((link) => link.id !== 'about')
  const headerLogo = isOverVideo ? logoWhite : logoDark

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isOverVideo
            ? 'bg-transparent'
            : 'bg-[#f3efe6] border-b border-[#2c2b28]/30'
        } w-full max-w-full overflow-x-hidden`}
      >
        <div className="w-full px-0 lg:mx-auto lg:max-w-[1320px] lg:px-6">
          <div
            className={`grid grid-cols-3 items-center gap-2 px-2.5 py-2.5 lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-0 lg:py-3.5 ${isOverVideo ? 'border-b border-white/35' : 'border-b border-[#2c2b28]/30'}`}
          >
            <div className="flex items-center gap-2 justify-self-start">
              <BurgerButton
                isOpen={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className={`${navColor} ${isOverVideo ? 'hover:bg-white/10' : 'hover:bg-stone-200/50'}`}
              />
              <span className={`hidden lg:inline font-sans text-sm font-normal tracking-[0.04em] ${navColor}`}>
                {t('header.menu')}
              </span>
            </div>

            <div className="flex items-center justify-center min-w-0">
              <Link to="/" className="flex items-center justify-center">
                <img
                  src={headerLogo}
                  alt={t('header.logoAlt')}
                  className="h-[47px] w-[104px] object-contain lg:h-12 lg:w-auto transition-all duration-300"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 justify-self-end">
              <button
                type="button"
                onClick={toggleLocale}
                className={`hidden lg:inline-flex items-center gap-1.5 ${navColor}`}
                aria-label={t('aria.switchLanguage')}
              >
                <span className="font-sans text-xs font-light tracking-[0.14em]">{locale.toUpperCase()}</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
                  <path d="M2 12h20M12 2c2.9 2.7 4.5 6.3 4.5 10S14.9 19.3 12 22c-2.9-2.7-4.5-6.3-4.5-10S9.1 4.7 12 2Z" />
                </svg>
              </button>

              <Link
                to="/"
                className={`flex items-center gap-1.5 px-[10px] py-[6px] sm:gap-2 sm:px-5 sm:py-2.5 transition-colors ${
                  isOverVideo
                    ? 'bg-white text-stone-900 hover:bg-stone-100'
                    : 'bg-[#003d35] text-white hover:bg-[#0b4a41]'
                }`}
                aria-label={t('header.bookNow')}
              >
                <span className="font-sans text-[13px] sm:text-[14px] font-normal leading-none">{t('header.bookNow')}</span>
              </Link>
            </div>
          </div>

          <nav className="pt-2 pb-[11px] lg:py-2.5">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-3 sm:gap-x-6 md:hidden">
              {mobileNavLinks.map((link) =>
                navLocked(link.id) ? (
                  <button
                    key={link.id}
                    type="button"
                    className={navItemClass(false, lockedBtnExtra)}
                    onClick={openComingSoonModal}
                  >
                    {navLabel(link.id, true)}
                  </button>
                ) : (
                  <NavLink key={link.id} to={link.path} className={({ isActive }) => navItemClass(isActive)}>
                    {navLabel(link.id, true)}
                  </NavLink>
                ),
              )}
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-6 md:px-2 lg:hidden">
              {headerNavLinks.map((link) =>
                navLocked(link.id) ? (
                  <button
                    key={link.id}
                    type="button"
                    className={navItemClassMd(false, lockedBtnExtra)}
                    onClick={openComingSoonModal}
                  >
                    {navLabel(link.id, true)}
                  </button>
                ) : (
                  <NavLink key={link.id} to={link.path} className={({ isActive }) => navItemClassMd(isActive)}>
                    {navLabel(link.id, true)}
                  </NavLink>
                ),
              )}
            </div>
            <div className="hidden lg:flex items-center justify-center gap-6 lg:gap-7 xl:gap-9 overflow-x-auto whitespace-nowrap">
              {headerNavLinks.map((link) =>
                navLocked(link.id) ? (
                  <button
                    key={link.id}
                    type="button"
                    className={navItemClassLg(false, lockedBtnExtra)}
                    onClick={openComingSoonModal}
                  >
                    {navLabel(link.id)}
                  </button>
                ) : (
                  <NavLink key={link.id} to={link.path} className={({ isActive }) => navItemClassLg(isActive)}>
                    {navLabel(link.id)}
                  </NavLink>
                ),
              )}
            </div>
          </nav>
        </div>
      </header>

      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
