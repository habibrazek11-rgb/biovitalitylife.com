'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    image: '/how-to-use/spoon_glass.jpeg',
    title: 'Measure',
    description: '1–2 tablespoons directly from the bottle.',
  },
  {
    number: '02',
    image: '/how-to-use/bottle_wate.jpeg',
    title: 'Dilute',
    description: 'Mix into a glass of water. Add honey or lemon.',
  },
  {
    number: '03',
    image: '/how-to-use/bowl_salad.jpeg',
    title: 'Enjoy',
    description: 'Drink daily before meals for best results.',
  },
]

/**
 * SimpleRitual — ultra-minimal 3-step section.
 */
export default function SimpleRitual() {
  return (
    <section className="py-24 px-6" aria-labelledby="ritual-heading">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3" style={{ color: '#ca3b80' }}>How to Use</p>
          <h2 id="ritual-heading" className="section-title">
            Simple Daily Ritual
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="group text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Image */}
              <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full
                              border-2 border-gray-100 group-hover:border-[#084e46]/30
                              transition-all duration-500">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="192px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Number */}
              <p className="text-xs font-bold tracking-widest text-[var(--color-muted)] mb-2">
                STEP {step.number}
              </p>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[200px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
