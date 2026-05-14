'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

const features = [
  {
    image: '/why-organic-prickly-pear-vinegar/natural_organic.jpeg',
    title: '100% Natural & Organic',
    description:
      'No additives, no chemicals, no preservatives. Just pure prickly pear vinegar as nature intended.',
  },
  {
    image: '/why-organic-prickly-pear-vinegar/mediterranean_origin.jpeg',
    title: 'Mediterranean Origin',
    description:
      'Handpicked from sun-drenched Tunisian cactus fields, where the climate creates the finest fruit.',
  },
  {
    image: '/why-organic-prickly-pear-vinegar/with_the_mother.jpeg',
    title: 'With the Mother',
    description:
      'Unfiltered and enzyme-rich, our vinegar retains the living "Mother" — a probiotic powerhouse.',
  },
  {
    image: '/why-organic-prickly-pear-vinegar/probiotic-powerhouse.jpeg',
    title: 'Probiotic Powerhouse',
    description:
      'Rich in live cultures and beneficial enzymes that support gut health and natural wellness.',
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

/**
 * WhyBioVitality — enhanced section with real images and editorial layout.
 */
export default function WhyBioVitality() {
  return (
    <section className="py-24 px-6 bg-white" aria-labelledby="why-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3" style={{ color: '#ca3b80' }}>The BioVitality Difference</p>
          <h2 id="why-heading" className="section-title mb-6">
            Why Organic Prickly Pear Vinegar?
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            Born from the ancient cactus fields of Tunisia, our vinegar is crafted through
            traditional slow fermentation — preserving every enzyme, every probiotic, every
            drop of Mediterranean goodness. The result is a living vinegar with the Mother,
            unlike anything you&apos;ve tasted before.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              className="group flex flex-col items-center text-center"
            >
              {/* Circle image */}
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-lg mb-5
                              transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <h3 className="mb-2 font-heading text-lg font-bold text-[var(--color-dark)]">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[220px]">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
