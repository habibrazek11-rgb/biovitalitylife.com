'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Leaf, Zap, Sun } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Rich in Antioxidants',
    description: 'Helps protect your cells from oxidative stress.',
  },
  {
    icon: Heart,
    title: 'Supports Digestion',
    description: 'Promotes gut health and reduces bloating.',
  },
  {
    icon: Leaf,
    title: 'Natural Detox',
    description: 'Helps cleanse and rejuvenate your body.',
  },
  {
    icon: Zap,
    title: 'Boosts Immunity',
    description: 'Strengthens your immune system naturally.',
  },
  {
    icon: Sun,
    title: 'Healthy Lifestyle',
    description: 'A simple step towards better everyday health.',
  },
]

export default function WhyBioVitality() {
  return (
    <section className="py-20 px-6" aria-labelledby="why-heading">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#f5f3ee] px-8 py-14 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
            Why Choose Us
          </p>
          <h2 id="why-heading" className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            Why Organic Prickly Pear Vinegar?
          </h2>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center">
                  <Icon size={28} strokeWidth={1.5} className="text-[var(--color-dark)]" />
                </div>
                <h3 className="text-sm font-bold text-[var(--color-dark)] mb-1">{f.title}</h3>
                <p className="text-[11px] text-[var(--color-muted)] leading-relaxed">{f.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
