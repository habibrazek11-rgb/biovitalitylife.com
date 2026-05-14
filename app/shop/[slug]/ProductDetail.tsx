'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'
import StarRating from '@/components/ui/StarRating'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'

type Tab = 'description' | 'benefits' | 'howToUse' | 'certifications'

const tabs: { value: Tab; label: string }[] = [
  { value: 'description', label: 'Description' },
  { value: 'benefits', label: 'Benefits' },
  { value: 'howToUse', label: 'How to Use' },
  { value: 'certifications', label: 'Certifications' },
]

interface Props {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetail({ product, relatedProducts }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<Tab>('description')
  const addItem = useCartStore((s) => s.addItem)
  const { showToast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        line: product.line,
        price: product.price,
        image: product.images[0] ?? '',
      })
    }
    showToast(`${quantity}× ${product.line === 'pharma' ? 'Pharma Line' : 'Food Line'} added to cart`)
  }

  return (
    <>
      {/* Product section */}
      <section className="pt-36 pb-20 px-6 bg-white" aria-label="Product detail">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Image */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-[var(--color-cream)]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-[500px] w-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                />
              </div>
              {product.badge && (
                <span
                  className="absolute top-5 left-5 z-10 rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-md"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                >
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Line badge */}
              <span
                className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-bold text-white capitalize"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {product.line} Line
              </span>

              <h1 className="mb-4 font-heading text-3xl font-bold text-[var(--color-dark)] leading-snug md:text-4xl">
                {product.name}
              </h1>

              <div className="mb-5">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size={18} />
              </div>

              <p className="mb-6 text-[var(--color-muted)] text-lg leading-relaxed">
                {product.shortDescription}
              </p>

              <div className="mb-8">
                <span className="font-heading text-4xl font-bold text-[var(--color-dark)]">
                  {product.currency} {product.price}
                </span>
                <span className="ml-2 text-sm text-[var(--color-muted)]">/ 250ml</span>
              </div>

              {/* Quantity selector */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-sm font-semibold text-[var(--color-dark)]">Quantity</span>
                <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-[var(--color-muted)]
                               hover:bg-gray-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    className="flex h-10 w-12 items-center justify-center text-sm font-bold
                               border-x border-gray-200 text-[var(--color-dark)]"
                    aria-live="polite"
                    aria-label={`Quantity: ${quantity}`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-[var(--color-muted)]
                               hover:bg-gray-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-3 rounded-xl py-4 text-base
                           font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <ShoppingCart size={20} aria-hidden="true" />
                Add to Cart — {product.currency} {product.price * quantity}
              </button>

              {/* Trust badges */}
              <div className="mt-6 flex flex-wrap gap-4">
                {['Free Shipping over AED 200', 'Certified Organic', 'Secure Checkout'].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
                    <CheckCircle size={14} className="text-[var(--color-primary)]" aria-hidden="true" />
                    {badge}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div
              className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto"
              role="tablist"
              aria-label="Product information tabs"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={activeTab === tab.value}
                  aria-controls={`tab-panel-${tab.value}`}
                  onClick={() => setActiveTab(tab.value)}
                  className={`whitespace-nowrap px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                    activeTab === tab.value
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-dark)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              className="max-w-3xl"
            >
              {activeTab === 'description' && (
                <p className="text-[var(--color-muted)] leading-relaxed text-lg">
                  {product.description}
                </p>
              )}
              {activeTab === 'benefits' && (
                <ul className="space-y-3" role="list">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-[var(--color-primary)] shrink-0" aria-hidden="true" />
                      <span className="text-[var(--color-muted)]">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'howToUse' && (
                <ol className="space-y-4" role="list">
                  {product.howToUse.map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-[var(--color-muted)] leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {activeTab === 'certifications' && (
                <ul className="space-y-3" role="list">
                  {product.certifications.map((cert) => (
                    <li key={cert} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                      <span className="text-[var(--color-muted)]">{cert}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section
          className="py-20 px-6"
          style={{ backgroundColor: 'var(--color-cream)' }}
          aria-labelledby="related-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="related-heading" className="section-title mb-10">
              You May Also Like
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
