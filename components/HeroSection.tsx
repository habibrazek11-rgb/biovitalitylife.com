'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    web: '/hero-section/web/biovitality-organic-prickly-pear-vinegar-chef-pouring-landscape.jpg',
    mobile: '/hero-section/mobile/biovitality-organic-prickly-pear-vinegar-chef-pouring-portrait-mobile.jpg',
    alt: 'Chef pouring BioVitality organic prickly pear vinegar',
  },
  {
    web: '/hero-section/web/biovitality-organic-prickly-pear-vinegar-wellness-lifestyle.jpg',
    mobile: '/hero-section/mobile/biovitality-organic-prickly-pear-vinegar-lightness-purity-portrait-mobile.jpg',
    alt: 'BioVitality organic prickly pear vinegar wellness lifestyle',
  },
  {
    web: '/hero-section/web/biovitality-organic-prickly-pear-vinegar-with-mother-salad-dressing.jpg',
    mobile: '/hero-section/mobile/biovitality-organic-prickly-pear-vinegar-with-mother-rustic-kitchen-mobile.jpg',
    alt: 'BioVitality organic prickly pear vinegar with mother for salad dressing',
  },
]

const AUTOPLAY_MS = 6000

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [next])

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      filter: 'blur(8px)',
      scale: 1.1,
    }),
    center: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 1.5, ease: [0.4, 0, 0.2, 1] as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      filter: 'blur(4px)',
      scale: 1.05,
      transition: { duration: 1, ease: [0.4, 0, 0.2, 1] as const },
    }),
  }

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
      aria-roledescription="carousel"
    >
      {/* Background carousel */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Desktop image */}
            <Image
              src={slides[current].web}
              alt={slides[current].alt}
              fill
              sizes="100vw"
              className="object-cover hidden md:block"
              priority={current === 0}
            />
            {/* Mobile image */}
            <Image
              src={slides[current].mobile}
              alt={slides[current].alt}
              fill
              sizes="100vw"
              className="object-cover md:hidden"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"
        aria-hidden="true"
      />

      {/* Side gradient for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full
                   bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center
                   text-white hover:bg-white/20 transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-white/40
                   opacity-0 hover:opacity-100 md:opacity-60 md:hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full
                   bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center
                   text-white hover:bg-white/20 transition-all duration-300
                   focus:outline-none focus:ring-2 focus:ring-white/40
                   opacity-0 hover:opacity-100 md:opacity-60 md:hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-2.5 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/40"
            style={{ width: i === current ? 32 : 10 }}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                i === current ? 'bg-white' : 'bg-white/40'
              }`}
            />
            {/* Progress bar animation on active dot */}
            {i === current && (
              <motion.span
                className="absolute inset-0 rounded-full bg-white/70 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                key={`progress-${current}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 text-xs font-bold tracking-[0.3em] uppercase text-white/80"
        >
          From Tunisia · For the World
        </motion.p>

        {/* Title */}
        <motion.h1
          className="mb-6 font-heading text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Pure Organic Prickly Pear Vinegar
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-10 text-lg text-white/70 md:text-xl max-w-xl mx-auto"
        >
          From the heart of Tunisia · For Food, Detox &amp; Gut Health
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/shop?line=pharma" className="btn-primary min-w-[220px]">
              Discover the Pharma Line
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/shop?line=food" className="btn-outline-light min-w-[220px]">
              Explore Food Line
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="mx-auto w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
