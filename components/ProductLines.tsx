'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const lines = [
  {
    image: '/Gourmet Line/Welness LINE BIOVITALITY.jpg',
    title: 'Everyday Wellness',
    description: 'Perfect for your daily health ritual.',
    href: '/shop/biovitality-organic-prickly-pear-vinegar-250ml-raw-unfiltered-wellness-vinegar',
  },
  {
    image: '/Gourmet Line/Gourmet LINE BIOVITALITY.jpg',
    title: 'Gourmet Selection',
    description: 'Elevate your meals with gourmet flavor.',
    href: '/shop/biovitality-organic-prickly-pear-vinegar-250ml-food-line-raw-unfiltered-wellness-vinegar',
  },
]

export default function ProductLines() {
  return (
    <section className="py-10 px-6 bg-white" aria-label="Product lines">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
            Explore Our Collection
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            Pure & Organic
          </h2>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {lines.map((line, i) => (
            <motion.div
              key={line.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link href={line.href} className="group block relative rounded-2xl overflow-hidden h-[280px] md:h-[320px]">
                {/* Background image */}
                <Image
                  src={line.image}
                  alt={line.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-10">
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-2 italic">
                    {line.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-5 max-w-[200px]">
                    {line.description}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#084e46] px-5 py-2.5 text-sm font-semibold text-white w-fit group-hover:bg-[#063b35] transition-colors">
                    Shop Now →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
