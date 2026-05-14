import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'
import CartContent from './CartContent'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Review your BioVitality™ cart and proceed to checkout.',
}

export default function CartPage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <CartContent />
      </main>
      <Footer />
    </ToastProvider>
  )
}
