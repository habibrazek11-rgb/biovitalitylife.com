'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function PrivateLabelBanner() {
  return (
    <section className="relative overflow-hidden" aria-label="Private Label">
      {/* Desktop image */}
      <div className="relative hidden md:block h-[580px]">
        <Image
          src="/Biovitalitylife Private Label/Biovitality Private Label Web Version.png"
          alt="BioVitality Private Label"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center">
          <motion.div
            className="max-w-7xl mx-auto px-6 w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="max-w-md">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight italic mb-4">
                Create Your Own<br />Wellness Ritual
              </h2>
              <p className="text-sm text-white/80 mb-6 max-w-sm">
                Small choices, big impact. Make BioVitality Prickly Pear Vinegar a part of your daily life.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[#084e46] transition-colors"
              >
                Shop Now →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile image */}
      <div className="relative md:hidden h-[500px]">
        <Image
          src="/Biovitalitylife Private Label/BioVitality Private Label Phone Version.jpg"
          alt="BioVitality Private Label"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-2xl font-bold text-white leading-tight italic mb-3">
            Create Your Own<br />Wellness Ritual
          </h2>
          <p className="text-sm text-white/80 mb-4">
            Small choices, big impact. Make BioVitality a part of your daily life.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white px-5 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#084e46] transition-colors"
          >
            Shop Now →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
