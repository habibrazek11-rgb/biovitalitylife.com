'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Package, X } from 'lucide-react'
import { UploadDropzone } from '@/lib/uploadthing-components'

interface Category {
  id: string
  name: string
}

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
  categoryId: string | null
  category: Category | null
}

const emptyForm = {
  name: '',
  line: 'pharma',
  price: '',
  currency: 'AED',
  shortDescription: '',
  description: '',
  badge: '',
  images: [] as string[],
  benefits: '',
  howToUse: '',
  certifications: '',
  categoryId: '',
  inStock: true,
}

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyForm)

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ])
      if (prodRes.ok) setProducts(await prodRes.json())
      if (catRes.ok) {
        const catData = await catRes.json()
        setCategories(catData)
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditing(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing
      ? `/api/admin/products/${editing.id}`
      : '/api/admin/products'

    const payload = {
      ...form,
      benefits: form.benefits.split('\n').filter(Boolean),
      howToUse: form.howToUse.split('\n').filter(Boolean),
      certifications: form.certifications.split('\n').filter(Boolean),
    }

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    resetForm()
    fetchData()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product permanently?')) return
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const startEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name: p.name,
      line: p.line,
      price: p.price.toString(),
      currency: p.currency,
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      badge: p.badge || '',
      images: p.images,
      benefits: p.benefits.join('\n'),
      howToUse: p.howToUse.join('\n'),
      certifications: p.certifications.join('\n'),
      categoryId: p.categoryId || '',
      inStock: p.inStock,
    })
    setShowForm(true)
  }

  const removeImage = (url: string) => {
    setForm({ ...form, images: form.images.filter((i) => i !== url) })
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editing ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={resetForm} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="BioVitality™ Pharma Line – 250ml"
                />
              </div>

              {/* Line + Category + Price row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Line</label>
                  <select
                    value={form.line}
                    onChange={(e) => setForm({ ...form, line: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none
                               focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  >
                    <option value="pharma">Pharma</option>
                    <option value="food">Food</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Category</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none
                               focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  >
                    <option value="">No category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Price (AED)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none
                               focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    placeholder="85"
                  />
                </div>
              </div>

              {/* Badge + In Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none
                               focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    placeholder="Best Seller"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.inStock}
                      onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)]"
                    />
                    <span className="text-sm font-semibold text-gray-700">In Stock</span>
                  </label>
                </div>
              </div>

              {/* Short description */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Short Description</label>
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="Brief product description..."
                />
              </div>

              {/* Full description */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none resize-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
              </div>

              {/* Images */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Images ({form.images.length}/5)
                </label>
                {form.images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {form.images.map((url) => (
                      <div key={url} className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={url} alt="" fill className="object-cover" sizes="80px" />
                        <button
                          type="button"
                          onClick={() => removeImage(url)}
                          className="absolute top-1 right-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {form.images.length < 5 && (
                  <UploadDropzone
                    endpoint="productImage"
                    onClientUploadComplete={(res) => {
                      const newUrls = res.map((f) => f.url)
                      setForm({ ...form, images: [...form.images, ...newUrls].slice(0, 5) })
                    }}
                    onUploadError={(err) => alert(err.message)}
                  />
                )}
              </div>

              {/* Benefits */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Benefits <span className="font-normal text-gray-400">(one per line)</span>
                </label>
                <textarea
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none resize-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="Detox&#10;Gut Health&#10;Digestion"
                />
              </div>

              {/* How to Use */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  How to Use <span className="font-normal text-gray-400">(one per line)</span>
                </label>
                <textarea
                  value={form.howToUse}
                  onChange={(e) => setForm({ ...form, howToUse: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none resize-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="1 tbsp in warm water&#10;Mix with lemon"
                />
              </div>

              {/* Certifications */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Certifications <span className="font-normal text-gray-400">(one per line)</span>
                </label>
                <textarea
                  value={form.certifications}
                  onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none resize-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="EcoCert Organic&#10;No Pesticides"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg py-2.5 text-sm font-bold text-white hover:opacity-90"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {editing ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products table */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <Package size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No products yet</h2>
          <p className="text-sm text-gray-500">Add your first product to the catalog.</p>
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Line</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Stock</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.images[0] ? (
                          <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            <Package size={16} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">{p.name}</p>
                          {p.badge && (
                            <span className="text-[10px] font-bold text-amber-600">{p.badge}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-white capitalize"
                        style={{ backgroundColor: p.line === 'pharma' ? 'var(--color-primary)' : 'var(--color-accent)' }}
                      >
                        {p.line}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">
                      {p.category?.name || '—'}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {p.currency} {p.price}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold ${p.inStock ? 'text-green-600' : 'text-red-500'}`}>
                        {p.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(p)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50"
                          aria-label="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
