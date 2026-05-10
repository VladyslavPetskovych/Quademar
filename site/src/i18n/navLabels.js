/** Maps `NAV_LINKS[].id` to dotted keys under `messages.[locale].nav`. */
export const NAV_I18N_KEY = {
  about: 'about',
  'suites-rooms': 'suitesRooms',
  'restaurant-bar': 'restaurantBar',
  spa: 'spa',
  moments: 'moments',
  contacts: 'contacts',
}

export function navLabelKey(linkId) {
  const tail = NAV_I18N_KEY[linkId]
  return tail ? `nav.${tail}` : `nav.${linkId}`
}
