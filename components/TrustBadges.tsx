'use client'

import { motion } from 'framer-motion'
import { Leaf, Droplets, Heart, Shield } from 'lucide-react'

const trustBadges = [
  { icon: Leaf, title: '100% Organic', desc: 'No chemicals, no preservatives' },
  { icon: Droplets, title: 'Raw & Unfiltered', desc: 'Rich in live blends and enzymes' },
  { icon: Shield, title: 'With The Mother', desc: 'Naturally fermented for maximum vitality' },
  { icon: Heart, title: 'Daily Wellness', desc: 'Supports digestion, energy & immunity' },
]

export default function TrustBadges() {
  return (
    <section className="py-10 px-6 bg-white" aria-label="Trust badges">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="rounded-2xl bg-[#f5f3ee] px-8 py-8 md:px-12 md:py-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {trustBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.title} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                    <Icon size={26} strokeWidth={1.5} className="text-[#084e46]" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-[var(--color-dark)]">{badge.title}</p>
                    <p className="text-xs text-[var(--color-muted)] leading-tight">{badge.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
