'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { UploadButton, UploadDropzone } from '@/lib/uploadthing-components'

interface BlogPostData {
  id?: string
  title: string
  excerpt: string | null
  content: string | null
  image: string | null
  category: string | null
  published: boolean
}

interface BlogFormProps {
  post?: BlogPostData
  isEditing?: boolean
}

export default function BlogForm({ post, isEditing = false }: BlogFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const [title, setTitle] = useState(post?.title || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [content, setContent] = useState(post?.content || '')
  const [image, setImage] = useState(post?.image || '')
  const [cardImage, setCardImage] = useState((post as any)?.cardImage || '')
  const [contentImages, setContentImages] = useState<string[]>((post as any)?.contentImages || [])
  const [category, setCategory] = useState(post?.category || '')
  const [published, setPublished] = useState(post?.published ?? false)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const wrapSelection = (wrapper: string, endWrapper?: string) => {
    const el = contentRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = content.substring(start, end) || 'text'
    const before = content.substring(0, start)
    const after = content.substring(end)
    const newContent = `${before}${wrapper}${selected}${endWrapper || wrapper}${after}`
    setContent(newContent)
    setTimeout(() => { el.focus(); el.setSelectionRange(start + wrapper.length, start + wrapper.length + selected.length) }, 0)
  }

  const insertTag = (tag: string) => {
    const el = contentRef.current
    if (!el) return
    const start = el.selectionStart
    const prefix = tag === 'h2' ? '## ' : tag === 'h3' ? '### ' : ''
    const before = content.substring(0, start)
    const after = content.substring(start)
    setContent(`${before}${prefix}${after}`)
    setTimeout(() => { el.focus(); el.setSelectionRange(start + prefix.length, start + prefix.length) }, 0)
  }

  const insertAtLine = (prefix: string) => {
    const el = contentRef.current
    if (!el) return
    const start = el.selectionStart
    const before = content.substring(0, start)
    const after = content.substring(start)
    setContent(`${before}${prefix}${after}`)
    setTimeout(() => { el.focus(); el.setSelectionRange(start + prefix.length, start + prefix.length) }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      title,
      excerpt: excerpt || null,
      content: content || null,
      image: image || null,
      cardImage: cardImage || null,
      contentImages,
      category: category || null,
      published,
    }

    const url = isEditing ? `/api/admin/blog/${post?.id}` : '/api/admin/blog'
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) router.push('/admin/blog')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 lg:p-8">
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white rounded-xl mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-bold text-gray-900">
              {isEditing ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/blog" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Discard
            </Link>
            <button
              type="submit"
              disabled={saving || !title}
              className="rounded-lg px-5 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#084e46' }}
            >
              {saving ? 'Saving...' : isEditing ? 'Save' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46]"
                placeholder="Blog post title..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Excerpt</label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46]"
                placeholder="Short summary for listings..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Content</label>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1 border border-gray-300 border-b-0 rounded-t-lg px-2 py-1.5 bg-gray-50">
                <button type="button" onClick={() => insertTag('h2')} className="px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded" title="Heading">H2</button>
                <button type="button" onClick={() => insertTag('h3')} className="px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded" title="Subheading">H3</button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button type="button" onClick={() => wrapSelection('**')} className="px-2 py-1 text-xs font-bold text-gray-600 hover:bg-gray-200 rounded" title="Bold"><strong>B</strong></button>
                <button type="button" onClick={() => wrapSelection('*')} className="px-2 py-1 text-xs italic text-gray-600 hover:bg-gray-200 rounded" title="Italic"><em>I</em></button>
                <button type="button" onClick={() => wrapSelection('~~')} className="px-2 py-1 text-xs line-through text-gray-600 hover:bg-gray-200 rounded" title="Strikethrough">S</button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button type="button" onClick={() => insertAtLine('- ')} className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded" title="Bullet list">• List</button>
                <button type="button" onClick={() => insertAtLine('1. ')} className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded" title="Numbered list">1. List</button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <button type="button" onClick={() => insertAtLine('> ')} className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded" title="Quote">" Quote</button>
                <button type="button" onClick={() => wrapSelection('[', '](url)')} className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 rounded" title="Link">🔗 Link</button>
                <div className="w-px h-5 bg-gray-300 mx-1" />
                <select
                  onChange={(e) => { if (e.target.value) insertAtLine(e.target.value); e.target.value = '' }}
                  className="text-xs border border-gray-200 rounded px-1.5 py-1 bg-white text-gray-600"
                  defaultValue=""
                >
                  <option value="" disabled>Font size</option>
                  <option value="<small>">Small</option>
                  <option value="<p>">Normal</option>
                  <option value="<big>">Large</option>
                </select>
              </div>
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={14}
                className="w-full rounded-b-lg border border-gray-300 px-4 py-2.5 text-sm outline-none resize-y focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] font-mono"
                placeholder="Write your blog post content here...&#10;&#10;Use **bold**, *italic*, ## headings&#10;- bullet lists&#10;> blockquotes"
              />
              <p className="mt-1 text-[10px] text-gray-400">Supports markdown: **bold**, *italic*, ## heading, - list, {'>'} quote, [link](url)</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Status */}
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Status</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Published</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#084e46]" />
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {published ? 'Post is visible on the website' : 'Post is saved as draft'}
            </p>
          </div>

          {/* Category */}
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Category</h2>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46]"
            >
              <option value="">No category</option>
              <option value="Wellness">Wellness</option>
              <option value="Recipes">Recipes</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Hero Image */}
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Hero Image</h2>
            <p className="text-[10px] text-gray-400 mb-3">Main banner image displayed at the top of the blog post</p>
            {image ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 mb-3">
                <Image src={image} alt="" fill className="object-cover" sizes="300px" />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <UploadDropzone
                endpoint="productImage"
                config={{ mode: 'auto' }}
                onClientUploadComplete={(res) => {
                  if (res?.[0]) setImage(res[0].url)
                }}
                onUploadError={(err) => alert(err.message)}
              />
            )}
          </div>

          {/* Card Image */}
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Card Image</h2>
            <p className="text-[10px] text-gray-400 mb-3">Thumbnail shown in the blog listing cards</p>
            {cardImage ? (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-3">
                <Image src={cardImage} alt="" fill className="object-cover" sizes="300px" />
                <button type="button" onClick={() => setCardImage('')} className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 shadow-sm">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <UploadDropzone
                endpoint="productImage"
                config={{ mode: 'auto' }}
                onClientUploadComplete={(res) => { if (res?.[0]) setCardImage(res[0].url) }}
                onUploadError={(err) => alert(err.message)}
              />
            )}
          </div>

          {/* Content Images */}
          <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Content Images</h2>
            <p className="text-[10px] text-gray-400 mb-3">Additional images displayed within the article body</p>
            {contentImages.length > 0 && (
              <div className="space-y-2 mb-3">
                {contentImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image src={img} alt="" fill className="object-cover" sizes="300px" />
                    <button
                      type="button"
                      onClick={() => setContentImages(contentImages.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 shadow-sm"
                    >
                      <X size={14} />
                    </button>
                    <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <UploadDropzone
              endpoint="productImage"
              config={{ mode: 'auto' }}
              onClientUploadComplete={(res) => {
                if (res) {
                  const newUrls = res.map((f) => f.url)
                  setContentImages([...contentImages, ...newUrls])
                }
              }}
              onUploadError={(err) => alert(err.message)}
            />
            <p className="mt-2 text-[10px] text-gray-400">{contentImages.length} image{contentImages.length !== 1 ? 's' : ''} added</p>
          </div>
        </div>
      </div>
    </form>
  )
}
