'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'

interface Product {
  id: string
  slug: string
  name: string
  line: string
  price: number
  currency: string
  shortDescription: string | null
  badge: string | null
  images: string[]
  inStock: boolean
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [ready, setReady] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const { showToast } = useToast()

  useEffect(() => {
    fetch('/api/products')
      .then((r) => {
        if (!r.ok) throw new Error('Failed')
        return r.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 6))
          setReady(true)
        }
      })
      .catch((err) => console.error('FeaturedProducts fetch error:', err))
  }, [])

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      line: product.line as 'pharma' | 'food',
      price: product.price,
      image: product.images[0] ?? '',
    })
    showToast(`${product.name} added to cart`)
  }

  if (!ready) return null

  return (
    <section className="py-24 px-6 bg-white" aria-label="Featured products">
      <div className="mx-auto max-w-5xl text-center">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
            Our Products
          </p>
          <h2 className="font-heading text-4xl font-bold text-[var(--color-dark)] md:text-5xl">
            Crafted for Wellness
          </h2>
        </motion.div>

        {/* Products — centered, no cards */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-20">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group w-[240px]"
            >
              <Link href={`/shop/${product.slug}`} className="block text-center">
                {/* Image */}
                <div className="relative mx-auto h-64 w-52 mb-6 overflow-hidden">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="208px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-gray-300 text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-heading text-lg font-bold text-[var(--color-dark)] leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {product.name}
                </h3>

                {/* Price */}
                <p className="mt-2 text-base text-[var(--color-muted)]">
                  {product.currency} {product.price}
                </p>
              </Link>

              {/* Add to cart */}
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all"
          >
            View all products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
