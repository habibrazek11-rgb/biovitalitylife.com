'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  LogOut,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react'

type Tab = 'profile' | 'orders' | 'addresses'

const tabs: { value: Tab; label: string; icon: typeof User }[] = [
  { value: 'profile', label: 'Profile', icon: User },
  { value: 'orders', label: 'Orders', icon: Package },
  { value: 'addresses', label: 'Addresses', icon: MapPin },
]

export default function AccountContent() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (!user) {
    return (
      <section className="py-20 px-6 text-center">
        <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
        <h1 className="font-heading text-2xl font-bold text-[var(--color-dark)] mb-3">
          Please sign in
        </h1>
        <p className="text-[var(--color-muted)] mb-6">
          You need to be signed in to view your account.
        </p>
        <Link href="/sign-in" className="btn-primary inline-flex">
          Sign In
        </Link>
      </section>
    )
  }

  return (
    <section className="py-12 px-6 md:py-16" aria-label="My Account">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[var(--color-dark)]">
              My Account
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Welcome back, {user.firstName || user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5
                       text-sm font-medium text-[var(--color-muted)] hover:border-red-200
                       hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar tabs */}
          <nav aria-label="Account navigation">
            <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible" role="list">
              {tabs.map(({ value, label, icon: Icon }) => (
                <li key={value}>
                  <button
                    onClick={() => setActiveTab(value)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold
                      transition-all whitespace-nowrap
                      ${activeTab === value
                        ? 'bg-[var(--color-primary)] text-white shadow-md'
                        : 'text-[var(--color-muted)] hover:bg-gray-100 hover:text-[var(--color-dark)]'
                      }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tab content */}
          <div className="rounded-2xl bg-white border border-gray-100 p-6 md:p-8 shadow-sm">
            {activeTab === 'profile' && (
              <div>
                <h2 className="mb-6 font-heading text-xl font-bold text-[var(--color-dark)]">
                  Profile Information
                </h2>

                {/* Avatar */}
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-white text-xl font-bold"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-[var(--color-dark)]">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      Member since {new Date(user.createdAt!).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Info grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl bg-[var(--color-cream)] p-4">
                    <Mail size={18} className="text-[var(--color-primary)] shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium text-[var(--color-dark)]">
                        {user.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-[var(--color-cream)] p-4">
                    <Phone size={18} className="text-[var(--color-primary)] shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium text-[var(--color-dark)]">
                        {user.phoneNumbers[0]?.phoneNumber || 'Not added yet'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-[var(--color-cream)] p-4">
                    <User size={18} className="text-[var(--color-primary)] shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider">Full Name</p>
                      <p className="text-sm font-medium text-[var(--color-dark)]">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Manage in Clerk */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs text-[var(--color-muted)] mb-3">
                    To update your email, password or profile photo:
                  </p>
                  <button
                    onClick={() => user.reload()}
                    className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    Manage account settings →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="mb-6 font-heading text-xl font-bold text-[var(--color-dark)]">
                  Order History
                </h2>

                {/* Empty state */}
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Package size={48} className="mb-4 text-gray-200" />
                  <h3 className="mb-2 font-heading text-lg font-bold text-[var(--color-dark)]">
                    No orders yet
                  </h3>
                  <p className="mb-6 text-sm text-[var(--color-muted)]">
                    When you place an order, it will appear here.
                  </p>
                  <Link href="/shop" className="btn-primary inline-flex text-sm">
                    Start Shopping
                    <ChevronRight size={16} className="ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="mb-6 font-heading text-xl font-bold text-[var(--color-dark)]">
                  Saved Addresses
                </h2>

                {/* Empty state */}
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <MapPin size={48} className="mb-4 text-gray-200" />
                  <h3 className="mb-2 font-heading text-lg font-bold text-[var(--color-dark)]">
                    No addresses saved
                  </h3>
                  <p className="mb-6 text-sm text-[var(--color-muted)]">
                    Add a shipping address for faster checkout.
                  </p>
                  <button
                    className="btn-primary inline-flex text-sm"
                    onClick={() => {/* TODO: open add address modal */}}
                  >
                    Add Address
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
