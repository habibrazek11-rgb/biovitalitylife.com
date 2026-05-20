'use client'

import { useState, useEffect } from 'react'
import CategoryForm from '../../CategoryForm'

interface EditCategoryContentProps {
  categoryId: string
}

export default function EditCategoryContent({ categoryId }: EditCategoryContentProps) {
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((categories) => {
        const found = categories.find((c: any) => c.id === categoryId)
        setCategory(found || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [categoryId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-gray-500">Loading category...</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-red-500">Category not found</div>
      </div>
    )
  }

  return <CategoryForm category={category} isEditing />
}
