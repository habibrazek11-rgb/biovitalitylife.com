'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, FileText } from 'lucide-react'
import ConfirmDialog from '@/components/ui/ConfirmDialog'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  image: string | null
  category: string | null
  published: boolean
  createdAt: string
}

export default function BlogListContent() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null)

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog')
      if (res.ok) setPosts(await res.json())
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchPosts() }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    await fetch(`/api/admin/blog/${deleteTarget.id}`, { method: 'DELETE' })
    setDeleteTarget(null)
    fetchPosts()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-500">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#084e46' }}
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <FileText size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No blog posts yet</h2>
          <p className="mb-6 text-sm text-gray-500">Create your first blog post.</p>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: '#084e46' }}
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 rounded-xl bg-white border border-gray-100 p-4 shadow-sm">
              {post.image ? (
                <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={post.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <FileText size={20} className="text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <Link href={`/admin/blog/${post.id}/edit`} className="text-sm font-semibold text-gray-900 hover:text-[#084e46] transition-colors line-clamp-1">
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${post.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  {post.category && <span className="text-[10px] text-gray-400">{post.category}</span>}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Link href={`/admin/blog/${post.id}/edit`} className="p-2 text-gray-400 hover:text-[#084e46] rounded-lg hover:bg-gray-100">
                  <Pencil size={15} />
                </Link>
                <button onClick={() => setDeleteTarget(post)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
