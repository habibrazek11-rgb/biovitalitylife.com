'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Package } from 'lucide-react'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

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

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/products')
      if (res.ok) setProducts(await res.json())
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleteTarget(null)
    fetchData()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#084e46' }}
        >
          <Plus size={16} />
          Add product
        </Link>
      </div>

      {/* Products table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <Package size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No products yet</h2>
          <p className="mb-6 text-sm text-gray-500">Add your first product to get started.</p>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#084e46' }}
          >
            <Plus size={16} />
            Add product
          </Link>
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Line</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/admin/products/${p.id}/edit`} className="flex items-center gap-3 group">
                        {p.images[0] ? (
                          <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <Image src={p.images[0]} alt="" fill sizes="48px" className="object-cover" />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 border border-gray-200">
                            <Package size={18} className="text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-[#084e46] transition-colors line-clamp-1 max-w-[250px]">
                            {p.name}
                          </p>
                          {p.badge && (
                            <span className="text-[10px] font-bold text-amber-600">{p.badge}</span>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        p.inStock
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                        {p.inStock ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-white capitalize"
                        style={{ backgroundColor: p.line === 'pharma' ? '#084e46' : '#b8860b' }}
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
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-2 text-gray-400 hover:text-[#084e46] rounded-lg hover:bg-gray-100 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
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

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
