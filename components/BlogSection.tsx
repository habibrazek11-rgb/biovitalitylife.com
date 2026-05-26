'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const posts = [
  {
    slug: 'benefits-of-prickly-pear-vinegar',
    image: '/blog/biovitality-organic-prickly-pear-vinegar-7-health-benefits-natural-wellness.jpg',
    label: 'Wellness',
    title: '7 Benefits\nof Organic\nPrickly Pear Vinegar',
    desc: 'Natural wellness from nature\'s finest',
  },
  {
    slug: 'how-to-use-vinegar-in-cooking',
    image: '/blog/biovitality-organic-prickly-pear-vinegar-mediterranean-salad-dressing.jpg',
    label: 'Recipes',
    title: 'Mediterranean\nSalad Dressing\nwith BioVitality',
    desc: 'A fresh, light and flavorful dressing inspired by Mediterranean traditions.',
  },
  {
    slug: 'what-is-the-mother-in-vinegar',
    image: '/blog/biovitality-organic-prickly-pear-vinegar-morning-ritual-wellness-routine.jpg',
    label: 'Lifestyle & Routine',
    title: 'Morning Rituals\nfor a Healthier You',
    desc: 'Simple daily habits that bring balance, energy and natural wellness to your day.',
  },
]

export default function BlogSection() {
  return (
    <section className="py-16 px-6 bg-white" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-8xl">
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
              key={post.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block relative rounded-3xl overflow-hidden h-[380px] md:h-[450px]">
                {/* Image */}
                <Image
                  src={post.image}
                  alt={post.title.replace(/\n/g, ' ')}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />

                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col justify-start p-6 md:p-7">
                  <span className="inline-block w-fit rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-[#084e46] shadow-sm mb-3">
                    {post.label}
                  </span>
                  <h3 className="font-heading text-2xl md:text-[1.7rem] font-bold text-[var(--color-dark)] leading-tight whitespace-pre-line mb-3">
                    {post.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#084e46] mb-3" />
                  <p className="text-xs text-[var(--color-dark)]/70 leading-relaxed max-w-[200px]">
                    {post.desc}
                  </p>

                  {/* Button */}
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
