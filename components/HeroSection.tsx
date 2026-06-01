'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    web: '/Hero%20Section/BioVitality%20%20Pure%20Organic%20Prickly%20Pear%20Vinegar.jpg',
    mobile: '/Hero%20Section/BioVitality%20Welness%20Line%20Mobile.jpg',
  },
  {
    web: '/Hero%20Section/BioVitality%20%20Pure%20Organic%20Prickly%20Pear%20Vinegar%20Pharma.jpg',
    mobile: '/Hero%20Section/BioVitality%20Gourmet%20Line%20Mobile.jpg',
  },
]

const AUTOPLAY_MS = 5000

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative overflow-hidden min-h-screen" aria-label="Hero">
      {/* Background carousel — desktop */}
      <div className="absolute inset-0 hidden md:block">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`web-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Image
              src={slides[current].web}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={current === 0}
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background carousel — mobile */}
      <div className="absolute inset-0 md:hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`mobile-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Image
              src={slides[current].mobile}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={current === 0}
              aria-hidden="true"
            />
            {/* Dark overlay for text readability on mobile */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 flex items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-end pb-16 md:pb-0 md:justify-center py-0 md:py-28 max-w-2xl text-center md:text-left items-center md:items-start mx-auto md:mx-0 w-full min-h-screen"
        >
          {/* Desktop text — hidden on mobile */}
          <p className="mb-3 text-xs font-bold tracking-[0.25em] uppercase text-[#6b7280] hidden md:block">
            Pure · Organic · Wellness
          </p>

          <h1 className="font-heading text-4xl md:text-6xl leading-[1.1] mb-6 hidden md:block">
            <span className="text-[#084e46] font-normal">Pure Organic</span><br />
            <span className="text-[var(--color-dark)] font-bold">Prickly Pear</span><br />
            <span className="text-[var(--color-dark)] font-bold">Vinegar</span>
          </h1>

          <p className="text-base text-[var(--color-muted)] leading-relaxed mb-8 max-w-md hidden md:block">
            Crafted from handpicked prickly pears, our vinegar supports digestion, boosts energy, and elevates your daily wellness — naturally.
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-3 md:gap-4 mb-8 mt-auto md:mt-0">
            <Link href="/shop" className="btn-primary">
              Shop Now →
            </Link>
            <Link href="/about" className="hidden md:inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-md border-2 border-[#084e46] text-[#084e46] hover:bg-[#084e46] hover:text-white transition-all duration-200 min-w-[180px]">
              Learn Benefits
            </Link>
          </div>

          {/* Certification badges */}
          <div className="flex md:hidden items-center gap-4">
            <Image
              src="/certification/cropped-cropped-BioVitality%E2%84%A2-Organic-Ecocert-certificate.png"
              alt="Ecocert Organic Certification"
              width={64}
              height={64}
              className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/certification/cropped-cropped-BioVitality%E2%84%A2-Organic-certificate.png"
              alt="Organic Certification"
              width={64}
              height={64}
              className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-2.5 rounded-full transition-all duration-500 focus:outline-none"
            style={{ width: i === current ? 28 : 10 }}
            aria-label={`Slide ${i + 1}`}
          >
            <span className={`absolute inset-0 rounded-full transition-all duration-500 ${i === current ? 'bg-[#084e46]' : 'bg-[#084e46]/30'}`} />
          </button>
        ))}
      </div>

    </section>
  )
}
