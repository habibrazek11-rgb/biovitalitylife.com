'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart, CheckCircle, Shield, Truck, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'
import { useCurrencyStore, convertPrice } from '@/store/currencyStore'
import type { Currency } from '@/store/currencyStore'

interface Product {
  id: string
  name: string
  slug: string
  line: string
  price: number
  currency: string
  shortDescription: string | null
  description: string | null
  badge: string | null
  images: string[]
  benefits: string[]
  howToUse: string[]
  certifications: string[]
  inStock: boolean
  category: { id: string; name: string } | null
}

interface ProductDetails {
  text: string
  itemForm: string
  volume: string
  weight: string
  numberOfItems: string
  unitCount: string
  countryOfOrigin: string
}

function parseDescription(desc: string | null): ProductDetails {
  if (!desc) return { text: '', itemForm: 'Liquid', volume: '250 Milliliters', weight: '', numberOfItems: '1', unitCount: '250 Milliliters', countryOfOrigin: 'Tunisia' }
  try {
    const parsed = JSON.parse(desc)
    return {
      text: parsed.text || '',
      itemForm: parsed.itemForm || 'Liquid',
      volume: parsed.volume || '250 Milliliters',
      weight: parsed.weight || '',
      numberOfItems: parsed.numberOfItems || '1',
      unitCount: parsed.unitCount || '250 Milliliters',
      countryOfOrigin: parsed.countryOfOrigin || 'Tunisia',
    }
  } catch {
    return { text: desc, itemForm: 'Liquid', volume: '250 Milliliters', weight: '', numberOfItems: '1', unitCount: '250 Milliliters', countryOfOrigin: 'Tunisia' }
  }
}

