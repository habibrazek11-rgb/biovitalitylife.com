'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    image: '/how-to-use/bottle_wate.jpeg',
    title: 'Mix',
    description: 'Add honey or lemon if you like.',
  },
  {
    number: '2',
    image: '/how-to-use/spoon_glass.jpeg',
    title: 'Dilute',
    description: '1–2 tbsp in a glass of water.',
  },
  {
    number: '3',
    image: '/how-to-use/bowl_salad.jpeg',
    title: 'Drink',
    description: 'Enjoy in the morning on an empty stomach.',
  },
]

export default function SimpleRitual() {
  return (
    <section className="py-12 px-6 bg-white" aria-labelledby="ritual-heading">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <Image
            src="/BioVitality-logo-1.png"
            alt="BioVitality™"
            width={120}
            height={40}
            className="mx-auto mb-3 h-10 w-auto object-contain"
          />
          <p className="mb-1 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
            How to Use
          </p>
          <h2 id="ritual-heading" className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)] italic">
            Simple Daily Ritual
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-5 group">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#084e46] text-sm font-bold shadow-md">
                  {step.number}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-[#084e46] text-sm">🌿</span>
                <h3 className="font-heading text-xl font-bold text-[var(--color-dark)] italic">
                  {step.title}
                </h3>
                <span className="text-[#084e46] text-sm">🌿</span>
              </div>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[220px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {steps.map((step) => (
            <div key={step.number} className="snap-start shrink-0 w-[75vw] text-center">
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="75vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#084e46] text-sm font-bold shadow-md">
                  {step.number}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-[#084e46] text-sm">🌿</span>
                <h3 className="font-heading text-lg font-bold text-[var(--color-dark)] italic">
                  {step.title}
                </h3>
                <span className="text-[#084e46] text-sm">🌿</span>
              </div>
              <p className="text-sm text-[var(--color-muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
