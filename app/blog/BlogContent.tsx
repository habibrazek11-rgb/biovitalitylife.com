'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar } from 'lucide-react'

const posts = [
  {
    id: 1,
    slug: 'benefits-of-prickly-pear-vinegar',
    title: '7 Proven Benefits of Organic Prickly Pear Vinegar for Your Health',
    excerpt:
      'Discover how this ancient Mediterranean superfood supports gut health, detox, and natural weight management.',
    image: '/why-organic-prickly-pear-vinegar/natural_organic.jpeg',
    category: 'Wellness',
    readTime: '5 min read',
    date: 'May 15, 2026',
  },
  {
    id: 2,
    slug: 'how-to-use-vinegar-in-cooking',
    title: 'Mediterranean Recipes: Cooking with Prickly Pear Vinegar',
    excerpt:
      'From salad dressings to marinades — elevate your kitchen with this fruity, balanced organic vinegar.',
    image: '/why-organic-prickly-pear-vinegar/mediterranean_origin.jpeg',
    category: 'Recipes',
    readTime: '4 min read',
    date: 'May 10, 2026',
  },
  {
    id: 3,
    slug: 'what-is-the-mother-in-vinegar',
    title: 'What Is "The Mother" in Vinegar and Why Does It Matter?',
    excerpt:
      'The cloudy strands in raw vinegar are a sign of quality. Learn why unfiltered vinegar is a probiotic powerhouse.',
    image: '/why-organic-prickly-pear-vinegar/with_the_mother.jpeg',
    category: 'Education',
    readTime: '3 min read',
    date: 'May 5, 2026',
  },
]

const categoryColors: Record<string, string> = {
  Wellness: '#084e46',
  Recipes: '#b8860b',
  Education: '#ca3b80',
}

export default function BlogContent() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10 px-6 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-heading text-3xl font-bold text-[var(--color-dark)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Wellness Insights
          </motion.h1>
          <motion.p
            className="mt-2 text-sm text-[var(--color-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tips, recipes, and science behind organic prickly pear vinegar.
          </motion.p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Category */}
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-2"
                    style={{ backgroundColor: categoryColors[post.category] }}
                  >
                    {post.category}
                  </span>

                  {/* Title */}
                  <h2 className="font-heading text-lg font-bold text-[var(--color-dark)] leading-snug mb-2 group-hover:text-[#084e46] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-[var(--color-muted)] line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
