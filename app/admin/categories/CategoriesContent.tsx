'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  _count: { products: number }
}

export default function CategoriesContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      if (res.ok) {
        setCategories(await res.json())
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    await fetch(`/api/admin/categories/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleteTarget(null)
    fetchCategories()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            {categories.length} {categories.length === 1 ? 'category' : 'categories'}
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#084e46' }}
        >
          <Plus size={16} />
          Add category
        </Link>
      </div>

      {/* Categories list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <FolderOpen size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No categories yet</h2>
          <p className="mb-6 text-sm text-gray-500">Create your first category to organize products.</p>
          <Link
            href="/admin/categories/new"
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#084e46' }}
          >
            <Plus size={16} />
            Add category
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.id} className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/admin/categories/${cat.id}/edit`} className="flex items-start gap-3 group">
                {cat.image ? (
                  <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="56px" />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <FolderOpen size={24} className="text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate group-hover:text-[#084e46] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500">{cat._count.products} products</p>
                  {cat.description && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{cat.description}</p>
                  )}
                </div>
              </Link>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/admin/categories/${cat.id}/edit`}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Pencil size={12} /> Edit
                </Link>
                <button
                  onClick={() => setDeleteTarget(cat)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Products in this category will be unlinked but not deleted.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
