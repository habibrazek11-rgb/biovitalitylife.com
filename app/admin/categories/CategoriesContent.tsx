'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, FolderOpen, X } from 'lucide-react'
import { UploadButton } from '@/lib/uploadthing-components'

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
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', description: '', image: '' })

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  const resetForm = () => {
    setForm({ name: '', description: '', image: '' })
    setEditing(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const url = editing
      ? `/api/admin/categories/${editing.id}`
      : '/api/admin/categories'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    resetForm()
    fetchCategories()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Products will be unlinked.')) return
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    fetchCategories()
  }

  const startEdit = (cat: Category) => {
    setEditing(cat)
    setForm({ name: cat.name, description: cat.description || '', image: cat.image || '' })
    setShowForm(true)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">Organize products into categories</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editing ? 'Edit Category' : 'New Category'}
              </h2>
              <button onClick={resetForm} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="e.g. Pharma Line"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none resize-none
                             focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  placeholder="Category description..."
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Image</label>
                {form.image && (
                  <div className="mb-2 relative h-24 w-24 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={form.image} alt="" fill className="object-cover" sizes="96px" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: '' })}
                      className="absolute top-1 right-1 rounded-full bg-red-500 p-0.5 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                {!form.image && (
                  <UploadButton
                    endpoint="categoryImage"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) setForm({ ...form, image: res[0].url })
                    }}
                    onUploadError={(err) => alert(err.message)}
                  />
                )}
              </div>

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
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories list */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <FolderOpen size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No categories yet</h2>
          <p className="text-sm text-gray-500">Create your first category to organize products.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.id} className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
              <div className="flex items-start gap-3">
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
                  <h3 className="font-bold text-gray-900 truncate">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat._count.products} products</p>
                  {cat.description && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{cat.description}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => startEdit(cat)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
