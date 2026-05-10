/**
 * Animated burger menu button - morphs to X when open
 */

import { useLanguage } from '../../../i18n/LanguageContext'

export default function BurgerButton({ isOpen, onClick, className = '' }) {
  const { t } = useLanguage()
  return (
    <button
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-current/20 focus:ring-offset-2 focus:ring-offset-transparent ${className}`}
      aria-label={isOpen ? t('aria.closeMenuBurger') : t('aria.openMenu')}
      aria-expanded={isOpen}
    >
      <span className="relative w-8 h-6 block">
        <span
          className={`absolute left-0 h-[2.5px] w-8 rounded-full bg-current origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
          }`}
        />
        <span
          className={`absolute left-0 top-[33%] h-[2.5px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        />
        <span
          className={`absolute left-0 top-[66%] h-[2.5px] w-8 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        />
        <span
          className={`absolute left-0 h-[2.5px] w-4 rounded-full bg-current origin-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
          }`}
        />
      </span>
    </button>
  )
}
