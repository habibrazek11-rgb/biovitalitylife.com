'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Currency = 'AED' | 'USD' | 'EUR'

// Fixed exchange rates (update periodically)
export const RATES: Record<Currency, number> = {
  AED: 1,
  USD: 0.272,
  EUR: 0.251,
}

export const SYMBOLS: Record<Currency, string> = {
  AED: 'AED',
  USD: '$',
  EUR: '€',
}

interface CurrencyStore {
  currency: Currency
  setCurrency: (c: Currency) => void
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: 'AED',
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'biovitality-currency' }
  )
)

export function convertPrice(priceAED: number, currency: Currency): string {
  const converted = priceAED * RATES[currency]
  const symbol = SYMBOLS[currency]
  if (currency === 'AED') return `${symbol} ${converted.toFixed(0)}`
  return `${symbol}${converted.toFixed(2)}`
}
