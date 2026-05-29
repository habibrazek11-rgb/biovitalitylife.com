'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const images = [
  '/kitchen%20separator/Biovitality%20Pure%20Organic%20Prickly%20Pear%20Vinegar%20%20(83).jpg',
  '/kitchen%20separator/Biovitality%20Pure%20Organic%20Prickly%20Pear%20Vinegar%20%20(84).jpg',
  '/kitchen%20separator/Biovitality%20Pure%20Organic%20Prickly%20Pear%20Vinegar%20%20(85).jpg',
  '/kitchen%20separator/Biovitality%20Pure%20Organic%20Prickly%20Pear%20Vinegar%20%20(86).jpg',
  '/kitchen%20separator/Biovitality%20Pure%20Organic%20Prickly%20Pear%20Vinegar%20%20(87).jpg',
]

const AUTOPLAY_MS = 4000

export default function KitchenCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="md:hidden relative w-full">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={images[current]}
            alt="BioVitality in the kitchen"
            width={1080}
            height={1080}
            sizes="100vw"
            className="w-full h-auto"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="relative h-2 rounded-full transition-all duration-400 focus:outline-none"
            style={{ width: i === current ? 20 : 8 }}
            aria-label={`Image ${i + 1}`}
          >
            <span className={`absolute inset-0 rounded-full transition-all duration-400 ${i === current ? 'bg-white' : 'bg-white/40'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
