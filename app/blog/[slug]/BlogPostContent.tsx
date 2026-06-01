'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

interface BlogPost {
  title: string
  image: string | null
  category: string | null
  content: string | null
  contentImages: string[]
  createdAt: Date | string
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const paragraphs = post.content?.split('\n').filter(Boolean) || []
  const date = new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <article className="bg-white">
      {/* Hero image */}
      {post.image && (
        <div className="relative w-full h-[300px] md:h-[500px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[#084e46] transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.category && (
            <span className="inline-block rounded-full bg-[#084e46]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#084e46] mb-4">
              {post.category}
            </span>
          )}
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)] leading-snug mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-10">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </motion.div>

        {/* Article body */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {paragraphs.map((para, i) => {
            // Check for markdown headings
            if (para.startsWith('### ')) {
              return <h3 key={i} className="text-xl font-bold text-[var(--color-dark)] mt-8 mb-2">{para.replace('### ', '')}</h3>
            }
            if (para.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold text-[var(--color-dark)] mt-10 mb-3">{para.replace('## ', '')}</h2>
            }
            if (para.startsWith('> ')) {
              return (
                <blockquote key={i} className="border-l-4 border-[#084e46] pl-4 italic text-[var(--color-muted)]">
                  {para.replace('> ', '')}
                </blockquote>
              )
            }
            if (para.startsWith('- ')) {
              return (
                <li key={i} className="flex items-start gap-2 text-[var(--color-dark)]/80 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#084e46] shrink-0" />
                  {para.replace('- ', '')}
                </li>
              )
            }

            // Insert content images between paragraphs
            const imageIndex = Math.floor((i / paragraphs.length) * post.contentImages.length)
            const showImage = post.contentImages.length > 0 && i > 0 && i % Math.ceil(paragraphs.length / (post.contentImages.length + 1)) === 0

            return (
              <div key={i}>
                {showImage && post.contentImages[imageIndex - 1] && (
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden my-8">
                    <Image
                      src={post.contentImages[imageIndex - 1]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-base text-[var(--color-dark)]/80 leading-relaxed">
                  {para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
                </p>
              </div>
            )
          })}

          {/* Remaining content images at the end */}
          {post.contentImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {post.contentImages.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 360px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <div className="mt-14 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Ready to experience the benefits of organic prickly pear vinegar?
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: '#084e46' }}
          >
            Shop BioVitality™
          </Link>
        </div>
      </div>
    </article>
  )
}
