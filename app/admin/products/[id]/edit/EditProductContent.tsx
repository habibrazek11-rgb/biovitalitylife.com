'use client'

import { useState, useEffect } from 'react'
import ProductForm from '../../ProductForm'

interface EditProductContentProps {
  productId: string
}

export default function EditProductContent({ productId }: EditProductContentProps) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/products')
      .then((r) => r.json())
      .then((products) => {
        const found = products.find((p: any) => p.id === productId)
        setProduct(found || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-gray-500">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-sm text-red-500">Product not found</div>
      </div>
    )
  }

  return <ProductForm product={product} isEditing />
}
