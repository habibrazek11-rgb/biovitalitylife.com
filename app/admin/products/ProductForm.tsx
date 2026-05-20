'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  X,
  Eye,
  Globe,
  Search,
  GripVertical,
} from 'lucide-react'
import { UploadDropzone } from '@/lib/uploadthing-components'

interface Category {
  id: string
  name: string
}

interface ProductData {
  id?: string
  name: string
  slug?: string
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
  categoryId: string | null
  seoTitle: string | null
  seoDescription: string | null
}

interface ProductFormProps {
  product?: ProductData
  isEditing?: boolean
}

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  // Form state
  const [name, setName] = useState(product?.name || '')
  const [line, setLine] = useState(product?.line || 'pharma')
  const [price, setPrice] = useState(product?.price?.toString() || '')
  const [currency, setCurrency] = useState(product?.currency || 'AED')
  const [shortDescription, setShortDescription] = useState(product?.shortDescription || '')
  const [description, setDescription] = useState(product?.description || '')
  const [badge, setBadge] = useState(product?.badge || '')
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [benefits, setBenefits] = useState(product?.benefits?.join('\n') || '')
  const [howToUse, setHowToUse] = useState(product?.howToUse?.join('\n') || '')
  const [certifications, setCertifications] = useState(product?.certifications?.join('\n') || '')
  const [categoryId, setCategoryId] = useState(product?.categoryId || '')
  const [inStock, setInStock] = useState(product?.inStock ?? true)
  const [seoTitle, setSeoTitle] = useState(product?.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(product?.seoDescription || '')

  // Derived slug preview
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name,
      line,
      price,
      currency,
      shortDescription: shortDescription || null,
      description: description || null,
      badge: badge || null,
      images,
      benefits: benefits.split('\n').filter(Boolean),
      howToUse: howToUse.split('\n').filter(Boolean),
      certifications: certifications.split('\n').filter(Boolean),
      categoryId: categoryId || null,
      inStock,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
    }

    const url = isEditing
      ? `/api/admin/products/${product?.id}`
      : '/api/admin/products'
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/products')
      }
    } finally {
      setSaving(false)
    }
  }

  const removeImage = (url: string) => {
    setImages(images.filter((i) => i !== url))
  }

  // SEO preview values
  const previewTitle = seoTitle || name || 'Product title'
  const previewDescription =
    seoDescription || shortDescription || 'Product description will appear here...'
  const previewUrl = `biovitalitylife.com/shop/${slug || 'product-url'}`

  return (
    <form onSubmit={handleSubmit}>
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white rounded-xl mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/products"
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Back to products"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {isEditing ? 'Edit product' : 'Add product'}
              </h1>
              {isEditing && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Editing {product?.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Discard
            </Link>
            <button
              type="submit"
              disabled={saving || !name || !price}
              className="rounded-lg px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#084e46' }}
            >
              {saving ? 'Saving...' : isEditing ? 'Save' : 'Save product'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Description card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder="Short sleeve t-shirt"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Short description
                  </label>
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder="Brief product summary for listings..."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none resize-y
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder="Full product description..."
                  />
                </div>
              </div>
            </div>

            {/* Media card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold text-gray-900">Media</h2>
              {images.length > 0 && (
                <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {images.map((url, idx) => (
                    <div
                      key={url}
                      className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                    >
                      <Image src={url} alt="" fill className="object-cover" sizes="150px" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <button
                        type="button"
                        onClick={() => removeImage(url)}
                        className="absolute top-2 right-2 rounded-full bg-white/90 p-1 text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                      >
                        <X size={14} />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          Main
                        </span>
                      )}
                      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                        <GripVertical size={14} className="text-white drop-shadow" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {images.length < 5 && (
                <UploadDropzone
                  endpoint="productImage"
                  config={{ mode: 'auto' }}
                  onClientUploadComplete={(res) => {
                    if (res) {
                      const newUrls = res.map((f) => f.url)
                      setImages([...images, ...newUrls].slice(0, 5))
                    }
                  }}
                  onUploadError={(err) => alert(err.message)}
                />
              )}
              <p className="mt-2 text-xs text-gray-400">
                {images.length}/5 images · First image is the main product image
              </p>
            </div>

            {/* Product details card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold text-gray-900">Product details</h2>
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Benefits <span className="font-normal text-gray-400">(one per line)</span>
                  </label>
                  <textarea
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none resize-y
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder={"Supports gut health\nNatural detox\nRich in antioxidants"}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    How to use <span className="font-normal text-gray-400">(one per line)</span>
                  </label>
                  <textarea
                    value={howToUse}
                    onChange={(e) => setHowToUse(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none resize-y
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder={"1 tbsp in warm water\nMix with honey or lemon"}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Certifications <span className="font-normal text-gray-400">(one per line)</span>
                  </label>
                  <textarea
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none resize-y
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder={"EcoCert Organic\nNo Pesticides"}
                  />
                </div>
              </div>
            </div>

            {/* SEO card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-500" />
                  <h2 className="text-sm font-bold text-gray-900">
                    Search engine listing
                  </h2>
                </div>
                <Link
                  href={`/shop/${slug}`}
                  target="_blank"
                  className="flex items-center gap-1 text-xs text-[#084e46] hover:underline"
                >
                  <Eye size={12} />
                  Preview
                </Link>
              </div>

              {/* Google preview */}
              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-gray-200">
                    <Globe size={14} className="text-[#084e46]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">biovitalitylife.com</p>
                    <p className="text-[11px] text-gray-400">{previewUrl}</p>
                  </div>
                </div>
                <h3 className="text-lg font-normal text-[#1a0dab] leading-snug mb-1 line-clamp-1">
                  {previewTitle}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {previewDescription}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Page title</span>
                    <span className={`text-xs ${(seoTitle || name).length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                      {(seoTitle || name).length}/70
                    </span>
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder={name || 'Page title for search engines'}
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Meta description</span>
                    <span className={`text-xs ${(seoDescription || shortDescription).length > 155 ? 'text-red-500' : 'text-gray-400'}`}>
                      {(seoDescription || shortDescription).length}/160
                    </span>
                  </label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none resize-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder={shortDescription || 'Description for search engine results...'}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    URL handle
                  </label>
                  <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:border-[#084e46] focus-within:ring-1 focus-within:ring-[#084e46]">
                    <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-500 border-r border-gray-300">
                      /shop/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      readOnly
                      className="flex-1 px-3 py-2.5 text-sm outline-none bg-gray-50 text-gray-600"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Auto-generated from the product title
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — sidebar */}
          <div className="space-y-6">
            {/* Status card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold text-gray-900">Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Availability</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#084e46]" />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  {inStock ? 'Product is visible and available for purchase' : 'Product is hidden from the store'}
                </p>
              </div>
            </div>

            {/* Organization card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold text-gray-900">Organization</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Product line
                  </label>
                  <select
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                  >
                    <option value="pharma">Pharma</option>
                    <option value="food">Food</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                  >
                    <option value="">No category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                    placeholder="Best Seller, New, etc."
                  />
                </div>
              </div>
            </div>

            {/* Pricing card */}
            <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold text-gray-900">Pricing</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Price
                  </label>
                  <div className="flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:border-[#084e46] focus-within:ring-1 focus-within:ring-[#084e46]">
                    <span className="bg-gray-50 px-3 py-2.5 text-sm text-gray-500 border-r border-gray-300">
                      {currency}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="flex-1 px-3 py-2.5 text-sm outline-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                  >
                    <option value="AED">AED</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
    </form>
  )
}
