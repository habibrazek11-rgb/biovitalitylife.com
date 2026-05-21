import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog – Wellness Insights',
  description: 'Explore articles about organic prickly pear vinegar, wellness tips, Mediterranean recipes, and natural health.',
}

export default function BlogPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <BlogContent />
      </main>
      <Footer />
    </>
  )
}
