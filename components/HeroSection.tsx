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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 flex items-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col py-24 md:py-28 max-w-2xl text-center md:text-left items-center md:items-start mx-auto md:mx-0"
        >
          <p className="mb-3 text-xs font-bold tracking-[0.25em] uppercase text-[#6b7280]">
            Pure · Organic · Wellness
          </p>

          <h1 className="font-heading text-5xl md:text-6xl leading-[1.1] mb-6">
            <span className="text-[#084e46] font-normal">Pure Organic</span><br />
            <span className="text-[var(--color-dark)] font-bold">Prickly Pear</span><br />
            <span className="text-[var(--color-dark)] font-bold">Vinegar</span>
          </h1>

          <p className="text-base text-[var(--color-muted)] leading-relaxed mb-8 max-w-md">
            Crafted from handpicked prickly pears, our vinegar supports digestion, boosts energy, and elevates your daily wellness — naturally.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-10">
            <Link href="/shop" className="btn-primary">
              Shop Now →
            </Link>
            <Link href="/about" className="btn-outline">
              Learn Benefits
            </Link>
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

      {/* Trust badges — desktop only */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 w-full max-w-6xl px-6 hidden md:block">
        <motion.div
          className="rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-white/50 px-10 py-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-4 gap-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#084e46]/10">
                <svg className="w-5 h-5 text-[#084e46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-dark)]">100% Organic</p>
                <p className="text-[11px] text-[var(--color-muted)] leading-snug mt-0.5">No chemicals, no preservatives.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#084e46]/10">
                <svg className="w-5 h-5 text-[#084e46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-dark)]">Raw & Unfiltered</p>
                <p className="text-[11px] text-[var(--color-muted)] leading-snug mt-0.5">Rich in nutrients and enzymes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#084e46]/10">
                <svg className="w-5 h-5 text-[#084e46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-1.59.659H9.06a2.25 2.25 0 01-1.591-.659L5 14.5m14 0V17a2.25 2.25 0 01-2.25 2.25H7.25A2.25 2.25 0 015 17v-2.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-dark)]">With The Mother</p>
                <p className="text-[11px] text-[var(--color-muted)] leading-snug mt-0.5">Naturally fermented for maximum benefits.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#084e46]/10">
                <svg className="w-5 h-5 text-[#084e46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-dark)]">Daily Wellness</p>
                <p className="text-[11px] text-[var(--color-muted)] leading-snug mt-0.5">Supports digestion, energy & immunity.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
