import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import HeroSection from '@/components/HeroSection'
import TrustBadges from '@/components/TrustBadges'
import ProductLines from '@/components/ProductLines'
import Separator from '@/components/Separator'
import SimpleRitual from '@/components/SimpleRitual'
import WhyBioVitality from '@/components/WhyBioVitality'
import OrganicCertification from '@/components/OrganicCertification'
import PrivateLabelBanner from '@/components/PrivateLabelBanner'
import BlogSection from '@/components/BlogSection'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'
import ScrollReveal from '@/components/ScrollReveal'

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
      <ScrollProgress />
      <TopBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TrustBadges />
        <ProductLines />
        <Separator />
        <SimpleRitual />
        <ScrollReveal offset={30}>
          <OrganicCertification />
        </ScrollReveal>
        <ScrollReveal offset={30}>
          <WhyBioVitality />
        </ScrollReveal>
        <PrivateLabelBanner />
        <BlogSection />
      </main>
      <Footer />
    </ToastProvider>
  )
}
