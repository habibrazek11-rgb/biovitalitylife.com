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

/**
 * OrganicCertification — innovative layout with floating badges and certificate showcase.
 */
export default function OrganicCertification() {
  return (
    <section className="py-28 px-6 overflow-hidden" aria-labelledby="cert-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header — centered */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3" style={{ color: '#ca3b80' }}>Certified &amp; Verified</p>
          <h2 id="cert-heading" className="section-title mb-5">
            Organic Certification
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            Every bottle of BioVitality™ carries the promise of purity — certified organic
            by EcoCert, the global standard. What goes into your body is exactly what nature intended.
          </p>
        </motion.div>

        {/* Floating badge pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {badges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.label}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white
                           px-4 py-2.5 shadow-sm hover:shadow-md hover:border-[#084e46]/30
                           transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <Icon size={16} style={{ color: '#084e46' }} />
                <span className="text-sm font-semibold text-[var(--color-dark)]">{badge.label}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Certificate cards — centered, clean */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {certificates.map((cert) => (
            <div key={cert.label} className="flex flex-col items-center">
              <div className="overflow-hidden rounded-xl border border-gray-100 p-2">
                <Image
                  src={cert.src}
                  alt={cert.label}
                  width={200}
                  height={150}
                  className="w-full max-w-[180px] h-auto object-contain"
                />
              </div>
              <p className="mt-3 text-xs font-bold tracking-wider uppercase text-[var(--color-muted)]">
                {cert.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="mt-14 text-center text-sm text-[var(--color-muted)] italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          &ldquo;Certified by EcoCert — the world&apos;s leading organic certification body since 1991.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
