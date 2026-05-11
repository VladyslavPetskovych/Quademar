import { getRoomBySlug } from '../../rooms'
import { localizeRoom } from '../i18n/localizeRoom'

const META_DESC_MAX = 158

function truncateMetaDescription(text, max = META_DESC_MAX) {
  const s = (text || '').replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const head = lastSpace > max * 0.55 ? cut.slice(0, lastSpace) : cut
  return `${head.trimEnd()}…`
}

/**
 * Page-specific `<title>` and meta description (unique per route where possible).
 */
export function resolvePageSeo(pathname, locale, t) {
  const path = pathname.replace(/\/+$/, '') || '/'
  let title = t('seo.titleDefault')
  let description = t('seo.description')

  if (path === '/contacts') {
    title = t('seo.titleContacts')
    description = t('seo.descriptionContacts')
  } else if (path === '/suites-rooms') {
    title = t('seo.titleSuites')
    description = t('seo.descriptionSuites')
  } else if (path.startsWith('/suites-rooms/')) {
    const slug = path.slice('/suites-rooms/'.length)
    const room = slug ? getRoomBySlug(slug) : null
    if (room) {
      const localized = localizeRoom(room, locale)
      title = `${localized.title} — Hotel Guardamar`
      const fromRoom = truncateMetaDescription(localized.description || '')
      description = fromRoom || t('seo.descriptionSuites')
    }
  } else if (path === '/restaurant-bar') {
    title = t('seo.titleRestaurant')
    description = t('seo.descriptionRestaurant')
  } else if (path === '/spa') {
    title = t('seo.titleSpa')
    description = t('seo.descriptionSpa')
  } else if (path === '/moments') {
    title = t('seo.titleMoments')
    description = t('seo.descriptionMoments')
  }

  return {
    title,
    description,
    keywords: t('seo.keywords'),
    path,
  }
}
