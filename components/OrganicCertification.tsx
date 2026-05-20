'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, Leaf, Sparkles, BadgeCheck, Award } from 'lucide-react'

const badges = [
  { icon: Shield, label: 'Zero Pesticides' },
  { icon: Leaf, label: '100% Organic' },
  { icon: Sparkles, label: 'No Chemicals' },
  { icon: BadgeCheck, label: 'EcoCert Verified' },
  { icon: Award, label: 'Premium Grade' },
]

const certificates = [
  {
    src: '/certification/cropped-cropped-BioVitality™-Organic-certificate.png',
    label: 'BioVitality™ Organic Certificate',
  },
  {
    src: '/certification/cropped-cropped-BioVitality™-Organic-Ecocert-certificate.png',
    label: 'EcoCert Organic Certificate',
  },
]

export default function OrganicCertification() {
  return (
    <section className="py-28 px-6 overflow-hidden bg-[#fafaf8]" aria-labelledby="cert-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: '#ca3b80' }}>
            Certified &amp; Verified
          </p>
          <h2 id="cert-heading" className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-dark)] mb-5">
            Organic Certification
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            Every bottle of BioVitality™ carries the promise of purity — certified organic
            by EcoCert, the global standard.
          </p>
        </motion.div>

        {/* Floating badge pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {badges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white
                           px-5 py-3 shadow-sm hover:shadow-lg hover:border-[#084e46]/30
                           hover:-translate-y-1 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                <Icon size={16} style={{ color: '#084e46' }} />
                <span className="text-sm font-semibold text-[var(--color-dark)]">{badge.label}</span>
              </motion.div>
            )
          })}
        </div>

        {/* Certificate cards */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.label}
              className="flex flex-col items-center group"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={cert.src}
                  alt={cert.label}
                  width={200}
                  height={150}
                  className="w-full max-w-[180px] h-auto object-contain"
                />
              </div>
              <p className="mt-4 text-xs font-bold tracking-wider uppercase text-[var(--color-muted)]">
                {cert.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="mt-16 text-center text-sm text-[var(--color-muted)] italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          &ldquo;Certified by EcoCert — the world&apos;s leading organic certification body since 1991.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
