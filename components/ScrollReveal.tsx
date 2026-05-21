'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** Offset for parallax effect — higher = more movement */
  offset?: number
  /** Whether to apply a subtle scale effect */
  scale?: boolean
}

/**
 * ScrollReveal — wraps a section with smooth parallax + fade on scroll.
 * Creates a cinematic, layered scrolling feel.
 */
export default function ScrollReveal({
  children,
  className = '',
  offset = 40,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [offset, 0, -offset])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  const scaleVal = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        opacity,
        ...(scale ? { scale: scaleVal } : {}),
      }}
    >
      {children}
    </motion.div>
  )
}
