'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  image: string | null
  cardImage?: string | null
  category: string | null
}

// Fallback static posts (used when DB has no posts)
const staticPosts = [
  {
    id: '1',
    slug: 'benefits-of-prickly-pear-vinegar',
    title: '7 Benefits\nof Organic\nPrickly Pear Vinegar',
    excerpt: "Natural wellness from nature's finest",
    image: '/blog/biovitality-organic-prickly-pear-vinegar-7-health-benefits-natural-wellness.jpg',
    category: 'Wellness',
  },
  {
    id: '2',
    slug: 'how-to-use-vinegar-in-cooking',
    title: 'Mediterranean\nSalad Dressing\nwith BioVitality',
    excerpt: 'A fresh, light and flavorful dressing inspired by Mediterranean traditions.',
    image: '/blog/biovitality-organic-prickly-pear-vinegar-mediterranean-salad-dressing.jpg',
    category: 'Recipes',
  },
  {
    id: '3',
    slug: 'what-is-the-mother-in-vinegar',
    title: 'Morning Rituals\nfor a Healthier You',
    excerpt: 'Simple daily habits that bring balance, energy and natural wellness to your day.',
    image: '/blog/biovitality-organic-prickly-pear-vinegar-morning-ritual-wellness-routine.jpg',
    category: 'Lifestyle',
  },
]

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts)

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data.slice(0, 3))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-12 px-4 bg-white" aria-labelledby="blog-heading">
      <div className="mx-auto px-2">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-1 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
            Wellness Insights
          </p>
          <h2 id="blog-heading" className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)] italic">
            Tips, Recipes & More
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block relative rounded-3xl overflow-hidden h-[380px] md:h-[450px]">
                {(post.cardImage || post.image) && (
                  <Image
                    src={post.cardImage || post.image!}
                    alt={post.title.replace(/\n/g, ' ')}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 flex flex-col justify-start p-6 md:p-7">
                  {post.category && (
                    <span className="inline-block w-fit rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-[#084e46] shadow-sm mb-3">
                      {post.category}
                    </span>
                  )}
                  <h3 className="font-heading text-2xl md:text-[1.7rem] font-bold text-[var(--color-dark)] leading-tight whitespace-pre-line mb-3">
                    {post.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#084e46] mb-3" />
                  <p className="text-xs text-[var(--color-dark)]/70 leading-relaxed max-w-[200px]">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#084e46] px-5 py-2.5 text-sm font-semibold text-white group-hover:bg-[#063b35] transition-colors">
                      Read Article →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
