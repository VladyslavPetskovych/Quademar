import { useMemo } from 'react'
import logoVertical from '../../../assets/footer/Guardamar_Vertical logotype.svg'
import footerTexture from '../../../assets/footer/footer_texture.webp'
import { useComingSoonModal } from '../../../context/ComingSoonModalContext'
import { CONTACT, LANDING_ONLY_NAV, SITE, isPathAllowedInLandingMode } from '../../../config/site'
import { useNewsletterSubscribe } from '../../../hooks/useNewsletterSubscribe'
import { useLanguage } from '../../../i18n/LanguageContext'

function FooterColumnLink({ href, label, className }) {
  const { openComingSoonModal } = useComingSoonModal()
  const locked =
    LANDING_ONLY_NAV && href.startsWith('/') && !isPathAllowedInLandingMode(href.split('#')[0])
  if (locked) {
    return (
      <button
        type="button"
        className={`${className} cursor-pointer border-0 bg-transparent p-0 text-left opacity-55 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#062c26]`}
        onClick={openComingSoonModal}
      >
        {label}
      </button>
    )
  }
  return (
    <a href={href} className={className}>
      {label}
    </a>
  )
}

export default function Footer() {
  const { locale, toggleLocale, t } = useLanguage()
  const { email, setEmail, consent, setConsent, status, errorKey, handleSubmit } = useNewsletterSubscribe()

  const COLS = useMemo(
    () => [
      {
        title: t('footer.colInformation'),
        links: [
          { label: t('footer.linkTerms'), href: '/terms' },
          { label: t('footer.linkPrivacy'), href: '/privacy' },
        ],
      },
      {
        title: t('footer.colMain'),
        links: [
          { label: t('footer.linkRooms'), href: '/suites-rooms' },
          { label: t('footer.linkRestaurant'), href: '/restaurant-bar' },
          { label: t('footer.linkMenu'), href: '/menu' },
          { label: t('footer.linkSpa'), href: '/spa' },
        ],
      },
      {
        title: t('footer.colOther'),
        links: [
          { label: t('footer.linkContacts'), href: '/contacts' },
          { label: t('footer.linkRules'), href: '/rules' },
          { label: t('footer.linkOffers'), href: '/moments' },
        ],
      },
    ],
    [t],
  )

  return (
    <footer className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${footerTexture}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#062c26]/88" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-5 py-12 md:px-6 md:py-14">
        <div className="flex items-start justify-between gap-6">
          <img src={logoVertical} alt={t('footer.logoAlt')} className="w-[124px] md:w-[132px]" />
          <div className="hidden items-center gap-4 lg:flex">
            <a href="/" aria-label={t('footer.facebook')} className="text-white/95 hover:text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M13.5 21v-7h2.4l.6-3h-3V9.4c0-.9.3-1.5 1.6-1.5h1.5V5.2c-.3 0-1.2-.1-2.4-.1-2.3 0-3.9 1.4-3.9 4v2H8v3h2.4v7h3.1Z" />
              </svg>
            </a>
            <a
              href={CONTACT.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.instagram')}
              className="text-white/95 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="/" aria-label={t('footer.x')} className="text-white/95 hover:text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M18.9 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.8L6.9 21H4.1l6.5-7.6L3.7 3h5.7l4 6.2L18.9 3Zm-1 16.2h1.5L8.6 4.7H7.1l10.8 14.5Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <div className="mt-1 grid gap-8 sm:grid-cols-3 lg:gap-10">
              {COLS.map((col) => (
                <div key={col.title}>
                  <h4 className="font-sans text-[12px] font-medium tracking-[0.08em] text-white">{col.title.toUpperCase()}</h4>
                  <ul className="mt-4 space-y-1.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <FooterColumnLink
                          href={link.href}
                          label={link.label}
                          className="font-sans text-[15px] font-light leading-[1.45] text-white/82 transition-colors hover:text-white"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 lg:hidden">
              <a href="/" aria-label={t('footer.facebook')} className="text-white/95 hover:text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M13.5 21v-7h2.4l.6-3h-3V9.4c0-.9.3-1.5 1.6-1.5h1.5V5.2c-.3 0-1.2-.1-2.4-.1-2.3 0-3.9 1.4-3.9 4v2H8v3h2.4v7h3.1Z" />
                </svg>
              </a>
              <a
                href={CONTACT.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.instagram')}
                className="text-white/95 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="/" aria-label={t('footer.x')} className="text-white/95 hover:text-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M18.9 3h2.8l-6.1 7 7.2 11h-5.6l-4.4-6.8L6.9 21H4.1l6.5-7.6L3.7 3h5.7l4 6.2L18.9 3Zm-1 16.2h1.5L8.6 4.7H7.1l10.8 14.5Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-[12px] font-medium tracking-[0.08em] text-white">{t('footer.newsletters')}</h4>
            <form className="mt-4" onSubmit={handleSubmit} noValidate>
              <div className="flex items-end gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  aria-label={t('footer.emailPlaceholder')}
                  autoComplete="email"
                  className="h-11 w-full border-b border-white/42 bg-transparent px-0.5 font-sans text-[15px] font-light text-white placeholder:text-white/52 focus:border-white focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-11 min-w-[74px] bg-white px-4 font-sans text-[12px] font-medium tracking-[0.03em] text-[#133f37] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'loading' ? t('footer.newsletterSending') : t('footer.send')}
                </button>
              </div>
              <label className="mt-3.5 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-[14px] w-[14px] rounded-sm border border-white/70 bg-transparent accent-white"
                />
                <span className="font-sans text-[12px] font-light leading-[1.4] text-white/72">{t('footer.newsletterLegal')}</span>
              </label>
              <p aria-live="polite" className="mt-2 min-h-[18px] font-sans text-[12px] font-light leading-[1.4]">
                {status === 'success' && <span className="text-white">{t('footer.newsletterSuccess')}</span>}
                {status === 'error' && <span className="text-[#ffd9d2]">{t(errorKey || 'footer.newsletterError')}</span>}
              </p>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 text-white/70 lg:mt-10 lg:flex-row lg:items-center lg:gap-3 lg:border-t lg:border-white/15 lg:pt-4">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t('aria.switchLanguage')}
            className="inline-flex w-fit items-center gap-2 font-sans text-[14px] font-light lg:text-[12px]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
            </svg>
            {locale === 'es' ? t('footer.switchToEnglish') : t('footer.switchToSpanish')}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 14l5-5 5 5" />
            </svg>
          </button>
          <p className="font-sans text-[12px] font-light lg:flex-1 lg:text-center">
            {SITE.name} {new Date().getFullYear()}. {t('footer.rightsReserved')}
          </p>
          <div className="hidden lg:block lg:w-[90px]" aria-hidden="true" />
        </div>
      </div>
    </footer>
  )
}
