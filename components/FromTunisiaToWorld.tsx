'use client'

import { motion, type Variants } from 'framer-motion'

const columns = [
  {
    title: 'A Mediterranean Heritage',
    description:
      'For generations, Tunisian families have harvested prickly pear cactus from the same sun-drenched hillsides, passing down knowledge of the land and its gifts.',
    gradient: 'linear-gradient(160deg, #2D6A2F 0%, #4a9e4d 100%)',
  },
  {
    title: 'Pure Ingredients, Naturally Fermented',
    description:
      'Our traditional slow-fermentation process takes time — because the best things do. No shortcuts, no heat treatment. Just patience and nature.',
    gradient: 'linear-gradient(160deg, #C9A84C 0%, #E8823A 100%)',
  },
  {
    title: 'Crafted Locally, Shared Globally',
    description:
      'From the fields of Tunisia to wellness-conscious homes in the UAE and beyond, BioVitality™ brings premium organic vinegar to the world.',
    gradient: 'linear-gradient(160deg, #E8823A 0%, #2D6A2F 100%)',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
}

/**
 * FromTunisiaToWorld — 3-column editorial layout with full-width quote block.
 */
export default function FromTunisiaToWorld() {
  return (
    <section className="py-24 px-6 bg-white" aria-labelledby="world-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">Our Story</p>
          <h2 id="world-heading" className="section-title">
            From Tunisia to the World
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {columns.map((col) => (
            <motion.article
              key={col.title}
              variants={cardVariants}
              className="overflow-hidden rounded-2xl border border-gray-100"
            >
              {/* Image placeholder */}
              <div
                className="h-52 w-full"
                style={{ background: col.gradient }}
                role="img"
                aria-label={col.title}
              />
              <div className="p-6">
                <h3 className="mb-3 font-heading text-xl font-bold text-[var(--color-dark)]">
                  {col.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed text-sm">
                  {col.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Full-width quote */}
        <motion.blockquote
          className="mt-16 rounded-2xl px-10 py-12 text-center"
          style={{ backgroundColor: 'var(--color-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="font-heading text-xl font-bold italic leading-relaxed text-white md:text-2xl">
            &ldquo;BioVitality™ is more than a vinegar — it is a story of nature, tradition
            and wellness, bottled with care in Tunisia.&rdquo;
          </p>
          <footer className="mt-4 text-sm font-semibold tracking-widest uppercase text-white/60">
            — The BioVitality™ Team
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
