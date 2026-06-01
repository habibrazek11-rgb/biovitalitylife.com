'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'
import { useCurrencyStore, convertPrice } from '@/store/currencyStore'

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

type Filter = 'all' | 'pharma' | 'food'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'pharma', label: 'Pharma Line' },
  { value: 'food', label: 'Food Line' },
]

export default function ShopContent() {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((s) => s.addItem)
  const { showToast } = useToast()
  const { currency } = useCurrencyStore()

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Sync filter from URL query param
  useEffect(() => {
    const line = searchParams.get('line')
    if (line === 'pharma' || line === 'food') {
      setActiveFilter(line)
    }
  }, [searchParams])

  const filtered = products
    .filter((p) => activeFilter === 'all' || p.line === activeFilter)
    .filter((p) =>
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      line: product.line as 'pharma' | 'food',
      price: product.price,
      currency: product.currency,
      image: product.images[0] ?? '',
    })
    showToast(`${product.name} added to cart`)
  }

  return (
    <>
      {/* Page header */}
      <section className="pt-36 px-6 bg-white" aria-label="Shop header">
      </section>

      {/* Search + Filter + grid */}
      <section className="py-6 px-6 bg-white" aria-label="Product listing">
        <div className="mx-auto max-w-6xl">
          {/* Search + Filter row */}
          <div className="mb-8 flex flex-col gap-4">
            {/* Search */}
            <div className="relative max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border-b border-gray-300 bg-transparent pl-8 pr-4 py-2 text-sm outline-none focus:border-[#084e46] transition-colors placeholder:text-gray-400"
              />
              <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2" role="group" aria-label="Filter products by line">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeFilter === f.value
                      ? 'text-white'
                      : 'text-gray-600 border border-gray-200 hover:border-gray-400'
                  }`}
                  style={activeFilter === f.value ? { backgroundColor: '#084e46' } : {}}
                  aria-pressed={activeFilter === f.value}
                >
                  {f.label}
                </button>
              ))}
              <span className="ml-auto text-xs text-gray-400">{filtered.length} results</span>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-20 text-center text-gray-500">Loading products...</div>
          )}

          {/* Product grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    className="group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-300">No image</div>
                      )}
                      {product.badge && (
                        <span className="absolute top-2 left-2 rounded-sm bg-[#cc0c39] px-2 py-0.5 text-[11px] font-bold text-white">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="mt-3 flex flex-col">
                      <h3 className="text-sm text-[#0f1111] leading-snug line-clamp-3 group-hover:text-[#c45500] transition-colors">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="mt-2 flex items-baseline">
                        <span className="text-2xl font-bold text-[#0f1111] ml-0.5">{convertPrice(product.price, currency)}</span>
                      </div>

                      {/* Delivery */}
                      <p className="mt-1 text-xs text-[#565959]">
                        FREE delivery · <span className="font-bold text-[#0f1111]">Ships to UAE</span>
                      </p>

                      {/* Add to cart button */}
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="mt-3 w-full rounded-full py-2 text-sm font-medium text-[#0f1111] bg-[#ffd814] hover:bg-[#f7ca00] transition-colors border border-[#fcd200] shadow-sm"
                      >
                        Add to cart
                      </button>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filtered.length === 0 && (
            <p className="py-20 text-center text-gray-500">
              No products found for this filter.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
