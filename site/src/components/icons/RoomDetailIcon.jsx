import bathroomIcon from '../../assets/icons/room-details/bathroom.svg'
import bedIcon from '../../assets/icons/room-details/bed.svg'
import featuresIcon from '../../assets/icons/room-details/features.svg'
import guestsIcon from '../../assets/icons/room-details/guests.svg'
import sizeIcon from '../../assets/icons/room-details/size.svg'
import viewIcon from '../../assets/icons/room-details/view.svg'

const ICON_SRC = {
  bed: bedIcon,
  size: sizeIcon,
  view: viewIcon,
  guests: guestsIcon,
  bathroom: bathroomIcon,
  features: featuresIcon,
}

/**
 * Room detail row icons from Figma “room details1” (Vuesax linear set).
 */
export default function RoomDetailIcon({ type, className = 'h-6 w-6 shrink-0' }) {
  const src = ICON_SRC[type] ?? ICON_SRC.features

  return <img src={src} alt="" aria-hidden="true" className={className} />
}
