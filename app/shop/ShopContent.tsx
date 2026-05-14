'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

type Filter = 'all' | 'pharma' | 'food'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'pharma', label: 'Pharma Line' },
  { value: 'food', label: 'Food Line' },
]

export default function ShopContent() {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  // Sync filter from URL query param (e.g. /shop?line=pharma)
  useEffect(() => {
    const line = searchParams.get('line')
    if (line === 'pharma' || line === 'food') {
      setActiveFilter(line)
    }
  }, [searchParams])

  const filtered =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.line === activeFilter)

  return (
    <>
      {/* Page header */}
      <section
        className="pt-16 pb-16 px-6"
        style={{
          background: 'linear-gradient(135deg, #1a3a1b 0%, #2D6A2F 60%, #7a3a1a 100%)',
        }}
        aria-label="Shop header"
      >
        <div className="mx-auto max-w-6xl text-white">
          <motion.p
            className="section-label mb-3"
            style={{ color: 'var(--color-gold)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Collection
          </motion.p>
          <motion.h1
            className="font-heading text-5xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Shop BioVitality™
          </motion.h1>
        </div>
      </section>

      {/* Filter + grid */}
      <section className="py-16 px-6 bg-white" aria-label="Product listing">
        <div className="mx-auto max-w-6xl">
          {/* Filter pills */}
          <div
            className="mb-10 flex flex-wrap gap-3"
            role="group"
            aria-label="Filter products by line"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeFilter === f.value
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-[var(--color-muted)] hover:bg-gray-200'
                }`}
                style={
                  activeFilter === f.value
                    ? { backgroundColor: 'var(--color-primary)' }
                    : {}
                }
                aria-pressed={activeFilter === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-[var(--color-muted)]">
              No products found for this filter.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
