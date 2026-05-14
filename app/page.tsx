import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import WhyBioVitality from '@/components/WhyBioVitality'
import SimpleRitual from '@/components/SimpleRitual'
import OrganicCertification from '@/components/OrganicCertification'
import HowToUse from '@/components/HowToUse'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'

export const metadata: Metadata = {
  title: 'BioVitality™ – Pure Organic Prickly Pear Vinegar',
  description:
    'Discover BioVitality™ — premium organic prickly pear vinegar from Tunisia. Raw, unfiltered, with the Mother. For detox, gut health and Mediterranean cuisine. Free shipping over AED 200.',
  openGraph: {
    title: 'BioVitality™ – Pure Organic Prickly Pear Vinegar',
    description:
      'Premium organic prickly pear vinegar from Tunisia. Raw, unfiltered, with the Mother.',
    url: 'https://biovitalitylife.com',
  },
}

export default function HomePage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <WhyBioVitality />
        <OrganicCertification />
        <SimpleRitual />x²
        <HowToUse />
        <ContactSection />
      </main>
      <Footer />
    </ToastProvider>
  )
}
