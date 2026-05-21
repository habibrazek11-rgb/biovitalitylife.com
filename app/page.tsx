import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import HeroSection from '@/components/HeroSection'
import ProductLines from '@/components/ProductLines'
import FeaturedProducts from '@/components/FeaturedProducts'
import WhyBioVitality from '@/components/WhyBioVitality'
import SimpleRitual from '@/components/SimpleRitual'
import OrganicCertification from '@/components/OrganicCertification'
import HowToUse from '@/components/HowToUse'
import BlogSection from '@/components/BlogSection'
import PrivateLabel from '@/components/PrivateLabel'
import ContactSection from '@/components/ContactSection'
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
        <ProductLines />
        <ScrollReveal offset={50}>
          <FeaturedProducts />
        </ScrollReveal>
        <ScrollReveal offset={40} scale>
          <WhyBioVitality />
        </ScrollReveal>
        <ScrollReveal offset={30}>
          <OrganicCertification />
        </ScrollReveal>
        <ScrollReveal offset={40} scale>
          <SimpleRitual />
        </ScrollReveal>
        <ScrollReveal offset={30}>
          <HowToUse />
        </ScrollReveal>
        <ScrollReveal offset={40}>
          <BlogSection />
        </ScrollReveal>
        <ScrollReveal offset={50} scale>
          <PrivateLabel />
        </ScrollReveal>
        <ScrollReveal offset={30}>
          <ContactSection />
        </ScrollReveal>
      </main>
      <Footer />
    </ToastProvider>
  )
}
