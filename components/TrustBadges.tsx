'use client'

import { motion } from 'framer-motion'

export default function TrustBadges() {
  return (
    <section className="py-10 px-6 bg-white hidden md:block" aria-label="Trust badges">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="rounded-2xl bg-[#f5f3ee] px-10 py-8"
          initial={{ opacity: 0, y: 20 }}
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
