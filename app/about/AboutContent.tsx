'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

const values = [
  { title: 'Organic Integrity', description: 'Every ingredient is certified organic. No exceptions.' },
  { title: 'Traditional Craft', description: 'Slow fermentation methods passed down through generations.' },
  { title: 'Transparent Sourcing', description: 'We know every farm, every harvest, every bottle.' },
  { title: 'Global Wellness', description: 'Bringing Tunisian wellness traditions to the world.' },
]

const timeline = [
  { year: '2018', event: 'Founded in Tunisia with a mission to share organic prickly pear vinegar globally.' },
  { year: '2020', event: 'Achieved EcoCert organic certification for both product lines.' },
  { year: '2022', event: 'Launched in the UAE market, partnering with wellness retailers in Dubai.' },
  { year: '2024', event: 'Expanded to 12 countries across the Middle East, Europe and North America.' },
  { year: '2026', event: 'Continuing to grow while staying true to our organic, artisanal roots.' },
]

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[50vh] items-end pb-16 pt-16 px-6"
        style={{
          background: 'linear-gradient(135deg, #1a3a1b 0%, #2D6A2F 60%, #7a3a1a 100%)',
        }}
        aria-label="About hero"
      >
        <div className="mx-auto max-w-4xl text-white">
          <motion.p
            className="section-label mb-3"
            style={{ color: 'var(--color-gold)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.p>
          <motion.h1
            className="font-heading text-5xl font-bold leading-tight md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Brand Story &amp;
            <br />
            Tunisian Heritage
          </motion.h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-white" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-3">Our Mission</p>
            <h2 id="mission-heading" className="section-title mb-8">
              Bottling the Best of Tunisia
            </h2>
            <div className="space-y-5 text-[var(--color-muted)] text-lg leading-relaxed">
              <p>
                BioVitality™ was born from a simple belief: the most powerful wellness
                ingredients are the ones nature has been perfecting for thousands of years.
                The prickly pear cactus — known in Tunisia as &ldquo;Hendbia&rdquo; — has
                been a cornerstone of Mediterranean health traditions for centuries.
              </p>
              <p>
                Our founders grew up watching their grandmothers use prickly pear in
                everything from morning tonics to kitchen staples. When they discovered
                that the rest of the world had yet to experience the magic of organic
                prickly pear vinegar, they knew what they had to do.
              </p>
              <p>
                Today, BioVitality™ works directly with certified organic farmers in
                Tunisia&apos;s most fertile cactus-growing regions. We oversee every step
                of the process — from harvest to fermentation to bottling — ensuring that
                what reaches your home is as pure and potent as nature intended.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: 'var(--color-cream)' }}
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-3">What We Stand For</p>
            <h2 id="values-heading" className="section-title">Our Values</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="rounded-2xl bg-white p-6 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <CheckCircle
                  size={28}
                  className="mb-4 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <h3 className="mb-2 font-heading text-lg font-bold text-[var(--color-dark)]">
                  {v.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-white" aria-labelledby="timeline-heading">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-3">Our Journey</p>
            <h2 id="timeline-heading" className="section-title">Milestones</h2>
          </motion.div>
          <ol className="relative border-l-2 border-[var(--color-primary)] pl-8 space-y-10">
            {timeline.map((item, i) => (
              <motion.li
                key={item.year}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
              >
                <div
                  className="absolute -left-[2.65rem] flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  aria-hidden="true"
                >
                  {item.year.slice(2)}
                </div>
                <p className="font-heading text-lg font-bold text-[var(--color-primary)] mb-1">
                  {item.year}
                </p>
                <p className="text-[var(--color-muted)] leading-relaxed">{item.event}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: 'var(--color-cream)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title mb-6">Ready to Experience BioVitality™?</h2>
          <Link href="/shop" className="btn-primary inline-flex">
            Shop Now
            <ArrowRight size={16} className="ml-2" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