interface Props {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailPage({ product, relatedProducts }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    highlights: true,
    about: true,
    details: false,
    measurements: false,
    howToUse: false,
  })
  const addItem = useCartStore((s) => s.addItem)
  const { showToast } = useToast()
  const { currency, setCurrency } = useCurrencyStore()
  const details = parseDescription(product.description)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        line: product.line as 'pharma' | 'food',
        price: product.price,
        currency: product.currency,
        image: product.images[0] ?? '',
      })
    }
    showToast(`${quantity}× ${product.name} added to cart`)
  }

  return (
    <>
      <section className="pt-32 pb-16 px-4 md:px-6 bg-white" aria-label="Product detail">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li><Link href="/shop" className="hover:text-[#084e46] transition-colors">Shop</Link></li>
              <li className="text-gray-300">/</li>
              <li>
                <Link
                  href={`/shop?line=${product.line}`}
                  className="hover:text-[#084e46] transition-colors"
                >
                  {product.line === 'pharma' ? 'Wellness Line' : product.line === 'food' ? 'Gourmet Line' : product.line}
                </Link>
              </li>
              <li className="text-gray-300">/</li>
              <li className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</li>
            </ol>
          </nav>

          {/* Main grid: Images | Info | Buy box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: Image gallery */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="flex gap-3">
                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex flex-col gap-2 shrink-0">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onMouseEnter={() => setSelectedImage(i)}
                          onClick={() => setSelectedImage(i)}
                          className={`relative w-12 h-12 overflow-hidden border transition-all ${
                            selectedImage === i
                              ? 'border-[#084e46] shadow-sm'
                              : 'border-gray-200 hover:border-[#084e46]'
                          }`}
                        >
                          <Image src={img} alt="" fill sizes="48px" className="object-contain p-0.5" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Main image with zoom */}
                  <div
                    className="relative flex-1 aspect-square overflow-hidden border border-gray-200 rounded-sm cursor-crosshair"
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onMouseMove={handleMouseMove}
                  >
                    {product.images[selectedImage] ? (
                      <>
                        <Image
                          src={product.images[selectedImage]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-contain p-4"
                          priority
                        />
                        {/* Zoom overlay */}
                        {isZooming && (
                          <div
                            className="absolute inset-0 z-10 pointer-events-none"
                            style={{
                              backgroundImage: `url(${product.images[selectedImage]})`,
                              backgroundSize: '250%',
                              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        No image
                      </div>
                    )}
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-20 rounded-sm bg-[#cc0c39] px-2.5 py-1 text-xs font-bold text-white">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Product info */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Title */}
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-2">
                  {product.name}
                </h1>

                {/* Brand */}
                <p className="text-sm mb-3">
                  <span className="text-gray-500">Brand: </span>
                  <span className="text-[#084e46] font-medium">BioVitality™</span>
                </p>

                {/* Line badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Set name:</span>
                  <span className="inline-block rounded border border-[#084e46] px-3 py-1 text-xs font-bold text-[#084e46] capitalize">
                    {product.line} Line
                  </span>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-3xl font-bold text-gray-900">{convertPrice(product.price, currency)}</span>
                    <div className="flex items-center gap-1">
                      {(['AED', 'USD', 'EUR'] as Currency[]).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCurrency(c)}
                          className={`px-2 py-0.5 text-xs rounded-full border transition-all ${
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
                  <p className="text-xs text-gray-500 mt-1">All prices include VAT.</p>
                </div>

                <hr className="my-4 border-gray-200" />

                {/* Top highlights */}
                <CollapsibleSection
                  title="Top highlights"
                  expanded={expandedSections.highlights}
                  onToggle={() => toggleSection('highlights')}
                >
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700 whitespace-nowrap">Item form</td>
                        <td className="py-2 text-gray-600">{details.itemForm || 'Liquid'}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700 whitespace-nowrap">Brand</td>
                        <td className="py-2 text-gray-600">BioVitality™</td>
                      </tr>
                      {details.volume && (
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-medium text-gray-700 whitespace-nowrap">Liquid volume</td>
                          <td className="py-2 text-gray-600">{details.volume}</td>
                        </tr>
                      )}
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700 whitespace-nowrap">Number of items</td>
                        <td className="py-2 text-gray-600">{details.numberOfItems || '1'}</td>
                      </tr>
                      {details.unitCount && (
                        <tr>
                          <td className="py-2 pr-4 font-medium text-gray-700 whitespace-nowrap">Unit count</td>
                          <td className="py-2 text-gray-600">{details.unitCount}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CollapsibleSection>

                {/* About this item */}
                {product.benefits.length > 0 && (
                  <CollapsibleSection
                    title="About this item"
                    expanded={expandedSections.about}
                    onToggle={() => toggleSection('about')}
                  >
                    <ul className="space-y-2.5">
                      {product.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CollapsibleSection>
                )}

                {/* Item details */}
                <CollapsibleSection
                  title="Item details"
                  expanded={expandedSections.details}
                  onToggle={() => toggleSection('details')}
                >
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700">Item Form</td>
                        <td className="py-2 text-gray-600">{details.itemForm || 'Liquid'}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700">Brand Name</td>
                        <td className="py-2 text-gray-600">BioVitality™</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700">Manufacturer</td>
                        <td className="py-2 text-gray-600">BioVitality™</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700">Set Name</td>
                        <td className="py-2 text-gray-600 capitalize">{product.line} Line</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700">Country of Origin</td>
                        <td className="py-2 text-gray-600">{details.countryOfOrigin || 'Tunisia'}</td>
                      </tr>
                      {product.category && (
                        <tr>
                          <td className="py-2 pr-4 font-medium text-gray-700">Category</td>
                          <td className="py-2 text-gray-600">{product.category.name}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CollapsibleSection>

                {/* Measurements */}
                <CollapsibleSection
                  title="Measurements"
                  expanded={expandedSections.measurements}
                  onToggle={() => toggleSection('measurements')}
                >
                  <table className="w-full text-sm">
                    <tbody>
                      {details.volume && (
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-medium text-gray-700">Liquid Volume</td>
                          <td className="py-2 text-gray-600">{details.volume}</td>
                        </tr>
                      )}
                      <tr className="border-b border-gray-100">
                        <td className="py-2 pr-4 font-medium text-gray-700">Number of Items</td>
                        <td className="py-2 text-gray-600">{details.numberOfItems || '1'}</td>
                      </tr>
                      {details.unitCount && (
                        <tr className="border-b border-gray-100">
                          <td className="py-2 pr-4 font-medium text-gray-700">Unit Count</td>
                          <td className="py-2 text-gray-600">{details.unitCount}</td>
                        </tr>
                      )}
                      {details.weight && (
                        <tr>
                          <td className="py-2 pr-4 font-medium text-gray-700">Item Package Weight</td>
                          <td className="py-2 text-gray-600">{details.weight}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CollapsibleSection>

                {/* How to use */}
                {product.howToUse.length > 0 && (
                  <CollapsibleSection
                    title="How to use"
                    expanded={expandedSections.howToUse}
                    onToggle={() => toggleSection('howToUse')}
                  >
                    <ol className="space-y-2">
                      {product.howToUse.map((step, i) => (
                        <li key={step} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#084e46] text-[10px] font-bold text-white mt-0.5">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CollapsibleSection>
                )}

                {/* Full description */}
                {details.text && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 leading-relaxed">{details.text}</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Buy box */}
            <div className="lg:col-span-3">
              <motion.div
                className="sticky top-28 rounded-xl border border-gray-200 p-5 bg-white shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-bold text-gray-900">{convertPrice(product.price, currency)}</span>
                    <div className="flex items-center gap-1">
                      {(['AED', 'USD', 'EUR'] as Currency[]).map((c) => (
                        <button
                          key={c}
                          onClick={() => setCurrency(c)}
                          className={`px-2 py-0.5 text-xs rounded-full border transition-all ${
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
                </div>

                {/* Delivery info */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Truck size={15} className="text-[#084e46] shrink-0" />
                    <span>Free delivery on orders over AED 300</span>
                  </div>
                </div>

                {/* Stock status */}
                <p className={`mb-4 text-lg font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>

                {/* Quantity */}
                {product.inStock && (
                  <>
                    <div className="mb-4">
                      <label className="text-sm text-gray-600 mb-1.5 block">Quantity:</label>
                      <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden w-fit">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="flex h-9 w-9 items-center justify-center text-gray-500 hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex h-9 w-10 items-center justify-center text-sm font-bold border-x border-gray-300">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="flex h-9 w-9 items-center justify-center text-gray-500 hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Add to cart button */}
                    <button
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-gray-900 bg-[#ffd814] hover:bg-[#f7ca00] transition-colors mb-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>

                    {/* Buy now */}
                    <Link
                      href="/checkout"
                      onClick={handleAddToCart}
                      className="w-full flex items-center justify-center rounded-full py-3 text-sm font-bold text-gray-900 bg-[#ffa41c] hover:bg-[#fa8900] transition-colors mb-2"
                    >
                      Buy Now
                    </Link>

                    {/* Buy on Amazon.ae */}
                    <a
                      href="https://www.amazon.ae/BioVitality-Organic-Prickly-Vinegar-250ml/dp/B0GQBN1JB4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 rounded-full py-3 text-sm font-bold text-gray-900 bg-white border-2 border-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src="/AMZN-LOGO.png"
                        alt="Amazon.ae"
                        width={70}
                        height={21}
                        className="h-4 w-auto"
                      />
                      Buy on Amazon.ae
                    </a>
                  </>
                )}

                {/* Seller info */}
                <div className="mt-5 pt-4 border-t border-gray-200 space-y-1.5 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Sold by</span>
                    <span className="text-[#084e46] font-medium">BioVitality™</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span className="text-gray-700">Secure transaction</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-5 pt-4 border-t border-gray-200 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw size={16} className="text-gray-400" />
                    <span className="text-[10px] text-gray-500 leading-tight">Easy Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Shield size={16} className="text-gray-400" />
                    <span className="text-[10px] text-gray-500 leading-tight">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck size={16} className="text-gray-400" />
                    <span className="text-[10px] text-gray-500 leading-tight">Fast Delivery</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 md:px-6 bg-[#f8f7f4]" aria-labelledby="related-heading">
          <div className="mx-auto max-w-7xl">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900 mb-8">
              Products related to this item
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="group flex gap-4 rounded-xl bg-white border border-gray-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#f8f7f4]">
                    {p.images[0] && (
                      <Image src={p.images[0]} alt={p.name} fill sizes="80px" className="object-contain p-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#084e46] transition-colors">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      {convertPrice(p.price, currency)}
                    </p>
                    {p.inStock && (
                      <p className="mt-0.5 text-xs text-green-600 font-medium">In Stock</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

/* Collapsible section component */
function CollapsibleSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={expanded}
      >
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {expanded ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>
      {expanded && <div className="mt-3">{children}</div>}
    </div>
  )
}
