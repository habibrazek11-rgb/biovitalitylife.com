import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import ToastProvider from '@/components/ui/ToastProvider'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with BioVitality™. We are here to answer your questions about our organic prickly pear vinegar.',
  openGraph: {
    title: 'Contact BioVitality™',
    description: 'Get in touch with us.',
    url: 'https://biovitalitylife.com/contact',
  },
}

export default function ContactPage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main id="main-content" className="pt-24">
        <ContactSection />
      </main>
      <Footer />
    </ToastProvider>
  )
}
