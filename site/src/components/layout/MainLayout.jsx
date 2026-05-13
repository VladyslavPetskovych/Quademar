import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CONTACT, isPathAllowedInLandingMode, SEO_OG_IMAGE } from '../../config/site'
import { ComingSoonModalProvider } from '../../context/ComingSoonModalContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { resolvePageSeo } from '../../seo/resolvePageSeo'
import { absoluteUrl } from '../../seo/siteOrigin'
import { syncDocumentMeta } from '../../seo/syncHead'
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const { title, description, keywords, path } = resolvePageSeo(location.pathname, locale, t)
    syncDocumentMeta({
      title,
      description,
      keywords,
      canonicalUrl: absoluteUrl(path),
      ogImageUrl: absoluteUrl(SEO_OG_IMAGE.path),
      ogImageAlt: SEO_OG_IMAGE.alt,
      ogImageWidth: String(SEO_OG_IMAGE.width),
      ogImageHeight: String(SEO_OG_IMAGE.height),
      locale,
      siteName: CONTACT.hotelName,
    })
  }, [location.pathname, locale, t])

  return (
    <ComingSoonModalProvider>
      <div className="min-h-app">
        <Header isOverVideo={isOverVideo} variant={isRoomDetail ? 'room' : 'default'} />
        <main className={isHome ? '' : 'pt-[100px] md:pt-[110px]'}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ComingSoonModalProvider>
  )
}
