import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'
import LayoutSpacer from '@/components/LayoutSpacer'
import AccountContent from './AccountContent'

export const metadata: Metadata = {
  title: 'My Account',
  robots: { index: false, follow: false },
}

export default function AccountPage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <LayoutSpacer />
        <AccountContent />
      </main>
      <Footer />
    </ToastProvider>
  )
}
