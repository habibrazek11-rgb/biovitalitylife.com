import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import HeroSection from '@/components/HeroSection'
import ProductLines from '@/components/ProductLines'
import Separator from '@/components/Separator'
import WellnessBanner from '@/components/WellnessBanner'
import SimpleRitual from '@/components/SimpleRitual'
import KitchenCarousel from '@/components/KitchenCarousel'
import OrganicCertification from '@/components/OrganicCertification'
import PrivateLabelBanner from '@/components/PrivateLabelBanner'
import FAQ from '@/components/FAQ'
import BlogSection from '@/components/BlogSection'
import Newsletter from '@/components/Newsletter'
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
      <ScrollProgress />
      <TopBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ProductLines />
        <Separator />
        <WellnessBanner />
        <SimpleRitual />
        <KitchenCarousel />
        <OrganicCertification />
        <PrivateLabelBanner />
        <FAQ />
        <Newsletter />
        <BlogSection />
      </main>
      <Footer />
    </ToastProvider>
  )
}
