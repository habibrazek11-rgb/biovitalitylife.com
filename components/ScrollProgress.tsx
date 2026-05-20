'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress — thin progress bar at the very top of the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{ scaleX, backgroundColor: '#084e46' }}
    />
  )
}
