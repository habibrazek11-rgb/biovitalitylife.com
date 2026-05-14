'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

/**
 * ProductLines — homepage section showcasing both product lines side by side.
 */
export default function ProductLines() {
  return (
    <section className="py-24 px-6 bg-white" aria-labelledby="products-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Our Collection</p>
          <h2 id="products-heading" className="section-title">
            Our Two Premium Lines
          </h2>
        </motion.div>

        {/* Product cards */}
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase
                       text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
          >
            See All Products
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
