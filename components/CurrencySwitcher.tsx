'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { useCurrencyStore, type Currency } from '@/store/currencyStore'

const CURRENCIES: { code: Currency; flag: string; name: string; symbol: string }[] = [
  { code: 'AED', flag: '🇦🇪', name: 'UAE Dirham', symbol: 'AED' },
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar',  symbol: '$'   },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro',        symbol: '€'   },
]

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrencyStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const active = CURRENCIES.find((c) => c.code === currency)!

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded-full border border-[#084e46]/25 bg-white/80
                   backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold tracking-wide
                   text-[#084e46] transition-all duration-200
                   hover:border-[#084e46]/50 hover:bg-white hover:shadow-sm"
      >
        <span className="text-sm leading-none">{active.flag}</span>
        <span>{active.code}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex items-center"
        >
          <ChevronDown size={11} strokeWidth={2.5} />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Select currency"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-48 overflow-hidden
                       rounded-2xl border border-gray-100 bg-white
                       shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          >
            {/* Header */}
            <div className="px-3.5 pt-3 pb-1.5 border-b border-gray-50">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400">
                Currency
              </p>
            </div>

            <div className="p-1.5">
              {CURRENCIES.map((c) => {
                const isActive = currency === c.code
                return (
                  <button
                    key={c.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => { setCurrency(c.code); setOpen(false) }}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5
                                transition-colors duration-150 ${
                                  isActive
                                    ? 'bg-[#084e46]/[0.07] text-[#084e46]'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    <div className="flex-1 text-left min-w-0">
                      <div className={`text-[11px] font-bold leading-none ${isActive ? 'text-[#084e46]' : 'text-gray-800'}`}>
                        {c.code}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5 leading-none truncate">
                        {c.name}
                      </div>
                    </div>
                    <span className={`text-[11px] font-semibold ${isActive ? 'text-[#084e46]' : 'text-gray-400'}`}>
                      {c.symbol}
                    </span>
                    {isActive && (
                      <Check size={12} strokeWidth={2.5} className="text-[#084e46] shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Footer hint */}
            <div className="px-3.5 pb-2.5 pt-1 border-t border-gray-50">
              <p className="text-[9px] text-gray-300 leading-tight">
                Prices update automatically
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
