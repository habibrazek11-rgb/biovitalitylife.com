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

/**
 * HowToUse — two-panel section: Food Line (culinary) + Pharma Line (wellness).
 */
export default function HowToUse() {
  return (
    <section className="py-24 px-6" aria-labelledby="howtouse-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3" style={{ color: '#ca3b80' }}>Usage Guide</p>
          <h2 id="howtouse-heading" className="section-title mb-5">
            How to Use BioVitality™ ?
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            BioVitality™ can be incorporated easily into your daily lifestyle — whether you cook
            Mediterranean dishes or follow a wellness routine for detox and gut health. Here are
            the best ways to use our organic prickly pear vinegar every day.
          </p>
        </motion.div>

        {/* Two panels */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Food Line panel */}
          <motion.div
            className="rounded-2xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-100 bg-[#084e46]/[0.03]">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: '#084e46' }}
              >
                <UtensilsCrossed size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[var(--color-dark)]">
                  In Your Mediterranean Kitchen
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#084e46' }}>
                  Food Line
                </p>
              </div>
            </div>

            {/* Description + bullets */}
            <div className="px-7 py-6">
              <p className="mb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                Enhance the flavor of your everyday dishes with a fruity, balanced vinegar
                inspired by Mediterranean tradition.
              </p>
              <ul className="space-y-3" role="list">
                {culinaryUses.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ChevronRight
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: '#084e46' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--color-dark)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Pharma Line panel */}
          <motion.div
            className="rounded-2xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 px-7 py-5 border-b border-gray-100 bg-[#ca3b80]/[0.03]">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: '#ca3b80' }}
              >
                <Heart size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[var(--color-dark)]">
                  As a Daily Wellness Ritual
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#ca3b80' }}>
                  Pharma Line
                </p>
              </div>
            </div>

            {/* Description + bullets */}
            <div className="px-7 py-6">
              <p className="mb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                BioVitality™ Pharma Line is crafted for detox, digestion, and gut health,
                making it ideal for simple wellness routines.
              </p>
              <ul className="space-y-3" role="list">
                {healthUses.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <ChevronRight
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: '#ca3b80' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--color-dark)] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
