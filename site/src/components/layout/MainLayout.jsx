import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CONTACT, isPathAllowedInLandingMode, SEO_OG_IMAGE } from '../../config/site'
import { ComingSoonModalProvider } from '../../context/ComingSoonModalContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { resolvePageSeo } from '../../seo/resolvePageSeo'
import { buildRouteJsonLd } from '../../seo/structuredDataRoutes'
import { absoluteUrl, getSiteOrigin } from '../../seo/siteOrigin'
import { syncDocumentMeta, syncJsonLd } from '../../seo/syncHead'
import { Header, Footer } from './index'

export default function MainLayout() {
  const { locale, t } = useLanguage()
  const [isOverVideo, setIsOverVideo] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const isRoomDetail = /^\/suites-rooms\/[^/]+$/.test(location.pathname)

  useEffect(() => {
    if (!isPathAllowedInLandingMode(location.pathname)) {
      navigate('/', { replace: true })
    }
  }, [location.pathname, navigate])


  useEffect(() => {
    if (!isHome) {
      setIsOverVideo(false)
      return
    }
    const handleScroll = () => {
      setIsOverVideo(window.scrollY < 16)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome, location.pathname])

  useEffect(() => {
    if (!isHome) setIsOverVideo(false)
  }, [isHome])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const { title, description, keywords, path, ogImagePath } = resolvePageSeo(
      location.pathname,
      locale,
      t,
    )
    const ogImageUrl = ogImagePath ? absoluteUrl(ogImagePath) : absoluteUrl(SEO_OG_IMAGE.path)
    const ogImageAlt = ogImagePath ? title : SEO_OG_IMAGE.alt

    syncDocumentMeta({
      title,
      description,
      keywords,
      canonicalUrl: absoluteUrl(path),
      ogImageUrl,
      ogImageAlt,
      ogImageWidth: String(SEO_OG_IMAGE.width),
      ogImageHeight: String(SEO_OG_IMAGE.height),
      locale,
      siteName: CONTACT.hotelName,
    })

    const origin = getSiteOrigin() || (typeof window !== 'undefined' ? window.location.origin : '')
    const routeLd =
      origin &&
      buildRouteJsonLd({
        origin,
        pathname: path,
        locale,
        title,
        description,
        ogImageUrl,
      })
    syncJsonLd(routeLd)
  }, [location.pathname, locale, t])

  return (
    <ComingSoonModalProvider>
      <div className="min-h-app">
        <Header isOverVideo={isOverVideo} variant={isRoomDetail ? 'room' : 'default'} />
        <main className={isHome ? '' : 'pt-[calc(env(safe-area-inset-top,0px)+6.25rem)] md:pt-[calc(env(safe-area-inset-top,0px)+6.875rem)]'}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ComingSoonModalProvider>
  )
}
