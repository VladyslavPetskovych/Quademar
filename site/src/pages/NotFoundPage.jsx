import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HOME_PRIMARY_CTA_CLASS } from '../components/sections/homeSectionCta'
import { CONTACT, SEO_OG_IMAGE } from '../config/site'
import { useLanguage } from '../i18n/LanguageContext'
import { absoluteUrl } from '../seo/siteOrigin'
import { syncDocumentMeta } from '../seo/syncHead'

const FOREST_GRADIENT =
  'absolute inset-0 bg-[radial-gradient(ellipse_115%_95%_at_50%_36%,#285246_0%,#163630_38%,#0a221e_72%,#051412_100%)]'
const FOREST_VIGNETTE =
  'absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.38)_100%)]'

/**
 * Full-screen 404 — same forest backdrop and logo treatment as the boot splash.
 */
export default function NotFoundPage() {
  const { locale, t } = useLanguage()

  useEffect(() => {
    syncDocumentMeta({
      title: t('notFound.seoTitle'),
      description: t('notFound.seoDescription'),
      keywords: t('seo.keywords'),
      canonicalUrl: absoluteUrl('/'),
      ogImageUrl: absoluteUrl(SEO_OG_IMAGE.path),
      ogImageAlt: SEO_OG_IMAGE.alt,
      ogImageWidth: String(SEO_OG_IMAGE.width),
      ogImageHeight: String(SEO_OG_IMAGE.height),
      locale,
      siteName: CONTACT.hotelName,
    })
  }, [locale, t])

  return (
    <div className="relative flex min-h-app flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className={FOREST_GRADIENT} aria-hidden />
      <div className={FOREST_VIGNETTE} aria-hidden />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <img
          src="/splash-logo-transparent.png"
          alt={t('splash.logoAlt')}
          decoding="async"
          className="h-[min(180px,32vh)] w-auto max-w-[min(280px,82vw)] object-contain drop-shadow-[0_16px_56px_rgba(0,0,0,0.42)]"
        />

        <p className="mt-10 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8dcc4]/65">
          {t('notFound.eyebrow')}
        </p>
        <h1 className="mt-3 font-cormorant text-[clamp(4.5rem,14vw,6.5rem)] font-normal leading-none tracking-[0.02em] text-[#e8dcc4]">
          {t('notFound.code')}
        </h1>
        <h2 className="mt-4 font-cormorant text-[1.65rem] font-normal leading-[1.12] text-[#e8dcc4]/95 md:text-[2rem]">
          {t('notFound.title')}
        </h2>
        <p className="mt-5 max-w-[320px] font-sans text-[15px] font-[250] leading-[1.55] text-[#e8dcc4]/72 md:text-[16px]">
          {t('notFound.body')}
        </p>
        <Link to="/" className={`mt-10 ${HOME_PRIMARY_CTA_CLASS}`}>
          {t('notFound.cta')}
        </Link>
      </div>
    </div>
  )
}
