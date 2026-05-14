import type { Metadata } from 'next'
import { Suspense } from 'react'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'
import ShopContent from './ShopContent'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Browse BioVitality™ organic prickly pear vinegar. Choose from our Pharma Line for wellness and detox, or our Food Line for Mediterranean cuisine.',
  openGraph: {
    title: 'Shop BioVitality™',
    description: 'Organic prickly pear vinegar — Pharma Line & Food Line.',
    url: 'https://biovitalitylife.com/shop',
  },
}

export default function ShopPage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen pt-36 px-6 bg-white" />}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </ToastProvider>
  )
}
