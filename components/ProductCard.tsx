'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'
import StarRating from '@/components/ui/StarRating'
import { useCurrencyStore, convertPrice } from '@/store/currencyStore'
import type { Currency } from '@/store/currencyStore'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

/**
 * ProductCard — reusable card used in ProductLines section and /shop page.
 */
export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const { showToast } = useToast()
  const { currency, setCurrency } = useCurrencyStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      line: product.line,
      price: product.price,
      currency: product.currency,
      image: product.images[0] ?? '',
    })
    showToast(`${product.line === 'pharma' ? 'Pharma Line' : 'Food Line'} added to cart`)
  }

  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100"
    >
      <Link href={`/shop/${product.slug}`} className="block" aria-label={`View ${product.name}`}>
        {/* Product image */}
        <div className="relative h-64 w-full overflow-hidden bg-[var(--color-cream)]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md"
              style={{ backgroundColor: 'var(--color-gold)' }}
            >
              {product.badge}
            </span>
          )}
          {/* Line tag */}
          <span
            className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white capitalize backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          >
            {product.line} Line
          </span>
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mb-1 font-heading text-lg font-bold text-[var(--color-dark)] leading-snug
                         group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="mb-3 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="font-heading text-2xl font-bold text-[var(--color-dark)]">
              {convertPrice(product.price, currency)}
            </span>
            <div className="flex items-center gap-1">
              {(['AED', 'USD', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={(e) => { e.preventDefault(); setCurrency(c) }}
                  className={`px-1.5 py-0.5 text-[10px] rounded-full border transition-all ${
                    currency === c
                      ? 'bg-[#084e46] text-white border-[#084e46]'
                      : 'text-gray-400 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white
                       transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: 'var(--color-accent)' }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={16} aria-hidden="true" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.article>
  )
}
