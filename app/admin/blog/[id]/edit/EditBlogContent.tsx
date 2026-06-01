'use client'

import { useState, useEffect } from 'react'
import BlogForm from '../../BlogForm'

export default function EditBlogContent({ postId }: { postId: string }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((posts) => {
        const found = posts.find((p: any) => p.id === postId)
        setPost(found || null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [postId])

  if (loading) return <div className="flex items-center justify-center min-h-[400px] text-sm text-gray-500">Loading...</div>
  if (!post) return <div className="flex items-center justify-center min-h-[400px] text-sm text-red-500">Post not found</div>

  return <BlogForm post={post} isEditing />
}
