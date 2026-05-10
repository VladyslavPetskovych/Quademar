import { getRoomBySlug } from '../../rooms'
import { localizeRoom } from '../i18n/localizeRoom'

/**
 * Page-specific `<title>`, shared description/keywords come from i18n `t`.
 */
export function resolvePageSeo(pathname, locale, t) {
  const path = pathname.replace(/\/+$/, '') || '/'
  let title = t('seo.titleDefault')

  if (path === '/contacts') title = t('seo.titleContacts')
  else if (path === '/suites-rooms') title = t('seo.titleSuites')
  else if (path.startsWith('/suites-rooms/')) {
    const slug = path.slice('/suites-rooms/'.length)
    const room = slug ? getRoomBySlug(slug) : null
    if (room) {
      const localized = localizeRoom(room, locale)
      title = `${localized.title} — Hotel Guardamar`
    }
  } else if (path === '/restaurant-bar') title = t('seo.titleRestaurant')
  else if (path === '/spa') title = t('seo.titleSpa')
  else if (path === '/moments') title = t('seo.titleMoments')

  return {
    title,
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    path,
  }
}
