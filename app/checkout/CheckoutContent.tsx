'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, CreditCard, CheckCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const SHIPPING_THRESHOLD = 300
const SHIPPING_COST = 25

/**
 * CheckoutContent — Stripe-ready checkout form (stubbed).
 * Wire up to Stripe Elements / Payment Intents when ready.
 */
export default function CheckoutContent() {
  const { items, totalPrice, clearCart } = useCartStore()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)

  const subtotal = totalPrice()
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Create Stripe PaymentIntent and confirm payment
    // const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ items }) })
    await new Promise((r) => setTimeout(r, 1500)) // stub delay
    clearCart()
    setStep('success')
    setLoading(false)
  }

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen pt-36 pb-20 px-6 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-[var(--color-dark)] mb-4">
            Your cart is empty
          </h1>
          <Link href="/shop" className="btn-primary inline-flex">
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen pt-36 pb-20 px-6 bg-white flex items-center justify-center">
        <motion.div
          className="max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(45,106,47,0.1)' }}
          >
            <CheckCircle size={40} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          </div>
          <h1 className="mb-3 font-heading text-3xl font-bold text-[var(--color-dark)]">
            Order Confirmed!
          </h1>
          <p className="mb-8 text-[var(--color-muted)] leading-relaxed">
            Thank you for your BioVitality™ order. You&apos;ll receive a confirmation
            email shortly with your tracking details.
          </p>
          <Link href="/shop" className="btn-primary inline-flex">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <section className="min-h-screen pt-36 pb-20 px-6 bg-white" aria-label="Checkout">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Lock size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <h1 className="font-heading text-3xl font-bold text-[var(--color-dark)]">
            Secure Checkout
          </h1>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-8"
            aria-label="Checkout form"
            noValidate
          >
            {/* Contact */}
            <fieldset className="rounded-2xl border border-gray-100 p-6">
              <legend className="mb-5 font-heading text-lg font-bold text-[var(--color-dark)]">
                Contact Information
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: 'firstName', label: 'First Name', type: 'text' },
                  { name: 'lastName', label: 'Last Name', type: 'text' },
                  { name: 'email', label: 'Email Address', type: 'email', colSpan: true },
                  { name: 'phone', label: 'Phone Number', type: 'tel', colSpan: true },
                ].map((f) => (
                  <div key={f.name} className={f.colSpan ? 'sm:col-span-2' : ''}>
                    <label
                      htmlFor={f.name}
                      className="mb-1.5 block text-sm font-semibold text-[var(--color-dark)]"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm
                                 text-[var(--color-dark)] outline-none
                                 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
                                 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Shipping */}
            <fieldset className="rounded-2xl border border-gray-100 p-6">
              <legend className="mb-5 font-heading text-lg font-bold text-[var(--color-dark)]">
                Shipping Address
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: 'address', label: 'Street Address', colSpan: true },
                  { name: 'city', label: 'City' },
                  { name: 'emirate', label: 'Emirate / State' },
                  { name: 'country', label: 'Country', colSpan: true },
                ].map((f) => (
                  <div key={f.name} className={f.colSpan ? 'sm:col-span-2' : ''}>
                    <label
                      htmlFor={f.name}
                      className="mb-1.5 block text-sm font-semibold text-[var(--color-dark)]"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type="text"
                      required
                      defaultValue={f.name === 'country' ? 'United Arab Emirates' : ''}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm
                                 text-[var(--color-dark)] outline-none
                                 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
                                 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Payment — Stripe stub */}
            <fieldset className="rounded-2xl border border-gray-100 p-6">
              <legend className="mb-5 font-heading text-lg font-bold text-[var(--color-dark)]">
                Payment
              </legend>
              <div
                className="flex items-center gap-3 rounded-xl border-2 border-dashed border-gray-200
                           bg-gray-50 p-6 text-center"
                role="note"
                aria-label="Stripe payment integration placeholder"
              >
                <CreditCard size={24} className="text-gray-400 shrink-0" aria-hidden="true" />
                <div className="text-left">
                  <p className="font-semibold text-[var(--color-dark)] text-sm">
                    Stripe Payment Integration
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Stripe Elements will be mounted here. Connect your Stripe publishable key
                    and create a PaymentIntent via <code className="font-mono">/api/checkout</code>.
                  </p>
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base
                         font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]
                         disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <Lock size={18} aria-hidden="true" />
              {loading ? 'Processing...' : `Place Order — AED ${total}`}
            </button>
          </form>

          {/* Order summary */}
          <aside
            className="h-fit rounded-2xl border border-gray-100 bg-[var(--color-cream)] p-6"
            aria-label="Order summary"
          >
            <h2 className="mb-6 font-heading text-lg font-bold text-[var(--color-dark)]">
              Order Summary
            </h2>
            <ul className="mb-6 space-y-3" role="list">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-[var(--color-muted)] line-clamp-1 flex-1 mr-2">
                    {item.line === 'pharma' ? 'Pharma Line' : 'Food Line'} ×{item.quantity}
                  </span>
                  <span className="font-semibold text-[var(--color-dark)] shrink-0">
                    AED {item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <dt className="text-[var(--color-muted)]">Subtotal</dt>
                <dd className="font-semibold">AED {subtotal}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-[var(--color-muted)]">Shipping</dt>
                <dd className={`font-semibold ${shipping === 0 ? 'text-[var(--color-primary)]' : ''}`}>
                  {shipping === 0 ? 'FREE' : `AED ${shipping}`}
                </dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <dt className="font-bold text-[var(--color-dark)]">Total</dt>
                <dd className="font-heading text-xl font-bold text-[var(--color-dark)]">
                  AED {total}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
