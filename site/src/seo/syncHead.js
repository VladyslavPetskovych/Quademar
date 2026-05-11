function upsertMetaByName(name, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertMetaByProperty(property, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLinkCanonical(href) {
  if (!href) return
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps title, description, keywords, Open Graph, Twitter card, and canonical in sync after navigation or locale change.
 */
export function syncDocumentMeta({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImageUrl,
  ogImageAlt,
  ogImageWidth = '1200',
  ogImageHeight = '630',
  locale,
  siteName = 'Hotel Guardamar',
}) {
  if (title) document.title = title

  upsertMetaByName('description', description)
  upsertMetaByName('keywords', keywords)

  upsertMetaByProperty('og:type', 'website')
  upsertMetaByProperty('og:site_name', siteName)
  upsertMetaByProperty('og:title', title)
  upsertMetaByProperty('og:description', description)
  upsertMetaByProperty('og:url', canonicalUrl)
  upsertMetaByProperty('og:image', ogImageUrl)
  upsertMetaByProperty('og:image:width', ogImageWidth)
  upsertMetaByProperty('og:image:height', ogImageHeight)
  upsertMetaByProperty('og:image:alt', ogImageAlt || title)
  upsertMetaByProperty('og:locale', locale === 'es' ? 'es_ES' : 'en_GB')
  upsertMetaByProperty('og:locale:alternate', locale === 'es' ? 'en_GB' : 'es_ES')

  upsertMetaByName('twitter:card', 'summary_large_image')
  upsertMetaByName('twitter:title', title)
  upsertMetaByName('twitter:description', description)
  upsertMetaByName('twitter:image', ogImageUrl)

  upsertLinkCanonical(canonicalUrl)
}
