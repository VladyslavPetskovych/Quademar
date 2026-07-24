import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Lenis } from 'lenis/react'
import HomeHero from '../components/sections/HomeHero'
import HomeIntroSection from '../components/sections/HomeIntroSection'
import HomeSpringSection from '../components/sections/HomeSpringSection'
import HomeJardinSection from '../components/sections/HomeJardinSection'
import HomeDiscoverySection from '../components/sections/HomeDiscoverySection'
import HomeResidenceSection from '../components/sections/HomeResidenceSection'
import OpeningPartyButton from '../components/OpeningPartyButton'

export default function HomePage() {
  const reduceMotion = useReducedMotion()
  const lenisOptions = useMemo(
    () => ({
      lerp: 0.085,
      smoothWheel: true,
    }),
    [],
  )

  const sections = (
    <>
      <HomeHero />
      <HomeIntroSection />
      <HomeSpringSection />
      <HomeJardinSection />
      <HomeDiscoverySection />
      <HomeResidenceSection />
      <OpeningPartyButton />
    </>
  )

  if (reduceMotion) {
    return sections
  }

  return (
    <Lenis root options={lenisOptions} autoRaf>
      {sections}
    </Lenis>
  )
}
