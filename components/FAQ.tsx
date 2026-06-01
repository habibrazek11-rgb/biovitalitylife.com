'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What is prickly pear vinegar?',
    answer: 'Prickly pear vinegar is made from the fermented fruit of the Opuntia cactus. It is raw, unfiltered, and contains "the Mother" — a colony of beneficial bacteria that supports gut health and digestion.',
  },
  {
    question: 'How do I use BioVitality™ vinegar daily?',
    answer: 'Mix 1–2 tablespoons in a glass of water, add honey or lemon if you like, and drink it in the morning on an empty stomach. You can also use it as a salad dressing or in marinades.',
  },
  {
    question: 'Is it safe to drink every day?',
    answer: 'Yes. BioVitality™ is 100% organic, raw, and free from additives. It is safe for daily consumption as part of a balanced diet. We recommend 1–2 tablespoons per day.',
  },
  {
    question: 'What does "With the Mother" mean?',
    answer: 'The Mother is a natural colony of beneficial bacteria (Acetobacter) formed during fermentation. It appears as cloudy strands and is a sign of high-quality, unfiltered vinegar rich in probiotics and enzymes.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship across the UAE with free delivery on orders over AED 300. We also ship internationally — contact us for rates to your country.',
  },
  {
    question: 'What is the difference between Pharma Line and Food Line?',
    answer: 'The Pharma (Wellness) Line is formulated for daily health rituals — detox, digestion, and immunity. The Food (Gourmet) Line is crafted for culinary use — salad dressings, marinades, and Mediterranean cooking.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-12 px-6 bg-white" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
            Got Questions?
          </p>
          <h2 id="faq-heading" className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                className={`rounded-xl border transition-colors duration-300 ${isOpen ? 'border-[#084e46]/20 bg-[#084e46]/[0.02]' : 'border-gray-200'}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm font-semibold pr-4 transition-colors ${isOpen ? 'text-[#084e46]' : 'text-[var(--color-dark)]'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-[#084e46] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-[var(--color-muted)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
