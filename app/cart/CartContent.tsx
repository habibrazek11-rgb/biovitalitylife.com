'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'

const SHIPPING_THRESHOLD = 200
const SHIPPING_COST = 25

export default function CartContent() {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore()
  const { showToast } = useToast()

  const subtotal = totalPrice()
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    showToast(`${name.split('–')[1]?.trim() ?? 'Item'} removed from cart`)
  }

  return (
    <section className="min-h-screen pt-10 pb-20 px-6 bg-white" aria-label="Shopping cart">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          className="font-heading text-4xl font-bold text-[var(--color-dark)] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag
              size={64}
              className="mb-6 text-gray-200"
              aria-hidden="true"
            />
            <h2 className="mb-3 font-heading text-2xl font-bold text-[var(--color-dark)]">
              Your cart is empty
            </h2>
            <p className="mb-8 text-[var(--color-muted)]">
              Discover our premium organic prickly pear vinegar.
            </p>
            <Link href="/shop" className="btn-primary">
              Shop Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Line items */}
            <div className="lg:col-span-2">
              <ul className="space-y-4" role="list" aria-label="Cart items">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 rounded-2xl border border-gray-100 bg-[var(--color-cream)] p-5"
                    >
                      {/* Product image */}
                      <div className="h-24 w-24 shrink-0 rounded-xl overflow-hidden relative bg-[var(--color-cream)]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className="h-full w-full"
                            style={{
                              background:
                                item.line === 'pharma'
                                  ? 'linear-gradient(135deg, #2D6A2F, #C9A84C)'
                                  : 'linear-gradient(135deg, #E8823A, #2D6A2F)',
                            }}
                            role="img"
                            aria-label={`${item.name} product image`}
                          />
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span
                              className="mb-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-white capitalize"
                              style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                              {item.line} Line
                            </span>
                            <h3 className="font-heading text-base font-bold text-[var(--color-dark)] leading-snug line-clamp-2">
                              {item.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id, item.name)}
                            className="shrink-0 p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity stepper */}
                          <div className="flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center text-[var(--color-muted)]
                                         hover:bg-gray-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span
                              className="flex h-8 w-10 items-center justify-center text-sm font-bold
                                         border-x border-gray-200 text-[var(--color-dark)]"
                              aria-live="polite"
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center text-[var(--color-muted)]
                                         hover:bg-gray-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <span className="font-heading text-lg font-bold text-[var(--color-dark)]">
                            AED {item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            {/* Order summary */}
            <aside
              className="h-fit rounded-2xl border border-gray-100 bg-[var(--color-cream)] p-6"
              aria-label="Order summary"
            >
              <h2 className="mb-6 font-heading text-xl font-bold text-[var(--color-dark)]">
                Order Summary
              </h2>

              <dl className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <dt className="text-[var(--color-muted)]">Subtotal</dt>
                  <dd className="font-semibold text-[var(--color-dark)]">AED {subtotal}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-[var(--color-muted)]">Shipping</dt>
                  <dd className={`font-semibold ${shipping === 0 ? 'text-[var(--color-primary)]' : 'text-[var(--color-dark)]'}`}>
                    {shipping === 0 ? 'FREE' : `AED ${shipping}`}
                  </dd>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[var(--color-muted)]">
                    Add AED {SHIPPING_THRESHOLD - subtotal} more for free shipping
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <dt className="font-bold text-[var(--color-dark)]">Total</dt>
                  <dd className="font-heading text-xl font-bold text-[var(--color-dark)]">
                    AED {total}
                  </dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base
                           font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                Proceed to Checkout
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <Link
                href="/shop"
                className="mt-4 flex w-full items-center justify-center text-sm font-semibold
                           text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
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
