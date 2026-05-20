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

export default function SimpleRitual() {
  return (
    <section className="py-28 px-6 bg-white" aria-labelledby="ritual-heading">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#ca3b80' }}>
            How to Use
          </p>
          <h2 id="ritual-heading" className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-dark)]">
            Simple Daily Ritual
          </h2>
        </motion.div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-[1px]" aria-hidden="true">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[#084e46]/20 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="group text-center"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                {/* Image */}
                <motion.div
                  className="relative mx-auto mb-8 h-48 w-48"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 rounded-full bg-[#084e46]/5 scale-110 group-hover:scale-125 transition-transform duration-500" />
                  <div className="relative h-full w-full overflow-hidden rounded-full shadow-lg ring-4 ring-white">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="192px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#084e46] text-white text-sm font-bold shadow-lg">
                    {step.number}
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-2 group-hover:text-[#084e46] transition-colors">
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
      </div>
    </section>
  )
}
