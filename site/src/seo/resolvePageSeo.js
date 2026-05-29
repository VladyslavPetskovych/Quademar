import { getRoomBySlug } from '../../rooms'
import { localizeRoom } from '../i18n/localizeRoom'
import { getRoomSeoCopy } from './roomMeta'

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
 * Page-specific `<title>`, meta description, keywords, and optional room hero image path.
 */
export function resolvePageSeo(pathname, locale, t) {
  const path = pathname.replace(/\/+$/, '') || '/'
  let title = t('seo.titleDefault')
  let description = t('seo.description')
  let keywords = t('seo.keywords')
  let ogImagePath = null
  let pageKind = 'default'

  if (path === '/contacts') {
    title = t('seo.titleContacts')
    description = t('seo.descriptionContacts')
  } else if (path === '/suites-rooms') {
    title = t('seo.titleSuites')
    description = t('seo.descriptionSuites')
    keywords = t('seo.keywordsSuites')
    pageKind = 'suitesListing'
  } else if (path.startsWith('/suites-rooms/')) {
    const slug = path.slice('/suites-rooms/'.length).split('/')[0]
    const room = slug ? getRoomBySlug(slug) : null
    const seoCopy = slug ? getRoomSeoCopy(slug, locale) : null

    if (room) {
      const localized = localizeRoom(room, locale)
      title = seoCopy?.title ?? `${localized.title} — Hotel Guardamar`
      const fromSeo = seoCopy?.description ? truncateMetaDescription(seoCopy.description) : ''
      const fromRoom = truncateMetaDescription(localized.description || '')
      description = fromSeo || fromRoom || t('seo.descriptionSuites')
      keywords = seoCopy?.keywords ?? t('seo.keywordsSuites')
      const hero = room.images?.find((img) => img?.src)
      ogImagePath = typeof hero?.src === 'string' ? hero.src : null
      pageKind = 'roomDetail'
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
  } else if (path === '/rules') {
    title = t('seo.titleRules')
    description = t('seo.descriptionRules')
  } else if (path === '/terms') {
    title = t('seo.titleTerms')
    description = t('seo.descriptionTerms')
  } else if (path === '/privacy') {
    title = t('seo.titlePrivacy')
    description = t('seo.descriptionPrivacy')
  }

  return {
    title,
    description,
    keywords,
    path,
    ogImagePath,
    pageKind,
    roomSlug: pageKind === 'roomDetail' ? path.slice('/suites-rooms/'.length).split('/')[0] : null,
  }
}
