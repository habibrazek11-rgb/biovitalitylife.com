'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const certPoints = [
  'EU Organic Certified',
  'EcoCert Certified',
  'Non-GMO',
  'No Additives',
  'Sustainable & Ethical',
]

export default function OrganicCertification() {
  return (
    <section className="py-16 px-6 bg-white" aria-labelledby="cert-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]">
            Certified Organic
          </p>
          <h2 id="cert-heading" className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            Purity You Can Trust
          </h2>
        </motion.div>

        {/* Three column layout */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left — Checkmarks */}
          <div className="space-y-3">
            {certPoints.map((point) => (
              <div key={point} className="flex items-center gap-2.5">
                <CheckCircle size={18} className="text-[#084e46] shrink-0" />
                <span className="text-sm font-medium text-[var(--color-dark)]">{point}</span>
              </div>
            ))}
          </div>

          {/* Center — Certificate images */}
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                  src="/certification/cropped-cropped-BioVitality™-Organic-certificate.png"
                  alt="EU Organic"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-muted)]">EU Organic</p>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                  src="/certification/cropped-cropped-BioVitality™-Organic-Ecocert-certificate.png"
                  alt="EcoCert"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-muted)]">EcoCert</p>
            </div>
          </div>

          {/* Right — Description */}
          <div className="text-center md:text-left">
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              Every bottle of BioVitality™ is crafted from handpicked organic prickly pears, slowly fermented using traditional methods to preserve all natural enzymes and probiotics. No shortcuts, no compromises — just pure, raw vinegar the way nature intended.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
