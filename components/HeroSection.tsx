'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

/**
 * HeroSection — background image with dark overlay, white text.
 */
export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image — desktop */}
      <Image
        src="/hero-section-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover hidden md:block"
        loading="eager"
        aria-hidden="true"
      />

      {/* Background image — mobile */}
      <Image
        src="/hero-section-mobile.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover md:hidden"
        loading="eager"
        aria-hidden="true"
      />

      {/* Reduced dark overlay */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-xs font-bold tracking-[0.2em] uppercase text-white/90"
        >
          From Tunisia · For the World
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
        >
          Pure Organic
          <br />
          <span className="text-white">Prickly Pear</span>
          <br />
          Vinegar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-10 text-lg text-white/80 md:text-xl"
        >
          From the heart of Tunisia · For Food, Detox &amp; Gut Health
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link href="/shop?line=pharma" className="btn-primary min-w-[220px]">
            Discover the Pharma Line
          </Link>
          <Link href="/shop?line=food" className="btn-outline-light min-w-[220px]">
            Explore Food Line
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
