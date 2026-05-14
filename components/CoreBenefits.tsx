'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Droplets, Heart, Zap, Shield, Flame, Scale } from 'lucide-react'

const benefits = [
  {
    icon: Droplets,
    title: 'Detox & Body Cleansing',
    description: 'Flush toxins naturally with the power of raw organic vinegar.',
    href: '/shop/pharma-line-250ml',
  },
  {
    icon: Heart,
    title: 'Gut Health Support',
    description: 'The living Mother feeds your microbiome with beneficial bacteria.',
    href: '/shop/pharma-line-250ml',
  },
  {
    icon: Zap,
    title: 'Improved Digestion',
    description: 'Natural enzymes help break down food and ease digestive discomfort.',
    href: '/shop/pharma-line-250ml',
  },
  {
    icon: Shield,
    title: 'Antioxidant Protection',
    description: 'Prickly pear is rich in betalains — powerful antioxidants that fight free radicals.',
    href: '/shop/pharma-line-250ml',
  },
  {
    icon: Flame,
    title: 'Natural Energy & Vitality',
    description: 'Start your day with a wellness shot for sustained, natural energy.',
    href: '/shop/pharma-line-250ml',
  },
  {
    icon: Scale,
    title: 'Weight Management Ally',
    description: 'Supports healthy metabolism and helps you feel fuller for longer.',
    href: '/shop/pharma-line-250ml',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

/**
 * CoreBenefits — 6-card grid (3×2 desktop, 2×3 tablet, 1×6 mobile).
 */
export default function CoreBenefits() {
  return (
    <section className="py-24 px-6 bg-white" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">What We Offer</p>
          <h2 id="benefits-heading" className="section-title">
            Core Benefits of BioVitality™
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <motion.article
                key={benefit.title}
                variants={cardVariants}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100
                           bg-[var(--color-cream)] transition-shadow hover:shadow-lg"
              >
                {/* Image placeholder */}
                <div
                  className="h-40 w-full"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(45,106,47,0.12) 0%, rgba(232,130,58,0.12) 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: 'rgba(45,106,47,0.1)' }}
                    aria-hidden="true"
                  >
                    <Icon size={24} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-[var(--color-dark)]">
                    {benefit.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-[var(--color-muted)] leading-relaxed">
                    {benefit.description}
                  </p>
                  <Link
                    href={benefit.href}
                    className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]
                               transition-colors inline-flex items-center gap-1"
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
