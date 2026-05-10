import { roomsEs } from './esRooms'

function mergeRows(baseRows, patchRows) {
  if (!Array.isArray(patchRows) || patchRows.length === 0) return baseRows
  return baseRows.map((row, i) => {
    const p = patchRows[i]
    if (!p) return row
    return {
      ...row,
      ...p,
      bullets: p.bullets ?? row.bullets,
    }
  })
}

/**
 * Applies Spanish copy from `esRooms` while preserving layout/routes from `rooms.js`.
 */
export function localizeRoom(room, locale) {
  if (locale !== 'es' || !room?.id) return room
  const patch = roomsEs[room.id]
  if (!patch) return room

  const next = {
    ...room,
    title: patch.title ?? room.title,
    description: patch.description ?? room.description,
    ctaLabel: patch.ctaLabel ?? room.ctaLabel,
  }

  if (Array.isArray(patch.images) && Array.isArray(room.images)) {
    next.images = room.images.map((img, i) => ({
      ...img,
      alt: patch.images[i]?.alt ?? img.alt,
    }))
  }

  if (patch.features?.length) {
    next.features = patch.features
  }

  if (patch.detailSection && room.detailSection) {
    const ds = patch.detailSection
    next.detailSection = {
      ...room.detailSection,
      ...ds,
      left: mergeRows(room.detailSection.left ?? [], ds.left),
      right: mergeRows(room.detailSection.right ?? [], ds.right),
    }
  }

  return next
}
