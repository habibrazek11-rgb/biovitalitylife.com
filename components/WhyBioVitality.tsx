'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

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

export default function WhyBioVitality() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 bg-[#fafaf8] overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Subtle background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #084e46 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.p
            className="mb-3 text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: '#ca3b80' }}
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The BioVitality Difference
          </motion.p>

          <motion.h2
            id="why-heading"
            className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-dark)] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Why Organic Prickly Pear Vinegar?
          </motion.h2>

          <motion.p
            className="text-[var(--color-muted)] text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Born from the ancient cactus fields of Tunisia, our vinegar is crafted through traditional
            slow fermentation — preserving every enzyme, every probiotic, every drop of Mediterranean goodness.
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Circle image */}
              <motion.div
                className="relative mb-8"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Glow ring */}
                <div className="absolute inset-[-6px] rounded-full bg-gradient-to-br from-[#084e46]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative h-44 w-44 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    sizes="176px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Number badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[#084e46] text-white text-xs font-bold shadow-md">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>

              {/* Text */}
              <h3 className="mb-2 font-heading text-lg font-bold text-[var(--color-dark)] group-hover:text-[#084e46] transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-[220px]">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
