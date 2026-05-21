'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  image: string
  category: string
  date: string
  readTime: string
  content: string[]
}

const categoryColors: Record<string, string> = {
  Wellness: '#084e46',
  Recipes: '#b8860b',
  Education: '#ca3b80',
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <article className="pt-32 pb-20 px-6 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[#084e46] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-4"
            style={{ backgroundColor: categoryColors[post.category] || '#084e46' }}
          >
            {post.category}
          </span>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)] leading-snug mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* Featured image */}
        <motion.div
          className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-[var(--color-dark)]/80 leading-relaxed mb-6 text-base">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-200 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-[var(--color-muted)] mb-4">
            Ready to experience the benefits of organic prickly pear vinegar?
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#084e46' }}
          >
            Shop BioVitality™
          </Link>
        </motion.div>
      </div>
    </article>
  )
}
