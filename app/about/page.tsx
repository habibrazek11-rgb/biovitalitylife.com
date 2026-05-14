import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about BioVitality™ — our Tunisian heritage, organic farming practices, and the story behind our premium prickly pear vinegar.',
  openGraph: {
    title: 'About BioVitality™',
    description: 'Our Tunisian heritage and the story behind our premium prickly pear vinegar.',
    url: 'https://biovitalitylife.com/about',
  },
}

export default function AboutPage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <AboutContent />
      </main>
      <Footer />
    </ToastProvider>
  )
}
