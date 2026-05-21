import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ui/ToastProvider'
import ProductDetailPage from './ProductDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } })
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, shortDescription: true, slug: true },
  })
  if (!product) return {}

  return {
    title: `${product.name} – BioVitality™`,
    description: product.shortDescription || undefined,
    openGraph: {
      title: product.name,
      description: product.shortDescription || undefined,
      url: `https://biovitalitylife.com/shop/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: { select: { id: true, name: true } } },
  })

  if (!product) notFound()

  // Get related products (same line, exclude current)
  const relatedProducts = await prisma.product.findMany({
    where: { line: product.line, id: { not: product.id }, inStock: true },
    include: { category: { select: { id: true, name: true } } },
    take: 3,
    orderBy: { createdAt: 'desc' },
  })

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    brand: { '@type': 'Brand', name: 'BioVitality™' },
    image: product.images[0],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://biovitalitylife.com/shop/${product.slug}`,
    },
  }

  return (
    <ToastProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TopBar />
      <Navbar />
      <main id="main-content">
        <ProductDetailPage product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </ToastProvider>
  )
}
