'use client'

import { motion } from 'framer-motion'

export default function Separator() {
  return (
    <div className="py-12 px-6 bg-[#084e46]">
      <motion.div
        className="mx-auto max-w-4xl flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm font-bold tracking-[0.25em] uppercase text-white">
          Organic · Raw · Unfiltered
        </p>
      </motion.div>
    </div>
  )
}
