'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * TunisianHeritage — split editorial layout: image left, text right.
 */
export default function TunisianHeritage() {
  return (
    <section
      className="py-24 px-6"
      style={{ backgroundColor: 'var(--color-cream)' }}
      aria-labelledby="heritage-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image placeholder */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="h-[480px] w-full"
              style={{
                background:
                  'linear-gradient(160deg, #2D6A2F 0%, #4a9e4d 30%, #C9A84C 60%, #E8823A 100%)',
              }}
              role="img"
              aria-label="Tunisian prickly pear cactus fields at sunset"
            />
            {/* Decorative label */}
            <div className="absolute bottom-6 left-6 rounded-xl bg-white/90 backdrop-blur-sm px-5 py-3 shadow-lg">
              <p className="text-xs font-bold tracking-widest uppercase text-[var(--color-primary)]">
                Tunisia
              </p>
              <p className="font-heading text-lg font-bold text-[var(--color-dark)]">
                Mediterranean Heartland
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="section-label mb-3">Our Roots</p>
            <h2 id="heritage-heading" className="section-title mb-6">
              Tunisian Excellence in Organic Agriculture
            </h2>
            <p className="mb-5 text-[var(--color-muted)] text-lg leading-relaxed">
              Nestled between the Atlas Mountains and the Mediterranean Sea, Tunisia&apos;s
              unique climate creates the perfect conditions for growing the finest prickly
              pear cactus. Warm summers, mild winters and mineral-rich soil produce fruit
              of exceptional quality and flavour.
            </p>
            <p className="mb-5 text-[var(--color-muted)] leading-relaxed">
              Our partner farmers have cultivated these ancient cactus fields for
              generations, using organic methods that respect both the land and the
              traditions of their ancestors. No shortcuts, no chemicals — just patient,
              sustainable farming.
            </p>
            <p className="mb-10 text-[var(--color-muted)] leading-relaxed">
              From harvest to bottle, every step of our process honours this heritage —
              delivering a product that is as authentic as it is exceptional.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white
                         transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Discover More
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
