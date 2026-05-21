'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Calendar } from 'lucide-react'

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

export default function BlogSection() {
  return (
    <section className="py-28 px-6 bg-white" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
              From Our Blog
            </p>
            <h2 id="blog-heading" className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-dark)]">
              Wellness Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-sm font-semibold text-[#084e46] hover:gap-3 transition-all"
          >
            View all articles
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Blog grid — featured + 2 smaller */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured post (large) */}
          <motion.article
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href={`/blog/${posts[0].slug}`} className="block">
              <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src={posts[0].image}
                  alt={posts[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white mb-3"
                    style={{ backgroundColor: categoryColors[posts[0].category] }}
                  >
                    {posts[0].category}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors">
                    {posts[0].title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-2 mb-4 max-w-md">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {posts[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {posts[0].readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Two smaller posts */}
          <div className="flex flex-col gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.article
                key={post.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              >
                <Link href={`/blog/${post.slug}`} className="flex gap-5 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 py-1">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-2"
                      style={{ backgroundColor: categoryColors[post.category] }}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-heading text-base md:text-lg font-bold text-[var(--color-dark)] leading-snug mb-2 group-hover:text-[#084e46] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] line-clamp-2 mb-3 hidden md:block">
                      {post.excerpt}
                    </p>
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
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
