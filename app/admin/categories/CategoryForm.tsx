'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { UploadButton } from '@/lib/uploadthing-components'

interface CategoryData {
  id?: string
  name: string
  description: string | null
  image: string | null
}

interface CategoryFormProps {
  category?: CategoryData
  isEditing?: boolean
}

export default function CategoryForm({ category, isEditing = false }: CategoryFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState(category?.name || '')
  const [description, setDescription] = useState(category?.description || '')
  const [image, setImage] = useState(category?.image || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name,
      description: description || null,
      image: image || null,
    }

    const url = isEditing
      ? `/api/admin/categories/${category?.id}`
      : '/api/admin/categories'
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/categories')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white rounded-xl mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/categories"
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Back to categories"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                {isEditing ? 'Edit category' : 'Add category'}
              </h1>
              {isEditing && (
                <p className="text-xs text-gray-500 mt-0.5">
                  Editing {category?.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/categories"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Discard
            </Link>
            <button
              type="submit"
              disabled={saving || !name}
              className="rounded-lg px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#084e46' }}
            >
              {saving ? 'Saving...' : isEditing ? 'Save' : 'Save category'}
            </button>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none
                             focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                  placeholder="e.g. Pharma Line"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none resize-y
                             focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                  placeholder="Category description..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Image</h2>
            {image ? (
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mb-3">
                <Image src={image} alt="" fill className="object-cover" sizes="300px" />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <UploadButton
                endpoint="categoryImage"
                onClientUploadComplete={(res) => {
                  if (res?.[0]) setImage(res[0].url)
                }}
                onUploadError={(err) => alert(err.message)}
              />
            )}
            <p className="mt-2 text-xs text-gray-400">
              Recommended: Square image, at least 400×400px
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
