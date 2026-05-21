'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const lines = [
  {
    image: '/gourmet-line/biovitality-organic-prickly-pear-vinegar-lightness-purity-gourmet-line-250ml.jpeg',
    title: 'Lightness & Purity Line',
    href: '/shop/biovitality-organic-prickly-pear-vinegar-250ml-raw-unfiltered-wellness-vinegar',
  },
  {
    image: '/gourmet-line/biovitality-organic-prickly-pear-vinegar-with-mother-gourmet-line-250ml.jpeg',
    title: 'With the Mother Line',
    href: '/shop/biovitality-organic-prickly-pear-vinegar-250ml-food-line-raw-unfiltered-wellness-vinegar',
  },
]

export default function ProductLines() {
  return (
    <section className="py-10 px-6 bg-white" aria-label="Product lines">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lines.map((line, i) => (
            <motion.div
              key={line.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '100px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={line.href} className="block">
                <div className="relative w-full aspect-[16/9] mb-4">
                  <Image
                    src={line.image}
                    alt={line.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </Link>
              <h3 className="text-base font-medium text-[var(--color-dark)] mb-3">
                {line.title}
              </h3>
              <Link
                href={line.href}
                className="inline-block rounded-sm bg-[#084e46] px-5 py-2 text-sm font-medium text-white hover:bg-[#063b35] transition-colors"
              >
                Shop now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
