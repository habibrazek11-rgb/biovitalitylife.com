'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed, Heart, ChevronRight } from 'lucide-react'

const culinaryUses = [
  'Create healthy dressings & vinaigrettes',
  'Use in marinades for meat, fish or vegetables',
  'Add 1–2 tbsp to fresh salads',
  'Enhance grilled dishes with a fruity acidity',
  'Add a finishing touch to Mediterranean plates',
]

const healthUses = [
  'Morning detox shot: 1 tbsp in warm water',
  'Mix with lemon, honey or mint',
  'Helps reduce bloating',
  'Supports gut microbiome thanks to natural fermentation "with the Mother"',
  'Ideal for 14–30 day detox routines',
]

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
}

export default function HowToUse() {
  return (
    <section className="py-28 px-6 bg-white" aria-labelledby="howtouse-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#ca3b80' }}>
            Usage Guide
          </p>
          <h2 id="howtouse-heading" className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-dark)] mb-5">
            How to Use BioVitality™ ?
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            Whether you cook Mediterranean dishes or follow a wellness routine — here are
            the best ways to use our organic prickly pear vinegar every day.
          </p>
        </motion.div>

        {/* Two panels */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Food Line panel */}
          <motion.div
            className="group rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-xl transition-shadow duration-500"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-100 bg-gradient-to-r from-[#084e46]/[0.04] to-transparent">
              <motion.div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: '#084e46' }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <UtensilsCrossed size={18} className="text-white" />
              </motion.div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[var(--color-dark)]">
                  In Your Mediterranean Kitchen
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#084e46' }}>
                  Food Line
                </p>
              </div>
            </div>

            <div className="px-7 py-6">
              <p className="mb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                Enhance the flavor of your everyday dishes with a fruity, balanced vinegar
                inspired by Mediterranean tradition.
              </p>
              <ul className="space-y-3" role="list">
                {culinaryUses.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2.5"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={listItemVariants}
                  >
                    <ChevronRight
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: '#084e46' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--color-dark)] leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Pharma Line panel */}
          <motion.div
            className="group rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-xl transition-shadow duration-500"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-100 bg-gradient-to-r from-[#ca3b80]/[0.04] to-transparent">
              <motion.div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: '#ca3b80' }}
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Heart size={18} className="text-white" />
              </motion.div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[var(--color-dark)]">
                  As a Daily Wellness Ritual
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#ca3b80' }}>
                  Pharma Line
                </p>
              </div>
            </div>

            <div className="px-7 py-6">
              <p className="mb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                BioVitality™ Pharma Line is crafted for detox, digestion, and gut health,
                making it ideal for simple wellness routines.
              </p>
              <ul className="space-y-3" role="list">
                {healthUses.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2.5"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={listItemVariants}
                  >
                    <ChevronRight
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: '#ca3b80' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--color-dark)] leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
