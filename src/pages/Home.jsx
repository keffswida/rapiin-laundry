import Hero from '../components/sections/Hero'
import FeatureStrip from '../components/sections/FeatureStrip'
import Services from '../components/sections/Services'
import Pricing from '../components/sections/Pricing'
import HowItWorks from '../components/sections/HowItWorks'
import Promise from '../components/sections/Promise'
import Testimonials from '../components/sections/Testimonials'
import FAQ from '../components/sections/FAQ'
import CTABanner from '../components/sections/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <Services />
      <Pricing />
      <HowItWorks />
      <Promise />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  )
}
