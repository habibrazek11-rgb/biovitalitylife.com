'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'

const SHIPPING_THRESHOLD = 300
const SHIPPING_COST = 25

export default function CartContent() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore()
  const { showToast } = useToast()

  const subtotal = totalPrice()
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping
  const progressPct = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)
  const currency = items[0]?.currency || 'AED'

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    showToast(`${name.split('–')[1]?.trim() ?? 'Item'} removed from cart`)
  }

  return (
    <section className="min-h-screen pt-28 pb-20 px-4 md:px-6 bg-white" aria-label="Shopping cart">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-[var(--color-dark)]">
            Your Cart
          </h1>
          {items.length > 0 && (
            <span className="text-sm text-[var(--color-muted)]">
              {items.reduce((a, i) => a + i.quantity, 0)} item{items.reduce((a, i) => a + i.quantity, 0) !== 1 ? 's' : ''}
            </span>
          )}
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <ShoppingBag size={36} className="text-gray-300" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[var(--color-dark)]">
              Your cart is empty
            </h2>
            <p className="mb-8 text-sm text-[var(--color-muted)]">
              Discover our premium organic prickly pear vinegar.
            </p>
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Cart items */}
            <div className="lg:col-span-3 space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    {/* Image */}
                    <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden bg-[#f8f7f4]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-contain p-1" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#084e46] to-[#C9A84C]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white capitalize mb-1" style={{ backgroundColor: '#084e46' }}>
                            {item.line} Line
                          </span>
                          <h3 className="text-sm font-semibold text-[var(--color-dark)] leading-snug line-clamp-2">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="shrink-0 p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity */}
                        <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center text-xs font-bold border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-base font-bold text-[var(--color-dark)]">
                          {item.currency} {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, text: 'Free over AED 300' },
                  { icon: Shield, text: 'Secure checkout' },
                  { icon: RotateCcw, text: 'Easy returns' },
                ].map((b) => (
                  <div key={b.text} className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 p-3 text-center">
                    <b.icon size={16} className="text-[#084e46]" />
                    <span className="text-[10px] text-[var(--color-muted)] leading-tight">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <aside className="lg:col-span-2 h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-base font-bold text-[var(--color-dark)]">Order Summary</h2>

              {/* Free shipping progress */}
              {shipping > 0 && (
                <div className="mb-5 rounded-xl bg-[#f9f6f1] p-3">
                  <p className="text-xs text-[var(--color-muted)] mb-2">
                    Add <strong className="text-[#084e46]">AED {SHIPPING_THRESHOLD - subtotal}</strong> more for free shipping
                  </p>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-[#084e46]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              )}

              <dl className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <dt className="text-[var(--color-muted)]">Subtotal</dt>
                  <dd className="font-semibold">AED {subtotal}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-[var(--color-muted)]">Shipping</dt>
                  <dd className={`font-semibold ${shipping === 0 ? 'text-[#084e46]' : ''}`}>
                    {shipping === 0 ? 'FREE' : `AED ${shipping}`}
                  </dd>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <dt className="font-bold text-[var(--color-dark)]">Total</dt>
                  <dd className="text-xl font-bold text-[var(--color-dark)]">AED {total}</dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] mb-3"
                style={{ backgroundColor: '#084e46' }}
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/shop"
                className="flex w-full items-center justify-center text-xs font-medium text-[var(--color-muted)] hover:text-[#084e46] transition-colors"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
