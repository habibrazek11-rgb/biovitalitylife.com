'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-16 px-6 bg-[#084e46]" aria-label="Newsletter">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-xs font-bold tracking-[0.3em] uppercase text-white/50">
            Stay Connected
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Get Wellness Tips & Exclusive Offers
          </h2>
          <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
            Join our community and be the first to know about new products, recipes, and special promotions.
          </p>

          {submitted ? (
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                <CheckCircle size={24} className="text-white" />
              </div>
              <p className="text-white font-medium">You're in! Check your inbox soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-full px-5 py-3 text-sm outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:bg-white/15 transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#084e46] hover:bg-white/90 transition-colors shrink-0"
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-[10px] text-white/30">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
