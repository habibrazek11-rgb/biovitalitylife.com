import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'
import CheckoutContent from './CheckoutContent'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your BioVitality™ order securely.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <CheckoutContent />
      </main>
      <Footer />
    </ToastProvider>
  )
}
