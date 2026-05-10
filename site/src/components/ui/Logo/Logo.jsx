/**
 * Guardamar Hotel & Spa logo
 * Design: semi-circular sun rising over three wavy lines
 * Uses provided logo image when useImage=true
 */

export default function Logo({ variant = 'dark', size = 'md', showTagline = true, useImage = false }) {
  const isLight = variant === 'light'
  const iconColor = isLight ? 'text-white' : 'text-stone-900'
  const taglineColor = isLight ? 'text-white/80' : 'text-stone-600'

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  }

  const imgSizes = {
    sm: 'h-14',
    md: 'h-20',
    lg: 'h-24',
  }

  // Use provided logo image (golden sun & waves on dark teal)
  if (useImage) {
    return (
      <img
        src="/logo.png"
        alt="Guardamar Hotel & Spa"
        className={`${imgSizes[size]} w-auto object-contain`}
      />
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* GUARDAMAR - serif, elegant */}
      <span className={`font-cormorant text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide ${iconColor}`}>
        GUARDAMAR
      </span>
      {showTagline && (
        <span className={`font-sans text-xs tracking-[0.25em] mt-0.5 ${taglineColor}`}>
          HOTEL & SPA
        </span>
      )}
    </div>
  )
}
