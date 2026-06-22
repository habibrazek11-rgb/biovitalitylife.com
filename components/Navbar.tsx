'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useUser } from '@clerk/nextjs'
import { useSyncUser } from '@/lib/useSyncUser'
import CurrencySwitcher from '@/components/CurrencySwitcher'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/shop', label: 'SHOP' },
  { href: '/contact', label: 'CONTACT' },
]

/**
 * Navbar — no background at all. Transparent always.
 * On scroll: a subtle bottom border + backdrop blur appears for readability.
 * Active link gets an underline indicator.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const totalItems = useCartStore((s) => s.totalItems())
  const { isSignedIn, user } = useUser()
  useSyncUser()

  useEffect(() => { setMounted(true) }, [])

  // Check if user is admin from Clerk publicMetadata OR email
  const metadataRole = (user?.publicMetadata as { role?: string })?.role
  const userEmail = user?.emailAddresses?.[0]?.emailAddress
  const isAdmin = metadataRole === 'admin' || userEmail === 'contact@biovitalitylife.com'

  // Detect if we're on a non-hero page (non-homepage) so text is always dark
  const isHeroPage = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Always use dark green text for nav links
  const textColor = 'text-[#084e46]'
  const hoverColor = 'hover:text-[#063b35]'

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.07)] border-b border-gray-100'
            : 'bg-transparent border-b border-transparent'
          }`}
        style={{ top: scrolled ? '0px' : 'var(--topbar-height, 0px)' }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center px-6 py-5 lg:py-6 relative"
          aria-label="Main navigation"
        >
          {/* ── Mobile: Hamburger + Search (left) ── */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              className={`p-2 rounded-full transition-all duration-200 ${textColor} ${hoverColor} hover:bg-white/10`}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>
            <Link
              href="/shop"
              className={`p-2 rounded-full transition-all duration-200 ${textColor} ${hoverColor} hover:bg-white/10`}
              aria-label="Search products"
            >
              <Search size={20} strokeWidth={1.8} />
            </Link>
          </div>

          {/* ── Desktop links (left) ── */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative px-4 py-2 text-[12px] font-semibold tracking-[0.05em]
                      transition-colors duration-200 rounded-md
                      ${isActive ? 'text-[#084e46]' : 'text-[#084e46]/70 hover:text-[#084e46]'}`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#084e46]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* ── Centered Logo ── */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            aria-label="BioVitality home"
          >
            <Image
              src="/BioVitality-logo-1.png"
              alt="BioVitality™ logo"
              width={200}
              height={64}
              className={`w-auto object-contain transition-all duration-500
                ${scrolled ? 'h-11' : 'h-16 md:h-20'}`}
            />
          </Link>

          {/* ── Right side: Auth + Cart + CTA ── */}
          <div className="flex items-center gap-3 ml-auto">
            {/* User auth — desktop only */}
            {isSignedIn ? (
              <div className="hidden md:flex items-center gap-2">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase
                               text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/account"
                  className={`flex h-8 w-8 items-center justify-center rounded-full
                    border border-gray-200 transition-all duration-200
                    hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]
                    ${textColor}`}
                  aria-label="My account"
                >
                  <User size={16} strokeWidth={1.8} />
                </Link>
              </div>
            ) : (
              <Link
                href="/sign-in"
                className={`hidden md:inline-flex text-[11px] font-bold tracking-[0.1em]
                  transition-colors duration-200 ${textColor} ${hoverColor}`}
              >
                SIGN IN
              </Link>
            )}

            {/* Currency switcher — shop pages only */}
            {pathname.startsWith('/shop') && (
              <div className="hidden lg:block">
                <CurrencySwitcher />
              </div>
            )}

            {/* Shop CTA — desktop only */}
            <Link
              href="/shop"
              className="hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2
                         text-[11px] font-bold tracking-widest text-white
                         transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95"
              style={{ backgroundColor: '#084e46' }}
            >
              Shop Now
            </Link>

            {/* User icon — mobile only */}
            <Link
              href={isSignedIn ? '/account' : '/sign-in'}
              className={`md:hidden p-2 rounded-full transition-all duration-200 ${textColor} ${hoverColor} hover:bg-white/10`}
              aria-label={isSignedIn ? 'My account' : 'Sign in'}
            >
              <User size={20} strokeWidth={1.8} />
            </Link>

            {/* Cart icon */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-full transition-all duration-200
                ${textColor} ${hoverColor} hover:bg-white/10`}
              aria-label={`Cart, ${mounted ? totalItems : 0} item${(!mounted || totalItems !== 1) ? 's' : ''}`}
            >
              <ShoppingCart size={21} strokeWidth={1.8} />
              <AnimatePresence>
                {mounted && totalItems > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center
                               justify-center rounded-full px-1 text-[9px] font-bold text-white"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    aria-hidden="true"
                  >
                    {totalItems > 99 ? '99+' : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 z-[70] h-full w-[300px] flex flex-col
                       shadow-2xl overflow-hidden bg-white"
            aria-label="Mobile navigation"
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid rgba(107,123,94,0.15)' }}
            >
              <Image
                src="/BioVitality-logo-1.png"
                alt="BioVitality™ logo"
                width={120}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full
                           text-[var(--color-muted)] hover:text-[var(--color-dark)]
                           hover:bg-black/5 transition-all"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map(({ href, label }) => {
                  const isActive =
                    href === '/' ? pathname === '/' : pathname.startsWith(href)
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3.5
                          text-sm font-bold tracking-widest transition-all
                          ${isActive
                            ? 'text-[#084e46] bg-[#084e46]/10'
                            : 'text-[var(--color-dark)] hover:text-[#084e46] hover:bg-[#084e46]/5'
                          }`}
                      >
                        {isActive && (
                          <span
                            className="h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: '#084e46' }}
                            aria-hidden="true"
                          />
                        )}
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Drawer footer CTA */}
            <div className="px-6 py-6 space-y-3" style={{ borderTop: '1px solid rgba(107,123,94,0.15)' }}>
              {/* Currency switcher — shop pages only */}
              {pathname.startsWith('/shop') && (
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5">
                  <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-muted)]">Currency</span>
                  <CurrencySwitcher />
                </div>
              )}
              <Link
                href="/shop"
                onClick={() => setDrawerOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5
                           text-sm font-bold text-white tracking-widest
                           transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#084e46' }}
              >
                <ShoppingCart size={16} aria-hidden="true" />
                Shop Now
              </Link>
              <p className="text-center text-xs text-[var(--color-muted)]">
                Free shipping over AED 300 🌿
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
